package com.skillvo.course.api.dto;

import com.skillvo.course.domain.model.enums.PublisherType;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class PublisherDTO {
    String id;
    String name;
    String description;
    String website;
    String logoUrl;
    PublisherType type;
} 