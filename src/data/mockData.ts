import { Asset } from '../types'

export const mockAssets: Asset[] = [
  {
    id: 'chart-graph',
    name: 'グラフコンポーネント Pro',
    description: '高度なデータ可視化を実現するグラフコンポーネント。複数のグラフタイプに対応し、リアルタイム更新も可能です。検索機能も内蔵されています。',
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
    demoUrl: '/samples/plugins/chart-graph/preview.html',
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
    id: 'search-bar',
    name: '検索バープラグイン',
    description: '高度な検索機能を提供するプラグイン。リアルタイム検索、フィルタリング、検索履歴に対応しています。',
    type: 'plugin',
    category: 'UIコンポーネント',
    vendor: {
      id: 'vendor1',
      name: 'Tech Solutions Inc.',
      avatar: 'https://ui-avatars.com/api/?name=Tech+Solutions'
    },
    version: '1.0.0',
    price: 0,
    priceType: 'free',
    screenshots: [
      'https://via.placeholder.com/800x600/667eea/ffffff?text=Search+Bar+Plugin'
    ],
    demoUrl: '/samples/plugins/search-bar/preview.html',
    readme: `
# 検索バープラグイン

## 概要
高度な検索機能を提供するAppNaviプラグインです。

## 機能
- 🔍 リアルタイム検索
- 📚 検索履歴
- ⚡ デバウンス機能
- 🎯 複数フィールド検索

## 使用方法

\`\`\`tsx
import { SearchBarPlugin } from '@appnavi/search-bar-plugin'

<SearchBarPlugin
  placeholder="検索..."
  showHistory={true}
  data={sampleData}
/>
\`\`\`

## ライセンス
MIT License
    `,
    tags: ['検索', 'フィルタリング', 'UI', 'React'],
    downloads: 890,
    rating: 4.8,
    reviews: [
      {
        id: 'review-search1',
        userId: 'user1',
        userName: '田中太郎',
        rating: 5,
        comment: '非常に使いやすく、検索履歴機能が便利です！',
        createdAt: '2024-02-01T09:00:00Z'
      }
    ],
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-02-01T00:00:00Z',
    githubUrl: 'https://github.com/example/search-bar-plugin',
    dependencies: ['react']
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
    id: 'dashboard',
    name: 'ダッシュボードテンプレート',
    description: '包括的なダッシュボードテンプレート。統計カード、グラフ、検索機能、データテーブルを含む完全なダッシュボードです。',
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
      'https://via.placeholder.com/800x600/667eea/ffffff?text=Dashboard+Template',
      'https://via.placeholder.com/800x600/764ba2/ffffff?text=Statistics+Cards'
    ],
    demoUrl: '/samples/templates/dashboard/preview.html',
    readme: `
# ダッシュボードテンプレート

## 概要
包括的なダッシュボードテンプレートです。

## 含まれる機能
- 📊 統計カード（4つの主要指標）
- 🔍 検索機能付きデータテーブル
- 📈 グラフ表示エリア
- 📱 レスポンシブデザイン

## セットアップ

テンプレートをインポートして、すぐに使用を開始できます。

## ライセンス
MIT License
    `,
    tags: ['ダッシュボード', 'テンプレート', '統計', 'データ可視化'],
    downloads: 234,
    rating: 4.2,
    reviews: [],
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z'
  },
  {
    id: 'form-builder',
    name: 'フォームビルダーテンプレート',
    description: '動的なフォーム作成テンプレート。検索機能、バリデーション、リアルタイムプレビューを含む完全なフォームビルダーです。',
    type: 'template',
    category: 'テンプレート',
    vendor: {
      id: 'vendor1',
      name: 'Tech Solutions Inc.',
      avatar: 'https://ui-avatars.com/api/?name=Tech+Solutions'
    },
    version: '1.0.0',
    price: 0,
    priceType: 'free',
    screenshots: [
      'https://via.placeholder.com/800x600/48bb78/ffffff?text=Form+Builder+Template'
    ],
    demoUrl: '/samples/templates/form-builder/preview.html',
    readme: `
# フォームビルダーテンプレート

## 概要
動的なフォーム作成テンプレートです。

## 含まれる機能
- 🏗️ 動的フォーム生成
- 🔍 フィールド検索機能
- 👁️ リアルタイムプレビュー
- ✅ バリデーション対応
- 📝 複数のフィールドタイプ

## セットアップ

テンプレートをインポートして、すぐに使用を開始できます。

## ライセンス
MIT License
    `,
    tags: ['フォーム', 'テンプレート', 'ビルダー', 'バリデーション'],
    downloads: 567,
    rating: 4.6,
    reviews: [
      {
        id: 'review-form1',
        userId: 'user2',
        userName: '佐藤花子',
        rating: 5,
        comment: 'フォーム作成が非常に簡単になりました！',
        createdAt: '2024-02-05T10:00:00Z'
      }
    ],
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-02-05T00:00:00Z'
  }
]

