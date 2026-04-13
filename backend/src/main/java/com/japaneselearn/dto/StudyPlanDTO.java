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
public class StudyPlanDTO {
    private List<VocabularyDTO> newWords;
    private List<VocabularyDTO> reviewWords;
    private Integer dailyTarget;
    private Integer newWordsCount;
    private Integer reviewWordsCount;
    private Integer wordsStudied;
    private Integer wordsRemaining;
    private Integer daysUntilExam;
    private String phase;
    private String phaseDescription;
}
