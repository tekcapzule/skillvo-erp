package com.skillvo.reference.infrastructure.events;

import com.skillvo.reference.domain.model.events.DomainEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import software.amazon.awssdk.services.sqs.SqsClient;
import software.amazon.awssdk.services.sqs.model.SendMessageRequest;

import com.fasterxml.jackson.databind.ObjectMapper;

@Component
@RequiredArgsConstructor
public class DomainEventPublisher {
    private final SqsClient sqsClient;
    private final ObjectMapper objectMapper;
    private static final String QUEUE_URL = System.getenv("EVENT_QUEUE_URL");

    public void publish(DomainEvent event) {
        try {
            String messageBody = objectMapper.writeValueAsString(event);
            SendMessageRequest sendMessageRequest = SendMessageRequest.builder()
                    .queueUrl(QUEUE_URL)
                    .messageBody(messageBody)
                    .build();

            sqsClient.sendMessage(sendMessageRequest);
        } catch (Exception e) {
            throw new RuntimeException("Failed to publish event", e);
        }
    }
} 