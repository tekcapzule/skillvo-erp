package com.skillvo.course.api.dto;

import com.skillvo.course.domain.model.enums.Currency;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class PrizeDTO {
    double amount;
    Currency currency;
} 