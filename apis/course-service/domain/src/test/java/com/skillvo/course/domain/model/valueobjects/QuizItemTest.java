package com.skillvo.course.domain.model.valueobjects;

import com.skillvo.course.domain.model.enums.AnswerChoice;
import org.junit.jupiter.api.Test;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;

class QuizItemTest {

    @Test
    void shouldCreateQuizItem() {
        List<AnswerOption> options = List.of(
            new AnswerOption("Option A", true),
            new AnswerOption("Option B", false)
        );
        QuizItem quizItem = new QuizItem("What is the capital of France?", options, AnswerChoice.SINGLE);
        
        assertEquals("What is the capital of France?", quizItem.getQuestion());
        assertEquals(2, quizItem.getOptions().size());
        assertEquals("Option A", quizItem.getOptions().get(0).getAnswer());
        assertTrue(quizItem.getOptions().get(0).isCorrect());
        assertEquals("Option B", quizItem.getOptions().get(1).getAnswer());
        assertFalse(quizItem.getOptions().get(1).isCorrect());
        assertEquals(AnswerChoice.SINGLE, quizItem.getAnswerChoice());
    }

    @Test
    void shouldCreateQuizItemWithMultipleChoice() {
        List<AnswerOption> options = List.of(
            new AnswerOption("Option A", true),
            new AnswerOption("Option B", true),
            new AnswerOption("Option C", false)
        );
        QuizItem quizItem = new QuizItem("Which are programming languages?", options, AnswerChoice.MULTIPLE);
        
        assertEquals("Which are programming languages?", quizItem.getQuestion());
        assertEquals(3, quizItem.getOptions().size());
        assertEquals(AnswerChoice.MULTIPLE, quizItem.getAnswerChoice());
    }

    @Test
    void shouldNotAllowNullQuestion() {
        List<AnswerOption> options = List.of(new AnswerOption("Option A", true));
        assertThrows(NullPointerException.class, () -> {
            new QuizItem(null, options, AnswerChoice.SINGLE);
        });
    }

    @Test
    void shouldNotAllowEmptyQuestion() {
        List<AnswerOption> options = List.of(new AnswerOption("Option A", true));
        assertThrows(IllegalArgumentException.class, () -> {
            new QuizItem("", options, AnswerChoice.SINGLE);
        });
    }

    @Test
    void shouldNotAllowNullOptions() {
        assertThrows(NullPointerException.class, () -> {
            new QuizItem("Question", null, AnswerChoice.SINGLE);
        });
    }

    @Test
    void shouldNotAllowEmptyOptions() {
        assertThrows(IllegalArgumentException.class, () -> {
            new QuizItem("Question", List.of(), AnswerChoice.SINGLE);
        });
    }

    @Test
    void shouldNotAllowNullAnswerChoice() {
        List<AnswerOption> options = List.of(new AnswerOption("Option A", true));
        assertThrows(NullPointerException.class, () -> {
            new QuizItem("Question", options, null);
        });
    }
} 