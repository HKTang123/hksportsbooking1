import React from 'react'
import { MapPin, Calendar, Users, Clock } from 'lucide-react'

interface Session {
  id: string
  title: string
  host?: string
  playerLevel: string
  price: number
  location: string
  date: string
  timeStart: string
  timeEnd: string
  vacancies: string
}

interface SessionListProps {
  isDarkMode: boolean
  sessions: Session[]
  selectedTimePeriod: string
}

const SessionList: React.FC<SessionListProps> = ({ isDarkMode, sessions, selectedTimePeriod }) => {
  const filterSessionsByTimePeriod = (session: Session) => {
    const startHour = parseInt(session.timeStart.split(':')[0])
    const endHour = parseInt(session.timeEnd.split(':')[0])
    switch (selectedTimePeriod) {
      case 'MORNING':
        return startHour >= 6 && startHour < 12
      case 'AFTERNOON':
        return startHour >= 12 && startHour < 18
      case 'NIGHT':
        return startHour >= 18 || startHour < 6
      default:
        return true
    }
  }

  const filteredSessions = sessions.filter(filterSessionsByTimePeriod)

  return (
    <div className="space-y-4">
      {filteredSessions.map((session) => (
        <div key={session.id} className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-4 shadow-md transition-colors duration-300`}>
          <div className="flex justify-between items-start mb-2">
            <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-primary' : 'text-gray-900'}`}>{session.title}</h3>
            <span className={`text-sm font-semibold px-2 py-1 rounded ${session.vacancies === 'FULL' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
              {session.vacancies}
            </span>
          </div>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>ID: {session.id}</p>
          {session.host && <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Hosted by {session.host}</p>}
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center">
              <Users size={16} className={`mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              <span>{session.playerLevel}</span>
            </div>
            <div className="flex items-center">
              <MapPin size={16} className={`mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              <span>{session.location}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold">${session.price}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={16} className={`mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              <span>{session.date}</span>
            </div>
            <div className="flex items-center col-span-2">
              <Clock size={16} className={`mr-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
              <span>{session.timeStart} - {session.timeEnd}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SessionList