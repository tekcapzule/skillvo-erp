package com.skillvo.course.api.mapper;

import com.skillvo.course.api.dto.PrizeDTO;
import org.springframework.stereotype.Component;

@Component
public class PrizeRequestMapper {
    
    public com.skillvo.course.application.dto.PrizeDTO toApplicationDTO(PrizeDTO dto) {
        return com.skillvo.course.application.dto.PrizeDTO.builder()
                .prize(dto.getAmount())
                .currency(dto.getCurrency())
                .discount(0)
                .build();
    }
} 