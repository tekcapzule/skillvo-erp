package com.skillvo.course.domain.model.valueobjects;

import com.skillvo.course.domain.model.enums.ContentType;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class ContentTest {

    @Test
    void shouldCreateContent() {
        Content content = new TestContent(ContentType.VIDEO);
        assertEquals(ContentType.VIDEO, content.getContentType());
    }

    @Test
    void shouldNotAllowNullContentType() {
        assertThrows(NullPointerException.class, () -> {
            new TestContent(null);
        });
    }

    private static class TestContent extends Content {
        public TestContent(ContentType contentType) {
            super(contentType);
        }
    }
} 