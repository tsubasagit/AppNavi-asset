# 検索バープラグイン

高度な検索機能を提供するAppNaviプラグインです。

## 機能

- 🔍 **リアルタイム検索**: 入力に応じてリアルタイムで検索結果を表示
- 📚 **検索履歴**: 過去の検索クエリを保存・表示
- ⚡ **デバウンス**: パフォーマンス最適化のためのデバウンス機能
- 🎯 **複数フィールド検索**: 指定したフィールドでの検索に対応
- 💾 **ローカルストレージ**: 検索履歴をブラウザに保存

## インストール

```bash
npm install @appnavi/search-bar-plugin
```

## 使用方法

```tsx
import { SearchBarPlugin } from '@appnavi/search-bar-plugin'

function App() {
  const sampleData = [
    { id: 1, name: '田中太郎', email: 'tanaka@example.com' },
    { id: 2, name: '佐藤花子', email: 'sato@example.com' },
  ]

  return (
    <SearchBarPlugin
      placeholder="ユーザーを検索..."
      showHistory={true}
      debounceMs={300}
      data={sampleData}
      searchFields={['name', 'email']}
      onSearch={(query) => console.log('検索:', query)}
    />
  )
}
```

## Props

| プロパティ | 型 | デフォルト | 説明 |
|---------|-----|---------|------|
| placeholder | string | "検索..." | 検索バーのプレースホルダー |
| showHistory | boolean | true | 検索履歴を表示するか |
| debounceMs | number | 300 | デバウンス時間（ミリ秒） |
| onSearch | function | - | 検索実行時のコールバック |
| data | array | [] | 検索対象のデータ配列 |
| searchFields | array | [] | 検索対象のフィールド名配列 |

## プレビュー

プレビュー機能を使用して、プラグインの動作を確認できます。

```bash
# プレビューを開く
open preview.html
```

## ライセンス

MIT License





