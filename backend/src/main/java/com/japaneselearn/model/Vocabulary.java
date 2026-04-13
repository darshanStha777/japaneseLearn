package com.japaneselearn.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "vocabulary")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class Vocabulary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String kanji;

    @NotBlank
    @Column(nullable = false)
    private String furigana;

    @NotBlank
    @Column(name = "english_meaning", nullable = false, columnDefinition = "TEXT")
    private String englishMeaning;

    @Column(name = "part_of_speech", length = 50)
    private String partOfSpeech;

    @Column(name = "jlpt_level", length = 10)
    @Builder.Default
    private String jlptLevel = "N2";

    @Column(name = "frequency_rank")
    private Integer frequencyRank;

    @Column(name = "difficulty_level")
    @Min(1) @Max(5)
    private Integer difficultyLevel;

    @Column(name = "example_sentence", columnDefinition = "TEXT")
    private String exampleSentence;

    @Column(name = "sentence_english", columnDefinition = "TEXT")
    private String sentenceEnglish;

    @Column(name = "word_formation", length = 500)
    private String wordFormation;

    @Column(length = 50)
    private String category;

    @Column(name = "related_words", columnDefinition = "TEXT")
    private String relatedWords;

    @Column(columnDefinition = "TEXT")
    private String synonyms;

    @Column(columnDefinition = "TEXT")
    private String antonyms;

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
