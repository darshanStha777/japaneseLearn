import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Today from './pages/Today.jsx'
import Learn from './pages/Learn.jsx'
import QuizPage from './pages/QuizPage.jsx'
import Progress from './pages/Progress.jsx'
import Settings from './pages/Settings.jsx'

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/today" element={<Today />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/settings" element={<Settings darkMode={darkMode} setDarkMode={setDarkMode} />} />
        </Routes>
      </main>
    </div>
  )
}
