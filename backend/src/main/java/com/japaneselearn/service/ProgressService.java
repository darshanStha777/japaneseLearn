package com.japaneselearn.service;

import com.japaneselearn.dto.ProgressDTO;
import com.japaneselearn.model.DailySession;
import com.japaneselearn.model.LearningStats;
import com.japaneselearn.repository.DailySessionRepository;
import com.japaneselearn.repository.LearningStatsRepository;
import com.japaneselearn.repository.UserVocabularyProgressRepository;
import com.japaneselearn.repository.VocabularyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProgressService {

    private final UserVocabularyProgressRepository progressRepository;
    private final DailySessionRepository sessionRepository;
    private final LearningStatsRepository learningStatsRepository;
    private final VocabularyRepository vocabularyRepository;

    private static final Long DEFAULT_USER_ID = 1L;

    public Map<String, Object> getReadinessScore() {
        long totalWords = vocabularyRepository.count();
        long masteredWords = progressRepository.countByUserIdAndMasteryLevelGreaterThanEqual(DEFAULT_USER_ID, 3);
        
        double readinessScore = totalWords > 0 ? ((double) masteredWords / totalWords) * 100 : 0;
        
        return Map.of(
            "score", Math.round(readinessScore),
            "masteredWords", masteredWords,
            "totalWords", totalWords
        );
    }

    public List<Map<String, Object>> getWeakAreas() {
        List<Object[]> categoryStats = progressRepository.findCategoryMasteryStats(DEFAULT_USER_ID);
        
        return categoryStats.stream()
            .map(row -> {
                Map<String, Object> area = new HashMap<>();
                area.put("category", row[0]);
                double avgMastery = row[1] != null ? ((Number) row[1]).doubleValue() : 0.0;
                area.put("masteryPercent", Math.round(avgMastery * 25));
                return area;
            })
            .filter(area -> ((Number) area.get("masteryPercent")).intValue() < 60)
            .sorted(Comparator.comparingInt(a -> ((Number) a.get("masteryPercent")).intValue()))
            .collect(Collectors.toList());
    }

    public ProgressDTO getStatistics() {
        long learnedCount = progressRepository.countLearnedByUserId(DEFAULT_USER_ID);
        long masteredCount = progressRepository.countByUserIdAndMasteryLevelGreaterThanEqual(DEFAULT_USER_ID, 3);
        
        Object[] totals = progressRepository.findTotalCorrectAndIncorrect(DEFAULT_USER_ID);
        long totalCorrect = totals[0] != null ? ((Number) totals[0]).longValue() : 0;
        long totalIncorrect = totals[1] != null ? ((Number) totals[1]).longValue() : 0;
        long totalAttempts = totalCorrect + totalIncorrect;
        double accuracy = totalAttempts > 0 ? ((double) totalCorrect / totalAttempts) * 100 : 0;

        int streak = calculateStreak();
        double velocity = calculateLearningVelocity();
        
        long daysUntilExam = ChronoUnit.DAYS.between(LocalDate.now(), LocalDate.parse("2025-07-06"));

        return ProgressDTO.builder()
            .totalWordsLearned((int) learnedCount)
            .totalWordsMastered((int) masteredCount)
            .currentStreak(streak)
            .longestStreak(streak)
            .accuracyRate(Math.round(accuracy * 100.0) / 100.0)
            .estimatedReadinessScore(Math.round((double) masteredCount / Math.max(vocabularyRepository.count(), 1) * 100 * 100.0) / 100.0)
            .daysUntilExam((int) daysUntilExam)
            .learningVelocity(velocity)
            .build();
    }

    public List<Map<String, Object>> getHeatmapData() {
        List<Map<String, Object>> heatmap = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        
        for (int i = 6; i >= 0; i--) {
            LocalDate date = LocalDate.now().minusDays(i);
            Optional<DailySession> session = sessionRepository.findByUserIdAndSessionDate(DEFAULT_USER_ID, date);
            
            Map<String, Object> dayData = new HashMap<>();
            dayData.put("date", date.format(formatter));
            dayData.put("displayDate", date.getDayOfWeek().name().substring(0, 3));
            dayData.put("wordsStudied", session.map(DailySession::getWordsStudied).orElse(0));
            dayData.put("wordsTarget", session.map(DailySession::getTargetWords).orElse(60));
            dayData.put("completed", session.map(s -> s.getWordsStudied() >= s.getTargetWords()).orElse(false));
            
            heatmap.add(dayData);
        }
        
        return heatmap;
    }

    public Map<String, Object> getLearningVelocity() {
        LocalDate sevenDaysAgo = LocalDate.now().minusDays(7);
        Long wordsLast7Days = sessionRepository.sumWordsStudiedAfter(DEFAULT_USER_ID, sevenDaysAgo);
        
        double velocity = wordsLast7Days != null ? wordsLast7Days / 7.0 : 0;
        
        return Map.of(
            "wordsPerDay", Math.round(velocity * 10.0) / 10.0,
            "totalLast7Days", wordsLast7Days != null ? wordsLast7Days : 0L
        );
    }

    private int calculateStreak() {
        int streak = 0;
        LocalDate checkDate = LocalDate.now();
        
        for (int i = 0; i < 365; i++) {
            Optional<DailySession> session = sessionRepository.findByUserIdAndSessionDate(DEFAULT_USER_ID, checkDate.minusDays(i));
            if (session.isPresent() && session.get().getWordsStudied() > 0) {
                streak++;
            } else if (i > 0) {
                break;
            }
        }
        
        return streak;
    }

    private double calculateLearningVelocity() {
        LocalDate sevenDaysAgo = LocalDate.now().minusDays(7);
        Long totalWords = sessionRepository.sumWordsStudiedAfter(DEFAULT_USER_ID, sevenDaysAgo);
        return totalWords != null ? Math.round(totalWords / 7.0 * 10.0) / 10.0 : 0.0;
    }
}
