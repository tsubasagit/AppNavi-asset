# テンプレート作成の最低要件

このドキュメントは、AppNaviのテンプレートを作成する際の最低要件をまとめたものです。

## 1. ディレクトリ構造

新しいテンプレートを作成する場合、以下のディレクトリ構造に従ってください：

```
templates/
├── templates/
│   └── {template-id}/          # テンプレートID（英数字、ハイフン、アンダースコアのみ）
│       ├── index.html          # テンプレート詳細ページ（必須）
│       └── preview.png         # プレビュー画像（推奨）
├── api/
│   └── templates.json          # テンプレートメタデータ（必須）
```

## 2. テンプレートメタデータ（templates.json）

`templates/api/templates.json` に以下の必須フィールドを含める必要があります：

### 必須フィールド

| フィールド | 型 | 説明 | 例 |
|---------|-----|------|-----|
| `templateId` | string | テンプレートの一意のID（英数字、ハイフン、アンダースコアのみ） | `"crm"` |
| `name` | string | テンプレートの表示名 | `"顧客管理（CRM）"` |
| `description` | string | テンプレートの説明（1-2行） | `"顧客情報、商談管理、活動履歴を一元管理"` |
| `category` | string | カテゴリ名 | `"営業・マーケティング"` |
| `version` | string | バージョン番号（セマンティックバージョニング推奨） | `"1.0.0"` |
| `isPublic` | boolean | 公開フラグ | `true` |

### 推奨フィールド

| フィールド | 型 | 説明 | 例 |
|---------|-----|------|-----|
| `color` | string | テンプレートのテーマカラー（CSS色名またはHEXコード） | `"purple"` または `"#8b5cf6"` |
| `previewImageUrl` | string | プレビュー画像のURLパス | `"/templates/crm/preview.png"` |
| `demoUrl` | string | デモページのURLパス | `"/templates/crm/"` |
| `tags` | string[] | 検索用タグの配列 | `["営業", "顧客管理", "商談", "CRM"]` |
| `author` | string | 作成者名 | `"AppTalentHub"` |
| `features` | string[] | 機能一覧の配列 | `["顧客一覧テーブル", "商談パイプライン"]` |

### メタデータの例

```json
{
  "templateId": "crm",
  "name": "顧客管理（CRM）",
  "description": "顧客情報、商談管理、活動履歴を一元管理",
  "category": "営業・マーケティング",
  "color": "purple",
  "previewImageUrl": "/templates/crm/preview.png",
  "demoUrl": "/templates/crm/",
  "version": "1.0.0",
  "isPublic": true,
  "tags": ["営業", "顧客管理", "商談", "CRM"],
  "author": "AppTalentHub",
  "features": [
    "顧客一覧テーブル",
    "商談パイプライン（カンバン）",
    "活動履歴タイムライン",
    "営業ダッシュボード（KPI表示）"
  ]
}
```

## 3. テンプレート詳細ページ（index.html）

`templates/templates/{template-id}/index.html` を作成する必要があります。

### 最低限必要な要素

1. **HTMLの基本構造**
   - `<!DOCTYPE html>`
   - `<html lang="ja">`
   - `<head>` セクション（charset、viewport、title）
   - `<body>` セクション

2. **ヘッダーセクション**
   - テンプレート名
   - 説明文

3. **機能説明セクション**
   - テンプレートの主な機能を説明

4. **推奨データ構造セクション**
   - AppNaviで使用する推奨データ構造の説明
   - データベース構造の説明（推奨）

### 推奨される要素

- プレビュー画像
- ダッシュボードプレビュー
- デザインガイド
- データベーススキーマ図
- サンプルデータ例
- インストール手順

### スタイル要件

- レスポンシブデザイン（モバイル対応）
- モダンなUIデザイン
- 読みやすいフォントとカラーコントラスト

## 4. テンプレートIDの命名規則

- 英数字、ハイフン（`-`）、アンダースコア（`_`）のみ使用可能
- 小文字推奨
- 意味のある名前を付ける（例：`crm`, `google-calendar-group`）
- 既存のテンプレートIDと重複しないこと

## 5. ファイル配置

### 必須ファイル

1. `templates/templates/{template-id}/index.html` - テンプレート詳細ページ
2. `templates/api/templates.json` - メタデータ（既存ファイルに追加）

### 推奨ファイル

1. `templates/templates/{template-id}/preview.png` - プレビュー画像（推奨サイズ: 1200x800px）
2. `templates/templates/{template-id}/README.md` - テンプレートの詳細ドキュメント（オプション）

## 6. 新規テンプレート追加の手順

1. **ディレクトリの作成**
   ```bash
   mkdir -p templates/templates/{template-id}
   ```

2. **メタデータの追加**
   - `templates/api/templates.json` を開く
   - `templates` 配列に新しいテンプレート情報を追加

3. **詳細ページの作成**
   - `templates/templates/{template-id}/index.html` を作成
   - 既存のテンプレート（例：`crm/index.html`）を参考にする

4. **プレビュー画像の追加（推奨）**
   - `templates/templates/{template-id}/preview.png` を追加
   - メタデータの `previewImageUrl` を設定

5. **動作確認**
   - ローカルサーバーで確認
   - テンプレート一覧ページに表示されることを確認
   - 詳細ページが正しく表示されることを確認

## 7. 既存の顧客管理（CRM）テンプレートの参考

既存のCRMテンプレート（`templates/templates/crm/`）を参考にしてください：

- **構造**: ヘッダー、機能説明、推奨データ構造、ダッシュボードプレビュー
- **データ構造**: customers、deals、activities テーブル
- **機能**: 顧客一覧、商談パイプライン、活動履歴、ダッシュボード

## 8. チェックリスト

新しいテンプレートを作成する際は、以下を確認してください：

- [ ] `templates/api/templates.json` にメタデータを追加した
- [ ] `templates/templates/{template-id}/index.html` を作成した
- [ ] テンプレートIDが既存のものと重複していない
- [ ] 必須フィールドがすべて含まれている
- [ ] プレビュー画像を追加した（推奨）
- [ ] ローカルで動作確認した
- [ ] テンプレート一覧ページに表示されることを確認した
- [ ] 詳細ページが正しく表示されることを確認した

## 9. 参考資料

- [BUILD_INSTRUCTIONS.md](../templates/BUILD_INSTRUCTIONS.md) - 詳細な構築手順
- [README.md](../templates/README.md) - テンプレートサーバーの説明
- [QUICK_START.md](../templates/QUICK_START.md) - クイックスタートガイド

## 10. サポート

問題が発生した場合は、既存のテンプレート（`crm`, `google-calendar-group`, `daily-report`, `auto-integration`）を参考にしてください。

---

**最終更新日**: 2024年12月29日
**バージョン**: 1.0.0
