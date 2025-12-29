import React, { useState, useEffect, useRef } from 'react'
import { Search, X, Clock, TrendingUp } from 'lucide-react'
import './SearchBarPlugin.css'

export interface SearchBarPluginProps {
  placeholder?: string
  showHistory?: boolean
  debounceMs?: number
  onSearch?: (query: string) => void
  data?: any[]
  searchFields?: string[]
}

export const SearchBarPlugin: React.FC<SearchBarPluginProps> = ({
  placeholder = '検索...',
  showHistory = true,
  debounceMs = 300,
  onSearch,
  data = [],
  searchFields = []
}) => {
  const [query, setQuery] = useState('')
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceTimer = useRef<NodeJS.Timeout | null>(null)

  // ローカルストレージから検索履歴を読み込み
  useEffect(() => {
    const saved = localStorage.getItem('searchHistory')
    if (saved) {
      setSearchHistory(JSON.parse(saved))
    }
  }, [])

  // 検索実行
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
    }

    if (query.trim() === '') {
      setFilteredData([])
      setShowSuggestions(false)
      return
    }

    setIsSearching(true)
    debounceTimer.current = setTimeout(() => {
      performSearch(query)
      setIsSearching(false)
    }, debounceMs)

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [query, data, searchFields, debounceMs])

  const performSearch = (searchQuery: string) => {
    if (!data || data.length === 0) {
      setFilteredData([])
      if (onSearch) {
        onSearch(searchQuery)
      }
      return
    }

    const filtered = data.filter(item => {
      if (searchFields.length > 0) {
        return searchFields.some(field => {
          const value = getNestedValue(item, field)
          return value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
        })
      }
      // 全フィールドを検索
      return JSON.stringify(item).toLowerCase().includes(searchQuery.toLowerCase())
    })

    setFilteredData(filtered)
    setShowSuggestions(true)

    if (onSearch) {
      onSearch(searchQuery)
    }
  }

  const getNestedValue = (obj: any, path: string): any => {
    return path.split('.').reduce((current, key) => current?.[key], obj)
  }

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    
    // 検索履歴に追加
    if (showHistory && searchQuery.trim()) {
      const updated = [searchQuery, ...searchHistory.filter(h => h !== searchQuery)].slice(0, 10)
      setSearchHistory(updated)
      localStorage.setItem('searchHistory', JSON.stringify(updated))
    }
  }

  const handleClear = () => {
    setQuery('')
    setFilteredData([])
    setShowSuggestions(false)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleHistoryClick = (historyItem: string) => {
    setQuery(historyItem)
    handleSearch(historyItem)
  }

  const handleClearHistory = () => {
    setSearchHistory([])
    localStorage.removeItem('searchHistory')
  }

  return (
    <div className="search-bar-plugin">
      <div className="search-bar-container">
        <div className="search-input-wrapper">
          <Search className="search-icon" size={20} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              if (query || searchHistory.length > 0) {
                setShowSuggestions(true)
              }
            }}
            onBlur={() => {
              // 少し遅延させてクリックイベントを処理
              setTimeout(() => setShowSuggestions(false), 200)
            }}
            placeholder={placeholder}
            className="search-input"
          />
          {query && (
            <button onClick={handleClear} className="clear-button">
              <X size={18} />
            </button>
          )}
          {isSearching && (
            <div className="searching-indicator">
              <div className="spinner"></div>
            </div>
          )}
        </div>

        {showSuggestions && (query || searchHistory.length > 0) && (
          <div className="suggestions-dropdown">
            {query && filteredData.length > 0 && (
              <div className="suggestions-section">
                <div className="suggestions-header">
                  <TrendingUp size={16} />
                  <span>検索結果 ({filteredData.length})</span>
                </div>
                <div className="suggestions-list">
                  {filteredData.slice(0, 5).map((item, index) => (
                    <div
                      key={index}
                      className="suggestion-item"
                      onClick={() => {
                        const displayText = searchFields.length > 0
                          ? getNestedValue(item, searchFields[0]) || JSON.stringify(item)
                          : JSON.stringify(item)
                        handleSearch(displayText)
                      }}
                    >
                      {searchFields.length > 0
                        ? getNestedValue(item, searchFields[0]) || JSON.stringify(item)
                        : JSON.stringify(item)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {showHistory && searchHistory.length > 0 && (
              <div className="suggestions-section">
                <div className="suggestions-header">
                  <Clock size={16} />
                  <span>検索履歴</span>
                  <button onClick={handleClearHistory} className="clear-history-button">
                    クリア
                  </button>
                </div>
                <div className="suggestions-list">
                  {searchHistory.map((historyItem, index) => (
                    <div
                      key={index}
                      className="suggestion-item history-item"
                      onClick={() => handleHistoryClick(historyItem)}
                    >
                      <Clock size={14} />
                      {historyItem}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {query && filteredData.length === 0 && (
              <div className="no-results">
                検索結果が見つかりませんでした
              </div>
            )}
          </div>
        )}
      </div>

      {query && filteredData.length > 0 && (
        <div className="search-results">
          <div className="results-header">
            <span>検索結果: {filteredData.length}件</span>
          </div>
          <div className="results-list">
            {filteredData.map((item, index) => (
              <div key={index} className="result-item">
                <pre>{JSON.stringify(item, null, 2)}</pre>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBarPlugin

