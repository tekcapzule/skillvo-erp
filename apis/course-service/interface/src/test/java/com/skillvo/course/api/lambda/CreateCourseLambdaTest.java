package com.skillvo.course.api.lambda;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.skillvo.course.api.dto.request.CreateCourseRequest;
import com.skillvo.course.api.mapper.CourseRequestMapper;
import com.skillvo.course.application.command.CreateCourseCommand;
import com.skillvo.course.application.command.handler.CourseCommandHandler;
import com.skillvo.course.api.config.ObjectMapperConfig;
import com.skillvo.course.domain.model.enums.Language;
import com.skillvo.course.domain.model.enums.Level;
import com.skillvo.course.domain.model.enums.PricingModel;
import com.skillvo.course.domain.model.enums.LearningMode;
import com.skillvo.course.domain.model.enums.Status;
import com.skillvo.course.domain.model.enums.LessonNavigationMode;
import com.skillvo.course.api.dto.AuthorDTO;
import com.skillvo.course.api.mapper.AuthorRequestMapper;
import com.skillvo.course.api.mapper.PrizeRequestMapper;
import com.skillvo.course.api.mapper.PublisherRequestMapper;
import com.skillvo.course.api.mapper.SectionRequestMapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.UUID;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CreateCourseLambdaTest {

    @Mock
    private CourseCommandHandler commandHandler;

    @Mock
    private CourseRequestMapper requestMapper;

    @Mock
    private Context context;

    @Mock
    private AuthorRequestMapper authorRequestMapper;

    @Mock
    private PrizeRequestMapper prizeRequestMapper;

    @Mock
    private PublisherRequestMapper publisherRequestMapper;

    @Mock
    private SectionRequestMapper sectionRequestMapper;

    private CreateCourseLambda lambda;
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        requestMapper = new CourseRequestMapper(prizeRequestMapper, authorRequestMapper, publisherRequestMapper, sectionRequestMapper);
        lambda = new CreateCourseLambda(commandHandler, requestMapper);
        objectMapper = ObjectMapperConfig.createObjectMapper();
    }

    @Test
    void shouldHandleCreateCourseRequest() throws Exception {
        // Given
        UUID courseId = UUID.randomUUID();
        CreateCourseRequest request = createSampleCreateCourseRequest();

        List<com.skillvo.course.application.dto.AuthorDTO> applicationAuthors = List.of(
            com.skillvo.course.application.dto.AuthorDTO.builder()
                .firstName("Test")
                .lastName("Author")
                .emailId("author@test.com")
                .build()
        );

        when(authorRequestMapper.toApplicationDTOList(any())).thenReturn(applicationAuthors);
        when(commandHandler.handle(any(CreateCourseCommand.class))).thenReturn(courseId);

        APIGatewayProxyRequestEvent input = createSampleRequestEvent(request);

        // When
        APIGatewayProxyResponseEvent response = lambda.handleRequest(input, context);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(200);
        assertThat(response.getBody()).isEqualTo(objectMapper.writeValueAsString(courseId));
    }

    @Test
    void shouldHandleEmptyRequest() throws Exception {
        // Given
        APIGatewayProxyRequestEvent input = new APIGatewayProxyRequestEvent();
        input.setBody("");

        // When
        APIGatewayProxyResponseEvent response = lambda.handleRequest(input, context);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(400);
        assertThat(response.getBody()).contains("Request body cannot be empty");
    }

    @Test
    void shouldHandleNullRequest() throws Exception {
        // Given
        APIGatewayProxyRequestEvent input = new APIGatewayProxyRequestEvent();
        input.setBody(null);

        // When
        APIGatewayProxyResponseEvent response = lambda.handleRequest(input, context);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(400);
        assertThat(response.getBody()).contains("Request body cannot be empty");
    }

    @Test
    void shouldHandleInvalidJson() throws Exception {
        // Given
        APIGatewayProxyRequestEvent input = new APIGatewayProxyRequestEvent();
        input.setBody("invalid json");

        // When
        APIGatewayProxyResponseEvent response = lambda.handleRequest(input, context);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(400);
        assertThat(response.getBody()).contains("Invalid JSON format");
    }

    private CreateCourseRequest createSampleCreateCourseRequest() {
        return CreateCourseRequest.builder()
                .tenantId("tenant1")
                .title("Test Course")
                .description("Test Description")
                .topicCode("TOPIC_1")
                .categoryCode("CATEGORY_1")
                .language(List.of(Language.ENGLISH))
                .level(Level.BEGINNER)
                .pricingModel(PricingModel.FREE)
                .learningMode(LearningMode.ONLINE)
                .authors(List.of(AuthorDTO.builder()
                        .name("Test Author")
                        .email("author@test.com")
                        .build()))
                .duration(60)
                .points(0)
                .status(Status.DRAFT)
                .lessonNavigationMode(LessonNavigationMode.SEQUENTIAL)
                .inMarketplace(false)
                .build();
    }

    private CreateCourseCommand createSampleCreateCourseCommand() {
        return CreateCourseCommand.builder()
                .tenantId("tenant1")
                .title("Test Course")
                .description("Test Description")
                .topicCode("TOPIC_1")
                .categoryCode("CATEGORY_1")
                .language(List.of(Language.ENGLISH))
                .level(Level.BEGINNER)
                .pricingModel(PricingModel.FREE)
                .learningMode(LearningMode.ONLINE)
                .authors(List.of(com.skillvo.course.application.dto.AuthorDTO.builder()
                        .firstName("Test")
                        .lastName("Author")
                        .emailId("author@test.com")
                        .build()))
                .duration(60)
                .build();
    }

    private APIGatewayProxyRequestEvent createSampleRequestEvent(CreateCourseRequest request) throws Exception {
        APIGatewayProxyRequestEvent event = new APIGatewayProxyRequestEvent();
        event.setBody(objectMapper.writeValueAsString(request));
        return event;
    }
} 