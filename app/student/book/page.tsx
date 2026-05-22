'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Advisor {
  id: string
  name: string
  specialties: string[]
  bio: string
  rating: number
  badge: string
  avatar: string
}

const ADVISORS: Advisor[] = [
  {
    id: 'adv-1',
    name: 'Coach Marcus',
    specialties: ['Software Engineering', 'AI Careers', 'UI/UX Design'],
    bio: 'Former senior developer at Google. Passionate about helping students break into tech product roles and design career maps.',
    rating: 4.9,
    badge: 'Industry Expert',
    avatar: '👔',
  },
  {
    id: 'adv-2',
    name: 'Dr. Evelyn Chen',
    specialties: ['Biotech', 'Medicine Prep', 'Scholarships'],
    bio: 'Academic researcher and admissions reviewer. Helping high schoolers craft high-impact essays and prepare research paths.',
    rating: 5.0,
    badge: 'Academic Mentor',
    avatar: '🎓',
  },
  {
    id: 'adv-3',
    name: 'Aisha Al-Jamil',
    specialties: ['Startup Strategy', 'Marketing', 'E-Commerce'],
    bio: 'Founder of three digital brand agencies. Guiding teenagers through simple startup business ideas and pitch deck layouts.',
    rating: 4.8,
    badge: 'Venture Coach',
    avatar: '🚀',
  },
]

const TIME_SLOTS = [
  { id: 't1', time: '09:30 AM', duration: '30 mins' },
  { id: 't2', time: '10:15 AM', duration: '30 mins' },
  { id: 't3', time: '11:00 AM', duration: '30 mins' },
  { id: 't4', time: '01:30 PM', duration: '30 mins' },
  { id: 't5', time: '02:15 PM', duration: '30 mins' },
]

export default function BookPage() {
  const [selectedAdvisor, setSelectedAdvisor] = useState<string | null>(null)
  const [selectedDay, setSelectedDay] = useState('Mon')
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [mode, setMode] = useState<'video' | 'chat' | 'in_person'>('video')
  const [prepNotes, setPrepNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedAdvisor || !selectedSlot) return

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setShowSuccess(true)
    }, 1200)
  }

  const selectedAdvData = ADVISORS.find((a) => a.id === selectedAdvisor)

  return (
    <div className="page-wrapper">
      {/* Booking Success Modal Overlay */}
      {showSuccess && (
        <div className="level-up-overlay">
          <div className="level-up-dialog" style={{ border: '2px solid var(--accent-mint)', boxShadow: '0 0 40px var(--accent-mint-glow)' }}>
            <span style={{ fontSize: '4.5rem', display: 'block', marginBottom: '16px', animation: 'bounce 0.6s infinite alternate' }}>
              ✓📅🎉
            </span>
            <h2
              style={{
                fontSize: '2.2rem',
                fontWeight: 800,
                marginBottom: '12px',
                background: 'linear-gradient(135deg, #ffffff 40%, var(--accent-mint) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Session Confirmed!
            </h2>
            <div
              className="glow-badge mint"
              style={{ margin: '0 auto 20px', padding: '6px 16px', fontSize: '0.85rem' }}
            >
              🏆 +20 XP Claimed!
            </div>
            <p style={{ color: 'var(--text-light)', fontSize: '1rem', fontWeight: 600, marginBottom: '8px' }}>
              Scheduled with {selectedAdvData?.name}
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', marginBottom: '32px' }}>
              We have sent a calendar invite and virtual link to your email. Your advisor has been notified! Prepare your notes for the call.
            </p>
            <Link href="/student/dashboard" className="btn btn-mint" style={{ width: '100%' }}>
              Back to Dashboard Portal
            </Link>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
          <Link href="/student/dashboard" style={{ fontSize: '0.9rem', color: 'var(--accent-violet)', fontWeight: 600 }}>
            ← Back to Portal
          </Link>
          <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>/</span>
          <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Book Advice Slot</span>
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Schedule Career Advice</h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-dim)' }}>
          Connect with vetted, friendly industry mentors who understand your journey.
        </p>
      </div>

      <form onSubmit={handleBook} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        {/* Left Side: Advisor Selection */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, borderBottom: '1px solid var(--border-glass)', paddingBottom: '10px' }}>
            1. Select Your Mentor
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {ADVISORS.map((advisor) => (
              <div
                key={advisor.id}
                onClick={() => setSelectedAdvisor(advisor.id)}
                className={`glass-card ${selectedAdvisor === advisor.id ? 'glowing-card' : ''}`}
                style={{
                  cursor: 'pointer',
                  borderColor: selectedAdvisor === advisor.id ? 'var(--accent-violet)' : 'var(--border-glass)',
                  background: selectedAdvisor === advisor.id ? 'hsla(270, 95%, 60%, 0.05)' : 'var(--bg-glass)',
                  padding: '20px',
                }}
              >
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div
                    style={{
                      fontSize: '2.2rem',
                      background: 'rgba(255, 255, 255, 0.04)',
                      padding: '8px',
                      borderRadius: '12px',
                      border: '1px solid var(--border-glass)',
                    }}
                  >
                    {advisor.avatar}
                  </div>
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{advisor.name}</h4>
                      <span className="glow-badge gold" style={{ fontSize: '0.65rem', padding: '2px 8px' }}>
                        ⭐ {advisor.rating}
                      </span>
                    </div>
                    <span className="glow-badge violet" style={{ fontSize: '0.65rem', padding: '2px 8px', marginBottom: '8px' }}>
                      {advisor.badge}
                    </span>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '12px' }}>
                      {advisor.bio}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {advisor.specialties.map((spec) => (
                        <span
                          key={spec}
                          style={{
                            fontSize: '0.7rem',
                            color: 'var(--text-light)',
                            background: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid var(--border-glass)',
                            padding: '2px 8px',
                            borderRadius: '4px',
                          }}
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Schedule & Mode Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, borderBottom: '1px solid var(--border-glass)', paddingBottom: '10px' }}>
            2. Choose Slot & Booking Mode
          </h2>

          {/* Day Slider */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>
              Day of Week
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d) => (
                <div
                  key={d}
                  onClick={() => setSelectedDay(d)}
                  style={{
                    padding: '10px 4px',
                    borderRadius: '8px',
                    textAlign: 'center',
                    border: '1px solid',
                    borderColor: selectedDay === d ? 'var(--accent-violet)' : 'var(--border-glass)',
                    background: selectedDay === d ? 'hsla(270, 95%, 60%, 0.12)' : 'rgba(0, 0, 0, 0.2)',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    transition: 'all 0.2s ease',
                  }}
                >
                  {d}
                </div>
              ))}
            </div>
          </div>

          {/* Time Slots Picker */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>
              Available Time Slots
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {TIME_SLOTS.map((slot) => (
                <div
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot.id)}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: selectedSlot === slot.id ? 'var(--accent-violet)' : 'var(--border-glass)',
                    background: selectedSlot === slot.id ? 'hsla(270, 95%, 60%, 0.12)' : 'rgba(0, 0, 0, 0.2)',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span>{slot.time}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 500 }}>
                    {slot.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Meeting Mode Choice */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>
              Counseling Mode
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {(['video', 'chat', 'in_person'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`btn ${mode === m ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ fontSize: '0.8rem', padding: '10px 4px', textTransform: 'capitalize' }}
                >
                  {m.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Prep Notes Form */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
              Before We Meet (Prep Notes) <span style={{ color: 'var(--accent-gold)' }}>+15 XP</span>
            </label>
            <textarea
              className="input-field"
              rows={4}
              placeholder="What questions, worries, or career interests are on your mind? Share anything to help your advisor prepare..."
              value={prepNotes}
              onChange={(e) => setPrepNotes(e.target.value)}
              style={{ resize: 'none' }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '8px', padding: '14px' }}
            disabled={loading || !selectedAdvisor || !selectedSlot}
          >
            {loading ? 'Confirming with database...' : 'Book Appointment Slot 📅'}
          </button>
        </div>
      </form>
    </div>
  )
}
