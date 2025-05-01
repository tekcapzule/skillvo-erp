package com.skillvo.course.application.command.handler;

import com.skillvo.course.application.command.CreateCourseCommand;
import com.skillvo.course.application.command.UpdateCourseCommand;
import com.skillvo.course.application.command.DeleteCourseCommand;
import com.skillvo.course.application.command.PublishCourseCommand;
import com.skillvo.course.application.exception.CourseNotFoundException;
import com.skillvo.course.application.mapper.CourseMapper;
import com.skillvo.course.domain.model.aggregates.Course;
import com.skillvo.course.domain.model.enums.Level;
import com.skillvo.course.domain.model.enums.LearningMode;
import com.skillvo.course.domain.repository.CourseRepository;
import com.skillvo.course.infrastructure.events.DomainEventPublisher;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CourseCommandHandlerTest {

    @Mock
    private CourseRepository courseRepository;

    @Mock
    private CourseMapper courseMapper;

    @Mock
    private DomainEventPublisher eventPublisher;

    private CourseCommandHandler commandHandler;

    @BeforeEach
    void setUp() {
        commandHandler = new CourseCommandHandler(courseRepository, courseMapper, eventPublisher);
    }

    @Test
    void shouldCreateCourse() {
        // Given
        UUID courseId = UUID.fromString("30434f65-3beb-44b2-87d2-0470d6fb1bd7");
        CreateCourseCommand command = CreateCourseCommand.builder()
                .tenantId("tenant1")
                .title("Test Course")
                .description("Test Description")
                .level(Level.BEGINNER)
                .learningMode(LearningMode.ONLINE)
                .build();
        
        Course mappedCourse = Course.builder()
                .level(Level.BEGINNER)
                .learningMode(LearningMode.ONLINE)
                .authors(Collections.emptyList())
                .build();
        Course savedCourse = Course.builder()
                .courseId(courseId)
                .level(Level.BEGINNER)
                .learningMode(LearningMode.ONLINE)
                .authors(Collections.emptyList())
                .build();
        
        when(courseMapper.toEntity(any(CreateCourseCommand.class))).thenReturn(mappedCourse);
        when(courseRepository.save(any(Course.class))).thenAnswer(invocation -> {
            Course course = invocation.getArgument(0);
            course.setCourseId(courseId);
            return course;
        });

        // When
        UUID result = commandHandler.handle(command);

        // Then
        assertThat(result).isEqualTo(courseId);
        verify(courseMapper).toEntity(any(CreateCourseCommand.class));
        verify(courseRepository).save(mappedCourse);
        verify(eventPublisher).publish(any());
    }

    @Test
    void shouldUpdateCourse() {
        // Given
        UUID courseId = UUID.randomUUID();
        UpdateCourseCommand command = UpdateCourseCommand.builder()
                .courseId(courseId)
                .tenantId("tenant1")
                .title("Updated Course")
                .description("Updated Description")
                .level(Level.BEGINNER)
                .learningMode(LearningMode.ONLINE)
                .build();
        
        Course existingCourse = Course.builder()
                .courseId(courseId)
                .level(Level.BEGINNER)
                .learningMode(LearningMode.ONLINE)
                .authors(Collections.emptyList())
                .build();
        
        Course updatedCourse = Course.builder()
                .courseId(courseId)
                .level(Level.BEGINNER)
                .learningMode(LearningMode.ONLINE)
                .authors(Collections.emptyList())
                .build();
        
        when(courseRepository.findById(courseId)).thenReturn(Optional.of(existingCourse));
        when(courseMapper.toEntity(any(UpdateCourseCommand.class))).thenReturn(updatedCourse);
        when(courseRepository.save(any(Course.class))).thenReturn(updatedCourse);

        // When
        commandHandler.handle(command);

        // Then
        verify(courseRepository).findById(courseId);
        verify(courseMapper).toEntity(any(UpdateCourseCommand.class));
        verify(courseRepository).save(updatedCourse);
    }

    @Test
    void shouldThrowExceptionWhenUpdatingNonExistentCourse() {
        // Given
        UUID courseId = UUID.randomUUID();
        UpdateCourseCommand command = UpdateCourseCommand.builder()
                .courseId(courseId)
                .build();
        
        when(courseRepository.findById(courseId)).thenReturn(Optional.empty());

        // When/Then
        assertThatThrownBy(() -> commandHandler.handle(command))
                .isInstanceOf(CourseNotFoundException.class)
                .hasMessage("Course not found with id: " + courseId);
        
        verify(courseRepository).findById(courseId);
        verify(courseMapper, never()).toEntity(any(UpdateCourseCommand.class));
        verify(courseRepository, never()).save(any());
    }

    @Test
    void shouldDeleteCourse() {
        // Given
        UUID courseId = UUID.randomUUID();
        DeleteCourseCommand command = DeleteCourseCommand.builder()
                .courseId(courseId)
                .build();
        
        when(courseRepository.existsById(courseId)).thenReturn(true);

        // When
        commandHandler.handle(command);

        // Then
        verify(courseRepository).existsById(courseId);
        verify(courseRepository).deleteById(courseId);
    }

    @Test
    void shouldThrowExceptionWhenDeletingNonExistentCourse() {
        // Given
        UUID courseId = UUID.randomUUID();
        DeleteCourseCommand command = DeleteCourseCommand.builder()
                .courseId(courseId)
                .build();
        
        when(courseRepository.existsById(courseId)).thenReturn(false);

        // When/Then
        assertThatThrownBy(() -> commandHandler.handle(command))
                .isInstanceOf(CourseNotFoundException.class)
                .hasMessage("Course not found with id: " + courseId);
        
        verify(courseRepository).existsById(courseId);
        verify(courseRepository, never()).deleteById(any());
    }

    @Test
    void shouldPublishCourse() {
        // Given
        UUID courseId = UUID.randomUUID();
        PublishCourseCommand command = PublishCourseCommand.builder()
                .courseId(courseId)
                .build();
        
        Course course = Course.builder()
                .courseId(courseId)
                .inMarketplace(false)
                .level(Level.BEGINNER)
                .learningMode(LearningMode.ONLINE)
                .authors(Collections.emptyList())
                .build();
        
        when(courseRepository.findById(courseId)).thenReturn(Optional.of(course));
        when(courseRepository.save(any(Course.class))).thenReturn(course);

        // When
        commandHandler.handle(command);

        // Then
        verify(courseRepository).findById(courseId);
        verify(courseRepository).save(course);
        verify(eventPublisher).publish(any());
        assertThat(course.isInMarketplace()).isTrue();
    }

    @Test
    void shouldThrowExceptionWhenPublishingNonExistentCourse() {
        // Given
        UUID courseId = UUID.randomUUID();
        PublishCourseCommand command = PublishCourseCommand.builder()
                .courseId(courseId)
                .build();
        
        when(courseRepository.findById(courseId)).thenReturn(Optional.empty());

        // When/Then
        assertThatThrownBy(() -> commandHandler.handle(command))
                .isInstanceOf(CourseNotFoundException.class)
                .hasMessage("Course not found with id: " + courseId);
        
        verify(courseRepository).findById(courseId);
        verify(courseRepository, never()).save(any());
    }
} 