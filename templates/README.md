# テンプレートサーバー

AppNaviのテンプレートを公開・配信するためのサーバーです。

**リポジトリ**: https://github.com/tsubasagit/AppNavi-asset

## クイックスタート

詳細な構築手順については、[BUILD_INSTRUCTIONS.md](./BUILD_INSTRUCTIONS.md)を参照してください。

## ディレクトリ構造

```
templates/
├── index.html              # テンプレート一覧ページ
├── api/
│   └── templates.json      # テンプレートメタデータAPI
├── templates/
│   ├── crm/                # 顧客管理（CRM）テンプレート
│   ├── google-calendar-group/  # Googleカレンダー管理テンプレート
│   ├── daily-report/       # 日報チェックテンプレート
│   └── auto-integration/   # 自動連携テンプレート
└── assets/                 # 共通アセット（CSS、JS、画像など）
```

## デプロイ方法

### Firebase Hosting

```bash
cd templates
firebase init hosting
firebase deploy
```

### Netlify

```bash
cd templates
netlify deploy --prod
```

### Vercel

```bash
cd templates
vercel deploy --prod
```

### 静的ファイルサーバー

```bash
cd templates
# Python
python -m http.server 8000

# Node.js
npx serve .
```

## API仕様

### GET /api/templates.json

すべてのテンプレートのメタデータを返します。

```json
{
  "templates": [
    {
      "templateId": "crm",
      "name": "顧客管理（CRM）",
      "description": "顧客情報、商談管理、活動履歴を一元管理",
      "category": "営業・マーケティング",
      "color": "#8b5cf6",
      "previewImageUrl": "/templates/crm/preview.png",
      "demoUrl": "/templates/crm/",
      "version": "1.0.0",
      "isPublic": true
    }
  ]
}
```

### GET /api/templates/{templateId}/schema.json

テンプレートのデータベーススキーマ定義を取得します。

### GET /api/templates/{templateId}/views.json

テンプレートの画面構成（ビュー）定義を取得します。

### GET /api/templates/{templateId}/sample-data.json

テンプレートのサンプルデータを取得します。

### GET /api/templates/{templateId}/spreadsheet

サンプルデータをGoogleスプレッドシート形式（CSV）で取得します。

**クエリパラメータ**:
- `format`: `csv` (デフォルト) または `integrated`
- `table`: 特定のテーブルのみ取得する場合

### GET /api/templates/{templateId}/apply.json

テンプレート適用に必要な全情報（スキーマ、ビュー、サンプルデータ）を統合して取得します。

詳細は [API仕様書](../docs/TEMPLATE_API_SPECIFICATION.md) を参照してください。

## AppNaviとの連携

AppNaviの「方針」タブから、このサーバーのテンプレートを取得して表示します。

設定例：
```typescript
const TEMPLATE_SERVER_URL = 'https://templates.appnavi.com'
```

## サーバーの起動

### 基本サーバー（静的ファイルのみ）

```bash
node templates/server.js
```

### 拡張サーバー（APIルーティング対応）

```bash
node templates/server-enhanced.js
```

拡張サーバーは動的APIエンドポイント（スプレッドシート生成など）を提供します。

## ドキュメント

- [BUILD_INSTRUCTIONS.md](./BUILD_INSTRUCTIONS.md) - 詳細な構築手順
- [QUICK_START.md](./QUICK_START.md) - クイックスタートガイド
- [CHECKLIST.md](./CHECKLIST.md) - 構築チェックリスト
- [../docs/TEMPLATE_API_SPECIFICATION.md](../docs/TEMPLATE_API_SPECIFICATION.md) - API仕様書
- [../docs/TEMPLATE_IMPLEMENTATION_GUIDE.md](../docs/TEMPLATE_IMPLEMENTATION_GUIDE.md) - 実装ガイド
- [../docs/TEMPLATE_REQUIREMENTS.md](../docs/TEMPLATE_REQUIREMENTS.md) - テンプレート作成要件




