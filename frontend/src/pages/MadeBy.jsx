import { useEffect, useState } from 'react'
import api from '../services/api'

export default function MadeBy() {
  const [info, setInfo] = useState(null)
  const [error, setError] = useState('')
  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get('/made-by')
        setInfo(data)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load')
      }
    }
    load()
  }, [])
  if (error) return <div className="cc-card"><p className="text-red-600">{error}</p></div>
  if (!info) return <p>Loading...</p>
  return (
    <div className="cc-card text-center">
      <h2 className="text-2xl font-semibold mb-2">Made By</h2>
      <p className="text-lg font-medium">{info.developerName}</p>
      <p className="mt-1"><a className="text-primary hover:underline" href={info.githubURL} target="_blank" rel="noreferrer">GitHub Profile</a></p>
      <p className="mt-3 text-gray-700">{info.message}</p>
    </div>
  )
}