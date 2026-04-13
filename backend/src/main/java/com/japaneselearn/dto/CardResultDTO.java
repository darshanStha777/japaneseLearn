package com.japaneselearn.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CardResultDTO {
    private Long vocabularyId;
    private String result; // KNOW, LEARNING, AGAIN
}
