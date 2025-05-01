package com.skillvo.reference.api.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ApplicationDTOMapper {
    @Mapping(target = "referenceId", source = "referenceId")
    @Mapping(target = "tenantId", source = "tenantId")
    @Mapping(target = "title", source = "title")
    @Mapping(target = "description", source = "description")
    @Mapping(target = "topicCode", source = "topicCode")
    @Mapping(target = "categoryCode", source = "categoryCode")
    @Mapping(target = "contentType", source = "contentType")
    @Mapping(target = "level", source = "level")
    @Mapping(target = "duration", source = "duration")
    @Mapping(target = "resourceUrl", source = "resourceUrl")
    @Mapping(target = "publisher", source = "publisher")
    @Mapping(target = "addedBy", source = "addedBy")
    @Mapping(target = "updatedBy", source = "updatedBy")
    @Mapping(target = "addedOn", source = "addedOn")
    @Mapping(target = "updatedOn", source = "updatedOn")
    @Mapping(target = "deleted", source = "deleted")
    com.skillvo.reference.common.dto.ReferenceDTO toCommonDTO(com.skillvo.reference.application.dto.ReferenceDTO dto);

    @Mapping(target = "referenceId", source = "referenceId")
    @Mapping(target = "tenantId", source = "tenantId")
    @Mapping(target = "title", source = "title")
    @Mapping(target = "description", source = "description")
    @Mapping(target = "topicCode", source = "topicCode")
    @Mapping(target = "categoryCode", source = "categoryCode")
    @Mapping(target = "contentType", source = "contentType")
    @Mapping(target = "level", source = "level")
    @Mapping(target = "duration", source = "duration")
    @Mapping(target = "resourceUrl", source = "resourceUrl")
    @Mapping(target = "publisher", source = "publisher")
    @Mapping(target = "addedBy", source = "addedBy")
    @Mapping(target = "updatedBy", source = "updatedBy")
    @Mapping(target = "addedOn", source = "addedOn")
    @Mapping(target = "updatedOn", source = "updatedOn")
    @Mapping(target = "deleted", source = "deleted")
    com.skillvo.reference.application.dto.ReferenceDTO toApplicationDTO(com.skillvo.reference.common.dto.ReferenceDTO dto);
} 