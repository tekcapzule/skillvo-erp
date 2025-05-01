package com.skillvo.course.domain.model.valueobjects;

import com.skillvo.course.domain.model.enums.ContentType;
import com.skillvo.course.domain.model.exception.InvalidContentTypeException;
import java.util.List;

public class ContentFactory {
    
    public static Content createContent(ContentType contentType, Object contentData) {
        if (contentType == null) {
            throw new IllegalArgumentException("Content type cannot be null");
        }
        
        switch (contentType) {
            case VIDEO:
                if (!(contentData instanceof String)) {
                    throw new InvalidContentTypeException("Video content requires a String URL");
                }
                return new VideoContent((String) contentData);
                
            case PDF:
                if (!(contentData instanceof String)) {
                    throw new InvalidContentTypeException("PDF content requires a String URL");
                }
                return new PDFContent((String) contentData);
                
            case QUIZ:
                if (!(contentData instanceof List)) {
                    throw new InvalidContentTypeException("Quiz content requires a List of QuizItems");
                }
                @SuppressWarnings("unchecked")
                List<QuizItem> quizItems = (List<QuizItem>) contentData;
                return new QuizContent(quizItems);
                
            default:
                throw new InvalidContentTypeException("Unsupported content type: " + contentType);
        }
    }
} 