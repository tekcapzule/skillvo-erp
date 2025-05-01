package com.skillvo.course.api.lambda;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.skillvo.course.application.command.DeleteCourseCommand;
import com.skillvo.course.application.command.handler.CourseCommandHandler;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.UUID;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;

@ExtendWith(MockitoExtension.class)
class DeleteCourseLambdaTest {

    @Mock
    private CourseCommandHandler commandHandler;

    @Mock
    private Context context;

    @InjectMocks
    private DeleteCourseLambda lambda;

    @Test
    void shouldHandleDeleteCourseRequest() throws Exception {
        // Given
        UUID courseId = UUID.randomUUID();
        APIGatewayProxyRequestEvent input = createSampleRequestEvent(courseId);

        doNothing().when(commandHandler).handle(any(DeleteCourseCommand.class));

        // When
        APIGatewayProxyResponseEvent response = lambda.handleRequest(input, context);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(204);
        assertThat(response.getBody()).isNull();
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
        assertThat(response.getBody()).contains("Invalid UUID string: invalid-uuid");
    }

    private APIGatewayProxyRequestEvent createSampleRequestEvent(UUID courseId) {
        APIGatewayProxyRequestEvent event = new APIGatewayProxyRequestEvent();
        event.setPathParameters(Map.of("courseId", courseId.toString()));
        return event;
    }
} 