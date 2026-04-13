package com.japaneselearn.dto;

import lombok.Data;
import lombok.Builder;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class QuizAnswerResponse {
    private boolean correct;
    private String correctAnswer;
    private String explanation;
    private Integer newMasteryLevel;
    private String nextReviewDate;
}
