import React from 'react'
import { Calendar } from 'lucide-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface FilterSectionProps {
  isDarkMode: boolean
  selectedTimePeriod: string
  onTimePeriodChange: (period: string) => void
  dateRange: [Date | null, Date | null]
  setDateRange: React.Dispatch<React.SetStateAction<[Date | null, Date | null]>>
}

const FilterSection: React.FC<FilterSectionProps> = ({ 
  isDarkMode, 
  selectedTimePeriod, 
  onTimePeriodChange,
  dateRange,
  setDateRange
}) => {
  return (
    <div className="mb-6">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="playerLevel" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
            Player Level
          </label>
          <select
            id="playerLevel"
            className={`w-full p-3 rounded-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-300`}
          >
            <option value="">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div>
          <label htmlFor="location" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
            Location
          </label>
          <select
            id="location"
            className={`w-full p-3 rounded-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-300`}
          >
            <option value="">All Locations</option>
            <option value="hongKong">Hong Kong Sports Centre</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="priceRange" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
            Price Range
          </label>
          <select
            id="priceRange"
            className={`w-full p-3 rounded-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-300`}
          >
            <option value="">All Prices</option>
            <option value="0-50">$0 - $50</option>
            <option value="51-100">$51 - $100</option>
            <option value="101+">$101+</option>
          </select>
        </div>
        <div>
          <label htmlFor="dateRange" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
            Date Range
          </label>
          <div className="relative">
            <DatePicker
              selectsRange={true}
              startDate={dateRange[0]}
              endDate={dateRange[1]}
              onChange={(update: [Date | null, Date | null]) => {
                setDateRange(update);
              }}
              className={`w-full p-3 rounded-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-300`}
              placeholderText="Select date range"
            />
            <Calendar className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} size={20} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {['WHOLE', 'MORNING', 'AFTERNOON', 'NIGHT'].map((time) => (
          <button
            key={time}
            onClick={() => onTimePeriodChange(time)}
            className={`${
              selectedTimePeriod === time
                ? 'bg-primary text-gray-900'
                : isDarkMode
                ? 'bg-gray-700 text-white hover:bg-gray-600'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
            } py-2 rounded-lg transition-colors duration-300`}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  )
}

export default FilterSection