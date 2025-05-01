package com.skillvo.course.domain.model.valueobjects;

import com.skillvo.course.domain.model.enums.AnswerChoice;
import com.skillvo.course.domain.model.enums.ContentType;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import java.util.List;

class ContentFactoryTest {

    @Test
    void shouldCreateVideoContent() {
        Content content = ContentFactory.createContent(ContentType.VIDEO, "https://example.com/video.mp4");
        assertTrue(content instanceof VideoContent);
        assertEquals("https://example.com/video.mp4", ((VideoContent) content).getVideoUrl());
    }

    @Test
    void shouldCreatePDFContent() {
        Content content = ContentFactory.createContent(ContentType.PDF, "https://example.com/document.pdf");
        assertTrue(content instanceof PDFContent);
        assertEquals("https://example.com/document.pdf", ((PDFContent) content).getPdfUrl());
    }

    @Test
    void shouldCreateQuizContent() {
        List<AnswerOption> options = List.of(
            new AnswerOption("Option A", true),
            new AnswerOption("Option B", false)
        );
        QuizItem quizItem = new QuizItem("What is the capital of France?", options, AnswerChoice.SINGLE);
        Content content = ContentFactory.createContent(ContentType.QUIZ, List.of(quizItem));
        assertTrue(content instanceof QuizContent);
        assertEquals(1, ((QuizContent) content).getQuizItems().size());
        assertEquals("What is the capital of France?", ((QuizContent) content).getQuizItems().get(0).getQuestion());
    }

    @Test
    void shouldThrowExceptionForInvalidContentType() {
        assertThrows(IllegalArgumentException.class, () -> {
            ContentFactory.createContent(null, "invalid");
        });
    }
} 