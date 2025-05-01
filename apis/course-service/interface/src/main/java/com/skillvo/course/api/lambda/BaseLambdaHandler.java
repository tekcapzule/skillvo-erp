package com.skillvo.course.api.lambda;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.skillvo.course.application.exception.CourseNotFoundException;
import com.skillvo.course.api.config.ObjectMapperConfig;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
public abstract class BaseLambdaHandler implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {
    protected final ObjectMapper objectMapper;
    protected final Validator validator;

    protected BaseLambdaHandler() {
        this.objectMapper = ObjectMapperConfig.createObjectMapper();
        try (ValidatorFactory factory = Validation.buildDefaultValidatorFactory()) {
            this.validator = factory.getValidator();
        }
    }

    @Override
    public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent input, Context context) {
        try {
            log.debug("Processing request for path: {}, method: {}", input.getPath(), input.getHttpMethod());
            return processRequest(input, context);
        } catch (CourseNotFoundException e) {
            log.warn("Course not found: {}", e.getMessage());
            return createErrorResponse(404, e.getMessage());
        } catch (ValidationException | IllegalArgumentException e) {
            log.warn("Validation error: {}", e.getMessage());
            return createErrorResponse(400, e.getMessage());
        } catch (JsonParseException e) {
            log.warn("Invalid JSON format: {}", e.getMessage());
            return createErrorResponse(400, "Invalid JSON format: " + e.getMessage());
        } catch (JsonMappingException e) {
            log.warn("Error mapping JSON to object: {}", e.getMessage());
            return createErrorResponse(400, "Error mapping JSON to object: " + e.getMessage());
        } catch (Exception e) {
            log.error("Unexpected error processing request", e);
            return createErrorResponse(500, "Internal server error");
        }
    }

    protected abstract APIGatewayProxyResponseEvent processRequest(APIGatewayProxyRequestEvent input, Context context) throws Exception;

    protected <T> T parseRequestBody(String body, Class<T> clazz) throws Exception {
        if (body == null || body.trim().isEmpty()) {
            throw new ValidationException("Request body is required");
        }
        try {
            T request = objectMapper.readValue(body, clazz);
            validateRequest(request);
            return request;
        } catch (JsonParseException | JsonMappingException e) {
            log.error("Error parsing request body: {}", e.getMessage());
            throw e;
        }
    }

    private <T> void validateRequest(T request) {
        if (request == null) {
            throw new ValidationException("Request body is required");
        }
        Set<ConstraintViolation<T>> violations = validator.validate(request);
        if (!violations.isEmpty()) {
            String errorMessage = violations.stream()
                    .map(violation -> violation.getPropertyPath() + ": " + violation.getMessage())
                    .collect(Collectors.joining(", "));
            throw new ValidationException("Validation failed: " + errorMessage);
        }
    }

    protected APIGatewayProxyResponseEvent createSuccessResponse(Object body) {
        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent();
        response.setStatusCode(200);
        response.setHeaders(createHeaders());
        if (body == null) {
            response.setStatusCode(204);
            return response;
        }
        try {
            response.setBody(objectMapper.writeValueAsString(body));
        } catch (Exception e) {
            log.error("Error serializing response", e);
            return createErrorResponse(500, "Internal server error");
        }
        return response;
    }

    protected APIGatewayProxyResponseEvent createErrorResponse(int statusCode, String message) {
        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent();
        response.setStatusCode(statusCode);
        response.setHeaders(createHeaders());
        try {
            Map<String, String> errorBody = new HashMap<>();
            errorBody.put("error", message);
            response.setBody(objectMapper.writeValueAsString(errorBody));
        } catch (Exception e) {
            log.error("Error serializing error response", e);
            response.setBody("{\"error\":\"" + message + "\"}");
        }
        return response;
    }

    private Map<String, String> createHeaders() {
        Map<String, String> headers = new HashMap<>();
        headers.put("Content-Type", "application/json");
        return headers;
    }

    protected static class ValidationException extends RuntimeException {
        public ValidationException(String message) {
            super(message);
        }
    }
} 