package com.skillvo.reference.application.dto;

import com.skillvo.reference.domain.model.enums.ContentType;
import com.skillvo.reference.domain.model.enums.Level;
import lombok.Builder;
import lombok.Data;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class ReferenceDTO {
    private UUID referenceId;
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
    private String updatedBy;
    private LocalDateTime addedOn;
    private LocalDateTime updatedOn;
    private boolean deleted;
} 