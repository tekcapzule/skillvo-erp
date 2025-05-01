package com.skillvo.reference.application.query;

import com.skillvo.reference.domain.model.enums.ContentType;
import com.skillvo.reference.domain.model.enums.Level;
import lombok.Data;

import java.util.UUID;

@Data
public class SearchReferencesQuery {
    private final UUID tenantId;
    private final String topicCode;
    private final ContentType contentType;
    private final Level level;
    private final int limit;
    private final int offset;

    public SearchReferencesQuery(String tenantId) {
        this(tenantId, null, null, null, 10, 0);
    }

    public SearchReferencesQuery(String tenantId, String topicCode, ContentType contentType,
                               Level level, int limit, int offset) {
        this.tenantId = UUID.fromString(tenantId);
        this.topicCode = topicCode;
        this.contentType = contentType;
        this.level = level;
        this.limit = limit;
        this.offset = offset;
    }
} 