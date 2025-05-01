package com.skillvo.course.application.service;

import com.skillvo.course.application.command.CreateCourseCommand;
import com.skillvo.course.application.command.DeleteCourseCommand;
import com.skillvo.course.application.command.PublishCourseCommand;
import com.skillvo.course.application.command.UpdateCourseCommand;
import com.skillvo.course.application.dto.AuthorDTO;
import com.skillvo.course.application.dto.SectionDTO;
import com.skillvo.course.domain.model.aggregates.Course;
import com.skillvo.course.domain.model.entities.Author;
import com.skillvo.course.domain.model.entities.Section;
import com.skillvo.course.domain.model.enums.*;
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
class CourseServiceTest {

    @Mock
    private CourseRepository courseRepository;

    private CourseService courseService;

    @BeforeEach
    void setUp() {
        courseService = new CourseService(courseRepository);
    }

    @Test
    void shouldCreateCourse() {
        // Given
        CreateCourseCommand command = createValidCreateCommand();
        Course savedCourse = new Course();
        savedCourse.setCourseId(UUID.randomUUID());
        
        when(courseRepository.save(any(Course.class))).thenReturn(savedCourse);

        // When
        Course result = courseService.createCourse(command);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getCourseId()).isNotNull();
        verify(courseRepository).save(any(Course.class));
    }

    @Test
    void shouldThrowExceptionWhenCreatingCourseWithInvalidData() {
        // Given
        CreateCourseCommand command = CreateCourseCommand.builder()
                .tenantId("")
                .title("")
                .description("")
                .build();

        // When/Then
        assertThatThrownBy(() -> courseService.createCourse(command))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Tenant ID is required");
    }

    @Test
    void shouldUpdateCourse() {
        // Given
        UUID courseId = UUID.randomUUID();
        UpdateCourseCommand command = createValidUpdateCommand(courseId);
        Course existingCourse = new Course();
        existingCourse.setCourseId(courseId);
        existingCourse.setStatus(Status.DRAFT);
        existingCourse.setVersion(1);
        
        when(courseRepository.findById(courseId)).thenReturn(Optional.of(existingCourse));
        when(courseRepository.save(any(Course.class))).thenReturn(existingCourse);

        // When
        Course result = courseService.updateCourse(command);

        // Then
        assertThat(result).isNotNull();
        verify(courseRepository).findById(courseId);
        verify(courseRepository).save(any(Course.class));
    }

    @Test
    void shouldThrowExceptionWhenUpdatingNonExistentCourse() {
        // Given
        UUID courseId = UUID.randomUUID();
        UpdateCourseCommand command = createValidUpdateCommand(courseId);
        
        when(courseRepository.findById(courseId)).thenReturn(Optional.empty());

        // When/Then
        assertThatThrownBy(() -> courseService.updateCourse(command))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Course not found");
    }

    @Test
    void shouldThrowExceptionWhenUpdatingArchivedCourse() {
        // Given
        UUID courseId = UUID.randomUUID();
        UpdateCourseCommand command = createValidUpdateCommand(courseId);
        Course existingCourse = new Course();
        existingCourse.setCourseId(courseId);
        existingCourse.setStatus(Status.ARCHIVED);
        
        when(courseRepository.findById(courseId)).thenReturn(Optional.of(existingCourse));

        // When/Then
        assertThatThrownBy(() -> courseService.updateCourse(command))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Cannot update an archived course");
    }

    @Test
    void shouldDeleteCourse() {
        // Given
        UUID courseId = UUID.randomUUID();
        DeleteCourseCommand command = DeleteCourseCommand.builder()
                .courseId(courseId)
                .build();
        
        Course existingCourse = new Course();
        existingCourse.setCourseId(courseId);
        existingCourse.setStatus(Status.DRAFT);
        
        when(courseRepository.findById(courseId)).thenReturn(Optional.of(existingCourse));

        // When
        courseService.deleteCourse(command);

        // Then
        verify(courseRepository).deleteById(courseId);
    }

    @Test
    void shouldThrowExceptionWhenDeletingPublishedCourse() {
        // Given
        UUID courseId = UUID.randomUUID();
        DeleteCourseCommand command = DeleteCourseCommand.builder()
                .courseId(courseId)
                .build();
        
        Course existingCourse = new Course();
        existingCourse.setCourseId(courseId);
        existingCourse.setStatus(Status.PUBLISHED);
        
        when(courseRepository.findById(courseId)).thenReturn(Optional.of(existingCourse));

        // When/Then
        assertThatThrownBy(() -> courseService.deleteCourse(command))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Cannot delete a published course");
    }

    @Test
    void shouldPublishCourse() {
        // Given
        UUID courseId = UUID.randomUUID();
        PublishCourseCommand command = PublishCourseCommand.builder()
                .courseId(courseId)
                .build();
        
        Course existingCourse = new Course();
        existingCourse.setCourseId(courseId);
        existingCourse.setStatus(Status.DRAFT);
        existingCourse.setTitle("Test Course");
        existingCourse.setDescription("Test Description");
        existingCourse.setLanguage(List.of(Language.ENGLISH));
        existingCourse.setLevel(Level.BEGINNER);
        existingCourse.setPricingModel(PricingModel.FREE);
        existingCourse.setLearningMode(LearningMode.ONLINE);
        existingCourse.setDuration(60);
        existingCourse.setVersion(1);
        
        Author author = new Author();
        author.setAuthorId(UUID.randomUUID());
        author.setFirstName("John");
        author.setLastName("Doe");
        author.setEmailId("john.doe@example.com");
        existingCourse.setAuthors(List.of(author));
        
        Section section = new Section();
        section.setSectionId(UUID.randomUUID());
        section.setTitle("Section 1");
        section.setDescription("Description 1");
        section.setOrder(1);
        section.setDuration(30);
        existingCourse.setSections(List.of(section));
        
        when(courseRepository.findById(courseId)).thenReturn(Optional.of(existingCourse));
        when(courseRepository.save(any(Course.class))).thenReturn(existingCourse);

        // When
        Course result = courseService.publishCourse(command);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getStatus()).isEqualTo(Status.PUBLISHED);
        verify(courseRepository).findById(courseId);
        verify(courseRepository).save(any(Course.class));
    }

    @Test
    void shouldThrowExceptionWhenPublishingArchivedCourse() {
        // Given
        UUID courseId = UUID.randomUUID();
        PublishCourseCommand command = PublishCourseCommand.builder()
                .courseId(courseId)
                .build();
        
        Course existingCourse = new Course();
        existingCourse.setCourseId(courseId);
        existingCourse.setStatus(Status.ARCHIVED);
        
        when(courseRepository.findById(courseId)).thenReturn(Optional.of(existingCourse));

        // When/Then
        assertThatThrownBy(() -> courseService.publishCourse(command))
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("Cannot publish an archived course");
    }

    private CreateCourseCommand createValidCreateCommand() {
        return CreateCourseCommand.builder()
                .tenantId("tenant1")
                .title("Test Course")
                .description("Test Description")
                .language(List.of(Language.ENGLISH))
                .level(Level.BEGINNER)
                .pricingModel(PricingModel.FREE)
                .learningMode(LearningMode.ONLINE)
                .authors(List.of(AuthorDTO.builder()
                        .authorId(UUID.randomUUID())
                        .firstName("John")
                        .lastName("Doe")
                        .emailId("john.doe@example.com")
                        .build()))
                .duration(60)
                .sections(List.of(SectionDTO.builder()
                        .sectionId(UUID.randomUUID())
                        .title("Section 1")
                        .description("Description 1")
                        .order(1)
                        .duration(30)
                        .build()))
                .build();
    }

    private UpdateCourseCommand createValidUpdateCommand(UUID courseId) {
        return UpdateCourseCommand.builder()
                .courseId(courseId)
                .tenantId("tenant1")
                .title("Updated Course")
                .description("Updated Description")
                .language(List.of(Language.ENGLISH))
                .level(Level.BEGINNER)
                .pricingModel(PricingModel.FREE)
                .learningMode(LearningMode.ONLINE)
                .authors(List.of(AuthorDTO.builder()
                        .authorId(UUID.randomUUID())
                        .firstName("John")
                        .lastName("Doe")
                        .emailId("john.doe@example.com")
                        .build()))
                .duration(60)
                .sections(List.of(SectionDTO.builder()
                        .sectionId(UUID.randomUUID())
                        .title("Section 1")
                        .description("Description 1")
                        .order(1)
                        .duration(30)
                        .build()))
                .build();
    }
} 