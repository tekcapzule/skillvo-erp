package com.skillvo.course.application.query;

import lombok.Builder;
import lombok.Value;
import java.util.UUID;

@Value
@Builder
public class GetCourseQuery {
    UUID courseId;
} 