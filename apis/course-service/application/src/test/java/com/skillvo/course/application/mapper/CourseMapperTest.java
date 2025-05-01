package com.skillvo.course.application.mapper;

import com.skillvo.course.application.dto.*;
import com.skillvo.course.domain.model.aggregates.Course;
import com.skillvo.course.domain.model.entities.Author;
import com.skillvo.course.domain.model.entities.Section;
import com.skillvo.course.domain.model.entities.Lesson;
import com.skillvo.course.domain.model.enums.*;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

class CourseMapperTest {

    private final CourseMapper courseMapper = new CourseMapper();

    @Test
    void shouldMapCourseToDTO() {
        // Given
        Course course = createValidCourse();

        // When
        CourseDTO result = courseMapper.toDTO(course);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getCourseId()).isEqualTo(course.getCourseId());
        assertThat(result.getTitle()).isEqualTo(course.getTitle());
        assertThat(result.getDescription()).isEqualTo(course.getDescription());
        assertThat(result.getLanguage()).isEqualTo(course.getLanguage());
        assertThat(result.getLevel()).isEqualTo(course.getLevel());
        assertThat(result.getPricingModel()).isEqualTo(course.getPricingModel());
        assertThat(result.getLearningMode()).isEqualTo(course.getLearningMode());
        assertThat(result.getDuration()).isEqualTo(course.getDuration());
        assertThat(result.getStatus()).isEqualTo(course.getStatus());
        assertThat(result.getAuthors()).hasSize(1);
        assertThat(result.getSections()).hasSize(1);
    }

    @Test
    void shouldMapDTOToCourse() {
        // Given
        CourseDTO dto = createValidCourseDTO();

        // When
        Course result = courseMapper.toDomain(dto);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getCourseId()).isEqualTo(dto.getCourseId());
        assertThat(result.getTitle()).isEqualTo(dto.getTitle());
        assertThat(result.getDescription()).isEqualTo(dto.getDescription());
        assertThat(result.getLanguage()).isEqualTo(dto.getLanguage());
        assertThat(result.getLevel()).isEqualTo(dto.getLevel());
        assertThat(result.getPricingModel()).isEqualTo(dto.getPricingModel());
        assertThat(result.getLearningMode()).isEqualTo(dto.getLearningMode());
        assertThat(result.getDuration()).isEqualTo(dto.getDuration());
        assertThat(result.getStatus()).isEqualTo(dto.getStatus());
        assertThat(result.getAuthors()).hasSize(1);
        assertThat(result.getSections()).hasSize(1);
    }

    @Test
    void shouldMapCourseListToDTOList() {
        // Given
        List<Course> courses = List.of(createValidCourse());

        // When
        List<CourseDTO> result = courseMapper.toDTOList(courses);

        // Then
        assertThat(result).hasSize(1);
        assertThat(result.get(0).getCourseId()).isEqualTo(courses.get(0).getCourseId());
    }

    private Course createValidCourse() {
        Course course = new Course();
        course.setCourseId(UUID.randomUUID());
        course.setTitle("Test Course");
        course.setDescription("Test Description");
        course.setLanguage(List.of(Language.ENGLISH));
        course.setLevel(Level.BEGINNER);
        course.setPricingModel(PricingModel.FREE);
        course.setLearningMode(LearningMode.ONLINE);
        course.setDuration(60);
        course.setStatus(Status.DRAFT);
        
        Author author = new Author();
        author.setAuthorId(UUID.randomUUID());
        author.setFirstName("John");
        author.setLastName("Doe");
        author.setEmailId("john.doe@example.com");
        course.setAuthors(List.of(author));

        Lesson lesson = new Lesson();
        lesson.setLessonId(UUID.randomUUID());
        lesson.setTitle("Test Lesson");
        lesson.setDuration(30f);

        Section section = new Section();
        section.setSectionId(UUID.randomUUID());
        section.setTitle("Section 1");
        section.setDescription("Description 1");
        section.setOrder(1);
        section.setDuration(30);
        section.setLessons(List.of(lesson));
        course.setSections(List.of(section));

        return course;
    }

    private CourseDTO createValidCourseDTO() {
        return CourseDTO.builder()
                .courseId(UUID.randomUUID())
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
                .status(Status.DRAFT)
                .sections(List.of(SectionDTO.builder()
                        .sectionId(UUID.randomUUID())
                        .title("Section 1")
                        .description("Description 1")
                        .order(1)
                        .duration(30)
                        .lessons(List.of(LessonDTO.builder()
                                .lessonId(UUID.randomUUID())
                                .title("Test Lesson")
                                .duration(30)
                                .build()))
                        .build()))
                .build();
    }
} 