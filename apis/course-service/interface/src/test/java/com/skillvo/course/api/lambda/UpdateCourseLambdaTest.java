package com.skillvo.course.api.lambda;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.skillvo.course.api.dto.request.UpdateCourseRequest;
import com.skillvo.course.api.mapper.CourseRequestMapper;
import com.skillvo.course.application.command.UpdateCourseCommand;
import com.skillvo.course.application.command.handler.CourseCommandHandler;
import com.skillvo.course.api.config.ObjectMapperConfig;
import com.skillvo.course.domain.model.enums.*;
import com.skillvo.course.api.dto.AuthorDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Map;
import java.util.UUID;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UpdateCourseLambdaTest {

    @Mock
    private CourseCommandHandler commandHandler;

    @Mock
    private CourseRequestMapper requestMapper;

    @Mock
    private Context context;

    private UpdateCourseLambda lambda;
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        lambda = new UpdateCourseLambda(commandHandler, requestMapper);
        objectMapper = ObjectMapperConfig.createObjectMapper();
    }

    @Test
    void shouldHandleUpdateCourseRequest() throws Exception {
        // Given
        UUID courseId = UUID.randomUUID();
        UpdateCourseRequest request = createSampleUpdateCourseRequest(courseId);
        UpdateCourseCommand command = UpdateCourseCommand.builder()
                .courseId(courseId)
                .tenantId("tenant1")
                .title("Updated Course")
                .description("Updated Description")
                .build();
        APIGatewayProxyRequestEvent input = createSampleRequestEvent(courseId, request);

        when(requestMapper.toCommand(any(UpdateCourseRequest.class))).thenReturn(command);
        doNothing().when(commandHandler).handle(command);

        // When
        APIGatewayProxyResponseEvent response = lambda.handleRequest(input, context);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(204);
        assertThat(response.getBody()).isNull();
    }

    @Test
    void shouldHandleMissingCourseId() throws Exception {
        // Given
        APIGatewayProxyRequestEvent input = new APIGatewayProxyRequestEvent();
        input.setBody(objectMapper.writeValueAsString(createSampleUpdateCourseRequest(UUID.randomUUID())));

        // When
        APIGatewayProxyResponseEvent response = lambda.handleRequest(input, context);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(400);
        assertThat(response.getBody()).contains("courseId is required");
    }

    @Test
    void shouldHandleInvalidCourseId() throws Exception {
        // Given
        APIGatewayProxyRequestEvent input = new APIGatewayProxyRequestEvent();
        input.setPathParameters(Map.of("courseId", "invalid-uuid"));
        input.setBody(objectMapper.writeValueAsString(createSampleUpdateCourseRequest(UUID.randomUUID())));

        // When
        APIGatewayProxyResponseEvent response = lambda.handleRequest(input, context);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(400);
        assertThat(response.getBody()).contains("Invalid courseId format");
    }

    @Test
    void shouldHandleMismatchedCourseId() throws Exception {
        // Given
        UUID pathCourseId = UUID.randomUUID();
        UUID bodyCourseId = UUID.randomUUID();
        UpdateCourseRequest request = createSampleUpdateCourseRequest(bodyCourseId);
        APIGatewayProxyRequestEvent input = createSampleRequestEvent(pathCourseId, request);

        // When
        APIGatewayProxyResponseEvent response = lambda.handleRequest(input, context);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(400);
        assertThat(response.getBody()).contains("courseId in path does not match courseId in request body");
    }

    private UpdateCourseRequest createSampleUpdateCourseRequest(UUID courseId) {
        return UpdateCourseRequest.builder()
                .courseId(courseId)
                .tenantId("tenant1")
                .title("Updated Course")
                .description("Updated Description")
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

    private APIGatewayProxyRequestEvent createSampleRequestEvent(UUID courseId, UpdateCourseRequest request) throws Exception {
        APIGatewayProxyRequestEvent event = new APIGatewayProxyRequestEvent();
        event.setPathParameters(Map.of("courseId", courseId.toString()));
        event.setBody(objectMapper.writeValueAsString(request));
        return event;
    }
} 