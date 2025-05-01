package com.skillvo.course.api.dto.request;

import com.skillvo.course.api.dto.AuthorDTO;
import com.skillvo.course.api.dto.PrizeDTO;
import com.skillvo.course.api.dto.PublisherDTO;
import com.skillvo.course.api.dto.SectionDTO;
import com.skillvo.course.domain.model.enums.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.hibernate.validator.constraints.URL;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UpdateCourseRequest {
    @NotNull(message = "Course ID is required")
    private UUID courseId;

    @NotBlank(message = "Tenant ID is required")
    @Pattern(regexp = "^[a-zA-Z0-9-_]+$", message = "Tenant ID can only contain letters, numbers, hyphens, and underscores")
    private String tenantId;

    @NotBlank(message = "Title is required")
    @Size(min = 1, max = 200, message = "Title must be between 1 and 200 characters")
    private String title;

    @NotBlank(message = "Description is required")
    @Size(min = 1, max = 1000, message = "Description must be between 1 and 1000 characters")
    private String description;

    @NotBlank(message = "Topic code is required")
    @Pattern(regexp = "^[A-Z0-9_]+$", message = "Topic code must be uppercase letters, numbers, and underscores")
    private String topicCode;

    @NotBlank(message = "Category code is required")
    @Pattern(regexp = "^[A-Z0-9_]+$", message = "Category code must be uppercase letters, numbers, and underscores")
    private String categoryCode;

    @NotEmpty(message = "At least one language is required")
    private List<Language> language;

    @NotNull(message = "Level is required")
    private Level level;

    @NotNull(message = "Pricing model is required")
    private PricingModel pricingModel;

    @Valid
    private PrizeDTO prize;

    @NotNull(message = "Learning mode is required")
    private LearningMode learningMode;

    @Min(value = 0, message = "Points must be greater than or equal to 0")
    private Integer points;

    private List<String> tags;

    @NotEmpty(message = "At least one author is required")
    @Valid
    private List<AuthorDTO> authors;

    @Valid
    private PublisherDTO publisher;

    @URL(message = "Image URL must be a valid URL")
    private String imageUrl;

    private boolean inMarketplace;

    private Status status;

    @NotNull(message = "Duration is required")
    @Min(value = 1, message = "Duration must be greater than 0")
    private Integer duration;

    @Valid
    private List<SectionDTO> sections;

    private LessonNavigationMode lessonNavigationMode;
} 