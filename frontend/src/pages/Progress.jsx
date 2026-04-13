import { useEffect } from 'react'
import { useProgress } from '../hooks/useProgress.js'
import ExamReadinessScore from '../components/ExamReadinessScore.jsx'
import ProgressDashboard from '../components/ProgressDashboard.jsx'
import WeakAreasReport from '../components/WeakAreasReport.jsx'
import StudyStreak from '../components/StudyStreak.jsx'

export default function Progress() {
  const { progress, loading, fetchDailyProgress } = useProgress()

  useEffect(() => {
    fetchDailyProgress(1)
  }, [fetchDailyProgress])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-gray-500 dark:text-gray-400">Loading progress...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">📊 My Progress</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExamReadinessScore
          readinessScore={progress.readinessScore}
          totalWordsLearned={progress.totalWordsLearned}
          daysUntilExam={progress.daysUntilExam}
        />

        <StudyStreak
          currentStreak={progress.currentStreak}
          longestStreak={progress.longestStreak}
          weeklyProgress={progress.weeklyProgress}
        />
      </div>

      <ProgressDashboard progress={progress} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeakAreasReport weakAreas={progress.weakAreas} />

        {/* Learning Velocity */}
        <div className="card">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">⚡ Learning Velocity</h3>
          <div className="text-center py-4">
            <div className="text-5xl font-bold text-japanese-navy dark:text-blue-300 mb-2">
              {progress.learningVelocity || 0}
            </div>
            <div className="text-gray-500 dark:text-gray-400">words/day (30-day avg)</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">At current pace:</span>
              <span className="font-semibold text-gray-800 dark:text-white">
                {progress.learningVelocity > 0
                  ? `${Math.ceil((650 - progress.totalWordsLearned) / progress.learningVelocity)} days to completion`
                  : 'Study to see estimate'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Target pace:</span>
              <span className="font-semibold text-gray-800 dark:text-white">
                {Math.ceil(650 / 60)} words/day
              </span>
            </div>
          </div>

          <div className="mt-4">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total N2 Progress</div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-japanese-navy to-japanese-red h-3 rounded-full transition-all"
                style={{ width: `${Math.min(100, (progress.totalWordsLearned / 650) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>{progress.totalWordsLearned} learned</span>
              <span>650 total</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
