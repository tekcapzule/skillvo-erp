package com.skillvo.course.domain.model.valueobjects;

import com.skillvo.course.domain.model.enums.ContentType;
import lombok.Getter;

@Getter
public abstract class Content {
    private final ContentType contentType;

    protected Content(ContentType contentType) {
        if (contentType == null) {
            throw new NullPointerException("Content type cannot be null");
        }
        this.contentType = contentType;
    }
} 