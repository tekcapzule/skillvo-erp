package com.skillvo.course.api.mapper;

import com.skillvo.course.domain.model.enums.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
class CourseDTOMapperTest {

    private CourseDTOMapper mapper;

    @BeforeEach
    void setUp() {
        mapper = new CourseDTOMapper();
    }

    @Test
    void shouldMapCourseDTO() {
        // Given
        com.skillvo.course.application.dto.CourseDTO applicationDTO = createSampleApplicationCourseDTO();

        // When
        com.skillvo.course.api.dto.CourseDTO apiDTO = mapper.toApiCourseDTO(applicationDTO);

        // Then
        assertThat(apiDTO.getCourseId()).isEqualTo(applicationDTO.getCourseId());
        assertThat(apiDTO.getTenantId()).isEqualTo(applicationDTO.getTenantId());
        assertThat(apiDTO.getTitle()).isEqualTo(applicationDTO.getTitle());
        assertThat(apiDTO.getDescription()).isEqualTo(applicationDTO.getDescription());
        assertThat(apiDTO.getTopicCode()).isEqualTo(applicationDTO.getTopicCode());
        assertThat(apiDTO.getCategoryCode()).isEqualTo(applicationDTO.getCategoryCode());
        assertThat(apiDTO.getLanguage()).isEqualTo(applicationDTO.getLanguage());
        assertThat(apiDTO.getLevel()).isEqualTo(applicationDTO.getLevel());
        assertThat(apiDTO.getPricingModel()).isEqualTo(applicationDTO.getPricingModel());
        assertThat(apiDTO.getPrize().getAmount()).isEqualTo(applicationDTO.getPrize().getPrize());
        assertThat(apiDTO.getPrize().getCurrency()).isEqualTo(applicationDTO.getPrize().getCurrency());
        assertThat(apiDTO.getLearningMode()).isEqualTo(applicationDTO.getLearningMode());
        assertThat(apiDTO.getPoints()).isEqualTo(applicationDTO.getPoints());
        assertThat(apiDTO.getTags()).isEqualTo(applicationDTO.getTags());
        assertThat(apiDTO.getAuthors()).hasSize(1);
        assertThat(apiDTO.getPublisher()).isNotNull();
        assertThat(apiDTO.getPublishedOn()).isEqualTo(applicationDTO.getPublishedOn());
        assertThat(apiDTO.getImageUrl()).isEqualTo(applicationDTO.getImageUrl());
        assertThat(apiDTO.isInMarketplace()).isEqualTo(applicationDTO.isInMarketplace());
        assertThat(apiDTO.getStatus()).isEqualTo(applicationDTO.getStatus());
        assertThat(apiDTO.getDuration()).isEqualTo(applicationDTO.getDuration());
        assertThat(apiDTO.getSections()).hasSize(1);
        assertThat(apiDTO.getLessonNavigationMode()).isEqualTo(applicationDTO.getLessonNavigationMode());
        assertThat(apiDTO.getVersion()).isEqualTo(applicationDTO.getVersion());
    }

    @Test
    void shouldMapCourseDTOList() {
        // Given
        List<com.skillvo.course.application.dto.CourseDTO> applicationDTOs = Arrays.asList(
            createSampleApplicationCourseDTO(),
            createSampleApplicationCourseDTO()
        );

        // When
        List<com.skillvo.course.api.dto.CourseDTO> apiDTOs = mapper.toApiCourseDTOList(applicationDTOs);

        // Then
        assertThat(apiDTOs).hasSize(2);
        apiDTOs.forEach(apiDTO -> {
            assertThat(apiDTO.getCourseId()).isNotNull();
            assertThat(apiDTO.getTitle()).isEqualTo("Test Course");
        });
    }

    private com.skillvo.course.application.dto.CourseDTO createSampleApplicationCourseDTO() {
        return com.skillvo.course.application.dto.CourseDTO.builder()
                .courseId(UUID.randomUUID())
                .tenantId("tenant1")
                .title("Test Course")
                .description("Test Description")
                .topicCode("topic1")
                .categoryCode("category1")
                .language(Arrays.asList(Language.ENGLISH))
                .level(Level.BEGINNER)
                .pricingModel(PricingModel.FREE)
                .prize(com.skillvo.course.application.dto.PrizeDTO.builder()
                        .prize(0.0)
                        .currency(Currency.USD)
                        .discount(0)
                        .build())
                .learningMode(LearningMode.ONLINE)
                .points(100)
                .tags(Arrays.asList("test"))
                .authors(Arrays.asList(createSampleAuthorDTO()))
                .publisher(createSamplePublisherDTO())
                .publishedOn(LocalDateTime.now())
                .imageUrl("http://example.com/image.jpg")
                .inMarketplace(false)
                .status(Status.DRAFT)
                .duration(60)
                .sections(Arrays.asList(createSampleSectionDTO()))
                .lessonNavigationMode(LessonNavigationMode.SEQUENTIAL)
                .version(1)
                .build();
    }

    private com.skillvo.course.application.dto.AuthorDTO createSampleAuthorDTO() {
        return com.skillvo.course.application.dto.AuthorDTO.builder()
                .authorId(UUID.randomUUID())
                .firstName("John")
                .lastName("Doe")
                .emailId("john.doe@example.com")
                .build();
    }

    private com.skillvo.course.application.dto.PublisherDTO createSamplePublisherDTO() {
        return com.skillvo.course.application.dto.PublisherDTO.builder()
                .publisherId(UUID.randomUUID())
                .name("Test Publisher")
                .type(PublisherType.INDIVIDUAL)
                .logoUrl("http://example.com/logo.jpg")
                .website("http://example.com")
                .contactEmail("contact@example.com")
                .description("Test Publisher Description")
                .country("US")
                .build();
    }

    private com.skillvo.course.application.dto.SectionDTO createSampleSectionDTO() {
        return com.skillvo.course.application.dto.SectionDTO.builder()
                .sectionId(UUID.randomUUID())
                .title("Test Section")
                .description("Test Section Description")
                .order(1)
                .duration(30)
                .lessons(Arrays.asList(createSampleLessonDTO()))
                .build();
    }

    private com.skillvo.course.application.dto.LessonDTO createSampleLessonDTO() {
        return com.skillvo.course.application.dto.LessonDTO.builder()
                .lessonId(UUID.randomUUID())
                .title("Test Lesson")
                .description("Test Lesson Description")
                .content("Test Content")
                .order(1)
                .duration(30)
                .videoUrl("http://example.com/video.mp4")
                .thumbnailUrl("http://example.com/thumbnail.jpg")
                .build();
    }
} 