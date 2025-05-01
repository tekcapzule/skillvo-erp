package com.skillvo.course.domain.model;

import com.skillvo.course.domain.model.aggregates.Course;
import com.skillvo.course.domain.model.entities.Author;
import com.skillvo.course.domain.model.entities.Publisher;
import com.skillvo.course.domain.model.enums.*;
import com.skillvo.course.domain.model.valueobjects.Prize;
import org.junit.jupiter.api.Test;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

class CourseTest {

    @Test
    void shouldCreateCourse() {
        // Given
        UUID courseId = UUID.randomUUID();
        String tenantId = "tenant-1";
        String title = "Test Course";
        String description = "Test Description";
        String topicCode = "TEST";
        String categoryCode = "CAT1";
        List<Language> languages = Arrays.asList(Language.ENGLISH);
        Level level = Level.BEGINNER;
        PricingModel pricingModel = PricingModel.FREE;
        Prize prize = new Prize(0.0, 0, Currency.INR);
        LearningMode learningMode = LearningMode.ONLINE;
        Integer points = 100;
        List<String> tags = Arrays.asList("test", "course");

        Author author = new Author();
        author.setAuthorId(UUID.randomUUID());
        author.setFirstName("John");
        author.setLastName("Doe");
        author.setEmailId("john@example.com");
        List<Author> authors = Arrays.asList(author);

        Publisher publisher = new Publisher();
        publisher.setPublisherId(UUID.randomUUID());
        publisher.setName("Test Publisher");
        publisher.setType(PublisherType.COMPANY);
        publisher.setLogoUrl("https://example.com/logo.png");
        publisher.setWebsite("https://example.com");
        publisher.setContactEmail("contact@example.com");
        publisher.setDescription("Test Publisher Description");
        publisher.setCountry("India");

        String imageUrl = "https://example.com/image.jpg";
        boolean isInMarketplace = true;
        Status status = Status.DRAFT;
        Integer duration = 120;
        LessonNavigationMode lessonNavigationMode = LessonNavigationMode.FLEXIBLE;
        Integer version = 1;

        // When
        Course course = new Course();
        course.setCourseId(courseId);
        course.setTenantId(tenantId);
        course.setTitle(title);
        course.setDescription(description);
        course.setTopicCode(topicCode);
        course.setCategoryCode(categoryCode);
        course.setLanguage(languages);
        course.setLevel(level);
        course.setPricingModel(pricingModel);
        course.setPrize(prize);
        course.setLearningMode(learningMode);
        course.setPoints(points);
        course.setTags(tags);
        course.setAuthors(authors);
        course.setPublisher(publisher);
        course.setImageUrl(imageUrl);
        course.setInMarketplace(isInMarketplace);
        course.setStatus(status);
        course.setDuration(duration);
        course.setLessonNavigationMode(lessonNavigationMode);
        course.setVersion(version);

        // Then
        assertNotNull(course);
        assertEquals(courseId, course.getCourseId());
        assertEquals(tenantId, course.getTenantId());
        assertEquals(title, course.getTitle());
        assertEquals(description, course.getDescription());
        assertEquals(topicCode, course.getTopicCode());
        assertEquals(categoryCode, course.getCategoryCode());
        assertEquals(languages, course.getLanguage());
        assertEquals(level, course.getLevel());
        assertEquals(pricingModel, course.getPricingModel());
        assertEquals(prize, course.getPrize());
        assertEquals(learningMode, course.getLearningMode());
        assertEquals(points, course.getPoints());
        assertEquals(tags, course.getTags());
        assertEquals(authors, course.getAuthors());
        assertEquals(publisher, course.getPublisher());
        assertEquals(imageUrl, course.getImageUrl());
        assertEquals(isInMarketplace, course.isInMarketplace());
        assertEquals(status, course.getStatus());
        assertEquals(duration, course.getDuration());
        assertEquals(lessonNavigationMode, course.getLessonNavigationMode());
        assertEquals(version, course.getVersion());
    }
} 