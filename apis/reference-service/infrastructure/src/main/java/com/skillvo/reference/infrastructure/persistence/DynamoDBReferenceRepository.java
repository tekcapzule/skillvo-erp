package com.skillvo.reference.infrastructure.persistence;

import com.skillvo.reference.domain.model.aggregates.Reference;
import com.skillvo.reference.domain.model.enums.ContentType;
import com.skillvo.reference.domain.model.enums.Level;
import com.skillvo.reference.domain.repository.ReferenceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.*;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class DynamoDBReferenceRepository implements ReferenceRepository {
    private final DynamoDbClient dynamoDbClient;
    private static final String TABLE_NAME = "ReferenceTable";

    @Override
    public Reference save(Reference reference) {
        Map<String, AttributeValue> item = new HashMap<>();
        item.put("PK", AttributeValue.builder().s("TENANT#" + reference.getTenantId() + "#REFERENCE#" + reference.getReferenceId()).build());
        item.put("SK", AttributeValue.builder().s("REFERENCE").build());
        item.put("tenantId", AttributeValue.builder().s(reference.getTenantId().toString()).build());
        item.put("referenceId", AttributeValue.builder().s(reference.getReferenceId().toString()).build());
        item.put("title", AttributeValue.builder().s(reference.getTitle()).build());
        item.put("description", AttributeValue.builder().s(reference.getDescription()).build());
        item.put("topicCode", AttributeValue.builder().s(reference.getTopicCode()).build());
        item.put("categoryCode", AttributeValue.builder().s(reference.getCategoryCode()).build());
        item.put("contentType", AttributeValue.builder().s(reference.getContentType().name()).build());
        item.put("level", AttributeValue.builder().s(reference.getLevel().name()).build());
        item.put("duration", AttributeValue.builder().s(reference.getDuration().toString()).build());
        item.put("resourceUrl", AttributeValue.builder().s(reference.getResourceUrl()).build());
        item.put("publisher", AttributeValue.builder().s(reference.getPublisher()).build());
        item.put("addedBy", AttributeValue.builder().s(reference.getAddedBy()).build());
        item.put("updatedBy", AttributeValue.builder().s(reference.getUpdatedBy()).build());
        item.put("addedOn", AttributeValue.builder().s(reference.getAddedOn().toString()).build());
        item.put("updatedOn", AttributeValue.builder().s(reference.getUpdatedOn().toString()).build());
        item.put("deleted", AttributeValue.builder().bool(reference.isDeleted()).build());

        PutItemRequest putItemRequest = PutItemRequest.builder()
                .tableName(TABLE_NAME)
                .item(item)
                .build();

        dynamoDbClient.putItem(putItemRequest);
        return reference;
    }

    @Override
    public Optional<Reference> findById(UUID tenantId, UUID referenceId) {
        Map<String, AttributeValue> key = new HashMap<>();
        key.put("PK", AttributeValue.builder().s("TENANT#" + tenantId + "#REFERENCE#" + referenceId).build());
        key.put("SK", AttributeValue.builder().s("REFERENCE").build());

        GetItemRequest getItemRequest = GetItemRequest.builder()
                .tableName(TABLE_NAME)
                .key(key)
                .build();

        GetItemResponse response = dynamoDbClient.getItem(getItemRequest);
        if (!response.hasItem()) {
            return Optional.empty();
        }

        return Optional.of(mapToReference(response.item()));
    }

    @Override
    public List<Reference> findByTenantId(UUID tenantId, int limit, int offset) {
        Map<String, AttributeValue> expressionAttributeValues = new HashMap<>();
        expressionAttributeValues.put(":tenantId", AttributeValue.builder().s(tenantId.toString()).build());

        QueryRequest queryRequest = QueryRequest.builder()
                .tableName(TABLE_NAME)
                .indexName("GSI_TenantReferences")
                .keyConditionExpression("tenantId = :tenantId")
                .expressionAttributeValues(expressionAttributeValues)
                .limit(limit)
                .build();

        QueryResponse response = dynamoDbClient.query(queryRequest);
        return response.items().stream()
                .map(this::mapToReference)
                .collect(Collectors.toList());
    }

    @Override
    public List<Reference> search(UUID tenantId, String topicCode, ContentType contentType, Level level, int limit, int offset) {
        Map<String, AttributeValue> expressionAttributeValues = new HashMap<>();
        expressionAttributeValues.put(":tenantId", AttributeValue.builder().s(tenantId.toString()).build());
        expressionAttributeValues.put(":topicCode", AttributeValue.builder().s(topicCode).build());
        expressionAttributeValues.put(":contentType", AttributeValue.builder().s(contentType.name()).build());
        expressionAttributeValues.put(":level", AttributeValue.builder().s(level.name()).build());

        QueryRequest queryRequest = QueryRequest.builder()
                .tableName(TABLE_NAME)
                .indexName("GSI_TenantReferences")
                .keyConditionExpression("tenantId = :tenantId")
                .filterExpression("topicCode = :topicCode AND contentType = :contentType AND level = :level")
                .expressionAttributeValues(expressionAttributeValues)
                .limit(limit)
                .build();

        QueryResponse response = dynamoDbClient.query(queryRequest);
        return response.items().stream()
                .map(this::mapToReference)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(UUID tenantId, UUID referenceId) {
        Map<String, AttributeValue> key = new HashMap<>();
        key.put("PK", AttributeValue.builder().s("TENANT#" + tenantId + "#REFERENCE#" + referenceId).build());
        key.put("SK", AttributeValue.builder().s("REFERENCE").build());

        DeleteItemRequest deleteItemRequest = DeleteItemRequest.builder()
                .tableName(TABLE_NAME)
                .key(key)
                .build();

        dynamoDbClient.deleteItem(deleteItemRequest);
    }

    private Reference mapToReference(Map<String, AttributeValue> item) {
        return Reference.builder()
                .referenceId(UUID.fromString(item.get("referenceId").s()))
                .tenantId(UUID.fromString(item.get("tenantId").s()))
                .title(item.get("title").s())
                .description(item.get("description").s())
                .topicCode(item.get("topicCode").s())
                .categoryCode(item.get("categoryCode").s())
                .contentType(ContentType.valueOf(item.get("contentType").s()))
                .level(Level.valueOf(item.get("level").s()))
                .duration(Duration.parse(item.get("duration").s()))
                .resourceUrl(item.get("resourceUrl").s())
                .publisher(item.get("publisher").s())
                .addedBy(item.get("addedBy").s())
                .updatedBy(item.get("updatedBy").s())
                .addedOn(LocalDateTime.parse(item.get("addedOn").s()))
                .updatedOn(LocalDateTime.parse(item.get("updatedOn").s()))
                .build();
    }
} 