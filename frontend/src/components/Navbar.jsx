import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/login'
  }
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/doctors" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">CareConnect</Link>
          <div className="hidden md:flex items-center gap-4">
            <Link className="text-gray-700 hover:text-primary" to="/doctors">Doctors</Link>
            <Link className="text-gray-700 hover:text-primary" to="/made-by">Made By</Link>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link className="text-gray-700 hover:text-primary" to="/appointments">My Appointments</Link>
              {user.role === 'doctor' && <Link className="text-gray-700 hover:text-primary" to="/doctor-dashboard">Doctor Dashboard</Link>}
              <button className="cc-btn" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link className="text-gray-700 hover:text-primary" to="/login">Login</Link>
              <Link className="cc-btn" to="/register">Register</Link>
            </>
          )}
        </div>
        <button className="md:hidden inline-flex items-center justify-center rounded-lg border border-gray-300 p-2" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M3.75 5.75h16.5v1.5H3.75zM3.75 11.25h16.5v1.5H3.75zM3.75 16.75h16.5v1.5H3.75z" />
          </svg>
        </button>
      </nav>
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-2">
            <Link className="block text-gray-700" to="/doctors" onClick={() => setOpen(false)}>Doctors</Link>
            <Link className="block text-gray-700" to="/made-by" onClick={() => setOpen(false)}>Made By</Link>
            {user ? (
              <>
                <Link className="block text-gray-700" to="/appointments" onClick={() => setOpen(false)}>My Appointments</Link>
                {user.role === 'doctor' && <Link className="block text-gray-700" to="/doctor-dashboard" onClick={() => setOpen(false)}>Doctor Dashboard</Link>}
                <button className="cc-btn w-full" onClick={logout}>Logout</button>
              </>
            ) : (
              <>
                <Link className="block text-gray-700" to="/login" onClick={() => setOpen(false)}>Login</Link>
                <Link className="cc-btn w-full" to="/register" onClick={() => setOpen(false)}>Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}