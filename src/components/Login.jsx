import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Dumbbell } from 'lucide-react'

export default function Login() {
  const { login, signup } = useAuth()
  const [isSignup, setIsSignup] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (isSignup) {
        await signup(email, password)
      } else {
        await login(email, password)
      }
    } catch (err) {
      setError(
        err.code === 'auth/user-not-found' ? 'No account found. Sign up first.' :
        err.code === 'auth/wrong-password' ? 'Wrong password.' :
        err.code === 'auth/email-already-in-use' ? 'Email already registered. Log in instead.' :
        err.code === 'auth/weak-password' ? 'Password must be at least 6 characters.' :
        err.code === 'auth/invalid-email' ? 'Invalid email address.' :
        err.message
      )
    }
    setLoading(false)
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <Dumbbell size={36} />
        </div>
        <h1 className="login-title">FitTrack</h1>
        <p className="login-subtitle">Sept 1 Challenge — 104 days to transform</p>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
            minLength={6}
          />
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Loading...' : isSignup ? 'Create Account' : 'Log In'}
          </button>
        </form>

        <button
          className="login-switch"
          onClick={() => { setIsSignup(!isSignup); setError('') }}
        >
          {isSignup ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
        </button>
      </div>
    </div>
  )
}
