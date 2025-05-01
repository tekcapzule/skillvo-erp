package com.skillvo.course.infrastructure.events;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.skillvo.course.domain.model.events.DomainEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.sqs.SqsClient;
import software.amazon.awssdk.services.sqs.model.SendMessageRequest;

@Service
@RequiredArgsConstructor
@Slf4j
public class DomainEventPublisher {
    private final SqsClient sqsClient;
    private final ObjectMapper objectMapper;

    @Value("${aws.sqs.domain-events-queue-url}")
    private String queueUrl;

    public void publish(DomainEvent event) {
        try {
            String messageBody = objectMapper.writeValueAsString(event);
            SendMessageRequest request = SendMessageRequest.builder()
                    .queueUrl(queueUrl)
                    .messageBody(messageBody)
                    .build();

            sqsClient.sendMessage(request);
            log.info("Published domain event: {} with id: {}", event.getClass().getSimpleName(), event.getEventId());
        } catch (Exception e) {
            log.error("Failed to publish domain event: {} with id: {}", event.getClass().getSimpleName(), event.getEventId(), e);
            throw new RuntimeException("Failed to publish domain event", e);
        }
    }
} 