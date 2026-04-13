package com.japaneselearn.service;

import com.japaneselearn.dto.QuizAnswerResponse;
import com.japaneselearn.dto.VocabResponse;
import com.japaneselearn.model.*;
import com.japaneselearn.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuizService {

    private final VocabularyRepository vocabularyRepository;
    private final UserVocabularyProgressRepository progressRepository;
    private final QuizAttemptRepository quizAttemptRepository;
    private final SRSService srsService;

    public List<Map<String, Object>> generateQuiz(Long userId, String quizType, String category, int count) {
        List<Vocabulary> vocab;
        if (category != null && !category.isEmpty() && !category.equals("all")) {
            vocab = vocabularyRepository.findByCategoryOrderByFrequency(category);
        } else {
            vocab = vocabularyRepository.findAllOrderByFrequency();
        }

        if (vocab.size() < 4) {
            vocab = vocabularyRepository.findAll();
        }

        Collections.shuffle(vocab);
        List<Vocabulary> questionWords = vocab.stream().limit(count).collect(Collectors.toList());
        List<Map<String, Object>> questions = new ArrayList<>();

        for (Vocabulary word : questionWords) {
            Map<String, Object> question = new HashMap<>();
            question.put("vocabularyId", word.getId());
            question.put("quizType", quizType);

            List<String> options = generateOptions(word, vocab, quizType);
            String correctAnswer = getCorrectAnswer(word, quizType);

            question.put("question", getQuestion(word, quizType));
            question.put("options", options);
            question.put("correctAnswer", correctAnswer);
            question.put("kanji", word.getKanji());
            question.put("furigana", word.getFurigana());
            question.put("englishMeaning", word.getEnglishMeaning());
            questions.add(question);
        }

        return questions;
    }

    @Transactional
    public QuizAnswerResponse submitAnswer(Long userId, Long vocabularyId, String answer, String quizType) {
        Optional<Vocabulary> vocabOpt = vocabularyRepository.findById(vocabularyId);
        if (vocabOpt.isEmpty()) {
            return QuizAnswerResponse.builder().correct(false).correctAnswer("Unknown").build();
        }

        Vocabulary vocab = vocabOpt.get();
        String correctAnswer = getCorrectAnswer(vocab, quizType);
        boolean isCorrect = correctAnswer.equalsIgnoreCase(answer.trim());

        UserVocabularyProgress progress = progressRepository
                .findByUserIdAndVocabularyId(userId, vocabularyId)
                .orElseGet(() -> UserVocabularyProgress.builder()
                        .userId(userId)
                        .vocabularyId(vocabularyId)
                        .masteryLevel(0)
                        .reviewCount(0)
                        .correctCount(0)
                        .incorrectCount(0)
                        .intervalDays(1)
                        .build());

        if (progress.getFirstLearnedDate() == null) {
            progress.setFirstLearnedDate(LocalDate.now());
        }

        int newMastery = srsService.updateMasteryLevel(isCorrect, progress.getMasteryLevel());
        LocalDate nextReview = srsService.calculateNextReview(progress.getMasteryLevel(), isCorrect);

        progress.setMasteryLevel(newMastery);
        progress.setNextReviewDate(nextReview);
        progress.setLastReviewedDate(LocalDate.now());
        progress.setReviewCount(progress.getReviewCount() + 1);
        if (isCorrect) {
            progress.setCorrectCount(progress.getCorrectCount() + 1);
        } else {
            progress.setIncorrectCount(progress.getIncorrectCount() + 1);
        }
        progressRepository.save(progress);

        return QuizAnswerResponse.builder()
                .correct(isCorrect)
                .correctAnswer(correctAnswer)
                .explanation(vocab.getExampleSentence())
                .newMasteryLevel(newMastery)
                .nextReviewDate(nextReview.toString())
                .build();
    }

    public Map<String, Object> getWeeklyQuizStats(Long userId) {
        LocalDateTime weekAgo = LocalDateTime.now().minusDays(7);
        List<QuizAttempt> attempts = quizAttemptRepository.findRecentAttempts(userId, weekAgo);

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalAttempts", attempts.size());

        if (attempts.isEmpty()) {
            stats.put("averageScore", 0.0);
            stats.put("bestScore", 0.0);
            stats.put("totalCorrect", 0);
            stats.put("totalQuestions", 0);
        } else {
            double avg = attempts.stream()
                    .mapToDouble(a -> a.getQuizScore().doubleValue())
                    .average().orElse(0.0);
            double best = attempts.stream()
                    .mapToDouble(a -> a.getQuizScore().doubleValue())
                    .max().orElse(0.0);
            int totalCorrect = attempts.stream().mapToInt(QuizAttempt::getCorrectAnswers).sum();
            int totalQ = attempts.stream().mapToInt(QuizAttempt::getTotalQuestions).sum();

            stats.put("averageScore", Math.round(avg * 10.0) / 10.0);
            stats.put("bestScore", Math.round(best * 10.0) / 10.0);
            stats.put("totalCorrect", totalCorrect);
            stats.put("totalQuestions", totalQ);
        }

        return stats;
    }

    private String getQuestion(Vocabulary word, String quizType) {
        return switch (quizType) {
            case "kanji_to_meaning" -> "What does " + word.getKanji() + " (" + word.getFurigana() + ") mean?";
            case "meaning_to_kanji" -> "Which kanji means: " + word.getEnglishMeaning() + "?";
            case "fill_blank" -> word.getExampleSentence() != null
                    ? word.getExampleSentence().replace(word.getKanji(), "___")
                    : "Fill in the blank: " + word.getKanji();
            default -> "What does " + word.getKanji() + " mean?";
        };
    }

    private String getCorrectAnswer(Vocabulary word, String quizType) {
        return switch (quizType) {
            case "meaning_to_kanji" -> word.getKanji();
            case "kanji_to_furigana" -> word.getFurigana();
            default -> word.getEnglishMeaning();
        };
    }

    private List<String> generateOptions(Vocabulary correct, List<Vocabulary> allVocab, String quizType) {
        List<String> options = new ArrayList<>();
        options.add(getCorrectAnswer(correct, quizType));

        List<Vocabulary> others = allVocab.stream()
                .filter(v -> !v.getId().equals(correct.getId()))
                .collect(Collectors.toList());
        Collections.shuffle(others);

        for (int i = 0; i < Math.min(3, others.size()); i++) {
            options.add(getCorrectAnswer(others.get(i), quizType));
        }

        while (options.size() < 4) {
            options.add("N/A " + options.size());
        }

        Collections.shuffle(options);
        return options;
    }
}
