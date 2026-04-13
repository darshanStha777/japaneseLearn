package com.japaneselearn.repository;

import com.japaneselearn.model.Vocabulary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VocabularyRepository extends JpaRepository<Vocabulary, Long> {

    List<Vocabulary> findByCategory(String category);

    List<Vocabulary> findByJlptLevel(String jlptLevel);

    @Query("SELECT v FROM Vocabulary v WHERE LOWER(v.kanji) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(v.furigana) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(v.englishMeaning) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Vocabulary> searchVocabulary(@Param("query") String query);

    @Query("SELECT v FROM Vocabulary v ORDER BY v.frequencyRank ASC NULLS LAST")
    List<Vocabulary> findAllOrderByFrequency();

    @Query("SELECT v FROM Vocabulary v WHERE v.category = :category ORDER BY v.frequencyRank ASC NULLS LAST")
    List<Vocabulary> findByCategoryOrderByFrequency(@Param("category") String category);
}
