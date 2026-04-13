import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { differenceInDays, parseISO, format } from 'date-fns';
import ExamCountdown from '../components/ExamCountdown';
import StudyStreak from '../components/StudyStreak';
import { progressAPI, studyAPI } from '../services/api';
import { generateHeatmapData } from '../services/progressCalculator';

const StatCard = ({ icon, value, label, color = 'blue' }) => {
  const colorMap = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300',
    green: 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300',
    red: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300',
    yellow: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300',
    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300',
  };

  return (
    <div className={`${colorMap[color]} rounded-xl p-4 text-center`}>
      <div className="text-3xl mb-1">{icon}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs opacity-75 mt-1">{label}</div>
    </div>
  );
};

const Home = () => {
  const [statistics, setStatistics] = useState(null);
  const [readiness, setReadiness] = useState(0);
  const [heatmapData, setHeatmapData] = useState([]);
  const [todayProgress, setTodayProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  const examDate = localStorage.getItem('examDate') || '2025-07-06';
  const daysUntilExam = differenceInDays(parseISO(examDate), new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsResult, readinessResult, heatmapResult, progressResult] = await Promise.allSettled([
          progressAPI.getStatistics(),
          progressAPI.getReadiness(),
          progressAPI.getHeatmap(),
          studyAPI.getTodayProgress(),
        ]);

        if (statsResult.status === 'fulfilled') setStatistics(statsResult.value);
        if (readinessResult.status === 'fulfilled') setReadiness(readinessResult.value?.score || 0);
        if (heatmapResult.status === 'fulfilled') {
          setHeatmapData(heatmapResult.value || generateHeatmapData([]));
        } else {
          setHeatmapData(generateHeatmapData([]));
        }
        if (progressResult.status === 'fulfilled') setTodayProgress(progressResult.value);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setHeatmapData(generateHeatmapData([]));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const readinessBg = readiness >= 80 ? 'from-green-400 to-green-600' : readiness >= 60 ? 'from-yellow-400 to-yellow-600' : 'from-red-400 to-red-600';

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-4xl mb-3 animate-spin">⚙️</div>
          <p className="text-gray-500 dark:text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center py-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          🎌 JLPT N2 Learning Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          {format(new Date(), 'EEEE, MMMM d, yyyy')}
        </p>
      </div>

      {/* N2 Readiness Score */}
      <div className={`bg-gradient-to-r ${readinessBg} rounded-2xl p-6 text-white shadow-lg`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/80 text-sm font-medium">N2 Readiness Score</p>
            <p className="text-6xl font-bold mt-1">{readiness}%</p>
            <p className="text-white/80 text-sm mt-1">
              {readiness >= 80 ? '🎉 Almost ready for the exam!' : readiness >= 60 ? '💪 Good progress, keep going!' : '📚 Keep studying to reach your goal'}
            </p>
          </div>
          <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-4xl">🎯</span>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-4 bg-white/20 rounded-full h-3">
          <div
            className="bg-white rounded-full h-3 transition-all duration-500"
            style={{ width: `${readiness}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-white/70 mt-1">
          <span>0%</span>
          <span>Target: 80%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Exam Countdown */}
      <ExamCountdown daysUntilExam={daysUntilExam} />

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon="📖"
          value={statistics?.totalWordsLearned || 0}
          label="Words Mastered"
          color="green"
        />
        <StatCard
          icon="🔥"
          value={statistics?.currentStreak || 0}
          label="Day Streak"
          color="red"
        />
        <StatCard
          icon="🎯"
          value={statistics?.accuracyRate ? `${Math.round(statistics.accuracyRate)}%` : '0%'}
          label="Accuracy"
          color="blue"
        />
        <StatCard
          icon="⚡"
          value={statistics?.learningVelocity || 0}
          label="Words/Day"
          color="purple"
        />
      </div>

      {/* Today's Progress */}
      {todayProgress && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">📅 Today's Progress</h3>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {todayProgress.wordsStudied || 0} / {todayProgress.targetWords || 60} words
            </span>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              {Math.round(((todayProgress.wordsStudied || 0) / (todayProgress.targetWords || 60)) * 100)}%
            </span>
          </div>
          <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-blue-500 rounded-full h-3 transition-all"
              style={{ width: `${Math.min(100, ((todayProgress.wordsStudied || 0) / (todayProgress.targetWords || 60)) * 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Study Streak */}
      <StudyStreak
        heatmapData={heatmapData}
        currentStreak={statistics?.currentStreak || 0}
      />

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link to="/today" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-4 text-center transition-colors shadow">
          <div className="text-3xl mb-2">📅</div>
          <div className="font-medium text-sm">Daily Plan</div>
          <div className="text-xs text-blue-200 mt-1">Today's words</div>
        </Link>
        <Link to="/learn" className="bg-green-600 hover:bg-green-700 text-white rounded-xl p-4 text-center transition-colors shadow">
          <div className="text-3xl mb-2">📚</div>
          <div className="font-medium text-sm">Flashcards</div>
          <div className="text-xs text-green-200 mt-1">SRS study</div>
        </Link>
        <Link to="/quiz" className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl p-4 text-center transition-colors shadow">
          <div className="text-3xl mb-2">✏️</div>
          <div className="font-medium text-sm">Quiz</div>
          <div className="text-xs text-purple-200 mt-1">Test yourself</div>
        </Link>
        <Link to="/progress" className="bg-orange-600 hover:bg-orange-700 text-white rounded-xl p-4 text-center transition-colors shadow">
          <div className="text-3xl mb-2">📊</div>
          <div className="font-medium text-sm">Progress</div>
          <div className="text-xs text-orange-200 mt-1">Analytics</div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
