# 顧客管理（CRM）テンプレート - クイックリファレンス

## 基本情報

| 項目 | 値 |
|------|-----|
| **ID** | `1` |
| **templateId** | `crm` |
| **名前** | `顧客管理（CRM）` |
| **カテゴリ** | `営業・マーケティング` |
| **バージョン** | `1.0.0` |

## 主要URL（GitHub Pages）

**ベースURL**: `https://tsubasagit.github.io/AppNavi-asset`

### テンプレートメタデータ
```
https://tsubasagit.github.io/AppNavi-asset/api/templates.json
```

### 統合適用用URL（静的JSONファイル）

```
スキーマ定義:
https://tsubasagit.github.io/AppNavi-asset/templates/crm/schema.json

ビュー定義:
https://tsubasagit.github.io/AppNavi-asset/templates/crm/views.json

サンプルデータ:
https://tsubasagit.github.io/AppNavi-asset/templates/crm/sample-data.json
```

### テンプレート詳細ページ
```
https://tsubasagit.github.io/AppNavi-asset/templates/crm/
```

## AppNavi側での使用

### 最小限の実装例

```typescript
// テンプレートサーバーのベースURL
const TEMPLATE_SERVER_URL = 'https://tsubasagit.github.io/AppNavi-asset'

// CRMテンプレートのID
const CRM_TEMPLATE_ID = 1
const CRM_TEMPLATE_ID_STRING = 'crm'

// スキーマ定義を取得
async function loadCRMTemplate() {
  const schemaUrl = `${TEMPLATE_SERVER_URL}/templates/crm/schema.json`
  const viewsUrl = `${TEMPLATE_SERVER_URL}/templates/crm/views.json`
  const sampleDataUrl = `${TEMPLATE_SERVER_URL}/templates/crm/sample-data.json`
  
  const [schema, views, sampleData] = await Promise.all([
    fetch(schemaUrl).then(r => r.json()),
    fetch(viewsUrl).then(r => r.json()),
    fetch(sampleDataUrl).then(r => r.json())
  ])
  
  return {
    id: CRM_TEMPLATE_ID,
    templateId: CRM_TEMPLATE_ID_STRING,
    schema: schema,
    views: views.views,
    sampleData: sampleData.data
  }
}
```

## データ構造

### テーブル
- `customers` - 顧客マスタ（25件のサンプルデータ）
- `deals` - 商談管理（20件のサンプルデータ）
- `activities` - 活動履歴（60件のサンプルデータ）

### ビュー
- `dashboard` - ダッシュボード（KPI、グラフ、最近の活動）
- `customer-list` - 顧客一覧（テーブル）
- `deal-pipeline` - 商談パイプライン（カンバン）
- `customer-detail` - 顧客詳細（フォーム、関連商談、活動履歴）

---

**最終更新日**: 2024年12月29日
