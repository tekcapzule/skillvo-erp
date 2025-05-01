package com.skillvo.course.infrastructure.persistence;

import com.skillvo.course.domain.model.aggregates.Course;
import com.skillvo.course.domain.model.entities.Author;
import com.skillvo.course.domain.model.entities.Publisher;
import com.skillvo.course.domain.model.entities.Section;
import com.skillvo.course.domain.model.enums.Currency;
import com.skillvo.course.domain.model.enums.Language;
import com.skillvo.course.domain.model.enums.Level;
import com.skillvo.course.domain.model.enums.LearningMode;
import com.skillvo.course.domain.model.enums.LessonNavigationMode;
import com.skillvo.course.domain.model.enums.PricingModel;
import com.skillvo.course.domain.model.enums.PublisherType;
import com.skillvo.course.domain.model.enums.Status;
import com.skillvo.course.domain.model.valueobjects.Prize;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

class CourseMapper {
    private static final String COURSE_ID_ATTRIBUTE = "courseId";
    private static final String TENANT_ID_ATTRIBUTE = "tenantId";
    private static final String TITLE_ATTRIBUTE = "title";
    private static final String DESCRIPTION_ATTRIBUTE = "description";
    private static final String TOPIC_CODE_ATTRIBUTE = "topicCode";
    private static final String CATEGORY_CODE_ATTRIBUTE = "categoryCode";
    private static final String LANGUAGE_ATTRIBUTE = "language";
    private static final String LEVEL_ATTRIBUTE = "level";
    private static final String PRICING_MODEL_ATTRIBUTE = "pricingModel";
    private static final String PRIZE_ATTRIBUTE = "prize";
    private static final String LEARNING_MODE_ATTRIBUTE = "learningMode";
    private static final String POINTS_ATTRIBUTE = "points";
    private static final String TAGS_ATTRIBUTE = "tags";
    private static final String AUTHORS_ATTRIBUTE = "authors";
    private static final String PUBLISHER_ATTRIBUTE = "publisher";
    private static final String PUBLISHED_ON_ATTRIBUTE = "publishedOn";
    private static final String IMAGE_URL_ATTRIBUTE = "imageUrl";
    private static final String IS_IN_MARKETPLACE_ATTRIBUTE = "isInMarketplace";
    private static final String STATUS_ATTRIBUTE = "status";
    private static final String DURATION_ATTRIBUTE = "duration";
    private static final String SECTIONS_ATTRIBUTE = "sections";
    private static final String LESSON_NAVIGATION_MODE_ATTRIBUTE = "lessonNavigationMode";
    private static final String VERSION_ATTRIBUTE = "version";

    static Map<String, AttributeValue> toDynamoDbItem(Course course) {
        Map<String, AttributeValue> item = new HashMap<>();
        item.put(COURSE_ID_ATTRIBUTE, AttributeValue.builder().s(course.getCourseId().toString()).build());
        item.put(TENANT_ID_ATTRIBUTE, AttributeValue.builder().s(course.getTenantId()).build());
        item.put(TITLE_ATTRIBUTE, AttributeValue.builder().s(course.getTitle()).build());
        item.put(DESCRIPTION_ATTRIBUTE, AttributeValue.builder().s(course.getDescription()).build());
        item.put(TOPIC_CODE_ATTRIBUTE, AttributeValue.builder().s(course.getTopicCode()).build());
        item.put(CATEGORY_CODE_ATTRIBUTE, AttributeValue.builder().s(course.getCategoryCode()).build());
        item.put(LANGUAGE_ATTRIBUTE, AttributeValue.builder().ss(course.getLanguage().stream()
                .map(Enum::name)
                .collect(Collectors.toList())).build());
        item.put(LEVEL_ATTRIBUTE, AttributeValue.builder().s(course.getLevel().name()).build());
        item.put(PRICING_MODEL_ATTRIBUTE, AttributeValue.builder().s(course.getPricingModel().name()).build());
        item.put(PRIZE_ATTRIBUTE, AttributeValue.builder().m(toPrizeMap(course.getPrize())).build());
        item.put(LEARNING_MODE_ATTRIBUTE, AttributeValue.builder().s(course.getLearningMode().name()).build());
        item.put(POINTS_ATTRIBUTE, AttributeValue.builder().n(String.valueOf(course.getPoints())).build());
        item.put(TAGS_ATTRIBUTE, AttributeValue.builder().s(String.join(",", course.getTags())).build());
        item.put(AUTHORS_ATTRIBUTE, AttributeValue.builder().l(course.getAuthors().stream()
                .map(author -> AttributeValue.builder().m(toAuthorMap(author)).build())
                .collect(Collectors.toList())).build());
        item.put(PUBLISHER_ATTRIBUTE, AttributeValue.builder().m(toPublisherMap(course.getPublisher())).build());
        item.put(PUBLISHED_ON_ATTRIBUTE, AttributeValue.builder().s(course.getPublishedOn().toString()).build());
        item.put(IMAGE_URL_ATTRIBUTE, AttributeValue.builder().s(course.getImageUrl()).build());
        item.put(IS_IN_MARKETPLACE_ATTRIBUTE, AttributeValue.builder().bool(course.isInMarketplace()).build());
        item.put(STATUS_ATTRIBUTE, AttributeValue.builder().s(course.getStatus().name()).build());
        item.put(DURATION_ATTRIBUTE, AttributeValue.builder().n(String.valueOf(course.getDuration())).build());
        item.put(SECTIONS_ATTRIBUTE, AttributeValue.builder().l(course.getSections().stream()
                .map(section -> AttributeValue.builder().m(toSectionMap(section)).build())
                .collect(Collectors.toList())).build());
        item.put(LESSON_NAVIGATION_MODE_ATTRIBUTE, AttributeValue.builder().s(course.getLessonNavigationMode().name()).build());
        item.put(VERSION_ATTRIBUTE, AttributeValue.builder().n(String.valueOf(course.getVersion())).build());
        return item;
    }

    static Map<String, AttributeValue> toDynamoDbKey(UUID courseId) {
        Map<String, AttributeValue> key = new HashMap<>();
        key.put(COURSE_ID_ATTRIBUTE, AttributeValue.builder().s(courseId.toString()).build());
        return key;
    }

    static Course toCourse(Map<String, AttributeValue> item) {
        Course course = new Course();
        course.setCourseId(UUID.fromString(item.get(COURSE_ID_ATTRIBUTE).s()));
        course.setTenantId(item.get(TENANT_ID_ATTRIBUTE).s());
        course.setTitle(item.get(TITLE_ATTRIBUTE).s());
        course.setDescription(item.get(DESCRIPTION_ATTRIBUTE).s());
        course.setTopicCode(item.get(TOPIC_CODE_ATTRIBUTE).s());
        course.setCategoryCode(item.get(CATEGORY_CODE_ATTRIBUTE).s());
        course.setLanguage(item.get(LANGUAGE_ATTRIBUTE).ss().stream()
                .map(Language::valueOf)
                .collect(Collectors.toList()));
        course.setLevel(Level.valueOf(item.get(LEVEL_ATTRIBUTE).s()));
        course.setPricingModel(PricingModel.valueOf(item.get(PRICING_MODEL_ATTRIBUTE).s()));
        course.setPrize(toPrize(item.get(PRIZE_ATTRIBUTE).m()));
        course.setLearningMode(LearningMode.valueOf(item.get(LEARNING_MODE_ATTRIBUTE).s()));
        course.setPoints(Integer.parseInt(item.get(POINTS_ATTRIBUTE).n()));
        course.setTags(Arrays.asList(item.get(TAGS_ATTRIBUTE).s().split(",")));
        course.setAuthors(item.get(AUTHORS_ATTRIBUTE).l().stream()
                .map(av -> toAuthor(av.m()))
                .collect(Collectors.toList()));
        course.setPublisher(toPublisher(item.get(PUBLISHER_ATTRIBUTE).m()));
        course.setPublishedOn(LocalDateTime.parse(item.get(PUBLISHED_ON_ATTRIBUTE).s()));
        course.setImageUrl(item.get(IMAGE_URL_ATTRIBUTE).s());
        course.setInMarketplace(item.get(IS_IN_MARKETPLACE_ATTRIBUTE).bool());
        course.setStatus(Status.valueOf(item.get(STATUS_ATTRIBUTE).s()));
        course.setDuration(Integer.parseInt(item.get(DURATION_ATTRIBUTE).n()));
        course.setSections(item.get(SECTIONS_ATTRIBUTE).l().stream()
                .map(av -> toSection(av.m()))
                .collect(Collectors.toList()));
        course.setLessonNavigationMode(LessonNavigationMode.valueOf(item.get(LESSON_NAVIGATION_MODE_ATTRIBUTE).s()));
        course.setVersion(Integer.parseInt(item.get(VERSION_ATTRIBUTE).n()));
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
        return new Prize(
                Double.parseDouble(map.get("prize").n()),
                Integer.parseInt(map.get("discount").n()),
                Currency.valueOf(map.get("currency").s())
        );
    }

    private static Map<String, AttributeValue> toAuthorMap(Author author) {
        Map<String, AttributeValue> map = new HashMap<>();
        map.put("authorId", AttributeValue.builder().s(author.getAuthorId().toString()).build());
        map.put("firstName", AttributeValue.builder().s(author.getFirstName()).build());
        map.put("lastName", AttributeValue.builder().s(author.getLastName()).build());
        map.put("emailId", AttributeValue.builder().s(author.getEmailId()).build());
        return map;
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
        Publisher publisher = new Publisher();
        publisher.setPublisherId(UUID.fromString(map.get("publisherId").s()));
        publisher.setName(map.get("name").s());
        publisher.setType(PublisherType.valueOf(map.get("type").s()));
        publisher.setLogoUrl(map.get("logoUrl").s());
        publisher.setWebsite(map.get("website").s());
        publisher.setContactEmail(map.get("contactEmail").s());
        publisher.setDescription(map.get("description").s());
        publisher.setCountry(map.get("country").s());
        return publisher;
    }

    private static Map<String, AttributeValue> toSectionMap(Section section) {
        Map<String, AttributeValue> map = new HashMap<>();
        map.put("sectionId", AttributeValue.builder().s(section.getSectionId().toString()).build());
        map.put("title", AttributeValue.builder().s(section.getTitle()).build());
        map.put("description", AttributeValue.builder().s(section.getDescription()).build());
        map.put("order", AttributeValue.builder().n(String.valueOf(section.getOrder())).build());
        map.put("duration", AttributeValue.builder().n(String.valueOf(section.getDuration())).build());
        return map;
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