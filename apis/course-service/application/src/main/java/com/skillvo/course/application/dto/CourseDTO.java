package com.skillvo.course.application.dto;

import com.skillvo.course.domain.model.enums.*;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourseDTO {
    private UUID courseId;
    private String tenantId;
    private String title;
    private String description;
    private String topicCode;
    private String categoryCode;
    private List<Language> language;
    private Level level;
    private PricingModel pricingModel;
    private PrizeDTO prize;
    private LearningMode learningMode;
    private Integer points;
    private List<String> tags;
    private List<AuthorDTO> authors;
    private PublisherDTO publisher;
    private LocalDateTime publishedOn;
    private String imageUrl;
    private boolean inMarketplace;
    private Status status;
    private Integer duration;
    private List<SectionDTO> sections;
    private LessonNavigationMode lessonNavigationMode;
    private Integer version;
} 