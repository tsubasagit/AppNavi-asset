# URL確認ガイド

## 問題: テンプレートAPIにアクセスできない

### 確認すべき点

1. **GitHub Pagesのデプロイが完了しているか**
   - GitHubリポジトリの「Actions」タブで最新のデプロイが成功しているか確認
   - エラーがないか確認

2. **正しいURLを確認**
   - GitHubリポジトリの Settings > Pages で表示されているURLを確認
   - そのURLに `/api/templates.json` を追加

3. **ファイルが正しく配置されているか**
   - デプロイログで `dist/api/templates.json` が作成されているか確認

### 正しいURLの確認方法

#### 方法1: GitHubリポジトリの設定から確認

1. GitHubリポジトリを開く: https://github.com/tsubasagit/AppNavi-asset
2. Settings > Pages を開く
3. 表示されているURLを確認
4. そのURLに `/api/templates.json` を追加

例：
- 表示されているURL: `https://tsubasagit.github.io/AppNavi-asset/`
- API URL: `https://tsubasagit.github.io/AppNavi-asset/api/templates.json`

#### 方法2: デプロイログから確認

1. GitHubリポジトリの「Actions」タブを開く
2. 最新のデプロイワークフローを開く
3. 「Deploy to GitHub Pages」ステップのログを確認
4. `page_url` の値を確認

### よくある問題と解決方法

#### 問題1: 404エラーが発生する

**原因**:
- デプロイがまだ完了していない
- ファイルが正しくコピーされていない
- URLが間違っている

**解決方法**:
1. デプロイが完了するまで待つ（通常5-10分）
2. ブラウザのキャッシュをクリア
3. 正しいURLでアクセス

#### 問題2: デプロイが失敗している

**原因**:
- ビルドエラー
- ファイルパスの問題

**解決方法**:
1. GitHub Actionsのログを確認
2. エラーメッセージを確認
3. 必要に応じてワークフローを修正

### テスト方法

ブラウザの開発者ツールのコンソールで以下を実行：

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

### 正しいURLの例

リポジトリ名が `AppNavi-asset` の場合：

```
https://tsubasagit.github.io/AppNavi-asset/api/templates.json
```

カスタムドメインが設定されている場合、そのドメインを使用：

```
https://your-custom-domain.com/api/templates.json
```

---

**最終更新日**: 2024年12月29日
