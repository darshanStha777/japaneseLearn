import React, { useState, useEffect, useCallback } from 'react';
import { quizAPI } from '../services/api';

const QUIZ_TYPES = [
  { id: 'multiple_choice', label: 'Multiple Choice', icon: '🎯', desc: 'Choose the correct meaning' },
  { id: 'similar_words', label: 'Similar Words Drill', icon: '🧠', desc: 'Learn close meanings and nuance' },
  { id: 'kanji_recognition', label: 'Kanji Recognition', icon: '漢', desc: 'Identify the kanji reading' },
  { id: 'meaning_to_kanji', label: 'Meaning → Kanji', icon: '🔤', desc: 'Choose the correct kanji' },
  { id: 'fill_blank', label: 'Fill in Blank', icon: '✏️', desc: 'Complete the sentence' },
  { id: 'timed', label: 'Timed Mode', icon: '⏱️', desc: 'JLPT-style timed quiz' },
  { id: 'mock', label: 'Mock Exam', icon: '📝', desc: 'Full N2 simulation' },
];

const MOCK_QUESTIONS = [
  {
    id: 1,
    type: 'multiple_choice',
    question: 'What is the meaning of 判断 (はんだん)?',
    options: ['judgment', 'response', 'purpose', 'demand'],
    correctAnswer: 'judgment',
    kanji: '判断',
    furigana: 'はんだん',
  },
  {
    id: 2,
    type: 'multiple_choice',
    question: 'What is the meaning of 対応 (たいおう)?',
    options: ['judgment', 'response', 'use', 'purpose'],
    correctAnswer: 'response',
    kanji: '対応',
    furigana: 'たいおう',
  },
  {
    id: 3,
    type: 'multiple_choice',
    question: 'What is the meaning of 利用 (りよう)?',
    options: ['judgment', 'demand', 'use', 'basis'],
    correctAnswer: 'use',
    kanji: '利用',
    furigana: 'りよう',
  },
  {
    id: 4,
    type: 'multiple_choice',
    question: 'What is the meaning of 目的 (もくてき)?',
    options: ['purpose', 'response', 'use', 'system'],
    correctAnswer: 'purpose',
    kanji: '目的',
    furigana: 'もくてき',
  },
  {
    id: 5,
    type: 'multiple_choice',
    question: 'What is the meaning of 要求 (ようきゅう)?',
    options: ['judgment', 'demand', 'use', 'purpose'],
    correctAnswer: 'demand',
    kanji: '要求',
    furigana: 'ようきゅう',
  },
];

const Quiz = () => {
  const [phase, setPhase] = useState('select'); // select | quiz | results
  const [selectedType, setSelectedType] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);

  const handleNext = useCallback(() => {
    if (currentIndex + 1 >= questions.length) {
      setPhase('results');
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      if (selectedType?.id === 'timed') setTimeLeft(30);
    }
  }, [currentIndex, questions.length, selectedType]);

  useEffect(() => {
    let timer;
    if (phase === 'quiz' && selectedType?.id === 'timed' && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      timer = setTimeout(() => handleNext(), 0);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, phase, selectedType, handleNext]);

  const startQuiz = async (type) => {
    setSelectedType(type);
    setLoading(true);
    try {
      const data = await quizAPI.getQuestions(type.id, null, 10);
      setQuestions(Array.isArray(data) ? data : MOCK_QUESTIONS);
    } catch (_err) {
      setQuestions(MOCK_QUESTIONS);
    }
    setCurrentIndex(0);
    setAnswers([]);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    if (type.id === 'timed') setTimeLeft(30);
    setPhase('quiz');
    setLoading(false);
  };

  const handleAnswer = (answer) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
    setShowFeedback(true);

    const currentQuestion = questions[currentIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;
    if (isCorrect) setScore(prev => prev + 1);

    setAnswers(prev => [...prev, {
      question: currentQuestion,
      selectedAnswer: answer,
      isCorrect,
    }]);

    if (selectedType?.id !== 'timed') {
      setTimeout(() => handleNext(), 1500);
    }
  };

  const currentQuestion = questions[currentIndex];
  const scorePercent = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  if (phase === 'select') {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">✏️ Quiz Mode</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Choose your quiz style</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {QUIZ_TYPES.map(type => (
            <button
              key={type.id}
              onClick={() => startQuiz(type)}
              className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-md p-5 text-left transition-all hover:-translate-y-1 border border-transparent hover:border-red-200 dark:hover:border-red-700"
            >
              <div className="text-4xl mb-3">{type.icon}</div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{type.label}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{type.desc}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (phase === 'results') {
    return (
      <div className="max-w-lg mx-auto text-center space-y-6 py-8">
        <div className="text-6xl">
          {scorePercent >= 80 ? '🎉' : scorePercent >= 60 ? '💪' : '📚'}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Quiz Complete!</h2>
        <div className={`text-5xl font-bold ${scorePercent >= 80 ? 'text-green-600' : scorePercent >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
          {scorePercent}%
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          {score} / {questions.length} correct
        </p>

        {/* Answers review */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-5 text-left space-y-3">
          <h3 className="font-semibold text-gray-900 dark:text-white">Review Answers</h3>
          {answers.map((ans, idx) => (
            <div key={idx} className={`p-3 rounded-lg ${ans.isCorrect ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {ans.isCorrect ? '✅' : '❌'} {ans.question.kanji} ({ans.question.furigana})
              </p>
              {!ans.isCorrect && (
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Correct: {ans.question.correctAnswer}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => startQuiz(selectedType)}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-xl py-3 font-medium transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => setPhase('select')}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white rounded-xl py-3 font-medium transition-colors"
          >
            New Quiz
          </button>
        </div>
      </div>
    );
  }

  // Quiz phase
  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="text-4xl mb-3 animate-spin">⚙️</div>
        <p className="text-gray-500 dark:text-gray-400">Loading quiz...</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setPhase('select')}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          ← Back
        </button>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {currentIndex + 1} / {questions.length}
        </span>
        {selectedType?.id === 'timed' && (
          <span className={`font-bold ${timeLeft <= 10 ? 'text-red-600 animate-pulse' : 'text-gray-700 dark:text-gray-300'}`}>
            ⏱️ {timeLeft}s
          </span>
        )}
        {selectedType?.id !== 'timed' && (
          <span className="text-sm text-green-600 dark:text-green-400 font-medium">
            ✅ {score} correct
          </span>
        )}
      </div>

      {/* Progress */}
      <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className="bg-red-500 rounded-full h-2 transition-all"
          style={{ width: `${(currentIndex / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      {currentQuestion && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6 space-y-6">
          <div className="text-center">
            <p className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
              {currentQuestion.kanji}
            </p>
            <p className="text-xl text-gray-500 dark:text-gray-400">{currentQuestion.furigana}</p>
            <p className="text-gray-600 dark:text-gray-300 mt-3">{currentQuestion.question}</p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-3">
            {currentQuestion.options?.map((option, idx) => {
              let buttonClass = 'p-4 rounded-xl border-2 font-medium text-center transition-all ';
              if (!showFeedback) {
                buttonClass += 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-red-300 hover:bg-red-50 dark:hover:bg-red-900/20';
              } else if (option === currentQuestion.correctAnswer) {
                buttonClass += 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300';
              } else if (option === selectedAnswer) {
                buttonClass += 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300';
              } else {
                buttonClass += 'border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-500';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  disabled={showFeedback}
                  className={buttonClass}
                >
                  <span className="text-sm font-bold text-gray-400 dark:text-gray-500 block mb-1">
                    {['A', 'B', 'C', 'D'][idx]}
                  </span>
                  {option}
                </button>
              );
            })}
          </div>

          {showFeedback && (
            <div className={`text-center p-3 rounded-lg ${selectedAnswer === currentQuestion.correctAnswer ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'}`}>
              {selectedAnswer === currentQuestion.correctAnswer ? '✅ Correct!' : `❌ The answer is: ${currentQuestion.correctAnswer}`}
            </div>
          )}

          {(currentQuestion.learningTip || currentQuestion.similarWords?.length > 0) && (
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-3">
              {currentQuestion.learningTip && (
                <p className="text-sm text-amber-800 dark:text-amber-200 font-medium">
                  📌 {currentQuestion.learningTip}
                </p>
              )}
              {currentQuestion.similarWords?.length > 0 && (
                <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">
                  Similar words: {currentQuestion.similarWords.join(' ・ ')}
                </p>
              )}
            </div>
          )}

          {showFeedback && selectedType?.id === 'timed' && (
            <button
              onClick={handleNext}
              className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl py-3 font-medium transition-colors"
            >
              Next Question →
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
