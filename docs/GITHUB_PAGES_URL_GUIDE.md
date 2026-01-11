# GitHub Pages URL確認ガイド

## 問題: テンプレートAPIにアクセスできない（404エラー）

### 確認すべきURL

GitHub PagesのURLは、リポジトリの設定によって異なる場合があります。

#### 標準的なURL構造

リポジトリ名が `AppNavi-asset` の場合：

```
https://tsubasagit.github.io/AppNavi-asset/api/templates.json
```

#### カスタムドメインが設定されている場合

```
https://your-custom-domain.com/api/templates.json
```

### 正しいURLの確認方法

#### 方法1: GitHubリポジトリの設定から確認（推奨）

1. GitHubリポジトリを開く: https://github.com/tsubasagit/AppNavi-asset
2. **Settings** > **Pages** を開く
3. 表示されているURLを確認
   - 例: `https://tsubasagit.github.io/AppNavi-asset/`
4. そのURLに `/api/templates.json` を追加
   - 例: `https://tsubasagit.github.io/AppNavi-asset/api/templates.json`

#### 方法2: デプロイログから確認

1. GitHubリポジトリの「**Actions**」タブを開く
2. 最新の「**Deploy to GitHub Pages**」ワークフローを開く
3. 「**Deploy to GitHub Pages**」ステップのログを確認
4. `page_url` の値を確認

### デプロイ構造

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

GitHub Pagesでは、`dist/` ディレクトリの内容がルートにデプロイされるため、`/AppNavi-asset/api/templates.json` でアクセスできるはずです。

### トラブルシューティング

#### 1. 404エラーが発生する場合

**原因**:
- デプロイがまだ完了していない（通常5-10分かかります）
- ファイルが正しくコピーされていない
- URLが間違っている

**解決方法**:
1. GitHub Actionsでデプロイが完了しているか確認
2. デプロイログで `dist/api/templates.json` が作成されているか確認
3. 正しいURLでアクセスしているか確認
4. ブラウザのキャッシュをクリア

#### 2. デプロイが失敗している場合

**原因**:
- ビルドエラー
- ファイルパスの問題

**解決方法**:
1. GitHub Actionsのログを確認
2. エラーメッセージを確認
3. 必要に応じてワークフローを修正

#### 3. デプロイは成功しているが404エラーが出る場合

**原因**:
- GitHub Pagesの設定が間違っている
- ファイルパスが間違っている

**解決方法**:
1. GitHubリポジトリの Settings > Pages を確認
2. Source が「GitHub Actions」になっているか確認
3. 正しいURLでアクセスしているか確認

### テスト方法

#### ブラウザの開発者ツールのコンソールで実行

```javascript
// テンプレート一覧APIにアクセス
fetch('https://tsubasagit.github.io/AppNavi-asset/api/templates.json')
  .then(response => {
    console.log('Status:', response.status);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  })
  .then(data => {
    console.log('Templates:', data.templates);
    console.log('Count:', data.templates.length);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

#### コマンドラインで確認

```bash
# ルートページにアクセス
curl -I https://tsubasagit.github.io/AppNavi-asset/

# APIにアクセス
curl -I https://tsubasagit.github.io/AppNavi-asset/api/templates.json

# 実際のJSONを取得
curl https://tsubasagit.github.io/AppNavi-asset/api/templates.json
```

### 正しいURLの例

#### リポジトリ名がURLに含まれる場合（標準）

```
https://tsubasagit.github.io/AppNavi-asset/api/templates.json
```

#### カスタムドメインが設定されている場合

```
https://your-custom-domain.com/api/templates.json
```

### 次のステップ

1. **GitHubリポジトリのSettings > Pagesを確認**
   - 表示されているURLを確認
   - そのURLに `/api/templates.json` を追加

2. **GitHub Actionsでデプロイが完了しているか確認**
   - Actions タブで最新のデプロイを確認
   - エラーがないか確認

3. **正しいURLでアクセス**
   - Settings > Pages に表示されているURLを使用
   - `/api/templates.json` を追加

---

**最終更新日**: 2024年12月29日
