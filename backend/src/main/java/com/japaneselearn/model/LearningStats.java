package com.japaneselearn.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "learning_stats")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LearningStats {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", unique = true)
    @Builder.Default
    private Long userId = 1L;

    @Column(name = "total_words_learned")
    @Builder.Default
    private Integer totalWordsLearned = 0;

    @Column(name = "total_words_mastered")
    @Builder.Default
    private Integer totalWordsMastered = 0;

    @Column(name = "current_streak")
    @Builder.Default
    private Integer currentStreak = 0;

    @Column(name = "longest_streak")
    @Builder.Default
    private Integer longestStreak = 0;

    @Column(name = "accuracy_rate", precision = 5, scale = 2)
    @Builder.Default
    private BigDecimal accuracyRate = BigDecimal.ZERO;

    @Column(name = "estimated_readiness_score", precision = 5, scale = 2)
    @Builder.Default
    private BigDecimal estimatedReadinessScore = BigDecimal.ZERO;

    @Column(name = "days_until_exam")
    private Integer daysUntilExam;

    @Column(name = "learning_velocity", precision = 5, scale = 2)
    @Builder.Default
    private BigDecimal learningVelocity = BigDecimal.ZERO;

    @Column(name = "updated_at")
    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();
}
