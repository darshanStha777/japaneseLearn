package com.japaneselearn.dto;

import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProgressDTO {
    private Integer totalWordsLearned;
    private Integer totalWordsMastered;
    private Integer currentStreak;
    private Integer longestStreak;
    private Double accuracyRate;
    private Double estimatedReadinessScore;
    private Integer daysUntilExam;
    private Double learningVelocity;
    private Map<String, Double> categoryMastery;
    private List<String> weakCategories;
    private List<Map<String, Object>> heatmapData;
}
