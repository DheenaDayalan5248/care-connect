import { useEffect, useState } from 'react'
import api from '../services/api'

export default function Appointments() {
  const [appts, setAppts] = useState([])
  const fetchAppts = async () => {
    const { data } = await api.get('/appointments/me')
    setAppts(data)
  }
  useEffect(() => { fetchAppts() }, [])
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My Appointments</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {appts.map((a) => (
          <div className="cc-card" key={a._id}>
            <p className="font-medium">{a.date} {a.time} • {a.mode}</p>
            <p className="text-sm text-gray-600">Status: {a.status}</p>
            <p className="text-sm text-gray-600">Doctor: {a.doctor?.name}</p>
            <p className="text-sm text-gray-600">Patient: {a.patient?.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}