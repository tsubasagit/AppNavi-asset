# テンプレートサーバー構築チェックリスト

## 事前準備

- [ ] Node.js 18以上がインストールされている
- [ ] Gitがインストールされている
- [ ] GitHubアカウントへのアクセス権限がある
- [ ] デプロイ先（Firebase/Netlify/Vercel）のアカウントがある

## リポジトリセットアップ

- [ ] リポジトリをクローンした
- [ ] 新しいブランチを作成した（`feature/template-server`）

## ディレクトリ構造

- [ ] `templates/` ディレクトリが存在する
- [ ] `templates/api/` ディレクトリが存在する
- [ ] `templates/templates/crm/` ディレクトリが存在する
- [ ] `templates/templates/google-calendar-group/` ディレクトリが存在する
- [ ] `templates/templates/daily-report/` ディレクトリが存在する
- [ ] `templates/templates/auto-integration/` ディレクトリが存在する
- [ ] `templates/assets/` ディレクトリが存在する

## ファイル作成

- [ ] `templates/index.html` が存在する
- [ ] `templates/api/templates.json` が存在する
- [ ] `templates/templates/crm/index.html` が存在する
- [ ] `templates/templates/google-calendar-group/index.html` が存在する
- [ ] `templates/templates/daily-report/index.html` が存在する
- [ ] `templates/templates/auto-integration/index.html` が存在する
- [ ] `templates/README.md` が存在する
- [ ] `templates/BUILD_INSTRUCTIONS.md` が存在する
- [ ] `templates/QUICK_START.md` が存在する
- [ ] `templates/CHECKLIST.md` が存在する（このファイル）

## ローカル確認

- [ ] ローカルサーバーでテンプレート一覧ページが表示される
- [ ] `/api/templates.json` が正しく返される
- [ ] 各テンプレートの詳細ページが表示される
- [ ] リンクが正しく動作する

## CORS設定

- [ ] Firebase Hostingの場合: `firebase.json` にCORS設定を追加した
- [ ] Netlifyの場合: `netlify.toml` にCORS設定を追加した
- [ ] Vercelの場合: `vercel.json` にCORS設定を追加した

## デプロイ

- [ ] デプロイ先のCLIツールをインストールした
- [ ] デプロイ先にログインした
- [ ] デプロイ設定ファイルを作成した
- [ ] デプロイを実行した
- [ ] デプロイ後のURLを確認した

## AppNavi側の設定

- [ ] `.env` ファイルに `VITE_TEMPLATE_SERVER_URL` を追加した
- [ ] AppNaviを再ビルドした
- [ ] 「方針」タブで「サーバーから取得」ボタンが表示される
- [ ] テンプレートが正しく取得できる
- [ ] テンプレートに「サーバー」バッジが表示される
- [ ] テンプレートを選択して適用できる

## 動作確認

- [ ] テンプレート一覧ページが表示される
- [ ] テンプレート詳細ページが表示される
- [ ] APIが正しく動作する
- [ ] CORSエラーが発生しない
- [ ] AppNavi側でテンプレートが表示される
- [ ] テンプレートの適用が正常に動作する

## セキュリティ

- [ ] CORS設定が適切である
- [ ] 機密情報が含まれていない
- [ ] 公開すべきでない情報が含まれていない

## ドキュメント

- [ ] README.mdが更新されている
- [ ] BUILD_INSTRUCTIONS.mdが作成されている
- [ ] QUICK_START.mdが作成されている
- [ ] このチェックリストが完了している

## コミットとプッシュ

- [ ] すべての変更をコミットした
- [ ] ブランチをプッシュした
- [ ] プルリクエストを作成した（必要に応じて）

---

**完了日**: _______________
**担当者**: _______________


