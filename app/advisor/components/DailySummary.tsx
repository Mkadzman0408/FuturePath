'use client'

interface DailySummaryProps {
  totalSessions: number
  totalHours: number
  focusTopic: string
  unreadNotesCount: number
}

export default function DailySummary({
  totalSessions = 5,
  totalHours = 2.5,
  focusTopic = '#AI-Careers',
  unreadNotesCount = 2,
}: DailySummaryProps) {
  return (
    <div className="metrics-ribbon">
      {/* Sessions Card */}
      <div className="glass-card">
        <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
          SCHEDULED TODAY
        </span>
        <h3 style={{ fontSize: '1.8rem', color: 'var(--text-light)', display: 'flex', alignItems: 'baseline', gap: '6px' }}>
          {totalSessions} <span style={{ fontSize: '0.9rem', color: 'var(--text-dim)', fontWeight: 500 }}>sessions</span>
        </h3>
        <div style={{ marginTop: '12px' }}>
          <span className="glow-badge violet" style={{ fontSize: '0.75rem' }}>
            ⚡ Next at 10:15 AM
          </span>
        </div>
      </div>

      {/* Advising Hours Card */}
      <div className="glass-card">
        <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
          HOURS BOOKED
        </span>
        <h3 style={{ fontSize: '1.8rem', color: 'var(--text-light)', display: 'flex', alignItems: 'baseline', gap: '6px' }}>
          {totalHours} <span style={{ fontSize: '0.9rem', color: 'var(--text-dim)', fontWeight: 500 }}>hours</span>
        </h3>
        <div style={{ marginTop: '12px' }}>
          <span className="glow-badge mint" style={{ fontSize: '0.75rem' }}>
            🟢 80% occupancy
          </span>
        </div>
      </div>

      {/* Focus Topic Card */}
      <div className="glass-card">
        <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
          HOT FOCUS TOPIC
        </span>
        <h3 style={{ fontSize: '1.8rem', color: 'var(--accent-gold)', display: 'flex', alignItems: 'baseline', gap: '6px' }}>
          {focusTopic}
        </h3>
        <div style={{ marginTop: '12px' }}>
          <span className="glow-badge gold" style={{ fontSize: '0.75rem' }}>
            🔥 Rising demand
          </span>
        </div>
      </div>

      {/* Prep Alert Card */}
      <div className={`glass-card ${unreadNotesCount > 0 ? 'glowing-card' : ''}`} style={{ borderColor: unreadNotesCount > 0 ? 'var(--accent-rose)' : 'var(--border-glass)' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
          PREP ALERTS
        </span>
        <h3 style={{ fontSize: '1.8rem', color: unreadNotesCount > 0 ? 'var(--accent-rose)' : 'var(--text-light)', display: 'flex', alignItems: 'baseline', gap: '6px' }}>
          {unreadNotesCount} <span style={{ fontSize: '0.9rem', color: 'var(--text-dim)', fontWeight: 500 }}>unread notes</span>
        </h3>
        <div style={{ marginTop: '12px' }}>
          <span className={`glow-badge ${unreadNotesCount > 0 ? 'rose' : 'violet'}`} style={{ fontSize: '0.75rem' }}>
            {unreadNotesCount > 0 ? '⚠️ Action Required' : '✓ Prepared'}
          </span>
        </div>
      </div>
    </div>
  )
}
