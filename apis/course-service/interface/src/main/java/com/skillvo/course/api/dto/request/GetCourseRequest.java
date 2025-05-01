package com.skillvo.course.api.dto.request;

import lombok.Builder;
import lombok.Value;

import java.util.UUID;

@Value
@Builder
public class GetCourseRequest {
    UUID courseId;
    String tenantId;
} 