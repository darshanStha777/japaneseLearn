package com.japaneselearn.service;

import com.japaneselearn.dto.VocabularyDTO;
import com.japaneselearn.exception.ResourceNotFoundException;
import com.japaneselearn.model.Vocabulary;
import com.japaneselearn.repository.UserVocabularyProgressRepository;
import com.japaneselearn.repository.VocabularyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VocabularyService {

    private final VocabularyRepository vocabularyRepository;
    private final UserVocabularyProgressRepository progressRepository;

    public Page<VocabularyDTO> getAllVocabulary(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return vocabularyRepository.findAll(pageable).map(this::toDTO);
    }

    public VocabularyDTO getById(Long id) {
        Vocabulary vocab = vocabularyRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Vocabulary", id));
        return toDTO(vocab);
    }

    public List<VocabularyDTO> getTodayVocabulary(Long userId) {
        List<Vocabulary> dueWords = progressRepository.findDueForReview(userId, java.time.LocalDate.now())
            .stream()
            .map(p -> p.getVocabulary())
            .collect(Collectors.toList());

        Pageable pageable = PageRequest.of(0, 80);
        List<Vocabulary> allWords = vocabularyRepository.findByOrderByFrequencyRankAsc(pageable);
        
        List<Vocabulary> todayWords = dueWords;
        for (Vocabulary v : allWords) {
            if (todayWords.size() >= 80) break;
            if (dueWords.stream().noneMatch(w -> w.getId().equals(v.getId()))) {
                todayWords.add(v);
            }
        }

        return todayWords.stream()
            .limit(80)
            .map(v -> {
                VocabularyDTO dto = toDTO(v);
                progressRepository.findByUserIdAndVocabularyId(userId, v.getId())
                    .ifPresent(p -> dto.setMasteryLevel(p.getMasteryLevel()));
                return dto;
            })
            .collect(Collectors.toList());
    }

    public List<VocabularyDTO> getByCategory(String category) {
        return vocabularyRepository.findByCategory(category)
            .stream()
            .map(this::toDTO)
            .collect(Collectors.toList());
    }

    public List<VocabularyDTO> search(String keyword) {
        return vocabularyRepository.searchByKeyword(keyword)
            .stream()
            .map(this::toDTO)
            .collect(Collectors.toList());
    }

    public VocabularyDTO toDTO(Vocabulary vocab) {
        return VocabularyDTO.builder()
            .id(vocab.getId())
            .kanji(vocab.getKanji())
            .furigana(vocab.getFurigana())
            .englishMeaning(vocab.getEnglishMeaning())
            .partOfSpeech(vocab.getPartOfSpeech())
            .jlptLevel(vocab.getJlptLevel())
            .frequencyRank(vocab.getFrequencyRank())
            .difficultyLevel(vocab.getDifficultyLevel())
            .exampleSentence(vocab.getExampleSentence())
            .sentenceEnglish(vocab.getSentenceEnglish())
            .category(vocab.getCategory())
            .relatedWords(vocab.getRelatedWords())
            .synonyms(vocab.getSynonyms())
            .antonyms(vocab.getAntonyms())
            .build();
    }
}
