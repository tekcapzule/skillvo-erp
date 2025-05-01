package com.skillvo.course.api.dto;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class LessonDTO {
    String id;
    String title;
    String description;
    String content;
    Integer order;
    Integer duration;
    String videoUrl;
    String thumbnailUrl;
} 