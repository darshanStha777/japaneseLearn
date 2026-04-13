package com.japaneselearn.dto;

import lombok.Data;

@Data
public class QuizAnswerRequest {
    private Long userId = 1L;
    private Long vocabularyId;
    private String answer;
    private String quizType;
}
