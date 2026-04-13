package com.japaneselearn.dto;

import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizQuestionDTO {
    private Long id;
    private String type;
    private String question;
    private String kanji;
    private String furigana;
    private String englishMeaning;
    private List<String> options;
    private String correctAnswer;
    private String exampleSentence;
    private String sentenceEnglish;
}
