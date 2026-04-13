package com.japaneselearn.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_vocabulary_progress", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "vocabulary_id"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserVocabularyProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId = 1L;

    @Column(name = "vocabulary_id", nullable = false)
    private Long vocabularyId;

    @Column(name = "first_learned_date")
    private LocalDate firstLearnedDate;

    @Column(name = "last_reviewed_date")
    private LocalDate lastReviewedDate;

    @Column(name = "next_review_date")
    private LocalDate nextReviewDate;

    @Column(name = "review_count")
    private Integer reviewCount = 0;

    @Column(name = "correct_count")
    private Integer correctCount = 0;

    @Column(name = "incorrect_count")
    private Integer incorrectCount = 0;

    // 0=new, 1=learning, 2=reviewing, 3=mature, 4=perfect
    @Column(name = "mastery_level")
    private Integer masteryLevel = 0;

    @Column(name = "interval_days")
    private Integer intervalDays = 1;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}
