package com.skillvo.course.domain.model.valueobjects;

import com.skillvo.course.domain.model.enums.ContentType;
import lombok.Getter;

@Getter
public class PDFContent extends Content {
    private final String pdfUrl;

    public PDFContent(String pdfUrl) {
        super(ContentType.PDF);
        if (pdfUrl == null) {
            throw new NullPointerException("PDF URL cannot be null");
        }
        if (pdfUrl.isEmpty()) {
            throw new IllegalArgumentException("PDF URL cannot be empty");
        }
        this.pdfUrl = pdfUrl;
    }
} 