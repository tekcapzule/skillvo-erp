package com.skillvo.course.api.dto.request;

import com.skillvo.course.domain.model.enums.Level;
import com.skillvo.course.domain.model.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourseFilterRequest {
    String tenantId;
    Status status;
    Level level;
    List<String> tags;
    Integer limit;
    Integer offset;
    boolean inMarketplace;
} 