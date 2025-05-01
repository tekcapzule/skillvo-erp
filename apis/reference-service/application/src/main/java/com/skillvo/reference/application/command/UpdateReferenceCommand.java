package com.skillvo.reference.application.command;

import com.skillvo.reference.domain.model.enums.ContentType;
import com.skillvo.reference.domain.model.enums.Level;
import lombok.Builder;
import lombok.Data;

import java.time.Duration;
import java.util.UUID;

@Data
@Builder
public class UpdateReferenceCommand {
    private UUID tenantId;
    private UUID referenceId;
    private String title;
    private String description;
    private String topicCode;
    private String categoryCode;
    private ContentType contentType;
    private Level level;
    private Duration duration;
    private String resourceUrl;
    private String publisher;
    private String updatedBy;

    public void setId(String id) {
        this.referenceId = UUID.fromString(id);
    }
} 