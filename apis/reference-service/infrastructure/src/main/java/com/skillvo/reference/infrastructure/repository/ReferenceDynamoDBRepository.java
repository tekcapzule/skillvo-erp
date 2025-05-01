package com.skillvo.reference.infrastructure.repository;

import com.skillvo.reference.domain.model.aggregates.Reference;
import com.skillvo.reference.domain.model.enums.ContentType;
import com.skillvo.reference.domain.model.enums.Level;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.Key;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;
import software.amazon.awssdk.enhanced.dynamodb.model.QueryConditional;
import software.amazon.awssdk.enhanced.dynamodb.model.QueryEnhancedRequest;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@RequiredArgsConstructor
public class ReferenceDynamoDBRepository {
    private final DynamoDbEnhancedClient dynamoDbEnhancedClient;
    private final DynamoDbTable<Reference> referenceTable;

    public ReferenceDynamoDBRepository(DynamoDbEnhancedClient dynamoDbEnhancedClient) {
        this.dynamoDbEnhancedClient = dynamoDbEnhancedClient;
        this.referenceTable = dynamoDbEnhancedClient.table("References", TableSchema.fromBean(Reference.class));
    }

    public Reference save(Reference reference) {
        referenceTable.putItem(reference);
        return reference;
    }

    public Optional<Reference> findById(UUID tenantId, UUID referenceId) {
        Key key = Key.builder()
                .partitionValue(tenantId.toString())
                .sortValue(referenceId.toString())
                .build();

        return Optional.ofNullable(referenceTable.getItem(key));
    }

    public List<Reference> findByTenantId(UUID tenantId, int limit, int offset) {
        QueryConditional queryConditional = QueryConditional.keyEqualTo(Key.builder()
                .partitionValue(tenantId.toString())
                .build());

        QueryEnhancedRequest queryRequest = QueryEnhancedRequest.builder()
                .queryConditional(queryConditional)
                .limit(limit)
                .build();

        return referenceTable.query(queryRequest)
                .items()
                .stream()
                .skip(offset)
                .toList();
    }

    public List<Reference> search(UUID tenantId, String topicCode, ContentType contentType,
                                Level level, int limit, int offset) {
        QueryConditional queryConditional = QueryConditional.keyEqualTo(Key.builder()
                .partitionValue(tenantId.toString())
                .build());

        QueryEnhancedRequest queryRequest = QueryEnhancedRequest.builder()
                .queryConditional(queryConditional)
                .limit(limit)
                .build();

        return referenceTable.query(queryRequest)
                .items()
                .stream()
                .filter(reference -> topicCode == null || reference.getTopicCode().equals(topicCode))
                .filter(reference -> contentType == null || reference.getContentType() == contentType)
                .filter(reference -> level == null || reference.getLevel() == level)
                .skip(offset)
                .toList();
    }

    public void delete(UUID tenantId, UUID referenceId) {
        Key key = Key.builder()
                .partitionValue(tenantId.toString())
                .sortValue(referenceId.toString())
                .build();

        referenceTable.deleteItem(key);
    }
} 