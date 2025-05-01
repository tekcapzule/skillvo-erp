package com.skillvo.course.domain.model.valueobjects;

import com.skillvo.course.domain.model.enums.ContentType;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class PDFContentTest {

    @Test
    void shouldCreatePDFContent() {
        String pdfUrl = "https://example.com/document.pdf";
        PDFContent content = new PDFContent(pdfUrl);
        
        assertEquals(ContentType.PDF, content.getContentType());
        assertEquals(pdfUrl, content.getPdfUrl());
    }

    @Test
    void shouldNotAllowNullPDFUrl() {
        assertThrows(NullPointerException.class, () -> {
            new PDFContent(null);
        });
    }

    @Test
    void shouldNotAllowEmptyPDFUrl() {
        assertThrows(IllegalArgumentException.class, () -> {
            new PDFContent("");
        });
    }
} 