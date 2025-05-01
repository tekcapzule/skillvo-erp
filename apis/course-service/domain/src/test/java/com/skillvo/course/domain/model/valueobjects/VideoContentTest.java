package com.skillvo.course.domain.model.valueobjects;

import com.skillvo.course.domain.model.enums.ContentType;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class VideoContentTest {

    @Test
    void shouldCreateVideoContent() {
        String videoUrl = "https://example.com/video.mp4";
        VideoContent content = new VideoContent(videoUrl);
        
        assertEquals(ContentType.VIDEO, content.getContentType());
        assertEquals(videoUrl, content.getVideoUrl());
    }

    @Test
    void shouldNotAllowNullVideoUrl() {
        assertThrows(NullPointerException.class, () -> {
            new VideoContent(null);
        });
    }

    @Test
    void shouldNotAllowEmptyVideoUrl() {
        assertThrows(IllegalArgumentException.class, () -> {
            new VideoContent("");
        });
    }
} 