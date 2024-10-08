import React, { useState } from 'react'
import { X, Edit, ToggleLeft, ToggleRight, Plus } from 'lucide-react'
import toast from 'react-hot-toast'

interface Session {
  id: number
  title: string
  playerLevel: string
  location: string
  price: number
  date: string
  time: string
  vacancies: 'Available' | 'FULL'
  remarks?: string
}

interface HostDashboardProps {
  onClose: () => void
  onNewSession: () => void
  sessions: Session[]
  setSessions: React.Dispatch<React.SetStateAction<Session[]>>
}

const HostDashboard: React.FC<HostDashboardProps> = ({ onClose, onNewSession, sessions, setSessions }) => {
  const [editingSession, setEditingSession] = useState<Session | null>(null)

  const toggleVacancies = (id: number) => {
    setSessions(sessions.map(session => 
      session.id === id 
        ? { ...session, vacancies: session.vacancies === 'Available' ? 'FULL' : 'Available' }
        : session
    ))
    const updatedSession = sessions.find(s => s.id === id)
    if (updatedSession) {
      toast.success(`Session "${updatedSession.title}" vacancies updated to ${updatedSession.vacancies === 'Available' ? 'FULL' : 'Available'}`)
    }
  }

  const handleEdit = (session: Session) => {
    setEditingSession(session)
  }

  const handleSave = (updatedSession: Session) => {
    setSessions(sessions.map(session => 
      session.id === updatedSession.id ? updatedSession : session
    ))
    setEditingSession(null)
    toast.success(`Session "${updatedSession.title}" updated successfully`)
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary">Host Dashboard</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors duration-300">
          <X size={24} />
        </button>
      </div>
      <button
        onClick={onNewSession}
        className="mb-4 w-full bg-primary text-gray-900 py-2 rounded-lg hover:bg-opacity-90 transition-colors duration-300 flex items-center justify-center"
      >
        <Plus size={20} className="mr-2" />
        Post New Session
      </button>
      <div className="space-y-4">
        {sessions.map(session => (
          <div key={session.id} className="bg-gray-700 rounded-lg p-4 flex justify-between items-center">
            {editingSession?.id === session.id ? (
              <EditSessionForm session={editingSession} onSave={handleSave} onCancel={() => setEditingSession(null)} />
            ) : (
              <>
                <div>
                  <h3 className="text-lg font-semibold text-white">{session.title}</h3>
                  <p className="text-sm text-gray-400">{session.date} - {session.time}</p>
                  <p className="text-sm text-gray-400">{session.location}</p>
                  <p className="text-sm text-gray-400">${session.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => handleEdit(session)} className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                    <Edit size={20} />
                  </button>
                  <button 
                    onClick={() => toggleVacancies(session.id)}
                    className={`flex items-center ${session.vacancies === 'Available' ? 'text-green-400' : 'text-red-400'} transition-colors duration-300`}
                    title={`Toggle vacancies (currently ${session.vacancies})`}
                  >
                    {session.vacancies === 'Available' ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                    <span className="ml-1 text-xs">{session.vacancies}</span>
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

interface EditSessionFormProps {
  session: Session
  onSave: (updatedSession: Session) => void
  onCancel: () => void
}

const EditSessionForm: React.FC<EditSessionFormProps> = ({ session, onSave, onCancel }) => {
  const [editedSession, setEditedSession] = useState(session)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedSession(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(editedSession)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="title"
          value={editedSession.title}
          onChange={handleChange}
          className="bg-gray-600 text-white p-2 rounded"
          placeholder="Title"
        />
        <input
          type="text"
          name="playerLevel"
          value={editedSession.playerLevel}
          onChange={handleChange}
          className="bg-gray-600 text-white p-2 rounded"
          placeholder="Player Level"
        />
        <input
          type="text"
          name="location"
          value={editedSession.location}
          onChange={handleChange}
          className="bg-gray-600 text-white p-2 rounded"
          placeholder="Location"
        />
        <input
          type="number"
          name="price"
          value={editedSession.price}
          onChange={handleChange}
          className="bg-gray-600 text-white p-2 rounded"
          placeholder="Price"
        />
        <input
          type="date"
          name="date"
          value={editedSession.date}
          onChange={handleChange}
          className="bg-gray-600 text-white p-2 rounded"
        />
        <input
          type="time"
          name="time"
          value={editedSession.time}
          onChange={handleChange}
          className="bg-gray-600 text-white p-2 rounded"
        />
      </div>
      <textarea
        name="remarks"
        value={editedSession.remarks || ''}
        onChange={handleChange}
        className="w-full bg-gray-600 text-white p-2 rounded mt-4"
        placeholder="Remarks"
        rows={3}
      />
      <div className="mt-4 flex justify-end space-x-2">
        <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-300">
          Cancel
        </button>
        <button type="submit" className="bg-primary text-gray-900 px-4 py-2 rounded hover:bg-opacity-90 transition-colors duration-300">
          Save
        </button>
      </div>
    </form>
  )
}

export default HostDashboard