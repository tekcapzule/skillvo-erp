package com.skillvo.course.api.mapper;

import com.skillvo.course.api.dto.request.*;
import com.skillvo.course.application.command.*;
import com.skillvo.course.application.query.ListCoursesQuery;
import com.skillvo.course.domain.model.enums.*;
import com.skillvo.course.application.dto.PrizeDTO;
import com.skillvo.course.application.dto.AuthorDTO;
import com.skillvo.course.application.dto.PublisherDTO;
import com.skillvo.course.application.dto.SectionDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CourseRequestMapperTest {

    @Mock
    private PrizeRequestMapper prizeRequestMapper;

    @Mock
    private AuthorRequestMapper authorRequestMapper;

    @Mock
    private PublisherRequestMapper publisherRequestMapper;

    @Mock
    private SectionRequestMapper sectionRequestMapper;

    private CourseRequestMapper mapper;

    @BeforeEach
    void setUp() {
        mapper = new CourseRequestMapper(prizeRequestMapper, authorRequestMapper, publisherRequestMapper, sectionRequestMapper);
    }

    @Test
    void shouldMapCreateCourseRequest() {
        // Given
        CreateCourseRequest request = createSampleCreateCourseRequest();
        when(prizeRequestMapper.toApplicationDTO(any())).thenReturn(createSamplePrizeDTO());
        when(authorRequestMapper.toApplicationDTOList(any())).thenReturn(Arrays.asList(createSampleAuthorDTO()));
        when(publisherRequestMapper.toApplicationDTO(any())).thenReturn(createSamplePublisherDTO());
        when(sectionRequestMapper.toApplicationDTOList(any())).thenReturn(Arrays.asList(createSampleSectionDTO()));

        // When
        CreateCourseCommand command = mapper.toCommand(request);

        // Then
        assertThat(command.getTenantId()).isEqualTo(request.getTenantId());
        assertThat(command.getTitle()).isEqualTo(request.getTitle());
        assertThat(command.getDescription()).isEqualTo(request.getDescription());
        assertThat(command.getTopicCode()).isEqualTo(request.getTopicCode());
        assertThat(command.getCategoryCode()).isEqualTo(request.getCategoryCode());
        assertThat(command.getLanguage()).isEqualTo(request.getLanguage());
        assertThat(command.getLevel()).isEqualTo(request.getLevel());
        assertThat(command.getPricingModel()).isEqualTo(request.getPricingModel());
        assertThat(command.getPrize()).isNotNull();
        assertThat(command.getLearningMode()).isEqualTo(request.getLearningMode());
        assertThat(command.getPoints()).isEqualTo(request.getPoints());
        assertThat(command.getTags()).isEqualTo(request.getTags());
        assertThat(command.getAuthors()).hasSize(1);
        assertThat(command.getPublisher()).isNotNull();
        assertThat(command.getImageUrl()).isEqualTo(request.getImageUrl());
        assertThat(command.isInMarketplace()).isEqualTo(request.isInMarketplace());
        assertThat(command.getStatus()).isEqualTo(request.getStatus());
        assertThat(command.getDuration()).isEqualTo(request.getDuration());
        assertThat(command.getSections()).hasSize(1);
        assertThat(command.getLessonNavigationMode()).isEqualTo(request.getLessonNavigationMode());
    }

    @Test
    void shouldMapUpdateCourseRequest() {
        // Given
        UpdateCourseRequest request = createSampleUpdateCourseRequest();
        when(prizeRequestMapper.toApplicationDTO(any())).thenReturn(createSamplePrizeDTO());
        when(authorRequestMapper.toApplicationDTOList(any())).thenReturn(Arrays.asList(createSampleAuthorDTO()));
        when(publisherRequestMapper.toApplicationDTO(any())).thenReturn(createSamplePublisherDTO());
        when(sectionRequestMapper.toApplicationDTOList(any())).thenReturn(Arrays.asList(createSampleSectionDTO()));

        // When
        UpdateCourseCommand command = mapper.toCommand(request);

        // Then
        assertThat(command.getCourseId()).isEqualTo(request.getCourseId());
        assertThat(command.getTenantId()).isEqualTo(request.getTenantId());
        assertThat(command.getTitle()).isEqualTo(request.getTitle());
        assertThat(command.getDescription()).isEqualTo(request.getDescription());
        assertThat(command.getTopicCode()).isEqualTo(request.getTopicCode());
        assertThat(command.getCategoryCode()).isEqualTo(request.getCategoryCode());
        assertThat(command.getLanguage()).isEqualTo(request.getLanguage());
        assertThat(command.getLevel()).isEqualTo(request.getLevel());
        assertThat(command.getPricingModel()).isEqualTo(request.getPricingModel());
        assertThat(command.getPrize()).isNotNull();
        assertThat(command.getLearningMode()).isEqualTo(request.getLearningMode());
        assertThat(command.getPoints()).isEqualTo(request.getPoints());
        assertThat(command.getTags()).isEqualTo(request.getTags());
        assertThat(command.getAuthors()).hasSize(1);
        assertThat(command.getPublisher()).isNotNull();
        assertThat(command.getImageUrl()).isEqualTo(request.getImageUrl());
        assertThat(command.isInMarketplace()).isEqualTo(request.isInMarketplace());
        assertThat(command.getStatus()).isEqualTo(request.getStatus());
        assertThat(command.getDuration()).isEqualTo(request.getDuration());
        assertThat(command.getSections()).hasSize(1);
        assertThat(command.getLessonNavigationMode()).isEqualTo(request.getLessonNavigationMode());
    }

    @Test
    void shouldMapPublishCourseRequest() {
        // Given
        PublishCourseRequest request = createSamplePublishCourseRequest();

        // When
        PublishCourseCommand command = mapper.toCommand(request);

        // Then
        assertThat(command.getCourseId()).isEqualTo(request.getCourseId());
        assertThat(command.getTenantId()).isEqualTo(request.getTenantId());
    }

    @Test
    void shouldMapCourseFilterRequest() {
        // Given
        CourseFilterRequest request = createSampleCourseFilterRequest();

        // When
        ListCoursesQuery query = mapper.toQuery(request);

        // Then
        assertThat(query.getTenantId()).isEqualTo(request.getTenantId());
        assertThat(query.isInMarketplace()).isEqualTo(request.isInMarketplace());
    }

    private CreateCourseRequest createSampleCreateCourseRequest() {
        return CreateCourseRequest.builder()
                .tenantId("tenant1")
                .title("Test Course")
                .description("Test Description")
                .topicCode("topic1")
                .categoryCode("category1")
                .language(Arrays.asList(Language.ENGLISH))
                .level(Level.BEGINNER)
                .pricingModel(PricingModel.FREE)
                .prize(com.skillvo.course.api.dto.PrizeDTO.builder()
                        .amount(0.0)
                        .currency(Currency.USD)
                        .build())
                .learningMode(LearningMode.ONLINE)
                .points(100)
                .tags(Arrays.asList("test"))
                .authors(Arrays.asList(createSampleApiAuthorDTO()))
                .publisher(createSampleApiPublisherDTO())
                .imageUrl("http://example.com/image.jpg")
                .inMarketplace(false)
                .status(Status.DRAFT)
                .duration(60)
                .sections(Arrays.asList(createSampleApiSectionDTO()))
                .lessonNavigationMode(LessonNavigationMode.SEQUENTIAL)
                .build();
    }

    private UpdateCourseRequest createSampleUpdateCourseRequest() {
        return UpdateCourseRequest.builder()
                .courseId(UUID.randomUUID())
                .tenantId("tenant1")
                .title("Updated Course")
                .description("Updated Description")
                .topicCode("topic1")
                .categoryCode("category1")
                .language(Arrays.asList(Language.ENGLISH))
                .level(Level.BEGINNER)
                .pricingModel(PricingModel.FREE)
                .prize(com.skillvo.course.api.dto.PrizeDTO.builder()
                        .amount(0.0)
                        .currency(Currency.USD)
                        .build())
                .learningMode(LearningMode.ONLINE)
                .points(100)
                .tags(Arrays.asList("test"))
                .authors(Arrays.asList(createSampleApiAuthorDTO()))
                .publisher(createSampleApiPublisherDTO())
                .imageUrl("http://example.com/image.jpg")
                .inMarketplace(false)
                .status(Status.DRAFT)
                .duration(60)
                .sections(Arrays.asList(createSampleApiSectionDTO()))
                .lessonNavigationMode(LessonNavigationMode.SEQUENTIAL)
                .build();
    }

    private PublishCourseRequest createSamplePublishCourseRequest() {
        return PublishCourseRequest.builder()
                .courseId(UUID.randomUUID())
                .tenantId("tenant1")
                .build();
    }

    private CourseFilterRequest createSampleCourseFilterRequest() {
        return CourseFilterRequest.builder()
                .tenantId("tenant1")
                .inMarketplace(false)
                .build();
    }

    private com.skillvo.course.api.dto.AuthorDTO createSampleApiAuthorDTO() {
        return com.skillvo.course.api.dto.AuthorDTO.builder()
                .id(UUID.randomUUID().toString())
                .name("John Doe")
                .email("john.doe@example.com")
                .bio("Test Bio")
                .imageUrl("http://example.com/image.jpg")
                .build();
    }

    private com.skillvo.course.api.dto.PublisherDTO createSampleApiPublisherDTO() {
        return com.skillvo.course.api.dto.PublisherDTO.builder()
                .id(UUID.randomUUID().toString())
                .name("Test Publisher")
                .description("Test Publisher Description")
                .website("http://example.com")
                .logoUrl("http://example.com/logo.jpg")
                .type(PublisherType.INDIVIDUAL)
                .build();
    }

    private com.skillvo.course.api.dto.SectionDTO createSampleApiSectionDTO() {
        return com.skillvo.course.api.dto.SectionDTO.builder()
                .sectionId(UUID.randomUUID())
                .title("Test Section")
                .description("Test Section Description")
                .order(1)
                .duration(30)
                .lessons(Arrays.asList(createSampleApiLessonDTO()))
                .build();
    }

    private com.skillvo.course.api.dto.LessonDTO createSampleApiLessonDTO() {
        return com.skillvo.course.api.dto.LessonDTO.builder()
                .id(UUID.randomUUID().toString())
                .title("Test Lesson")
                .description("Test Lesson Description")
                .content("Test Content")
                .order(1)
                .duration(30)
                .videoUrl("http://example.com/video.mp4")
                .thumbnailUrl("http://example.com/thumbnail.jpg")
                .build();
    }

    private PrizeDTO createSamplePrizeDTO() {
        return PrizeDTO.builder()
                .prize(0.0)
                .currency(Currency.USD)
                .discount(0)
                .build();
    }

    private AuthorDTO createSampleAuthorDTO() {
        return AuthorDTO.builder()
                .authorId(UUID.randomUUID())
                .firstName("John")
                .lastName("Doe")
                .emailId("john.doe@example.com")
                .build();
    }

    private PublisherDTO createSamplePublisherDTO() {
        return PublisherDTO.builder()
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

    private SectionDTO createSampleSectionDTO() {
        return SectionDTO.builder()
                .sectionId(UUID.randomUUID())
                .title("Test Section")
                .description("Test Section Description")
                .order(1)
                .duration(30)
                .build();
    }
} 