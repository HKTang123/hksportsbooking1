import React from 'react'
import { X } from 'lucide-react'

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
}

const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-primary">Filter Sessions</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <form>
          <div className="mb-4">
            <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-300">
              Location
            </label>
            <input
              type="text"
              id="location"
              className="w-full p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter location"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="level" className="block mb-2 text-sm font-medium text-gray-300">
              Player Level
            </label>
            <select
              id="level"
              className="w-full p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-300">
              Date
            </label>
            <input
              type="date"
              id="date"
              className="w-full p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-300">
              Max Price
            </label>
            <input
              type="number"
              id="price"
              className="w-full p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter max price"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-dark py-2 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Apply Filters
          </button>
        </form>
      </div>
    </div>
  )
}

export default FilterModal