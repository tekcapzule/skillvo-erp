package com.skillvo.course.domain.model.valueobjects;

import com.skillvo.course.domain.model.enums.Currency;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class PrizeTest {

    @Test
    void shouldCreatePrize() {
        Prize prize = Prize.builder()
            .prize(99.99)
            .discount(10)
            .currency(Currency.USD)
            .build();
        
        assertEquals(99.99, prize.getPrize());
        assertEquals(10, prize.getDiscount());
        assertEquals(Currency.USD, prize.getCurrency());
    }

    @Test
    void shouldCreatePrizeWithZeroDiscount() {
        Prize prize = Prize.builder()
            .prize(49.99)
            .discount(0)
            .currency(Currency.INR)
            .build();
        
        assertEquals(49.99, prize.getPrize());
        assertEquals(0, prize.getDiscount());
        assertEquals(Currency.INR, prize.getCurrency());
    }

    @Test
    void shouldBeEqualWhenSameValues() {
        Prize prize1 = Prize.builder()
            .prize(99.99)
            .discount(10)
            .currency(Currency.USD)
            .build();
            
        Prize prize2 = Prize.builder()
            .prize(99.99)
            .discount(10)
            .currency(Currency.USD)
            .build();
            
        assertEquals(prize1, prize2);
        assertEquals(prize1.hashCode(), prize2.hashCode());
    }

    @Test
    void shouldNotBeEqualWhenDifferentValues() {
        Prize prize1 = Prize.builder()
            .prize(99.99)
            .discount(10)
            .currency(Currency.USD)
            .build();
            
        Prize prize2 = Prize.builder()
            .prize(49.99)
            .discount(5)
            .currency(Currency.INR)
            .build();
            
        assertNotEquals(prize1, prize2);
        assertNotEquals(prize1.hashCode(), prize2.hashCode());
    }
} 