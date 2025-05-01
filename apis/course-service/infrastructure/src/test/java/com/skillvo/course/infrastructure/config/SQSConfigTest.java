package com.skillvo.course.infrastructure.config;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import software.amazon.awssdk.services.sqs.SqsClient;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(classes = SQSConfig.class)
class SQSConfigTest {

    @Autowired
    private SqsClient sqsClient;

    @Test
    void shouldCreateSqsClient() {
        assertThat(sqsClient).isNotNull();
    }
} 