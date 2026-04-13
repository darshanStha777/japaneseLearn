package com.japaneselearn.controller;

import com.japaneselearn.dto.QuizAnswerRequest;
import com.japaneselearn.dto.QuizAnswerResponse;
import com.japaneselearn.service.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/quiz")
@RequiredArgsConstructor
public class QuizController {

    private final QuizService quizService;

    @GetMapping("/generate")
    public ResponseEntity<List<Map<String, Object>>> generateQuiz(
            @RequestParam(defaultValue = "1") Long userId,
            @RequestParam(defaultValue = "multiple_choice") String type,
            @RequestParam(defaultValue = "") String category,
            @RequestParam(defaultValue = "10") int count) {
        return ResponseEntity.ok(quizService.generateQuiz(userId, type, category, count));
    }

    @PostMapping("/submit-answer")
    public ResponseEntity<QuizAnswerResponse> submitAnswer(@RequestBody QuizAnswerRequest request) {
        Long userId = request.getUserId() != null ? request.getUserId() : 1L;
        return ResponseEntity.ok(quizService.submitAnswer(
                userId,
                request.getVocabularyId(),
                request.getAnswer(),
                request.getQuizType()
        ));
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats(
            @RequestParam(defaultValue = "1") Long userId) {
        return ResponseEntity.ok(quizService.getWeeklyQuizStats(userId));
    }
}
