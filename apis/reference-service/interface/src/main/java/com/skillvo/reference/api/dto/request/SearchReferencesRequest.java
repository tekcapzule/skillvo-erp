package com.skillvo.reference.api.dto.request;

import com.skillvo.reference.domain.model.enums.ContentType;
import com.skillvo.reference.domain.model.enums.Level;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchReferencesRequest {
    private UUID tenantId;
    private String topicCode;
    private ContentType contentType;
    private Level level;
    private int limit;
    private int offset;
} 