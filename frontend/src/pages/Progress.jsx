import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { progressAPI } from '../services/api';
import { getCategoryLabel } from '../services/progressCalculator';

const CATEGORY_COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#ef4444'];

const Progress = () => {
  const [statistics, setStatistics] = useState(null);
  const [weakAreas, setWeakAreas] = useState([]);
  const [readiness, setReadiness] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsResult, weakResult, readinessResult] = await Promise.allSettled([
          progressAPI.getStatistics(),
          progressAPI.getWeakAreas(),
          progressAPI.getReadiness(),
        ]);

        if (statsResult.status === 'fulfilled') setStatistics(statsResult.value);
        if (weakResult.status === 'fulfilled') setWeakAreas(weakResult.value || []);
        if (readinessResult.status === 'fulfilled') setReadiness(readinessResult.value?.score || 0);
      } catch (err) {
        console.error('Failed to fetch progress data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const categoryData = [
    { name: 'Business', value: 65, label: '会社用語' },
    { name: 'Academic', value: 72, label: '学術用語' },
    { name: 'Keigo', value: 58, label: '敬語' },
    { name: 'Daily', value: 80, label: '日常会話' },
    { name: 'Idioms', value: 45, label: 'ことわざ' },
    { name: 'Kanji', value: 68, label: '漢字語' },
  ];

  const masteryData = [
    { name: 'Perfect', value: statistics?.totalWordsMastered || 0, color: '#10b981' },
    { name: 'Mature', value: Math.round((statistics?.totalWordsLearned || 0) * 0.3), color: '#3b82f6' },
    { name: 'Review', value: Math.round((statistics?.totalWordsLearned || 0) * 0.2), color: '#f59e0b' },
    { name: 'Learning', value: Math.round((statistics?.totalWordsLearned || 0) * 0.1), color: '#ef4444' },
    { name: 'New', value: 1000 - (statistics?.totalWordsLearned || 0), color: '#6b7280' },
  ];

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="text-4xl mb-3 animate-pulse">📊</div>
        <p className="text-gray-500 dark:text-gray-400">Loading progress data...</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">📊 Progress Dashboard</h1>

      {/* Overall Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 text-center">
          <p className="text-3xl font-bold text-green-600">{statistics?.totalWordsLearned || 0}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Words Learned</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 text-center">
          <p className="text-3xl font-bold text-blue-600">{readiness}%</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">N2 Readiness</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 text-center">
          <p className="text-3xl font-bold text-orange-600">{statistics?.currentStreak || 0}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Day Streak 🔥</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 text-center">
          <p className="text-3xl font-bold text-purple-600">
            {statistics?.accuracyRate ? `${Math.round(statistics.accuracyRate)}%` : '0%'}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Accuracy Rate</p>
        </div>
      </div>

      {/* Category Mastery */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Category Mastery</h3>
        <div className="space-y-3">
          {categoryData.map((cat, idx) => (
            <div key={cat.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-700 dark:text-gray-300">{cat.name} <span className="text-gray-400">({cat.label})</span></span>
                <span className="font-medium" style={{ color: CATEGORY_COLORS[idx] }}>{cat.value}%</span>
              </div>
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className="rounded-full h-3 transition-all duration-500"
                  style={{ width: `${cat.value}%`, backgroundColor: CATEGORY_COLORS[idx] }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Bar chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Category Progress</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={categoryData}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(val) => [`${val}%`, 'Mastery']} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {categoryData.map((_, idx) => (
                  <Cell key={idx} fill={CATEGORY_COLORS[idx]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Mastery Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={masteryData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => value > 0 ? `${name}` : ''}
                labelLine={false}
              >
                {masteryData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weak Areas */}
      {weakAreas.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">⚠️ Weak Areas</h3>
          <div className="grid gap-3">
            {weakAreas.map((area, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{getCategoryLabel(area.category)}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{area.masteryPercent}% mastered</p>
                </div>
                <span className="text-red-600 dark:text-red-400 font-bold">{area.masteryPercent}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Progress;
