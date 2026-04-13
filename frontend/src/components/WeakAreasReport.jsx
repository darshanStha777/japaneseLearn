const categoryLabels = {
  business: 'Business (会社用語)',
  academic: 'Academic (学術用語)',
  keigo: 'Keigo (敬語)',
  daily_life: 'Daily Life (日常会話)',
  idioms: 'Idioms (ことわざ)',
  kanji_compounds: 'Kanji Compounds (漢字語)'
}

const categoryEmojis = {
  business: '💼',
  academic: '🎓',
  keigo: '🙇',
  daily_life: '🏠',
  idioms: '📜',
  kanji_compounds: '漢'
}

export default function WeakAreasReport({ weakAreas = [] }) {
  const focusCategory = weakAreas[0]?.category

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">⚠️ Weak Areas</h3>
        {focusCategory && (
          <span className="text-xs text-japanese-red font-medium">
            Focus: {categoryLabels[focusCategory] || focusCategory}
          </span>
        )}
      </div>

      {focusCategory && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
            <span className="text-xl">{categoryEmojis[focusCategory] || '📌'}</span>
            <div>
              <div className="font-semibold text-sm">Recommended Focus</div>
              <div className="text-xs opacity-80">{categoryLabels[focusCategory] || focusCategory}</div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {weakAreas.map((area, i) => {
          const pct = area.masteryPercent || 0
          const barColor = pct < 30 ? 'bg-red-500' : pct < 60 ? 'bg-yellow-500' : 'bg-green-500'
          return (
            <div key={area.category}>
              <div className="flex justify-between items-center text-sm mb-1">
                <span className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <span>{categoryEmojis[area.category] || '📂'}</span>
                  <span>{categoryLabels[area.category] || area.category}</span>
                </span>
                <span className={`font-bold text-sm ${pct < 30 ? 'text-red-500' : pct < 60 ? 'text-yellow-500' : 'text-green-500'}`}>
                  {pct}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className={`${barColor} h-2.5 rounded-full transition-all`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {weakAreas.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400 py-6">
          <p>Start studying to see your weak areas!</p>
        </div>
      )}
    </div>
  )
}
