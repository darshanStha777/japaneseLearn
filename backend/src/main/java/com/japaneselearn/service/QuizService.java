package com.japaneselearn.service;

import com.japaneselearn.dto.QuizQuestionDTO;
import com.japaneselearn.model.QuizAttempt;
import com.japaneselearn.model.Vocabulary;
import com.japaneselearn.repository.QuizAttemptRepository;
import com.japaneselearn.repository.VocabularyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuizService {

    private final VocabularyRepository vocabularyRepository;
    private final QuizAttemptRepository quizAttemptRepository;
    private final Random random = new Random();

    public List<QuizQuestionDTO> generateQuestions(String type, String category, int count) {
        List<Vocabulary> allVocab;
        if (category != null && !category.isEmpty()) {
            allVocab = vocabularyRepository.findByCategory(category);
        } else {
            allVocab = vocabularyRepository.findByOrderByFrequencyRankAsc(PageRequest.of(0, 200));
        }

        if (allVocab.size() < 4) {
            allVocab = vocabularyRepository.findAll();
        }

        Collections.shuffle(allVocab);
        List<Vocabulary> selectedVocab = allVocab.stream().limit(count).collect(Collectors.toList());

        return selectedVocab.stream()
            .map(v -> createQuestion(v, allVocab, type))
            .collect(Collectors.toList());
    }

    private QuizQuestionDTO createQuestion(Vocabulary vocab, List<Vocabulary> allVocab, String type) {
        List<String> wrongOptions = allVocab.stream()
            .filter(v -> !v.getId().equals(vocab.getId()))
            .map(Vocabulary::getEnglishMeaning)
            .collect(Collectors.toList());
        Collections.shuffle(wrongOptions);
        
        List<String> options = new ArrayList<>(wrongOptions.subList(0, Math.min(3, wrongOptions.size())));
        options.add(vocab.getEnglishMeaning());
        Collections.shuffle(options);

        String questionText = "multiple_choice".equals(type)
            ? "What is the meaning of " + vocab.getKanji() + " (" + vocab.getFurigana() + ")?"
            : "Choose the correct meaning for: " + vocab.getKanji();

        return QuizQuestionDTO.builder()
            .id(vocab.getId())
            .type(type != null ? type : "multiple_choice")
            .question(questionText)
            .kanji(vocab.getKanji())
            .furigana(vocab.getFurigana())
            .englishMeaning(vocab.getEnglishMeaning())
            .options(options)
            .correctAnswer(vocab.getEnglishMeaning())
            .exampleSentence(vocab.getExampleSentence())
            .sentenceEnglish(vocab.getSentenceEnglish())
            .build();
    }

    public Map<String, Object> submitAnswer(Long vocabularyId, String selectedAnswer, String quizType) {
        Vocabulary vocab = vocabularyRepository.findById(vocabularyId)
            .orElseThrow(() -> new IllegalArgumentException("Vocabulary not found: " + vocabularyId));
        
        boolean isCorrect = vocab.getEnglishMeaning().equalsIgnoreCase(selectedAnswer);
        
        return Map.of(
            "isCorrect", isCorrect,
            "correctAnswer", vocab.getEnglishMeaning(),
            "kanji", vocab.getKanji(),
            "furigana", vocab.getFurigana(),
            "exampleSentence", vocab.getExampleSentence() != null ? vocab.getExampleSentence() : ""
        );
    }

    public QuizAttempt saveQuizResult(String quizType, int totalQuestions, int correctAnswers, 
                                       String category, int durationSeconds) {
        double score = totalQuestions > 0 ? (double) correctAnswers / totalQuestions * 100 : 0;
        
        QuizAttempt attempt = QuizAttempt.builder()
            .userId(1L)
            .quizType(quizType)
            .totalQuestions(totalQuestions)
            .correctAnswers(correctAnswers)
            .quizScore(BigDecimal.valueOf(score).setScale(2, RoundingMode.HALF_UP))
            .category(category)
            .durationSeconds(durationSeconds)
            .build();
        
        return quizAttemptRepository.save(attempt);
    }

    public List<QuizAttempt> getHistory() {
        return quizAttemptRepository.findByUserIdOrderByAttemptedAtDesc(1L);
    }
}
