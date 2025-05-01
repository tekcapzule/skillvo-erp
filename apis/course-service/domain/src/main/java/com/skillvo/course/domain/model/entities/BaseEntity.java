package com.skillvo.course.domain.model.entities;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
public abstract class BaseEntity {
    private String addedBy;
    private String updatedBy;
    private LocalDateTime addedOn;
    private LocalDateTime updatedOn;
} 