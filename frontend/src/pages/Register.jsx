import { useState } from 'react'
import api from '../services/api'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('patient')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const { data } = await api.post('/auth/signup', { name, email, password, role })
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      window.location.href = role === 'doctor' ? '/doctor-dashboard' : '/doctors'
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="cc-card">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Create your account</h2>
          <p className="text-sm text-gray-500">Select role and join CareConnect</p>
        </div>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input className="cc-input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="cc-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="cc-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <select className="cc-select" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>
          <button className="cc-btn w-full" type="submit">Create account</button>
        </form>
      </div>
    </div>
  )
}