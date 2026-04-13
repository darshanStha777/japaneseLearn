package com.japaneselearn.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "quiz_attempts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QuizAttempt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    @Builder.Default
    private Long userId = 1L;

    @Column(name = "quiz_type", length = 50)
    private String quizType;

    @Column(name = "total_questions", nullable = false)
    private Integer totalQuestions;

    @Column(name = "correct_answers", nullable = false)
    private Integer correctAnswers;

    @Column(name = "quiz_score", precision = 5, scale = 2, nullable = false)
    private BigDecimal quizScore;

    @Column(length = 100)
    private String category;

    @Column(name = "duration_seconds")
    private Integer durationSeconds;

    @Column(name = "attempted_at")
    @Builder.Default
    private LocalDateTime attemptedAt = LocalDateTime.now();
}
