package com.skillvo.course.api.dto;

import com.skillvo.course.domain.model.enums.*;
import lombok.Builder;
import lombok.Value;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Value
@Builder
public class CourseDTO {
    UUID courseId;
    String tenantId;
    String title;
    String description;
    String topicCode;
    String categoryCode;
    List<Language> language;
    Level level;
    PricingModel pricingModel;
    PrizeDTO prize;
    LearningMode learningMode;
    Integer points;
    List<String> tags;
    List<AuthorDTO> authors;
    PublisherDTO publisher;
    LocalDateTime publishedOn;
    String imageUrl;
    boolean inMarketplace;
    Status status;
    Integer duration;
    List<SectionDTO> sections;
    LessonNavigationMode lessonNavigationMode;
    Integer version;
} 