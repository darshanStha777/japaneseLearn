export default function ExamReadinessScore({ readinessScore = 0, totalWordsLearned = 0, daysUntilExam = 60 }) {
  const score = Math.round(readinessScore)
  const totalN2 = 650
  const wordsNeeded = Math.max(0, Math.round(totalN2 * 0.8) - totalWordsLearned)

  let message = ''
  let messageColor = ''
  if (score >= 80) {
    message = 'Excellent! You are ready for N2! 🎉'
    messageColor = 'text-green-600 dark:text-green-400'
  } else if (score >= 60) {
    message = 'Great progress! Keep pushing! 💪'
    messageColor = 'text-blue-600 dark:text-blue-400'
  } else if (score >= 40) {
    message = 'You\'re on track. Stay consistent! 📖'
    messageColor = 'text-yellow-600 dark:text-yellow-400'
  } else {
    message = 'Keep studying every day! You can do it! 頑張れ！'
    messageColor = 'text-orange-600 dark:text-orange-400'
  }

  const circumference = 2 * Math.PI * 54
  const strokeDashoffset = circumference - (score / 100) * circumference

  const scoreColor = score >= 80 ? '#22c55e' : score >= 60 ? '#3b82f6' : score >= 40 ? '#eab308' : '#f97316'

  return (
    <div className="card">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 text-center">🎯 N2 Exam Readiness</h3>

      <div className="flex flex-col items-center mb-6">
        <div className="relative w-36 h-36">
          <svg className="w-36 h-36 -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="#E5E7EB" strokeWidth="10" className="dark:stroke-gray-700" />
            <circle
              cx="60" cy="60" r="54"
              fill="none"
              stroke={scoreColor}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: 'stroke-dashoffset 1s ease' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-gray-800 dark:text-white">{score}%</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Ready</span>
          </div>
        </div>
      </div>

      <div className={`text-center font-medium mb-4 ${messageColor}`}>{message}</div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
          <div className="text-xl font-bold text-japanese-navy dark:text-blue-300">{totalWordsLearned}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Learned</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
          <div className="text-xl font-bold text-japanese-red">{wordsNeeded}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Still Need</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
          <div className="text-xl font-bold text-orange-500">{daysUntilExam}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Days Left</div>
        </div>
      </div>
    </div>
  )
}
