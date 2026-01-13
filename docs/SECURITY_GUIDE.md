# AppNavi-asset セキュリティガイド

## 概要

このドキュメントは、外部サイト（Asset.com）からJSONファイル（`schema.json`、`views.json`、`sample-data.json`）をインポートする際のセキュリティリスクと対策を説明します。

## セキュリティリスク

### 1. XSS（Cross-Site Scripting）攻撃

**リスク**: 悪意のあるJSONにJavaScriptコードが含まれている場合、実行される可能性があります。

**例**:
```json
{
  "name": "<script>alert('XSS')</script>",
  "description": "悪意のあるコード"
}
```

### 2. データ改ざん

**リスク**: 外部サイトが改ざんされた場合、悪意のあるデータがアプリケーションに注入される可能性があります。

**例**:
```json
{
  "tables": [
    {
      "name": "customers",
      "fields": [
        {
          "name": "malicious_field",
          "type": "string",
          "query": "DROP TABLE customers" // SQLインジェクション
        }
      ]
    }
  ]
}
```

### 3. 構造の改変

**リスク**: 予期しない構造のJSONが送信され、アプリケーションがクラッシュする可能性があります。

**例**:
```json
{
  "views": null, // 配列が期待されているがnull
  "tables": "invalid" // 配列が期待されているが文字列
}
```

### 4. 無限ループやリソース消費

**リスク**: 非常に大きなJSONファイルや、循環参照を含むJSONが送信される可能性があります。

**例**:
```json
{
  "views": [
    {
      "id": "view1",
      "children": [
        {
          "id": "view2",
          "children": [
            {
              "id": "view1", // 循環参照
              "children": [...]
            }
          ]
        }
      ]
    }
  ]
}
```

### 5. CORS設定の不備

**リスク**: 適切なCORS設定がない場合、不正なサイトからアクセスされる可能性があります。

## セキュリティ対策

### 1. JSONスキーマバリデーション（必須）

JSONの構造を厳密に検証し、予期しないデータを拒否します。

#### 実装例（TypeScript）

```typescript
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

// JSONスキーマの定義
const schemaSchema = {
  type: 'object',
  required: ['templateId', 'version', 'tables'],
  properties: {
    templateId: {
      type: 'string',
      pattern: '^[a-z0-9-]+$'
    },
    version: {
      type: 'string',
      pattern: '^\\d+\\.\\d+\\.\\d+'
    },
    tables: {
      type: 'array',
      items: {
        type: 'object',
        required: ['name', 'label', 'fields'],
        properties: {
          name: {
            type: 'string',
            pattern: '^[a-z0-9_]+$'
          },
          label: { type: 'string' },
          fields: {
            type: 'array',
            items: {
              type: 'object',
              required: ['name', 'type'],
              properties: {
                name: {
                  type: 'string',
                  pattern: '^[a-z0-9_]+$'
                },
                type: {
                  type: 'string',
                  enum: ['string', 'number', 'date', 'boolean', 'reference']
                }
              }
            }
          }
        }
      }
    }
  },
  additionalProperties: false // 追加プロパティを拒否
};

const viewsSchema = {
  type: 'object',
  required: ['templateId', 'version', 'views'],
  properties: {
    templateId: {
      type: 'string',
      pattern: '^[a-z0-9-]+$'
    },
    version: { type: 'string' },
    views: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'name', 'type', 'route'],
        properties: {
          id: {
            type: 'string',
            pattern: '^[a-z0-9-]+$'
          },
          name: { type: 'string' },
          type: {
            type: 'string',
            enum: ['dashboard', 'table', 'kanban', 'detail']
          },
          route: { type: 'string' },
          table: { type: 'string' },
          widgets: { type: 'array' },
          columns: { type: 'array' }
        }
      }
    }
  },
  additionalProperties: false
};

// バリデーターの初期化
const ajv = new Ajv({ 
  allErrors: true,
  strict: true,
  removeAdditional: true // 追加プロパティを自動削除
});
addFormats(ajv);

const validateSchema = ajv.compile(schemaSchema);
const validateViews = ajv.compile(viewsSchema);

// JSONの読み込みとバリデーション
async function loadAndValidateSchema(templateId: string) {
  const url = `https://asset.com/templates/${templateId}/schema.json`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch schema: ${response.status}`);
  }
  
  const json = await response.json();
  
  // バリデーション
  if (!validateSchema(json)) {
    const errors = validateSchema.errors;
    console.error('Schema validation failed:', errors);
    throw new Error(`Invalid schema: ${errors.map(e => e.message).join(', ')}`);
  }
  
  return json;
}

async function loadAndValidateViews(templateId: string) {
  const url = `https://asset.com/templates/${templateId}/views.json`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch views: ${response.status}`);
  }
  
  const json = await response.json();
  
  // バリデーション
  if (!validateViews(json)) {
    const errors = validateViews.errors;
    console.error('Views validation failed:', errors);
    throw new Error(`Invalid views: ${errors.map(e => e.message).join(', ')}`);
  }
  
  return json;
}
```

### 2. サニタイゼーション（必須）

文字列データから危険な文字を除去またはエスケープします。

#### 実装例

```typescript
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
```

### 3. ホワイトリストベースのアクセス制御（推奨）

信頼できるドメインのみからJSONを読み込むように制限します。

#### 実装例

```typescript
const ALLOWED_ORIGINS = [
  'https://asset.com',
  'https://tsubasagit.github.io',
  'https://appnavi-asset.vercel.app'
];

function isAllowedOrigin(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return ALLOWED_ORIGINS.includes(urlObj.origin);
  } catch {
    return false;
  }
}

async function safeFetch(url: string) {
  if (!isAllowedOrigin(url)) {
    throw new Error(`Origin not allowed: ${url}`);
  }
  
  const response = await fetch(url, {
    mode: 'cors',
    credentials: 'omit'
  });
  
  return response;
}
```

### 4. サイズ制限（推奨）

JSONファイルのサイズを制限し、リソース消費を防ぎます。

#### 実装例

```typescript
const MAX_JSON_SIZE = 10 * 1024 * 1024; // 10MB

async function loadJsonWithSizeLimit(url: string) {
  const response = await fetch(url);
  
  const contentLength = response.headers.get('content-length');
  if (contentLength && parseInt(contentLength) > MAX_JSON_SIZE) {
    throw new Error(`JSON file too large: ${contentLength} bytes`);
  }
  
  const text = await response.text();
  if (text.length > MAX_JSON_SIZE) {
    throw new Error(`JSON file too large: ${text.length} bytes`);
  }
  
  return JSON.parse(text);
}
```

### 5. タイムアウト設定（推奨）

長時間かかるリクエストを中断します。

#### 実装例

```typescript
function fetchWithTimeout(url: string, timeout: number = 5000): Promise<Response> {
  return Promise.race([
    fetch(url),
    new Promise<Response>((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeout)
    )
  ]);
}
```

### 6. Content Security Policy (CSP)（推奨）

XSS攻撃を防ぐために、CSPヘッダーを設定します。

#### 実装例（サーバー側）

```typescript
// Express.jsの例
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "connect-src 'self' https://asset.com; " +
    "frame-ancestors 'none';"
  );
  next();
});
```

### 7. JSON署名検証（オプション・高度）

JSONファイルにデジタル署名を追加し、改ざんを検出します。

#### 実装例

```typescript
import crypto from 'crypto';

interface SignedJson {
  data: any;
  signature: string;
  timestamp: number;
}

function verifySignature(signedJson: SignedJson, publicKey: string): boolean {
  const { data, signature, timestamp } = signedJson;
  
  // タイムスタンプの検証（5分以内）
  const now = Date.now();
  if (Math.abs(now - timestamp) > 5 * 60 * 1000) {
    return false;
  }
  
  // 署名の検証
  const dataString = JSON.stringify(data) + timestamp;
  const verify = crypto.createVerify('RSA-SHA256');
  verify.update(dataString);
  return verify.verify(publicKey, signature, 'base64');
}
```

### 8. サンドボックス化（オプション・高度）

JSONデータを安全な環境で処理します。

#### 実装例（Web Worker）

```typescript
// main.ts
const worker = new Worker('/json-processor.worker.js');

worker.postMessage({
  type: 'process',
  json: jsonData,
  templateId: 'crm'
});

worker.onmessage = (event) => {
  if (event.data.type === 'success') {
    const processedData = event.data.result;
    // 処理されたデータを使用
  } else {
    console.error('Processing failed:', event.data.error);
  }
};

// json-processor.worker.js
self.onmessage = (event) => {
  const { json, templateId } = event.data;
  
  try {
    // サンドボックス化された環境でJSONを処理
    const processed = processJson(json, templateId);
    
    self.postMessage({
      type: 'success',
      result: processed
    });
  } catch (error) {
    self.postMessage({
      type: 'error',
      error: error.message
    });
  }
};
```

## 完全な実装例

```typescript
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

// 設定
const CONFIG = {
  ALLOWED_ORIGINS: ['https://asset.com'],
  MAX_JSON_SIZE: 10 * 1024 * 1024, // 10MB
  REQUEST_TIMEOUT: 5000, // 5秒
  SCHEMA_CACHE_TTL: 3600000 // 1時間
};

// バリデーターの初期化
const ajv = new Ajv({
  allErrors: true,
  strict: true,
  removeAdditional: true
});
addFormats(ajv);

// スキーマの定義（簡略版）
const schemaSchema = {
  type: 'object',
  required: ['templateId', 'version', 'tables'],
  properties: {
    templateId: { type: 'string', pattern: '^[a-z0-9-]+$' },
    version: { type: 'string' },
    tables: {
      type: 'array',
      items: {
        type: 'object',
        required: ['name', 'label', 'fields'],
        properties: {
          name: { type: 'string', pattern: '^[a-z0-9_]+$' },
          label: { type: 'string' },
          fields: { type: 'array' }
        }
      }
    }
  },
  additionalProperties: false
};

const validateSchema = ajv.compile(schemaSchema);

// セキュアなJSON読み込み関数
async function loadSecureJson(
  url: string,
  validator: Ajv.ValidateFunction
): Promise<any> {
  // 1. オリジンの検証
  if (!CONFIG.ALLOWED_ORIGINS.some(origin => url.startsWith(origin))) {
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
      throw new Error(`Invalid JSON: ${e.message}`);
    }
    
    // 6. サニタイゼーション
    const sanitized = sanitizeTemplate(json);
    
    // 7. バリデーション
    if (!validator(sanitized)) {
      const errors = validator.errors;
      throw new Error(`Validation failed: ${errors.map(e => e.message).join(', ')}`);
    }
    
    return sanitized;
    
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
}

// 使用例
async function applyTemplate(templateId: string) {
  try {
    // スキーマの読み込み
    const schemaUrl = `https://asset.com/templates/${templateId}/schema.json`;
    const schema = await loadSecureJson(schemaUrl, validateSchema);
    
    // ビューの読み込み
    const viewsUrl = `https://asset.com/templates/${templateId}/views.json`;
    const views = await loadSecureJson(viewsUrl, validateViews);
    
    // テンプレートを適用
    await createTables(schema.tables);
    await createViews(views.views);
    
    console.log('Template applied successfully');
    
  } catch (error) {
    console.error('Failed to apply template:', error);
    // ユーザーにエラーを表示
    showError('テンプレートの読み込みに失敗しました。セキュリティ上の問題が検出されました。');
  }
}
```

## チェックリスト

AppNavi側で実装すべきセキュリティ対策：

- [ ] **JSONスキーマバリデーション**: すべてのJSONファイルをスキーマで検証
- [ ] **サニタイゼーション**: 文字列データをサニタイズ
- [ ] **ホワイトリスト**: 信頼できるドメインのみから読み込み
- [ ] **サイズ制限**: JSONファイルのサイズを制限（例: 10MB）
- [ ] **タイムアウト**: リクエストにタイムアウトを設定（例: 5秒）
- [ ] **CSPヘッダー**: Content Security Policyを設定
- [ ] **エラーハンドリング**: エラー時に適切なメッセージを表示
- [ ] **ログ記録**: セキュリティイベントをログに記録
- [ ] **バージョン管理**: テンプレートのバージョンを検証
- [ ] **整合性チェック**: テンプレートの整合性を確認（オプション）

## 推奨事項

1. **必須**: JSONスキーマバリデーション、サニタイゼーション、ホワイトリスト
2. **推奨**: サイズ制限、タイムアウト、CSPヘッダー
3. **オプション**: 署名検証、サンドボックス化（高度なセキュリティが必要な場合）

## 参考資料

- [OWASP JSON Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/AJAX_Security_Cheat_Sheet.html)
- [JSON Schema Validation](https://json-schema.org/)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

---

**最終更新日**: 2024年12月29日
