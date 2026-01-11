# AppNavi-asset 実装サマリー

## 実装完了項目

### ✅ 1. templates.jsonの形式を仕様書に合わせて更新

**ファイル**: `templates/api/templates.json`

**変更内容**:
- `id`フィールドを削除（仕様書には含まれていない）
- `templateUrl`, `schemaUrl`, `viewsUrl`, `sampleDataUrl`, `spreadsheetUrl`を削除（仕様書には含まれていない）
- `previewImageUrl`と`demoUrl`を完全なURL形式に変更
- `author`を"AppNavi Team"に変更
- 必須フィールドをすべて含む
- オプションフィールド（features, previewImageUrl, demoUrl）を含む

**確認**:
```bash
npm run validate:templates
```
✅ すべてのテンプレートが正常にバリデーションを通過

### ✅ 2. CORS設定用の_headersファイルを作成

**ファイル**: `_headers`

**内容**:
- `/api/templates.json`へのCORSアクセスを許可
- `/templates/*/schema.json`, `/templates/*/views.json`, `/templates/*/sample-data.json`へのCORSアクセスを許可
- 画像ファイルへのCORSアクセスを許可

**注意**: GitHub Pagesでは`_headers`ファイルは直接サポートされていません。NetlifyやVercelへの移行を検討するか、AppNavi側でCORSエラーを回避する方法（プロキシサーバー経由など）を検討してください。

### ✅ 3. バリデーションスクリプトの作成

**ファイル**: `scripts/validate-templates.js`

**機能**:
- 必須フィールドのチェック
- データ型のチェック
- 値の妥当性チェック（color, templateId, versionなど）
- URLの形式チェック

**使用方法**:
```bash
npm run validate:templates
```

### ✅ 4. GitHub Actionsワークフローの更新

**ファイル**: `.github/workflows/deploy-pages.yml`

**変更内容**:
- `dist/api/templates.json`へのコピー処理を追加
- `_headers`ファイルのコピー処理を追加

## ファイル構造

```
AppNavi-asset/
├── _headers                          # CORS設定（Netlify/Vercel用）
├── api/
│   └── templates.json                # テンプレート一覧API ✅
├── scripts/
│   └── validate-templates.js         # バリデーションスクリプト ✅
├── templates/
│   ├── crm/
│   │   ├── schema.json
│   │   ├── views.json
│   │   └── sample-data.json
│   └── ...
└── .github/workflows/
    └── deploy-pages.yml              # デプロイワークフロー ✅
```

## APIエンドポイント

### テンプレート一覧API

**URL**: `https://tsubasagit.github.io/AppNavi-asset/api/templates.json`

**レスポンス例**:
```json
{
  "templates": [
    {
      "templateId": "crm",
      "name": "顧客管理（CRM）",
      "description": "顧客情報、商談管理、活動履歴を一元管理",
      "category": "営業・マーケティング",
      "color": "purple",
      "version": "1.0.0",
      "isPublic": true,
      "tags": ["営業", "顧客管理", "商談", "CRM"],
      "author": "AppNavi Team",
      "features": [
        "顧客一覧テーブル",
        "商談パイプライン（カンバン）",
        "活動履歴タイムライン",
        "営業ダッシュボード（KPI表示）"
      ],
      "previewImageUrl": "https://tsubasagit.github.io/AppNavi-asset/templates/crm/preview.png",
      "demoUrl": "https://tsubasagit.github.io/AppNavi-asset/templates/crm/"
    }
  ]
}
```

## 次のステップ

### 1. CORS設定の確認

GitHub Pagesでは`_headers`ファイルが直接サポートされていないため、以下のいずれかの方法を検討してください：

**オプションA: Netlify/Vercelへの移行**
- `_headers`ファイルが直接サポートされる
- CORS設定が自動的に適用される

**オプションB: AppNavi側での対応**
- プロキシサーバー経由でテンプレートを取得
- または、CORSエラーを回避する別の方法を実装

**オプションC: GitHub Pagesのまま使用**
- JSONファイルはCORSエラーが発生しない場合がある（同一オリジンまたはブラウザの設定による）
- AppNavi側でCORSエラーを適切にハンドリング

### 2. デプロイとテスト

```bash
# バリデーション
npm run validate:templates

# ビルドとデプロイ
npm run deploy:pages

# または、GitHubにプッシュして自動デプロイ
git add .
git commit -m "Update templates.json for AppNavi integration"
git push
```

### 3. AppNavi側での統合テスト

1. AppNaviアプリケーションを起動
2. 「方針」タブを開く
3. 「外部サイトから更新」ボタンをクリック
4. テンプレートが正しく表示されるか確認
5. CORSエラーが発生しないか確認

## トラブルシューティング

### CORSエラーが発生する場合

1. `_headers`ファイルが正しく配置されているか確認
2. Netlify/Vercelを使用している場合、設定を確認
3. AppNavi側でCORSエラーを適切にハンドリング

### テンプレートが表示されない場合

1. `npm run validate:templates`でバリデーションを実行
2. `templates/api/templates.json`の構文を確認
3. 必須フィールドがすべて含まれているか確認

---

**最終更新日**: 2024年12月29日
