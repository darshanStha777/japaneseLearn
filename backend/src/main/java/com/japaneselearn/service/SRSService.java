package com.japaneselearn.service;

import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class SRSService {

    private static final int[] INTERVALS = {1, 3, 7, 14, 30};

    public LocalDate calculateNextReview(int masteryLevel, boolean wasCorrect) {
        int newMastery = updateMasteryLevel(wasCorrect, masteryLevel);
        int intervalDays = getIntervalDays(newMastery, wasCorrect);
        return LocalDate.now().plusDays(intervalDays);
    }

    public int updateMasteryLevel(boolean wasCorrect, int currentLevel) {
        if (wasCorrect) {
            return Math.min(currentLevel + 1, 4);
        } else {
            return Math.max(currentLevel - 1, 0);
        }
    }

    public int getIntervalDays(int masteryLevel, boolean wasCorrect) {
        if (!wasCorrect) {
            return 1;
        }
        if (masteryLevel < 0 || masteryLevel >= INTERVALS.length) {
            return 1;
        }
        return INTERVALS[masteryLevel];
    }
}
