package com.japaneselearn.repository;

import com.japaneselearn.model.QuizAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {

    List<QuizAttempt> findByUserIdOrderByAttemptedAtDesc(Long userId);

    @Query("SELECT q FROM QuizAttempt q WHERE q.userId = :userId AND q.attemptedAt >= :since ORDER BY q.attemptedAt DESC")
    List<QuizAttempt> findRecentAttempts(@Param("userId") Long userId, @Param("since") LocalDateTime since);
}
