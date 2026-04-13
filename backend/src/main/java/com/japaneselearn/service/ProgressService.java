package com.japaneselearn.service;

import com.japaneselearn.dto.ProgressResponse;
import com.japaneselearn.model.*;
import com.japaneselearn.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProgressService {

    private final UserVocabularyProgressRepository progressRepository;
    private final VocabularyRepository vocabularyRepository;
    private final DailySessionRepository dailySessionRepository;
    private final LearningStatsRepository statsRepository;
    private static final int TOTAL_N2_WORDS = 650;

    public ProgressResponse getDailyProgress(Long userId) {
        LocalDate today = LocalDate.now();
        Optional<DailySession> session = dailySessionRepository.findByUserIdAndSessionDate(userId, today);
        LearningStats stats = statsRepository.findByUserId(userId)
                .orElseGet(() -> LearningStats.builder().userId(userId).build());

        List<UserVocabularyProgress> learnedToday = progressRepository.findLearnedToday(userId, today);
        int dueForReview = progressRepository.findDueForReview(userId, today).size();

        List<Map<String, Object>> weeklyProgress = getWeeklyProgress(userId);

        return ProgressResponse.builder()
                .wordsLearnedToday(learnedToday.size())
                .wordsStudiedToday(session.map(DailySession::getWordsStudied).orElse(0))
                .targetWordsToday(session.map(DailySession::getTargetWords).orElse(50))
                .totalWordsLearned(stats.getTotalWordsLearned())
                .totalWordsMastered(stats.getTotalWordsMastered())
                .currentStreak(stats.getCurrentStreak())
                .longestStreak(stats.getLongestStreak())
                .accuracyRate(stats.getAccuracyRate() != null ? stats.getAccuracyRate().doubleValue() : 0.0)
                .readinessScore(stats.getEstimatedReadinessScore() != null ? stats.getEstimatedReadinessScore().doubleValue() : 0.0)
                .daysUntilExam(stats.getDaysUntilExam())
                .dueForReview(dueForReview)
                .weekInPlan(calculateWeekInPlan(stats))
                .weeklyProgress(weeklyProgress)
                .categoryMastery(getCategoryMastery(userId))
                .weakAreas(getWeakAreas(userId))
                .learningVelocity(getLearningVelocity(userId))
                .build();
    }

    public double getReadinessScore(Long userId) {
        long mastered = progressRepository.countMasteredByUserId(userId);
        return Math.min(100.0, (mastered / (double) TOTAL_N2_WORDS) * 100.0);
    }

    public List<Map<String, Object>> getWeakAreas(Long userId) {
        Map<String, Double> mastery = getCategoryMastery(userId);
        return mastery.entrySet().stream()
                .sorted(Map.Entry.comparingByValue())
                .map(e -> {
                    Map<String, Object> area = new HashMap<>();
                    area.put("category", e.getKey());
                    area.put("masteryPercent", Math.round(e.getValue() * 10.0) / 10.0);
                    return area;
                })
                .collect(Collectors.toList());
    }

    public double getLearningVelocity(Long userId) {
        LocalDate thirtyDaysAgo = LocalDate.now().minusDays(30);
        List<DailySession> sessions = dailySessionRepository.findRecentSessions(userId, thirtyDaysAgo);
        if (sessions.isEmpty()) return 0.0;
        int totalWords = sessions.stream().mapToInt(DailySession::getWordsStudied).sum();
        return Math.round((totalWords / 30.0) * 10.0) / 10.0;
    }

    public Map<String, Object> getLearningStats(Long userId) {
        LearningStats stats = statsRepository.findByUserId(userId)
                .orElseGet(() -> LearningStats.builder().userId(userId).build());
        Map<String, Object> result = new HashMap<>();
        result.put("totalWordsLearned", stats.getTotalWordsLearned());
        result.put("totalWordsMastered", stats.getTotalWordsMastered());
        result.put("currentStreak", stats.getCurrentStreak());
        result.put("longestStreak", stats.getLongestStreak());
        result.put("accuracyRate", stats.getAccuracyRate());
        result.put("readinessScore", stats.getEstimatedReadinessScore());
        result.put("daysUntilExam", stats.getDaysUntilExam());
        result.put("learningVelocity", getLearningVelocity(userId));
        return result;
    }

    private Map<String, Double> getCategoryMastery(Long userId) {
        List<String> categories = List.of("business", "academic", "keigo", "daily_life", "idioms", "kanji_compounds");
        Map<String, Double> mastery = new LinkedHashMap<>();

        for (String cat : categories) {
            List<Vocabulary> catVocab = vocabularyRepository.findByCategory(cat);
            if (catVocab.isEmpty()) {
                mastery.put(cat, 0.0);
                continue;
            }
            long masteredCount = catVocab.stream()
                    .filter(v -> {
                        Optional<UserVocabularyProgress> p = progressRepository
                                .findByUserIdAndVocabularyId(userId, v.getId());
                        return p.isPresent() && p.get().getMasteryLevel() >= 3;
                    })
                    .count();
            mastery.put(cat, Math.round((masteredCount / (double) catVocab.size()) * 1000.0) / 10.0);
        }
        return mastery;
    }

    private List<Map<String, Object>> getWeeklyProgress(Long userId) {
        LocalDate sevenDaysAgo = LocalDate.now().minusDays(6);
        List<DailySession> sessions = dailySessionRepository.findRecentSessions(userId, sevenDaysAgo);

        List<Map<String, Object>> weekly = new ArrayList<>();
        for (int i = 6; i >= 0; i--) {
            LocalDate date = LocalDate.now().minusDays(i);
            final LocalDate d = date;
            Optional<DailySession> session = sessions.stream()
                    .filter(s -> s.getSessionDate().equals(d))
                    .findFirst();
            Map<String, Object> day = new HashMap<>();
            day.put("date", date.toString());
            day.put("wordsStudied", session.map(DailySession::getWordsStudied).orElse(0));
            day.put("wordsMastered", session.map(DailySession::getWordsMastered).orElse(0));
            weekly.add(day);
        }
        return weekly;
    }

    private int calculateWeekInPlan(LearningStats stats) {
        int daysStudied = stats.getTotalWordsLearned() > 0
                ? Math.max(1, stats.getTotalWordsLearned() / 10)
                : 0;
        return Math.min(8, (daysStudied / 7) + 1);
    }
}
