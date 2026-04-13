package com.japaneselearn.repository;

import com.japaneselearn.model.QuizAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {
    
    List<QuizAttempt> findByUserIdOrderByAttemptedAtDesc(Long userId);
    
    List<QuizAttempt> findByUserIdAndQuizTypeOrderByAttemptedAtDesc(Long userId, String quizType);
}
