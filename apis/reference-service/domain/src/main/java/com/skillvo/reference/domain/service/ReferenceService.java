package com.skillvo.reference.domain.service;

import com.skillvo.reference.domain.model.aggregates.Reference;
import com.skillvo.reference.domain.model.enums.ContentType;
import com.skillvo.reference.domain.model.enums.Level;
import com.skillvo.reference.domain.model.exception.ReferenceNotFoundException;
import com.skillvo.reference.domain.repository.ReferenceRepository;

import java.time.Duration;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ReferenceService {
    Reference createReference(UUID tenantId, String title, String description, String topicCode,
                            String categoryCode, ContentType contentType, Level level,
                            Duration duration, String resourceUrl, String publisher, String addedBy);

    Optional<Reference> getReference(UUID tenantId, UUID referenceId);

    List<Reference> listReferences(UUID tenantId, int limit, int offset);

    List<Reference> searchReferences(UUID tenantId, String topicCode, ContentType contentType,
                                   Level level, int limit, int offset);

    Reference updateReference(UUID tenantId, UUID referenceId, String title, String description,
                            String topicCode, String categoryCode, ContentType contentType,
                            Level level, Duration duration, String resourceUrl, String publisher,
                            String updatedBy);

    void deleteReference(UUID tenantId, UUID referenceId);
} 