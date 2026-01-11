# デプロイログの確認方法

## 最新のデプロイ（#22）のログを確認

### 1. デプロイログを開く

1. https://github.com/tsubasagit/AppNavi-asset/actions を開く
2. 最新の「**Deploy to GitHub Pages #22**」をクリック
3. 「**Prepare deployment**」ステップをクリックしてログを確認

### 2. 確認すべきポイント

#### ✅ 成功している場合

以下のメッセージが表示されているはずです：

```
✓ dist/index.html found
✓ Templates copied to dist/templates/
✓ API file copied to dist/api/templates.json
✓ .nojekyll file created
=== API file check ===
✓ dist/api/templates.json exists
File size: [数字] bytes
First 3 lines:
{
  "templates": [
    {
```

#### ❌ 問題がある場合

以下のようなエラーが表示される可能性があります：

```
❌ ERROR: dist/api/templates.json not found!
```

または

```
❌ ERROR: templates/api/templates.json not found!
```

### 3. デプロイログで確認すべき内容

1. **APIファイルが作成されているか**
   - `✓ dist/api/templates.json exists` が表示されているか
   - ファイルサイズが0バイトでないか

2. **ファイルの内容が正しいか**
   - `First 3 lines:` の後にJSONの最初の数行が表示されているか

3. **エラーメッセージがないか**
   - エラーメッセージが表示されていないか

### 4. デプロイが成功しているのに404エラーが出る場合

#### 考えられる原因

1. **GitHub Pagesのキャッシュ**
   - デプロイが完了してから数分待つ
   - ブラウザのキャッシュをクリア

2. **ファイルパスの問題**
   - URLが正しいか確認: `https://tsubasagit.github.io/AppNavi-asset/api/templates.json`
   - 大文字小文字が正しいか確認

3. **GitHub Pagesの設定**
   - Settings > Pages で Source が「GitHub Actions」になっているか確認

### 5. デプロイログの共有

デプロイログの「Prepare deployment」ステップの内容を共有していただければ、問題を特定できます。

特に以下を確認してください：
- `=== API file check ===` セクション
- `=== Final deployment structure ===` セクション
- エラーメッセージ（あれば）

---

**最終更新日**: 2024年12月29日
