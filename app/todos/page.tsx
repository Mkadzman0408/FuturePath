import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function TodosPage() {
  let todos: any[] | null = null
  let fetchError: any = null

  try {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const { data, error } = await supabase.from('todos').select()
    if (error) throw error
    todos = data
  } catch (err: any) {
    fetchError = err
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 72px)',
        padding: '40px 20px',
      }}
    >
      <div className="glass-card glowing-card" style={{ maxWidth: '600px', width: '100%', padding: '32px' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '8px', textAlign: 'center' }}>📝 Supabase Todos Integration</h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', textAlign: 'center', marginBottom: '24px' }}>
          Real-time check on your Supabase connection database state.
        </p>

        {fetchError ? (
          <div className="glow-badge rose" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start', marginBottom: '24px', width: '100%' }}>
            <strong style={{ fontSize: '0.95rem' }}>⚠️ Connection / Table Status:</strong>
            <p style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>
              Failed to query 'todos' table. This is normal if you haven't created the table in your Supabase SQL Editor yet.
            </p>
            <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '12px', borderRadius: '6px', fontSize: '0.8rem', fontFamily: 'monospace', width: '100%' }}>
              create table public.todos (<br />
              &nbsp;&nbsp;id serial primary key,<br />
              &nbsp;&nbsp;name text not null,<br />
              &nbsp;&nbsp;created_at timestamp default now()<br />
              );<br />
              insert into public.todos (name) values ('Complete my first FuturePath session!'), ('Unlock Level 5 rank!');
            </div>
            <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>Error details: {fetchError.message || JSON.stringify(fetchError)}</span>
          </div>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {todos && todos.length > 0 ? (
              todos.map((todo) => (
                <li
                  key={todo.id}
                  className="glass-card"
                  style={{
                    padding: '16px',
                    borderColor: 'var(--border-glass)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: 'rgba(255, 255, 255, 0.02)'
                  }}
                >
                  <span style={{ color: 'var(--accent-mint)', fontSize: '1.2rem' }}>✓</span>
                  <span style={{ fontSize: '0.95rem' }}>{todo.name}</span>
                </li>
              ))
            ) : (
              <li style={{ textAlign: 'center', color: 'var(--text-dim)', padding: '24px', fontStyle: 'italic' }}>
                No todos found. Add some rows inside the 'todos' table in your Supabase dashboard to see them here!
              </li>
            )}
          </ul>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <Link href="/" className="btn btn-secondary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
            Back to Home
          </Link>
          <Link href="/login" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
            Go to Portal
          </Link>
        </div>
      </div>
    </div>
  )
}
