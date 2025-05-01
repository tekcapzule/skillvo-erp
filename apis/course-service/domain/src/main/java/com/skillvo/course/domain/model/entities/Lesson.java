package com.skillvo.course.domain.model.entities;

import com.skillvo.course.domain.model.enums.ContentType;
import com.skillvo.course.domain.model.valueobjects.Content;
import com.skillvo.course.domain.model.valueobjects.ContentFactory;
import lombok.Getter;
import lombok.Setter;
import java.util.UUID;

@Getter
@Setter
public class Lesson extends BaseEntity {
    private UUID lessonId;
    private String title;
    private Float duration;
    private String coverImageUrl;
    private Content content;
    private boolean mandatory;

    public void setContent(ContentType contentType, Object contentData) {
        this.content = ContentFactory.createContent(contentType, contentData);
    }
} 