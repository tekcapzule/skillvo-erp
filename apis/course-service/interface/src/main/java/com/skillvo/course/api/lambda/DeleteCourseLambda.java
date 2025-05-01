package com.skillvo.course.api.lambda;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.skillvo.course.application.command.DeleteCourseCommand;
import com.skillvo.course.application.command.handler.CourseCommandHandler;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

@RequiredArgsConstructor
public class DeleteCourseLambda extends BaseLambdaHandler {
    private final CourseCommandHandler commandHandler;

    @Override
    protected APIGatewayProxyResponseEvent processRequest(APIGatewayProxyRequestEvent input, Context context) throws Exception {
        String courseId = input.getPathParameters().get("courseId");
        DeleteCourseCommand command = DeleteCourseCommand.builder()
                .courseId(UUID.fromString(courseId))
                .build();
        commandHandler.handle(command);
        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent();
        response.setStatusCode(204);
        return response;
    }
} 