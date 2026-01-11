import React from 'react'
import { X, Eye } from 'lucide-react'
import { Asset } from '../types'
import './PreviewModal.css'

interface PreviewModalProps {
  asset: Asset
  isOpen: boolean
  onClose: () => void
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  asset,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null

  // サンプルプレビューのパスを構築
  const getPreviewPath = () => {
    if (asset.demoUrl) {
      return asset.demoUrl
    }
    
    // サンプルディレクトリからプレビューを探す
    if (asset.type === 'plugin') {
      return `/samples/plugins/${asset.id}/preview.html`
    } else if (asset.type === 'template') {
      return `/samples/templates/${asset.id}/preview.html`
    }
    
    return null
  }

  const previewPath = getPreviewPath()

  return (
    <div className="preview-modal-overlay" onClick={onClose}>
      <div className="preview-modal" onClick={(e) => e.stopPropagation()}>
        <div className="preview-modal-header">
          <div className="preview-header-content">
            <Eye size={20} />
            <h2>{asset.name} - プレビュー</h2>
          </div>
          <button 
            className="close-preview-button"
            onClick={onClose}
            aria-label="プレビューを閉じる"
          >
            <X size={24} />
          </button>
        </div>
        <div className="preview-modal-content">
          {previewPath ? (
            <iframe
              src={previewPath}
              title={`${asset.name} preview`}
              className="preview-iframe"
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
          ) : (
            <div className="preview-placeholder">
              <div className="preview-icon">
                <Eye size={64} />
              </div>
              <h3>プレビューを準備中...</h3>
              <p className="preview-hint">
                このアセットにはプレビューが設定されていません。
                実際のプレビューを表示するには、アセットにpreview.htmlまたはdemoUrlを設定してください。
              </p>
              {asset.type === 'plugin' && (
                <div className="preview-sample-info">
                  <h4>サンプルコード</h4>
                  <pre className="preview-code">
{`import { ${asset.name.replace(/\s+/g, '')} } from '@appnavi/${asset.id}'

function App() {
  return (
    <${asset.name.replace(/\s+/g, '')}
      // プロパティを設定
    />
  )
}`}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PreviewModal





