package com.japaneselearn.service;

import com.japaneselearn.model.UserVocabularyProgress;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class SRSService {

    private static final int[] SRS_INTERVALS = {1, 3, 7, 30, 90};

    public LocalDate calculateNextReviewDate(UserVocabularyProgress progress, boolean wasCorrect) {
        int newMasteryLevel;
        int interval;

        if (!wasCorrect) {
            newMasteryLevel = 0;
            interval = 1;
        } else {
            newMasteryLevel = Math.min(progress.getMasteryLevel() + 1, 4);
            interval = SRS_INTERVALS[newMasteryLevel];
        }

        progress.setMasteryLevel(newMasteryLevel);
        progress.setSrsInterval(interval);
        progress.setLastReviewedDate(LocalDate.now());

        return LocalDate.now().plusDays(interval);
    }

    public int calculateMasteryLevel(int correctCount, int totalCount) {
        if (totalCount == 0) return 0;
        double accuracy = (double) correctCount / totalCount;
        if (accuracy >= 0.9) return 4;
        if (accuracy >= 0.7) return 3;
        if (accuracy >= 0.4) return 2;
        if (accuracy > 0) return 1;
        return 0;
    }

    public boolean isDueForReview(UserVocabularyProgress progress) {
        if (progress.getNextReviewDate() == null) return true;
        return !progress.getNextReviewDate().isAfter(LocalDate.now());
    }
}
