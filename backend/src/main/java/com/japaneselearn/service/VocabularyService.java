package com.japaneselearn.service;

import com.japaneselearn.dto.VocabResponse;
import com.japaneselearn.model.Vocabulary;
import com.japaneselearn.model.UserVocabularyProgress;
import com.japaneselearn.repository.VocabularyRepository;
import com.japaneselearn.repository.UserVocabularyProgressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VocabularyService {

    private final VocabularyRepository vocabularyRepository;
    private final UserVocabularyProgressRepository progressRepository;

    public List<VocabResponse> getTodayVocab(Long userId) {
        List<Vocabulary> allVocab = vocabularyRepository.findAllOrderByFrequency();
        List<Long> learnedIds = progressRepository.findVocabIdsByUserId(userId);

        List<Vocabulary> newWords = allVocab.stream()
                .filter(v -> !learnedIds.contains(v.getId()))
                .limit(50)
                .collect(Collectors.toList());

        return newWords.stream()
                .map(v -> toResponse(v, null))
                .collect(Collectors.toList());
    }

    public List<VocabResponse> getByCategory(String category, Long userId) {
        List<Vocabulary> vocab = vocabularyRepository.findByCategoryOrderByFrequency(category);
        List<Long> learnedIds = progressRepository.findVocabIdsByUserId(userId);

        return vocab.stream()
                .map(v -> {
                    Optional<UserVocabularyProgress> progress = progressRepository
                            .findByUserIdAndVocabularyId(userId, v.getId());
                    return toResponse(v, progress.orElse(null));
                })
                .collect(Collectors.toList());
    }

    public Optional<VocabResponse> getById(Long id, Long userId) {
        return vocabularyRepository.findById(id).map(v -> {
            Optional<UserVocabularyProgress> progress = progressRepository
                    .findByUserIdAndVocabularyId(userId, v.getId());
            return toResponse(v, progress.orElse(null));
        });
    }

    public List<VocabResponse> searchVocab(String query) {
        return vocabularyRepository.searchVocabulary(query).stream()
                .map(v -> toResponse(v, null))
                .collect(Collectors.toList());
    }

    private VocabResponse toResponse(Vocabulary v, UserVocabularyProgress progress) {
        return VocabResponse.builder()
                .id(v.getId())
                .kanji(v.getKanji())
                .furigana(v.getFurigana())
                .englishMeaning(v.getEnglishMeaning())
                .partOfSpeech(v.getPartOfSpeech())
                .jlptLevel(v.getJlptLevel())
                .frequencyRank(v.getFrequencyRank())
                .difficultyLevel(v.getDifficultyLevel())
                .exampleSentence(v.getExampleSentence())
                .sentenceEnglish(v.getSentenceEnglish())
                .wordFormation(v.getWordFormation())
                .relatedWords(v.getRelatedWords())
                .synonyms(v.getSynonyms())
                .antonyms(v.getAntonyms())
                .category(v.getCategory())
                .masteryLevel(progress != null ? progress.getMasteryLevel() : 0)
                .nextReviewDate(progress != null && progress.getNextReviewDate() != null
                        ? progress.getNextReviewDate().toString() : null)
                .build();
    }
}
