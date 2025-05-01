package com.skillvo.course.application.dto;

import com.skillvo.course.domain.model.enums.PublisherType;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PublisherDTO {
    private UUID publisherId;
    private String name;
    private PublisherType type;
    private String logoUrl;
    private String website;
    private String contactEmail;
    private String description;
    private String country;
} 