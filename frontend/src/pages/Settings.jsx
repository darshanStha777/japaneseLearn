import { useState } from 'react'

export default function Settings({ darkMode, setDarkMode }) {
  const [examDate, setExamDate] = useState(() => {
    const d = new Date()
    d.setDate(d.getDate() + 60)
    return d.toISOString().split('T')[0]
  })
  const [dailyTarget, setDailyTarget] = useState(50)
  const [saved, setSaved] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  const saveSettings = () => {
    localStorage.setItem('examDate', examDate)
    localStorage.setItem('dailyTarget', dailyTarget)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleReset = () => {
    if (showResetConfirm) {
      localStorage.clear()
      window.location.reload()
    } else {
      setShowResetConfirm(true)
      setTimeout(() => setShowResetConfirm(false), 5000)
    }
  }

  const daysUntilExam = Math.max(0, Math.ceil((new Date(examDate) - new Date()) / (1000 * 60 * 60 * 24)))
  const wordsPerDay = daysUntilExam > 0 ? Math.ceil(650 / daysUntilExam) : 0

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">⚙️ Settings</h1>

      {/* Appearance */}
      <div className="card space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">🎨 Appearance</h2>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-gray-700 dark:text-gray-300">Dark Mode</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Switch between light and dark theme</div>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${
              darkMode ? 'bg-japanese-navy' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform ${
                darkMode ? 'translate-x-8' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Study Settings */}
      <div className="card space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">📚 Study Settings</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            📅 JLPT Exam Date
          </label>
          <input
            type="date"
            value={examDate}
            onChange={e => setExamDate(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2.5 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-japanese-navy"
          />
          {daysUntilExam > 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {daysUntilExam} days until exam — study ~{wordsPerDay} words/day
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            🎯 Daily Word Target: <span className="text-japanese-navy dark:text-blue-300 font-bold">{dailyTarget}</span>
          </label>
          <input
            type="range"
            min="10"
            max="100"
            step="5"
            value={dailyTarget}
            onChange={e => setDailyTarget(Number(e.target.value))}
            className="w-full accent-japanese-navy"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>10</span>
            <span>50</span>
            <span>100</span>
          </div>
        </div>

        <button
          onClick={saveSettings}
          className={`w-full py-3 rounded-xl font-semibold transition-all ${
            saved
              ? 'bg-green-500 text-white'
              : 'btn-primary'
          }`}
        >
          {saved ? '✅ Saved!' : '💾 Save Settings'}
        </button>
      </div>

      {/* About */}
      <div className="card space-y-3">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">ℹ️ About</h2>
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <p>📖 JLPT N2 Learning Platform — v1.0.0</p>
          <p>🧠 Uses Spaced Repetition System (SRS) with 5 mastery levels</p>
          <p>📚 650+ authentic N2 vocabulary words across 6 categories</p>
          <p>📆 2-month structured study plan</p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-center text-sm">
          {[
            { label: 'Total N2 Words', value: '650+' },
            { label: 'Categories', value: '6' },
            { label: 'SRS Levels', value: '5' },
            { label: 'Study Weeks', value: '8' },
          ].map(item => (
            <div key={item.label} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
              <div className="font-bold text-japanese-navy dark:text-blue-300">{item.value}</div>
              <div className="text-gray-500 dark:text-gray-400 text-xs">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card border-2 border-red-200 dark:border-red-900">
        <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-3">⚠️ Danger Zone</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          This will reset all your learning progress. This cannot be undone.
        </p>
        <button
          onClick={handleReset}
          className={`w-full py-2.5 rounded-xl font-semibold transition-colors ${
            showResetConfirm
              ? 'bg-red-600 text-white animate-pulse'
              : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50'
          }`}
        >
          {showResetConfirm ? '⚠️ Click again to confirm reset' : '🗑️ Reset All Progress'}
        </button>
      </div>
    </div>
  )
}
