import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'

export default function DoctorProfile() {
  const { id } = useParams()
  const [doctor, setDoctor] = useState(null)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [mode, setMode] = useState('virtual')
  const [message, setMessage] = useState('')

  const fetchDoctor = async () => {
    const { data } = await api.get(`/doctors/${id}`)
    setDoctor(data)
  }

  useEffect(() => { fetchDoctor() }, [id])

  const book = async () => {
    setMessage('')
    try {
      const { data } = await api.post('/appointments/book', { doctorId: id, date, time, mode })
      setMessage(`Booked: ${data.date} ${data.time} (${data.mode})`)
    } catch (err) {
      setMessage(err.response?.data?.message || 'Booking failed')
    }
  }

  if (!doctor) return <p>Loading...</p>

  return (
    <div className="space-y-6">
      <div className="cc-card">
        <div className="flex items-start gap-4">
          <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold text-lg">{doctor.user.name[0]}</div>
          <div>
            <h2 className="text-2xl font-semibold">{doctor.user.name}</h2>
            <p className="text-sm text-gray-500">{doctor.specialization} • {doctor.department}</p>
            {doctor.bio && <p className="mt-2 text-gray-700">{doctor.bio}</p>}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Available Slots</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctor.availableSlots.map((s, i) => (
            <div className="cc-card" key={i}>
              <p className="font-medium">{s.date} at {s.time}</p>
              <button className="cc-btn mt-3 w-full" onClick={() => { setDate(s.date); setTime(s.time) }}>Select</button>
            </div>
          ))}
        </div>
      </div>

      <div className="cc-card">
        <h3 className="text-lg font-semibold mb-3">Book Appointment</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <input className="cc-input" placeholder="Date (YYYY-MM-DD)" value={date} onChange={(e) => setDate(e.target.value)} />
          <input className="cc-input" placeholder="Time (HH:MM)" value={time} onChange={(e) => setTime(e.target.value)} />
          <select className="cc-select" value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="virtual">Virtual</option>
            <option value="in-person">In-person</option>
          </select>
          <button className="cc-btn" onClick={book}>Confirm Booking</button>
        </div>
        {message && <p className="mt-3 text-green-700">{message}</p>}
      </div>
    </div>
  )
}