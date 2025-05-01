package com.skillvo.course.domain.model.valueobjects;

import com.skillvo.course.domain.model.enums.ContentType;
import lombok.Getter;

@Getter
public class VideoContent extends Content {
    private final String videoUrl;

    public VideoContent(String videoUrl) {
        super(ContentType.VIDEO);
        if (videoUrl == null) {
            throw new NullPointerException("Video URL cannot be null");
        }
        if (videoUrl.isEmpty()) {
            throw new IllegalArgumentException("Video URL cannot be empty");
        }
        this.videoUrl = videoUrl;
    }
} 