package com.japaneselearn.repository;

import com.japaneselearn.model.UserVocabularyProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserVocabularyProgressRepository extends JpaRepository<UserVocabularyProgress, Long> {
    
    Optional<UserVocabularyProgress> findByUserIdAndVocabularyId(Long userId, Long vocabularyId);
    
    List<UserVocabularyProgress> findByUserId(Long userId);
    
    @Query("SELECT p FROM UserVocabularyProgress p WHERE p.userId = :userId AND p.nextReviewDate <= :date")
    List<UserVocabularyProgress> findDueForReview(@Param("userId") Long userId, @Param("date") LocalDate date);
    
    @Query("SELECT p FROM UserVocabularyProgress p WHERE p.userId = :userId AND p.masteryLevel >= 3")
    List<UserVocabularyProgress> findMasteredByUserId(@Param("userId") Long userId);
    
    long countByUserIdAndMasteryLevelGreaterThanEqual(Long userId, Integer masteryLevel);
    
    @Query("SELECT p.vocabulary.category, AVG(p.masteryLevel) as avgMastery FROM UserVocabularyProgress p " +
           "WHERE p.userId = :userId GROUP BY p.vocabulary.category")
    List<Object[]> findCategoryMasteryStats(@Param("userId") Long userId);
    
    @Query("SELECT COUNT(p) FROM UserVocabularyProgress p WHERE p.userId = :userId AND p.masteryLevel > 0")
    long countLearnedByUserId(@Param("userId") Long userId);
    
    @Query("SELECT SUM(p.correctCount), SUM(p.incorrectCount) FROM UserVocabularyProgress p WHERE p.userId = :userId")
    Object[] findTotalCorrectAndIncorrect(@Param("userId") Long userId);
}
