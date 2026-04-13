import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const categoryLabels = {
  business: '会社用語',
  academic: '学術用語',
  keigo: '敬語',
  daily_life: '日常会話',
  idioms: 'ことわざ',
  kanji_compounds: '漢字語'
}

export default function ProgressDashboard({ progress }) {
  const {
    totalWordsLearned = 0,
    totalWordsMastered = 0,
    currentStreak = 0,
    accuracyRate = 0,
    weeklyProgress = [],
    categoryMastery = {}
  } = progress || {}

  const stats = [
    { label: 'Total Mastered', value: totalWordsMastered, icon: '⭐', color: 'text-yellow-500' },
    { label: 'Words Learned', value: totalWordsLearned, icon: '📚', color: 'text-blue-500' },
    { label: 'Study Streak', value: `${currentStreak}d`, icon: '🔥', color: 'text-orange-500' },
    { label: 'Accuracy', value: `${Math.round(accuracyRate)}%`, icon: '🎯', color: 'text-green-500' },
  ]

  const chartData = weeklyProgress.map(d => ({
    date: d.date ? d.date.slice(5) : '',
    Studied: d.wordsStudied || 0,
    Mastered: d.wordsMastered || 0,
  }))

  const categoryData = Object.entries(categoryMastery).map(([cat, pct]) => ({
    category: categoryLabels[cat] || cat,
    mastery: Math.round(pct),
  }))

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(stat => (
          <div key={stat.label} className="card text-center">
            <div className="text-3xl mb-1">{stat.icon}</div>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Weekly Progress Chart */}
      <div className="card">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">📈 Weekly Progress</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
            <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#F9FAFB' }}
            />
            <Legend />
            <Bar dataKey="Studied" fill="#1D4ED8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Mastered" fill="#DC2626" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category Mastery */}
      {categoryData.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">📂 Category Mastery</h3>
          <div className="space-y-3">
            {categoryData.map(item => (
              <div key={item.category}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700 dark:text-gray-300">{item.category}</span>
                  <span className="font-semibold text-japanese-navy dark:text-blue-300">{item.mastery}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-japanese-navy dark:bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${item.mastery}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
