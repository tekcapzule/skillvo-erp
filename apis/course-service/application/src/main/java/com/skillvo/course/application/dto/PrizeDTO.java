package com.skillvo.course.application.dto;

import com.skillvo.course.domain.model.enums.Currency;
import lombok.Value;
import lombok.Builder;
import lombok.AllArgsConstructor;

@Value
@Builder
@AllArgsConstructor
public class PrizeDTO {
    double prize;
    int discount;
    Currency currency;
} 