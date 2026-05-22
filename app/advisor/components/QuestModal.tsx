'use client'

import { useState } from 'react'

interface QuestModalProps {
  isOpen: boolean
  onClose: () => void
  studentName: string
  onAssignQuest: (title: string, description: string, xpReward: number) => void
}

const PRESET_QUESTS = [
  {
    title: 'Polish Resume Intro Tagline',
    description: 'Draft a short, punchy 3-sentence summary of your skills and career interests at the top of your resume.',
    xp: 150,
  },
  {
    title: 'Explore 2 Course Syllabus Links',
    description: 'Read the syllabus and module requirements for your top two preferred undergraduate degrees.',
    xp: 100,
  },
  {
    title: 'Draft a Cold Email Template',
    description: 'Write a draft message to reach out to an industry professional for an informational interview.',
    xp: 200,
  },
  {
    title: 'List Top 3 Career Worries',
    description: 'Bullet-point your top three doubts about choosing a career path so we can resolve them next time.',
    xp: 100,
  },
]

export default function QuestModal({
  isOpen,
  onClose,
  studentName = 'Chloe Tan',
  onAssignQuest,
}: QuestModalProps) {
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null)
  const [customTitle, setCustomTitle] = useState('')
  const [customDesc, setCustomDesc] = useState('')
  const [customXP, setCustomXP] = useState(150)
  const [useCustom, setUseCustom] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (useCustom) {
      onAssignQuest(customTitle, customDesc, customXP)
    } else if (selectedPreset !== null) {
      const preset = PRESET_QUESTS[selectedPreset]
      onAssignQuest(preset.title, preset.description, preset.xp)
    }
    // Reset state
    setSelectedPreset(null)
    setCustomTitle('')
    setCustomDesc('')
    onClose()
  }

  return (
    <div className="level-up-overlay">
      <div className="level-up-dialog" style={{ maxWidth: '520px', textAlign: 'left', border: '1px solid var(--accent-violet)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Assign Quest to {studentName} 🧭</h3>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-dim)',
              fontSize: '1.5rem',
              cursor: 'pointer',
            }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Mode Selector */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              className={`btn ${!useCustom ? 'btn-primary' : 'btn-secondary'}`}
              style={{ flex: 1, padding: '10px' }}
              onClick={() => setUseCustom(false)}
            >
              Presets Templates
            </button>
            <button
              type="button"
              className={`btn ${useCustom ? 'btn-primary' : 'btn-secondary'}`}
              style={{ flex: 1, padding: '10px' }}
              onClick={() => setUseCustom(true)}
            >
              Custom Quest
            </button>
          </div>

          {!useCustom ? (
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>
                Select a Preset Career Quest
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {PRESET_QUESTS.map((preset, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedPreset(index)}
                    style={{
                      padding: '12px',
                      borderRadius: '10px',
                      border: '1px solid',
                      borderColor: selectedPreset === index ? 'var(--accent-violet)' : 'var(--border-glass)',
                      background: selectedPreset === index ? 'hsla(270, 95%, 60%, 0.1)' : 'rgba(0, 0, 0, 0.2)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, marginBottom: '4px', fontSize: '0.9rem' }}>
                      <span>{preset.title}</span>
                      <span style={{ color: 'var(--accent-gold)' }}>+{preset.xp} XP</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{preset.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  Quest Title
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="e.g. Draft your first LinkedIn summary"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  Instructions Description
                </label>
                <textarea
                  className="input-field"
                  rows={3}
                  placeholder="Provide brief actionable instructions..."
                  value={customDesc}
                  onChange={(e) => setCustomDesc(e.target.value)}
                  required
                  style={{ resize: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  XP Bounty Reward
                </label>
                <input
                  type="number"
                  className="input-field"
                  value={customXP}
                  onChange={(e) => setCustomXP(Number(e.target.value))}
                  min={50}
                  max={500}
                  required
                />
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ flex: 1 }}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ flex: 1 }}
              disabled={!useCustom && selectedPreset === null}
            >
              Deploy Quest 🚀
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
