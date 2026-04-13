import React, { useState, useEffect } from 'react';

const Settings = ({ darkMode, toggleDarkMode }) => {
  const [examDate, setExamDate] = useState('');
  const [dailyTarget, setDailyTarget] = useState(60);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedDate = localStorage.getItem('examDate') || '2025-07-06';
    const savedTarget = parseInt(localStorage.getItem('dailyTarget') || '60');
    setExamDate(savedDate);
    setDailyTarget(savedTarget);
  }, []);

  const handleSave = () => {
    localStorage.setItem('examDate', examDate);
    localStorage.setItem('dailyTarget', dailyTarget.toString());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">⚙️ Settings</h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow divide-y divide-gray-100 dark:divide-gray-700">
        {/* Exam Date */}
        <div className="p-5">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">📅 JLPT N2 Exam Date</h3>
          <input
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            JLPT N2 is typically held in July and December
          </p>
        </div>

        {/* Daily Target */}
        <div className="p-5">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">🎯 Daily Study Target</h3>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="20"
              max="100"
              value={dailyTarget}
              onChange={(e) => setDailyTarget(parseInt(e.target.value))}
              className="flex-1"
            />
            <span className="font-bold text-red-600 w-16 text-right">{dailyTarget} words</span>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            Recommended: 50-80 words per day for 2-month exam preparation
          </p>
        </div>

        {/* Dark Mode */}
        <div className="p-5 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">🌙 Dark Mode</h3>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Better for studying at night</p>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`w-14 h-7 rounded-full transition-colors relative ${darkMode ? 'bg-red-600' : 'bg-gray-300'}`}
          >
            <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform ${darkMode ? 'translate-x-8' : 'translate-x-1'}`} />
          </button>
        </div>

        {/* 2-Month Study Plan */}
        <div className="p-5">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">📋 2-Month Study Schedule</h3>
          <div className="space-y-2 text-sm">
            {[
              { weeks: 'Week 1-2', days: 'Days 1-14', target: '15 words/day', focus: 'High-frequency N2 words', total: '200 words' },
              { weeks: 'Week 3-4', days: 'Days 15-28', target: '20 words/day', focus: 'Business & expressions', total: '300 words' },
              { weeks: 'Week 5-6', days: 'Days 29-42', target: '20 words/day', focus: 'Academic & formal', total: '300 words' },
              { weeks: 'Week 7-8', days: 'Days 43-56', target: '15 new + 50 review', focus: 'Idioms + Mock exams', total: '200 words' },
            ].map((phase) => (
              <div key={phase.weeks} className="flex justify-between bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{phase.weeks}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">{phase.focus}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-red-600">{phase.target}</p>
                  <p className="text-gray-400 text-xs">{phase.total}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        className={`w-full py-3 rounded-xl font-medium transition-colors ${saved ? 'bg-green-600 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}`}
      >
        {saved ? '✅ Saved!' : 'Save Settings'}
      </button>
    </div>
  );
};

export default Settings;
