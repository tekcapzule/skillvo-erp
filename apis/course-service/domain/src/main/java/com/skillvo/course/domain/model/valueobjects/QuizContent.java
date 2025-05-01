package com.skillvo.course.domain.model.valueobjects;

import com.skillvo.course.domain.model.enums.ContentType;
import lombok.Getter;
import java.util.List;

@Getter
public class QuizContent extends Content {
    private final List<QuizItem> quizItems;

    public QuizContent(List<QuizItem> quizItems) {
        super(ContentType.QUIZ);
        if (quizItems == null) {
            throw new NullPointerException("Quiz items cannot be null");
        }
        if (quizItems.isEmpty()) {
            throw new IllegalArgumentException("Quiz items cannot be empty");
        }
        this.quizItems = quizItems;
    }
} 