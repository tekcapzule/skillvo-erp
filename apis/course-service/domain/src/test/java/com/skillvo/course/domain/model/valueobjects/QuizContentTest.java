package com.skillvo.course.domain.model.valueobjects;

import com.skillvo.course.domain.model.enums.ContentType;
import com.skillvo.course.domain.model.enums.AnswerChoice;
import org.junit.jupiter.api.Test;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;

class QuizContentTest {

    @Test
    void shouldCreateQuizContent() {
        List<AnswerOption> options = List.of(
            new AnswerOption("Option A", true),
            new AnswerOption("Option B", false)
        );
        QuizItem quizItem = new QuizItem("What is the capital of France?", options, AnswerChoice.SINGLE);
        QuizContent content = new QuizContent(List.of(quizItem));
        
        assertEquals(ContentType.QUIZ, content.getContentType());
        assertEquals(1, content.getQuizItems().size());
        assertEquals("What is the capital of France?", content.getQuizItems().get(0).getQuestion());
    }

    @Test
    void shouldNotAllowNullQuizItems() {
        assertThrows(NullPointerException.class, () -> {
            new QuizContent(null);
        });
    }

    @Test
    void shouldNotAllowEmptyQuizItems() {
        assertThrows(IllegalArgumentException.class, () -> {
            new QuizContent(List.of());
        });
    }
} 