import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Filter, Star, Download, Package, FileText, Eye } from 'lucide-react'
import { Asset } from '../types'
import { mockAssets } from '../data/mockData'
import PreviewModal from '../components/PreviewModal'
import './Marketplace.css'

export default function Marketplace() {
  const navigate = useNavigate()
  const [assets, setAssets] = useState<Asset[]>([])
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<'all' | 'plugin' | 'template'>('all')
  const [previewAsset, setPreviewAsset] = useState<Asset | null>(null)
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    // 実際の実装ではAPIから取得
    setAssets(mockAssets)
    setFilteredAssets(mockAssets)
  }, [])

  useEffect(() => {
    let filtered = assets

    // 検索フィルター
    if (searchQuery) {
      filtered = filtered.filter(asset =>
        asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // カテゴリフィルター
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(asset => asset.category === selectedCategory)
    }

    // タイプフィルター
    if (selectedType !== 'all') {
      filtered = filtered.filter(asset => asset.type === selectedType)
    }

    setFilteredAssets(filtered)
  }, [searchQuery, selectedCategory, selectedType, assets])

  const categories = Array.from(new Set(assets.map(a => a.category)))

  return (
    <div className="marketplace">
      <div className="marketplace-header">
        <h1>AppNavi Asset Marketplace</h1>
        <p>プラグインとテンプレートを探して、アプリを拡張しましょう</p>
      </div>

      <div className="marketplace-controls">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="プラグインやテンプレートを検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filters">
          <div className="filter-group">
            <Filter size={18} />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as 'all' | 'plugin' | 'template')}
            >
              <option value="all">すべて</option>
              <option value="plugin">プラグイン</option>
              <option value="template">テンプレート</option>
            </select>
          </div>

          <div className="filter-group">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">すべてのカテゴリ</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="assets-grid">
        {filteredAssets.map(asset => (
          <Link key={asset.id} to={`/asset/${asset.id}`} className="asset-card">
            <div className="asset-card-image">
              {asset.screenshots[0] ? (
                <img src={asset.screenshots[0]} alt={asset.name} />
              ) : (
                <div className="asset-card-placeholder">
                  {asset.type === 'plugin' ? <Package size={48} /> : <FileText size={48} />}
                </div>
              )}
              <div className="asset-card-badge">
                {asset.type === 'plugin' ? 'プラグイン' : 'テンプレート'}
              </div>
            </div>
            <div className="asset-card-content">
              <h3>{asset.name}</h3>
              <p className="asset-card-description">{asset.description}</p>
              <div className="asset-card-meta">
                <div className="asset-card-vendor">
                  <span>by {asset.vendor.name}</span>
                </div>
                <div className="asset-card-stats">
                  <div className="stat">
                    <Star size={14} fill="currentColor" />
                    <span>{asset.rating.toFixed(1)}</span>
                  </div>
                  <div className="stat">
                    <Download size={14} />
                    <span>{asset.downloads}</span>
                  </div>
                </div>
              </div>
              <div className="asset-card-footer">
                <div className="asset-card-price">
                  {asset.priceType === 'free' ? (
                    <span className="price-free">無料</span>
                  ) : asset.priceType === 'one-time' ? (
                    <span className="price-paid">¥{asset.price.toLocaleString()}</span>
                  ) : (
                    <span className="price-subscription">¥{asset.price.toLocaleString()}/月</span>
                  )}
                </div>
                <div className="asset-card-actions">
                  <button
                    className="preview-card-button"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setPreviewAsset(asset)
                      setShowPreview(true)
                    }}
                    title="プレビュー"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    className="view-details-button"
                    onClick={(e) => {
                      e.preventDefault()
                      navigate(`/asset/${asset.id}`)
                    }}
                    title="詳細を見る"
                  >
                    詳細
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredAssets.length === 0 && (
        <div className="no-results">
          <p>検索結果が見つかりませんでした</p>
        </div>
      )}

      {previewAsset && (
        <PreviewModal
          asset={previewAsset}
          isOpen={showPreview}
          onClose={() => {
            setShowPreview(false)
            setPreviewAsset(null)
          }}
        />
      )}
    </div>
  )
}

