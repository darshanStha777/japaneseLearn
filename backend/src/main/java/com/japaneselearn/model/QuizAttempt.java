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

    @Column(name = "user_id", nullable = false)
    private Long userId = 1L;

    @Column(name = "quiz_type", nullable = false)
    private String quizType;

    @Column(name = "total_questions", nullable = false)
    private Integer totalQuestions;

    @Column(name = "correct_answers", nullable = false)
    private Integer correctAnswers;

    @Column(name = "quiz_score", nullable = false, precision = 5, scale = 2)
    private BigDecimal quizScore;

    @Column
    private String category;

    @Column(name = "attempted_at")
    private LocalDateTime attemptedAt = LocalDateTime.now();
}
