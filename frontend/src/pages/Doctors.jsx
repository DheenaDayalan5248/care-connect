import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'

export default function Doctors() {
  const [doctors, setDoctors] = useState([])
  const [department, setDepartment] = useState('')

  const fetchDoctors = async () => {
    const { data } = await api.get('/doctors', { params: department ? { department } : {} })
    setDoctors(data)
  }

  useEffect(() => { fetchDoctors() }, [department])

  return (
    <div>
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Find a doctor</h2>
          <p className="text-sm text-gray-500">Browse and book an appointment</p>
        </div>
        <div className="w-64">
          <input className="cc-input" placeholder="Filter by department" value={department} onChange={(e) => setDepartment(e.target.value)} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doc) => (
          <div className="cc-card" key={doc._id}>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold">{doc.user.name[0]}</div>
              <div>
                <h3 className="text-lg font-semibold">{doc.user.name}</h3>
                <p className="text-sm text-gray-500">{doc.specialization} • {doc.department}</p>
              </div>
            </div>
            <div className="mt-4">
              <Link className="cc-btn w-full" to={`/doctor/${doc._id}`}>View Profile</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}