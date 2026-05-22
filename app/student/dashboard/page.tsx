'use client'

import { useState } from 'react'
import Link from 'next/link'

// Preset high-fidelity dummy gamification stats and badge locker
const INITIAL_BADGES = [
  { id: 'b1', name: 'First Step', desc: 'Scheduled your first career counseling slot!', icon: '🧭', unlocked: true },
  { id: 'b2', name: 'Super Committed', desc: 'Attended 3 educational advice sessions!', icon: '🔥', unlocked: true },
  { id: 'b3', name: 'Planner Pro', desc: 'Shared detailed prep notes before a meeting!', icon: '🎯', unlocked: true },
  { id: 'b4', name: 'Action Taker', desc: 'Completed 3 career advisor-assigned quests!', icon: '🚀', unlocked: false },
  { id: 'b5', name: 'Networking Rookie', desc: 'Consulted with 2 different advisors!', icon: '👥', unlocked: false },
]

export default function StudentDashboard() {
  const [xp, setXp] = useState(420)
  const [level, setLevel] = useState(4)
  const [streak, setStreak] = useState(3)
  const [badges, setBadges] = useState(INITIAL_BADGES)
  const [activeBadge, setActiveBadge] = useState<typeof INITIAL_BADGES[0] | null>(null)

  const maxXp = 500
  const progressPercent = (xp / maxXp) * 100

  const handleBadgeClick = (badge: typeof INITIAL_BADGES[0]) => {
    setActiveBadge(badge)
  }

  return (
    <div className="page-wrapper">
      {/* Badge Achievement Details Modal Overlay */}
      {activeBadge && (
        <div className="level-up-overlay" onClick={() => setActiveBadge(null)}>
          <div
            className="level-up-dialog"
            style={{
              borderColor: activeBadge.unlocked ? 'var(--accent-gold)' : 'var(--border-glass)',
              background: 'hsl(240, 20%, 6%)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <span style={{ fontSize: '4rem', display: 'block', marginBottom: '16px' }}>
              {activeBadge.icon}
            </span>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '8px' }}>
              {activeBadge.name}
            </h3>
            <span
              className={`glow-badge ${activeBadge.unlocked ? 'gold' : 'rose'}`}
              style={{ marginBottom: '16px' }}
            >
              {activeBadge.unlocked ? '🏆 Achievement Unlocked' : '🔒 Locked Milestone'}
            </span>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem', marginBottom: '24px' }}>
              {activeBadge.desc}
            </p>
            <button className="btn btn-secondary" onClick={() => setActiveBadge(null)} style={{ width: '100%' }}>
              Back to Locker
            </button>
          </div>
        </div>
      )}

      {/* Main Student Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '32px',
        }}
      >
        <div>
          <h1 style={{ fontSize: '2.2rem', marginBottom: '8px', fontWeight: 800 }}>
            Welcome back, Chloe! 👋
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-dim)' }}>
            Ready to tackle your next career quest and level up your roadmap?
          </p>
        </div>

        {/* Action button */}
        <Link href="/student/book" className="btn btn-primary">
          <span>📅</span> Find & Book Advisor
        </Link>
      </div>

      {/* LEVEL PROGRESS PANEL */}
      <div className="glass-card glowing-card" style={{ marginBottom: '32px', padding: '32px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '16px',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>
            <span
              className="glow-badge gold"
              style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}
            >
              Rank: Curious Explorer
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>
              Level {level}{' '}
              <span style={{ fontSize: '1.1rem', color: 'var(--text-dim)', fontWeight: 500 }}>
                ({xp} / {maxXp} XP)
              </span>
            </h2>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '1.5rem', display: 'block' }}>🔥</span>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-gold)' }}>
              {streak}-Day Active Streak!
            </span>
          </div>
        </div>

        {/* Progress Bar Component */}
        <div className="level-progress-bar" style={{ marginBottom: '12px' }}>
          <div className="level-progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
          🧭 Gain <strong>80 XP</strong> by completing your active quest to level up to <strong>Level 5 [Career Pathfinder]</strong>!
        </p>
      </div>

      {/* DOUBLE SECTION PANEL: ACTIVE QUESTS SUMMARY & BADGE LOCKER */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
        {/* Active Quests Summary Card */}
        <div className="glass-card">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Active Career Quests</h3>
            <Link
              href="/student/quests"
              style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-violet)' }}
            >
              Open Log →
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                padding: '16px',
                borderRadius: '12px',
                background: 'rgba(0, 0, 0, 0.2)',
                border: '1px solid var(--border-glass)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, marginBottom: '6px' }}>
                <span style={{ fontSize: '0.95rem' }}>🎯 Polish Resume Intro Tagline</span>
                <span className="glow-badge violet" style={{ fontSize: '0.7rem', padding: '2px 8px' }}>
                  +150 XP
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '12px' }}>
                Draft a short, punchy 3-sentence summary of your skills and career interests...
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-rose)' }}>⏰ Due in 4 days</span>
                <Link
                  href="/student/quests"
                  className="btn btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '6px 12px', borderRadius: '6px' }}
                >
                  Verify Complete
                </Link>
              </div>
            </div>

            <div
              style={{
                padding: '16px',
                borderRadius: '12px',
                background: 'rgba(0, 0, 0, 0.1)',
                border: '1px dashed var(--border-glass)',
                textAlign: 'center',
                color: 'var(--text-dim)',
                fontSize: '0.85rem',
              }}
            >
              Want more points? Book a counseling session to get custom quests from your mentor!
            </div>
          </div>
        </div>

        {/* Badge Locker Card */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px' }}>
            My Locker Achievement Badges 🏆
          </h3>

          <div className="badge-locker-grid">
            {badges.map((badge) => (
              <div
                key={badge.id}
                onClick={() => handleBadgeClick(badge)}
                className={`badge-locker-item ${badge.unlocked ? '' : 'locked'}`}
              >
                <div className="badge-icon-wrapper">{badge.icon}</div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-light)', display: 'block' }}>
                  {badge.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
