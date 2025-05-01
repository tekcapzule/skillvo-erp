package com.skillvo.course.application.command;

import com.skillvo.course.application.dto.*;
import com.skillvo.course.domain.model.enums.*;
import lombok.Builder;
import lombok.Value;

import java.util.List;

@Value
@Builder
public class CreateCourseCommand {
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
    String imageUrl;
    boolean inMarketplace;
    Status status;
    Integer duration;
    List<SectionDTO> sections;
    LessonNavigationMode lessonNavigationMode;
} 