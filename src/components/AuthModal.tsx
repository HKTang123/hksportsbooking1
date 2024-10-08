import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { GoogleLogin } from '@react-oauth/google'
import toast from 'react-hot-toast'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: () => void
  isDarkMode: boolean
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin, isDarkMode }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the authentication logic
    console.log('Authenticating with:', { email, password })
    onLogin()
    toast.success('Logged in successfully!')
  }

  const handleGoogleLogin = (credentialResponse: any) => {
    console.log('Google login successful:', credentialResponse)
    onLogin()
    toast.success('Logged in with Google successfully!')
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 w-full max-w-md transition-colors duration-300`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-primary' : 'text-gray-900'}`}>
            {isLogin ? 'Login' : 'Register'}
          </h2>
          <button onClick={onClose} className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-300`}>
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'} border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-300`}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'} border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-300`}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-gray-900 py-3 rounded-lg hover:bg-opacity-90 transition-colors duration-300 font-semibold"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <div className="mt-4 flex items-center justify-center">
          <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} px-2`}>or</span>
        </div>
        <div className="mt-4">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => {
              console.log('Login Failed')
              toast.error('Google login failed. Please try again.')
            }}
          />
        </div>
        <p className={`mt-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary hover:underline transition-colors duration-300"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  )
}

export default AuthModal