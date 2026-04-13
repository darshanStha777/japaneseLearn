package com.japaneselearn.controller;

import com.japaneselearn.dto.QuizQuestionDTO;
import com.japaneselearn.model.QuizAttempt;
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

    @GetMapping("/questions")
    public ResponseEntity<List<QuizQuestionDTO>> getQuestions(
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "10") int count) {
        return ResponseEntity.ok(quizService.generateQuestions(type, category, count));
    }

    @PostMapping("/submit-answer")
    public ResponseEntity<Map<String, Object>> submitAnswer(@RequestBody Map<String, Object> request) {
        Long vocabularyId = Long.valueOf(request.get("vocabularyId").toString());
        String selectedAnswer = (String) request.get("selectedAnswer");
        String quizType = (String) request.getOrDefault("quizType", "multiple_choice");
        return ResponseEntity.ok(quizService.submitAnswer(vocabularyId, selectedAnswer, quizType));
    }

    @PostMapping("/save-result")
    public ResponseEntity<QuizAttempt> saveResult(@RequestBody Map<String, Object> request) {
        String quizType = (String) request.getOrDefault("quizType", "multiple_choice");
        int totalQuestions = ((Number) request.getOrDefault("totalQuestions", 10)).intValue();
        int correctAnswers = ((Number) request.getOrDefault("correctAnswers", 0)).intValue();
        String category = (String) request.get("category");
        int duration = ((Number) request.getOrDefault("durationSeconds", 0)).intValue();
        
        return ResponseEntity.ok(quizService.saveQuizResult(quizType, totalQuestions, correctAnswers, category, duration));
    }

    @GetMapping("/history")
    public ResponseEntity<List<QuizAttempt>> getHistory() {
        return ResponseEntity.ok(quizService.getHistory());
    }

    @PostMapping("/generate-mock")
    public ResponseEntity<List<QuizQuestionDTO>> generateMock() {
        return ResponseEntity.ok(quizService.generateQuestions("multiple_choice", null, 30));
    }
}
