package com.skillvo.course.domain.model.events;

import lombok.Getter;
import java.util.List;
import java.util.UUID;

@Getter
public class CourseCreated extends DomainEvent {
    private final UUID courseId;
    private final String tenantId;
    private final String title;
    private final String description;
    private final String topicCode;
    private final String level;
    private final String learningMode;
    private final List<String> authors;

    public CourseCreated(UUID courseId, String tenantId, String title, String description,
                        String topicCode, String level, String learningMode, List<String> authors) {
        super();
        this.courseId = courseId;
        this.tenantId = tenantId;
        this.title = title;
        this.description = description;
        this.topicCode = topicCode;
        this.level = level;
        this.learningMode = learningMode;
        this.authors = authors;
    }
} 