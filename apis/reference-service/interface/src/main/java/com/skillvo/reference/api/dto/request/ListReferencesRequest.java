package com.skillvo.reference.api.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ListReferencesRequest {
    private UUID tenantId;
    private int limit;
    private int offset;
} 