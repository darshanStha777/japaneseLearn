package com.japaneselearn.controller;

import com.japaneselearn.dto.ProgressDTO;
import com.japaneselearn.service.ProgressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/progress")
@RequiredArgsConstructor
public class ProgressController {

    private final ProgressService progressService;

    @GetMapping("/daily")
    public ResponseEntity<Map<String, Object>> getDailyProgress() {
        return ResponseEntity.ok(Map.of("message", "Daily progress retrieved"));
    }

    @GetMapping("/readiness")
    public ResponseEntity<Map<String, Object>> getReadinessScore() {
        return ResponseEntity.ok(progressService.getReadinessScore());
    }

    @GetMapping("/weak-areas")
    public ResponseEntity<List<Map<String, Object>>> getWeakAreas() {
        return ResponseEntity.ok(progressService.getWeakAreas());
    }

    @GetMapping("/statistics")
    public ResponseEntity<ProgressDTO> getStatistics() {
        return ResponseEntity.ok(progressService.getStatistics());
    }

    @GetMapping("/heatmap")
    public ResponseEntity<List<Map<String, Object>>> getHeatmap() {
        return ResponseEntity.ok(progressService.getHeatmapData());
    }

    @GetMapping("/learning-velocity")
    public ResponseEntity<Map<String, Object>> getLearningVelocity() {
        return ResponseEntity.ok(progressService.getLearningVelocity());
    }
}
