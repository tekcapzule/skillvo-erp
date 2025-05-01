package com.skillvo.reference.domain.model.aggregates;

import com.skillvo.reference.domain.model.entities.BaseEntity;
import com.skillvo.reference.domain.model.enums.ContentType;
import com.skillvo.reference.domain.model.enums.Level;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
public class Reference extends BaseEntity {
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

    @Builder
    public Reference(UUID referenceId, UUID tenantId, String title, String description,
                    String topicCode, String categoryCode, ContentType contentType, Level level,
                    Duration duration, String resourceUrl, String publisher, String addedBy,
                    String updatedBy, LocalDateTime addedOn, LocalDateTime updatedOn, Boolean deleted) {
        this.referenceId = referenceId;
        this.tenantId = tenantId;
        this.title = title;
        this.description = description;
        this.topicCode = topicCode;
        this.categoryCode = categoryCode;
        this.contentType = contentType;
        this.level = level;
        this.duration = duration;
        this.resourceUrl = resourceUrl;
        this.publisher = publisher;
        this.addedBy = addedBy;
        this.updatedBy = updatedBy != null ? updatedBy : addedBy;
        this.addedOn = addedOn != null ? addedOn : LocalDateTime.now();
        this.updatedOn = updatedOn != null ? updatedOn : this.addedOn;
        this.deleted = deleted != null ? deleted : false;
    }
} 