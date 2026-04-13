import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { to: '/', label: 'Home', emoji: '🏠' },
  { to: '/today', label: 'Today', emoji: '📅' },
  { to: '/learn', label: 'Learn', emoji: '📖' },
  { to: '/quiz', label: 'Quiz', emoji: '✍️' },
  { to: '/progress', label: 'Progress', emoji: '📊' },
  { to: '/settings', label: 'Settings', emoji: '⚙️' },
]

export default function Navbar({ darkMode, setDarkMode }) {
  const location = useLocation()

  return (
    <nav className="bg-japanese-navy dark:bg-gray-950 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🇯🇵</span>
            <span className="text-white font-bold text-lg hidden sm:block">JLPT N2</span>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            {navLinks.map(link => {
              const active = location.pathname === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-2 sm:px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-1
                    ${active
                      ? 'bg-japanese-red text-white'
                      : 'text-gray-300 hover:bg-blue-900 hover:text-white'
                    }`}
                >
                  <span className="text-base">{link.emoji}</span>
                  <span className="hidden md:inline">{link.label}</span>
                </Link>
              )
            })}

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="ml-2 p-2 rounded-md text-gray-300 hover:bg-blue-900 hover:text-white transition-colors"
              title={darkMode ? 'Light mode' : 'Dark mode'}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
