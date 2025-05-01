package com.skillvo.course.api.mapper;

import com.skillvo.course.api.dto.request.CreateCourseRequest;
import com.skillvo.course.api.dto.request.UpdateCourseRequest;
import com.skillvo.course.api.dto.request.PublishCourseRequest;
import com.skillvo.course.api.dto.request.CourseFilterRequest;
import com.skillvo.course.application.command.CreateCourseCommand;
import com.skillvo.course.application.command.UpdateCourseCommand;
import com.skillvo.course.application.command.PublishCourseCommand;
import com.skillvo.course.application.query.ListCoursesQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CourseRequestMapper {
    private final PrizeRequestMapper prizeRequestMapper;
    private final AuthorRequestMapper authorRequestMapper;
    private final PublisherRequestMapper publisherRequestMapper;
    private final SectionRequestMapper sectionRequestMapper;
    
    public CreateCourseCommand toCommand(CreateCourseRequest request) {
        return CreateCourseCommand.builder()
                .tenantId(request.getTenantId())
                .title(request.getTitle())
                .description(request.getDescription())
                .topicCode(request.getTopicCode())
                .categoryCode(request.getCategoryCode())
                .language(request.getLanguage())
                .level(request.getLevel())
                .pricingModel(request.getPricingModel())
                .prize(request.getPrize() != null ? prizeRequestMapper.toApplicationDTO(request.getPrize()) : null)
                .learningMode(request.getLearningMode())
                .points(request.getPoints())
                .tags(request.getTags())
                .authors(request.getAuthors() != null ? authorRequestMapper.toApplicationDTOList(request.getAuthors()) : null)
                .publisher(request.getPublisher() != null ? publisherRequestMapper.toApplicationDTO(request.getPublisher()) : null)
                .imageUrl(request.getImageUrl())
                .inMarketplace(request.isInMarketplace())
                .status(request.getStatus())
                .duration(request.getDuration())
                .sections(request.getSections() != null ? sectionRequestMapper.toApplicationDTOList(request.getSections()) : null)
                .lessonNavigationMode(request.getLessonNavigationMode())
                .build();
    }

    public UpdateCourseCommand toCommand(UpdateCourseRequest request) {
        return UpdateCourseCommand.builder()
                .courseId(request.getCourseId())
                .tenantId(request.getTenantId())
                .title(request.getTitle())
                .description(request.getDescription())
                .topicCode(request.getTopicCode())
                .categoryCode(request.getCategoryCode())
                .language(request.getLanguage())
                .level(request.getLevel())
                .pricingModel(request.getPricingModel())
                .prize(request.getPrize() != null ? prizeRequestMapper.toApplicationDTO(request.getPrize()) : null)
                .learningMode(request.getLearningMode())
                .points(request.getPoints())
                .tags(request.getTags())
                .authors(request.getAuthors() != null ? authorRequestMapper.toApplicationDTOList(request.getAuthors()) : null)
                .publisher(request.getPublisher() != null ? publisherRequestMapper.toApplicationDTO(request.getPublisher()) : null)
                .imageUrl(request.getImageUrl())
                .inMarketplace(request.isInMarketplace())
                .status(request.getStatus())
                .duration(request.getDuration())
                .sections(request.getSections() != null ? sectionRequestMapper.toApplicationDTOList(request.getSections()) : null)
                .lessonNavigationMode(request.getLessonNavigationMode())
                .build();
    }

    public PublishCourseCommand toCommand(PublishCourseRequest request) {
        return PublishCourseCommand.builder()
                .courseId(request.getCourseId())
                .tenantId(request.getTenantId())
                .build();
    }

    public ListCoursesQuery toQuery(CourseFilterRequest request) {
        return ListCoursesQuery.builder()
                .tenantId(request.getTenantId())
                .inMarketplace(request.isInMarketplace())
                .build();
    }
} 