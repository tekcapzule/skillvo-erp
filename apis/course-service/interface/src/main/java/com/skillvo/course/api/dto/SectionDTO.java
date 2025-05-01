package com.skillvo.course.api.dto;

import lombok.Builder;
import lombok.Value;

import java.util.List;
import java.util.UUID;

@Value
@Builder
public class SectionDTO {
    UUID sectionId;
    String title;
    String description;
    Integer order;
    Integer duration;
    List<LessonDTO> lessons;
} 