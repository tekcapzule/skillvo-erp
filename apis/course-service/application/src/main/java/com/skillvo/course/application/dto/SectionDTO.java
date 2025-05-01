package com.skillvo.course.application.dto;

import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SectionDTO {
    private UUID sectionId;
    private String title;
    private String description;
    private Integer order;
    private Integer duration;
    private List<LessonDTO> lessons;
} 