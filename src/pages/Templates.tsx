import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Eye } from 'lucide-react'
import './Templates.css'

interface Template {
  templateId: string
  name: string
  description: string
  category: string
  color: string
  icon: string
  demoUrl: string
  tags: string[]
}

export default function Templates() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // テンプレートデータを取得
    const loadTemplates = async () => {
      try {
        // まずローカルのフォールバックデータを使用
        const fallbackTemplates: Template[] = [
          {
            templateId: 'crm',
            name: '顧客管理（CRM）',
            description: '顧客情報、商談管理、活動履歴を一元管理',
            category: '営業・マーケティング',
            color: '#8b5cf6',
            icon: '👥',
            demoUrl: '/templates/crm/',
            tags: ['営業', '顧客管理', '商談', 'CRM']
          },
          {
            templateId: 'google-calendar-group',
            name: 'Googleカレンダー管理',
            description: '複数のGoogleカレンダーを一元管理し、グループ単位でスケジュールを確認',
            category: 'スケジュール管理',
            color: '#f97316',
            icon: '📅',
            demoUrl: '/templates/google-calendar-group/',
            tags: ['カレンダー', 'スケジュール', 'Google', 'グループ管理']
          },
          {
            templateId: 'daily-report',
            name: '日報チェック',
            description: '日次レポートの提出状況を確認し、未提出者にリマインダーを送信',
            category: '業務管理',
            color: '#10b981',
            icon: '📝',
            demoUrl: '/templates/daily-report/',
            tags: ['日報', 'レポート', 'チェック', 'リマインダー']
          },
          {
            templateId: 'auto-integration',
            name: '自動連携',
            description: '外部システムと自動でデータを同期し、手作業を削減',
            category: '統合・連携',
            color: '#3b82f6',
            icon: '🔗',
            demoUrl: '/templates/auto-integration/',
            tags: ['連携', '統合', '自動化', 'データ同期']
          }
        ]

        // APIから取得を試みる
        const baseUrl = import.meta.env.BASE_URL || '/AppNavi-asset/'
        const apiUrl = `${baseUrl}templates/api/templates.json`
        
        try {
          const response = await fetch(apiUrl)
          if (response.ok) {
            const data = await response.json()
            if (data.templates && data.templates.length > 0) {
              setTemplates(data.templates)
              setLoading(false)
              return
            }
          }
        } catch (error) {
          console.warn('APIからの取得に失敗、フォールバックデータを使用:', error)
        }

        // フォールバックデータを使用
        setTemplates(fallbackTemplates)
        setLoading(false)
      } catch (error) {
        console.error('テンプレートの読み込みに失敗:', error)
        setLoading(false)
      }
    }

    loadTemplates()
  }, [])

  if (loading) {
    return (
      <div className="templates-page">
        <div className="templates-loading">
          <h2>AppNavi プラグインマーケットプレイス</h2>
          <p>テンプレートを読み込み中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="templates-page">
      <div className="templates-header">
        <Link to="/" className="back-link">
          <ArrowLeft size={20} />
          マーケットプレイスに戻る
        </Link>
        <h1>AppNavi プラグインマーケットプレイス</h1>
        <p>目的特化型テンプレートを選択して、すぐにアプリを作成</p>
      </div>

      <div className="templates-grid">
        {templates.map((template) => (
          <Link
            key={template.templateId}
            to={`/templates/${template.templateId}`}
            className="template-card"
          >
            <div className="template-icon" style={{ background: template.color, color: '#fff' }}>
              {template.icon}
            </div>
            <h3>{template.name}</h3>
            <div className="category">{template.category}</div>
            <div className="description">{template.description}</div>
            <div className="tags">
              {template.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

