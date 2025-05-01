package com.skillvo.reference.api.lambda;

import com.skillvo.reference.common.dto.ReferenceDTO;
import com.skillvo.reference.api.dto.request.SearchReferencesRequest;
import com.skillvo.reference.application.query.SearchReferencesQuery;
import com.skillvo.reference.application.query.handler.ReferenceQueryHandler;
import com.skillvo.reference.api.mapper.ApplicationDTOMapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class SearchReferencesLambda extends BaseLambdaHandler<SearchReferencesRequest, List<ReferenceDTO>> {
    private final ObjectMapper objectMapper;
    private final ReferenceQueryHandler queryHandler;
    private final ApplicationDTOMapper dtoMapper;

    public SearchReferencesLambda(ObjectMapper objectMapper, ReferenceQueryHandler queryHandler, ApplicationDTOMapper dtoMapper) {
        super(objectMapper);
        this.objectMapper = objectMapper;
        this.queryHandler = queryHandler;
        this.dtoMapper = dtoMapper;
    }

    @Override
    protected Class<SearchReferencesRequest> getRequestType() {
        return SearchReferencesRequest.class;
    }

    @Override
    protected List<ReferenceDTO> handleRequest(SearchReferencesRequest request) {
        SearchReferencesQuery query = new SearchReferencesQuery(
                request.getTenantId().toString(),
                request.getTopicCode(),
                request.getContentType(),
                request.getLevel(),
                request.getLimit(),
                request.getOffset()
        );
        return queryHandler.handle(query).stream()
                .map(dtoMapper::toCommonDTO)
                .collect(Collectors.toList());
    }
} 