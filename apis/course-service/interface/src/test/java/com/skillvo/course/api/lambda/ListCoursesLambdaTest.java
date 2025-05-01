package com.skillvo.course.api.lambda;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.skillvo.course.api.mapper.CourseDTOMapper;
import com.skillvo.course.api.mapper.CourseRequestMapper;
import com.skillvo.course.application.query.ListCoursesQuery;
import com.skillvo.course.application.query.handler.CourseQueryHandler;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ListCoursesLambdaTest {

    @Mock
    private CourseQueryHandler queryHandler;

    @Mock
    private CourseDTOMapper dtoMapper;

    @Mock
    private CourseRequestMapper requestMapper;

    @Mock
    private Context context;

    private ListCoursesLambda lambda;
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        lambda = new ListCoursesLambda(queryHandler, requestMapper, dtoMapper);
        objectMapper = new ObjectMapper();
    }

    @Test
    void shouldHandleListCoursesRequest() throws Exception {
        // Given
        List<com.skillvo.course.application.dto.CourseDTO> applicationDTOs = Arrays.asList(
            createSampleApplicationCourseDTO(),
            createSampleApplicationCourseDTO()
        );
        List<com.skillvo.course.api.dto.CourseDTO> apiDTOs = Arrays.asList(
            createSampleApiCourseDTO(),
            createSampleApiCourseDTO()
        );
        APIGatewayProxyRequestEvent input = createSampleRequestEvent();

        ListCoursesQuery query = ListCoursesQuery.builder()
                .tenantId("tenant1")
                .inMarketplace(false)
                .build();
        when(requestMapper.toQuery(any())).thenReturn(query);
        when(queryHandler.handle(query)).thenReturn(applicationDTOs);
        when(dtoMapper.toApiCourseDTOList(applicationDTOs)).thenReturn(apiDTOs);

        // When
        APIGatewayProxyResponseEvent response = lambda.handleRequest(input, context);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(200);
        assertThat(response.getBody()).isEqualTo(objectMapper.writeValueAsString(apiDTOs));
    }

    @Test
    void shouldHandleMissingTenantId() throws Exception {
        // Given
        APIGatewayProxyRequestEvent input = new APIGatewayProxyRequestEvent();
        input.setQueryStringParameters(Map.of("inMarketplace", "false"));

        // When
        APIGatewayProxyResponseEvent response = lambda.handleRequest(input, context);

        // Then
        assertThat(response.getStatusCode()).isEqualTo(400);
        assertThat(response.getBody()).contains("tenantId is required");
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

    private APIGatewayProxyRequestEvent createSampleRequestEvent() {
        APIGatewayProxyRequestEvent event = new APIGatewayProxyRequestEvent();
        event.setQueryStringParameters(Map.of(
            "tenantId", "tenant1",
            "inMarketplace", "false"
        ));
        return event;
    }
} 