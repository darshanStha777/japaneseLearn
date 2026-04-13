package com.japaneselearn.dto;

import lombok.Data;
import lombok.Builder;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VocabResponse {
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
    private String wordFormation;
    private String relatedWords;
    private String synonyms;
    private String antonyms;
    private String category;
    private Integer masteryLevel;
    private String nextReviewDate;
}
