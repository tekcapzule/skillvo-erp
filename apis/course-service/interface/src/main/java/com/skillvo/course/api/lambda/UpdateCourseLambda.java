package com.skillvo.course.api.lambda;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.skillvo.course.api.dto.request.UpdateCourseRequest;
import com.skillvo.course.api.mapper.CourseRequestMapper;
import com.skillvo.course.application.command.handler.CourseCommandHandler;
import lombok.RequiredArgsConstructor;

import java.util.Map;
import java.util.UUID;

@RequiredArgsConstructor
public class UpdateCourseLambda extends BaseLambdaHandler {
    private final CourseCommandHandler commandHandler;
    private final CourseRequestMapper requestMapper;

    @Override
    protected APIGatewayProxyResponseEvent processRequest(APIGatewayProxyRequestEvent input, Context context) throws Exception {
        Map<String, String> pathParameters = input.getPathParameters();
        if (pathParameters == null || !pathParameters.containsKey("courseId")) {
            throw new ValidationException("courseId is required");
        }

        String courseId = pathParameters.get("courseId");
        try {
            UUID.fromString(courseId);
        } catch (IllegalArgumentException e) {
            throw new ValidationException("Invalid courseId format");
        }

        UpdateCourseRequest request = parseRequestBody(input.getBody(), UpdateCourseRequest.class);
        UUID requestCourseId = request.getCourseId();
        if (requestCourseId != null && !requestCourseId.toString().equals(courseId)) {
            throw new ValidationException("courseId in path does not match courseId in request body");
        }

        request.setCourseId(UUID.fromString(courseId));
        commandHandler.handle(requestMapper.toCommand(request));
        return createSuccessResponse(null);
    }
} 