package com.skillvo.course.domain.model.enums;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class AnswerChoiceTest {

    @Test
    void shouldHaveCorrectValues() {
        AnswerChoice[] values = AnswerChoice.values();
        assertEquals(2, values.length);
        assertEquals(AnswerChoice.SINGLE, values[0]);
        assertEquals(AnswerChoice.MULTIPLE, values[1]);
    }

    @Test
    void shouldConvertFromString() {
        assertEquals(AnswerChoice.SINGLE, AnswerChoice.valueOf("SINGLE"));
        assertEquals(AnswerChoice.MULTIPLE, AnswerChoice.valueOf("MULTIPLE"));
    }

    @Test
    void shouldThrowExceptionForInvalidValue() {
        assertThrows(IllegalArgumentException.class, () -> {
            AnswerChoice.valueOf("INVALID");
        });
    }
} 