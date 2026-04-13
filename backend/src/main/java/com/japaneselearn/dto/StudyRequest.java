package com.japaneselearn.dto;

import lombok.Data;

@Data
public class StudyRequest {
    private Long userId = 1L;
    private Long vocabularyId;
    private Boolean wasCorrect;
}
