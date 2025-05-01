package com.skillvo.course.api.lambda;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.skillvo.course.api.dto.request.CreateCourseRequest;
import com.skillvo.course.api.mapper.CourseRequestMapper;
import com.skillvo.course.application.command.handler.CourseCommandHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;

import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
public class CreateCourseLambda extends BaseLambdaHandler {
    private final CourseCommandHandler commandHandler;
    private final CourseRequestMapper requestMapper;

    @Override
    protected APIGatewayProxyResponseEvent processRequest(APIGatewayProxyRequestEvent input, Context context) throws Exception {
        log.debug("Processing create course request, requestId: {}", MDC.get("requestId"));
        
        if (input.getBody() == null || input.getBody().trim().isEmpty()) {
            log.warn("Received empty request body, requestId: {}", MDC.get("requestId"));
            throw new ValidationException("Request body cannot be empty");
        }

        CreateCourseRequest request = parseRequestBody(input.getBody(), CreateCourseRequest.class);
        log.info("Creating course with title: {}, topic: {}, category: {}, tenant: {}, requestId: {}", 
                request.getTitle(), 
                request.getTopicCode(), 
                request.getCategoryCode(),
                request.getTenantId(),
                MDC.get("requestId"));

        try {
            UUID courseId = commandHandler.handle(requestMapper.toCommand(request));
            log.info("Successfully created course with ID: {}, requestId: {}", courseId, MDC.get("requestId"));
            return createSuccessResponse(courseId);
        } catch (Exception e) {
            log.error("Failed to create course with title: {}, tenant: {}, requestId: {}", 
                    request.getTitle(), 
                    request.getTenantId(), 
                    MDC.get("requestId"), 
                    e);
            throw e;
        }
    }
} 