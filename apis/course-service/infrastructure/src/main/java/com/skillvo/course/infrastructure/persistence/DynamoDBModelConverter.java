package com.skillvo.course.infrastructure.persistence;

import com.skillvo.course.domain.model.aggregates.Course;
import com.skillvo.course.domain.model.entities.Author;
import com.skillvo.course.domain.model.entities.Publisher;
import com.skillvo.course.domain.model.entities.Section;
import com.skillvo.course.domain.model.enums.*;
import com.skillvo.course.domain.model.valueobjects.Prize;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

public class DynamoDBModelConverter {
    private static final String COURSE_ID = "courseId";
    private static final String TENANT_ID = "tenantId";
    private static final String TITLE = "title";
    private static final String DESCRIPTION = "description";
    private static final String TOPIC_CODE = "topicCode";
    private static final String CATEGORY_CODE = "categoryCode";
    private static final String LANGUAGE = "language";
    private static final String LEVEL = "level";
    private static final String PRICING_MODEL = "pricingModel";
    private static final String PRIZE = "prize";
    private static final String LEARNING_MODE = "learningMode";
    private static final String POINTS = "points";
    private static final String TAGS = "tags";
    private static final String TAG = "tag";
    private static final String AUTHORS = "authors";
    private static final String PUBLISHER = "publisher";
    private static final String PUBLISHED_ON = "publishedOn";
    private static final String IMAGE_URL = "imageUrl";
    private static final String IN_MARKETPLACE = "inMarketplace";
    private static final String STATUS = "status";
    private static final String DURATION = "duration";
    private static final String SECTIONS = "sections";
    private static final String LESSON_NAVIGATION_MODE = "lessonNavigationMode";
    private static final String VERSION = "version";

    public static Map<String, AttributeValue> toItem(Course course) {
        Map<String, AttributeValue> item = new HashMap<>();
        item.put(COURSE_ID, AttributeValue.builder().s(course.getCourseId().toString()).build());
        item.put(TENANT_ID, AttributeValue.builder().s(course.getTenantId()).build());
        item.put(TITLE, AttributeValue.builder().s(course.getTitle()).build());
        item.put(DESCRIPTION, AttributeValue.builder().s(course.getDescription()).build());
        item.put(TOPIC_CODE, AttributeValue.builder().s(course.getTopicCode()).build());
        item.put(CATEGORY_CODE, AttributeValue.builder().s(course.getCategoryCode()).build());
        item.put(LANGUAGE, AttributeValue.builder().l(course.getLanguage().stream()
                .map(lang -> AttributeValue.builder().s(lang.name()).build())
                .collect(Collectors.toList())).build());
        item.put(LEVEL, AttributeValue.builder().s(course.getLevel().name()).build());
        item.put(PRICING_MODEL, AttributeValue.builder().s(course.getPricingModel().name()).build());
        item.put(PRIZE, AttributeValue.builder().m(toPrizeMap(course.getPrize())).build());
        item.put(LEARNING_MODE, AttributeValue.builder().s(course.getLearningMode().name()).build());
        item.put(POINTS, AttributeValue.builder().n(String.valueOf(course.getPoints())).build());
        item.put(TAGS, AttributeValue.builder().l(course.getTags().stream()
                .map(tag -> AttributeValue.builder().s(tag).build())
                .collect(Collectors.toList())).build());
        item.put(TAG, AttributeValue.builder().s(course.getTags().isEmpty() ? "" : course.getTags().get(0)).build());
        item.put(AUTHORS, AttributeValue.builder().l(course.getAuthors().stream()
                .map(DynamoDBModelConverter::toAuthorAttributeValue)
                .collect(Collectors.toList())).build());
        item.put(PUBLISHER, AttributeValue.builder().m(toPublisherMap(course.getPublisher())).build());
        item.put(PUBLISHED_ON, AttributeValue.builder().s(course.getPublishedOn().toString()).build());
        item.put(IMAGE_URL, AttributeValue.builder().s(course.getImageUrl()).build());
        item.put(IN_MARKETPLACE, AttributeValue.builder().bool(course.isInMarketplace()).build());
        item.put(STATUS, AttributeValue.builder().s(course.getStatus().name()).build());
        item.put(DURATION, AttributeValue.builder().n(String.valueOf(course.getDuration())).build());
        item.put(SECTIONS, AttributeValue.builder().l(course.getSections().stream()
                .map(DynamoDBModelConverter::toSectionAttributeValue)
                .collect(Collectors.toList())).build());
        item.put(LESSON_NAVIGATION_MODE, AttributeValue.builder().s(course.getLessonNavigationMode().name()).build());
        item.put(VERSION, AttributeValue.builder().n(String.valueOf(course.getVersion())).build());
        return item;
    }

    public static Course toCourse(Map<String, AttributeValue> item) {
        Course course = new Course();
        course.setCourseId(UUID.fromString(item.get(COURSE_ID).s()));
        course.setTenantId(item.get(TENANT_ID).s());
        course.setTitle(item.get(TITLE).s());
        course.setDescription(item.get(DESCRIPTION).s());
        course.setTopicCode(item.get(TOPIC_CODE).s());
        course.setCategoryCode(item.get(CATEGORY_CODE).s());
        course.setLanguage(item.get(LANGUAGE).l().stream()
                .map(av -> Language.valueOf(av.s()))
                .collect(Collectors.toList()));
        course.setLevel(Level.valueOf(item.get(LEVEL).s()));
        course.setPricingModel(PricingModel.valueOf(item.get(PRICING_MODEL).s()));
        course.setPrize(toPrize(item.get(PRIZE).m()));
        course.setLearningMode(LearningMode.valueOf(item.get(LEARNING_MODE).s()));
        course.setPoints(Integer.parseInt(item.get(POINTS).n()));
        course.setTags(item.get(TAGS).l().stream()
                .map(av -> av.s())
                .collect(Collectors.toList()));
        course.setAuthors(item.get(AUTHORS).l().stream()
                .map(av -> toAuthor(av.m()))
                .collect(Collectors.toList()));
        course.setPublisher(toPublisher(item.get(PUBLISHER).m()));
        course.setPublishedOn(LocalDateTime.parse(item.get(PUBLISHED_ON).s()));
        course.setImageUrl(item.get(IMAGE_URL).s());
        course.setInMarketplace(item.get(IN_MARKETPLACE).bool());
        course.setStatus(Status.valueOf(item.get(STATUS).s()));
        course.setDuration(Integer.parseInt(item.get(DURATION).n()));
        course.setSections(item.get(SECTIONS).l().stream()
                .map(av -> toSection(av.m()))
                .collect(Collectors.toList()));
        course.setLessonNavigationMode(LessonNavigationMode.valueOf(item.get(LESSON_NAVIGATION_MODE).s()));
        course.setVersion(Integer.parseInt(item.get(VERSION).n()));
        return course;
    }

    private static Map<String, AttributeValue> toPrizeMap(Prize prize) {
        Map<String, AttributeValue> map = new HashMap<>();
        map.put("prize", AttributeValue.builder().n(String.valueOf(prize.getPrize())).build());
        map.put("discount", AttributeValue.builder().n(String.valueOf(prize.getDiscount())).build());
        map.put("currency", AttributeValue.builder().s(prize.getCurrency().name()).build());
        return map;
    }

    private static Prize toPrize(Map<String, AttributeValue> map) {
        return Prize.builder()
                .prize(Double.parseDouble(map.get("prize").n()))
                .discount(Integer.parseInt(map.get("discount").n()))
                .currency(com.skillvo.course.domain.model.enums.Currency.valueOf(map.get("currency").s()))
                .build();
    }

    private static AttributeValue toAuthorAttributeValue(Author author) {
        Map<String, AttributeValue> map = new HashMap<>();
        map.put("authorId", AttributeValue.builder().s(author.getAuthorId().toString()).build());
        map.put("firstName", AttributeValue.builder().s(author.getFirstName()).build());
        map.put("lastName", AttributeValue.builder().s(author.getLastName()).build());
        map.put("emailId", AttributeValue.builder().s(author.getEmailId()).build());
        return AttributeValue.builder().m(map).build();
    }

    private static Author toAuthor(Map<String, AttributeValue> map) {
        Author author = new Author();
        author.setAuthorId(UUID.fromString(map.get("authorId").s()));
        author.setFirstName(map.get("firstName").s());
        author.setLastName(map.get("lastName").s());
        author.setEmailId(map.get("emailId").s());
        return author;
    }

    private static Map<String, AttributeValue> toPublisherMap(Publisher publisher) {
        Map<String, AttributeValue> map = new HashMap<>();
        map.put("publisherId", AttributeValue.builder().s(publisher.getPublisherId().toString()).build());
        map.put("name", AttributeValue.builder().s(publisher.getName()).build());
        map.put("type", AttributeValue.builder().s(publisher.getType().name()).build());
        map.put("logoUrl", AttributeValue.builder().s(publisher.getLogoUrl()).build());
        map.put("website", AttributeValue.builder().s(publisher.getWebsite()).build());
        map.put("contactEmail", AttributeValue.builder().s(publisher.getContactEmail()).build());
        map.put("description", AttributeValue.builder().s(publisher.getDescription()).build());
        map.put("country", AttributeValue.builder().s(publisher.getCountry()).build());
        return map;
    }

    private static Publisher toPublisher(Map<String, AttributeValue> map) {
        return Publisher.builder()
                .publisherId(UUID.fromString(map.get("publisherId").s()))
                .name(map.get("name").s())
                .type(PublisherType.valueOf(map.get("type").s()))
                .logoUrl(map.get("logoUrl").s())
                .website(map.get("website").s())
                .contactEmail(map.get("contactEmail").s())
                .description(map.get("description").s())
                .country(map.get("country").s())
                .build();
    }

    private static AttributeValue toSectionAttributeValue(Section section) {
        Map<String, AttributeValue> map = new HashMap<>();
        map.put("sectionId", AttributeValue.builder().s(section.getSectionId().toString()).build());
        map.put("title", AttributeValue.builder().s(section.getTitle()).build());
        map.put("description", AttributeValue.builder().s(section.getDescription()).build());
        map.put("order", AttributeValue.builder().n(String.valueOf(section.getOrder())).build());
        map.put("duration", AttributeValue.builder().n(String.valueOf(section.getDuration())).build());
        return AttributeValue.builder().m(map).build();
    }

    private static Section toSection(Map<String, AttributeValue> map) {
        Section section = new Section();
        section.setSectionId(UUID.fromString(map.get("sectionId").s()));
        section.setTitle(map.get("title").s());
        section.setDescription(map.get("description").s());
        section.setOrder(Integer.parseInt(map.get("order").n()));
        section.setDuration(Integer.parseInt(map.get("duration").n()));
        return section;
    }
} 