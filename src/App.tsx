import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Marketplace from './pages/Marketplace'
import AssetDetail from './pages/AssetDetail'
import VendorDashboard from './pages/VendorDashboard'
import './App.css'

function App() {
  return (
    <Router>
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

