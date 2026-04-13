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

    @Query("SELECT d FROM DailySession d WHERE d.userId = :userId AND d.sessionDate >= :startDate ORDER BY d.sessionDate DESC")
    List<DailySession> findRecentSessions(@Param("userId") Long userId, @Param("startDate") LocalDate startDate);
}
