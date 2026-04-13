import { useState, useEffect, useCallback } from 'react';
import { vocabAPI } from '../services/api';

export const useVocabulary = (page = 0, size = 20) => {
  const [vocabulary, setVocabulary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  const fetchVocabulary = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await vocabAPI.getAll(page, size);
      setVocabulary(data.content || data);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError(err.message || 'Failed to fetch vocabulary');
    } finally {
      setLoading(false);
    }
  }, [page, size]);

  useEffect(() => {
    fetchVocabulary();
  }, [fetchVocabulary]);

  return { vocabulary, loading, error, totalPages, refetch: fetchVocabulary };
};

export const useTodayVocabulary = () => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchToday = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await vocabAPI.getToday();
        setWords(data);
      } catch (err) {
        setError(err.message || "Failed to fetch today's vocabulary");
        // Fallback to mock data
        setWords(getMockVocabulary(50));
      } finally {
        setLoading(false);
      }
    };
    fetchToday();
  }, []);

  return { words, loading, error };
};

const getMockVocabulary = (count) => {
  const mockWords = [
    { id: 1, kanji: '判断', furigana: 'はんだん', englishMeaning: 'judgment', partOfSpeech: 'Noun', category: 'business', difficultyLevel: 2, frequencyRank: 1 },
    { id: 2, kanji: '対応', furigana: 'たいおう', englishMeaning: 'response', partOfSpeech: 'Noun', category: 'business', difficultyLevel: 2, frequencyRank: 2 },
    { id: 3, kanji: '利用', furigana: 'りよう', englishMeaning: 'use', partOfSpeech: 'Noun', category: 'daily', difficultyLevel: 1, frequencyRank: 3 },
    { id: 4, kanji: '目的', furigana: 'もくてき', englishMeaning: 'purpose', partOfSpeech: 'Noun', category: 'academic', difficultyLevel: 2, frequencyRank: 4 },
    { id: 5, kanji: '要求', furigana: 'ようきゅう', englishMeaning: 'demand', partOfSpeech: 'Noun', category: 'business', difficultyLevel: 2, frequencyRank: 5 },
  ];
  return mockWords.slice(0, Math.min(count, mockWords.length));
};
