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

    @Column(name = "user_id", nullable = false, unique = true)
    private Long userId = 1L;

    @Column(name = "total_words_learned")
    private Integer totalWordsLearned = 0;

    @Column(name = "total_words_mastered")
    private Integer totalWordsMastered = 0;

    @Column(name = "current_streak")
    private Integer currentStreak = 0;

    @Column(name = "longest_streak")
    private Integer longestStreak = 0;

    @Column(name = "accuracy_rate", precision = 5, scale = 2)
    private BigDecimal accuracyRate = BigDecimal.ZERO;

    @Column(name = "estimated_readiness_score", precision = 5, scale = 2)
    private BigDecimal estimatedReadinessScore = BigDecimal.ZERO;

    @Column(name = "days_until_exam")
    private Integer daysUntilExam = 60;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();
}
