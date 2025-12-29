import { Asset } from '../types'

export const mockAssets: Asset[] = [
  {
    id: '1',
    name: 'グラフコンポーネント Pro',
    description: '高度なデータ可視化を実現するグラフコンポーネント。複数のグラフタイプに対応し、リアルタイム更新も可能です。',
    type: 'plugin',
    category: 'UIコンポーネント',
    vendor: {
      id: 'vendor1',
      name: 'Tech Solutions Inc.',
      avatar: 'https://ui-avatars.com/api/?name=Tech+Solutions'
    },
    version: '1.2.0',
    price: 5000,
    priceType: 'one-time',
    screenshots: [
      'https://via.placeholder.com/800x600/667eea/ffffff?text=Graph+Component+Demo',
      'https://via.placeholder.com/800x600/764ba2/ffffff?text=Chart+Types'
    ],
    demoUrl: 'https://example.com/demo/graph',
    readme: `
# グラフコンポーネント Pro

## 概要
高度なデータ可視化を実現するグラフコンポーネントです。

## 機能
- 複数のグラフタイプ（線グラフ、棒グラフ、円グラフなど）
- リアルタイムデータ更新
- カスタマイズ可能なデザイン
- レスポンシブ対応

## 使用方法

\`\`\`tsx
import { GraphComponent } from '@appnavi/graph-pro'

<GraphComponent
  data={chartData}
  type="line"
  options={{ responsive: true }}
/>
\`\`\`

## ライセンス
MIT License
    `,
    tags: ['グラフ', 'データ可視化', 'UI', 'React'],
    downloads: 450,
    rating: 4.5,
    reviews: [
      {
        id: 'review1',
        userId: 'user1',
        userName: '田中太郎',
        rating: 5,
        comment: '非常に使いやすく、ドキュメントも充実しています。',
        createdAt: '2024-01-15T10:00:00Z'
      },
      {
        id: 'review2',
        userId: 'user2',
        userName: '佐藤花子',
        rating: 4,
        comment: '良いコンポーネントですが、カスタマイズの幅をもう少し広げてほしいです。',
        createdAt: '2024-01-20T14:30:00Z'
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    githubUrl: 'https://github.com/example/graph-component',
    dependencies: ['react', 'chart.js']
  },
  {
    id: '2',
    name: 'kintone連携プラグイン',
    description: 'kintoneとAppNaviを連携し、データの同期や操作を簡単に行えるプラグインです。',
    type: 'plugin',
    category: '外部連携',
    vendor: {
      id: 'vendor2',
      name: 'Integration Experts',
      avatar: 'https://ui-avatars.com/api/?name=Integration+Experts'
    },
    version: '2.0.1',
    price: 0,
    priceType: 'free',
    screenshots: [
      'https://via.placeholder.com/800x600/48bb78/ffffff?text=kintone+Integration'
    ],
    readme: `
# kintone連携プラグイン

## 概要
kintoneとAppNaviを連携するためのプラグインです。

## 機能
- kintoneアプリからのデータ取得
- データの同期
- レコードの作成・更新・削除

## セットアップ

1. kintoneのAPIトークンを取得
2. プラグイン設定でトークンを入力
3. アプリIDを指定

## ライセンス
MIT License
    `,
    tags: ['kintone', '外部連携', 'API', 'データ同期'],
    downloads: 890,
    rating: 4.8,
    reviews: [
      {
        id: 'review3',
        userId: 'user3',
        userName: '鈴木一郎',
        rating: 5,
        comment: 'kintoneとの連携が非常に簡単になりました！',
        createdAt: '2024-02-01T09:00:00Z'
      }
    ],
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z',
    githubUrl: 'https://github.com/example/kintone-plugin',
    dependencies: ['axios']
  },
  {
    id: '3',
    name: 'ECサイトテンプレート',
    description: 'ECサイト構築用の完全なテンプレート。商品管理、カート、決済機能まで含まれています。',
    type: 'template',
    category: 'テンプレート',
    vendor: {
      id: 'vendor1',
      name: 'Tech Solutions Inc.',
      avatar: 'https://ui-avatars.com/api/?name=Tech+Solutions'
    },
    version: '1.0.0',
    price: 30000,
    priceType: 'one-time',
    screenshots: [
      'https://via.placeholder.com/800x600/f56565/ffffff?text=EC+Site+Template',
      'https://via.placeholder.com/800x600/ed8936/ffffff?text=Product+Page',
      'https://via.placeholder.com/800x600/38b2ac/ffffff?text=Checkout'
    ],
    readme: `
# ECサイトテンプレート

## 概要
ECサイト構築用の完全なテンプレートです。

## 含まれる機能
- 商品一覧・詳細ページ
- ショッピングカート
- 決済機能
- ユーザー管理
- 注文管理

## セットアップ

テンプレートをインポートして、すぐに使用を開始できます。

## ライセンス
商用利用可
    `,
    tags: ['ECサイト', 'テンプレート', 'eコマース', 'ショッピングカート'],
    downloads: 234,
    rating: 4.2,
    reviews: [],
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z'
  }
]

