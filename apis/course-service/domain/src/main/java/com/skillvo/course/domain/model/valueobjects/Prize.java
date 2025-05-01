package com.skillvo.course.domain.model.valueobjects;

import com.skillvo.course.domain.model.enums.Currency;
import lombok.Value;
import lombok.Builder;
import lombok.AllArgsConstructor;
import lombok.AccessLevel;
import java.util.Objects;

@Value
@Builder
@AllArgsConstructor(access = AccessLevel.PUBLIC)
public class Prize {
    double prize;
    int discount;
    Currency currency;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Prize prize1 = (Prize) o;
        return Double.compare(prize1.prize, prize) == 0 &&
                discount == prize1.discount &&
                currency == prize1.currency;
    }

    @Override
    public int hashCode() {
        return Objects.hash(prize, discount, currency);
    }
} 