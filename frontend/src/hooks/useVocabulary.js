import { useState, useCallback } from 'react'
import { vocabApi } from '../services/api.js'

const FALLBACK_VOCAB = [
  { id: 1, kanji: '妥協', furigana: 'だきょう', englishMeaning: 'compromise', partOfSpeech: 'noun/verb', category: 'business', difficultyLevel: 3, masteryLevel: 0, exampleSentence: '彼らは価格について妥協した。', sentenceEnglish: 'They compromised on the price.' },
  { id: 2, kanji: '把握', furigana: 'はあく', englishMeaning: 'grasp; understand', partOfSpeech: 'noun/verb', category: 'business', difficultyLevel: 3, masteryLevel: 0, exampleSentence: '状況を把握してから行動してください。', sentenceEnglish: 'Please act after grasping the situation.' },
  { id: 3, kanji: '承認', furigana: 'しょうにん', englishMeaning: 'approval; recognition', partOfSpeech: 'noun/verb', category: 'business', difficultyLevel: 3, masteryLevel: 0, exampleSentence: '上司の承認が必要です。', sentenceEnglish: 'We need the manager\'s approval.' },
  { id: 4, kanji: '提案', furigana: 'ていあん', englishMeaning: 'proposal; suggestion', partOfSpeech: 'noun/verb', category: 'business', difficultyLevel: 2, masteryLevel: 0, exampleSentence: '新しい提案を検討してください。', sentenceEnglish: 'Please consider the new proposal.' },
  { id: 5, kanji: '徹底', furigana: 'てってい', englishMeaning: 'thoroughness', partOfSpeech: 'noun/verb', category: 'business', difficultyLevel: 3, masteryLevel: 0, exampleSentence: '安全対策を徹底する必要がある。', sentenceEnglish: 'We need to be thorough with safety measures.' },
  { id: 6, kanji: '概要', furigana: 'がいよう', englishMeaning: 'overview; summary', partOfSpeech: 'noun', category: 'business', difficultyLevel: 3, masteryLevel: 0, exampleSentence: '報告書の概要を説明してください。', sentenceEnglish: 'Please explain the overview of the report.' },
  { id: 7, kanji: '促進', furigana: 'そくしん', englishMeaning: 'promotion; facilitation', partOfSpeech: 'noun/verb', category: 'business', difficultyLevel: 3, masteryLevel: 0, exampleSentence: 'プロジェクトの促進が必要だ。', sentenceEnglish: 'We need to accelerate the project.' },
  { id: 8, kanji: '参照', furigana: 'さんしょう', englishMeaning: 'reference; consultation', partOfSpeech: 'noun/verb', category: 'business', difficultyLevel: 2, masteryLevel: 0, exampleSentence: '詳細は添付ファイルを参照してください。', sentenceEnglish: 'Please refer to the attached file for details.' },
  { id: 9, kanji: '確認', furigana: 'かくにん', englishMeaning: 'confirmation; verification', partOfSpeech: 'noun/verb', category: 'business', difficultyLevel: 2, masteryLevel: 1, exampleSentence: '予約を確認してください。', sentenceEnglish: 'Please confirm your reservation.' },
  { id: 10, kanji: '施設', furigana: 'しせつ', englishMeaning: 'facility; institution', partOfSpeech: 'noun', category: 'business', difficultyLevel: 2, masteryLevel: 0, exampleSentence: 'この施設は最新設備を備えている。', sentenceEnglish: 'This facility is equipped with the latest equipment.' },
  { id: 11, kanji: '研究', furigana: 'けんきゅう', englishMeaning: 'research; study', partOfSpeech: 'noun/verb', category: 'academic', difficultyLevel: 2, masteryLevel: 2, exampleSentence: '新薬の研究を進めている。', sentenceEnglish: 'Research on new medicines is progressing.' },
  { id: 12, kanji: '論文', furigana: 'ろんぶん', englishMeaning: 'thesis; paper', partOfSpeech: 'noun', category: 'academic', difficultyLevel: 2, masteryLevel: 0, exampleSentence: '卒業論文を書いている。', sentenceEnglish: 'I am writing my graduation thesis.' },
  { id: 13, kanji: '分析', furigana: 'ぶんせき', englishMeaning: 'analysis; breakdown', partOfSpeech: 'noun/verb', category: 'academic', difficultyLevel: 3, masteryLevel: 1, exampleSentence: 'データを分析する必要がある。', sentenceEnglish: 'It is necessary to analyze the data.' },
  { id: 14, kanji: '複雑', furigana: 'ふくざつ', englishMeaning: 'complex; complicated', partOfSpeech: 'adjective', category: 'kanji_compounds', difficultyLevel: 2, masteryLevel: 3, exampleSentence: '状況が複雑になってきた。', sentenceEnglish: 'The situation has become complex.' },
  { id: 15, kanji: '一石二鳥', furigana: 'いっせきにちょう', englishMeaning: 'killing two birds with one stone', partOfSpeech: 'idiom', category: 'idioms', difficultyLevel: 3, masteryLevel: 0, exampleSentence: '運動しながら友達と話すのは一石二鳥だ。', sentenceEnglish: 'Talking with friends while exercising kills two birds with one stone.' },
]

export function useVocabulary() {
  const [vocabulary, setVocabulary] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchTodayVocab = useCallback(async (userId = 1) => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await vocabApi.getToday(userId)
      setVocabulary(data.length > 0 ? data : FALLBACK_VOCAB)
    } catch (err) {
      setError('Backend not available, using sample data')
      setVocabulary(FALLBACK_VOCAB)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchByCategory = useCallback(async (category, userId = 1) => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await vocabApi.getByCategory(category, userId)
      const filtered = category === 'all' ? FALLBACK_VOCAB : FALLBACK_VOCAB.filter(v => v.category === category)
      setVocabulary(data.length > 0 ? data : filtered)
    } catch (err) {
      setError('Backend not available, using sample data')
      const filtered = category === 'all' ? FALLBACK_VOCAB : FALLBACK_VOCAB.filter(v => v.category === category)
      setVocabulary(filtered.length > 0 ? filtered : FALLBACK_VOCAB)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchById = useCallback(async (id, userId = 1) => {
    setLoading(true)
    try {
      const { data } = await vocabApi.getById(id, userId)
      return data
    } catch (err) {
      return FALLBACK_VOCAB.find(v => v.id === id) || null
    } finally {
      setLoading(false)
    }
  }, [])

  return { vocabulary, loading, error, fetchTodayVocab, fetchByCategory, fetchById, FALLBACK_VOCAB }
}
