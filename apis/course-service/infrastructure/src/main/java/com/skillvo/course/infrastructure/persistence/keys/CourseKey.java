package com.skillvo.course.infrastructure.persistence.keys;

import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class CourseKey {
    private final UUID courseId;
    private final String tenantId;
    private final boolean inMarketplace;

    private CourseKey(UUID courseId, String tenantId, boolean inMarketplace) {
        this.courseId = courseId;
        this.tenantId = tenantId;
        this.inMarketplace = inMarketplace;
    }

    public static CourseKey of(UUID courseId) {
        return new CourseKey(courseId, null, false);
    }

    public static CourseKey of(UUID courseId, String tenantId, boolean inMarketplace) {
        return new CourseKey(courseId, tenantId, inMarketplace);
    }

    public Map<String, AttributeValue> toPrimaryKey() {
        Map<String, AttributeValue> key = new HashMap<>();
        key.put("courseId", AttributeValue.builder().s(courseId.toString()).build());
        return key;
    }

    public Map<String, AttributeValue> toGsiKey() {
        Map<String, AttributeValue> key = new HashMap<>();
        if (tenantId != null) {
            key.put("tenantId", AttributeValue.builder().s(tenantId).build());
            key.put("inMarketplace", AttributeValue.builder().bool(inMarketplace).build());
        }
        return key;
    }

    public UUID getCourseId() {
        return courseId;
    }

    public String getTenantId() {
        return tenantId;
    }

    public boolean isInMarketplace() {
        return inMarketplace;
    }
} 