import { Asset } from '../types'

export const mockAssets: Asset[] = [
  {
    id: 'blank-page',
    name: 'ブランクページ',
    description: 'シンプルで柔軟な、カスタマイズ可能なテンプレート。最小限の構造で、自由にカスタマイズして独自のアプリケーションを作成できます。',
    type: 'template',
    category: '基本テンプレート',
    vendor: {
      id: 'apptalent',
      name: 'AppNavi Team',
      avatar: 'https://ui-avatars.com/api/?name=AppNavi+Team'
    },
    version: '1.0.0',
    price: 0,
    priceType: 'free',
    screenshots: [
      'https://via.placeholder.com/800x600/64748b/ffffff?text=Blank+Page+Template'
    ],
    demoUrl: '/templates/blank-page/',
    readme: `
# ブランクページテンプレート

## 概要
シンプルで柔軟な、カスタマイズ可能なテンプレートです。

## 含まれる機能
- 📄 最小限の構造
- ✏️ 自由にカスタマイズ可能
- 📋 基本的なページレイアウト
- 🎨 シンプルで軽量

## セットアップ
テンプレートをインポートして、すぐに使用を開始できます。

## ライセンス
MIT License
    `,
    tags: ['基本', 'シンプル', 'カスタマイズ', 'ブランク'],
    downloads: 123,
    rating: 4.0,
    reviews: [],
    createdAt: '2024-12-29T00:00:00Z',
    updatedAt: '2024-12-29T00:00:00Z',
    githubUrl: 'https://github.com/tsubasagit/AppNavi-asset',
    dependencies: []
  },
  {
    id: 'crm',
    name: '顧客管理（CRM）',
    description: '顧客情報、商談管理、活動履歴を一元管理。営業ダッシュボード、商談パイプライン、活動履歴タイムラインを含む完全なCRMシステムです。',
    type: 'template',
    category: '営業・マーケティング',
    vendor: {
      id: 'apptalent',
      name: 'AppTalentHub',
      avatar: 'https://ui-avatars.com/api/?name=AppTalentHub'
    },
    version: '1.0.0',
    price: 0,
    priceType: 'free',
    screenshots: [
      'https://via.placeholder.com/800x600/8b5cf6/ffffff?text=CRM+Template'
    ],
    demoUrl: '/templates/crm/',
    readme: `
# 顧客管理（CRM）テンプレート

## 概要
顧客情報、商談管理、活動履歴を一元管理するCRMテンプレートです。

## 含まれる機能
- 📊 営業ダッシュボード（KPI表示）
- 📋 顧客一覧テーブル
- 🎯 商談パイプライン（カンバン）
- 📅 活動履歴タイムライン
- 👤 顧客詳細ページ

## データ構造
- customers（顧客マスタ）: 25件のサンプルデータ
- deals（商談管理）: 20件のサンプルデータ
- activities（活動履歴）: 60件のサンプルデータ

## セットアップ
テンプレートをインポートして、すぐに使用を開始できます。

## ライセンス
MIT License
    `,
    tags: ['営業', '顧客管理', '商談', 'CRM'],
    downloads: 1234,
    rating: 4.8,
    reviews: [
      {
        id: 'review-crm1',
        userId: 'user1',
        userName: '田中太郎',
        rating: 5,
        comment: '営業活動の管理が非常に簡単になりました！',
        createdAt: '2024-01-20T10:00:00Z'
      }
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z',
    githubUrl: 'https://github.com/tsubasagit/AppNavi-asset',
    dependencies: []
  },
  {
    id: 'google-calendar-group',
    name: 'Googleカレンダーのグループ化',
    description: '複数のGoogleカレンダーを統合し、グループ別に管理・表示。カレンダー統合表示、グループ別フィルター、イベント一覧、参加者管理、自動同期機能を含みます。',
    type: 'template',
    category: 'スケジュール管理',
    vendor: {
      id: 'apptalent',
      name: 'AppTalentHub',
      avatar: 'https://ui-avatars.com/api/?name=AppTalentHub'
    },
    version: '1.0.0',
    price: 0,
    priceType: 'free',
    screenshots: [
      'https://via.placeholder.com/800x600/f97316/ffffff?text=Google+Calendar+Template'
    ],
    demoUrl: '/templates/google-calendar-group/',
    readme: `
# Googleカレンダーのグループ化テンプレート

## 概要
複数のGoogleカレンダーを統合し、グループ別に管理・表示するテンプレートです。

## 含まれる機能
- 📅 カレンダー統合表示
- 🏷️ グループ別フィルター
- 📋 イベント一覧
- 👥 参加者管理
- 🔄 自動同期

## ライセンス
MIT License
    `,
    tags: ['カレンダー', 'スケジュール', 'Google', 'グループ管理'],
    downloads: 567,
    rating: 4.5,
    reviews: [],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    githubUrl: 'https://github.com/tsubasagit/AppNavi-asset',
    dependencies: []
  },
  {
    id: 'daily-report',
    name: '日報チェック',
    description: '日々の業務活動の記録とチェック、自動連携。日報入力フォーム、活動一覧テーブル、カレンダー表示、チェック状況ダッシュボード、自動承認フローを含みます。',
    type: 'template',
    category: '業務管理',
    vendor: {
      id: 'apptalent',
      name: 'AppTalentHub',
      avatar: 'https://ui-avatars.com/api/?name=AppTalentHub'
    },
    version: '1.0.0',
    price: 0,
    priceType: 'free',
    screenshots: [
      'https://via.placeholder.com/800x600/10b981/ffffff?text=Daily+Report+Template'
    ],
    demoUrl: '/templates/daily-report/',
    readme: `
# 日報チェックテンプレート

## 概要
日々の業務活動の記録とチェック、自動連携を行うテンプレートです。

## 含まれる機能
- 📝 日報入力フォーム
- 📋 活動一覧テーブル
- 📅 カレンダー表示
- ✅ チェック状況ダッシュボード
- 🔄 自動承認フロー

## ライセンス
MIT License
    `,
    tags: ['日報', '活動報告', 'チェック', '業務管理'],
    downloads: 890,
    rating: 4.6,
    reviews: [],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    githubUrl: 'https://github.com/tsubasagit/AppNavi-asset',
    dependencies: []
  },
  {
    id: 'auto-integration',
    name: '自動連携',
    description: '各種サービスとの自動連携とデータ同期。連携設定画面、データ同期状況、連携ログ、エラー通知、自動更新ダッシュボードを含みます。',
    type: 'template',
    category: '連携・統合',
    vendor: {
      id: 'apptalent',
      name: 'AppTalentHub',
      avatar: 'https://ui-avatars.com/api/?name=AppTalentHub'
    },
    version: '1.0.0',
    price: 0,
    priceType: 'free',
    screenshots: [
      'https://via.placeholder.com/800x600/3b82f6/ffffff?text=Auto+Integration+Template'
    ],
    demoUrl: '/templates/auto-integration/',
    readme: `
# 自動連携テンプレート

## 概要
各種サービスとの自動連携とデータ同期を行うテンプレートです。

## 含まれる機能
- ⚙️ 連携設定画面
- 📊 データ同期状況
- 📋 連携ログ
- ⚠️ エラー通知
- 🔄 自動更新ダッシュボード

## ライセンス
MIT License
    `,
    tags: ['連携', '統合', '自動化', 'データ同期'],
    downloads: 456,
    rating: 4.4,
    reviews: [],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    githubUrl: 'https://github.com/tsubasagit/AppNavi-asset',
    dependencies: []
  }
]

