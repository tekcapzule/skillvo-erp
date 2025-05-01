package com.skillvo.course.api.mapper;

import com.skillvo.course.api.dto.SectionDTO;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class SectionRequestMapper {
    
    public com.skillvo.course.application.dto.SectionDTO toApplicationDTO(SectionDTO dto) {
        return com.skillvo.course.application.dto.SectionDTO.builder()
                .sectionId(dto.getSectionId())
                .title(dto.getTitle())
                .description(dto.getDescription())
                .order(dto.getOrder())
                .duration(dto.getDuration())
                .build();
    }

    public List<com.skillvo.course.application.dto.SectionDTO> toApplicationDTOList(List<SectionDTO> dtos) {
        return dtos.stream()
                .map(this::toApplicationDTO)
                .collect(Collectors.toList());
    }
} 