import React, { useState } from 'react'
import { X } from 'lucide-react'
import toast from 'react-hot-toast'

interface HostPostingModalProps {
  isOpen: boolean
  onClose: () => void
  onAddSession: (session: any) => void
  isDarkMode: boolean
}

const HostPostingModal: React.FC<HostPostingModalProps> = ({ isOpen, onClose, onAddSession, isDarkMode }) => {
  const [title, setTitle] = useState('')
  const [playerLevel, setPlayerLevel] = useState('')
  const [location, setLocation] = useState('')
  const [price, setPrice] = useState('')
  const [date, setDate] = useState('')
  const [timeStart, setTimeStart] = useState('')
  const [timeEnd, setTimeEnd] = useState('')
  const [remarks, setRemarks] = useState('')

  if (!isOpen) return null

  const generateUniqueId = (level: string) => {
    const prefix = level.toUpperCase().substring(0, 3)
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `${prefix}_${randomNum}`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newSession = {
      id: generateUniqueId(playerLevel),
      title,
      playerLevel,
      location,
      price: Number(price),
      date,
      timeStart,
      timeEnd,
      remarks,
      vacancies: 'Available'
    }
    onAddSession(newSession)
    toast.success('Session posted successfully!')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 w-full max-w-md`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-primary' : 'text-gray-900'}`}>Post a Session</h2>
          <button onClick={onClose} className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'} border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary`}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="playerLevel" className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Player Level
              </label>
              <select
                id="playerLevel"
                value={playerLevel}
                onChange={(e) => setPlayerLevel(e.target.value)}
                className={`w-full p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'} border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary`}
                required
              >
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label htmlFor="location" className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Location
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={`w-full p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'} border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary`}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="price" className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Price
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={`w-full p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'} border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary`}
                required
              />
            </div>
            <div>
              <label htmlFor="date" className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`w-full p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'} border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary`}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="timeStart" className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Time Start
              </label>
              <input
                type="time"
                id="timeStart"
                value={timeStart}
                onChange={(e) => setTimeStart(e.target.value)}
                className={`w-full p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'} border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary`}
                required
              />
            </div>
            <div>
              <label htmlFor="timeEnd" className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Time End
              </label>
              <input
                type="time"
                id="timeEnd"
                value={timeEnd}
                onChange={(e) => setTimeEnd(e.target.value)}
                className={`w-full p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'} border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary`}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="remarks" className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Remarks
            </label>
            <textarea
              id="remarks"
              rows={3}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className={`w-full p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'} border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary`}
            ></textarea>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 ${isDarkMode ? 'bg-gray-600 text-white' : 'bg-gray-300 text-gray-800'} rounded-lg hover:bg-opacity-90 transition-colors`}
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-gray-900 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              POST!
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default HostPostingModal