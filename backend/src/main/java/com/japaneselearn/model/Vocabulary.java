package com.japaneselearn.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "vocabulary")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vocabulary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String kanji;

    @Column(nullable = false)
    private String furigana;

    @Column(name = "english_meaning", nullable = false, length = 500)
    private String englishMeaning;

    @Column(name = "part_of_speech")
    private String partOfSpeech;

    @Column(name = "jlpt_level")
    private String jlptLevel = "N2";

    @Column(name = "frequency_rank")
    private Integer frequencyRank;

    @Column(name = "difficulty_level")
    private Integer difficultyLevel = 3;

    @Column(name = "example_sentence", columnDefinition = "TEXT")
    private String exampleSentence;

    @Column(name = "sentence_english", columnDefinition = "TEXT")
    private String sentenceEnglish;

    @Column(name = "word_formation")
    private String wordFormation;

    @Column(name = "related_words", columnDefinition = "TEXT")
    private String relatedWords;

    @Column(columnDefinition = "TEXT")
    private String synonyms;

    @Column(columnDefinition = "TEXT")
    private String antonyms;

    @Column
    private String category;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}
