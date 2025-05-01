package com.skillvo.course.infrastructure.config;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(classes = DynamoDBConfig.class)
class DynamoDBConfigTest {

    @Autowired
    private DynamoDbClient dynamoDbClient;

    @Test
    void shouldCreateDynamoDbClient() {
        assertThat(dynamoDbClient).isNotNull();
    }
} 