# テンプレートサーバー クイックスタートガイド

## 5分で始める

### 1. リポジトリのクローン

```bash
git clone https://github.com/tsubasagit/AppNavi-asset.git
cd AppNavi-asset
```

### 2. ディレクトリ構造の確認

既に以下のディレクトリ構造が作成されています：

```
templates/
├── index.html
├── api/templates.json
├── templates/
│   ├── crm/index.html
│   ├── google-calendar-group/index.html
│   ├── daily-report/index.html
│   └── auto-integration/index.html
└── README.md
```

### 3. ローカルで確認

```bash
cd templates
# Python 3の場合
python -m http.server 8000

# Node.jsの場合
npx serve .
```

ブラウザで `http://localhost:8000` にアクセスして確認してください。

### 4. デプロイ

#### Firebase Hosting（推奨）

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# Public directory: templates
firebase deploy --only hosting
```

#### Netlify

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=templates
```

#### Vercel

```bash
npm install -g vercel
cd templates
vercel --prod
```

### 5. AppNavi側の設定

デプロイ後、AppNaviの `.env` ファイルに以下を追加：

```env
VITE_TEMPLATE_SERVER_URL=https://your-deployed-url.com
```

## 次のステップ

詳細な構築手順については、[BUILD_INSTRUCTIONS.md](./BUILD_INSTRUCTIONS.md)を参照してください。


