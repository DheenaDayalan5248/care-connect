import { useEffect, useState } from 'react'
import api from '../services/api'

export default function DoctorDashboard() {
  const [appts, setAppts] = useState([])
  const [specialization, setSpecialization] = useState('')
  const [department, setDepartment] = useState('')
  const [bio, setBio] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const fetchAppts = async () => {
    const { data } = await api.get('/appointments/me')
    setAppts(data)
  }
  useEffect(() => { fetchAppts() }, [])

  const saveProfile = async () => {
    await api.post('/doctors/profile', { specialization, department, bio })
    alert('Profile saved')
  }
  const addSlot = async () => {
    await api.post('/doctors/slots', { date, time })
    alert('Slot added')
  }

  const updateStatus = async (id, status) => {
    await api.patch(`/appointments/${id}/status`, { status })
    fetchAppts()
  }

  return (
    <div className="space-y-6">
      <div className="cc-card">
        <h2 className="text-xl font-semibold mb-4">Manage Profile</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input className="cc-input" placeholder="Specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} />
          <input className="cc-input" placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} />
        </div>
        <div className="mt-3">
          <textarea className="cc-textarea" placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)} />
        </div>
        <button className="cc-btn mt-3" onClick={saveProfile}>Save Profile</button>
      </div>

      <div className="cc-card">
        <h3 className="text-lg font-semibold mb-3">Add Available Slot</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input className="cc-input" placeholder="Date (YYYY-MM-DD)" value={date} onChange={(e) => setDate(e.target.value)} />
          <input className="cc-input" placeholder="Time (HH:MM)" value={time} onChange={(e) => setTime(e.target.value)} />
          <button className="cc-btn" onClick={addSlot}>Add Slot</button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Upcoming Appointments</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {appts.map((a) => (
            <div className="cc-card" key={a._id}>
              <p className="font-medium">{a.date} {a.time} • {a.mode}</p>
              <p className="text-sm text-gray-600">Patient: {a.patient?.name}</p>
              <p className="text-sm text-gray-600">Status: {a.status}</p>
              <div className="flex gap-3 mt-3">
                <button className="cc-btn" onClick={() => updateStatus(a._id, 'confirmed')}>Confirm</button>
                <button className="inline-flex items-center justify-center rounded-lg bg-gray-200 text-gray-800 px-4 py-2 font-medium hover:bg-gray-300 transition" onClick={() => updateStatus(a._id, 'cancelled')}>Cancel</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}