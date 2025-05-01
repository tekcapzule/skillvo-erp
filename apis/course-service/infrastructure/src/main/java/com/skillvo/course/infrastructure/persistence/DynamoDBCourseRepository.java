package com.skillvo.course.infrastructure.persistence;

import com.skillvo.course.domain.model.aggregates.Course;
import com.skillvo.course.domain.repository.CourseFilter;
import com.skillvo.course.domain.repository.CourseRepository;
import com.skillvo.course.infrastructure.persistence.query.DynamoDBQueryBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.*;

import java.util.*;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class DynamoDBCourseRepository implements CourseRepository {
    private final DynamoDbClient dynamoDbClient;
    private static final String TABLE_NAME = "Courses";

    @Override
    public Course save(Course course) {
        PutItemRequest request = PutItemRequest.builder()
                .tableName(TABLE_NAME)
                .item(DynamoDBModelConverter.toItem(course))
                .build();

        dynamoDbClient.putItem(request);
        return course;
    }

    @Override
    public Optional<Course> findById(UUID courseId) {
        Map<String, AttributeValue> key = new HashMap<>();
        key.put("courseId", AttributeValue.builder().s(courseId.toString()).build());

        GetItemRequest request = GetItemRequest.builder()
                .tableName(TABLE_NAME)
                .key(key)
                .build();

        GetItemResponse response = dynamoDbClient.getItem(request);
        return response.hasItem() ? Optional.of(DynamoDBModelConverter.toCourse(response.item())) : Optional.empty();
    }

    @Override
    public void deleteById(UUID courseId) {
        Map<String, AttributeValue> key = new HashMap<>();
        key.put("courseId", AttributeValue.builder().s(courseId.toString()).build());

        DeleteItemRequest request = DeleteItemRequest.builder()
                .tableName(TABLE_NAME)
                .key(key)
                .build();

        dynamoDbClient.deleteItem(request);
    }

    @Override
    public List<Course> findAll() {
        ScanRequest request = ScanRequest.builder()
                .tableName(TABLE_NAME)
                .build();

        ScanResponse response = dynamoDbClient.scan(request);
        return response.items().stream()
                .map(DynamoDBModelConverter::toCourse)
                .collect(Collectors.toList());
    }

    @Override
    public List<Course> findByTenantId(String tenantId) {
        CourseFilter filter = CourseFilter.builder()
                .tenantId(tenantId)
                .build();
        return list(filter);
    }

    @Override
    public List<Course> findByTenantIdAndInMarketplace(String tenantId, boolean inMarketplace) {
        CourseFilter filter = CourseFilter.builder()
                .tenantId(tenantId)
                .inMarketplace(inMarketplace)
                .build();
        return list(filter);
    }

    @Override
    public boolean existsById(UUID courseId) {
        return findById(courseId).isPresent();
    }

    @Override
    public List<Course> list(CourseFilter filter) {
        DynamoDBQueryBuilder queryBuilder = new DynamoDBQueryBuilder().withFilter(filter);
        List<Map<String, AttributeValue>> items = new ArrayList<>();

        queryBuilder.buildQueryRequest().ifPresentOrElse(
            queryRequest -> {
                QueryResponse response = dynamoDbClient.query(queryRequest);
                items.addAll(response.items());
            },
            () -> {
                ScanResponse response = dynamoDbClient.scan(queryBuilder.buildScanRequest());
                items.addAll(response.items());
            }
        );

        List<Course> courses = items.stream()
                .map(DynamoDBModelConverter::toCourse)
                .sorted((c1, c2) -> c1.getCourseId().compareTo(c2.getCourseId()))
                .collect(Collectors.toList());

        // Apply pagination
        int startIndex = filter.getOffset() != null ? filter.getOffset() : 0;
        int endIndex = filter.getLimit() != null ? 
            Math.min(startIndex + filter.getLimit(), courses.size()) : 
            courses.size();
        
        if (startIndex >= courses.size()) {
            return Collections.emptyList();
        }
        
        return new ArrayList<>(courses.subList(startIndex, endIndex));
    }

    private boolean matchesFilter(Course course, CourseFilter filter) {
        if (filter.getTenantId() != null && !course.getTenantId().equals(filter.getTenantId())) {
            return false;
        }
        if (filter.getStatus() != null && course.getStatus() != filter.getStatus()) {
            return false;
        }
        if (filter.getLevel() != null && course.getLevel() != filter.getLevel()) {
            return false;
        }
        if (filter.getTags() != null && !filter.getTags().isEmpty()) {
            return !Collections.disjoint(course.getTags(), filter.getTags());
        }
        return true;
    }
} 