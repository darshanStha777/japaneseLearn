import React from 'react';

const ExamCountdown = ({ daysUntilExam }) => {
  const getUrgencyColor = (days) => {
    if (days <= 14) return 'text-red-600 dark:text-red-400';
    if (days <= 30) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-green-600 dark:text-green-400';
  };

  const getPhase = (days) => {
    if (days > 42) return { phase: 'Foundation', desc: 'Building vocabulary base', target: 15 };
    if (days > 28) return { phase: 'Growth', desc: 'Business & expressions', target: 20 };
    if (days > 14) return { phase: 'Advanced', desc: 'Academic & formal', target: 20 };
    return { phase: 'Mastery', desc: 'Review & mock exams', target: 65 };
  };

  const phase = getPhase(daysUntilExam);

  return (
    <div className="bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 rounded-xl p-4 border border-red-200 dark:border-red-800">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Days until JLPT N2 Exam</p>
          <p className={`text-4xl font-bold ${getUrgencyColor(daysUntilExam)}`}>
            {daysUntilExam}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">days remaining</p>
        </div>
        <div className="text-right">
          <span className="inline-block bg-red-600 text-white text-xs px-2 py-1 rounded-full mb-1">
            {phase.phase} Phase
          </span>
          <p className="text-sm text-gray-600 dark:text-gray-400">{phase.desc}</p>
          <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
            Target: {phase.target} words/day
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExamCountdown;
