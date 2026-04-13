package com.japaneselearn.controller;

import com.japaneselearn.dto.ProgressResponse;
import com.japaneselearn.service.ProgressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class ProgressController {

    private final ProgressService progressService;

    @GetMapping("/api/progress/daily")
    public ResponseEntity<ProgressResponse> getDailyProgress(
            @RequestParam(defaultValue = "1") Long userId) {
        return ResponseEntity.ok(progressService.getDailyProgress(userId));
    }

    @GetMapping("/api/progress/readiness")
    public ResponseEntity<Map<String, Object>> getReadiness(
            @RequestParam(defaultValue = "1") Long userId) {
        double score = progressService.getReadinessScore(userId);
        return ResponseEntity.ok(Map.of(
                "readinessScore", Math.round(score * 10.0) / 10.0,
                "totalN2Words", 650,
                "message", score >= 80 ? "You are ready for N2!" : "Keep studying!"
        ));
    }

    @GetMapping("/api/progress/weak-areas")
    public ResponseEntity<List<Map<String, Object>>> getWeakAreas(
            @RequestParam(defaultValue = "1") Long userId) {
        return ResponseEntity.ok(progressService.getWeakAreas(userId));
    }

    @GetMapping("/api/stats/learning-velocity")
    public ResponseEntity<Map<String, Object>> getLearningVelocity(
            @RequestParam(defaultValue = "1") Long userId) {
        double velocity = progressService.getLearningVelocity(userId);
        return ResponseEntity.ok(Map.of(
                "wordsPerDay", velocity,
                "projectedCompletion", velocity > 0 ? (int) Math.ceil(650.0 / velocity) : 999
        ));
    }
}
