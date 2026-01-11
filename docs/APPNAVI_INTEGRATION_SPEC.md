# AppNavi-asset 開発仕様書

## 1. 概要

本仕様書は、`https://tsubasagit.github.io/AppNavi-asset/` からAppNaviアプリケーションにテンプレートを提供するための開発仕様です。

AppNaviアプリケーションは、この外部サイトからテンプレート一覧を取得し、ユーザーに表示します。

## 2. 要件

### 2.1 APIエンドポイント

以下のエンドポイントでテンプレート一覧を提供します：

```
GET https://tsubasagit.github.io/AppNavi-asset/api/templates.json
```

### 2.2 レスポンス形式

**Content-Type**: `application/json`

**レスポンス形式**:
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
      "features": ["顧客管理", "商談パイプライン", "活動履歴"],
      "previewImageUrl": "https://tsubasagit.github.io/AppNavi-asset/images/crm-preview.png",
      "demoUrl": "https://tsubasagit.github.io/AppNavi-asset/demos/crm/"
    }
  ]
}
```

## 3. 実装状況

### 3.1 完了項目

✅ **templates.jsonの形式を仕様書に合わせて更新**
- 必須フィールドをすべて含む
- オプションフィールド（features, previewImageUrl, demoUrl）を含む
- URLを完全なURL形式に変更

✅ **CORS設定**
- `_headers`ファイルを作成（GitHub Pages用）
- `/api/templates.json`へのアクセスを許可
- 静的ファイル（schema.json, views.json, sample-data.json）へのアクセスを許可

✅ **バリデーションスクリプト**
- `scripts/validate-templates.js`を作成
- 必須フィールドのチェック
- データ型のチェック
- 値の妥当性チェック

### 3.2 ファイル配置

```
AppNavi-asset/
├── _headers                          # CORS設定（GitHub Pages用）
├── api/
│   └── templates.json                # テンプレート一覧API ✅
├── scripts/
│   └── validate-templates.js        # バリデーションスクリプト ✅
└── templates/
    ├── crm/
    │   ├── schema.json
    │   ├── views.json
    │   └── sample-data.json
    └── ...
```

## 4. 使用方法

### 4.1 バリデーションの実行

```bash
npm run validate:templates
```

### 4.2 デプロイ

```bash
npm run deploy:pages
```

このコマンドは以下を実行します：
1. ビルド（`npm run build`）
2. テンプレートのコピー（`npm run copy:templates`）
3. CORS設定ファイルのコピー（`npm run copy:headers`）

## 5. テスト

### 5.1 ローカルテスト

```bash
# JSONの構文チェック
npm run validate:templates

# HTTPリクエストのテスト
curl https://tsubasagit.github.io/AppNavi-asset/api/templates.json
```

### 5.2 CORSテスト

ブラウザの開発者ツールで以下を実行：

```javascript
fetch('https://tsubasagit.github.io/AppNavi-asset/api/templates.json')
  .then(r => r.json())
  .then(data => console.log(data))
```

CORSエラーが発生しないことを確認してください。

## 6. トラブルシューティング

### 6.1 CORSエラー

**エラーメッセージ**:
```
Access to fetch at 'https://tsubasagit.github.io/AppNavi-asset/api/templates.json' from origin '...' has been blocked by CORS policy
```

**解決方法**:
1. `_headers`ファイルがルートディレクトリに配置されているか確認
2. GitHub Pagesの設定を確認
3. デプロイ後に`_headers`ファイルが`dist/_headers`にコピーされているか確認

### 6.2 バリデーションエラー

**エラーメッセージ**:
```
❌ エラー: 必須フィールドが不足しています: templateId
```

**解決方法**:
1. `templates/api/templates.json`を開く
2. エラーメッセージに従って不足しているフィールドを追加
3. 再度バリデーションを実行

---

**最終更新日**: 2024年12月29日
