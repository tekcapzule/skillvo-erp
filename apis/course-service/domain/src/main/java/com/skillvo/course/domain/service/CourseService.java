package com.skillvo.course.domain.service;

import com.skillvo.course.domain.model.aggregates.Course;
import com.skillvo.course.domain.repository.CourseFilter;
import java.util.List;
import java.util.UUID;

public interface CourseService {
    Course create(Course course);
    Course update(Course course);
    Course publish(UUID courseId);
    Course archive(UUID courseId);
    Course get(UUID courseId);
    List<Course> list(CourseFilter filter);
} 