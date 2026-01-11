# デプロイ設定

## 使用しているワークフロー

**メインワークフロー**: `.github/workflows/deploy-pages.yml`

このワークフローのみを使用して、GitHub Pagesにデプロイします。

## ワークフローの機能

### デプロイ内容

1. **Reactアプリのビルド**
   - `npm run build` でReactアプリをビルド
   - `dist/` ディレクトリに出力

2. **テンプレートのコピー**
   - `templates/` ディレクトリを `dist/templates/` にコピー
   - すべてのテンプレートファイルを含む

3. **APIファイルのコピー**
   - `templates/api/templates.json` を `dist/api/templates.json` にコピー
   - AppNavi側で使用するテンプレート一覧API

4. **設定ファイルのコピー**
   - `_headers` ファイルをコピー（CORS設定用）
   - `.nojekyll` ファイルを作成（Jekyllの処理を無効化）

### デプロイ構造

```
dist/
├── index.html              # Reactアプリ
├── assets/                 # アセットファイル
├── api/
│   └── templates.json     # テンプレート一覧API
├── templates/             # テンプレートファイル
│   ├── crm/
│   ├── google-calendar-group/
│   ├── daily-report/
│   ├── auto-integration/
│   └── blank-page/
├── .nojekyll              # Jekyll無効化
└── _headers               # CORS設定
```

## デプロイのトリガー

### 自動デプロイ

- `main` ブランチに `push` されたとき
- 自動的にデプロイが開始されます

### 手動デプロイ

1. GitHubリポジトリの「Actions」タブを開く
2. 「Deploy to GitHub Pages」ワークフローを選択
3. 右上の「Run workflow」ボタンをクリック
4. ブランチを選択（通常は `main`）
5. 「Run workflow」ボタンをクリック

## デプロイの確認

### デプロイの進行状況

- https://github.com/tsubasagit/AppNavi-asset/actions
- 最新の「Deploy to GitHub Pages」ワークフローを確認

### デプロイ完了後の確認

デプロイが完了したら（通常5-10分）、以下で確認：

- **マーケットプレイス**: https://tsubasagit.github.io/AppNavi-asset/
- **テンプレート一覧API**: https://tsubasagit.github.io/AppNavi-asset/api/templates.json
- **各テンプレート**:
  - https://tsubasagit.github.io/AppNavi-asset/templates/crm/
  - https://tsubasagit.github.io/AppNavi-asset/templates/google-calendar-group/
  - https://tsubasagit.github.io/AppNavi-asset/templates/daily-report/
  - https://tsubasagit.github.io/AppNavi-asset/templates/auto-integration/
  - https://tsubasagit.github.io/AppNavi-asset/templates/blank-page/

## トラブルシューティング

### 404エラーが発生する場合

1. **デプロイが完了しているか確認**
   - GitHub Actionsでデプロイが成功しているか確認
   - デプロイが完了してから数分待つ

2. **ブラウザのキャッシュをクリア**
   - Ctrl+Shift+R（Windows/Linux）
   - Cmd+Shift+R（Mac）

3. **ファイルが正しく配置されているか確認**
   - デプロイログで `✓ dist/api/templates.json exists` が表示されているか確認

### デプロイが失敗する場合

1. **GitHub Actionsのログを確認**
   - エラーメッセージを確認
   - ビルドエラーがないか確認

2. **ファイルパスを確認**
   - `templates/api/templates.json` が存在するか確認
   - ファイル名の大文字小文字を確認

---

**最終更新日**: 2024年12月29日
