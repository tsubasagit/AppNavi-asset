# 手動デプロイガイド

## GitHub Actionsから手動でデプロイを実行する方法

### 方法1: GitHubのWebインターフェースから実行（推奨）

1. GitHubリポジトリを開く: https://github.com/tsubasagit/AppNavi-asset
2. **Actions** タブを開く
3. 左側のメニューから「**Deploy to GitHub Pages**」を選択
4. 右上の「**Run workflow**」ボタンをクリック
5. ブランチを選択（通常は `main`）
6. 「**Run workflow**」ボタンをクリック

### 方法2: 空のコミットで再トリガー

```bash
git commit --allow-empty -m "Trigger GitHub Pages deployment"
git push
```

### 方法3: ワークフローファイルを更新して再トリガー

ワークフローファイル（`.github/workflows/deploy-pages.yml`）に小さな変更を加えてコミット・プッシュ

## デプロイの確認

### 1. GitHub Actionsで進行状況を確認

- https://github.com/tsubasagit/AppNavi-asset/actions
- 最新の「Deploy to GitHub Pages」ワークフローを確認
- 各ステップが成功しているか確認

### 2. デプロイ完了後の確認

デプロイが完了したら（通常5-10分）、以下のURLで確認：

- マーケットプレイス: https://tsubasagit.github.io/AppNavi-asset/
- テンプレート一覧API: https://tsubasagit.github.io/AppNavi-asset/api/templates.json

### 3. デプロイログの確認ポイント

- `✓ dist/index.html found` - Reactアプリがビルドされている
- `✓ Templates copied to dist/templates/` - テンプレートがコピーされている
- `✓ API file copied to dist/api/templates.json` - APIファイルがコピーされている
- `✓ dist/api/templates.json exists` - APIファイルが存在する

## トラブルシューティング

### デプロイが失敗する場合

1. **ビルドエラー**
   - ログでエラーメッセージを確認
   - `npm run build` が成功しているか確認

2. **ファイルが見つからない**
   - `templates/api/templates.json` が存在するか確認
   - ファイルパスが正しいか確認

3. **権限エラー**
   - GitHubリポジトリの Settings > Actions > General で権限を確認
   - Pages の書き込み権限があるか確認

---

**最終更新日**: 2024年12月29日
