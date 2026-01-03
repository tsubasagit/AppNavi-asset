import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Marketplace from './pages/Marketplace'
import AssetDetail from './pages/AssetDetail'
import VendorDashboard from './pages/VendorDashboard'
import './App.css'

// GitHub Pages用のベースパス
// Viteのbase設定から自動的に取得
const basename = import.meta.env?.BASE_URL || '/AppNavi-asset/'

function App() {
  return (
    <Router basename={basename}>
      <Layout>
        <Routes>
          <Route path="/" element={<Marketplace />} />
          <Route path="/asset/:id" element={<AssetDetail />} />
          <Route path="/vendor" element={<VendorDashboard />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App



