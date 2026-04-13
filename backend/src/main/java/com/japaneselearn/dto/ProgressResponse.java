package com.japaneselearn.dto;

import lombok.Data;
import lombok.Builder;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProgressResponse {
    private Integer wordsLearnedToday;
    private Integer wordsStudiedToday;
    private Integer targetWordsToday;
    private Integer totalWordsLearned;
    private Integer totalWordsMastered;
    private Integer currentStreak;
    private Integer longestStreak;
    private Double accuracyRate;
    private Double readinessScore;
    private Integer daysUntilExam;
    private Integer dueForReview;
    private Integer weekInPlan;
    private List<Map<String, Object>> weeklyProgress;
    private Map<String, Double> categoryMastery;
    private List<Map<String, Object>> weakAreas;
    private Double learningVelocity;
}
