package com.skillvo.reference.api.lambda;

import com.skillvo.reference.common.dto.ReferenceDTO;
import com.skillvo.reference.api.dto.request.ListReferencesRequest;
import com.skillvo.reference.application.query.ListReferencesQuery;
import com.skillvo.reference.application.query.handler.ReferenceQueryHandler;
import com.skillvo.reference.api.mapper.ApplicationDTOMapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ListReferencesLambda extends BaseLambdaHandler<ListReferencesRequest, List<ReferenceDTO>> {
    private final ObjectMapper objectMapper;
    private final ReferenceQueryHandler queryHandler;
    private final ApplicationDTOMapper dtoMapper;

    public ListReferencesLambda(ObjectMapper objectMapper, ReferenceQueryHandler queryHandler, ApplicationDTOMapper dtoMapper) {
        super(objectMapper);
        this.objectMapper = objectMapper;
        this.queryHandler = queryHandler;
        this.dtoMapper = dtoMapper;
    }

    @Override
    protected Class<ListReferencesRequest> getRequestType() {
        return ListReferencesRequest.class;
    }

    @Override
    protected List<ReferenceDTO> handleRequest(ListReferencesRequest request) {
        ListReferencesQuery query = new ListReferencesQuery(request.getTenantId().toString(), request.getLimit(), request.getOffset());
        return queryHandler.handle(query).stream()
                .map(dtoMapper::toCommonDTO)
                .collect(Collectors.toList());
    }
} 