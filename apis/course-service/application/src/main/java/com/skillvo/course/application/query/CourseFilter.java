package com.skillvo.course.application.query;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class CourseFilter {
    String tenantId;
    boolean inMarketplace;
} 