package com.skillvo.reference.api.lambda;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;

@Slf4j
public abstract class BaseLambdaHandler<I, O> implements RequestHandler<APIGatewayProxyRequestEvent, APIGatewayProxyResponseEvent> {
    protected final ObjectMapper objectMapper;

    protected BaseLambdaHandler(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public APIGatewayProxyResponseEvent handleRequest(APIGatewayProxyRequestEvent input, Context context) {
        try {
            I request = objectMapper.readValue(input.getBody(), getRequestType());
            O response = handleRequest(request);
            return createResponse(HttpStatus.OK, response);
        } catch (Exception e) {
            log.error("Error processing request", e);
            return createErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    protected abstract Class<I> getRequestType();
    protected abstract O handleRequest(I request);

    protected <T> APIGatewayProxyResponseEvent createResponse(HttpStatus status, T body) throws Exception {
        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent();
        response.setStatusCode(status.value());
        response.setBody(objectMapper.writeValueAsString(body));
        response.setHeaders(createHeaders());
        return response;
    }

    protected APIGatewayProxyResponseEvent createErrorResponse(HttpStatus status, String message) {
        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent();
        response.setStatusCode(status.value());
        response.setBody("{\"message\": \"" + message + "\"}");
        response.setHeaders(createHeaders());
        return response;
    }

    private java.util.Map<String, String> createHeaders() {
        java.util.Map<String, String> headers = new java.util.HashMap<>();
        headers.put("Content-Type", "application/json");
        headers.put("Access-Control-Allow-Origin", "*");
        return headers;
    }
} 