package com.skillvo.reference.api.lambda;

import com.skillvo.reference.api.dto.request.GetReferenceRequest;
import com.skillvo.reference.application.command.handler.ReferenceCommandHandler;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

@Component
public class DeleteReferenceLambda extends BaseLambdaHandler<GetReferenceRequest, Void> {
    private final ObjectMapper objectMapper;
    private final ReferenceCommandHandler commandHandler;

    public DeleteReferenceLambda(ObjectMapper objectMapper, ReferenceCommandHandler commandHandler) {
        super(objectMapper);
        this.objectMapper = objectMapper;
        this.commandHandler = commandHandler;
    }

    @Override
    protected Class<GetReferenceRequest> getRequestType() {
        return GetReferenceRequest.class;
    }

    @Override
    protected Void handleRequest(GetReferenceRequest request) {
        commandHandler.handleDelete(request.getTenantId().toString(), request.getReferenceId().toString());
        return null;
    }
} 