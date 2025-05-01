package com.skillvo.course.api.lambda;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.skillvo.course.api.mapper.CourseDTOMapper;
import com.skillvo.course.application.query.GetCourseQuery;
import com.skillvo.course.application.query.handler.CourseQueryHandler;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.UUID;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class GetCourseLambdaTest {

    @Mock
    private CourseQueryHandler queryHandler;

    @Mock
    private CourseDTOMapper dtoMapper;

    @Mock
    private Context context;

    @InjectMocks
    private GetCourseLambda lambda;

    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
    }

    @Test
    void shouldHandleGetCourseRequest() throws Exception {
        // Given
        UUID courseId = UUID.randomUUID();
        com.skillvo.course.application.dto.CourseDTO applicationDTO = createSampleApplicationCourseDTO();
        com.skillvo.course.api.dto.CourseDTO apiDTO = createSampleApiCourseDTO();
        APIGatewayProxyRequestEvent input = createSampleRequestEvent(courseId);

        when(queryHandler.handle(any(GetCourseQuery.class))).thenReturn(applicationDTO);
        when(dtoMapper.toApiCourseDTO(any(com.skillvo.course.application.dto.CourseDTO.class))).thenReturn(apiDTO);

        // When
        APIGatewayProxyResponseEvent response = lambda.handleRequest(input, context);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(200);
        assertThat(response.getBody()).isEqualTo(objectMapper.writeValueAsString(apiDTO));
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

    private com.skillvo.course.application.dto.CourseDTO createSampleApplicationCourseDTO() {
        return com.skillvo.course.application.dto.CourseDTO.builder()
                .courseId(UUID.randomUUID())
                .tenantId("tenant1")
                .title("Test Course")
                .description("Test Description")
                .build();
    }

    private com.skillvo.course.api.dto.CourseDTO createSampleApiCourseDTO() {
        return com.skillvo.course.api.dto.CourseDTO.builder()
                .courseId(UUID.randomUUID())
                .tenantId("tenant1")
                .title("Test Course")
                .description("Test Description")
                .build();
    }

    private APIGatewayProxyRequestEvent createSampleRequestEvent(UUID courseId) {
        APIGatewayProxyRequestEvent event = new APIGatewayProxyRequestEvent();
        event.setPathParameters(Map.of("courseId", courseId.toString()));
        return event;
    }
} 