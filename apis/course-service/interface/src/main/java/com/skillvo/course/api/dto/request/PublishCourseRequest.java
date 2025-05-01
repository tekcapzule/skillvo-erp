package com.skillvo.course.api.dto.request;

import lombok.Builder;
import lombok.Value;

import java.util.UUID;

@Value
@Builder
public class PublishCourseRequest {
    UUID courseId;
    String tenantId;
} 