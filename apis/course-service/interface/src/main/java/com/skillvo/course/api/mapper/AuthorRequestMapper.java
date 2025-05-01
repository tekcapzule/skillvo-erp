package com.skillvo.course.api.mapper;

import com.skillvo.course.api.dto.AuthorDTO;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class AuthorRequestMapper {
    
    public com.skillvo.course.application.dto.AuthorDTO toApplicationDTO(AuthorDTO dto) {
        return com.skillvo.course.application.dto.AuthorDTO.builder()
                .authorId(dto.getId() != null ? java.util.UUID.fromString(dto.getId()) : null)
                .firstName(dto.getName().split(" ")[0])
                .lastName(dto.getName().contains(" ") ? dto.getName().substring(dto.getName().indexOf(" ") + 1) : "")
                .emailId(dto.getEmail())
                .build();
    }

    public List<com.skillvo.course.application.dto.AuthorDTO> toApplicationDTOList(List<AuthorDTO> dtos) {
        return dtos.stream()
                .map(this::toApplicationDTO)
                .collect(Collectors.toList());
    }
} 