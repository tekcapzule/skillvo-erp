package com.skillvo.course.domain.model.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import java.util.Arrays;
import java.util.stream.Collectors;

public enum PricingModel {
    FREE,
    PAID;

    @JsonCreator
    public static PricingModel fromString(String value) {
        if (value == null) {
            throw new IllegalArgumentException("PricingModel cannot be null");
        }
        try {
            return PricingModel.valueOf(value.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid PricingModel value: " + value + ". Valid values are: " + 
                Arrays.stream(PricingModel.values())
                    .map(PricingModel::name)
                    .collect(Collectors.joining(", ")));
        }
    }

    @JsonValue
    public String getValue() {
        return name();
    }
} 