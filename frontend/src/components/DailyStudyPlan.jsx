import { useNavigate } from 'react-router-dom'

export default function DailyStudyPlan({ progress }) {
  const navigate = useNavigate()
  const {
    wordsStudiedToday = 0,
    targetWordsToday = 50,
    dueForReview = 0,
    weekInPlan = 1,
    wordsLearnedToday = 0
  } = progress || {}

  const completionPercent = Math.min(100, Math.round((wordsStudiedToday / targetWordsToday) * 100))

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">📅 Today&apos;s Plan</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
          Week {weekInPlan} of 8
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-japanese-navy dark:text-blue-300">{wordsStudiedToday}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Studied</div>
        </div>
        <div className="text-center border-x border-gray-200 dark:border-gray-700">
          <div className="text-3xl font-bold text-japanese-red">{targetWordsToday}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Target</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-yellow-500">{dueForReview}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Due Review</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600 dark:text-gray-400">Daily Progress</span>
          <span className="font-semibold text-japanese-navy dark:text-blue-300">{completionPercent}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div
            className="bg-japanese-red h-3 rounded-full transition-all duration-500"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
      </div>

      {wordsLearnedToday > 0 && (
        <div className="text-sm text-green-600 dark:text-green-400 mb-4 flex items-center gap-2">
          <span>✅</span>
          <span>{wordsLearnedToday} new words learned today!</span>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={() => navigate('/learn')}
          className="flex-1 btn-primary text-center py-3 rounded-xl"
        >
          📖 Study New Words
        </button>
        {dueForReview > 0 && (
          <button
            onClick={() => navigate('/learn?mode=review')}
            className="flex-1 btn-secondary text-center py-3 rounded-xl"
          >
            🔄 Review ({dueForReview})
          </button>
        )}
      </div>
    </div>
  )
}
