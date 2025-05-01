package com.skillvo.course.api.lambda;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.skillvo.course.application.command.PublishCourseCommand;
import com.skillvo.course.application.command.handler.CourseCommandHandler;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Map;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;

@ExtendWith(MockitoExtension.class)
class PublishCourseLambdaTest {

    @Mock
    private CourseCommandHandler commandHandler;

    @Mock
    private Context context;

    private PublishCourseLambda lambda;

    @BeforeEach
    void setUp() {
        lambda = new PublishCourseLambda(commandHandler);
    }

    @Test
    void shouldHandlePublishCourseRequest() throws Exception {
        // Given
        UUID courseId = UUID.randomUUID();
        APIGatewayProxyRequestEvent input = createSampleRequestEvent(courseId);
        doNothing().when(commandHandler).handle(any(PublishCourseCommand.class));

        // When
        APIGatewayProxyResponseEvent response = lambda.handleRequest(input, context);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(200);
        assertThat(response.getBody()).contains("Course published successfully");
    }

    @Test
    void shouldHandleMissingCourseId() throws Exception {
        // Given
        APIGatewayProxyRequestEvent input = new APIGatewayProxyRequestEvent();

        // When
        APIGatewayProxyResponseEvent response = lambda.handleRequest(input, context);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(400);
        assertThat(response.getBody()).contains("Course ID is required");
    }

    @Test
    void shouldHandleInvalidCourseId() throws Exception {
        // Given
        APIGatewayProxyRequestEvent input = new APIGatewayProxyRequestEvent();
        input.setPathParameters(Map.of("courseId", "invalid-uuid"));

        // When
        APIGatewayProxyResponseEvent response = lambda.handleRequest(input, context);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(400);
        assertThat(response.getBody()).contains("Invalid course ID format");
    }

    private APIGatewayProxyRequestEvent createSampleRequestEvent(UUID courseId) {
        APIGatewayProxyRequestEvent event = new APIGatewayProxyRequestEvent();
        event.setPathParameters(Map.of("courseId", courseId.toString()));
        return event;
    }
} 