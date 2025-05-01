package com.skillvo.course.domain.model.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import java.util.Arrays;
import java.util.stream.Collectors;

public enum LearningMode {
    ONLINE,
    OFFLINE,
    HYBRID;

    @JsonCreator
    public static LearningMode fromString(String value) {
        if (value == null) {
            throw new IllegalArgumentException("LearningMode cannot be null");
        }
        try {
            return LearningMode.valueOf(value.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid LearningMode value: " + value + ". Valid values are: " + 
                Arrays.stream(LearningMode.values())
                    .map(LearningMode::name)
                    .collect(Collectors.joining(", ")));
        }
    }

    @JsonValue
    public String getValue() {
        return name();
    }
} 