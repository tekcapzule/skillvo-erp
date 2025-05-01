package com.skillvo.course.domain.model.valueobjects;

import lombok.Value;

@Value
public class AnswerOption {
    String answer;
    boolean correct;

    public AnswerOption(String answer, boolean correct) {
        if (answer == null) {
            throw new NullPointerException("Answer cannot be null");
        }
        if (answer.isEmpty()) {
            throw new IllegalArgumentException("Answer cannot be empty");
        }
        this.answer = answer;
        this.correct = correct;
    }
} 