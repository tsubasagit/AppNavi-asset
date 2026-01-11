# テンプレート実装ガイド

このドキュメントは、テンプレートからAppNaviアプリケーションを生成する機能の実装ガイドです。

## 実装内容

### 1. テンプレート定義ファイル

各テンプレートには以下の定義ファイルが必要です：

- `schema.json` - データベーススキーマ定義
- `views.json` - 画面構成（ビュー）定義
- `sample-data.json` - サンプルデータ

#### ディレクトリ構造

```
templates/
├── templates/
│   └── {template-id}/
│       ├── index.html          # テンプレート詳細ページ
│       ├── schema.json         # スキーマ定義
│       ├── views.json          # ビュー定義
│       └── sample-data.json    # サンプルデータ
├── api/
│   └── templates.json          # テンプレートメタデータ
└── utils/
    └── spreadsheet-generator.js # スプレッドシート生成ユーティリティ
```

### 2. APIエンドポイント

以下のAPIエンドポイントが実装されています：

1. **GET /api/templates/{templateId}/schema.json**
   - スキーマ定義を取得

2. **GET /api/templates/{templateId}/views.json**
   - ビュー定義を取得

3. **GET /api/templates/{templateId}/sample-data.json**
   - サンプルデータを取得

4. **GET /api/templates/{templateId}/spreadsheet**
   - Googleスプレッドシート形式（CSV）のデータを生成
   - クエリパラメータ:
     - `format`: `csv` (デフォルト) または `integrated`
     - `table`: 特定のテーブルのみ取得

5. **GET /api/templates/{templateId}/apply.json**
   - テンプレート適用用の統合データを取得

### 3. サーバー実装

#### 基本サーバー（静的ファイルのみ）

```bash
node templates/server.js
```

#### 拡張サーバー（APIルーティング対応）

```bash
node templates/server-enhanced.js
```

拡張サーバーは以下の機能を提供します：
- 動的APIルーティング
- パラメータ抽出
- エラーハンドリング

### 4. Googleスプレッドシート生成

`templates/utils/spreadsheet-generator.js` が以下の機能を提供します：

- JSONデータをCSV形式に変換
- 日付・通貨・パーセンテージのフォーマット
- CSVエスケープ処理
- 統合形式（全テーブルを1つのCSVに）の生成

## 使用方法

### 1. テンプレート定義ファイルの作成

新しいテンプレートを作成する場合：

1. `templates/templates/{template-id}/` ディレクトリを作成
2. `schema.json` を作成（データベース構造を定義）
3. `views.json` を作成（画面構成を定義）
4. `sample-data.json` を作成（サンプルデータを定義）

### 2. APIの使用

#### AppNavi側でのテンプレート適用

```typescript
// 統合APIを使用してテンプレート情報を取得
const response = await fetch('https://template-server.com/api/templates/crm/apply.json');
const template = await response.json();

// データベーススキーマを生成
template.schema.tables.forEach(table => {
  createTable(table);
});

// ビュー（画面）を生成
template.views.forEach(view => {
  createView(view);
});

// サンプルデータを投入
Object.entries(template.sampleData).forEach(([tableName, rows]) => {
  insertSampleData(tableName, rows);
});
```

#### Googleスプレッドシート形式のデータ取得

```typescript
// 個別テーブル形式
const response = await fetch('https://template-server.com/api/templates/crm/spreadsheet');
const data = await response.json();
// data.tables.customers.csv などで各テーブルのCSVを取得

// 統合形式（全テーブルを1つのCSVに）
const csvResponse = await fetch('https://template-server.com/api/templates/crm/spreadsheet?format=integrated');
const csv = await csvResponse.text();
// Googleスプレッドシートにインポート可能なCSV形式
```

### 3. 静的ホスティングでの使用

静的ホスティング（GitHub Pages、Firebase Hostingなど）では、動的APIは使用できません。

代わりに、静的JSONファイルに直接アクセスします：

```typescript
// 静的ファイルとして直接アクセス
const schema = await fetch('https://template-server.com/templates/crm/schema.json').then(r => r.json());
const views = await fetch('https://template-server.com/templates/crm/views.json').then(r => r.json());
const sampleData = await fetch('https://template-server.com/templates/crm/sample-data.json').then(r => r.json());
```

## 既存テンプレートの例

### CRMテンプレート

`templates/templates/crm/` に完全な実装例があります：

- **schema.json**: 3つのテーブル（customers, deals, activities）を定義
- **views.json**: 4つのビュー（顧客一覧、商談パイプライン、活動履歴、営業ダッシュボード）を定義
- **sample-data.json**: 各テーブルのサンプルデータを含む

## 次のステップ

### AppNavi本体での実装

AppNavi本体で以下の機能を実装する必要があります：

1. **テンプレート適用機能**
   - スキーマからデータベーステーブルを生成
   - ビュー定義から画面を生成
   - サンプルデータを投入

2. **Googleスプレッドシート連携**
   - CSVデータをGoogleスプレッドシートにインポート
   - Googleスプレッドシートからデータをエクスポート

3. **テンプレート選択UI**
   - テンプレート一覧の表示
   - テンプレート詳細の表示
   - テンプレート適用ボタン

## トラブルシューティング

### APIが404を返す場合

- テンプレートIDが正しいか確認
- 定義ファイルが存在するか確認
- サーバーのルーティング設定を確認

### CSV生成が失敗する場合

- サンプルデータの形式が正しいか確認
- スキーマ定義とサンプルデータの整合性を確認
- サーバーログでエラー内容を確認

### 静的ホスティングで動作しない場合

- 静的ファイルが正しくデプロイされているか確認
- CORS設定を確認
- ファイルパスが正しいか確認

---

**最終更新日**: 2024年12月29日
