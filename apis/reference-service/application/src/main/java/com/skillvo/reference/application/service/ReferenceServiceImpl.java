package com.skillvo.reference.application.service;

import com.skillvo.reference.domain.model.aggregates.Reference;
import com.skillvo.reference.domain.model.enums.ContentType;
import com.skillvo.reference.domain.model.enums.Level;
import com.skillvo.reference.domain.repository.ReferenceRepository;
import com.skillvo.reference.domain.service.ReferenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ReferenceServiceImpl implements ReferenceService {
    private final ReferenceRepository referenceRepository;

    @Override
    public Reference createReference(UUID tenantId, String title, String description, String topicCode,
                                   String categoryCode, ContentType contentType, Level level,
                                   Duration duration, String resourceUrl, String publisher, String addedBy) {
        Reference reference = Reference.builder()
                .referenceId(UUID.randomUUID())
                .tenantId(tenantId)
                .title(title)
                .description(description)
                .topicCode(topicCode)
                .categoryCode(categoryCode)
                .contentType(contentType)
                .level(level)
                .duration(duration)
                .resourceUrl(resourceUrl)
                .publisher(publisher)
                .addedBy(addedBy)
                .build();

        return referenceRepository.save(reference);
    }

    @Override
    public Optional<Reference> getReference(UUID tenantId, UUID referenceId) {
        return referenceRepository.findById(tenantId, referenceId);
    }

    @Override
    public List<Reference> listReferences(UUID tenantId, int limit, int offset) {
        return referenceRepository.findByTenantId(tenantId, limit, offset);
    }

    @Override
    public List<Reference> searchReferences(UUID tenantId, String topicCode, ContentType contentType,
                                         Level level, int limit, int offset) {
        return referenceRepository.search(tenantId, topicCode, contentType, level, limit, offset);
    }

    @Override
    public Reference updateReference(UUID tenantId, UUID referenceId, String title, String description,
                                   String topicCode, String categoryCode, ContentType contentType,
                                   Level level, Duration duration, String resourceUrl, String publisher,
                                   String updatedBy) {
        Reference reference = referenceRepository.findById(tenantId, referenceId)
                .orElseThrow(() -> new IllegalArgumentException("Reference not found"));

        reference.setTitle(title);
        reference.setDescription(description);
        reference.setTopicCode(topicCode);
        reference.setCategoryCode(categoryCode);
        reference.setContentType(contentType);
        reference.setLevel(level);
        reference.setDuration(duration);
        reference.setResourceUrl(resourceUrl);
        reference.setPublisher(publisher);
        reference.setUpdatedBy(updatedBy);
        reference.setUpdatedOn(LocalDateTime.now());

        return referenceRepository.save(reference);
    }

    @Override
    public void deleteReference(UUID tenantId, UUID referenceId) {
        referenceRepository.delete(tenantId, referenceId);
    }
} 