import React from 'react';

const StudyStreak = ({ heatmapData, currentStreak }) => {
  const getHeatColor = (wordsStudied, target) => {
    if (wordsStudied === 0) return 'bg-gray-200 dark:bg-gray-700';
    const pct = wordsStudied / target;
    if (pct >= 1) return 'bg-green-500';
    if (pct >= 0.7) return 'bg-green-400';
    if (pct >= 0.4) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900 dark:text-white">📅 7-Day Streak</h3>
        <div className="flex items-center space-x-1">
          <span className="text-2xl">🔥</span>
          <span className="font-bold text-orange-500">{currentStreak || 0}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">days</span>
        </div>
      </div>
      <div className="flex space-x-2">
        {(heatmapData || []).map((day, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center space-y-1">
            <div
              className={`w-full h-8 rounded ${getHeatColor(day.wordsStudied, day.wordsTarget)}`}
              title={`${day.date}: ${day.wordsStudied}/${day.wordsTarget} words`}
            />
            <span className="text-xs text-gray-500 dark:text-gray-400">{day.displayDate}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
        <div className="w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded"></div><span>None</span>
        <div className="w-3 h-3 bg-red-400 rounded"></div><span>Started</span>
        <div className="w-3 h-3 bg-yellow-400 rounded"></div><span>Good</span>
        <div className="w-3 h-3 bg-green-500 rounded"></div><span>Complete</span>
      </div>
    </div>
  );
};

export default StudyStreak;
