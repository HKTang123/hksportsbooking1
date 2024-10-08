import React from 'react'
import { Sun, Moon, ArrowLeft } from 'lucide-react'

interface HeaderProps {
  onHostClick: () => void
  isDarkMode: boolean
  setIsDarkMode: (isDark: boolean) => void
  isLoggedIn: boolean
  onBackToMain: () => void
  onMaintainClick: () => void
}

const Header: React.FC<HeaderProps> = ({ onHostClick, isDarkMode, setIsDarkMode, isLoggedIn, onBackToMain, onMaintainClick }) => {
  return (
    <header className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {isLoggedIn && (
            <button onClick={onBackToMain} className={`${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              <ArrowLeft size={24} />
            </button>
          )}
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-primary' : 'text-gray-900'}`}>BadmintonBook</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'} transition-colors duration-300`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          {isLoggedIn && (
            <button
              onClick={onMaintainClick}
              className={`${isDarkMode ? 'bg-blue-500 text-white' : 'bg-blue-600 text-white'} px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors duration-300`}
            >
              Maintain
            </button>
          )}
          <button
            onClick={onHostClick}
            className={`${isDarkMode ? 'bg-primary text-gray-900' : 'bg-gray-900 text-white'} px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors duration-300`}
          >
            {isLoggedIn ? 'Post Session' : 'I\'m Host'}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header