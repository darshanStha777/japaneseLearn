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
        List<QuizQuestionDTO> questions = new ArrayList<>();
        for (Vocabulary vocab : selectedVocab) {
            questions.add(createQuestion(vocab, allVocab, type));
        }
        return questions;
    }

    private QuizQuestionDTO createQuestion(Vocabulary vocab, List<Vocabulary> allVocab, String type) {
        String quizType = (type == null || type.isBlank()) ? "multiple_choice" : type;
        List<String> options = "similar_words".equals(quizType)
            ? buildSimilarMeaningOptions(vocab, allVocab)
            : buildBasicOptions(vocab, allVocab);

        String questionText = "similar_words".equals(quizType)
            ? "Choose the closest meaning for " + vocab.getKanji() + " (" + vocab.getFurigana() + ")."
            : "multiple_choice".equals(quizType)
            ? "What is the meaning of " + vocab.getKanji() + " (" + vocab.getFurigana() + ")?"
            : "Choose the correct meaning for: " + vocab.getKanji();

        return QuizQuestionDTO.builder()
            .id(vocab.getId())
            .type(quizType)
            .question(questionText)
            .kanji(vocab.getKanji())
            .furigana(vocab.getFurigana())
            .englishMeaning(vocab.getEnglishMeaning())
            .options(options)
            .correctAnswer(vocab.getEnglishMeaning())
            .exampleSentence(vocab.getExampleSentence())
            .sentenceEnglish(vocab.getSentenceEnglish())
            .similarWords(extractSimilarWords(vocab, allVocab))
            .learningTip(buildLearningTip(vocab))
            .build();
    }

    private List<String> buildBasicOptions(Vocabulary vocab, List<Vocabulary> allVocab) {
        List<String> wrongOptions = allVocab.stream()
            .filter(v -> !v.getId().equals(vocab.getId()))
            .map(Vocabulary::getEnglishMeaning)
            .filter(Objects::nonNull)
            .distinct()
            .collect(Collectors.toList());
        Collections.shuffle(wrongOptions);

        List<String> options = new ArrayList<>(wrongOptions.subList(0, Math.min(3, wrongOptions.size())));
        options.add(vocab.getEnglishMeaning());
        Collections.shuffle(options);
        return options;
    }

    private List<String> buildSimilarMeaningOptions(Vocabulary vocab, List<Vocabulary> allVocab) {
        List<String> candidates = allVocab.stream()
            .filter(v -> !v.getId().equals(vocab.getId()))
            .filter(v -> Objects.equals(v.getCategory(), vocab.getCategory())
                || Objects.equals(v.getPartOfSpeech(), vocab.getPartOfSpeech()))
            .map(Vocabulary::getEnglishMeaning)
            .filter(Objects::nonNull)
            .distinct()
            .collect(Collectors.toList());

        if (candidates.size() < 3) {
            candidates = allVocab.stream()
                .filter(v -> !v.getId().equals(vocab.getId()))
                .map(Vocabulary::getEnglishMeaning)
                .filter(Objects::nonNull)
                .distinct()
                .collect(Collectors.toList());
        }

        Collections.shuffle(candidates);
        List<String> options = new ArrayList<>(candidates.stream().limit(3).toList());
        options.add(vocab.getEnglishMeaning());
        Collections.shuffle(options);
        return options;
    }

    private List<String> extractSimilarWords(Vocabulary vocab, List<Vocabulary> allVocab) {
        if (vocab.getRelatedWords() != null && !vocab.getRelatedWords().isBlank()) {
            return Arrays.stream(vocab.getRelatedWords().split(","))
                .map(String::trim)
                .filter(word -> !word.isBlank())
                .limit(3)
                .collect(Collectors.toList());
        }

        return allVocab.stream()
            .filter(v -> !v.getId().equals(vocab.getId()))
            .filter(v -> Objects.equals(v.getCategory(), vocab.getCategory()))
            .map(Vocabulary::getKanji)
            .filter(Objects::nonNull)
            .limit(3)
            .collect(Collectors.toList());
    }

    private String buildLearningTip(Vocabulary vocab) {
        if (vocab.getWordFormation() != null && !vocab.getWordFormation().isBlank()) {
            return "Word pattern tip: " + vocab.getWordFormation();
        }
        return "School method: say Kanji → Hiragana → English aloud 3 times, then make one short sentence.";
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
