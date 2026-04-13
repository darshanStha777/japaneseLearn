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

    @Query("SELECT p FROM UserVocabularyProgress p WHERE p.userId = :userId AND p.nextReviewDate <= :today")
    List<UserVocabularyProgress> findDueForReview(@Param("userId") Long userId, @Param("today") LocalDate today);

    @Query("SELECT COUNT(p) FROM UserVocabularyProgress p WHERE p.userId = :userId AND p.masteryLevel >= 1")
    Long countLearnedByUserId(@Param("userId") Long userId);

    @Query("SELECT COUNT(p) FROM UserVocabularyProgress p WHERE p.userId = :userId AND p.masteryLevel >= 3")
    Long countMasteredByUserId(@Param("userId") Long userId);

    @Query("SELECT p FROM UserVocabularyProgress p WHERE p.userId = :userId AND p.firstLearnedDate = :today")
    List<UserVocabularyProgress> findLearnedToday(@Param("userId") Long userId, @Param("today") LocalDate today);

    @Query("SELECT p.vocabularyId FROM UserVocabularyProgress p WHERE p.userId = :userId")
    List<Long> findVocabIdsByUserId(@Param("userId") Long userId);
}
