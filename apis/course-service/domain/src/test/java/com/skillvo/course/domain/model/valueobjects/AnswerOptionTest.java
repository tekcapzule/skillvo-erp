package com.skillvo.course.domain.model.valueobjects;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class AnswerOptionTest {

    @Test
    void shouldCreateAnswerOption() {
        AnswerOption option = new AnswerOption("Option A", true);
        assertEquals("Option A", option.getAnswer());
        assertTrue(option.isCorrect());
    }

    @Test
    void shouldCreateAnswerOptionWithFalse() {
        AnswerOption option = new AnswerOption("Option B", false);
        assertEquals("Option B", option.getAnswer());
        assertFalse(option.isCorrect());
    }

    @Test
    void shouldNotAllowNullAnswer() {
        assertThrows(NullPointerException.class, () -> {
            new AnswerOption(null, true);
        });
    }

    @Test
    void shouldNotAllowEmptyAnswer() {
        assertThrows(IllegalArgumentException.class, () -> {
            new AnswerOption("", true);
        });
    }
} 