# CRMテンプレート ビュー表示のトラブルシューティング

## 問題

CRMテンプレートを選択しても、ダッシュボードのページしか表示されず、他のビュー（顧客一覧、商談パイプラインなど）が表示されない。

## 確認事項

### 1. views.jsonの構造

views.jsonは以下の構造になっている必要があります：

```json
{
  "templateId": "crm",
  "version": "2.0.0",
  "views": [
    {
      "id": "dashboard",
      "name": "ダッシュボード",
      "type": "dashboard",
      "route": "/",
      ...
    },
    {
      "id": "customer-list",
      "name": "顧客一覧",
      "type": "table",
      "route": "/customers",
      ...
    },
    ...
  ],
  "theme": {
    ...
  }
}
```

### 2. 各ビューの必須フィールド

各ビューには以下のフィールドが必要です：

- `id`: ビューの一意の識別子
- `name`: ビューの表示名
- `type`: ビューのタイプ（`dashboard`, `table`, `kanban`, `detail`など）
- `route`: ビューのルートパス

### 3. views.jsonのURL

views.jsonは以下のURLでアクセス可能である必要があります：

```
https://tsubasagit.github.io/AppNavi-asset/templates/crm/views.json
```

### 4. AppNavi側での読み込み方法

AppNavi側でviews.jsonを読み込む際は、以下のように`views`配列を取得する必要があります：

```typescript
const response = await fetch('https://tsubasagit.github.io/AppNavi-asset/templates/crm/views.json');
const data = await response.json();
const views = data.views; // views配列を取得
```

## 現在のviews.jsonの構造

現在のCRMテンプレートのviews.jsonには、以下のビューが定義されています：

1. **dashboard** (`route: "/"`) - ダッシュボード
2. **customer-list** (`route: "/customers"`) - 顧客一覧
3. **deal-pipeline** (`route: "/pipeline"`) - 商談パイプライン
4. **customer-detail** (`route: "/customers/:id"`) - 顧客詳細
5. **quotes-list** (`route: "/quotes"`) - 見積書一覧
6. **invoices-list** (`route: "/invoices"`) - 請求書一覧
7. **tasks-list** (`route: "/tasks"`) - タスク管理
8. **contracts-list** (`route: "/contracts"`) - 契約管理
9. **sales-report** (`route: "/reports/sales"`) - 売上分析レポート

## 解決方法

### 方法1: views.jsonの構造を確認

views.jsonが正しい構造になっているか確認してください：

```bash
# views.jsonの構造を確認
curl https://tsubasagit.github.io/AppNavi-asset/templates/crm/views.json | jq '.views | length'
```

### 方法2: AppNavi側でのビュー読み込みを確認

AppNavi側で、views.jsonを読み込む際に、`views`配列を正しく取得しているか確認してください：

```typescript
// 正しい読み込み方法
const response = await fetch(viewsUrl);
const data = await response.json();
const views = data.views; // これが重要

// 各ビューを処理
views.forEach(view => {
  console.log(`View: ${view.name}, Route: ${view.route}, Type: ${view.type}`);
});
```

### 方法3: ビューのナビゲーション設定

AppNavi側で、ビューをナビゲーションメニューに表示するには、各ビューの`route`と`name`を使用する必要があります：

```typescript
// ナビゲーションメニューの生成例
const navigationItems = views
  .filter(view => view.type !== 'detail') // 詳細ページは除外
  .map(view => ({
    label: view.name,
    path: view.route,
    icon: getIconForViewType(view.type)
  }));
```

### 方法4: ダッシュボードのウィジェット表示

ダッシュボードが表示されているが、ウィジェットが表示されない場合は、`widgets`配列が正しく読み込まれているか確認してください：

```typescript
// ダッシュボードビューの取得
const dashboardView = views.find(view => view.type === 'dashboard');

if (dashboardView && dashboardView.widgets) {
  console.log(`Dashboard has ${dashboardView.widgets.length} widgets`);
  dashboardView.widgets.forEach(widget => {
    console.log(`Widget: ${widget.label}, Type: ${widget.type}`);
  });
}
```

## デバッグ方法

### 1. ブラウザの開発者ツールで確認

1. ブラウザの開発者ツールを開く（F12）
2. Networkタブで、views.jsonのリクエストを確認
3. レスポンスの内容を確認し、`views`配列が正しく含まれているか確認

### 2. コンソールで確認

AppNavi側のコンソールで、views.jsonの読み込み結果を確認：

```javascript
// views.jsonを読み込んで確認
fetch('https://tsubasagit.github.io/AppNavi-asset/templates/crm/views.json')
  .then(res => res.json())
  .then(data => {
    console.log('Template ID:', data.templateId);
    console.log('Version:', data.version);
    console.log('Views count:', data.views ? data.views.length : 0);
    console.log('Views:', data.views);
  });
```

## よくある問題

### 問題1: views配列が空

**原因**: views.jsonの構造が正しくない、または`views`プロパティが存在しない

**解決方法**: views.jsonの構造を確認し、`views`配列が正しく定義されているか確認

### 問題2: ビューのrouteが認識されない

**原因**: routeの形式が正しくない、またはAppNavi側でrouteを正しく解釈できていない

**解決方法**: routeは`/`で始まる絶対パス形式で定義されているか確認

### 問題3: ビューのtypeが認識されない

**原因**: typeの値がAppNavi側でサポートされていない

**解決方法**: サポートされているtype（`dashboard`, `table`, `kanban`, `detail`など）を使用しているか確認

## 連絡先

問題が解決しない場合は、以下の情報を含めて報告してください：

1. views.jsonのURL
2. AppNavi側でのエラーメッセージ（コンソールログ）
3. Networkタブでのviews.jsonのレスポンス内容
4. ブラウザのバージョンとOS

---

**最終更新日**: 2024年12月29日
