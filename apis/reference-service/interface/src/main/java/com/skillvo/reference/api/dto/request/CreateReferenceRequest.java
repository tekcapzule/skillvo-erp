package com.skillvo.reference.api.dto.request;

import com.skillvo.reference.domain.model.enums.ContentType;
import com.skillvo.reference.domain.model.enums.Level;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Duration;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateReferenceRequest {
    private UUID tenantId;
    private String title;
    private String description;
    private String topicCode;
    private String categoryCode;
    private ContentType contentType;
    private Level level;
    private Duration duration;
    private String resourceUrl;
    private String publisher;
    private String addedBy;
} 