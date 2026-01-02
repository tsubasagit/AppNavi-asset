# フォームビルダーテンプレート

動的なフォーム作成テンプレートです。

## 機能

- 🏗️ **動的フォーム生成**: ドラッグ&ドロップでフォームを構築
- 🔍 **検索機能**: フィールドの検索
- 👁️ **リアルタイムプレビュー**: 編集とプレビューの切り替え
- ✅ **バリデーション**: 必須項目の検証
- 📝 **複数のフィールドタイプ**: テキスト、メール、数値、選択肢、テキストエリア、チェックボックス、日付

## インストール

```bash
npm install @appnavi/form-builder-template
```

## 使用方法

```tsx
import { FormBuilderTemplate } from '@appnavi/form-builder-template'

function App() {
  const initialFields = [
    {
      id: '1',
      type: 'text',
      label: '名前',
      placeholder: 'お名前を入力',
      required: true
    }
  ]

  return (
    <FormBuilderTemplate
      title="マイフォーム"
      showSearch={true}
      initialFields={initialFields}
      onSave={(fields) => console.log('保存:', fields)}
    />
  )
}
```

## Props

| プロパティ | 型 | デフォルト | 説明 |
|---------|-----|---------|------|
| title | string | 'フォームビルダー' | フォームビルダーのタイトル |
| showSearch | boolean | true | 検索機能を表示するか |
| initialFields | array | [] | 初期フィールド |
| onSave | function | - | 保存時のコールバック |

## プレビュー

プレビュー機能を使用して、テンプレートの構造を確認できます。

```bash
# プレビューを開く
open preview.html
```

## カスタマイズ

テンプレートは完全にカスタマイズ可能です。フィールドタイプ、バリデーションルールを自由に追加・変更できます。

## ライセンス

MIT License



