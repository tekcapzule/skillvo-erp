package com.skillvo.course.application.command.handler;

import com.skillvo.course.application.command.CreateCourseCommand;
import com.skillvo.course.application.command.UpdateCourseCommand;
import com.skillvo.course.application.command.DeleteCourseCommand;
import com.skillvo.course.application.command.PublishCourseCommand;
import com.skillvo.course.application.exception.CourseNotFoundException;
import com.skillvo.course.application.mapper.CourseMapper;
import com.skillvo.course.domain.model.aggregates.Course;
import com.skillvo.course.domain.model.events.CourseCreated;
import com.skillvo.course.domain.model.events.CoursePublished;
import com.skillvo.course.domain.repository.CourseRepository;
import com.skillvo.course.infrastructure.events.DomainEventPublisher;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class CourseCommandHandler {
    private final CourseRepository courseRepository;
    private final CourseMapper courseMapper;
    private final DomainEventPublisher eventPublisher;

    @Transactional
    public UUID handle(CreateCourseCommand command) {
        Course course = courseMapper.toEntity(command);
        course.setCourseId(UUID.randomUUID());
        course = courseRepository.save(course);
        
        // Publish domain event
        eventPublisher.publish(new CourseCreated(
            course.getCourseId(),
            course.getTenantId(),
            course.getTitle(),
            course.getDescription(),
            course.getTopicCode(),
            course.getLevel().name(),
            course.getLearningMode().name(),
            course.getAuthors().stream()
                .map(author -> author.getFirstName() + " " + author.getLastName())
                .collect(Collectors.toList())
        ));
        
        return course.getCourseId();
    }

    @Transactional
    public void handle(UpdateCourseCommand command) {
        Course existingCourse = courseRepository.findById(command.getCourseId())
                .orElseThrow(() -> new CourseNotFoundException("Course not found with id: " + command.getCourseId()));
        
        Course updatedCourse = courseMapper.toEntity(command);
        updatedCourse.setCourseId(existingCourse.getCourseId());
        courseRepository.save(updatedCourse);
    }

    @Transactional
    public void handle(DeleteCourseCommand command) {
        if (!courseRepository.existsById(command.getCourseId())) {
            throw new CourseNotFoundException("Course not found with id: " + command.getCourseId());
        }
        courseRepository.deleteById(command.getCourseId());
    }

    @Transactional
    public void handle(PublishCourseCommand command) {
        Course course = courseRepository.findById(command.getCourseId())
                .orElseThrow(() -> new CourseNotFoundException("Course not found with id: " + command.getCourseId()));
        course.setInMarketplace(true);
        course = courseRepository.save(course);
        
        // Publish domain event
        eventPublisher.publish(new CoursePublished(
            course.getCourseId(),
            course.getTenantId(),
            course.getTitle(),
            course.getDescription(),
            course.getTopicCode(),
            course.getLevel().name(),
            course.getLearningMode().name(),
            course.getAuthors().stream()
                .map(author -> author.getFirstName() + " " + author.getLastName())
                .collect(Collectors.toList())
        ));
    }
} 