package com.japaneselearn.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_vocabulary_progress")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class UserVocabularyProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    @Builder.Default
    private Long userId = 1L;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vocabulary_id", nullable = false)
    private Vocabulary vocabulary;

    @Column(name = "first_learned_date")
    private LocalDate firstLearnedDate;

    @Column(name = "last_reviewed_date")
    private LocalDate lastReviewedDate;

    @Column(name = "next_review_date")
    private LocalDate nextReviewDate;

    @Column(name = "review_count")
    @Builder.Default
    private Integer reviewCount = 0;

    @Column(name = "correct_count")
    @Builder.Default
    private Integer correctCount = 0;

    @Column(name = "incorrect_count")
    @Builder.Default
    private Integer incorrectCount = 0;

    @Column(name = "mastery_level")
    @Builder.Default
    private Integer masteryLevel = 0;

    @Column(name = "srs_interval")
    @Builder.Default
    private Integer srsInterval = 1;

    @Column(name = "ease_factor", precision = 3, scale = 2)
    @Builder.Default
    private Double easeFactor = 2.5;

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
