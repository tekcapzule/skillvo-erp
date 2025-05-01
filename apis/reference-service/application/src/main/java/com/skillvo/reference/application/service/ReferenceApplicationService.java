package com.skillvo.reference.application.service;

import com.skillvo.reference.application.command.CreateReferenceCommand;
import com.skillvo.reference.application.command.UpdateReferenceCommand;
import com.skillvo.reference.application.command.handler.ReferenceCommandHandler;
import com.skillvo.reference.application.dto.ReferenceDTO;
import com.skillvo.reference.application.mapper.ReferenceMapper;
import com.skillvo.reference.application.query.GetReferenceQuery;
import com.skillvo.reference.application.query.ListReferencesQuery;
import com.skillvo.reference.application.query.SearchReferencesQuery;
import com.skillvo.reference.application.query.handler.ReferenceQueryHandler;
import com.skillvo.reference.domain.model.aggregates.Reference;
import com.skillvo.reference.domain.service.ReferenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReferenceApplicationService implements ReferenceCommandHandler, ReferenceQueryHandler {
    private final ReferenceService referenceService;
    private final ReferenceMapper referenceMapper;

    @Override
    public ReferenceDTO handle(CreateReferenceCommand command) {
        Reference reference = referenceService.createReference(
                command.getTenantId(),
                command.getTitle(),
                command.getDescription(),
                command.getTopicCode(),
                command.getCategoryCode(),
                command.getContentType(),
                command.getLevel(),
                command.getDuration(),
                command.getResourceUrl(),
                command.getPublisher(),
                command.getAddedBy()
        );

        return referenceMapper.toDTO(reference);
    }

    @Override
    public ReferenceDTO handle(GetReferenceQuery query) {
        return referenceService.getReference(query.getTenantId(), query.getReferenceId())
                .map(referenceMapper::toDTO)
                .orElseThrow(() -> new IllegalArgumentException("Reference not found"));
    }

    @Override
    public List<ReferenceDTO> handle(ListReferencesQuery query) {
        return referenceService.listReferences(query.getTenantId(), query.getLimit(), query.getOffset())
                .stream()
                .map(referenceMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ReferenceDTO> handle(SearchReferencesQuery query) {
        return referenceService.searchReferences(
                query.getTenantId(),
                query.getTopicCode(),
                query.getContentType(),
                query.getLevel(),
                query.getLimit(),
                query.getOffset()
        )
                .stream()
                .map(referenceMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ReferenceDTO handle(UpdateReferenceCommand command) {
        Reference reference = referenceService.updateReference(
                command.getTenantId(),
                command.getReferenceId(),
                command.getTitle(),
                command.getDescription(),
                command.getTopicCode(),
                command.getCategoryCode(),
                command.getContentType(),
                command.getLevel(),
                command.getDuration(),
                command.getResourceUrl(),
                command.getPublisher(),
                command.getUpdatedBy()
        );

        return referenceMapper.toDTO(reference);
    }

    @Override
    public void handleDelete(String tenantId, String referenceId) {
        referenceService.deleteReference(UUID.fromString(tenantId), UUID.fromString(referenceId));
    }
} 