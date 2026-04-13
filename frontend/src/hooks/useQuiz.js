import { useState, useCallback } from 'react';
import { quizAPI } from '../services/api';

export const useQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const startQuiz = useCallback(async (type, category, count = 10) => {
    try {
      setLoading(true);
      setError(null);
      const data = await quizAPI.getQuestions(type, category, count);
      setQuestions(data);
      setCurrentIndex(0);
      setAnswers([]);
      setScore(0);
      setIsFinished(false);
    } catch (err) {
      setError(err.message || 'Failed to load quiz questions');
    } finally {
      setLoading(false);
    }
  }, []);

  const submitAnswer = useCallback((answer) => {
    const currentQuestion = questions[currentIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;

    const newAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer: answer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect,
    };

    setAnswers(prev => [...prev, newAnswer]);
    if (isCorrect) setScore(prev => prev + 1);

    if (currentIndex + 1 >= questions.length) {
      setIsFinished(true);
    } else {
      setCurrentIndex(prev => prev + 1);
    }

    return isCorrect;
  }, [questions, currentIndex]);

  const resetQuiz = useCallback(() => {
    setQuestions([]);
    setCurrentIndex(0);
    setAnswers([]);
    setScore(0);
    setIsFinished(false);
    setError(null);
  }, []);

  return {
    questions,
    currentQuestion: questions[currentIndex],
    currentIndex,
    answers,
    score,
    isFinished,
    loading,
    error,
    startQuiz,
    submitAnswer,
    resetQuiz,
    totalQuestions: questions.length,
  };
};
