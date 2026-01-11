# AppNavi側で使用する正しいAPI URL

## テンプレート一覧API

**URL**: 
```
https://tsubasagit.github.io/AppNavi-asset/api/templates.json
```

## 確認方法

### 1. ブラウザで直接確認

以下のURLをブラウザで開いてください：
```
https://tsubasagit.github.io/AppNavi-asset/api/templates.json
```

JSONが表示されれば成功です。

### 2. 開発者ツールで確認

ブラウザの開発者ツールのコンソールで以下を実行：

```javascript
fetch('https://tsubasagit.github.io/AppNavi-asset/api/templates.json')
  .then(response => {
    console.log('Status:', response.status);
    return response.json();
  })
  .then(data => {
    console.log('Templates:', data.templates);
    console.log('Count:', data.templates.length);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

## 404エラーが発生する場合

### 原因と解決方法

#### 1. デプロイがまだ完了していない

**症状**: 404エラーが発生する

**解決方法**:
- GitHub Actionsでデプロイが完了するまで待つ（通常5-10分）
- https://github.com/tsubasagit/AppNavi-asset/actions で進行状況を確認

#### 2. デプロイが失敗している

**症状**: GitHub Actionsでエラーが発生している

**解決方法**:
- GitHub Actionsのログを確認
- エラーメッセージを確認
- 必要に応じて修正して再デプロイ

#### 3. ファイルが正しく配置されていない

**症状**: デプロイは成功しているが404エラーが出る

**解決方法**:
- デプロイログで `✓ dist/api/templates.json exists` が表示されているか確認
- ファイルが正しくコピーされているか確認

## AppNavi側での実装例

```typescript
const TEMPLATE_SERVER_URL = 'https://tsubasagit.github.io/AppNavi-asset';

async function fetchExternalTemplates() {
  try {
    const response = await fetch(`${TEMPLATE_SERVER_URL}/api/templates.json`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.templates || [];
  } catch (error) {
    console.error('Failed to fetch external templates:', error);
    return [];
  }
}
```

## デプロイの確認

最新のデプロイ状況は以下で確認できます：
- GitHub Actions: https://github.com/tsubasagit/AppNavi-asset/actions
- 最新の「Deploy to GitHub Pages」ワークフローを確認

---

**最終更新日**: 2024年12月29日
