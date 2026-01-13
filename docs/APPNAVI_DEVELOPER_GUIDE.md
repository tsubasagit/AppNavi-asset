# AppNavi開発者向けガイド: 外部テンプレート読み込み機能

## 概要

このドキュメントは、AppNaviアプリケーションで外部テンプレート読み込み機能を実装するための技術仕様書です。

外部テンプレートサーバー（`https://tsubasagit.github.io/AppNavi-asset/`）からテンプレート一覧を取得し、ユーザーに表示する機能を実装してください。

## 1. APIエンドポイント

### テンプレート一覧取得API

**URL**: `https://tsubasagit.github.io/AppNavi-asset/api/templates.json`

**メソッド**: `GET`

**Content-Type**: `application/json`

**CORS**: ⚠️ **注意**: GitHub PagesではCORSヘッダーが設定されていない可能性があります（後述の「CORS対応」を参照）

## 2. レスポンス形式

### 成功時のレスポンス

```json
{
  "templates": [
    {
      "templateId": "crm",
      "name": "顧客管理（CRM）",
      "description": "顧客情報、商談管理、活動履歴を一元管理",
      "category": "営業・マーケティング",
      "color": "purple",
      "version": "1.0.0",
      "updatedAt": "2024-12-29T00:00:00Z",
      "isPublic": true,
      "tags": ["営業", "顧客管理", "商談", "CRM"],
      "author": "AppNavi Team",
      "features": [
        "顧客一覧テーブル",
        "商談パイプライン（カンバン）",
        "活動履歴タイムライン",
        "営業ダッシュボード（KPI表示）"
      ],
      "previewImageUrl": "https://tsubasagit.github.io/AppNavi-asset/templates/crm/preview.png",
      "demoUrl": "https://tsubasagit.github.io/AppNavi-asset/templates/crm/"
    }
  ]
}
```

### データ構造の詳細

#### 必須フィールド

| フィールド名 | 型 | 説明 | 例 |
|------------|-----|------|-----|
| `templateId` | string | テンプレートの一意の識別子（英数字とハイフンのみ） | `"crm"` |
| `name` | string | テンプレート名（日本語可） | `"顧客管理（CRM）"` |
| `description` | string | テンプレートの説明（日本語可） | `"顧客情報、商談管理、活動履歴を一元管理"` |
| `category` | string | カテゴリ名（日本語可） | `"営業・マーケティング"` |
| `color` | string | テンプレートの色（`purple`, `orange`, `green`, `blue`, `slate`のいずれか） | `"purple"` |
| `version` | string | バージョン番号（セマンティックバージョニング推奨） | `"1.0.0"` |
| `updatedAt` | string | 更新日時（ISO 8601形式） | `"2024-12-29T00:00:00Z"` |
| `isPublic` | boolean | 公開フラグ（常に`true`） | `true` |
| `tags` | string[] | タグの配列 | `["営業", "顧客管理", "商談", "CRM"]` |
| `author` | string | 作成者名 | `"AppNavi Team"` |

#### オプションフィールド

| フィールド名 | 型 | 説明 | 例 |
|------------|-----|------|-----|
| `features` | string[] | 機能のリスト（日本語可） | `["顧客管理", "商談パイプライン", "活動履歴"]` |
| `previewImageUrl` | string | プレビュー画像のURL（完全なURL） | `"https://tsubasagit.github.io/AppNavi-asset/templates/crm/preview.png"` |
| `demoUrl` | string | デモページのURL（完全なURL） | `"https://tsubasagit.github.io/AppNavi-asset/templates/crm/"` |

## 3. 実装例

### TypeScript/JavaScript実装例

```typescript
// テンプレート型定義
interface Template {
  templateId: string;
  name: string;
  description: string;
  category: string;
  color: 'purple' | 'orange' | 'green' | 'blue' | 'slate';
  version: string;
  updatedAt: string; // ISO 8601形式 (例: "2024-12-29T00:00:00Z")
  isPublic: boolean;
  tags: string[];
  author: string;
  features?: string[];
  previewImageUrl?: string;
  demoUrl?: string;
}

interface TemplatesResponse {
  templates: Template[];
}

// テンプレート一覧を取得
async function fetchExternalTemplates(): Promise<Template[]> {
  const API_URL = 'https://tsubasagit.github.io/AppNavi-asset/api/templates.json';
  
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: TemplatesResponse = await response.json();
    return data.templates;
  } catch (error) {
    console.error('Failed to fetch external templates:', error);
    // エラー時は空配列を返す（ローカルテンプレートのみ表示）
    return [];
  }
}
```

### CORSエラー対応版

```typescript
async function fetchExternalTemplates(): Promise<Template[]> {
  const API_URL = 'https://tsubasagit.github.io/AppNavi-asset/api/templates.json';
  
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // CORSエラーを回避するためのオプション
      mode: 'cors',
      credentials: 'omit',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: TemplatesResponse = await response.json();
    return data.templates;
  } catch (error) {
    // CORSエラーの場合
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.warn('CORS error: External templates cannot be loaded. Using local templates only.');
      // ローカルテンプレートのみ表示
      return [];
    }
    
    console.error('Failed to fetch external templates:', error);
    return [];
  }
}
```

### プロキシサーバー経由での取得（推奨）

```typescript
// AppNaviのバックエンドサーバー経由で取得
async function fetchExternalTemplatesViaProxy(): Promise<Template[]> {
  // AppNaviのバックエンドAPIエンドポイント
  const PROXY_URL = '/api/external-templates';
  
  try {
    const response = await fetch(PROXY_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: TemplatesResponse = await response.json();
    return data.templates;
  } catch (error) {
    console.error('Failed to fetch external templates:', error);
    return [];
  }
}
```

## 4. CORS対応

### 問題

GitHub Pagesでは`_headers`ファイルが直接サポートされていないため、CORSヘッダーが自動的に設定されません。そのため、ブラウザから直接アクセスする場合、CORSエラーが発生する可能性があります。

### エラーメッセージ例

```
Access to fetch at 'https://tsubasagit.github.io/AppNavi-asset/api/templates.json' 
from origin 'https://appnavi.example.com' has been blocked by CORS policy: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

### 対応方法

#### 方法1: プロキシサーバー経由で取得（推奨）

AppNaviのバックエンドサーバー経由でテンプレートを取得し、サーバー側でCORSヘッダーを設定します。

**バックエンド実装例（Node.js/Express）**:

```javascript
const express = require('express');
const fetch = require('node-fetch');
const app = express();

// CORS設定
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// 外部テンプレート取得エンドポイント
app.get('/api/external-templates', async (req, res) => {
  try {
    const response = await fetch('https://tsubasagit.github.io/AppNavi-asset/api/templates.json');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching external templates:', error);
    res.status(500).json({ error: 'Failed to fetch external templates' });
  }
});
```

#### 方法2: CORSエラーを適切にハンドリング

CORSエラーが発生した場合、ローカルテンプレートのみ表示し、ユーザーに適切なメッセージを表示します。

```typescript
async function fetchExternalTemplatesWithFallback(): Promise<Template[]> {
  const API_URL = 'https://tsubasagit.github.io/AppNavi-asset/api/templates.json';
  
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: TemplatesResponse = await response.json();
    return data.templates;
  } catch (error) {
    // CORSエラーの場合
    if (error instanceof TypeError) {
      console.warn('CORS error: External templates cannot be loaded.');
      // ユーザーに通知（オプション）
      // showNotification('外部テンプレートを読み込めませんでした。ローカルテンプレートのみ表示します。');
      return [];
    }
    
    console.error('Failed to fetch external templates:', error);
    return [];
  }
}
```

#### 方法3: キャッシュを使用

一度取得したテンプレートをキャッシュし、エラー時はキャッシュから読み込みます。

```typescript
let cachedTemplates: Template[] | null = null;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24時間
let lastFetchTime = 0;

async function fetchExternalTemplatesWithCache(): Promise<Template[]> {
  const now = Date.now();
  
  // キャッシュが有効な場合
  if (cachedTemplates && (now - lastFetchTime) < CACHE_DURATION) {
    return cachedTemplates;
  }
  
  try {
    const templates = await fetchExternalTemplates();
    cachedTemplates = templates;
    lastFetchTime = now;
    return templates;
  } catch (error) {
    // エラー時はキャッシュがあればキャッシュから返す
    if (cachedTemplates) {
      console.warn('Using cached templates due to fetch error');
      return cachedTemplates;
    }
    return [];
  }
}
```

## 5. エラーハンドリング

### 推奨されるエラーハンドリング

```typescript
async function fetchExternalTemplates(): Promise<Template[]> {
  const API_URL = 'https://tsubasagit.github.io/AppNavi-asset/api/templates.json';
  
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    });

    if (!response.ok) {
      // HTTPエラー（404, 500など）
      console.error(`HTTP error! status: ${response.status}`);
      return [];
    }

    const data: TemplatesResponse = await response.json();
    
    // データの検証
    if (!data.templates || !Array.isArray(data.templates)) {
      console.error('Invalid response format');
      return [];
    }
    
    // 必須フィールドの検証
    const validTemplates = data.templates.filter(template => 
      template.templateId && 
      template.name && 
      template.description &&
      template.category &&
      template.color &&
      template.version &&
      template.isPublic !== undefined &&
      Array.isArray(template.tags) &&
      template.author
    );
    
    if (validTemplates.length < data.templates.length) {
      console.warn(`Some templates were filtered out due to missing required fields`);
    }
    
    return validTemplates;
  } catch (error) {
    // ネットワークエラー、CORSエラーなど
    if (error instanceof TypeError) {
      console.warn('Network error or CORS error:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    
    // エラー時は空配列を返す（ローカルテンプレートのみ表示）
    return [];
  }
}
```

## 6. テスト方法

### ローカルテスト

```bash
# APIの動作確認
curl https://tsubasagit.github.io/AppNavi-asset/api/templates.json

# CORSヘッダーの確認
curl -H "Origin: https://example.com" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://tsubasagit.github.io/AppNavi-asset/api/templates.json
```

### ブラウザでのテスト

```javascript
// ブラウザの開発者ツールのコンソールで実行
fetch('https://tsubasagit.github.io/AppNavi-asset/api/templates.json')
  .then(response => response.json())
  .then(data => {
    console.log('Templates:', data.templates);
    console.log('Count:', data.templates.length);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

## 7. トラブルシューティング

### 問題1: CORSエラーが発生する

**症状**: ブラウザのコンソールにCORSエラーが表示される

**解決方法**:
1. プロキシサーバー経由で取得する（推奨）
2. CORSエラーを適切にハンドリングし、ローカルテンプレートのみ表示
3. Netlify/Vercelへの移行を検討（Asset側）

### 問題2: 404エラーが発生する

**症状**: `Failed to fetch` または `404 Not Found`

**解決方法**:
1. URLが正しいか確認: `https://tsubasagit.github.io/AppNavi-asset/api/templates.json`
2. GitHub Pagesのデプロイが完了しているか確認
3. ブラウザのキャッシュをクリア

### 問題3: レスポンス形式が正しくない

**症状**: JSONパースエラーが発生する

**解決方法**:
1. レスポンスのContent-Typeが`application/json`であることを確認
2. レスポンスの形式を検証
3. 必須フィールドの存在を確認

## 8. 実装チェックリスト

- [ ] テンプレート一覧取得APIの実装
- [ ] CORSエラーのハンドリング
- [ ] エラー時のフォールバック（ローカルテンプレートのみ表示）
- [ ] データの検証（必須フィールドのチェック）
- [ ] キャッシュ機能の実装（オプション）
- [ ] ユーザーへのエラーメッセージ表示
- [ ] ローディング状態の表示
- [ ] テストの実装

## 9. インストール済みテンプレートの更新検出

### 概要

既にインストール済みのテンプレート（CRM、ブランクページなど）がある場合、新規アプリ作成時の「方針」タブで「インストール」ボタンではなく「更新」ボタンを表示する必要があります。

### 実装方法

詳細は [テンプレートの更新検出ガイド](./TEMPLATE_UPDATE_DETECTION.md) を参照してください。

**要点**:
1. インストール済みテンプレートのリストを保持
2. テンプレート一覧APIから取得したバージョンと比較
3. バージョンが新しい場合は「更新」ボタンを表示
4. バージョンが同じ場合は「インストール済み」を表示

**実装例**:
```typescript
// インストール済みテンプレートと比較
const installed = installedTemplates.find(
  t => t.templateId === template.templateId
);

if (installed) {
  const needsUpdate = compareVersions(template.version, installed.version) > 0;
  if (needsUpdate) {
    // 「更新」ボタンを表示
    template.action = 'update';
  } else {
    // 「インストール済み」を表示
    template.action = 'installed';
  }
} else {
  // 「インストール」ボタンを表示
  template.action = 'install';
}
```

## 10. 連絡先

### 質問・問題報告

- GitHub Issues: `https://github.com/tsubasagit/AppNavi-asset/issues`
- 技術的な質問: （必要に応じて追加）

### 関連ドキュメント

- [AppNavi-asset開発仕様書](./APPNAVI_INTEGRATION_SPEC.md)
- [CORSトラブルシューティングガイド](./CORS_TROUBLESHOOTING.md)
- [実装サマリー](./IMPLEMENTATION_SUMMARY.md)
- [テンプレートの更新検出ガイド](./TEMPLATE_UPDATE_DETECTION.md)

---

**最終更新日**: 2024年12月29日  
**バージョン**: 1.0.0
