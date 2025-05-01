package com.skillvo.course.api.mapper;

import com.skillvo.course.api.dto.PublisherDTO;
import org.springframework.stereotype.Component;

@Component
public class PublisherRequestMapper {
    
    public com.skillvo.course.application.dto.PublisherDTO toApplicationDTO(PublisherDTO dto) {
        return com.skillvo.course.application.dto.PublisherDTO.builder()
                .publisherId(dto.getId() != null ? java.util.UUID.fromString(dto.getId()) : null)
                .name(dto.getName())
                .description(dto.getDescription())
                .website(dto.getWebsite())
                .logoUrl(dto.getLogoUrl())
                .type(dto.getType())
                .build();
    }
} 