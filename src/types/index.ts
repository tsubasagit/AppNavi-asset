export interface Asset {
  id: string
  name: string
  description: string
  type: 'plugin' | 'template'
  category: string
  vendor: {
    id: string
    name: string
    avatar?: string
  }
  version: string
  price: number
  priceType: 'free' | 'one-time' | 'subscription'
  screenshots: string[]
  demoUrl?: string
  readme: string
  tags: string[]
  downloads: number
  rating: number
  reviews: Review[]
  createdAt: string
  updatedAt: string
  githubUrl?: string
  dependencies?: string[]
}

export interface Review {
  id: string
  userId: string
  userName: string
  rating: number
  comment: string
  createdAt: string
}

export interface Vendor {
  id: string
  name: string
  email: string
  avatar?: string
  assets: Asset[]
  totalSales: number
  totalDownloads: number
}



