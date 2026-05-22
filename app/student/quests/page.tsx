'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Quest {
  id: string
  title: string
  desc: string
  xp: number
  assignedBy: string
  dueDate: string
  completed: boolean
}

const INITIAL_QUESTS: Quest[] = [
  {
    id: 'q1',
    title: 'Polish Resume Intro Tagline',
    desc: 'Draft a short, punchy 3-sentence summary of your skills and career interests at the top of your resume.',
    xp: 150,
    assignedBy: 'Coach Marcus',
    dueDate: 'May 26, 2026',
    completed: false,
  },
  {
    id: 'q2',
    title: 'Explore 2 Course Syllabus Links',
    desc: 'Read the syllabus and module requirements for your top two preferred undergraduate degrees.',
    xp: 100,
    assignedBy: 'Coach Marcus',
    dueDate: 'May 24, 2026',
    completed: true,
  },
  {
    id: 'q3',
    title: 'List Top 3 Career Worries',
    desc: 'Bullet-point your top three doubts about choosing a career path so we can resolve them next time.',
    xp: 100,
    assignedBy: 'Coach Marcus',
    dueDate: 'May 20, 2026',
    completed: true,
  },
]

export default function QuestsPage() {
  const [quests, setQuests] = useState(INITIAL_QUESTS)
  const [xp, setXp] = useState(420)
  const [level, setLevel] = useState(4)
  const [showLevelUp, setShowLevelUp] = useState(false)

  const handleCompleteQuest = (id: string, questXp: number) => {
    // 1. Mark completed
    setQuests(
      quests.map((q) => {
        if (q.id === id) {
          return { ...q, completed: true }
        }
        return q
      })
    )

    // 2. Increment XP
    const newXp = xp + questXp
    const maxXp = 500

    if (newXp >= maxXp) {
      // Level Up!
      setXp(newXp - maxXp)
      setLevel(level + 1)
      setShowLevelUp(true)
    } else {
      setXp(newXp)
    }
  }

  const activeQuests = quests.filter((q) => !q.completed)
  const completedQuests = quests.filter((q) => q.completed)

  return (
    <div className="page-wrapper">
      {/* Dynamic LEVEL UP POPUP OVERLAY */}
      {showLevelUp && (
        <div className="level-up-overlay">
          <div className="level-up-dialog">
            <span style={{ fontSize: '4.5rem', display: 'block', marginBottom: '16px', animation: 'bounce 0.6s infinite alternate' }}>
              🎉🏆⚡
            </span>
            <h2
              style={{
                fontSize: '2.5rem',
                fontWeight: 800,
                marginBottom: '12px',
                background: 'linear-gradient(135deg, #ffffff 40%, var(--accent-gold) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              LEVEL UP!
            </h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', marginBottom: '8px', fontWeight: 600 }}>
              You reached Level {level}!
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', marginBottom: '32px' }}>
              Congratulations! You are officially ranked as a **"Career Pathfinder"**! You unlocked access to advanced networking tools.
            </p>
            <button className="btn btn-mint" onClick={() => setShowLevelUp(false)} style={{ width: '100%' }}>
              Awesome, Keep Exploring!
            </button>
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
          <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>My Quests Log</span>
        </div>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>My Career Quests</h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-dim)' }}>
          Complete actionable tasks given by your advisors to build your skills and level up your XP stats.
        </p>
      </div>

      {/* Active Quests */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '20px', color: 'var(--text-light)' }}>
          Active Quests ({activeQuests.length})
        </h2>

        {activeQuests.length === 0 ? (
          <div
            className="glass-card"
            style={{
              padding: '32px',
              textAlign: 'center',
              color: 'var(--text-dim)',
              borderStyle: 'dashed',
            }}
          >
            🎉 All active quests complete! Check in with your advisor to unlock more points.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {activeQuests.map((quest) => (
              <div key={quest.id} className="glass-card glowing-card">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '16px',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <span className="glow-badge violet" style={{ fontSize: '0.75rem', padding: '2px 10px' }}>
                        +{quest.xp} XP Bounty
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                        Assigned by: <strong>{quest.assignedBy}</strong>
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>
                      {quest.title}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', lineHeight: 1.5, marginBottom: '12px' }}>
                      {quest.desc}
                    </p>
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-rose)', fontWeight: 600 }}>
                      ⏰ Target Due: {quest.dueDate}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCompleteQuest(quest.id, quest.xp)}
                    className="btn btn-mint"
                    style={{ padding: '10px 20px', borderRadius: '8px', fontSize: '0.85rem' }}
                  >
                    ✓ Complete & Claim XP
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completed Quests */}
      <div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '20px', color: 'var(--text-dim)' }}>
          Archived/Completed Quests ({completedQuests.length})
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', opacity: 0.75 }}>
          {completedQuests.map((quest) => (
            <div
              key={quest.id}
              className="glass-card"
              style={{
                background: 'rgba(0,0,0,0.15)',
                borderColor: 'var(--border-glass)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span className="glow-badge mint" style={{ fontSize: '0.7rem', padding: '2px 8px' }}>
                      ✓ Completed
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                      Completed via {quest.assignedBy}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, textDecoration: 'line-through' }}>
                    {quest.title}
                  </h4>
                </div>

                <span style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', fontWeight: 700 }}>
                  +{quest.xp} XP Claimed
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
