'use client'

import { useState } from 'react'

interface Appointment {
  id: string
  studentName: string
  studentLevel: string
  scheduledAt: string
  topicTags: string[]
  studentNotes: string
  status: 'upcoming' | 'prep_required' | 'completed' | 'in_progress'
  gamificationXp: number
  gamificationLevel: number
}

interface TimelineProps {
  appointments: Appointment[]
  onOpenQuestModal: (studentId: string, studentName: string) => void
}

export default function Timeline({ appointments = [], onOpenQuestModal }: TimelineProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="timeline-feed">
      {appointments.map((apt) => {
        const isExpanded = expandedId === apt.id
        const isPrepReq = apt.status === 'prep_required'

        return (
          <div key={apt.id} className="timeline-item">
            {/* Timeline Connector Dot */}
            <div
              className="timeline-dot"
              style={{
                borderColor: isPrepReq ? 'var(--accent-rose)' : 'var(--accent-violet)',
                boxShadow: isPrepReq ? '0 0 12px 0 var(--accent-rose)' : '0 0 12px 0 var(--accent-violet)',
              }}
            />

            {/* Timeline Card Content */}
            <div className="timeline-card glass-card">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                {/* Profile Information & Status */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-violet)' }}>
                      {apt.scheduledAt}
                    </span>
                    <span
                      className={`glow-badge ${isPrepReq ? 'rose' : 'violet'}`}
                      style={{ fontSize: '0.7rem', padding: '2px 8px' }}
                    >
                      {isPrepReq ? 'Prep Req.' : 'Upcoming'}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '4px' }}>
                    {apt.studentName}{' '}
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 500 }}>
                      ({apt.studentLevel})
                    </span>
                  </h4>

                  {/* Student Gamification Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <span className="glow-badge gold" style={{ fontSize: '0.7rem', padding: '2px 8px' }}>
                      🏆 Level {apt.gamificationLevel} ({apt.gamificationXp} XP)
                    </span>
                  </div>
                </div>

                {/* Direct Action Handles */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <a
                    href="https://meet.jit.si/futurepath-advising-room"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-mint"
                    style={{ fontSize: '0.8rem', padding: '8px 16px', borderRadius: '8px' }}
                  >
                    Join Video
                  </a>
                  <button
                    onClick={() => onOpenQuestModal(apt.id, apt.studentName)}
                    className="btn btn-primary"
                    style={{ fontSize: '0.8rem', padding: '8px 16px', borderRadius: '8px' }}
                  >
                    Assign Quest 🧭
                  </button>
                </div>
              </div>

              {/* Tags Drawer */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                {apt.topicTags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-dim)',
                      background: 'rgba(255, 255, 255, 0.04)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      border: '1px solid var(--border-glass)',
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Expandable Prep Notes Accordion */}
              {apt.studentNotes && (
                <div
                  style={{
                    borderTop: '1px solid var(--border-glass)',
                    paddingTop: '12px',
                    marginTop: '12px',
                  }}
                >
                  <button
                    onClick={() => toggleExpand(apt.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: isPrepReq && !isExpanded ? 'var(--accent-rose)' : 'var(--text-light)',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: 0,
                    }}
                  >
                    <span>{isExpanded ? '▼' : '▶'}</span>
                    <span>
                      {isPrepReq ? '⚠️ Unread Session Prep Notes' : 'Session Prep Notes'}
                    </span>
                  </button>

                  {isExpanded && (
                    <div
                      style={{
                        marginTop: '10px',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        background: 'rgba(0, 0, 0, 0.2)',
                        border: '1px dashed var(--border-glass)',
                        fontSize: '0.9rem',
                        color: 'var(--text-dim)',
                        lineHeight: 1.5,
                      }}
                    >
                      {apt.studentNotes}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
