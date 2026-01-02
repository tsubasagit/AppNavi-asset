import React, { useState, useEffect } from 'react'
import { Search, TrendingUp, Users, DollarSign, Package, BarChart3 } from 'lucide-react'
import './DashboardTemplate.css'

export interface DashboardTemplateProps {
  title?: string
  showSearch?: boolean
  stats?: Array<{
    label: string
    value: string | number
    icon: React.ReactNode
    change?: string
  }>
  data?: any[]
}

export const DashboardTemplate: React.FC<DashboardTemplateProps> = ({
  title = 'ダッシュボード',
  showSearch = true,
  stats = [],
  data = []
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredData, setFilteredData] = useState(data)

  // デフォルトの統計データ
  const defaultStats = stats.length > 0 ? stats : [
    {
      label: '総ユーザー数',
      value: '1,234',
      icon: <Users size={24} />,
      change: '+12.5%'
    },
    {
      label: '総売上',
      value: '¥12,345,678',
      icon: <DollarSign size={24} />,
      change: '+8.2%'
    },
    {
      label: '商品数',
      value: '456',
      icon: <Package size={24} />,
      change: '+5.1%'
    },
    {
      label: '成長率',
      value: '23.4%',
      icon: <TrendingUp size={24} />,
      change: '+2.3%'
    }
  ]

  // デフォルトのテーブルデータ
  const defaultData = data.length > 0 ? data : [
    { id: 1, name: '商品A', category: 'カテゴリ1', price: 1000, sales: 150 },
    { id: 2, name: '商品B', category: 'カテゴリ2', price: 2000, sales: 230 },
    { id: 3, name: '商品C', category: 'カテゴリ1', price: 1500, sales: 180 },
    { id: 4, name: '商品D', category: 'カテゴリ3', price: 3000, sales: 95 },
    { id: 5, name: '商品E', category: 'カテゴリ2', price: 2500, sales: 210 }
  ]

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredData(defaultData)
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = defaultData.filter(item =>
      Object.values(item).some(value =>
        value?.toString().toLowerCase().includes(query)
      )
    )
    setFilteredData(filtered)
  }, [searchQuery])

  return (
    <div className="dashboard-template">
      <header className="dashboard-header">
        <h1>{title}</h1>
        {showSearch && (
          <div className="dashboard-search">
            <Search size={20} />
            <input
              type="text"
              placeholder="ダッシュボードを検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        )}
      </header>

      <div className="dashboard-content">
        <section className="stats-section">
          <h2>統計情報</h2>
          <div className="stats-grid">
            {defaultStats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-content">
                  <p className="stat-label">{stat.label}</p>
                  <p className="stat-value">{stat.value}</p>
                  {stat.change && (
                    <p className="stat-change positive">{stat.change}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="chart-section">
          <h2>グラフ</h2>
          <div className="chart-placeholder">
            <BarChart3 size={48} />
            <p>グラフコンポーネントをここに配置</p>
            <p className="chart-hint">
              検索バーでデータをフィルタリングできます
            </p>
          </div>
        </section>

        <section className="table-section">
          <h2>データテーブル</h2>
          {searchQuery && (
            <div className="search-results-info">
              検索結果: {filteredData.length}件
            </div>
          )}
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>名前</th>
                  <th>カテゴリ</th>
                  <th>価格</th>
                  <th>売上</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>¥{item.price.toLocaleString()}</td>
                      <td>{item.sales}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="no-results">
                      検索結果が見つかりませんでした
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}

export default DashboardTemplate



