package com.japaneselearn.service;

import com.japaneselearn.dto.VocabResponse;
import com.japaneselearn.model.*;
import com.japaneselearn.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudyService {

    private final UserVocabularyProgressRepository progressRepository;
    private final VocabularyRepository vocabularyRepository;
    private final DailySessionRepository dailySessionRepository;
    private final LearningStatsRepository statsRepository;
    private final SRSService srsService;

    @Transactional
    public Map<String, Object> markLearned(Long userId, Long vocabularyId, boolean wasCorrect) {
        LocalDate today = LocalDate.now();

        UserVocabularyProgress progress = progressRepository
                .findByUserIdAndVocabularyId(userId, vocabularyId)
                .orElseGet(() -> UserVocabularyProgress.builder()
                        .userId(userId)
                        .vocabularyId(vocabularyId)
                        .masteryLevel(0)
                        .reviewCount(0)
                        .correctCount(0)
                        .incorrectCount(0)
                        .intervalDays(1)
                        .build());

        boolean isFirstLearn = progress.getFirstLearnedDate() == null;
        if (isFirstLearn) {
            progress.setFirstLearnedDate(today);
        }

        int newMastery = srsService.updateMasteryLevel(wasCorrect, progress.getMasteryLevel());
        LocalDate nextReview = srsService.calculateNextReview(progress.getMasteryLevel(), wasCorrect);
        int intervalDays = srsService.getIntervalDays(newMastery, wasCorrect);

        progress.setMasteryLevel(newMastery);
        progress.setNextReviewDate(nextReview);
        progress.setIntervalDays(intervalDays);
        progress.setLastReviewedDate(today);
        progress.setReviewCount(progress.getReviewCount() + 1);
        if (wasCorrect) {
            progress.setCorrectCount(progress.getCorrectCount() + 1);
        } else {
            progress.setIncorrectCount(progress.getIncorrectCount() + 1);
        }

        progressRepository.save(progress);
        updateDailySession(userId, today, isFirstLearn, wasCorrect);
        updateLearningStats(userId);

        Map<String, Object> result = new HashMap<>();
        result.put("masteryLevel", newMastery);
        result.put("nextReviewDate", nextReview.toString());
        result.put("intervalDays", intervalDays);
        result.put("wasCorrect", wasCorrect);
        return result;
    }

    public List<VocabResponse> getDueForReview(Long userId) {
        LocalDate today = LocalDate.now();
        List<UserVocabularyProgress> dueProgress = progressRepository.findDueForReview(userId, today);

        return dueProgress.stream()
                .map(p -> vocabularyRepository.findById(p.getVocabularyId())
                        .map(v -> VocabResponse.builder()
                                .id(v.getId())
                                .kanji(v.getKanji())
                                .furigana(v.getFurigana())
                                .englishMeaning(v.getEnglishMeaning())
                                .partOfSpeech(v.getPartOfSpeech())
                                .jlptLevel(v.getJlptLevel())
                                .difficultyLevel(v.getDifficultyLevel())
                                .exampleSentence(v.getExampleSentence())
                                .sentenceEnglish(v.getSentenceEnglish())
                                .category(v.getCategory())
                                .masteryLevel(p.getMasteryLevel())
                                .nextReviewDate(p.getNextReviewDate() != null ? p.getNextReviewDate().toString() : null)
                                .build())
                        .orElse(null))
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    public Map<String, Object> getDailyProgress(Long userId) {
        LocalDate today = LocalDate.now();
        Optional<DailySession> session = dailySessionRepository.findByUserIdAndSessionDate(userId, today);
        List<UserVocabularyProgress> learnedToday = progressRepository.findLearnedToday(userId, today);

        Map<String, Object> result = new HashMap<>();
        if (session.isPresent()) {
            DailySession s = session.get();
            result.put("wordsStudied", s.getWordsStudied());
            result.put("wordsMastered", s.getWordsMastered());
            result.put("targetWords", s.getTargetWords());
            result.put("quizScore", s.getQuizScore());
        } else {
            result.put("wordsStudied", 0);
            result.put("wordsMastered", 0);
            result.put("targetWords", 50);
            result.put("quizScore", 0);
        }
        result.put("newWordsToday", learnedToday.size());
        result.put("dueForReview", progressRepository.findDueForReview(userId, today).size());
        return result;
    }

    private void updateDailySession(Long userId, LocalDate today, boolean isNewWord, boolean wasCorrect) {
        DailySession session = dailySessionRepository
                .findByUserIdAndSessionDate(userId, today)
                .orElseGet(() -> DailySession.builder()
                        .userId(userId)
                        .sessionDate(today)
                        .wordsStudied(0)
                        .wordsMastered(0)
                        .targetWords(50)
                        .build());

        session.setWordsStudied(session.getWordsStudied() + 1);
        if (wasCorrect) {
            session.setWordsMastered(session.getWordsMastered() + 1);
        }
        dailySessionRepository.save(session);
    }

    private void updateLearningStats(Long userId) {
        LearningStats stats = statsRepository.findByUserId(userId)
                .orElseGet(() -> LearningStats.builder().userId(userId).build());

        long totalLearned = progressRepository.countLearnedByUserId(userId);
        long totalMastered = progressRepository.countMasteredByUserId(userId);

        stats.setTotalWordsLearned((int) totalLearned);
        stats.setTotalWordsMastered((int) totalMastered);

        double readiness = Math.min(100.0, (totalMastered / 650.0) * 100.0);
        stats.setEstimatedReadinessScore(new java.math.BigDecimal(readiness).setScale(2, java.math.RoundingMode.HALF_UP));

        statsRepository.save(stats);
    }
}
