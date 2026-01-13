# AppNavi側でのビュー表示実装ガイド

## 問題

CRMテンプレートを選択しても、デザインページに「データソースが設定されていません」と表示され、テンプレートのビュー（顧客一覧、商談パイプラインなど）が表示されない。

## 解決方法

### 1. views.jsonの読み込み

テンプレートを選択した際に、views.jsonを読み込んで、ビューをUIに反映する必要があります。

```typescript
// テンプレート適用時の処理
async function applyTemplate(templateId: string) {
  // 1. views.jsonを読み込む
  const viewsUrl = `https://tsubasagit.github.io/AppNavi-asset/templates/${templateId}/views.json`;
  const viewsResponse = await fetch(viewsUrl);
  const viewsData = await viewsResponse.json();
  
  // 2. views配列を取得（重要！）
  const views = viewsData.views;
  
  if (!views || !Array.isArray(views)) {
    console.error('Views array not found in views.json');
    return;
  }
  
  // 3. 各ビューを処理
  views.forEach(view => {
    console.log(`View: ${view.name}, Route: ${view.route}, Type: ${view.type}`);
    // ビューをUIに追加する処理
    addViewToUI(view);
  });
}
```

### 2. ビューをUIタブに追加

views.jsonの各ビューを、AppNaviのデザインページのタブとして表示する必要があります。

```typescript
interface View {
  id: string;
  name: string;
  type: string;
  route: string;
  table?: string;
  // ... その他のプロパティ
}

function addViewToUI(view: View) {
  // タブとして追加
  const tab = {
    id: view.id,
    label: view.name,
    route: view.route,
    type: view.type,
    view: view
  };
  
  // タブリストに追加
  tabs.push(tab);
  
  // ルーティングに追加
  router.addRoute({
    path: view.route,
    component: getViewComponent(view.type),
    props: { view }
  });
}
```

### 3. ビュータイプに応じたコンポーネントの表示

各ビューのタイプ（`dashboard`, `table`, `kanban`, `detail`）に応じて、適切なコンポーネントを表示する必要があります。

```typescript
function getViewComponent(viewType: string) {
  switch (viewType) {
    case 'dashboard':
      return DashboardView;
    case 'table':
      return TableView;
    case 'kanban':
      return KanbanView;
    case 'detail':
      return DetailView;
    default:
      return DefaultView;
  }
}
```

### 4. ダッシュボードビューの実装

ダッシュボードビュー（`type: "dashboard"`）の場合、`widgets`配列を読み込んで、ウィジェットを表示する必要があります。

```typescript
function DashboardView({ view }: { view: View }) {
  const widgets = view.widgets || [];
  
  return (
    <div className="dashboard">
      <div className="dashboard-grid">
        {widgets.map(widget => (
          <Widget
            key={widget.id}
            widget={widget}
            dataSource={view.table} // データソース（テーブル）を設定
          />
        ))}
      </div>
    </div>
  );
}
```

### 5. テーブルビューの実装

テーブルビュー（`type: "table"`）の場合、`table`プロパティで指定されたテーブルからデータを取得して表示する必要があります。

```typescript
function TableView({ view }: { view: View }) {
  const tableName = view.table;
  const columns = view.columns || [];
  
  // データソース（テーブル）を設定
  const dataSource = {
    type: 'table',
    table: tableName
  };
  
  return (
    <div className="table-view">
      <DataTable
        dataSource={dataSource}
        columns={columns}
        searchable={view.searchable}
        filters={view.filters}
        actions={view.actions}
      />
    </div>
  );
}
```

### 6. データソースの設定

各ビューには、対応するデータソース（テーブル）を設定する必要があります。views.jsonの`table`プロパティを使用します。

```typescript
// ビューからデータソースを取得
function getDataSourceFromView(view: View) {
  if (view.table) {
    return {
      type: 'table',
      table: view.table
    };
  }
  
  // ダッシュボードの場合、各ウィジェットにデータソースが設定されている
  if (view.type === 'dashboard' && view.widgets) {
    return view.widgets.map(widget => ({
      widgetId: widget.id,
      dataSource: widget.query?.table
    }));
  }
  
  return null;
}
```

## 完全な実装例

```typescript
// テンプレート適用処理
async function applyTemplate(templateId: string) {
  try {
    // 1. schema.jsonを読み込む（テーブル定義）
    const schemaUrl = `https://tsubasagit.github.io/AppNavi-asset/templates/${templateId}/schema.json`;
    const schemaResponse = await fetch(schemaUrl);
    const schema = await schemaResponse.json();
    
    // テーブルを作成
    schema.tables.forEach(table => {
      createTable(table);
    });
    
    // 2. views.jsonを読み込む（ビュー定義）
    const viewsUrl = `https://tsubasagit.github.io/AppNavi-asset/templates/${templateId}/views.json`;
    const viewsResponse = await fetch(viewsUrl);
    const viewsData = await viewsResponse.json();
    
    // 3. views配列を取得
    const views = viewsData.views || [];
    
    // 4. 各ビューをUIに追加
    views.forEach(view => {
      // タブとして追加
      addTab({
        id: view.id,
        label: view.name,
        route: view.route,
        type: view.type
      });
      
      // ルーティングに追加
      addRoute({
        path: view.route,
        component: getViewComponent(view.type),
        props: { view }
      });
      
      // データソースを設定
      if (view.table) {
        setDataSource(view.id, {
          type: 'table',
          table: view.table
        });
      }
    });
    
    // 5. サンプルデータを読み込む（オプション）
    const sampleDataUrl = `https://tsubasagit.github.io/AppNavi-asset/templates/${templateId}/sample-data.json`;
    const sampleDataResponse = await fetch(sampleDataUrl);
    const sampleData = await sampleDataResponse.json();
    
    // サンプルデータをインポート
    if (sampleData.data) {
      importSampleData(sampleData.data);
    }
    
    console.log(`Template ${templateId} applied successfully`);
    console.log(`- Tables: ${schema.tables.length}`);
    console.log(`- Views: ${views.length}`);
    
  } catch (error) {
    console.error('Failed to apply template:', error);
  }
}
```

## ビューコンポーネントの実装例

### DashboardView

```typescript
import React from 'react';

interface DashboardViewProps {
  view: View;
}

export function DashboardView({ view }: DashboardViewProps) {
  const widgets = view.widgets || [];
  
  return (
    <div className="dashboard p-8">
      <h1 className="text-2xl font-bold mb-6">{view.name}</h1>
      <div className="grid grid-cols-12 gap-4">
        {widgets.map(widget => (
          <div
            key={widget.id}
            className={`col-span-${widget.colSpan || 12}`}
          >
            <Widget
              widget={widget}
              dataSource={getWidgetDataSource(widget)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function getWidgetDataSource(widget: any) {
  if (widget.query?.table) {
    return {
      type: 'table',
      table: widget.query.table,
      filter: widget.query.filter,
      aggregation: widget.query.aggregation
    };
  }
  return null;
}
```

### TableView

```typescript
import React from 'react';

interface TableViewProps {
  view: View;
}

export function TableView({ view }: TableViewProps) {
  const tableName = view.table;
  const columns = view.columns || [];
  
  // データソースを設定
  const dataSource = {
    type: 'table',
    table: tableName
  };
  
  return (
    <div className="table-view p-8">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">{view.name}</h1>
      </div>
      
      {/* 検索バー */}
      {view.searchable && (
        <SearchBar
          fields={view.searchFields}
          onSearch={(query) => searchTable(tableName, query)}
        />
      )}
      
      {/* フィルター */}
      {view.filters && (
        <Filters
          filters={view.filters}
          onFilter={(filters) => filterTable(tableName, filters)}
        />
      )}
      
      {/* データテーブル */}
      <DataTable
        dataSource={dataSource}
        columns={columns}
        sortable={true}
        pagination={view.pagination}
        actions={view.actions}
      />
    </div>
  );
}
```

## 重要なポイント

1. **views配列の取得**: `viewsData.views`で配列を取得する必要があります
2. **データソースの設定**: 各ビューに`table`プロパティが設定されている場合、データソースとして設定する必要があります
3. **ルーティング**: 各ビューの`route`プロパティを使用してルーティングを設定する必要があります
4. **タブ表示**: 各ビューをタブとして表示する必要があります（`type: "detail"`は除外）

## デバッグ方法

```typescript
// views.jsonの読み込みを確認
async function debugViews(templateId: string) {
  const viewsUrl = `https://tsubasagit.github.io/AppNavi-asset/templates/${templateId}/views.json`;
  const response = await fetch(viewsUrl);
  const data = await response.json();
  
  console.log('Template ID:', data.templateId);
  console.log('Version:', data.version);
  console.log('Views count:', data.views ? data.views.length : 0);
  
  if (data.views) {
    data.views.forEach((view, index) => {
      console.log(`[${index + 1}] ${view.name}`);
      console.log(`  ID: ${view.id}`);
      console.log(`  Type: ${view.type}`);
      console.log(`  Route: ${view.route}`);
      console.log(`  Table: ${view.table || 'N/A'}`);
    });
  }
}
```

## 確認事項

- [ ] views.jsonが正しく読み込まれているか
- [ ] `viewsData.views`で配列が取得できているか
- [ ] 各ビューがタブとして表示されているか
- [ ] 各ビューのデータソース（テーブル）が設定されているか
- [ ] ルーティングが正しく設定されているか

---

**最終更新日**: 2024年12月29日
