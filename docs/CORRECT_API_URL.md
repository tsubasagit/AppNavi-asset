# 正しいAPI URL

## GitHub PagesのURL

**ベースURL**: `https://tsubasagit.github.io/AppNavi-asset/`

## テンプレート一覧API

**正しいURL**: 
```
https://tsubasagit.github.io/AppNavi-asset/api/templates.json
```

## 確認方法

### ブラウザで確認

1. ブラウザで以下のURLを開く:
   ```
   https://tsubasagit.github.io/AppNavi-asset/api/templates.json
   ```

2. JSONが表示されれば成功です。

### 開発者ツールで確認

ブラウザの開発者ツールのコンソールで以下を実行：

```javascript
fetch('https://tsubasagit.github.io/AppNavi-asset/api/templates.json')
  .then(response => response.json())
  .then(data => {
    console.log('Templates:', data.templates);
    console.log('Count:', data.templates.length);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

## 404エラーが発生する場合

### 原因

1. **デプロイがまだ完了していない**
   - GitHub Actionsでデプロイが進行中
   - 通常5-10分かかります

2. **ファイルが正しくコピーされていない**
   - デプロイログで `dist/api/templates.json` が作成されているか確認

3. **GitHub Pagesの設定に問題がある**
   - Settings > Pages で Source が「GitHub Actions」になっているか確認

### 解決方法

1. **GitHub Actionsでデプロイが完了しているか確認**
   - https://github.com/tsubasagit/AppNavi-asset/actions
   - 最新の「Deploy to GitHub Pages」ワークフローを確認
   - エラーがないか確認

2. **デプロイログでファイルが作成されているか確認**
   - デプロイログで `✓ dist/api/templates.json exists` が表示されているか確認

3. **しばらく待ってから再度アクセス**
   - デプロイが完了してから数分待ってから再度アクセス

---

**最終更新日**: 2024年12月29日
