import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Package, Store, User } from 'lucide-react'
import './Layout.css'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">
            <Package size={24} />
            <span>AppNavi Asset Marketplace</span>
          </Link>
          <nav className="nav">
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
            >
              <Store size={18} />
              マーケットプレイス
            </Link>
            <Link 
              to="/vendor" 
              className={location.pathname === '/vendor' ? 'active' : ''}
            >
              <User size={18} />
              ベンダーダッシュボード
            </Link>
          </nav>
        </div>
      </header>
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <p>&copy; 2024 AppNavi Asset Marketplace. All rights reserved.</p>
      </footer>
    </div>
  )
}



