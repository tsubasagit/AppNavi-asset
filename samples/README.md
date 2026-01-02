# AppNavi Asset サンプル

このディレクトリには、AppNaviマーケットプレイス用のプラグインとテンプレートのサンプルが含まれています。

## ディレクトリ構造

```
samples/
├── plugins/          # プラグインサンプル
│   ├── search-bar/   # 検索バープラグイン
│   └── chart-graph/  # グラフコンポーネントプラグイン
└── templates/        # テンプレートサンプル
    ├── dashboard/    # ダッシュボードテンプレート
    └── form-builder/ # フォームビルダーテンプレート
```

## 各サンプルの構成

各プラグイン/テンプレートには以下のファイルが含まれています：

- `plugin.json` / `template.json`: メタデータと設定
- `[ComponentName].tsx`: Reactコンポーネント
- `[ComponentName].css`: スタイルシート
- `preview.html`: プレビュー用HTMLファイル
- `README.md`: 使用方法とドキュメント

## 機能

すべてのサンプルには以下の機能が含まれています：

### 1. 検索バー機能
- リアルタイム検索
- 検索履歴
- フィルタリング

### 2. プレビュー機能
- 各サンプルに`preview.html`が含まれています
- マーケットプレイスから直接プレビューを表示可能
- iframeサンドボックスで安全に実行

## 使用方法

### プラグインの使用

```tsx
import { SearchBarPlugin } from './samples/plugins/search-bar/SearchBarPlugin'

function App() {
  return (
    <SearchBarPlugin
      placeholder="検索..."
      showHistory={true}
      data={sampleData}
    />
  )
}
```

### テンプレートの使用

```tsx
import { DashboardTemplate } from './samples/templates/dashboard/DashboardTemplate'

function App() {
  return (
    <DashboardTemplate
      title="マイダッシュボード"
      showSearch={true}
    />
  )
}
```

## プレビューの確認

各サンプルのプレビューを確認するには：

1. ブラウザで`preview.html`を直接開く
2. マーケットプレイスの詳細ページから「プレビュー」ボタンをクリック

## カスタマイズ

各サンプルは完全にカスタマイズ可能です。必要に応じてコンポーネントやスタイルを変更してください。

## ライセンス

MIT License



