package com.skillvo.course.infrastructure.events;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.skillvo.course.domain.model.events.DomainEvent;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;
import software.amazon.awssdk.services.sqs.SqsClient;
import software.amazon.awssdk.services.sqs.model.SendMessageRequest;


import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class DomainEventPublisherTest {

    @Mock
    private SqsClient sqsClient;

    @Mock
    private ObjectMapper objectMapper;

    private DomainEventPublisher publisher;
    private static final String QUEUE_URL = "https://sqs.us-east-1.amazonaws.com/123456789012/test-queue";

    @BeforeEach
    void setUp() {
        publisher = new DomainEventPublisher(sqsClient, objectMapper);
        ReflectionTestUtils.setField(publisher, "queueUrl", QUEUE_URL);
    }

    @Test
    void shouldPublishDomainEvent() throws Exception {
        // Given
        TestDomainEvent event = new TestDomainEvent();
        String serializedEvent = "{\"eventId\":\"" + event.getEventId() + "\"}";
        when(objectMapper.writeValueAsString(event)).thenReturn(serializedEvent);

        // When
        publisher.publish(event);

        // Then
        ArgumentCaptor<SendMessageRequest> requestCaptor = ArgumentCaptor.forClass(SendMessageRequest.class);
        verify(sqsClient).sendMessage(requestCaptor.capture());

        SendMessageRequest request = requestCaptor.getValue();
        assertThat(request.queueUrl()).isEqualTo(QUEUE_URL);
        assertThat(request.messageBody()).isEqualTo(serializedEvent);
    }

    @Test
    void shouldThrowExceptionWhenSerializationFails() throws Exception {
        // Given
        TestDomainEvent event = new TestDomainEvent();
        when(objectMapper.writeValueAsString(event)).thenThrow(new RuntimeException("Serialization failed"));

        // When/Then
        assertThatThrownBy(() -> publisher.publish(event))
                .isInstanceOf(RuntimeException.class)
                .hasMessage("Failed to publish domain event")
                .hasCauseInstanceOf(RuntimeException.class);

        verify(sqsClient, never()).sendMessage(any(SendMessageRequest.class));
    }

    @Test
    void shouldThrowExceptionWhenSqsPublishingFails() throws Exception {
        // Given
        TestDomainEvent event = new TestDomainEvent();
        String serializedEvent = "{\"eventId\":\"" + event.getEventId() + "\"}";
        when(objectMapper.writeValueAsString(event)).thenReturn(serializedEvent);
        when(sqsClient.sendMessage(any(SendMessageRequest.class))).thenThrow(new RuntimeException("SQS error"));

        // When/Then
        assertThatThrownBy(() -> publisher.publish(event))
                .isInstanceOf(RuntimeException.class)
                .hasMessage("Failed to publish domain event")
                .hasCauseInstanceOf(RuntimeException.class);
    }

    private static class TestDomainEvent extends DomainEvent {
        public TestDomainEvent() {
            super();
        }
    }
} 