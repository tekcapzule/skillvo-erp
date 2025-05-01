package com.skillvo.course.api.lambda;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.skillvo.course.application.command.PublishCourseCommand;
import com.skillvo.course.application.command.handler.CourseCommandHandler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
public class PublishCourseLambda extends BaseLambdaHandler {
    private final CourseCommandHandler commandHandler;

    @Override
    protected APIGatewayProxyResponseEvent processRequest(APIGatewayProxyRequestEvent input, Context context) throws Exception {
        log.debug("Processing publish course request");
        
        Map<String, String> pathParameters = input.getPathParameters();
        if (pathParameters == null || !pathParameters.containsKey("courseId")) {
            log.warn("Course ID is missing in the request");
            throw new ValidationException("Course ID is required");
        }

        String courseId = pathParameters.get("courseId");
        log.debug("Attempting to publish course with ID: {}", courseId);
        
        try {
            UUID courseUuid = UUID.fromString(courseId);
            PublishCourseCommand command = PublishCourseCommand.builder()
                    .courseId(courseUuid)
                    .build();
                    
            log.info("Publishing course with ID: {}", courseUuid);
            commandHandler.handle(command);
            
            log.info("Successfully published course with ID: {}", courseUuid);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Course published successfully");
            return createSuccessResponse(response);
            
        } catch (IllegalArgumentException e) {
            log.warn("Invalid course ID format: {}", courseId);
            throw new ValidationException("Invalid course ID format");
        } catch (Exception e) {
            log.error("Failed to publish course with ID: {}", courseId, e);
            throw e;
        }
    }
} 