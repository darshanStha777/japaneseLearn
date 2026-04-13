package com.japaneselearn.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "daily_sessions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class DailySession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    @Builder.Default
    private Long userId = 1L;

    @Column(name = "session_date", nullable = false)
    private LocalDate sessionDate;

    @Column(name = "words_studied")
    @Builder.Default
    private Integer wordsStudied = 0;

    @Column(name = "words_mastered")
    @Builder.Default
    private Integer wordsMastered = 0;

    @Column(name = "quiz_score", precision = 5, scale = 2)
    private BigDecimal quizScore;

    @Column(name = "session_duration_minutes")
    private Integer sessionDurationMinutes;

    @Column(name = "target_words")
    @Builder.Default
    private Integer targetWords = 60;

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
