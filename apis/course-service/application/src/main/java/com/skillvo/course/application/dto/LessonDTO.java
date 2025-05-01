package com.skillvo.course.application.dto;

import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LessonDTO {
    private UUID lessonId;
    private String title;
    private String description;
    private String content;
    private Integer order;
    private Integer duration;
    private String videoUrl;
    private String thumbnailUrl;
} 