import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import './TemplateDetail.css'

export default function TemplateDetail() {
  const { templateId } = useParams<{ templateId: string }>()

  // テンプレートデータ（実際にはAPIから取得）
  const templateData: Record<string, any> = {
    crm: {
      name: '顧客管理（CRM）',
      description: '顧客情報、商談管理、活動履歴を一元管理',
      category: '営業・マーケティング',
      color: '#8b5cf6',
      icon: '👥'
    },
    'google-calendar-group': {
      name: 'Googleカレンダー管理',
      description: '複数のGoogleカレンダーを一元管理し、グループ単位でスケジュールを確認',
      category: 'スケジュール管理',
      color: '#f97316',
      icon: '📅'
    },
    'daily-report': {
      name: '日報チェック',
      description: '日次レポートの提出状況を確認し、未提出者にリマインダーを送信',
      category: '業務管理',
      color: '#10b981',
      icon: '📝'
    },
    'auto-integration': {
      name: '自動連携',
      description: '外部システムと自動でデータを同期し、手作業を削減',
      category: '統合・連携',
      color: '#3b82f6',
      icon: '🔗'
    }
  }

  const template = templateData[templateId || '']

  if (!template) {
    return (
      <div className="template-detail-page">
        <div className="template-not-found">
          <h2>テンプレートが見つかりません</h2>
          <Link to="/templates" className="back-button">
            <ArrowLeft size={20} />
            テンプレート一覧に戻る
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="template-detail-page">
      <div className="template-detail-header" style={{ background: `linear-gradient(135deg, ${template.color} 0%, ${template.color}dd 100%)` }}>
        <h1>{template.icon} {template.name}</h1>
        <p>{template.description}</p>
      </div>

      <div className="template-detail-container">
        <Link to="/templates" className="back-link">
          <ArrowLeft size={20} />
          テンプレート一覧に戻る
        </Link>

        <div className="template-detail-content">
          <div className="detail-section">
            <h2>概要</h2>
            <p>{template.description}</p>
          </div>

          <div className="detail-section">
            <h2>カテゴリ</h2>
            <p>{template.category}</p>
          </div>

          <div className="detail-section">
            <h2>このテンプレートを使用する</h2>
            <p>AppNaviでこのテンプレートを選択して、すぐにアプリを作成できます。</p>
            <a 
              href={`https://tsubasagit.github.io/AppNavi-asset/templates/${templateId}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button"
            >
              AppNaviで開く
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

