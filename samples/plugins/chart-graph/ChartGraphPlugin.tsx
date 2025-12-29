import React, { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale
} from 'chart.js'
import { Line, Bar, Pie, Doughnut, Radar } from 'react-chartjs-2'
import { Search, BarChart3, TrendingUp, PieChart } from 'lucide-react'
import './ChartGraphPlugin.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale
)

export type ChartType = 'line' | 'bar' | 'pie' | 'doughnut' | 'radar'

export interface ChartGraphPluginProps {
  type?: ChartType
  data: {
    labels: string[]
    datasets: Array<{
      label: string
      data: number[]
      backgroundColor?: string | string[]
      borderColor?: string
      borderWidth?: number
    }>
  }
  options?: any
  height?: number
  showSearch?: boolean
  onDataFilter?: (filteredData: any) => void
}

export const ChartGraphPlugin: React.FC<ChartGraphPluginProps> = ({
  type = 'line',
  data,
  options = {},
  height = 400,
  showSearch = true,
  onDataFilter
}) => {
  const [chartType, setChartType] = useState<ChartType>(type)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredData, setFilteredData] = useState(data)

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredData(data)
      if (onDataFilter) {
        onDataFilter(data)
      }
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = {
      ...data,
      labels: data.labels.filter(label => 
        label.toLowerCase().includes(query)
      ),
      datasets: data.datasets.map(dataset => ({
        ...dataset,
        data: data.labels
          .map((label, index) => ({
            label,
            value: dataset.data[index]
          }))
          .filter(item => item.label.toLowerCase().includes(query))
          .map(item => item.value)
      }))
    }

    setFilteredData(filtered)
    if (onDataFilter) {
      onDataFilter(filtered)
    }
  }, [searchQuery, data, onDataFilter])

  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'グラフデータ'
      }
    },
    ...options
  }

  const renderChart = () => {
    const chartData = filteredData

    switch (chartType) {
      case 'line':
        return <Line data={chartData} options={defaultOptions} />
      case 'bar':
        return <Bar data={chartData} options={defaultOptions} />
      case 'pie':
        return <Pie data={chartData} options={defaultOptions} />
      case 'doughnut':
        return <Doughnut data={chartData} options={defaultOptions} />
      case 'radar':
        return <Radar data={chartData} options={defaultOptions} />
      default:
        return <Line data={chartData} options={defaultOptions} />
    }
  }

  const chartTypes: { value: ChartType; label: string; icon: React.ReactNode }[] = [
    { value: 'line', label: '線グラフ', icon: <TrendingUp size={18} /> },
    { value: 'bar', label: '棒グラフ', icon: <BarChart3 size={18} /> },
    { value: 'pie', label: '円グラフ', icon: <PieChart size={18} /> },
    { value: 'doughnut', label: 'ドーナツグラフ', icon: <PieChart size={18} /> },
    { value: 'radar', label: 'レーダーチャート', icon: <BarChart3 size={18} /> }
  ]

  return (
    <div className="chart-graph-plugin">
      <div className="chart-controls">
        {showSearch && (
          <div className="chart-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="データを検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="chart-search-input"
            />
          </div>
        )}
        
        <div className="chart-type-selector">
          {chartTypes.map(({ value, label, icon }) => (
            <button
              key={value}
              className={`chart-type-button ${chartType === value ? 'active' : ''}`}
              onClick={() => setChartType(value)}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="chart-container" style={{ height: `${height}px` }}>
        {renderChart()}
      </div>

      {searchQuery && (
        <div className="chart-search-info">
          検索結果: {filteredData.labels.length}件のデータを表示中
        </div>
      )}
    </div>
  )
}

export default ChartGraphPlugin

