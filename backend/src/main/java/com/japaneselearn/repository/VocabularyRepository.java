package com.japaneselearn.repository;

import com.japaneselearn.model.Vocabulary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VocabularyRepository extends JpaRepository<Vocabulary, Long> {
    
    Page<Vocabulary> findByCategory(String category, Pageable pageable);
    
    List<Vocabulary> findByCategory(String category);
    
    @Query("SELECT v FROM Vocabulary v WHERE " +
           "LOWER(v.kanji) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(v.furigana) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(v.englishMeaning) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Vocabulary> searchByKeyword(@Param("keyword") String keyword);
    
    @Query("SELECT v FROM Vocabulary v ORDER BY v.frequencyRank ASC")
    List<Vocabulary> findByOrderByFrequencyRankAsc(Pageable pageable);
    
    @Query("SELECT v FROM Vocabulary v WHERE v.difficultyLevel <= :maxDifficulty ORDER BY v.frequencyRank ASC")
    List<Vocabulary> findByDifficultyLevelLessThanEqualOrderByFrequencyRankAsc(
        @Param("maxDifficulty") Integer maxDifficulty, Pageable pageable);
    
    List<Vocabulary> findByJlptLevel(String jlptLevel);
    
    long countByCategory(String category);
    
    @Query("SELECT DISTINCT v.category FROM Vocabulary v WHERE v.category IS NOT NULL")
    List<String> findDistinctCategories();
}
