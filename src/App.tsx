import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import Footer from './components/Footer'
import SessionList from './components/SessionList'
import FilterSection from './components/FilterSection'
import HostPostingModal from './components/HostPostingModal'
import AuthModal from './components/AuthModal'
import HostDashboard from './components/HostDashboard'

function App() {
  const [isHostPostingModalOpen, setIsHostPostingModalOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [showHostDashboard, setShowHostDashboard] = useState(false)
  const [sessions, setSessions] = useState([])
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('WHOLE')
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
  const [searchQuery, setSearchQuery] = useState('')

  const handleHostClick = () => {
    if (isLoggedIn) {
      setIsHostPostingModalOpen(true)
    } else {
      setIsAuthModalOpen(true)
    }
  }

  const handleLogin = () => {
    setIsLoggedIn(true)
    setIsAuthModalOpen(false)
  }

  const handleAddSession = (newSession) => {
    setSessions([...sessions, newSession])
    setIsHostPostingModalOpen(false)
  }

  const handleTimePeriodChange = (period) => {
    setSelectedTimePeriod(period)
  }

  const handleMaintainClick = () => {
    setShowHostDashboard(true)
  }

  const handleSearch = () => {
    // Implement search functionality here
    console.log('Searching for:', searchQuery)
  }

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} flex flex-col transition-colors duration-300`}>
        <Header 
          onHostClick={handleHostClick} 
          isDarkMode={isDarkMode} 
          setIsDarkMode={setIsDarkMode}
          isLoggedIn={isLoggedIn}
          onBackToMain={() => setShowHostDashboard(false)}
          onMaintainClick={handleMaintainClick}
        />
        <main className="flex-grow container mx-auto px-4 py-8">
          {showHostDashboard ? (
            <HostDashboard 
              onClose={() => setShowHostDashboard(false)} 
              onNewSession={() => setIsHostPostingModalOpen(true)}
              sessions={sessions}
              setSessions={setSessions}
            />
          ) : (
            <>
              <div className="flex items-center mb-6">
                <input
                  type="text"
                  placeholder="Search sessions by ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`flex-grow p-3 rounded-l-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} border-r border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary`}
                />
                <button
                  onClick={handleSearch}
                  className="bg-primary text-gray-900 p-3 rounded-r-lg hover:bg-opacity-90 transition-colors"
                >
                  <Search size={24} />
                </button>
              </div>
              <FilterSection 
                isDarkMode={isDarkMode} 
                selectedTimePeriod={selectedTimePeriod}
                onTimePeriodChange={handleTimePeriodChange}
                dateRange={dateRange}
                setDateRange={setDateRange}
              />
              <SessionList 
                isDarkMode={isDarkMode} 
                sessions={sessions} 
                selectedTimePeriod={selectedTimePeriod}
              />
            </>
          )}
        </main>
        <Footer isDarkMode={isDarkMode} />
        <HostPostingModal 
          isOpen={isHostPostingModalOpen} 
          onClose={() => setIsHostPostingModalOpen(false)}
          onAddSession={handleAddSession}
          isDarkMode={isDarkMode}
        />
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onLogin={handleLogin}
          isDarkMode={isDarkMode}
        />
        <Toaster position="bottom-center" />
      </div>
    </GoogleOAuthProvider>
  )
}

export default App