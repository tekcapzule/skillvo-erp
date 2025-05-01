package com.skillvo.course.application.service;

import com.skillvo.course.application.command.CreateCourseCommand;
import com.skillvo.course.application.command.DeleteCourseCommand;
import com.skillvo.course.application.command.PublishCourseCommand;
import com.skillvo.course.application.command.UpdateCourseCommand;
import com.skillvo.course.application.dto.AuthorDTO;
import com.skillvo.course.application.dto.PrizeDTO;
import com.skillvo.course.application.dto.PublisherDTO;
import com.skillvo.course.application.dto.SectionDTO;
import com.skillvo.course.application.query.CourseFilter;
import com.skillvo.course.domain.model.aggregates.Course;
import com.skillvo.course.domain.model.entities.Author;
import com.skillvo.course.domain.model.entities.Publisher;
import com.skillvo.course.domain.model.entities.Section;
import com.skillvo.course.domain.model.enums.*;
import com.skillvo.course.domain.model.valueobjects.Prize;
import com.skillvo.course.domain.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;

    @Transactional
    public Course createCourse(CreateCourseCommand command) {
        validateCreateCommand(command);
        
        Course course = Course.builder()
                .courseId(UUID.randomUUID())
                .tenantId(command.getTenantId())
                .title(command.getTitle())
                .description(command.getDescription())
                .topicCode(command.getTopicCode())
                .categoryCode(command.getCategoryCode())
                .language(command.getLanguage())
                .level(command.getLevel())
                .pricingModel(command.getPricingModel())
                .prize(toDomainPrize(command.getPrize()))
                .learningMode(command.getLearningMode())
                .points(command.getPoints())
                .tags(command.getTags())
                .authors(toDomainAuthors(command.getAuthors()))
                .publisher(toDomainPublisher(command.getPublisher()))
                .imageUrl(command.getImageUrl())
                .inMarketplace(false)
                .status(Status.DRAFT)
                .duration(command.getDuration())
                .sections(toDomainSections(command.getSections()))
                .lessonNavigationMode(command.getLessonNavigationMode())
                .version(1)
                .build();

        return courseRepository.save(course);
    }

    @Transactional
    public Course updateCourse(UpdateCourseCommand command) {
        validateUpdateCommand(command);
        
        Course existingCourse = courseRepository.findById(command.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        if (existingCourse.getStatus() == Status.ARCHIVED) {
            throw new RuntimeException("Cannot update an archived course");
        }

        existingCourse.setTitle(command.getTitle());
        existingCourse.setDescription(command.getDescription());
        existingCourse.setTopicCode(command.getTopicCode());
        existingCourse.setCategoryCode(command.getCategoryCode());
        existingCourse.setLanguage(command.getLanguage());
        existingCourse.setLevel(command.getLevel());
        existingCourse.setPricingModel(command.getPricingModel());
        existingCourse.setPrize(toDomainPrize(command.getPrize()));
        existingCourse.setLearningMode(command.getLearningMode());
        existingCourse.setPoints(command.getPoints());
        existingCourse.setTags(command.getTags());
        existingCourse.setAuthors(toDomainAuthors(command.getAuthors()));
        existingCourse.setPublisher(toDomainPublisher(command.getPublisher()));
        existingCourse.setImageUrl(command.getImageUrl());
        existingCourse.setDuration(command.getDuration());
        existingCourse.setSections(toDomainSections(command.getSections()));
        existingCourse.setLessonNavigationMode(command.getLessonNavigationMode());
        existingCourse.setVersion(existingCourse.getVersion() + 1);

        return courseRepository.save(existingCourse);
    }

    @Transactional
    public void deleteCourse(DeleteCourseCommand command) {
        Course course = courseRepository.findById(command.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));
        
        if (course.getStatus() == Status.PUBLISHED) {
            throw new RuntimeException("Cannot delete a published course");
        }
        
        courseRepository.deleteById(command.getCourseId());
    }

    @Transactional
    public Course publishCourse(PublishCourseCommand command) {
        Course course = courseRepository.findById(command.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        if (course.getStatus() == Status.ARCHIVED) {
            throw new RuntimeException("Cannot publish an archived course");
        }

        validateCourseForPublishing(course);

        course.setStatus(Status.PUBLISHED);
        course.setPublishedOn(LocalDateTime.now());
        course.setVersion(course.getVersion() + 1);

        return courseRepository.save(course);
    }

    @Transactional(readOnly = true)
    public Optional<Course> getCourse(UUID courseId) {
        return courseRepository.findById(courseId);
    }

    @Transactional(readOnly = true)
    public List<Course> listCourses(CourseFilter filter) {
        if (filter.getTenantId() != null && filter.isInMarketplace()) {
            return courseRepository.findByTenantIdAndInMarketplace(filter.getTenantId(), true);
        } else if (filter.getTenantId() != null) {
            return courseRepository.findByTenantId(filter.getTenantId());
        }
        return courseRepository.findAll();
    }

    private void validateCreateCommand(CreateCourseCommand command) {
        if (!StringUtils.hasText(command.getTenantId())) {
            throw new RuntimeException("Tenant ID is required");
        }
        if (!StringUtils.hasText(command.getTitle())) {
            throw new RuntimeException("Title is required");
        }
        if (!StringUtils.hasText(command.getDescription())) {
            throw new RuntimeException("Description is required");
        }
        if (command.getLanguage() == null || command.getLanguage().isEmpty()) {
            throw new RuntimeException("At least one language is required");
        }
        if (command.getLevel() == null) {
            throw new RuntimeException("Level is required");
        }
        if (command.getPricingModel() == null) {
            throw new RuntimeException("Pricing model is required");
        }
        if (command.getLearningMode() == null) {
            throw new RuntimeException("Learning mode is required");
        }
        if (command.getAuthors() == null || command.getAuthors().isEmpty()) {
            throw new RuntimeException("At least one author is required");
        }
        if (command.getDuration() == null || command.getDuration() <= 0) {
            throw new RuntimeException("Duration must be greater than 0");
        }
    }

    private void validateUpdateCommand(UpdateCourseCommand command) {
        if (command.getCourseId() == null) {
            throw new RuntimeException("Course ID is required");
        }
        if (!StringUtils.hasText(command.getTitle())) {
            throw new RuntimeException("Title is required");
        }
        if (!StringUtils.hasText(command.getDescription())) {
            throw new RuntimeException("Description is required");
        }
        if (command.getLanguage() == null || command.getLanguage().isEmpty()) {
            throw new RuntimeException("At least one language is required");
        }
        if (command.getLevel() == null) {
            throw new RuntimeException("Level is required");
        }
        if (command.getPricingModel() == null) {
            throw new RuntimeException("Pricing model is required");
        }
        if (command.getLearningMode() == null) {
            throw new RuntimeException("Learning mode is required");
        }
        if (command.getAuthors() == null || command.getAuthors().isEmpty()) {
            throw new RuntimeException("At least one author is required");
        }
        if (command.getDuration() == null || command.getDuration() <= 0) {
            throw new RuntimeException("Duration must be greater than 0");
        }
    }

    private void validateCourseForPublishing(Course course) {
        if (!StringUtils.hasText(course.getTitle())) {
            throw new RuntimeException("Title is required for publishing");
        }
        if (!StringUtils.hasText(course.getDescription())) {
            throw new RuntimeException("Description is required for publishing");
        }
        if (course.getLanguage() == null || course.getLanguage().isEmpty()) {
            throw new RuntimeException("At least one language is required for publishing");
        }
        if (course.getLevel() == null) {
            throw new RuntimeException("Level is required for publishing");
        }
        if (course.getPricingModel() == null) {
            throw new RuntimeException("Pricing model is required for publishing");
        }
        if (course.getLearningMode() == null) {
            throw new RuntimeException("Learning mode is required for publishing");
        }
        if (course.getAuthors() == null || course.getAuthors().isEmpty()) {
            throw new RuntimeException("At least one author is required for publishing");
        }
        if (course.getDuration() == null || course.getDuration() <= 0) {
            throw new RuntimeException("Duration must be greater than 0 for publishing");
        }
        if (course.getSections() == null || course.getSections().isEmpty()) {
            throw new RuntimeException("At least one section is required for publishing");
        }
        if (course.getPricingModel() == PricingModel.PAID && course.getPrize() == null) {
            throw new RuntimeException("Prize is required for paid courses");
        }
    }

    private Prize toDomainPrize(PrizeDTO dto) {
        if (dto == null) {
            return null;
        }
        return Prize.builder()
                .prize(dto.getPrize())
                .discount(dto.getDiscount())
                .currency(dto.getCurrency())
                .build();
    }

    private List<Author> toDomainAuthors(List<AuthorDTO> dtos) {
        if (dtos == null) {
            return null;
        }
        return dtos.stream()
                .map(dto -> Author.builder()
                        .authorId(dto.getAuthorId())
                        .firstName(dto.getFirstName())
                        .lastName(dto.getLastName())
                        .emailId(dto.getEmailId())
                        .build())
                .toList();
    }

    private Publisher toDomainPublisher(PublisherDTO dto) {
        if (dto == null) {
            return null;
        }
        return Publisher.builder()
                .publisherId(dto.getPublisherId())
                .name(dto.getName())
                .type(dto.getType())
                .logoUrl(dto.getLogoUrl())
                .website(dto.getWebsite())
                .contactEmail(dto.getContactEmail())
                .description(dto.getDescription())
                .country(dto.getCountry())
                .build();
    }

    private List<Section> toDomainSections(List<SectionDTO> dtos) {
        if (dtos == null) {
            return null;
        }
        return dtos.stream()
                .map(dto -> Section.builder()
                        .sectionId(dto.getSectionId())
                        .title(dto.getTitle())
                        .description(dto.getDescription())
                        .order(dto.getOrder())
                        .duration(dto.getDuration())
                        .build())
                .toList();
    }
} 