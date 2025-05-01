package com.skillvo.course.infrastructure.persistence;

import com.skillvo.course.domain.model.aggregates.Course;
import com.skillvo.course.domain.model.entities.Author;
import com.skillvo.course.domain.model.entities.Publisher;
import com.skillvo.course.domain.model.entities.Section;
import com.skillvo.course.domain.model.enums.*;
import com.skillvo.course.domain.model.valueobjects.Prize;
import org.junit.jupiter.api.Test;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.Map;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

public class DynamoDBModelConverterTest {

    @Test
    void shouldConvertCourseToItem() {
        // Given
        Course course = createSampleCourse();

        // When
        Map<String, AttributeValue> item = DynamoDBModelConverter.toItem(course);

        // Then
        assertThat(item).isNotNull();
        assertThat(item.get("courseId").s()).isEqualTo(course.getCourseId().toString());
        assertThat(item.get("tenantId").s()).isEqualTo(course.getTenantId());
        assertThat(item.get("title").s()).isEqualTo(course.getTitle());
        assertThat(item.get("description").s()).isEqualTo(course.getDescription());
        assertThat(item.get("topicCode").s()).isEqualTo(course.getTopicCode());
        assertThat(item.get("categoryCode").s()).isEqualTo(course.getCategoryCode());
        assertThat(item.get("language").l().get(0).s()).isEqualTo(course.getLanguage().get(0).name());
        assertThat(item.get("level").s()).isEqualTo(course.getLevel().name());
        assertThat(item.get("pricingModel").s()).isEqualTo(course.getPricingModel().name());
        assertThat(item.get("prize").m().get("prize").n()).isEqualTo(String.valueOf(course.getPrize().getPrize()));
        assertThat(item.get("learningMode").s()).isEqualTo(course.getLearningMode().name());
        assertThat(item.get("points").n()).isEqualTo(String.valueOf(course.getPoints()));
        assertThat(item.get("tags").l().get(0).s()).isEqualTo(course.getTags().get(0));
        assertThat(item.get("authors").l().get(0).m().get("authorId").s()).isEqualTo(course.getAuthors().get(0).getAuthorId().toString());
        assertThat(item.get("publisher").m().get("publisherId").s()).isEqualTo(course.getPublisher().getPublisherId().toString());
        assertThat(item.get("publishedOn").s()).isEqualTo(course.getPublishedOn().toString());
        assertThat(item.get("imageUrl").s()).isEqualTo(course.getImageUrl());
        assertThat(item.get("inMarketplace").bool()).isEqualTo(course.isInMarketplace());
        assertThat(item.get("status").s()).isEqualTo(course.getStatus().name());
        assertThat(item.get("duration").n()).isEqualTo(String.valueOf(course.getDuration()));
        assertThat(item.get("sections").l().get(0).m().get("sectionId").s()).isEqualTo(course.getSections().get(0).getSectionId().toString());
        assertThat(item.get("lessonNavigationMode").s()).isEqualTo(course.getLessonNavigationMode().name());
        assertThat(item.get("version").n()).isEqualTo(String.valueOf(course.getVersion()));
    }

    @Test
    void shouldConvertItemToCourse() {
        // Given
        Course originalCourse = createSampleCourse();
        Map<String, AttributeValue> item = DynamoDBModelConverter.toItem(originalCourse);

        // When
        Course convertedCourse = DynamoDBModelConverter.toCourse(item);

        // Then
        assertThat(convertedCourse).isNotNull();
        assertThat(convertedCourse.getCourseId()).isEqualTo(originalCourse.getCourseId());
        assertThat(convertedCourse.getTenantId()).isEqualTo(originalCourse.getTenantId());
        assertThat(convertedCourse.getTitle()).isEqualTo(originalCourse.getTitle());
        assertThat(convertedCourse.getDescription()).isEqualTo(originalCourse.getDescription());
        assertThat(convertedCourse.getTopicCode()).isEqualTo(originalCourse.getTopicCode());
        assertThat(convertedCourse.getCategoryCode()).isEqualTo(originalCourse.getCategoryCode());
        assertThat(convertedCourse.getLanguage()).isEqualTo(originalCourse.getLanguage());
        assertThat(convertedCourse.getLevel()).isEqualTo(originalCourse.getLevel());
        assertThat(convertedCourse.getPricingModel()).isEqualTo(originalCourse.getPricingModel());
        assertThat(convertedCourse.getPrize()).isEqualTo(originalCourse.getPrize());
        assertThat(convertedCourse.getLearningMode()).isEqualTo(originalCourse.getLearningMode());
        assertThat(convertedCourse.getPoints()).isEqualTo(originalCourse.getPoints());
        assertThat(convertedCourse.getTags()).isEqualTo(originalCourse.getTags());
        assertThat(convertedCourse.getAuthors()).hasSize(1);
        assertThat(convertedCourse.getAuthors().get(0).getAuthorId()).isEqualTo(originalCourse.getAuthors().get(0).getAuthorId());
        assertThat(convertedCourse.getPublisher().getPublisherId()).isEqualTo(originalCourse.getPublisher().getPublisherId());
        assertThat(convertedCourse.getPublishedOn()).isEqualTo(originalCourse.getPublishedOn());
        assertThat(convertedCourse.getImageUrl()).isEqualTo(originalCourse.getImageUrl());
        assertThat(convertedCourse.isInMarketplace()).isEqualTo(originalCourse.isInMarketplace());
        assertThat(convertedCourse.getStatus()).isEqualTo(originalCourse.getStatus());
        assertThat(convertedCourse.getDuration()).isEqualTo(originalCourse.getDuration());
        assertThat(convertedCourse.getSections()).hasSize(1);
        assertThat(convertedCourse.getSections().get(0).getSectionId()).isEqualTo(originalCourse.getSections().get(0).getSectionId());
        assertThat(convertedCourse.getLessonNavigationMode()).isEqualTo(originalCourse.getLessonNavigationMode());
        assertThat(convertedCourse.getVersion()).isEqualTo(originalCourse.getVersion());
    }

    @Test
    void shouldHandleEmptyTags() {
        // Given
        Course course = createSampleCourse();
        course.setTags(Collections.emptyList());

        // When
        Map<String, AttributeValue> item = DynamoDBModelConverter.toItem(course);

        // Then
        assertThat(item.get("tags").l()).isEmpty();
        assertThat(item.get("tag").s()).isEmpty();
    }

    private Course createSampleCourse() {
        Course course = new Course();
        course.setCourseId(UUID.randomUUID());
        course.setTenantId("tenant123");
        course.setTitle("Sample Course");
        course.setDescription("Sample Description");
        course.setTopicCode("TOPIC001");
        course.setCategoryCode("CAT001");
        course.setLanguage(Arrays.asList(Language.ENGLISH));
        course.setLevel(Level.BEGINNER);
        course.setPricingModel(PricingModel.FREE);
        course.setPrize(createSamplePrize());
        course.setLearningMode(LearningMode.ONLINE);
        course.setPoints(100);
        course.setTags(Arrays.asList("tag1", "tag2"));
        course.setAuthors(Arrays.asList(createSampleAuthor()));
        course.setPublisher(createSamplePublisher());
        course.setPublishedOn(LocalDateTime.now());
        course.setImageUrl("http://example.com/image.jpg");
        course.setInMarketplace(true);
        course.setStatus(Status.PUBLISHED);
        course.setDuration(120);
        course.setSections(Arrays.asList(createSampleSection()));
        course.setLessonNavigationMode(LessonNavigationMode.SEQUENTIAL);
        course.setVersion(1);
        return course;
    }

    private Prize createSamplePrize() {
        return Prize.builder()
                .prize(99.99)
                .discount(10)
                .currency(Currency.USD)
                .build();
    }

    private Author createSampleAuthor() {
        Author author = new Author();
        author.setAuthorId(UUID.randomUUID());
        author.setFirstName("John");
        author.setLastName("Doe");
        author.setEmailId("john.doe@example.com");
        return author;
    }

    private Publisher createSamplePublisher() {
        return Publisher.builder()
                .publisherId(UUID.randomUUID())
                .name("Sample Publisher")
                .type(PublisherType.COMPANY)
                .logoUrl("http://example.com/logo.jpg")
                .website("http://example.com")
                .contactEmail("contact@example.com")
                .description("Sample Publisher Description")
                .country("US")
                .build();
    }

    private Section createSampleSection() {
        Section section = new Section();
        section.setSectionId(UUID.randomUUID());
        section.setTitle("Sample Section");
        section.setDescription("Sample Section Description");
        section.setOrder(1);
        section.setDuration(60);
        return section;
    }
}