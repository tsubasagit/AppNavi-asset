# テンプレートの更新検出と「更新」ボタン表示

## 概要

既にインストール済みのテンプレート（CRM、ブランクページなど）がある場合、新規アプリ作成時の「方針」タブで「インストール」ボタンではなく「更新」ボタンを表示する必要があります。

## 実装方法

### 1. インストール済みテンプレートの識別

AppNavi側で、インストール済みのテンプレートを識別する方法：

```typescript
interface InstalledTemplate {
  templateId: string;
  version: string;
  installedAt: string; // ISO 8601形式
}

// インストール済みテンプレートのリスト（例：ローカルストレージまたはデータベースから取得）
const installedTemplates: InstalledTemplate[] = [
  { templateId: 'crm', version: '1.0.0', installedAt: '2024-12-29T00:00:00Z' },
  { templateId: 'blank-page', version: '1.0.0', installedAt: '2024-12-29T00:00:00Z' }
];
```

### 2. テンプレート一覧APIから取得した情報との比較

```typescript
interface Template {
  templateId: string;
  name: string;
  version: string;
  updatedAt: string;
  schemaUrl: string;
  viewsUrl: string;
  sampleDataUrl: string;
  // ... その他のフィールド
}

// テンプレート一覧を取得
const response = await fetch('https://tsubasagit.github.io/AppNavi-asset/api/templates.json');
const { templates } = await response.json();

// インストール済みテンプレートと比較
templates.forEach(template => {
  const installed = installedTemplates.find(
    t => t.templateId === template.templateId
  );
  
  if (installed) {
    // バージョン比較
    const needsUpdate = compareVersions(template.version, installed.version) > 0;
    
    if (needsUpdate) {
      // 「更新」ボタンを表示
      template.action = 'update';
      template.installedVersion = installed.version;
      template.availableVersion = template.version;
    } else {
      // 「インストール済み」または「最新」を表示
      template.action = 'installed';
    }
  } else {
    // 「インストール」ボタンを表示
    template.action = 'install';
  }
});
```

### 3. バージョン比較関数

```typescript
/**
 * セマンティックバージョンを比較
 * @param v1 バージョン1（例: "1.0.1"）
 * @param v2 バージョン2（例: "1.0.0"）
 * @returns v1 > v2 の場合は正の数、v1 < v2 の場合は負の数、等しい場合は0
 */
function compareVersions(v1: string, v2: string): number {
  const parts1 = v1.split('.').map(Number);
  const parts2 = v2.split('.').map(Number);
  
  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const part1 = parts1[i] || 0;
    const part2 = parts2[i] || 0;
    
    if (part1 > part2) return 1;
    if (part1 < part2) return -1;
  }
  
  return 0;
}
```

### 4. UI実装例

```typescript
function TemplateCard({ template }: { template: Template }) {
  const getButtonText = () => {
    switch (template.action) {
      case 'update':
        return `更新 (${template.installedVersion} → ${template.availableVersion})`;
      case 'installed':
        return 'インストール済み';
      case 'install':
      default:
        return 'インストール';
    }
  };
  
  const getButtonColor = () => {
    switch (template.action) {
      case 'update':
        return 'primary'; // 更新ボタンは強調色
      case 'installed':
        return 'secondary'; // インストール済みは無効化
      case 'install':
      default:
        return 'primary';
    }
  };
  
  const handleClick = () => {
    if (template.action === 'update') {
      // 更新処理
      updateTemplate(template);
    } else if (template.action === 'install') {
      // インストール処理
      installTemplate(template);
    }
  };
  
  return (
    <div className="template-card">
      <h3>{template.name}</h3>
      <p>{template.description}</p>
      <button 
        onClick={handleClick}
        disabled={template.action === 'installed'}
        className={getButtonColor()}
      >
        {getButtonText()}
      </button>
    </div>
  );
}
```

## テンプレートAPIのレスポンス形式

現在のテンプレート一覧APIは、以下の情報を提供しています：

```json
{
  "templates": [
    {
      "templateId": "crm",
      "name": "顧客管理（CRM）",
      "version": "1.0.0",
      "updatedAt": "2024-12-29T00:00:00Z",
      "schemaUrl": "https://tsubasagit.github.io/AppNavi-asset/templates/crm/schema.json",
      "viewsUrl": "https://tsubasagit.github.io/AppNavi-asset/templates/crm/views.json",
      "sampleDataUrl": "https://tsubasagit.github.io/AppNavi-asset/templates/crm/sample-data.json",
      ...
    }
  ]
}
```

## 更新チェックの実装例

### 完全な実装例

```typescript
interface TemplateWithStatus extends Template {
  action: 'install' | 'update' | 'installed';
  installedVersion?: string;
  availableVersion?: string;
}

async function loadTemplatesWithStatus(): Promise<TemplateWithStatus[]> {
  // 1. テンプレート一覧を取得
  const response = await fetch('https://tsubasagit.github.io/AppNavi-asset/api/templates.json');
  const { templates } = await response.json();
  
  // 2. インストール済みテンプレートを取得（例：ローカルストレージまたはAPI）
  const installedTemplates = await getInstalledTemplates();
  
  // 3. 各テンプレートのステータスを判定
  return templates.map(template => {
    const installed = installedTemplates.find(
      t => t.templateId === template.templateId
    );
    
    if (!installed) {
      return {
        ...template,
        action: 'install' as const
      };
    }
    
    const needsUpdate = compareVersions(template.version, installed.version) > 0;
    
    if (needsUpdate) {
      return {
        ...template,
        action: 'update' as const,
        installedVersion: installed.version,
        availableVersion: template.version
      };
    }
    
    return {
      ...template,
      action: 'installed' as const,
      installedVersion: installed.version
    };
  });
}

// インストール済みテンプレートを取得（例）
async function getInstalledTemplates(): Promise<InstalledTemplate[]> {
  // ローカルストレージから取得
  const stored = localStorage.getItem('installedTemplates');
  if (stored) {
    return JSON.parse(stored);
  }
  
  // または、APIから取得
  // const response = await fetch('/api/installed-templates');
  // return response.json();
  
  return [];
}
```

## 更新処理の実装

```typescript
async function updateTemplate(template: Template) {
  // 1. 確認ダイアログを表示
  const confirmed = await showConfirmDialog({
    title: 'テンプレートを更新しますか？',
    message: `${template.name} を ${template.installedVersion} から ${template.version} に更新します。`,
    confirmText: '更新',
    cancelText: 'キャンセル'
  });
  
  if (!confirmed) return;
  
  try {
    // 2. 最新のスキーマ、ビュー、サンプルデータを取得
    const [schema, views, sampleData] = await Promise.all([
      fetch(template.schemaUrl).then(r => r.json()),
      fetch(template.viewsUrl).then(r => r.json()),
      fetch(template.sampleDataUrl).then(r => r.json())
    ]);
    
    // 3. テンプレートを更新
    await updateAppTemplate({
      templateId: template.templateId,
      version: template.version,
      schema: schema,
      views: views.views,
      sampleData: sampleData.data,
      updatedAt: template.updatedAt
    });
    
    // 4. インストール済みテンプレートの情報を更新
    await updateInstalledTemplate({
      templateId: template.templateId,
      version: template.version,
      updatedAt: template.updatedAt
    });
    
    // 5. 成功メッセージを表示
    showSuccessMessage('テンプレートを更新しました');
    
    // 6. テンプレート一覧を再読み込み
    await refreshTemplates();
  } catch (error) {
    console.error('Template update failed:', error);
    showErrorMessage('テンプレートの更新に失敗しました');
  }
}
```

## 注意事項

### 1. バージョン管理

- テンプレートのバージョンはセマンティックバージョニング（`major.minor.patch`）を使用
- 例: `1.0.0`, `1.0.1`, `1.1.0`, `2.0.0`

### 2. 更新のタイミング

- テンプレート一覧を表示するたびに更新チェックを実行
- または、定期的にバックグラウンドで更新チェックを実行

### 3. データの互換性

- メジャーバージョンが異なる場合（例: `1.0.0` → `2.0.0`）は、データの互換性に注意
- 必要に応じて、データ移行処理を実装

### 4. エラーハンドリング

- ネットワークエラー時の処理
- バージョン比較エラー時の処理
- 更新処理の失敗時の処理

## テスト方法

### 1. インストール済みテンプレートの設定

```typescript
// テスト用にインストール済みテンプレートを設定
localStorage.setItem('installedTemplates', JSON.stringify([
  { templateId: 'crm', version: '1.0.0', installedAt: '2024-12-29T00:00:00Z' },
  { templateId: 'blank-page', version: '1.0.0', installedAt: '2024-12-29T00:00:00Z' }
]));
```

### 2. 更新が必要な場合のテスト

```typescript
// 古いバージョンを設定
localStorage.setItem('installedTemplates', JSON.stringify([
  { templateId: 'crm', version: '0.9.0', installedAt: '2024-12-28T00:00:00Z' }
]));

// テンプレート一覧を読み込むと、「更新」ボタンが表示されるはず
```

---

**最終更新日**: 2024年12月29日
