package com.skillvo.reference.application.query;

import lombok.Data;

import java.util.UUID;

@Data
public class GetReferenceQuery {
    private final UUID tenantId;
    private final UUID referenceId;

    public GetReferenceQuery(String tenantId, String referenceId) {
        this.tenantId = UUID.fromString(tenantId);
        this.referenceId = UUID.fromString(referenceId);
    }
} 