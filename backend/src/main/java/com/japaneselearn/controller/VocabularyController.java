package com.japaneselearn.controller;

import com.japaneselearn.dto.VocabResponse;
import com.japaneselearn.service.VocabularyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vocab")
@RequiredArgsConstructor
public class VocabularyController {

    private final VocabularyService vocabularyService;

    @GetMapping("/today")
    public ResponseEntity<List<VocabResponse>> getTodayVocab(
            @RequestParam(defaultValue = "1") Long userId) {
        return ResponseEntity.ok(vocabularyService.getTodayVocab(userId));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<VocabResponse>> getByCategory(
            @PathVariable String category,
            @RequestParam(defaultValue = "1") Long userId) {
        return ResponseEntity.ok(vocabularyService.getByCategory(category, userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<VocabResponse> getById(
            @PathVariable Long id,
            @RequestParam(defaultValue = "1") Long userId) {
        return vocabularyService.getById(id, userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public ResponseEntity<List<VocabResponse>> search(@RequestParam String q) {
        return ResponseEntity.ok(vocabularyService.searchVocab(q));
    }
}
