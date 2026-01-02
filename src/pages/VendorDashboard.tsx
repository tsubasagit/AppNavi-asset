import { useState } from 'react'
import { Plus, Upload, BarChart3, Download, DollarSign, Package } from 'lucide-react'
import './VendorDashboard.css'

export default function VendorDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'assets' | 'upload'>('overview')

  // モックデータ
  const stats = {
    totalAssets: 12,
    totalDownloads: 3450,
    totalSales: 125000,
    averageRating: 4.5
  }

  const recentAssets = [
    { id: '1', name: 'グラフコンポーネント', downloads: 450, sales: 50000 },
    { id: '2', name: 'kintone連携プラグイン', downloads: 890, sales: 75000 },
  ]

  return (
    <div className="vendor-dashboard">
      <div className="dashboard-header">
        <h1>ベンダーダッシュボード</h1>
        <button className="upload-button" onClick={() => setActiveTab('upload')}>
          <Plus size={18} />
          新しいアセットをアップロード
        </button>
      </div>

      <div className="dashboard-tabs">
        <button
          className={activeTab === 'overview' ? 'active' : ''}
          onClick={() => setActiveTab('overview')}
        >
          <BarChart3 size={18} />
          概要
        </button>
        <button
          className={activeTab === 'assets' ? 'active' : ''}
          onClick={() => setActiveTab('assets')}
        >
          <Package size={18} />
          アセット管理
        </button>
        <button
          className={activeTab === 'upload' ? 'active' : ''}
          onClick={() => setActiveTab('upload')}
        >
          <Upload size={18} />
          アップロード
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">
                  <Package size={24} />
                </div>
                <div className="stat-content">
                  <h3>総アセット数</h3>
                  <p className="stat-value">{stats.totalAssets}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <Download size={24} />
                </div>
                <div className="stat-content">
                  <h3>総ダウンロード数</h3>
                  <p className="stat-value">{stats.totalDownloads.toLocaleString()}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <DollarSign size={24} />
                </div>
                <div className="stat-content">
                  <h3>総売上</h3>
                  <p className="stat-value">¥{stats.totalSales.toLocaleString()}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">
                  <BarChart3 size={24} />
                </div>
                <div className="stat-content">
                  <h3>平均評価</h3>
                  <p className="stat-value">{stats.averageRating.toFixed(1)}</p>
                </div>
              </div>
            </div>

            <div className="recent-assets">
              <h2>最近のアセット</h2>
              <div className="assets-table">
                <table>
                  <thead>
                    <tr>
                      <th>アセット名</th>
                      <th>ダウンロード数</th>
                      <th>売上</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentAssets.map(asset => (
                      <tr key={asset.id}>
                        <td>{asset.name}</td>
                        <td>{asset.downloads.toLocaleString()}</td>
                        <td>¥{asset.sales.toLocaleString()}</td>
                        <td>
                          <button className="action-button">編集</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'assets' && (
          <div className="assets-tab">
            <h2>アセット管理</h2>
            <p>アセットの一覧と管理機能は今後実装予定です。</p>
          </div>
        )}

        {activeTab === 'upload' && (
          <div className="upload-tab">
            <h2>新しいアセットをアップロード</h2>
            <div className="upload-form">
              <div className="form-group">
                <label>アセット名</label>
                <input type="text" placeholder="例: グラフコンポーネント" />
              </div>

              <div className="form-group">
                <label>タイプ</label>
                <select>
                  <option value="plugin">プラグイン</option>
                  <option value="template">テンプレート</option>
                </select>
              </div>

              <div className="form-group">
                <label>説明</label>
                <textarea 
                  rows={5} 
                  placeholder="アセットの説明を入力してください..."
                />
              </div>

              <div className="form-group">
                <label>カテゴリ</label>
                <select>
                  <option value="ui">UIコンポーネント</option>
                  <option value="integration">外部連携</option>
                  <option value="data">データ処理</option>
                  <option value="other">その他</option>
                </select>
              </div>

              <div className="form-group">
                <label>価格設定</label>
                <div className="price-options">
                  <label>
                    <input type="radio" name="priceType" value="free" defaultChecked />
                    無料
                  </label>
                  <label>
                    <input type="radio" name="priceType" value="one-time" />
                    買い切り
                  </label>
                  <label>
                    <input type="radio" name="priceType" value="subscription" />
                    サブスクリプション
                  </label>
                </div>
                <input type="number" placeholder="価格（円）" />
              </div>

              <div className="form-group">
                <label>GitHubリポジトリURL（オプション）</label>
                <input type="url" placeholder="https://github.com/username/repo" />
              </div>

              <div className="form-group">
                <label>スクリーンショット</label>
                <input type="file" multiple accept="image/*" />
              </div>

              <div className="form-group">
                <label>README（Markdown）</label>
                <textarea 
                  rows={10} 
                  placeholder="# アセット名&#10;&#10;説明文をMarkdown形式で記述..."
                />
              </div>

              <button className="submit-button">
                <Upload size={18} />
                アップロード
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}



