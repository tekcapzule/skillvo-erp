package com.skillvo.course.infrastructure.persistence.query;

import com.skillvo.course.domain.repository.CourseFilter;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.QueryRequest;
import software.amazon.awssdk.services.dynamodb.model.ScanRequest;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class DynamoDBQueryBuilder {
    private static final String TABLE_NAME = "Courses";
    private static final String TENANT_INDEX = "TenantIdIndex";
    private static final String STATUS_INDEX = "StatusIndex";
    private static final String LEVEL_INDEX = "LevelIndex";
    private static final String TAGS_INDEX = "TagsIndex";

    private String indexName;
    private final Map<String, String> expressionNames;
    private final Map<String, AttributeValue> expressionValues;
    private final StringBuilder keyConditionExpression;
    private final StringBuilder filterExpression;
    private Integer limit;

    public DynamoDBQueryBuilder() {
        this.expressionNames = new HashMap<>();
        this.expressionValues = new HashMap<>();
        this.keyConditionExpression = new StringBuilder();
        this.filterExpression = new StringBuilder();
    }

    public DynamoDBQueryBuilder withFilter(CourseFilter filter) {
        // Handle primary index conditions
        if (filter.getTenantId() != null) {
            indexName = TENANT_INDEX;
            addKeyCondition("tenantId", filter.getTenantId());
            if (filter.getInMarketplace() != null) {
                addKeyCondition("inMarketplace", filter.getInMarketplace());
            }
        } else if (filter.getStatus() != null) {
            indexName = STATUS_INDEX;
            addKeyCondition("status", filter.getStatus().name());
        } else if (filter.getLevel() != null) {
            indexName = LEVEL_INDEX;
            addKeyCondition("level", filter.getLevel().name());
        } else if (filter.getTags() != null && !filter.getTags().isEmpty()) {
            indexName = TAGS_INDEX;
            addKeyCondition("tag", filter.getTags().get(0));
        }

        // Handle filter conditions
        if (filter.getTags() != null && !filter.getTags().isEmpty() && indexName != TAGS_INDEX) {
            if (filterExpression.length() > 0) {
                filterExpression.append(" AND ");
            }
            filterExpression.append("(");
            for (int i = 0; i < filter.getTags().size(); i++) {
                if (i > 0) {
                    filterExpression.append(" OR ");
                }
                String tagPlaceholder = ":tagValue" + i;
                filterExpression.append("contains(#tags, ").append(tagPlaceholder).append(")");
                expressionValues.put(tagPlaceholder, AttributeValue.builder().s(filter.getTags().get(i)).build());
            }
            filterExpression.append(")");
            expressionNames.put("#tags", "tags");
        }

        // Handle pagination
        if (filter.getLimit() != null) {
            this.limit = filter.getLimit();
        }

        return this;
    }

    public Optional<QueryRequest> buildQueryRequest() {
        if (indexName == null) {
            return Optional.empty();
        }

        QueryRequest.Builder builder = QueryRequest.builder()
                .tableName(TABLE_NAME)
                .indexName(indexName);

        if (keyConditionExpression.length() > 0) {
            builder.keyConditionExpression(keyConditionExpression.toString());
        }

        if (filterExpression.length() > 0) {
            builder.filterExpression(filterExpression.toString());
        }

        if (!expressionNames.isEmpty()) {
            builder.expressionAttributeNames(expressionNames);
        }

        if (!expressionValues.isEmpty()) {
            builder.expressionAttributeValues(expressionValues);
        }

        return Optional.of(builder.build());
    }

    public ScanRequest buildScanRequest() {
        ScanRequest.Builder builder = ScanRequest.builder()
                .tableName(TABLE_NAME);

        if (filterExpression.length() > 0) {
            builder.filterExpression(filterExpression.toString());
        }

        if (!expressionNames.isEmpty()) {
            builder.expressionAttributeNames(expressionNames);
        }

        if (!expressionValues.isEmpty()) {
            builder.expressionAttributeValues(expressionValues);
        }

        return builder.build();
    }

    private void addKeyCondition(String attributeName, Object value) {
        String placeholder = "#" + attributeName;
        String valuePlaceholder = ":" + attributeName;

        if (keyConditionExpression.length() > 0) {
            keyConditionExpression.append(" AND ");
        }

        keyConditionExpression.append(placeholder).append(" = ").append(valuePlaceholder);
        expressionNames.put(placeholder, attributeName);
        expressionValues.put(valuePlaceholder, toAttributeValue(value));
    }

    private void addFilterCondition(String condition, String attributeName, Object value) {
        if (filterExpression.length() > 0) {
            filterExpression.append(" AND ");
        }

        filterExpression.append(condition);
        expressionNames.put("#" + attributeName, attributeName);
    }

    private AttributeValue toAttributeValue(Object value) {
        if (value instanceof String) {
            return AttributeValue.builder().s((String) value).build();
        } else if (value instanceof Boolean) {
            return AttributeValue.builder().bool((Boolean) value).build();
        } else if (value instanceof Number) {
            return AttributeValue.builder().n(value.toString()).build();
        }
        throw new IllegalArgumentException("Unsupported value type: " + value.getClass());
    }
} 