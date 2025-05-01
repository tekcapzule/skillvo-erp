package com.skillvo.course.api.lambda;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.skillvo.course.api.dto.CourseDTO;
import com.skillvo.course.api.dto.request.CourseFilterRequest;
import com.skillvo.course.api.mapper.CourseRequestMapper;
import com.skillvo.course.api.mapper.CourseDTOMapper;
import com.skillvo.course.application.query.handler.CourseQueryHandler;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
public class ListCoursesLambda extends BaseLambdaHandler {
    private final CourseQueryHandler queryHandler;
    private final CourseRequestMapper requestMapper;
    private final CourseDTOMapper dtoMapper;

    @Override
    protected APIGatewayProxyResponseEvent processRequest(APIGatewayProxyRequestEvent input, Context context) throws Exception {
        Map<String, String> queryParams = input.getQueryStringParameters();
        if (queryParams == null || !queryParams.containsKey("tenantId")) {
            return createErrorResponse(400, "tenantId is required");
        }

        CourseFilterRequest request = CourseFilterRequest.builder()
                .tenantId(queryParams.get("tenantId"))
                .inMarketplace(Boolean.parseBoolean(queryParams.getOrDefault("inMarketplace", "false")))
                .build();
        List<CourseDTO> courses = dtoMapper.toApiCourseDTOList(queryHandler.handle(requestMapper.toQuery(request)));
        return createSuccessResponse(courses);
    }
} 