'use client'

import { useState } from 'react'
import DailySummary from './components/DailySummary'
import Timeline from './components/Timeline'
import QuestModal from './components/QuestModal'

// Preset high-fidelity dummy appointments matching PRD schemas
const INITIAL_APPOINTMENTS = [
  {
    id: 'apt-1',
    studentName: 'Chloe Tan',
    studentLevel: 'Grade 11',
    scheduledAt: '09:30 AM',
    topicTags: ['SoftwareEngineering', 'UXDesign'],
    studentNotes: 'I am undecided between Computer Science and Graphic Design. Also unsure if I need to take advanced physics or if UI/UX is more creativity-focused.',
    status: 'prep_required' as const,
    gamificationLevel: 4,
    gamificationXp: 420,
  },
  {
    id: 'apt-2',
    studentName: 'Ethan Lim',
    studentLevel: 'Polytechnic Year 2',
    scheduledAt: '10:15 AM',
    topicTags: ['Internships', 'Networking', 'TechCareers'],
    studentNotes: 'How do I start building a resume with zero active tech work experience? I want to land a software internship this winter.',
    status: 'prep_required' as const,
    gamificationLevel: 6,
    gamificationXp: 850,
  },
  {
    id: 'apt-3',
    studentName: 'Sarah Jenkins',
    studentLevel: 'High School Senior',
    scheduledAt: '11:30 AM',
    topicTags: ['Scholarships', 'UniversityPrep'],
    studentNotes: 'Drafting my scholarship essay for Stanford. Need advice on how to structure my tech extracurricular write-ups.',
    status: 'upcoming' as const,
    gamificationLevel: 2,
    gamificationXp: 180,
  },
  {
    id: 'apt-4',
    studentName: 'Ryan Patel',
    studentLevel: 'Grade 10',
    scheduledAt: '01:30 PM',
    topicTags: ['AI-Careers', 'DataScience'],
    studentNotes: 'Are AI prompt engineering courses worth it, or should I just focus on learning core Python and math libraries first?',
    status: 'upcoming' as const,
    gamificationLevel: 5,
    gamificationXp: 510,
  },
]

export default function AdvisorPage() {
  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<{ id: string; name: string } | null>(null)
  const [toastMessage, setToastMessage] = useState('')

  const handleOpenQuestModal = (id: string, name: string) => {
    setSelectedStudent({ id, name })
    setIsModalOpen(true)
  }

  const handleAssignQuest = (title: string, description: string, xpReward: number) => {
    if (!selectedStudent) return

    // Show a glowing in-dashboard confirmation toast
    setToastMessage(
      `🚀 Quest "${title}" successfully deployed to ${selectedStudent.name}! +${xpReward} XP bounty registered in database.`
    )

    // Remove toast after 4s
    setTimeout(() => {
      setToastMessage('')
    }, 4500)
  }

  // Calculate today's high-level dashboard metrics
  const totalSessions = appointments.length
  const totalHours = totalSessions * 0.5 // assuming 30 min per session
  const unreadNotesCount = appointments.filter((apt) => apt.status === 'prep_required').length

  return (
    <div className="page-wrapper">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className="glow-badge mint glowing-card"
          style={{
            position: 'fixed',
            top: '90px',
            right: '20px',
            zIndex: 1000,
            padding: '16px 24px',
            borderRadius: '12px',
            background: 'hsl(240, 20%, 6%)',
            border: '1px solid var(--accent-mint)',
            color: 'var(--accent-mint)',
            fontSize: '0.9rem',
            maxWidth: '400px',
            animation: 'fadeIn 0.3s ease',
          }}
        >
          {toastMessage}
        </div>
      )}

      {/* Main Page Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '8px', fontWeight: 800 }}>
          Good morning, Coach Marcus! 👋
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-dim)' }}>
          Here is your educational guidance summary and agenda for Friday, May 22, 2026.
        </p>
      </div>

      {/* A. TODAY'S METRICS RIBBON (DAILY SUMMARY CARD) */}
      <DailySummary
        totalSessions={totalSessions}
        totalHours={totalHours}
        focusTopic="#AI-Careers"
        unreadNotesCount={unreadNotesCount}
      />

      {/* B. THE INTERACTIVE SCHEDULE TIMELINE */}
      <div style={{ marginTop: '48px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '24px', fontWeight: 800, color: 'var(--text-light)' }}>
          Today's Timeline Schedule
        </h2>
        <Timeline appointments={appointments} onOpenQuestModal={handleOpenQuestModal} />
      </div>

      {/* QUEST ASSIGNMENT COMPONENT OVERLAY */}
      {selectedStudent && (
        <QuestModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          studentName={selectedStudent.name}
          onAssignQuest={handleAssignQuest}
        />
      )}
    </div>
  )
}
