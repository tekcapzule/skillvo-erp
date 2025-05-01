package com.skillvo.course.application.query.handler;

import com.skillvo.course.application.dto.CourseDTO;
import com.skillvo.course.application.exception.CourseNotFoundException;
import com.skillvo.course.application.mapper.CourseMapper;
import com.skillvo.course.application.query.GetCourseQuery;
import com.skillvo.course.application.query.ListCoursesQuery;
import com.skillvo.course.domain.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class CourseQueryHandler {
    private final CourseRepository courseRepository;
    private final CourseMapper courseMapper;

    @Transactional(readOnly = true)
    public CourseDTO handle(GetCourseQuery query) {
        return courseRepository.findById(query.getCourseId())
                .map(courseMapper::toDTO)
                .orElseThrow(() -> new CourseNotFoundException("Course not found with id: " + query.getCourseId()));
    }

    @Transactional(readOnly = true)
    public List<CourseDTO> handle(ListCoursesQuery query) {
        if (query.getTenantId() != null && query.isInMarketplace()) {
            return courseRepository.findByTenantIdAndInMarketplace(query.getTenantId(), true).stream()
                    .map(courseMapper::toDTO)
                    .collect(Collectors.toList());
        } else if (query.getTenantId() != null) {
            return courseRepository.findByTenantId(query.getTenantId()).stream()
                    .map(courseMapper::toDTO)
                    .collect(Collectors.toList());
        }
        return courseRepository.findAll().stream()
                .map(courseMapper::toDTO)
                .collect(Collectors.toList());
    }
} 