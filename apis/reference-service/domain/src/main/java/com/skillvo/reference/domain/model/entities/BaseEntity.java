package com.skillvo.reference.domain.model.entities;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public abstract class BaseEntity {
    protected String addedBy;
    protected String updatedBy;
    protected LocalDateTime addedOn;
    protected LocalDateTime updatedOn;
    protected boolean deleted;
} 