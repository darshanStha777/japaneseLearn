import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress.js'

const quotes = [
  { jp: '千里の道も一歩から', en: 'A journey of a thousand miles begins with a single step' },
  { jp: '継続は力なり', en: 'Perseverance is strength' },
  { jp: '七転び八起き', en: 'Fall seven times, rise eight' },
]

export default function Home() {
  const { progress, fetchDailyProgress } = useProgress()

  useEffect(() => {
    fetchDailyProgress(1)
  }, [fetchDailyProgress])

  const quote = quotes[new Date().getDate() % quotes.length]

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="bg-japanese-navy dark:bg-gray-800 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 text-[180px] opacity-5 leading-none select-none">日</div>
        <div className="relative">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">🇯🇵</span>
            <h1 className="text-3xl font-bold">JLPT N2 Study Platform</h1>
          </div>
          <p className="text-blue-200 text-lg mb-6">Master 650+ N2 vocabulary words with spaced repetition</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/today" className="bg-japanese-red hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors flex items-center gap-2">
              📅 Study Today
            </Link>
            <Link to="/quiz" className="bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-colors flex items-center gap-2">
              ✍️ Take Quiz
            </Link>
            <Link to="/learn" className="bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-xl transition-colors flex items-center gap-2">
              📖 Flashcards
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Words Learned', value: progress.totalWordsLearned, icon: '📚', color: 'text-blue-600 dark:text-blue-400' },
          { label: 'Mastered', value: progress.totalWordsMastered, icon: '⭐', color: 'text-yellow-600 dark:text-yellow-400' },
          { label: 'Streak', value: `${progress.currentStreak}d 🔥`, icon: '', color: 'text-orange-600 dark:text-orange-400' },
          { label: 'Readiness', value: `${Math.round(progress.readinessScore)}%`, icon: '🎯', color: 'text-green-600 dark:text-green-400' },
        ].map(stat => (
          <div key={stat.label} className="card text-center">
            {stat.icon && <div className="text-2xl mb-1">{stat.icon}</div>}
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* 2-Month Plan Progress */}
      <div className="card">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-3">📆 2-Month Study Plan</h2>
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>Week {progress.weekInPlan} of 8</span>
          <span>{progress.totalWordsLearned}/650 words</span>
        </div>
        <div className="grid grid-cols-8 gap-1 mb-3">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full ${
                i < (progress.weekInPlan - 1)
                  ? 'bg-japanese-red'
                  : i === (progress.weekInPlan - 1)
                    ? 'bg-yellow-400'
                    : 'bg-gray-200 dark:bg-gray-700'
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Target: ~81 words/week to complete all N2 vocabulary
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/learn?mode=review" className="card hover:shadow-lg transition-shadow group cursor-pointer">
          <div className="text-3xl mb-3">🔄</div>
          <h3 className="font-bold text-gray-800 dark:text-white mb-1 group-hover:text-japanese-red transition-colors">
            Review Due Cards
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {progress.dueForReview} cards waiting for review
          </p>
        </Link>
        <Link to="/quiz" className="card hover:shadow-lg transition-shadow group cursor-pointer">
          <div className="text-3xl mb-3">✍️</div>
          <h3 className="font-bold text-gray-800 dark:text-white mb-1 group-hover:text-japanese-red transition-colors">
            Practice Quiz
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Test your knowledge</p>
        </Link>
        <Link to="/progress" className="card hover:shadow-lg transition-shadow group cursor-pointer">
          <div className="text-3xl mb-3">📊</div>
          <h3 className="font-bold text-gray-800 dark:text-white mb-1 group-hover:text-japanese-red transition-colors">
            View Progress
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Track your N2 journey</p>
        </Link>
      </div>

      {/* Quote */}
      <div className="card bg-gradient-to-br from-japanese-navy to-blue-900 dark:from-gray-800 dark:to-gray-900 text-white border-0">
        <p className="text-2xl font-bold mb-2">{quote.jp}</p>
        <p className="text-blue-200 italic">&ldquo;{quote.en}&rdquo;</p>
      </div>
    </div>
  )
}
