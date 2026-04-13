package com.japaneselearn.repository;

import com.japaneselearn.model.DailySession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface DailySessionRepository extends JpaRepository<DailySession, Long> {
    
    Optional<DailySession> findByUserIdAndSessionDate(Long userId, LocalDate sessionDate);
    
    List<DailySession> findByUserIdOrderBySessionDateDesc(Long userId);
    
    @Query("SELECT s FROM DailySession s WHERE s.userId = :userId AND s.sessionDate >= :fromDate ORDER BY s.sessionDate ASC")
    List<DailySession> findByUserIdAndSessionDateAfter(@Param("userId") Long userId, @Param("fromDate") LocalDate fromDate);
    
    @Query("SELECT SUM(s.wordsStudied) FROM DailySession s WHERE s.userId = :userId AND s.sessionDate >= :fromDate")
    Long sumWordsStudiedAfter(@Param("userId") Long userId, @Param("fromDate") LocalDate fromDate);
}
