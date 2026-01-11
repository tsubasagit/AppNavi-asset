# 顧客管理（CRM）テンプレート - IDとURL情報

## 基本情報

- **ID**: `1`
- **templateId**: `crm`
- **名前**: `顧客管理（CRM）`
- **バージョン**: `1.0.0`

## URL情報

### GitHub Pagesでデプロイしている場合

**ベースURL**: `https://tsubasagit.github.io/AppNavi-asset/` （実際のデプロイURLに応じて変更）

#### 1. テンプレートメタデータ
```
GET https://tsubasagit.github.io/AppNavi-asset/api/templates.json
```

#### 2. 統合適用API（推奨）
```
GET https://tsubasagit.github.io/AppNavi-asset/api/templates/crm/apply.json
```
**注意**: GitHub Pagesでは動的APIが動作しないため、静的JSONファイルとして直接アクセス：
```
GET https://tsubasagit.github.io/AppNavi-asset/templates/crm/schema.json
GET https://tsubasagit.github.io/AppNavi-asset/templates/crm/views.json
GET https://tsubasagit.github.io/AppNavi-asset/templates/crm/sample-data.json
```

#### 3. 個別APIエンドポイント

**スキーマ定義**:
```
GET https://tsubasagit.github.io/AppNavi-asset/templates/crm/schema.json
```

**ビュー定義**:
```
GET https://tsubasagit.github.io/AppNavi-asset/templates/crm/views.json
```

**サンプルデータ**:
```
GET https://tsubasagit.github.io/AppNavi-asset/templates/crm/sample-data.json
```

**CSV生成**（GitHub Pagesでは動作しない）:
```
GET https://tsubasagit.github.io/AppNavi-asset/api/templates/crm/spreadsheet
```

#### 4. テンプレート詳細ページ
```
https://tsubasagit.github.io/AppNavi-asset/templates/crm/
```

### 相対パス（AppNavi側で使用する場合）

テンプレートサーバーのベースURLを環境変数で設定する場合：

```typescript
const TEMPLATE_SERVER_URL = 'https://tsubasagit.github.io/AppNavi-asset'

// 統合適用API
const applyUrl = `${TEMPLATE_SERVER_URL}/templates/crm/schema.json`
// または静的JSONファイルとして
const schemaUrl = `${TEMPLATE_SERVER_URL}/templates/crm/schema.json`
const viewsUrl = `${TEMPLATE_SERVER_URL}/templates/crm/views.json`
const sampleDataUrl = `${TEMPLATE_SERVER_URL}/templates/crm/sample-data.json`
```

## AppNavi側での使用例

### 方法1: 統合適用APIを使用（推奨）

```typescript
// 統合データを取得
const response = await fetch('https://tsubasagit.github.io/AppNavi-asset/templates/crm/schema.json')
const schema = await response.json()

const viewsResponse = await fetch('https://tsubasagit.github.io/AppNavi-asset/templates/crm/views.json')
const views = await viewsResponse.json()

const dataResponse = await fetch('https://tsubasagit.github.io/AppNavi-asset/templates/crm/sample-data.json')
const sampleData = await dataResponse.json()

// テンプレートを適用
applyTemplate({
  id: 1,
  templateId: 'crm',
  schema: schema,
  views: views.views,
  sampleData: sampleData.data
})
```

### 方法2: テンプレートメタデータから取得

```typescript
// 1. テンプレート一覧を取得
const templatesResponse = await fetch('https://tsubasagit.github.io/AppNavi-asset/api/templates.json')
const { templates } = await templatesResponse.json()

// 2. CRMテンプレートを検索
const crmTemplate = templates.find(t => t.id === 1 || t.templateId === 'crm')

// 3. 各URLからデータを取得
const schema = await fetch(crmTemplate.schemaUrl.replace('/api/', '/')).then(r => r.json())
const views = await fetch(crmTemplate.viewsUrl.replace('/api/', '/')).then(r => r.json())
const sampleData = await fetch(crmTemplate.sampleDataUrl.replace('/api/', '/')).then(r => r.json())
```

## 注意事項

### GitHub Pagesの制限

1. **動的APIは動作しない**
   - `/api/templates/crm/apply.json` は動的APIのため、GitHub Pagesでは動作しません
   - 代わりに静的JSONファイルに直接アクセスしてください

2. **静的JSONファイルとしてアクセス**
   - `/templates/crm/schema.json`
   - `/templates/crm/views.json`
   - `/templates/crm/sample-data.json`

3. **CSV生成APIは動作しない**
   - `/api/templates/crm/spreadsheet` は動的処理のため動作しません
   - 事前にCSVファイルを生成するか、クライアント側で生成してください

## 動作確認用URL

実際のデプロイURLを確認するには、以下をブラウザで開いてください：

1. **テンプレート一覧**: `https://tsubasagit.github.io/AppNavi-asset/api/templates.json`
2. **CRMスキーマ**: `https://tsubasagit.github.io/AppNavi-asset/templates/crm/schema.json`
3. **CRMビュー**: `https://tsubasagit.github.io/AppNavi-asset/templates/crm/views.json`
4. **CRMサンプルデータ**: `https://tsubasagit.github.io/AppNavi-asset/templates/crm/sample-data.json`

---

**最終更新日**: 2024年12月29日
