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
import com.skillvo.course.domain.repository.CourseFilter;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.DockerImageName;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.*;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@Testcontainers
class DynamoDBCourseRepositoryTest {

    @Container
    private static final GenericContainer<?> dynamoDB;

    static {
        try (GenericContainer<?> container = new GenericContainer<>(DockerImageName.parse("amazon/dynamodb-local:latest"))) {
            container.withExposedPorts(8000);
            container.start();
            dynamoDB = container;
        }
    }

    private DynamoDbClient dynamoDbClient;
    private DynamoDBCourseRepository repository;

    @BeforeEach
    void setUp() {
        dynamoDbClient = DynamoDbClient.builder()
                .endpointOverride(URI.create("http://localhost:" + dynamoDB.getMappedPort(8000)))
                .credentialsProvider(StaticCredentialsProvider.create(
                    AwsBasicCredentials.create("dummy", "dummy")))
                .region(Region.US_EAST_1)
                .build();

        createTable();
        createIndexes();

        repository = new DynamoDBCourseRepository(dynamoDbClient);
    }

    @AfterEach
    void tearDown() {
        // Delete all items from the table
        ScanRequest scanRequest = ScanRequest.builder()
                .tableName("Courses")
                .build();
        ScanResponse scanResponse = dynamoDbClient.scan(scanRequest);
        scanResponse.items().forEach(item -> {
            DeleteItemRequest deleteRequest = DeleteItemRequest.builder()
                    .tableName("Courses")
                    .key(Collections.singletonMap("courseId", item.get("courseId")))
                    .build();
            dynamoDbClient.deleteItem(deleteRequest);
        });
    }

    private void createTable() {
        CreateTableRequest request = CreateTableRequest.builder()
                .tableName("Courses")
                .attributeDefinitions(
                        AttributeDefinition.builder()
                                .attributeName("courseId")
                                .attributeType(ScalarAttributeType.S)
                                .build(),
                        AttributeDefinition.builder()
                                .attributeName("tenantId")
                                .attributeType(ScalarAttributeType.S)
                                .build(),
                        AttributeDefinition.builder()
                                .attributeName("status")
                                .attributeType(ScalarAttributeType.S)
                                .build(),
                        AttributeDefinition.builder()
                                .attributeName("level")
                                .attributeType(ScalarAttributeType.S)
                                .build(),
                        AttributeDefinition.builder()
                                .attributeName("tag")
                                .attributeType(ScalarAttributeType.S)
                                .build())
                .keySchema(
                        KeySchemaElement.builder()
                                .attributeName("courseId")
                                .keyType(KeyType.HASH)
                                .build())
                .globalSecondaryIndexes(
                        GlobalSecondaryIndex.builder()
                                .indexName("TenantIdIndex")
                                .keySchema(KeySchemaElement.builder()
                                        .attributeName("tenantId")
                                        .keyType(KeyType.HASH)
                                        .build())
                                .projection(Projection.builder()
                                        .projectionType(ProjectionType.ALL)
                                        .build())
                                .provisionedThroughput(ProvisionedThroughput.builder()
                                        .readCapacityUnits(5L)
                                        .writeCapacityUnits(5L)
                                        .build())
                                .build(),
                        GlobalSecondaryIndex.builder()
                                .indexName("StatusIndex")
                                .keySchema(KeySchemaElement.builder()
                                        .attributeName("status")
                                        .keyType(KeyType.HASH)
                                        .build())
                                .projection(Projection.builder()
                                        .projectionType(ProjectionType.ALL)
                                        .build())
                                .provisionedThroughput(ProvisionedThroughput.builder()
                                        .readCapacityUnits(5L)
                                        .writeCapacityUnits(5L)
                                        .build())
                                .build(),
                        GlobalSecondaryIndex.builder()
                                .indexName("LevelIndex")
                                .keySchema(KeySchemaElement.builder()
                                        .attributeName("level")
                                        .keyType(KeyType.HASH)
                                        .build())
                                .projection(Projection.builder()
                                        .projectionType(ProjectionType.ALL)
                                        .build())
                                .provisionedThroughput(ProvisionedThroughput.builder()
                                        .readCapacityUnits(5L)
                                        .writeCapacityUnits(5L)
                                        .build())
                                .build(),
                        GlobalSecondaryIndex.builder()
                                .indexName("TagsIndex")
                                .keySchema(KeySchemaElement.builder()
                                        .attributeName("tag")
                                        .keyType(KeyType.HASH)
                                        .build())
                                .projection(Projection.builder()
                                        .projectionType(ProjectionType.ALL)
                                        .build())
                                .provisionedThroughput(ProvisionedThroughput.builder()
                                        .readCapacityUnits(5L)
                                        .writeCapacityUnits(5L)
                                        .build())
                                .build())
                .provisionedThroughput(
                        ProvisionedThroughput.builder()
                                .readCapacityUnits(5L)
                                .writeCapacityUnits(5L)
                                .build())
                .build();

        try {
            dynamoDbClient.createTable(request);
        } catch (ResourceInUseException e) {
            // Table already exists
        }
    }

    private void createIndexes() {
        // Indexes are now created as part of the table creation
    }

    @Test
    void shouldSaveAndRetrieveCourse() {
        // Given
        Course course = createSampleCourse();

        // When
        repository.save(course);
        Course retrievedCourse = repository.findById(course.getCourseId()).orElseThrow();

        // Then
        assertThat(retrievedCourse).isEqualTo(course);
    }

    @Test
    void shouldDeleteCourse() {
        // Given
        Course course = createSampleCourse();
        repository.save(course);

        // When
        repository.deleteById(course.getCourseId());

        // Then
        assertThat(repository.findById(course.getCourseId())).isEmpty();
    }

    @Test
    void shouldListCoursesByTenantId() {
        // Given
        String tenantId = "tenant1";
        Course course1 = createSampleCourse(tenantId);
        Course course2 = createSampleCourse(tenantId);
        Course course3 = createSampleCourse("tenant2");

        repository.save(course1);
        repository.save(course2);
        repository.save(course3);

        CourseFilter filter = CourseFilter.builder()
                .tenantId(tenantId)
                .build();

        // When
        List<Course> courses = repository.list(filter);

        // Then
        assertThat(courses).containsExactlyInAnyOrder(course1, course2);
    }

    @Test
    void shouldListCoursesByStatus() {
        // Given
        Course course1 = createSampleCourse();
        course1.setStatus(Status.PUBLISHED);
        Course course2 = createSampleCourse();
        course2.setStatus(Status.PUBLISHED);
        Course course3 = createSampleCourse();
        course3.setStatus(Status.DRAFT);

        repository.save(course1);
        repository.save(course2);
        repository.save(course3);

        CourseFilter filter = CourseFilter.builder()
                .status(Status.PUBLISHED)
                .build();

        // When
        List<Course> courses = repository.list(filter);

        // Then
        assertThat(courses).containsExactlyInAnyOrder(course1, course2);
    }

    @Test
    void shouldListCoursesByLevel() {
        // Given
        Course course1 = createSampleCourse();
        course1.setLevel(Level.ADVANCED);
        Course course2 = createSampleCourse();
        course2.setLevel(Level.ADVANCED);
        Course course3 = createSampleCourse();
        course3.setLevel(Level.BEGINNER);

        repository.save(course1);
        repository.save(course2);
        repository.save(course3);

        CourseFilter filter = CourseFilter.builder()
                .level(Level.ADVANCED)
                .build();

        // When
        List<Course> courses = repository.list(filter);

        // Then
        assertThat(courses).containsExactlyInAnyOrder(course1, course2);
    }

    @Test
    void shouldListCoursesByTags() {
        // Given
        Course course1 = createSampleCourse();
        course1.setCourseId(UUID.fromString("00000000-0000-0000-0000-000000000001"));
        course1.setTags(Arrays.asList("java", "spring"));
        Course course2 = createSampleCourse();
        course2.setCourseId(UUID.fromString("00000000-0000-0000-0000-000000000002"));
        course2.setTags(Arrays.asList("java", "hibernate"));
        Course course3 = createSampleCourse();
        course3.setCourseId(UUID.fromString("00000000-0000-0000-0000-000000000003"));
        course3.setTags(Arrays.asList("python", "django"));

        repository.save(course1);
        repository.save(course2);
        repository.save(course3);

        CourseFilter filter = CourseFilter.builder()
                .tags(Arrays.asList("java"))
                .build();

        // When
        List<Course> courses = repository.list(filter);

        // Then
        assertThat(courses).containsExactlyInAnyOrder(course1, course2);
    }

    @Test
    void shouldApplyLimitAndOffset() {
        // Given
        Course course1 = createSampleCourse();
        course1.setCourseId(UUID.fromString("00000000-0000-0000-0000-000000000001"));
        Course course2 = createSampleCourse();
        course2.setCourseId(UUID.fromString("00000000-0000-0000-0000-000000000002"));
        Course course3 = createSampleCourse();
        course3.setCourseId(UUID.fromString("00000000-0000-0000-0000-000000000003"));
        Course course4 = createSampleCourse();
        course4.setCourseId(UUID.fromString("00000000-0000-0000-0000-000000000004"));

        repository.save(course1);
        repository.save(course2);
        repository.save(course3);
        repository.save(course4);

        CourseFilter filter = CourseFilter.builder()
                .limit(2)
                .offset(1)
                .build();

        // When
        List<Course> courses = repository.list(filter);

        // Then
        assertThat(courses).hasSize(2);
        assertThat(courses).containsExactly(course2, course3);
    }

    private Course createSampleCourse() {
        return createSampleCourse("tenant1");
    }

    private Course createSampleCourse(String tenantId) {
        Course course = new Course();
        course.setCourseId(UUID.randomUUID());
        course.setTenantId(tenantId);
        course.setTitle("Test Course");
        course.setDescription("Test Description");
        course.setTopicCode("topic1");
        course.setCategoryCode("category1");
        course.setLanguage(Arrays.asList(Language.ENGLISH));
        course.setLevel(Level.BEGINNER);
        course.setPricingModel(PricingModel.FREE);
        course.setPrize(new Prize(0.0, 0, Currency.USD));
        course.setLearningMode(LearningMode.ONLINE);
        course.setPoints(100);
        course.setTags(Arrays.asList("test"));
        course.setAuthors(Arrays.asList(createSampleAuthor()));
        course.setPublisher(createSamplePublisher());
        course.setPublishedOn(LocalDateTime.now());
        course.setImageUrl("http://example.com/image.jpg");
        course.setInMarketplace(false);
        course.setStatus(Status.DRAFT);
        course.setDuration(30);
        course.setSections(Arrays.asList(createSampleSection()));
        course.setLessonNavigationMode(LessonNavigationMode.SEQUENTIAL);
        course.setVersion(1);
        return course;
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
        Publisher publisher = new Publisher();
        publisher.setPublisherId(UUID.randomUUID());
        publisher.setName("Test Publisher");
        publisher.setType(PublisherType.INDIVIDUAL);
        publisher.setLogoUrl("http://example.com/logo.jpg");
        publisher.setWebsite("http://example.com");
        publisher.setContactEmail("contact@example.com");
        publisher.setDescription("Test Publisher Description");
        publisher.setCountry("US");
        return publisher;
    }

    private Section createSampleSection() {
        Section section = new Section();
        section.setSectionId(UUID.randomUUID());
        section.setTitle("Test Section");
        section.setDescription("Test Section Description");
        section.setOrder(1);
        section.setDuration(30);
        return section;
    }
} 