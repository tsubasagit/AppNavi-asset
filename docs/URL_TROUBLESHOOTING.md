# URLトラブルシューティングガイド

## 問題: テンプレートAPIにアクセスできない（404エラー）

### 確認すべきURL

GitHub PagesのURLは、リポジトリの設定によって異なる場合があります。以下のURLを確認してください：

#### パターン1: リポジトリ名がURLに含まれる場合
```
https://tsubasagit.github.io/AppNavi-asset/api/templates.json
```

#### パターン2: リポジトリ名がURLに含まれない場合（カスタムドメインまたは設定による）
```
https://tsubasagit.github.io/api/templates.json
```

### 確認方法

1. **GitHubリポジトリの設定を確認**
   - Settings > Pages
   - Source: GitHub Actions が選択されているか確認
   - Custom domain が設定されているか確認

2. **デプロイの進行状況を確認**
   - Actions タブで最新のデプロイが成功しているか確認
   - エラーがないか確認

3. **実際のURLを確認**
   - デプロイ完了後、GitHub PagesのURLを確認
   - Settings > Pages に表示されているURLを確認

### 正しいURLの特定方法

1. GitHubリポジトリの Settings > Pages を開く
2. 表示されているURLを確認
3. そのURLに `/api/templates.json` を追加

例：
- 表示されているURL: `https://tsubasagit.github.io/AppNavi-asset/`
- API URL: `https://tsubasagit.github.io/AppNavi-asset/api/templates.json`

### デプロイ構造の確認

デプロイワークフローでは、以下の構造でファイルが配置されます：

```
dist/
├── index.html (Reactアプリ)
├── assets/
├── api/
│   └── templates.json  ← ここに配置される
└── templates/
    ├── crm/
    ├── google-calendar-group/
    ├── daily-report/
    ├── auto-integration/
    └── blank-page/
```

### トラブルシューティング

#### 1. 404エラーが発生する場合

**原因**:
- デプロイがまだ完了していない
- ファイルが正しくコピーされていない
- URLが間違っている

**解決方法**:
1. GitHub Actionsでデプロイが完了しているか確認
2. デプロイログで `dist/api/templates.json` が作成されているか確認
3. 正しいURLでアクセスしているか確認

#### 2. デプロイが失敗している場合

**原因**:
- ビルドエラー
- ファイルパスの問題

**解決方法**:
1. GitHub Actionsのログを確認
2. エラーメッセージを確認
3. 必要に応じてワークフローを修正

### 正しいURLの確認コマンド

```bash
# ルートページにアクセス
curl -I https://tsubasagit.github.io/AppNavi-asset/

# APIにアクセス
curl -I https://tsubasagit.github.io/AppNavi-asset/api/templates.json

# 実際のJSONを取得
curl https://tsubasagit.github.io/AppNavi-asset/api/templates.json
```

---

**最終更新日**: 2024年12月29日
