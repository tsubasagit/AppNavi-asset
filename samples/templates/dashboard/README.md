# ダッシュボードテンプレート

包括的なダッシュボードテンプレートです。

## 機能

- 📊 **統計カード**: 4つの主要指標を表示
- 🔍 **検索機能**: データテーブル内の検索
- 📈 **グラフエリア**: グラフコンポーネントを配置可能
- 📋 **データテーブル**: ソート・フィルタリング対応
- 📱 **レスポンシブ**: モバイルデバイスにも対応

## インストール

```bash
npm install @appnavi/dashboard-template
```

## 使用方法

```tsx
import { DashboardTemplate } from '@appnavi/dashboard-template'

function App() {
  const stats = [
    {
      label: '総ユーザー数',
      value: '1,234',
      icon: <Users size={24} />,
      change: '+12.5%'
    },
    // ... 他の統計
  ]

  const data = [
    { id: 1, name: '商品A', category: 'カテゴリ1', price: 1000, sales: 150 },
    // ... 他のデータ
  ]

  return (
    <DashboardTemplate
      title="マイダッシュボード"
      showSearch={true}
      stats={stats}
      data={data}
    />
  )
}
```

## Props

| プロパティ | 型 | デフォルト | 説明 |
|---------|-----|---------|------|
| title | string | 'ダッシュボード' | ダッシュボードのタイトル |
| showSearch | boolean | true | 検索機能を表示するか |
| stats | array | [] | 統計カードのデータ |
| data | array | [] | テーブルに表示するデータ |

## プレビュー

プレビュー機能を使用して、テンプレートの構造を確認できます。

```bash
# プレビューを開く
open preview.html
```

## カスタマイズ

テンプレートは完全にカスタマイズ可能です。統計カード、グラフ、テーブルを自由に追加・変更できます。

## ライセンス

MIT License



