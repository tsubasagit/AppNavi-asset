# 顧客管理（CRM）テンプレート - 詳細情報

## 概要

顧客管理（CRM）テンプレートには、以下の詳細な定義が含まれています：

1. **データベーススキーマ定義** (`schema.json`)
2. **UIデザイン定義** (`views.json`)
3. **サンプルデータ** (`sample-data.json`)

## ファイル構成

### 1. schema.json（データベーススキーマ定義）

**場所**: `templates/templates/crm/schema.json`

**内容**:
- テーブル定義（`customers`, `deals`, `activities`）
- 各テーブルのフィールド定義
- フィールドの型、必須項目、バリデーション
- テーブル間のリレーションシップ

**主要テーブル**:
- **customers**（顧客マスタ）: 25件のサンプルデータ
  - 顧客ID、顧客名、会社名、部署名、役職
  - メールアドレス、電話番号、住所
  - 業種、従業員数、年商
  - 顧客ステータス、見込み度、担当者
  - 最終接触日、登録日、備考

- **deals**（商談管理）: 20件のサンプルデータ
  - 商談ID、顧客ID（外部キー）
  - 商談名、商談金額
  - 商談ステージ、見込み度、見込み成約日
  - 担当者、開始日、更新日、成約日
  - 失注理由、備考

- **activities**（活動履歴）: 60件のサンプルデータ
  - 活動ID、顧客ID（外部キー）
  - 活動日時、活動種別、活動タイトル
  - 活動内容、担当者
  - 次回アクション、次回アクション日
  - 重要度

### 2. views.json（UIデザイン定義）

**場所**: `templates/templates/crm/views.json`

**内容**:
- ダッシュボード定義
- テーブルビュー定義
- カンバンビュー定義
- タイムラインビュー定義
- 詳細ページ定義

**主要ビュー**:
- **営業ダッシュボード**: KPI表示、グラフ、最近の活動
- **顧客一覧テーブル**: 検索、フィルター、ソート機能
- **商談パイプライン（カンバン）**: ステージ別のカンバンボード
- **活動履歴タイムライン**: 時系列での活動表示
- **顧客詳細ページ**: 顧客情報と関連商談・活動の表示

### 3. sample-data.json（サンプルデータ）

**場所**: `templates/templates/crm/sample-data.json`

**内容**:
- 25件の顧客データ
- 20件の商談データ
- 60件の活動履歴データ

## APIエンドポイント

### GitHub Pagesでのアクセス

**スキーマ定義**:
```
https://tsubasagit.github.io/AppNavi-asset/templates/crm/schema.json
```

**ビュー定義**:
```
https://tsubasagit.github.io/AppNavi-asset/templates/crm/views.json
```

**サンプルデータ**:
```
https://tsubasagit.github.io/AppNavi-asset/templates/crm/sample-data.json
```

## AppNavi側での使用方法

### 1. テンプレート一覧から詳細情報を取得

```typescript
// テンプレート一覧を取得
const response = await fetch('https://tsubasagit.github.io/AppNavi-asset/api/templates.json');
const { templates } = await response.json();

// CRMテンプレートを検索
const crmTemplate = templates.find(t => t.templateId === 'crm');

// 詳細定義を取得
const [schema, views, sampleData] = await Promise.all([
  fetch(crmTemplate.schemaUrl).then(r => r.json()),
  fetch(crmTemplate.viewsUrl).then(r => r.json()),
  fetch(crmTemplate.sampleDataUrl).then(r => r.json())
]);

// テンプレートを適用
applyTemplate({
  templateId: crmTemplate.templateId,
  schema: schema,
  views: views.views,
  sampleData: sampleData.data
});
```

### 2. 直接URLから取得

```typescript
const BASE_URL = 'https://tsubasagit.github.io/AppNavi-asset';

const schema = await fetch(`${BASE_URL}/templates/crm/schema.json`).then(r => r.json());
const views = await fetch(`${BASE_URL}/templates/crm/views.json`).then(r => r.json());
const sampleData = await fetch(`${BASE_URL}/templates/crm/sample-data.json`).then(r => r.json());
```

## データ構造の詳細

### customers テーブル

| フィールド名 | 型 | 説明 | 必須 |
|------------|-----|------|------|
| id | string | 顧客ID | ✅ |
| name | string | 顧客名 | ✅ |
| company | string | 会社名 | ✅ |
| department | string | 部署名 | - |
| position | string | 役職 | - |
| email | email | メールアドレス | - |
| phone | string | 電話番号 | - |
| postalCode | string | 郵便番号 | - |
| address | string | 住所 | - |
| industry | select | 業種 | - |
| employeeCount | number | 従業員数 | - |
| annualRevenue | number | 年商 | - |
| status | select | 顧客ステータス | ✅ |
| probability | select | 見込み度 | - |
| assignedTo | string | 担当者 | - |
| lastContact | date | 最終接触日 | - |
| registrationDate | date | 登録日 | ✅ |
| notes | text | 備考 | - |

### deals テーブル

| フィールド名 | 型 | 説明 | 必須 |
|------------|-----|------|------|
| id | string | 商談ID | ✅ |
| customerId | string | 顧客ID（外部キー） | ✅ |
| name | string | 商談名 | ✅ |
| amount | number | 商談金額 | ✅ |
| stage | select | 商談ステージ | ✅ |
| probability | number | 見込み度（%） | - |
| expectedCloseDate | date | 見込み成約日 | - |
| assignedTo | string | 担当者 | - |
| startDate | date | 開始日 | ✅ |
| updateDate | date | 更新日 | ✅ |
| closeDate | date | 成約日 | - |
| lostReason | string | 失注理由 | - |
| notes | text | 備考 | - |

### activities テーブル

| フィールド名 | 型 | 説明 | 必須 |
|------------|-----|------|------|
| id | string | 活動ID | ✅ |
| customerId | string | 顧客ID（外部キー） | ✅ |
| activityDate | datetime | 活動日時 | ✅ |
| type | select | 活動種別 | ✅ |
| title | string | 活動タイトル | ✅ |
| content | text | 活動内容 | - |
| assignedTo | string | 担当者 | - |
| nextAction | string | 次回アクション | - |
| nextActionDate | date | 次回アクション日 | - |
| priority | select | 重要度 | - |

## ビューの詳細

### 1. 営業ダッシュボード

- **総顧客数**: 顧客テーブルの件数
- **今月の新規リード**: 今月登録された見込み顧客
- **対応中の商談数**: 商談中・提案中の商談数
- **成約率**: 成約商談 / 全商談
- **商談パイプライン**: ステージ別の商談数（グラフ）
- **最近の活動**: 最新10件の活動履歴

### 2. 顧客一覧テーブル

- 検索機能（顧客名、会社名）
- フィルター（ステータス、見込み度、担当者）
- ソート機能
- 新規顧客登録ボタン

### 3. 商談パイプライン（カンバン）

- ステージ別のカンバンボード
- ドラッグ&ドロップでステージ変更
- 商談カードに金額、見込み度、成約予定日を表示

### 4. 活動履歴タイムライン

- 時系列での活動表示
- 活動種別ごとのアイコン表示
- 次回アクションの表示

### 5. 顧客詳細ページ

- 顧客情報の編集
- 関連商談の一覧
- 活動履歴のタイムライン表示

---

**最終更新日**: 2024年12月29日
