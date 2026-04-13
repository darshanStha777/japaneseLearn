import { format, subDays, isToday, isYesterday } from 'date-fns'

export default function StudyStreak({ currentStreak = 0, longestStreak = 0, weeklyProgress = [] }) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(new Date(), 6 - i)
    const dateStr = format(date, 'yyyy-MM-dd')
    const dayData = weeklyProgress.find(d => d.date === dateStr)
    const studied = dayData?.wordsStudied > 0
    return { date, dateStr, studied, wordsStudied: dayData?.wordsStudied || 0 }
  })

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">🔥 Study Streak</h3>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-500 flex items-center gap-1">
              🔥 {currentStreak}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Current</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-500">{longestStreak}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Best</div>
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-2">
        {days.map((day, i) => {
          const today = isToday(day.date)
          const yesterday = isYesterday(day.date)
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={`w-full aspect-square rounded-lg transition-all flex items-center justify-center text-xs
                  ${day.studied
                    ? 'bg-orange-400 dark:bg-orange-500 shadow-sm'
                    : today
                      ? 'bg-gray-200 dark:bg-gray-600 border-2 border-dashed border-orange-400'
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}
                title={`${format(day.date, 'MMM d')}: ${day.wordsStudied} words`}
              >
                {day.studied && <span className="text-white text-[10px] font-bold">{day.wordsStudied}</span>}
              </div>
              <span className={`text-[10px] ${today ? 'text-orange-500 font-bold' : 'text-gray-400 dark:text-gray-500'}`}>
                {format(day.date, 'EEE')}
              </span>
            </div>
          )
        })}
      </div>

      {currentStreak === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-4">
          Study today to start your streak! 💪
        </p>
      )}
      {currentStreak >= 7 && (
        <p className="text-center text-orange-500 font-semibold text-sm mt-4">
          🎉 Amazing! {currentStreak} day streak!
        </p>
      )}
    </div>
  )
}
