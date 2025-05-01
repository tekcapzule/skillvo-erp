package com.skillvo.course.domain.repository;

import com.skillvo.course.domain.model.aggregates.Course;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CourseRepository {
    Course save(Course course);
    Optional<Course> findById(UUID courseId);
    void deleteById(UUID courseId);
    List<Course> findAll();
    List<Course> findByTenantId(String tenantId);
    List<Course> findByTenantIdAndInMarketplace(String tenantId, boolean inMarketplace);
    boolean existsById(UUID courseId);
    List<Course> list(CourseFilter filter);
} 