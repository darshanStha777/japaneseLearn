import { useEffect } from 'react'
import { useProgress } from '../hooks/useProgress.js'
import { useVocabulary } from '../hooks/useVocabulary.js'
import DailyStudyPlan from '../components/DailyStudyPlan.jsx'
import StudyStreak from '../components/StudyStreak.jsx'
import { Link } from 'react-router-dom'

export default function Today() {
  const { progress, fetchDailyProgress } = useProgress()
  const { vocabulary, fetchTodayVocab } = useVocabulary()

  useEffect(() => {
    fetchDailyProgress(1)
    fetchTodayVocab(1)
  }, [fetchDailyProgress, fetchTodayVocab])

  const todayWords = vocabulary.slice(0, 6)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">📅 Today&apos;s Study</h1>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </span>
      </div>

      <DailyStudyPlan progress={progress} />

      <StudyStreak
        currentStreak={progress.currentStreak}
        longestStreak={progress.longestStreak}
        weeklyProgress={progress.weeklyProgress}
      />

      {/* Today's Word Queue Preview */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white">📋 Today&apos;s Words</h2>
          <Link to="/learn" className="text-sm text-japanese-navy dark:text-blue-400 hover:underline">
            Study all →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {todayWords.map(word => (
            <div
              key={word.id}
              className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3 border border-gray-100 dark:border-gray-700"
            >
              <div className="text-xl font-bold text-japanese-navy dark:text-white">{word.kanji}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{word.furigana}</div>
              <div className="text-xs text-gray-600 dark:text-gray-300 mt-1 truncate">{word.englishMeaning}</div>
              <div className="mt-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  word.masteryLevel >= 3 ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' :
                  word.masteryLevel >= 1 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300' :
                  'bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-gray-300'
                }`}>
                  {word.masteryLevel >= 3 ? 'Mature' : word.masteryLevel >= 1 ? 'Learning' : 'New'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Session Summary */}
      <div className="card">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">📊 Today&apos;s Summary</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{progress.wordsStudiedToday}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Words Practiced</div>
          </div>
          <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">{progress.wordsLearnedToday}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">New Words</div>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <Link
            to="/learn"
            className="btn-primary px-8 py-3 rounded-xl font-semibold"
          >
            Continue Studying 📖
          </Link>
        </div>
      </div>
    </div>
  )
}
