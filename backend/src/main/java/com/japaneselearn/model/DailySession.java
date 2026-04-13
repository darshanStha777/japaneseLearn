package com.japaneselearn.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "daily_sessions", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "session_date"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DailySession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId = 1L;

    @Column(name = "session_date", nullable = false)
    private LocalDate sessionDate;

    @Column(name = "words_studied")
    private Integer wordsStudied = 0;

    @Column(name = "words_mastered")
    private Integer wordsMastered = 0;

    @Column(name = "quiz_score", precision = 5, scale = 2)
    private BigDecimal quizScore = BigDecimal.ZERO;

    @Column(name = "session_duration_minutes")
    private Integer sessionDurationMinutes = 0;

    @Column(name = "target_words")
    private Integer targetWords = 50;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}
