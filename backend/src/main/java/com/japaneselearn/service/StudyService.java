package com.japaneselearn.service;

import com.japaneselearn.dto.CardResultDTO;
import com.japaneselearn.dto.StudyPlanDTO;
import com.japaneselearn.dto.VocabularyDTO;
import com.japaneselearn.model.DailySession;
import com.japaneselearn.model.UserVocabularyProgress;
import com.japaneselearn.model.Vocabulary;
import com.japaneselearn.repository.DailySessionRepository;
import com.japaneselearn.repository.UserVocabularyProgressRepository;
import com.japaneselearn.repository.VocabularyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudyService {

    private final VocabularyRepository vocabularyRepository;
    private final UserVocabularyProgressRepository progressRepository;
    private final DailySessionRepository sessionRepository;
    private final SRSService srsService;
    private final VocabularyService vocabularyService;

    private static final Long DEFAULT_USER_ID = 1L;

    public StudyPlanDTO generateStudyPlan() {
        LocalDate examDate = getExamDate();
        long daysUntilExam = ChronoUnit.DAYS.between(LocalDate.now(), examDate);
        
        int dailyTarget = calculateDailyTarget((int) daysUntilExam);
        String phase = getStudyPhase((int) daysUntilExam);
        String phaseDesc = getPhaseDescription(phase);

        List<UserVocabularyProgress> dueProgress = progressRepository.findDueForReview(DEFAULT_USER_ID, LocalDate.now());
        List<VocabularyDTO> reviewWords = dueProgress.stream()
            .map(p -> {
                VocabularyDTO dto = vocabularyService.toDTO(p.getVocabulary());
                dto.setMasteryLevel(p.getMasteryLevel());
                return dto;
            })
            .limit(50)
            .collect(Collectors.toList());

        long learnedCount = progressRepository.countLearnedByUserId(DEFAULT_USER_ID);
        int newWordsTarget = Math.max(5, dailyTarget - reviewWords.size());
        
        List<Vocabulary> allVocab = vocabularyRepository.findByOrderByFrequencyRankAsc(
            PageRequest.of(0, (int)(learnedCount + newWordsTarget + 10)));
        
        List<Long> learnedIds = progressRepository.findByUserId(DEFAULT_USER_ID)
            .stream().map(p -> p.getVocabulary().getId()).collect(Collectors.toList());
        
        List<VocabularyDTO> newWords = allVocab.stream()
            .filter(v -> !learnedIds.contains(v.getId()))
            .limit(newWordsTarget)
            .map(vocabularyService::toDTO)
            .collect(Collectors.toList());

        Optional<DailySession> todaySession = sessionRepository.findByUserIdAndSessionDate(DEFAULT_USER_ID, LocalDate.now());
        int wordsStudied = todaySession.map(DailySession::getWordsStudied).orElse(0);

        return StudyPlanDTO.builder()
            .newWords(newWords)
            .reviewWords(reviewWords)
            .dailyTarget(dailyTarget)
            .newWordsCount(newWords.size())
            .reviewWordsCount(reviewWords.size())
            .wordsStudied(wordsStudied)
            .wordsRemaining(Math.max(0, dailyTarget - wordsStudied))
            .daysUntilExam((int) daysUntilExam)
            .phase(phase)
            .phaseDescription(phaseDesc)
            .build();
    }

    @Transactional
    public void markLearned(Long vocabularyId, String result) {
        Vocabulary vocab = vocabularyRepository.findById(vocabularyId)
            .orElseThrow(() -> new IllegalArgumentException("Vocabulary not found: " + vocabularyId));

        UserVocabularyProgress progress = progressRepository
            .findByUserIdAndVocabularyId(DEFAULT_USER_ID, vocabularyId)
            .orElseGet(() -> UserVocabularyProgress.builder()
                .userId(DEFAULT_USER_ID)
                .vocabulary(vocab)
                .firstLearnedDate(LocalDate.now())
                .build());

        boolean wasCorrect = "KNOW".equalsIgnoreCase(result);
        
        if (wasCorrect) {
            progress.setCorrectCount(progress.getCorrectCount() + 1);
        } else {
            progress.setIncorrectCount(progress.getIncorrectCount() + 1);
        }
        
        progress.setReviewCount(progress.getReviewCount() + 1);
        LocalDate nextReview = srsService.calculateNextReviewDate(progress, wasCorrect);
        progress.setNextReviewDate(nextReview);
        
        progressRepository.save(progress);
        updateDailySession(wasCorrect);
    }

    public List<VocabularyDTO> getDueForReview() {
        return progressRepository.findDueForReview(DEFAULT_USER_ID, LocalDate.now())
            .stream()
            .map(p -> {
                VocabularyDTO dto = vocabularyService.toDTO(p.getVocabulary());
                dto.setMasteryLevel(p.getMasteryLevel());
                return dto;
            })
            .collect(Collectors.toList());
    }

    public Map<String, Object> getTodayProgress() {
        Optional<DailySession> session = sessionRepository.findByUserIdAndSessionDate(DEFAULT_USER_ID, LocalDate.now());
        LocalDate examDate = getExamDate();
        long daysUntilExam = ChronoUnit.DAYS.between(LocalDate.now(), examDate);
        int target = calculateDailyTarget((int) daysUntilExam);
        
        return Map.of(
            "wordsStudied", session.map(DailySession::getWordsStudied).orElse(0),
            "wordsMastered", session.map(DailySession::getWordsMastered).orElse(0),
            "targetWords", target,
            "sessionDate", LocalDate.now().toString()
        );
    }

    private void updateDailySession(boolean mastered) {
        DailySession session = sessionRepository.findByUserIdAndSessionDate(DEFAULT_USER_ID, LocalDate.now())
            .orElseGet(() -> DailySession.builder()
                .userId(DEFAULT_USER_ID)
                .sessionDate(LocalDate.now())
                .build());
        
        session.setWordsStudied(session.getWordsStudied() + 1);
        if (mastered) {
            session.setWordsMastered(session.getWordsMastered() + 1);
        }
        sessionRepository.save(session);
    }

    private int calculateDailyTarget(int daysUntilExam) {
        if (daysUntilExam > 42) return 15;
        if (daysUntilExam > 28) return 20;
        if (daysUntilExam > 14) return 20;
        return 65;
    }

    private String getStudyPhase(int daysUntilExam) {
        if (daysUntilExam > 42) return "Foundation";
        if (daysUntilExam > 28) return "Growth";
        if (daysUntilExam > 14) return "Advanced";
        return "Mastery";
    }

    private String getPhaseDescription(String phase) {
        return switch (phase) {
            case "Foundation" -> "Building vocabulary base - high-frequency words";
            case "Growth" -> "Business & common expressions";
            case "Advanced" -> "Academic & formal vocabulary";
            case "Mastery" -> "Idioms, advanced expressions & mock exams";
            default -> "Continue studying";
        };
    }

    private LocalDate getExamDate() {
        return LocalDate.parse("2025-07-06");
    }
}
