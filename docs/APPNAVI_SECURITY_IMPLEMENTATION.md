# AppNavi側でのセキュリティ実装ガイド

## 概要

このドキュメントは、AppNaviアプリケーションで外部JSONファイルを安全に読み込むための実装ガイドです。

## 必要なパッケージ

```bash
npm install ajv ajv-formats
npm install --save-dev @types/node
```

## 実装手順

### 1. JSONスキーマファイルの配置

`schemas/`ディレクトリに以下のファイルを配置：
- `schema.schema.json` - schema.jsonの検証用
- `views.schema.json` - views.jsonの検証用

### 2. バリデーターの実装

```typescript
// src/utils/jsonValidator.ts
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import schemaSchema from '../../schemas/schema.schema.json';
import viewsSchema from '../../schemas/views.schema.json';

// 設定
const CONFIG = {
  ALLOWED_ORIGINS: [
    'https://asset.com',
    'https://tsubasagit.github.io',
    'https://appnavi-asset.vercel.app'
  ],
  MAX_JSON_SIZE: 10 * 1024 * 1024, // 10MB
  REQUEST_TIMEOUT: 5000, // 5秒
};

// バリデーターの初期化
const ajv = new Ajv({
  allErrors: true,
  strict: true,
  removeAdditional: true, // 追加プロパティを自動削除
  validateSchema: true,
  useDefaults: false
});
addFormats(ajv);

// スキーマのコンパイル
const validateSchema = ajv.compile(schemaSchema);
const validateViews = ajv.compile(viewsSchema);

// サニタイゼーション関数
function sanitizeString(str: string): string {
  if (typeof str !== 'string') {
    return '';
  }
  
  // HTMLタグをエスケープ
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

function sanitizeTemplate(template: any): any {
  if (typeof template === 'string') {
    return sanitizeString(template);
  }
  
  if (Array.isArray(template)) {
    return template.map(item => sanitizeTemplate(item));
  }
  
  if (template && typeof template === 'object') {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(template)) {
      // 危険なキーを拒否
      if (key.startsWith('__') || key === 'constructor' || key === 'prototype') {
        continue;
      }
      sanitized[key] = sanitizeTemplate(value);
    }
    return sanitized;
  }
  
  return template;
}

// オリジンの検証
function isAllowedOrigin(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return CONFIG.ALLOWED_ORIGINS.includes(urlObj.origin);
  } catch {
    return false;
  }
}

// セキュアなJSON読み込み関数
export async function loadSecureJson<T>(
  url: string,
  validator: Ajv.ValidateFunction
): Promise<T> {
  // 1. オリジンの検証
  if (!isAllowedOrigin(url)) {
    throw new Error(`Origin not allowed: ${url}`);
  }
  
  // 2. タイムアウト付きでフェッチ
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), CONFIG.REQUEST_TIMEOUT);
  
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      mode: 'cors',
      credentials: 'omit'
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    
    // 3. サイズチェック
    const contentLength = response.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > CONFIG.MAX_JSON_SIZE) {
      throw new Error(`File too large: ${contentLength} bytes`);
    }
    
    // 4. JSONの読み込み
    const text = await response.text();
    if (text.length > CONFIG.MAX_JSON_SIZE) {
      throw new Error(`File too large: ${text.length} bytes`);
    }
    
    // 5. JSONのパース
    let json: any;
    try {
      json = JSON.parse(text);
    } catch (e) {
      throw new Error(`Invalid JSON: ${e instanceof Error ? e.message : 'Unknown error'}`);
    }
    
    // 6. サニタイゼーション
    const sanitized = sanitizeTemplate(json);
    
    // 7. バリデーション
    if (!validator(sanitized)) {
      const errors = validator.errors;
      const errorMessages = errors?.map(e => 
        `${e.instancePath || 'root'}: ${e.message}`
      ).join(', ') || 'Unknown validation error';
      throw new Error(`Validation failed: ${errorMessages}`);
    }
    
    return sanitized as T;
    
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
}

// スキーマの読み込み
export async function loadSecureSchema(templateId: string) {
  const url = `https://asset.com/templates/${templateId}/schema.json`;
  return loadSecureJson(url, validateSchema);
}

// ビューの読み込み
export async function loadSecureViews(templateId: string) {
  const url = `https://asset.com/templates/${templateId}/views.json`;
  return loadSecureJson(url, validateViews);
}

// サンプルデータの読み込み（バリデーションは緩め）
export async function loadSecureSampleData(templateId: string) {
  const url = `https://asset.com/templates/${templateId}/sample-data.json`;
  
  // サンプルデータは構造が柔軟なので、基本的な検証のみ
  const json = await loadSecureJson<any>(url, () => true);
  
  // 基本的な型チェック
  if (typeof json !== 'object' || json === null) {
    throw new Error('Invalid sample data: must be an object');
  }
  
  return json;
}
```

### 3. テンプレート適用処理の実装

```typescript
// src/services/templateService.ts
import { loadSecureSchema, loadSecureViews, loadSecureSampleData } from '../utils/jsonValidator';

export interface TemplateSchema {
  templateId: string;
  version: string;
  tables: Array<{
    name: string;
    label: string;
    fields: Array<{
      name: string;
      type: string;
      label?: string;
      required?: boolean;
      // ... その他のプロパティ
    }>;
  }>;
}

export interface TemplateViews {
  templateId: string;
  version: string;
  views: Array<{
    id: string;
    name: string;
    type: string;
    route: string;
    // ... その他のプロパティ
  }>;
}

export async function applyTemplate(templateId: string) {
  try {
    // 1. スキーマの読み込みと検証
    console.log(`Loading schema for template: ${templateId}`);
    const schema = await loadSecureSchema(templateId);
    console.log(`Schema loaded: ${schema.tables.length} tables`);
    
    // 2. ビューの読み込みと検証
    console.log(`Loading views for template: ${templateId}`);
    const views = await loadSecureViews(templateId);
    console.log(`Views loaded: ${views.views.length} views`);
    
    // 3. テーブルの作成
    for (const table of schema.tables) {
      await createTable(table);
    }
    
    // 4. ビューの作成
    for (const view of views.views) {
      await createView(view);
    }
    
    // 5. サンプルデータの読み込み（オプション）
    try {
      const sampleData = await loadSecureSampleData(templateId);
      if (sampleData.data) {
        await importSampleData(sampleData.data);
      }
    } catch (error) {
      console.warn('Failed to load sample data:', error);
      // サンプルデータの読み込み失敗は続行
    }
    
    console.log(`Template ${templateId} applied successfully`);
    return {
      success: true,
      schema,
      views
    };
    
  } catch (error) {
    console.error('Failed to apply template:', error);
    
    // ユーザーにエラーを表示
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Unknown error occurred';
    
    // セキュリティエラーの場合は特別なメッセージを表示
    if (errorMessage.includes('not allowed') || 
        errorMessage.includes('Validation failed') ||
        errorMessage.includes('too large')) {
      showSecurityError('セキュリティ上の問題が検出されました。テンプレートの読み込みを中止しました。');
    } else {
      showError(`テンプレートの読み込みに失敗しました: ${errorMessage}`);
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
}

function showSecurityError(message: string) {
  // セキュリティエラーの表示（例: モーダル、トーストなど）
  console.error('[SECURITY]', message);
  // UIに表示する処理
}

function showError(message: string) {
  // 通常のエラーの表示
  console.error(message);
  // UIに表示する処理
}

async function createTable(table: any) {
  // テーブル作成の実装
  console.log(`Creating table: ${table.name}`);
}

async function createView(view: any) {
  // ビュー作成の実装
  console.log(`Creating view: ${view.name}`);
}

async function importSampleData(data: any) {
  // サンプルデータのインポート実装
  console.log('Importing sample data');
}
```

### 4. Content Security Policy (CSP) の設定

サーバー側またはHTMLの`<meta>`タグでCSPを設定：

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' data: https:; 
               connect-src 'self' https://asset.com https://tsubasagit.github.io; 
               frame-ancestors 'none';">
```

### 5. エラーハンドリングとログ記録

```typescript
// src/utils/securityLogger.ts
export function logSecurityEvent(
  event: 'validation_failed' | 'origin_blocked' | 'size_exceeded' | 'timeout',
  details: Record<string, any>
) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    event,
    details,
    userAgent: navigator.userAgent,
    url: window.location.href
  };
  
  // ログサーバーに送信（例: セキュリティ監視システム）
  console.warn('[SECURITY EVENT]', logEntry);
  
  // 本番環境では、セキュリティ監視システムに送信
  // await sendToSecurityMonitoring(logEntry);
}
```

## 使用例

```typescript
// コンポーネント内での使用
import { applyTemplate } from '../services/templateService';

function TemplateInstaller() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleInstall = async (templateId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await applyTemplate(templateId);
      
      if (result.success) {
        console.log('Template installed successfully');
        // 成功時の処理
      } else {
        setError(result.error || 'Unknown error');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <button onClick={() => handleInstall('crm')} disabled={loading}>
        {loading ? 'インストール中...' : 'インストール'}
      </button>
      {error && <div className="error">{error}</div>}
    </div>
  );
}
```

## テスト

```typescript
// src/utils/__tests__/jsonValidator.test.ts
import { loadSecureJson } from '../jsonValidator';
import { validateSchema } from '../jsonValidator';

describe('JSON Validator', () => {
  it('should reject invalid origin', async () => {
    await expect(
      loadSecureJson('https://malicious.com/data.json', validateSchema)
    ).rejects.toThrow('Origin not allowed');
  });
  
  it('should reject oversized JSON', async () => {
    // モック実装
  });
  
  it('should reject invalid schema', async () => {
    // モック実装
  });
});
```

## チェックリスト

実装完了後の確認事項：

- [ ] JSONスキーマバリデーションが実装されている
- [ ] サニタイゼーションが実装されている
- [ ] ホワイトリストが設定されている
- [ ] サイズ制限が設定されている
- [ ] タイムアウトが設定されている
- [ ] CSPヘッダーが設定されている
- [ ] エラーハンドリングが実装されている
- [ ] ログ記録が実装されている
- [ ] テストが作成されている

---

**最終更新日**: 2024年12月29日
