package com.skillvo.course.api.lambda;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.skillvo.course.api.dto.CourseDTO;
import com.skillvo.course.api.mapper.CourseDTOMapper;
import com.skillvo.course.application.query.GetCourseQuery;
import com.skillvo.course.application.query.handler.CourseQueryHandler;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@RequiredArgsConstructor
public class GetCourseLambda extends BaseLambdaHandler {
    private final CourseQueryHandler queryHandler;
    private final CourseDTOMapper dtoMapper;

    @Override
    protected APIGatewayProxyResponseEvent processRequest(APIGatewayProxyRequestEvent input, Context context) throws Exception {
        String courseId = input.getPathParameters().get("courseId");
        GetCourseQuery query = GetCourseQuery.builder()
                .courseId(UUID.fromString(courseId))
                .build();
        CourseDTO course = dtoMapper.toApiCourseDTO(queryHandler.handle(query));
        return createSuccessResponse(course);
    }
} 