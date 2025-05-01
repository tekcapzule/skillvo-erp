package com.skillvo.course.application.query;

import com.skillvo.course.domain.model.enums.Level;
import com.skillvo.course.domain.model.enums.Status;
import lombok.Builder;
import lombok.Value;

import java.util.List;

@Value
@Builder
public class ListCoursesQuery {
    String tenantId;
    Status status;
    Level level;
    List<String> tags;
    Integer limit;
    Integer offset;
    boolean inMarketplace;
} 