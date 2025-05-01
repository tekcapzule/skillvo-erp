package com.skillvo.course.domain.model.enums;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class ContentTypeTest {

    @Test
    void shouldHaveCorrectValues() {
        ContentType[] values = ContentType.values();
        assertEquals(3, values.length);
        assertEquals(ContentType.VIDEO, values[0]);
        assertEquals(ContentType.PDF, values[1]);
        assertEquals(ContentType.QUIZ, values[2]);
    }

    @Test
    void shouldConvertFromString() {
        assertEquals(ContentType.VIDEO, ContentType.valueOf("VIDEO"));
        assertEquals(ContentType.PDF, ContentType.valueOf("PDF"));
        assertEquals(ContentType.QUIZ, ContentType.valueOf("QUIZ"));
    }

    @Test
    void shouldThrowExceptionForInvalidValue() {
        assertThrows(IllegalArgumentException.class, () -> {
            ContentType.valueOf("INVALID");
        });
    }
} 