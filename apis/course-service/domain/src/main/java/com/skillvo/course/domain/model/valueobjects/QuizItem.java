package com.skillvo.course.domain.model.valueobjects;

import com.skillvo.course.domain.model.enums.AnswerChoice;
import lombok.Value;
import java.util.List;

@Value
public class QuizItem {
    String question;
    List<AnswerOption> options;
    AnswerChoice answerChoice;

    public QuizItem(String question, List<AnswerOption> options, AnswerChoice answerChoice) {
        if (question == null) {
            throw new NullPointerException("Question cannot be null");
        }
        if (question.isEmpty()) {
            throw new IllegalArgumentException("Question cannot be empty");
        }
        if (options == null) {
            throw new NullPointerException("Options cannot be null");
        }
        if (options.isEmpty()) {
            throw new IllegalArgumentException("Options cannot be empty");
        }
        if (answerChoice == null) {
            throw new NullPointerException("Answer choice cannot be null");
        }
        this.question = question;
        this.options = options;
        this.answerChoice = answerChoice;
    }
} 