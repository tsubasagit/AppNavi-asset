# ワークフロー分析と推奨事項

## 現在のワークフロー

### 1. `deploy-pages.yml`（完全版）✅ 推奨

**機能**:
- Reactアプリをビルド
- templatesディレクトリをコピー
- APIファイル（`templates.json`）をコピー
- 詳細な検証ログ
- `.nojekyll` ファイルを作成
- `_headers` ファイルをコピー

**トリガー**: 
- `push` イベント（mainブランチ）
- `workflow_dispatch`（手動実行）

**Concurrency**: `group: "pages"`

### 2. `deploy-simple.yml`（簡易版）❌ 不要

**機能**:
- Reactアプリをビルド
- templatesディレクトリをコピー
- APIファイルをコピー（最近追加）
- `templates.html` をコピー
- `.nojekyll` ファイルを作成
- 検証ログが少ない

**トリガー**: 
- `push` イベント（mainブランチ）
- `workflow_dispatch`（手動実行）

**Concurrency**: `group: "pages"`（`deploy-pages.yml` と競合）

**問題点**:
- `deploy-pages.yml` とほぼ同じ機能
- 同じ `concurrency.group` を使用しているため競合
- 検証ログが少ない

### 3. `deploy-templates.yml`（テンプレート専用）❌ 不要

**機能**:
- Reactアプリをビルドしない
- templatesのみをコピー
- `_site` ディレクトリを使用（`deploy-pages.yml` とは異なる）
- APIファイルをコピー

**トリガー**: 
- `push` イベント（mainブランチ、`templates/**` パスの変更時のみ）
- `workflow_dispatch`（手動実行）

**Concurrency**: `group: "pages-templates"`

**問題点**:
- Reactアプリがデプロイされない
- `_site` ディレクトリを使用（`deploy-pages.yml` は `dist` を使用）
- 別のディレクトリ構造のため、競合する可能性がある

## 推奨事項

### ✅ 推奨: `deploy-pages.yml` のみを使用

**理由**:
1. **最も完全**: すべての必要なファイルを含む
2. **詳細な検証**: デプロイ前の検証が充実
3. **メンテナンス性**: 1つのワークフローで管理が簡単
4. **競合の回避**: 複数のワークフローが競合しない

### ❌ 削除推奨: `deploy-simple.yml`

**理由**:
1. `deploy-pages.yml` とほぼ同じ機能
2. 同じ `concurrency.group` で競合
3. 検証ログが少ない
4. メンテナンスの負担が増える

### ❌ 削除推奨: `deploy-templates.yml`

**理由**:
1. Reactアプリがデプロイされない
2. 別のディレクトリ構造（`_site` vs `dist`）
3. `deploy-pages.yml` でカバーできる
4. 混乱を招く可能性がある

## 実装方法

### オプション1: 不要なワークフローを削除（推奨）

```bash
# deploy-simple.yml を削除
rm .github/workflows/deploy-simple.yml

# deploy-templates.yml を削除
rm .github/workflows/deploy-templates.yml
```

### オプション2: ワークフローを無効化（一時的な対応）

ワークフローファイルの `on:` セクションをコメントアウト：

```yaml
# on:
#   push:
#     branches:
#       - main
#   workflow_dispatch:
```

## 結論

**`deploy-pages.yml` のみを使用することを強く推奨します。**

これにより：
- ✅ 競合が解消される
- ✅ メンテナンスが簡単になる
- ✅ デプロイが確実になる
- ✅ 404エラーが解消される

---

**最終更新日**: 2024年12月29日
