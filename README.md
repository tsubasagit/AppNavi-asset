# AppNavi Asset Marketplace

AppNaviのプラグインとテンプレートを管理・配布するマーケットプレイスです。

## 概要

このプロジェクトは、AppNaviの機能拡張仕様書（Phase 2: B2B2B ベンダーイネーブルメント）に基づいて実装されたマーケットプレイスです。

- **セキュリティ**: メインドメイン（appnavi.com）と分離されたアセットドメイン（appnavi-assets.com）で動作
- **プラグイン管理**: ベンダーが作成したプラグインやテンプレートの登録・管理
- **インストール機能**: postMessage APIを使用した安全なインストールフロー

## 機能

### マーケットプレイス
- プラグイン・テンプレートのカタログ表示
- 検索・フィルタリング機能
- 詳細ページ（スクリーンショット、デモ、レビュー）
- ワンクリックインストール

### ベンダーダッシュボード
- アセットのアップロード
- 売上・ダウンロード数の統計
- アセット管理

## セットアップ

### 必要な環境
- Node.js 18以上
- npm または yarn

### インストール

```bash
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:3001` を開いてください。

### ビルド

```bash
npm run build
```

## プロジェクト構造

```
src/
├── components/      # 共通コンポーネント
│   └── Layout.tsx
├── pages/          # ページコンポーネント
│   ├── Marketplace.tsx
│   ├── AssetDetail.tsx
│   └── VendorDashboard.tsx
├── types/          # TypeScript型定義
│   └── index.ts
├── data/           # モックデータ
│   └── mockData.ts
├── App.tsx         # メインアプリケーション
└── main.tsx        # エントリーポイント
```

## GitHubリポジトリとの連携

このプロジェクトは以下のGitHubリポジトリと連携します：
- https://github.com/tsubasagit/AppNavi-asset

### リポジトリの初期化

```bash
git init
git remote add origin https://github.com/tsubasagit/AppNavi-asset.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

## セキュリティアーキテクチャ

仕様書に基づき、以下のセキュリティ対策を実装しています：

1. **ドメイン分離**: メインドメインとアセットドメインの分離
2. **postMessage通信**: ドメイン間の安全な通信
3. **サンドボックス化**: iframeを使用したコード実行の隔離

## 今後の拡張予定

- [ ] 実際のAPI連携
- [ ] 認証機能
- [ ] 決済機能
- [ ] コードスキャン機能
- [ ] レビュー機能の実装

## ライセンス

MIT License





