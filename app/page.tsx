import Link from 'next/link'

export default function Home() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 72px)',
        padding: '40px 20px',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Gamified Pill */}
        <div style={{ marginBottom: '24px' }}>
          <span className="glow-badge violet" style={{ fontSize: '0.9rem', padding: '8px 18px' }}>
            🚀 Gamified Career Navigation for Gen Z & Gen Alpha
          </span>
        </div>

        {/* Hero Headings */}
        <h1
          style={{
            fontSize: '3.5rem',
            lineHeight: 1.1,
            marginBottom: '20px',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #ffffff 40%, var(--accent-violet) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Navigate Your Future. <br />
          Earn XP. Level Up.
        </h1>

        <p
          style={{
            fontSize: '1.2rem',
            color: 'var(--text-dim)',
            maxWidth: '600px',
            margin: '0 auto 40px',
            lineHeight: 1.6,
          }}
        >
          FuturePath connects students and young teenagers with expert advisors for stress-free career
          and educational counseling. Complete real-world quests, claim cool badges, and build your roadmap!
        </p>

        {/* Action Panel */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'center',
            marginBottom: '64px',
          }}
        >
          <Link href="/login" className="btn btn-primary" style={{ padding: '16px 36px', fontSize: '1.05rem' }}>
            <span>🧭</span> Begin Your Career Quest
          </Link>
          <Link href="/login" className="btn btn-secondary" style={{ padding: '16px 36px', fontSize: '1.05rem' }}>
            <span>👔</span> Advisor Console
          </Link>
        </div>

        {/* Highlight Metrics Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px',
            width: '100%',
          }}
        >
          <div className="glass-card" style={{ padding: '32px 24px' }}>
            <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '12px' }}>🎯</span>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', fontWeight: 700 }}>Custom Quests</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>
              Complete high-value career prep tasks set by mentors and level up your skills.
            </p>
          </div>

          <div className="glass-card glowing-card" style={{ padding: '32px 24px' }}>
            <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '12px' }}>📊</span>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', fontWeight: 700 }}>Daily Summary</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>
              Advisors track, manage, and log agenda sessions effortlessly in a premium control dashboard.
            </p>
          </div>

          <div className="glass-card" style={{ padding: '32px 24px' }}>
            <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '12px' }}>🏆</span>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', fontWeight: 700 }}>Unlock Badges</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>
              Claim accomplishments, collect milestone badges, and keep up your daily streak!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
