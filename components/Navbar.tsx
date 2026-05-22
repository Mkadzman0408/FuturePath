'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link href="/" className="nav-logo">
          <span>FuturePath</span>
          <span style={{ fontSize: '1.1rem' }}>🧭</span>
        </Link>
        <ul className="nav-links">
          <li>
            <Link
              href="/student/dashboard"
              className={`nav-item ${pathname?.startsWith('/student') ? 'active' : ''}`}
            >
              Student Portal
            </Link>
          </li>
          <li>
            <Link
              href="/advisor"
              className={`nav-item ${pathname?.startsWith('/advisor') ? 'active' : ''}`}
            >
              Advisor Console
            </Link>
          </li>
          <li>
            <Link href="/login" className="nav-item nav-item-btn">
              Sign In
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
