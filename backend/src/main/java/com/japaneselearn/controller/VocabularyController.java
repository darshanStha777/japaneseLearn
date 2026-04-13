package com.japaneselearn.controller;

import com.japaneselearn.dto.VocabularyDTO;
import com.japaneselearn.service.VocabularyService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vocab")
@RequiredArgsConstructor
public class VocabularyController {

    private final VocabularyService vocabularyService;

    @GetMapping
    public ResponseEntity<Page<VocabularyDTO>> getAllVocabulary(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(vocabularyService.getAllVocabulary(page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<VocabularyDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(vocabularyService.getById(id));
    }

    @GetMapping("/today")
    public ResponseEntity<List<VocabularyDTO>> getTodayVocabulary() {
        return ResponseEntity.ok(vocabularyService.getTodayVocabulary(1L));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<VocabularyDTO>> getByCategory(@PathVariable String category) {
        return ResponseEntity.ok(vocabularyService.getByCategory(category));
    }

    @GetMapping("/search")
    public ResponseEntity<List<VocabularyDTO>> search(@RequestParam String keyword) {
        return ResponseEntity.ok(vocabularyService.search(keyword));
    }
}
