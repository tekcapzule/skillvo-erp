package com.skillvo.reference.domain.repository;

import com.skillvo.reference.domain.model.aggregates.Reference;
import com.skillvo.reference.domain.model.enums.ContentType;
import com.skillvo.reference.domain.model.enums.Level;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ReferenceRepository {
    Reference save(Reference reference);
    Optional<Reference> findById(UUID tenantId, UUID referenceId);
    List<Reference> findByTenantId(UUID tenantId, int limit, int offset);
    List<Reference> search(UUID tenantId, String topicCode, ContentType contentType, Level level, int limit, int offset);
    void delete(UUID tenantId, UUID referenceId);
} 