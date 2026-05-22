'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabaseClient'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState<'student' | 'advisor'>('student')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // Handle standard auth
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    const supabase = createClient()

    if (isSignUp) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
          },
        },
      })
      if (error) {
        setMessage(`Error: ${error.message}`)
      } else {
        setMessage('Check your email for the confirmation link!')
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        setMessage(`Error: ${error.message}`)
      } else {
        // Successful login, route based on profile
        const user = data.user
        if (user) {
          const profileRole = user.user_metadata?.role || 'student'
          if (profileRole === 'advisor') {
            router.push('/advisor')
          } else {
            router.push('/student/dashboard')
          }
        }
      }
    }
    setLoading(false)
  }

  // Quick Developer Interactive Preview Sign-in (Frictionless Demo)
  const handleDemoSignIn = (demoRole: 'student' | 'advisor') => {
    setLoading(true)
    setMessage('Initializing interactive demo session...')
    
    // Simulate setting session storage or cookies for preview routing
    setTimeout(() => {
      if (demoRole === 'advisor') {
        router.push('/advisor')
      } else {
        router.push('/student/dashboard')
      }
    }, 800)
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 72px)',
        padding: '20px',
      }}
    >
      <div className="glass-card glowing-card" style={{ maxWidth: '420px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>
            {isSignUp ? 'Join FuturePath 🚀' : 'Welcome Back 👋'}
          </h2>
          <p style={{ fontSize: '0.9rem' }}>
            {isSignUp
              ? 'Begin your gamified path toward your dream career'
              : 'Sign in to access your dashboard'}
          </p>
        </div>

        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {isSignUp && (
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', fontWeight: 600 }}>
                Full Name
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="Chloe Tan"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', fontWeight: 600 }}>
              Email Address
            </label>
            <input
              type="email"
              className="input-field"
              placeholder="explorer@futurepath.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '6px', fontWeight: 600 }}>
              Password
            </label>
            <input
              type="password"
              className="input-field"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {isSignUp && (
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '8px', fontWeight: 600 }}>
                Choose Your Role
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div
                  className={`badge-locker-item ${role === 'student' ? '' : 'locked'}`}
                  style={{
                    padding: '12px',
                    borderColor: role === 'student' ? 'var(--accent-violet)' : 'var(--border-glass)',
                    background: role === 'student' ? 'hsla(270, 95%, 60%, 0.1)' : 'rgba(0, 0, 0, 0.2)',
                  }}
                  onClick={() => setRole('student')}
                >
                  <span style={{ fontSize: '1.5rem', marginBottom: '4px' }}>🎓</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>Student</span>
                </div>
                <div
                  className={`badge-locker-item ${role === 'advisor' ? '' : 'locked'}`}
                  style={{
                    padding: '12px',
                    borderColor: role === 'advisor' ? 'var(--accent-violet)' : 'var(--border-glass)',
                    background: role === 'advisor' ? 'hsla(270, 95%, 60%, 0.1)' : 'rgba(0, 0, 0, 0.2)',
                  }}
                  onClick={() => setRole('advisor')}
                >
                  <span style={{ fontSize: '1.5rem', marginBottom: '4px' }}>👔</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>Advisor</span>
                </div>
              </div>
            </div>
          )}

          {message && (
            <div
              className={`glow-badge ${message.startsWith('Error') ? 'rose' : 'mint'}`}
              style={{ width: '100%', justifyContent: 'center', padding: '10px' }}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ width: '100%', marginTop: '8px' }}
          >
            {loading ? 'Processing...' : isSignUp ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <span
            style={{ fontSize: '0.85rem', color: 'var(--text-dim)', cursor: 'pointer' }}
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </span>
        </div>

        <div
          style={{
            marginTop: '24px',
            paddingTop: '20px',
            borderTop: '1px solid var(--border-glass)',
          }}
        >
          <p
            style={{
              fontSize: '0.8rem',
              textAlign: 'center',
              marginBottom: '12px',
              fontWeight: 600,
            }}
          >
            ⚡ INTERACTIVE PREVIEW DIRECT ACCESS
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button
              onClick={() => handleDemoSignIn('student')}
              className="btn btn-secondary"
              style={{ fontSize: '0.85rem', justifyContent: 'flex-start', width: '100%' }}
            >
              <span>🎓</span> Sign In as Student (Chloe Tan)
            </button>
            <button
              onClick={() => handleDemoSignIn('advisor')}
              className="btn btn-secondary"
              style={{ fontSize: '0.85rem', justifyContent: 'flex-start', width: '100%' }}
            >
              <span>👔</span> Sign In as Advisor (Coach Marcus)
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
