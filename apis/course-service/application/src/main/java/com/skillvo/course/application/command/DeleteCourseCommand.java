package com.skillvo.course.application.command;

import lombok.Builder;
import lombok.Value;
import java.util.UUID;

@Value
@Builder
public class DeleteCourseCommand {
    UUID courseId;
} 