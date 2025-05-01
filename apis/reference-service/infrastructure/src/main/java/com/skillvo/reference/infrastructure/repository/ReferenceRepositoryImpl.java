package com.skillvo.reference.infrastructure.repository;

import com.skillvo.reference.domain.model.aggregates.Reference;
import com.skillvo.reference.domain.model.enums.ContentType;
import com.skillvo.reference.domain.model.enums.Level;
import com.skillvo.reference.domain.repository.ReferenceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class ReferenceRepositoryImpl implements ReferenceRepository {
    private final ReferenceDynamoDBRepository dynamoDBRepository;

    @Override
    public Reference save(Reference reference) {
        return dynamoDBRepository.save(reference);
    }

    @Override
    public Optional<Reference> findById(UUID tenantId, UUID referenceId) {
        return dynamoDBRepository.findById(tenantId, referenceId);
    }

    @Override
    public List<Reference> findByTenantId(UUID tenantId, int limit, int offset) {
        return dynamoDBRepository.findByTenantId(tenantId, limit, offset);
    }

    @Override
    public List<Reference> search(UUID tenantId, String topicCode, ContentType contentType,
                                Level level, int limit, int offset) {
        return dynamoDBRepository.search(tenantId, topicCode, contentType, level, limit, offset);
    }

    @Override
    public void delete(UUID tenantId, UUID referenceId) {
        dynamoDBRepository.delete(tenantId, referenceId);
    }
} 