package com.skillvo.reference.application.query;

import lombok.Data;

import java.util.UUID;

@Data
public class ListReferencesQuery {
    private final UUID tenantId;
    private final int limit;
    private final int offset;

    public ListReferencesQuery(String tenantId) {
        this(tenantId, 10, 0);
    }

    public ListReferencesQuery(String tenantId, int limit, int offset) {
        this.tenantId = UUID.fromString(tenantId);
        this.limit = limit;
        this.offset = offset;
    }
} 