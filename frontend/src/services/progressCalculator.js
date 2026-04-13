import { format, subDays } from 'date-fns';

export const calculateLearningVelocity = (sessions) => {
  if (!sessions || sessions.length === 0) return 0;

  const last7Days = sessions.slice(-7);
  const totalWords = last7Days.reduce((sum, s) => sum + (s.wordsStudied || 0), 0);
  return Math.round(totalWords / Math.max(last7Days.length, 1));
};

export const calculateStreak = (sessions) => {
  if (!sessions || sessions.length === 0) return 0;

  let streak = 0;
  const today = new Date();

  for (let i = 0; i < 365; i++) {
    const date = format(subDays(today, i), 'yyyy-MM-dd');
    const hasSession = sessions.some(s => s.sessionDate === date && s.wordsStudied > 0);
    if (hasSession) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }

  return streak;
};

export const generateHeatmapData = (sessions) => {
  const heatmap = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const date = subDays(today, i);
    const dateStr = format(date, 'yyyy-MM-dd');
    const session = sessions?.find(s => s.sessionDate === dateStr);

    heatmap.push({
      date: dateStr,
      displayDate: format(date, 'EEE'),
      wordsStudied: session?.wordsStudied || 0,
      wordsTarget: session?.targetWords || 60,
      completed: session ? (session.wordsStudied >= session.targetWords) : false,
    });
  }

  return heatmap;
};

export const getCategoryColor = (category) => {
  const colors = {
    business: '#3b82f6',
    academic: '#8b5cf6',
    keigo: '#ec4899',
    daily: '#10b981',
    idioms: '#f59e0b',
    kanji: '#ef4444',
  };
  return colors[category] || '#6b7280';
};

export const getCategoryLabel = (category) => {
  const labels = {
    business: '会社用語 (Business)',
    academic: '学術用語 (Academic)',
    keigo: '敬語 (Formal)',
    daily: '日常会話 (Daily Life)',
    idioms: 'ことわざ (Idioms)',
    kanji: '漢字語 (Kanji)',
  };
  return labels[category] || category;
};
