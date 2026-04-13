package com.japaneselearn.controller;

import com.japaneselearn.dto.CardResultDTO;
import com.japaneselearn.dto.StudyPlanDTO;
import com.japaneselearn.dto.VocabularyDTO;
import com.japaneselearn.service.StudyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/study")
@RequiredArgsConstructor
public class StudyController {

    private final StudyService studyService;

    @GetMapping("/plan")
    public ResponseEntity<StudyPlanDTO> getStudyPlan() {
        return ResponseEntity.ok(studyService.generateStudyPlan());
    }

    @PostMapping("/mark-learned")
    public ResponseEntity<Map<String, String>> markLearned(@RequestBody CardResultDTO request) {
        studyService.markLearned(request.getVocabularyId(), request.getResult());
        return ResponseEntity.ok(Map.of("status", "success", "message", "Progress updated"));
    }

    @GetMapping("/due-for-review")
    public ResponseEntity<List<VocabularyDTO>> getDueForReview() {
        return ResponseEntity.ok(studyService.getDueForReview());
    }

    @PostMapping("/submit-card-result")
    public ResponseEntity<Map<String, String>> submitCardResult(@RequestBody CardResultDTO request) {
        studyService.markLearned(request.getVocabularyId(), request.getResult());
        return ResponseEntity.ok(Map.of("status", "success"));
    }

    @GetMapping("/today-progress")
    public ResponseEntity<Map<String, Object>> getTodayProgress() {
        return ResponseEntity.ok(studyService.getTodayProgress());
    }
}
