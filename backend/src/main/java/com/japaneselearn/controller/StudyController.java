package com.japaneselearn.controller;

import com.japaneselearn.dto.StudyRequest;
import com.japaneselearn.dto.VocabResponse;
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

    @PostMapping("/mark-learned")
    public ResponseEntity<Map<String, Object>> markLearned(@RequestBody StudyRequest request) {
        Long userId = request.getUserId() != null ? request.getUserId() : 1L;
        boolean wasCorrect = request.getWasCorrect() != null ? request.getWasCorrect() : true;
        return ResponseEntity.ok(studyService.markLearned(userId, request.getVocabularyId(), wasCorrect));
    }

    @GetMapping("/due-review")
    public ResponseEntity<List<VocabResponse>> getDueForReview(
            @RequestParam(defaultValue = "1") Long userId) {
        return ResponseEntity.ok(studyService.getDueForReview(userId));
    }

    @GetMapping("/daily")
    public ResponseEntity<Map<String, Object>> getDailyProgress(
            @RequestParam(defaultValue = "1") Long userId) {
        return ResponseEntity.ok(studyService.getDailyProgress(userId));
    }
}
