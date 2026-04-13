package com.japaneselearn.dto;

import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VocabularyDTO {
    private Long id;
    private String kanji;
    private String furigana;
    private String englishMeaning;
    private String partOfSpeech;
    private String jlptLevel;
    private Integer frequencyRank;
    private Integer difficultyLevel;
    private String exampleSentence;
    private String sentenceEnglish;
    private String category;
    private String relatedWords;
    private String synonyms;
    private String antonyms;
    private Integer masteryLevel;
    private String nextReviewDate;
}
