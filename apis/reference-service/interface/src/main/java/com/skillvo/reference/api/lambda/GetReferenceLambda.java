package com.skillvo.reference.api.lambda;

import com.skillvo.reference.common.dto.ReferenceDTO;
import com.skillvo.reference.api.dto.request.GetReferenceRequest;
import com.skillvo.reference.application.query.GetReferenceQuery;
import com.skillvo.reference.application.query.handler.ReferenceQueryHandler;
import com.skillvo.reference.api.mapper.ApplicationDTOMapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

@Component
public class GetReferenceLambda extends BaseLambdaHandler<GetReferenceRequest, ReferenceDTO> {
    private final ObjectMapper objectMapper;
    private final ReferenceQueryHandler queryHandler;
    private final ApplicationDTOMapper dtoMapper;

    public GetReferenceLambda(ObjectMapper objectMapper, ReferenceQueryHandler queryHandler, ApplicationDTOMapper dtoMapper) {
        super(objectMapper);
        this.objectMapper = objectMapper;
        this.queryHandler = queryHandler;
        this.dtoMapper = dtoMapper;
    }

    @Override
    protected Class<GetReferenceRequest> getRequestType() {
        return GetReferenceRequest.class;
    }

    @Override
    protected ReferenceDTO handleRequest(GetReferenceRequest request) {
        GetReferenceQuery query = new GetReferenceQuery(request.getTenantId().toString(), request.getReferenceId().toString());
        return dtoMapper.toCommonDTO(queryHandler.handle(query));
    }
} 