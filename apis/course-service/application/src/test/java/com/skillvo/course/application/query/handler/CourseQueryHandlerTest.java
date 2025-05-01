package com.skillvo.course.application.query.handler;

import com.skillvo.course.application.dto.CourseDTO;
import com.skillvo.course.application.exception.CourseNotFoundException;
import com.skillvo.course.application.mapper.CourseMapper;
import com.skillvo.course.application.query.GetCourseQuery;
import com.skillvo.course.application.query.ListCoursesQuery;
import com.skillvo.course.domain.model.aggregates.Course;
import com.skillvo.course.domain.repository.CourseRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CourseQueryHandlerTest {

    @Mock
    private CourseRepository courseRepository;

    @Mock
    private CourseMapper courseMapper;

    private CourseQueryHandler queryHandler;

    @BeforeEach
    void setUp() {
        queryHandler = new CourseQueryHandler(courseRepository, courseMapper);
    }

    @Test
    void shouldGetCourse() {
        // Given
        UUID courseId = UUID.randomUUID();
        GetCourseQuery query = GetCourseQuery.builder()
                .courseId(courseId)
                .build();
        
        Course course = new Course();
        course.setCourseId(courseId);
        
        CourseDTO courseDTO = CourseDTO.builder()
                .courseId(courseId)
                .build();
        
        when(courseRepository.findById(courseId)).thenReturn(Optional.of(course));
        when(courseMapper.toDTO(course)).thenReturn(courseDTO);

        // When
        CourseDTO result = queryHandler.handle(query);

        // Then
        assertThat(result).isEqualTo(courseDTO);
        verify(courseRepository).findById(courseId);
        verify(courseMapper).toDTO(course);
    }

    @Test
    void shouldThrowExceptionWhenGettingNonExistentCourse() {
        // Given
        UUID courseId = UUID.randomUUID();
        GetCourseQuery query = GetCourseQuery.builder()
                .courseId(courseId)
                .build();
        
        when(courseRepository.findById(courseId)).thenReturn(Optional.empty());

        // When/Then
        assertThatThrownBy(() -> queryHandler.handle(query))
                .isInstanceOf(CourseNotFoundException.class)
                .hasMessage("Course not found with id: " + courseId);
        
        verify(courseRepository).findById(courseId);
        verify(courseMapper, never()).toDTO(any());
    }

    @Test
    void shouldListCourses() {
        // Given
        String tenantId = "tenant1";
        ListCoursesQuery query = ListCoursesQuery.builder()
                .tenantId(tenantId)
                .inMarketplace(true)
                .build();
        
        Course course1 = new Course();
        course1.setCourseId(UUID.randomUUID());
        course1.setTenantId(tenantId);
        course1.setInMarketplace(true);
        
        Course course2 = new Course();
        course2.setCourseId(UUID.randomUUID());
        course2.setTenantId(tenantId);
        course2.setInMarketplace(true);
        
        CourseDTO courseDTO1 = CourseDTO.builder()
                .courseId(course1.getCourseId())
                .tenantId(tenantId)
                .inMarketplace(true)
                .build();
        
        CourseDTO courseDTO2 = CourseDTO.builder()
                .courseId(course2.getCourseId())
                .tenantId(tenantId)
                .inMarketplace(true)
                .build();
        
        when(courseRepository.findByTenantIdAndInMarketplace(tenantId, true))
                .thenReturn(List.of(course1, course2));
        when(courseMapper.toDTO(course1)).thenReturn(courseDTO1);
        when(courseMapper.toDTO(course2)).thenReturn(courseDTO2);

        // When
        List<CourseDTO> result = queryHandler.handle(query);

        // Then
        assertThat(result).hasSize(2);
        assertThat(result).containsExactly(courseDTO1, courseDTO2);
        verify(courseRepository).findByTenantIdAndInMarketplace(tenantId, true);
        verify(courseMapper).toDTO(course1);
        verify(courseMapper).toDTO(course2);
    }

    @Test
    void shouldReturnEmptyListWhenNoCoursesFound() {
        // Given
        String tenantId = "tenant1";
        ListCoursesQuery query = ListCoursesQuery.builder()
                .tenantId(tenantId)
                .inMarketplace(true)
                .build();
        
        when(courseRepository.findByTenantIdAndInMarketplace(tenantId, true))
                .thenReturn(List.of());

        // When
        List<CourseDTO> result = queryHandler.handle(query);

        // Then
        assertThat(result).isEmpty();
        verify(courseRepository).findByTenantIdAndInMarketplace(tenantId, true);
        verify(courseMapper, never()).toDTO(any());
    }
} 