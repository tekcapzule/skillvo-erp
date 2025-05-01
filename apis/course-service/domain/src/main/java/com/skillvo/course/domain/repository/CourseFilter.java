package com.skillvo.course.domain.repository;

import com.skillvo.course.domain.model.enums.Level;
import com.skillvo.course.domain.model.enums.Status;
import lombok.Builder;
import lombok.Value;
import java.util.List;

@Value
@Builder
public class CourseFilter {
    String tenantId;
    Status status;
    List<String> tags;
    Level level;
    Integer limit;
    Integer offset;
    Boolean inMarketplace;
} 