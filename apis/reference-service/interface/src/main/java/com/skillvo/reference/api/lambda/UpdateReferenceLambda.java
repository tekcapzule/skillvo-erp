package com.skillvo.reference.api.lambda;

import com.skillvo.reference.common.dto.ReferenceDTO;
import com.skillvo.reference.api.dto.request.UpdateReferenceRequest;
import com.skillvo.reference.application.command.UpdateReferenceCommand;
import com.skillvo.reference.application.command.handler.ReferenceCommandHandler;
import com.skillvo.reference.api.mapper.ApplicationDTOMapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

@Component
public class UpdateReferenceLambda extends BaseLambdaHandler<UpdateReferenceRequest, ReferenceDTO> {
    private final ObjectMapper objectMapper;
    private final ReferenceCommandHandler commandHandler;
    private final ApplicationDTOMapper dtoMapper;

    public UpdateReferenceLambda(ObjectMapper objectMapper, ReferenceCommandHandler commandHandler, ApplicationDTOMapper dtoMapper) {
        super(objectMapper);
        this.objectMapper = objectMapper;
        this.commandHandler = commandHandler;
        this.dtoMapper = dtoMapper;
    }

    @Override
    protected Class<UpdateReferenceRequest> getRequestType() {
        return UpdateReferenceRequest.class;
    }

    @Override
    protected ReferenceDTO handleRequest(UpdateReferenceRequest request) {
        UpdateReferenceCommand command = UpdateReferenceCommand.builder()
                .tenantId(request.getTenantId())
                .referenceId(request.getReferenceId())
                .title(request.getTitle())
                .description(request.getDescription())
                .topicCode(request.getTopicCode())
                .categoryCode(request.getCategoryCode())
                .contentType(request.getContentType())
                .level(request.getLevel())
                .duration(request.getDuration())
                .resourceUrl(request.getResourceUrl())
                .publisher(request.getPublisher())
                .updatedBy(request.getUpdatedBy())
                .build();

        return dtoMapper.toCommonDTO(commandHandler.handle(command));
    }
} 