package com.skillvo.reference.application.query.handler;

import com.skillvo.reference.application.dto.ReferenceDTO;
import com.skillvo.reference.application.query.GetReferenceQuery;
import com.skillvo.reference.application.query.ListReferencesQuery;
import com.skillvo.reference.application.query.SearchReferencesQuery;

import java.util.List;

public interface ReferenceQueryHandler {
    ReferenceDTO handle(GetReferenceQuery query);
    List<ReferenceDTO> handle(ListReferencesQuery query);
    List<ReferenceDTO> handle(SearchReferencesQuery query);
} 