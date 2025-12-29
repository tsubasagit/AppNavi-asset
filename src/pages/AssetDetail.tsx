import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, Star, Download, ExternalLink, Github, 
  CheckCircle, AlertCircle, Package, FileText 
} from 'lucide-react'
import { Asset } from '../types'
import { mockAssets } from '../data/mockData'
import './AssetDetail.css'

export default function AssetDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [asset, setAsset] = useState<Asset | null>(null)
  const [isInstalling, setIsInstalling] = useState(false)

  useEffect(() => {
    // 実際の実装ではAPIから取得
    const found = mockAssets.find(a => a.id === id)
    setAsset(found || null)
  }, [id])

  const handleInstall = () => {
    if (!asset) return

    setIsInstalling(true)

    // postMessageでメインドメイン（appnavi.com）にインストール指示を送信
    const message = {
      type: 'INSTALL_ASSET',
      assetId: asset.id,
      assetType: asset.type,
      version: asset.version
    }

    // 親ウィンドウ（メインドメイン）にメッセージを送信
    if (window.parent && window.parent !== window) {
      window.parent.postMessage(message, '*') // 本番では特定のオリジンに制限
    }

    // ローカルストレージにも保存（フォールバック）
    const installedAssets = JSON.parse(
      localStorage.getItem('installedAssets') || '[]'
    )
    if (!installedAssets.find((a: any) => a.id === asset.id)) {
      installedAssets.push({
        id: asset.id,
        name: asset.name,
        type: asset.type,
        version: asset.version,
        installedAt: new Date().toISOString()
      })
      localStorage.setItem('installedAssets', JSON.stringify(installedAssets))
    }

    setTimeout(() => {
      setIsInstalling(false)
      alert('インストールが完了しました。AppNaviでプラグインを確認してください。')
    }, 1000)
  }

  if (!asset) {
    return (
      <div className="asset-detail-error">
        <AlertCircle size={48} />
        <p>アセットが見つかりませんでした</p>
        <button onClick={() => navigate('/')}>マーケットプレイスに戻る</button>
      </div>
    )
  }

  return (
    <div className="asset-detail">
      <button className="back-button" onClick={() => navigate('/')}>
        <ArrowLeft size={20} />
        戻る
      </button>

      <div className="asset-detail-header">
        <div className="asset-detail-title">
          <div className="asset-type-badge">
            {asset.type === 'plugin' ? <Package size={20} /> : <FileText size={20} />}
            <span>{asset.type === 'plugin' ? 'プラグイン' : 'テンプレート'}</span>
          </div>
          <h1>{asset.name}</h1>
          <p className="asset-detail-description">{asset.description}</p>
        </div>

        <div className="asset-detail-actions">
          <div className="asset-detail-price">
            {asset.priceType === 'free' ? (
              <span className="price-free-large">無料</span>
            ) : asset.priceType === 'one-time' ? (
              <span className="price-paid-large">¥{asset.price.toLocaleString()}</span>
            ) : (
              <span className="price-subscription-large">
                ¥{asset.price.toLocaleString()}/月
              </span>
            )}
          </div>
          <button 
            className="install-button"
            onClick={handleInstall}
            disabled={isInstalling}
          >
            {isInstalling ? 'インストール中...' : 'インストール'}
            <Download size={18} />
          </button>
        </div>
      </div>

      <div className="asset-detail-content">
        <div className="asset-detail-main">
          <div className="asset-screenshots">
            <h2>スクリーンショット</h2>
            <div className="screenshots-grid">
              {asset.screenshots.map((screenshot, index) => (
                <img 
                  key={index} 
                  src={screenshot} 
                  alt={`${asset.name} screenshot ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {asset.demoUrl && (
            <div className="asset-demo">
              <h2>デモ</h2>
              <iframe
                src={asset.demoUrl}
                title={`${asset.name} demo`}
                className="demo-iframe"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          )}

          <div className="asset-readme">
            <h2>説明</h2>
            <div 
              className="readme-content"
              dangerouslySetInnerHTML={{ __html: asset.readme }}
            />
          </div>

          <div className="asset-reviews">
            <h2>レビュー</h2>
            {asset.reviews.length > 0 ? (
              <div className="reviews-list">
                {asset.reviews.map(review => (
                  <div key={review.id} className="review-item">
                    <div className="review-header">
                      <div className="review-user">
                        <strong>{review.userName}</strong>
                        <div className="review-rating">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              fill={i < review.rating ? 'currentColor' : 'none'}
                              color={i < review.rating ? '#fbbf24' : '#e2e8f0'}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="review-date">
                        {new Date(review.createdAt).toLocaleDateString('ja-JP')}
                      </span>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-reviews">レビューはまだありません</p>
            )}
          </div>
        </div>

        <div className="asset-detail-sidebar">
          <div className="sidebar-section">
            <h3>ベンダー情報</h3>
            <div className="vendor-info">
              <div className="vendor-avatar">
                {asset.vendor.avatar ? (
                  <img src={asset.vendor.avatar} alt={asset.vendor.name} />
                ) : (
                  <div className="vendor-avatar-placeholder">
                    {asset.vendor.name.charAt(0)}
                  </div>
                )}
              </div>
              <p className="vendor-name">{asset.vendor.name}</p>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>統計情報</h3>
            <div className="stats-list">
              <div className="stat-item">
                <Star size={18} fill="currentColor" color="#fbbf24" />
                <span>評価: {asset.rating.toFixed(1)} / 5.0</span>
              </div>
              <div className="stat-item">
                <Download size={18} />
                <span>ダウンロード数: {asset.downloads.toLocaleString()}</span>
              </div>
              <div className="stat-item">
                <CheckCircle size={18} color="#48bb78" />
                <span>バージョン: {asset.version}</span>
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>タグ</h3>
            <div className="tags-list">
              {asset.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>

          {asset.dependencies && asset.dependencies.length > 0 && (
            <div className="sidebar-section">
              <h3>依存関係</h3>
              <ul className="dependencies-list">
                {asset.dependencies.map(dep => (
                  <li key={dep}>{dep}</li>
                ))}
              </ul>
            </div>
          )}

          {asset.githubUrl && (
            <div className="sidebar-section">
              <a 
                href={asset.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="github-link"
              >
                <Github size={18} />
                GitHubで見る
                <ExternalLink size={14} />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

