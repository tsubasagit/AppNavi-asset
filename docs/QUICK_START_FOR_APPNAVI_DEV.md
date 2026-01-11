# AppNavi開発者向けクイックスタート

## 5分で実装を開始

### 1. APIエンドポイント

```
GET https://tsubasagit.github.io/AppNavi-asset/api/templates.json
```

### 2. 最小実装コード

```typescript
// テンプレート型定義
interface Template {
  templateId: string;
  name: string;
  description: string;
  category: string;
  color: 'purple' | 'orange' | 'green' | 'blue' | 'slate';
  version: string;
  isPublic: boolean;
  tags: string[];
  author: string;
  features?: string[];
  previewImageUrl?: string;
  demoUrl?: string;
}

interface TemplatesResponse {
  templates: Template[];
}

// テンプレート一覧を取得
async function fetchExternalTemplates(): Promise<Template[]> {
  try {
    const response = await fetch(
      'https://tsubasagit.github.io/AppNavi-asset/api/templates.json',
      { mode: 'cors' }
    );
    
    if (!response.ok) return [];
    
    const data: TemplatesResponse = await response.json();
    return data.templates || [];
  } catch (error) {
    console.warn('Failed to fetch external templates:', error);
    return []; // エラー時は空配列（ローカルテンプレートのみ表示）
  }
}
```

### 3. 重要な注意事項

⚠️ **CORSエラーが発生する可能性があります**

GitHub PagesではCORSヘッダーが設定されていないため、ブラウザから直接アクセスする場合、CORSエラーが発生する可能性があります。

**推奨対応**:
1. **プロキシサーバー経由で取得**（最推奨）
2. CORSエラーを適切にハンドリングし、ローカルテンプレートのみ表示

### 4. プロキシサーバー経由での取得（推奨）

```typescript
// AppNaviのバックエンドAPI経由で取得
async function fetchExternalTemplates(): Promise<Template[]> {
  try {
    const response = await fetch('/api/external-templates'); // AppNaviのバックエンド
    const data: TemplatesResponse = await response.json();
    return data.templates || [];
  } catch (error) {
    console.warn('Failed to fetch external templates:', error);
    return [];
  }
}
```

**バックエンド実装（Node.js/Express）**:

```javascript
app.get('/api/external-templates', async (req, res) => {
  try {
    const response = await fetch('https://tsubasagit.github.io/AppNavi-asset/api/templates.json');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch external templates' });
  }
});
```

### 5. テスト

```javascript
// ブラウザのコンソールで実行
fetch('https://tsubasagit.github.io/AppNavi-asset/api/templates.json')
  .then(r => r.json())
  .then(data => console.log('Templates:', data.templates))
  .catch(err => console.error('Error:', err));
```

### 6. 詳細情報

詳細な実装方法は [AppNavi開発者向けガイド](./APPNAVI_DEVELOPER_GUIDE.md) を参照してください。

---

**最終更新日**: 2024年12月29日
