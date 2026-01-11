# テンプレートAPI仕様書

このドキュメントは、テンプレートからAppNaviアプリケーションを生成するためのAPI仕様を説明します。

## 概要

テンプレートサーバーは、以下のAPIエンドポイントを提供します：

1. **スキーマ定義API** - データベース構造の定義
2. **ビュー定義API** - 画面構成の定義
3. **サンプルデータAPI** - サンプルデータの取得
4. **スプレッドシート生成API** - Googleスプレッドシート形式のデータ生成
5. **統合適用API** - テンプレート適用用の統合データ

## APIエンドポイント

### 1. スキーマ定義API

**エンドポイント**: `GET /api/templates/{templateId}/schema.json`

**説明**: テンプレートのデータベーススキーマ定義を取得します。

**レスポンス例**:
```json
{
  "templateId": "crm",
  "version": "1.0.0",
  "name": "顧客管理（CRM）",
  "description": "顧客情報、商談管理、活動履歴を一元管理",
  "tables": [
    {
      "name": "customers",
      "label": "顧客",
      "fields": [
        {
          "name": "id",
          "label": "ID",
          "type": "string",
          "required": true,
          "primaryKey": true,
          "autoGenerate": true
        },
        {
          "name": "name",
          "label": "顧客名",
          "type": "string",
          "required": true
        }
      ]
    }
  ],
  "relationships": [...]
}
```

### 2. ビュー定義API

**エンドポイント**: `GET /api/templates/{templateId}/views.json`

**説明**: テンプレートの画面構成（ビュー）定義を取得します。

**レスポンス例**:
```json
{
  "templateId": "crm",
  "version": "1.0.0",
  "views": [
    {
      "id": "customer-list",
      "name": "顧客一覧",
      "type": "table",
      "table": "customers",
      "columns": [...],
      "filters": [...],
      "actions": [...]
    },
    {
      "id": "deal-pipeline",
      "name": "商談パイプライン",
      "type": "kanban",
      "table": "deals",
      "stages": [...]
    }
  ]
}
```

### 3. サンプルデータAPI

**エンドポイント**: `GET /api/templates/{templateId}/sample-data.json`

**説明**: テンプレートのサンプルデータを取得します。

**レスポンス例**:
```json
{
  "templateId": "crm",
  "version": "1.0.0",
  "data": {
    "customers": [
      {
        "id": "cust_001",
        "name": "田中太郎",
        "company": "株式会社ABC",
        ...
      }
    ],
    "deals": [...],
    "activities": [...]
  }
}
```

### 4. スプレッドシート生成API

**エンドポイント**: `GET /api/templates/{templateId}/spreadsheet`

**説明**: サンプルデータをGoogleスプレッドシート形式（CSV）で取得します。

**クエリパラメータ**:
- `format`: `csv` (デフォルト) または `integrated`
- `table`: 特定のテーブルのみ取得する場合

**レスポンス例（format=csv, table指定なし）**:
```json
{
  "templateId": "crm",
  "format": "csv",
  "tables": {
    "customers": {
      "csv": "顧客名,会社名,メールアドレス,...\n田中太郎,株式会社ABC,tanaka@abc.co.jp,...",
      "headers": ["顧客名", "会社名", "メールアドレス", ...],
      "rowCount": 5
    },
    "deals": {...},
    "activities": {...}
  }
}
```

**レスポンス例（format=csv, table=customers）**:
```
顧客名,会社名,メールアドレス,電話番号,ステータス,見込み度,商談金額,担当者,最終接触日,備考
田中太郎,株式会社ABC,tanaka@abc.co.jp,03-1234-5678,商談中,高,¥5,000,000,営業部 山田,2024-01-15,来月に最終提案予定
...
```

**レスポンス例（format=integrated）**:
```
=== customers ===
顧客名,会社名,メールアドレス,...
田中太郎,株式会社ABC,tanaka@abc.co.jp,...

=== deals ===
商談タイトル,ステージ,金額,...
新規システム導入,提案中,¥5,000,000,...
```

### 5. 統合適用API

**エンドポイント**: `GET /api/templates/{templateId}/apply.json`

**説明**: テンプレート適用に必要な全情報（スキーマ、ビュー、サンプルデータ）を統合して取得します。

**レスポンス例**:
```json
{
  "templateId": "crm",
  "version": "1.0.0",
  "name": "顧客管理（CRM）",
  "description": "顧客情報、商談管理、活動履歴を一元管理",
  "schema": {...},
  "views": [...],
  "sampleData": {...},
  "metadata": {
    "hasViews": true,
    "hasSampleData": true,
    "tableCount": 3,
    "viewCount": 4
  }
}
```

## 使用例

### AppNavi側でのテンプレート適用

```typescript
// 1. テンプレート情報を取得
const response = await fetch('https://template-server.com/api/templates/crm/apply.json');
const template = await response.json();

// 2. データベーススキーマを生成
template.schema.tables.forEach(table => {
  // AppNaviのデータベースにテーブルを作成
  createTable(table);
});

// 3. ビュー（画面）を生成
template.views.forEach(view => {
  // AppNaviの画面にビューを作成
  createView(view);
});

// 4. サンプルデータを投入
Object.entries(template.sampleData).forEach(([tableName, rows]) => {
  // 各テーブルにサンプルデータを投入
  insertSampleData(tableName, rows);
});
```

### Googleスプレッドシートへのエクスポート

```typescript
// 1. スプレッドシートデータを取得
const response = await fetch('https://template-server.com/api/templates/crm/spreadsheet?format=integrated');
const csv = await response.text();

// 2. Googleスプレッドシートにインポート
// (Google Sheets APIを使用)
```

## エラーレスポンス

すべてのAPIは、エラー時に以下の形式でレスポンスを返します：

```json
{
  "error": "エラーメッセージ",
  "templateId": "crm",
  "message": "詳細なエラーメッセージ（開発用）"
}
```

**HTTPステータスコード**:
- `200`: 成功
- `404`: テンプレートまたはリソースが見つからない
- `500`: サーバーエラー

## CORS設定

すべてのAPIエンドポイントは、CORS（Cross-Origin Resource Sharing）を有効にしています：

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

## 静的ホスティング対応

静的ホスティング（GitHub Pages、Firebase Hostingなど）で使用する場合、以下の静的ファイルが提供されます：

- `/templates/{templateId}/schema.json`
- `/templates/{templateId}/views.json`
- `/templates/{templateId}/sample-data.json`

動的API（`/api/templates/{templateId}/spreadsheet`など）は、Node.jsサーバーが必要です。

---

**最終更新日**: 2024年12月29日
