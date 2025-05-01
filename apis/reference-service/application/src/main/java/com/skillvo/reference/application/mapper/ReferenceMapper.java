package com.skillvo.reference.application.mapper;

import com.skillvo.reference.application.dto.ReferenceDTO;
import com.skillvo.reference.domain.model.aggregates.Reference;
import org.springframework.stereotype.Component;

@Component
public class ReferenceMapper {
    public ReferenceDTO toDTO(Reference reference) {
        return ReferenceDTO.builder()
                .referenceId(reference.getReferenceId())
                .tenantId(reference.getTenantId())
                .title(reference.getTitle())
                .description(reference.getDescription())
                .topicCode(reference.getTopicCode())
                .categoryCode(reference.getCategoryCode())
                .contentType(reference.getContentType())
                .level(reference.getLevel())
                .duration(reference.getDuration())
                .resourceUrl(reference.getResourceUrl())
                .publisher(reference.getPublisher())
                .addedBy(reference.getAddedBy())
                .updatedBy(reference.getUpdatedBy())
                .addedOn(reference.getAddedOn())
                .updatedOn(reference.getUpdatedOn())
                .deleted(reference.isDeleted())
                .build();
    }
} 