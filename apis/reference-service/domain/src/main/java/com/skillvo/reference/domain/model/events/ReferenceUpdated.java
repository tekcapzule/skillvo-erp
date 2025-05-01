package com.skillvo.reference.domain.model.events;

import com.skillvo.reference.domain.model.aggregates.Reference;
import lombok.Getter;

import java.util.UUID;

@Getter
public class ReferenceUpdated extends DomainEvent {
    private final UUID referenceId;
    private final UUID tenantId;
    private final String title;
    private final String contentType;

    public ReferenceUpdated(Reference reference) {
        this.referenceId = reference.getReferenceId();
        this.tenantId = reference.getTenantId();
        this.title = reference.getTitle();
        this.contentType = reference.getContentType().name();
    }
} 