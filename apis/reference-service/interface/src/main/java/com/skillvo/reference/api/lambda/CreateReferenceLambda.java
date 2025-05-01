package com.skillvo.reference.api.lambda;

import com.skillvo.reference.common.dto.ReferenceDTO;
import com.skillvo.reference.api.dto.request.CreateReferenceRequest;
import com.skillvo.reference.application.command.CreateReferenceCommand;
import com.skillvo.reference.application.command.handler.ReferenceCommandHandler;
import com.skillvo.reference.api.mapper.ApplicationDTOMapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

@Component
public class CreateReferenceLambda extends BaseLambdaHandler<CreateReferenceRequest, ReferenceDTO> {
    private final ReferenceCommandHandler commandHandler;
    private final ApplicationDTOMapper dtoMapper;

    public CreateReferenceLambda(ObjectMapper objectMapper, ReferenceCommandHandler commandHandler, ApplicationDTOMapper dtoMapper) {
        super(objectMapper);
        this.commandHandler = commandHandler;
        this.dtoMapper = dtoMapper;
    }

    @Override
    protected Class<CreateReferenceRequest> getRequestType() {
        return CreateReferenceRequest.class;
    }

    @Override
    protected ReferenceDTO handleRequest(CreateReferenceRequest request) {
        CreateReferenceCommand command = CreateReferenceCommand.builder()
                .tenantId(request.getTenantId())
                .title(request.getTitle())
                .description(request.getDescription())
                .topicCode(request.getTopicCode())
                .categoryCode(request.getCategoryCode())
                .contentType(request.getContentType())
                .level(request.getLevel())
                .duration(request.getDuration())
                .resourceUrl(request.getResourceUrl())
                .publisher(request.getPublisher())
                .addedBy(request.getAddedBy())
                .build();

        return dtoMapper.toCommonDTO(commandHandler.handle(command));
    }
} 