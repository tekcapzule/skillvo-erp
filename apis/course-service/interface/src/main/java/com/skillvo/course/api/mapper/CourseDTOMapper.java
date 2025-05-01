package com.skillvo.course.api.mapper;

import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CourseDTOMapper {
    
    public com.skillvo.course.api.dto.CourseDTO toApiCourseDTO(com.skillvo.course.application.dto.CourseDTO dto) {
        return com.skillvo.course.api.dto.CourseDTO.builder()
                .courseId(dto.getCourseId())
                .tenantId(dto.getTenantId())
                .title(dto.getTitle())
                .description(dto.getDescription())
                .topicCode(dto.getTopicCode())
                .categoryCode(dto.getCategoryCode())
                .language(dto.getLanguage())
                .level(dto.getLevel())
                .pricingModel(dto.getPricingModel())
                .prize(toApiPrizeDTO(dto.getPrize()))
                .learningMode(dto.getLearningMode())
                .points(dto.getPoints())
                .tags(dto.getTags())
                .authors(toApiAuthorDTOList(dto.getAuthors()))
                .publisher(toApiPublisherDTO(dto.getPublisher()))
                .publishedOn(dto.getPublishedOn())
                .imageUrl(dto.getImageUrl())
                .inMarketplace(dto.isInMarketplace())
                .status(dto.getStatus())
                .duration(dto.getDuration())
                .sections(toApiSectionDTOList(dto.getSections()))
                .lessonNavigationMode(dto.getLessonNavigationMode())
                .version(dto.getVersion())
                .build();
    }

    public List<com.skillvo.course.api.dto.CourseDTO> toApiCourseDTOList(List<com.skillvo.course.application.dto.CourseDTO> dtos) {
        return dtos.stream()
                .map(this::toApiCourseDTO)
                .collect(Collectors.toList());
    }

    private com.skillvo.course.api.dto.PrizeDTO toApiPrizeDTO(com.skillvo.course.application.dto.PrizeDTO dto) {
        return com.skillvo.course.api.dto.PrizeDTO.builder()
                .amount(dto.getPrize())
                .currency(dto.getCurrency())
                .build();
    }

    private List<com.skillvo.course.api.dto.AuthorDTO> toApiAuthorDTOList(List<com.skillvo.course.application.dto.AuthorDTO> dtos) {
        return dtos.stream()
                .map(this::toApiAuthorDTO)
                .collect(Collectors.toList());
    }

    private com.skillvo.course.api.dto.AuthorDTO toApiAuthorDTO(com.skillvo.course.application.dto.AuthorDTO dto) {
        return com.skillvo.course.api.dto.AuthorDTO.builder()
                .id(dto.getAuthorId().toString())
                .name(dto.getFirstName() + " " + dto.getLastName())
                .email(dto.getEmailId())
                .build();
    }

    private com.skillvo.course.api.dto.PublisherDTO toApiPublisherDTO(com.skillvo.course.application.dto.PublisherDTO dto) {
        return com.skillvo.course.api.dto.PublisherDTO.builder()
                .id(dto.getPublisherId().toString())
                .name(dto.getName())
                .description(dto.getDescription())
                .website(dto.getWebsite())
                .logoUrl(dto.getLogoUrl())
                .type(dto.getType())
                .build();
    }

    private List<com.skillvo.course.api.dto.SectionDTO> toApiSectionDTOList(List<com.skillvo.course.application.dto.SectionDTO> dtos) {
        return dtos.stream()
                .map(this::toApiSectionDTO)
                .collect(Collectors.toList());
    }

    private com.skillvo.course.api.dto.SectionDTO toApiSectionDTO(com.skillvo.course.application.dto.SectionDTO dto) {
        return com.skillvo.course.api.dto.SectionDTO.builder()
                .sectionId(dto.getSectionId())
                .title(dto.getTitle())
                .description(dto.getDescription())
                .order(dto.getOrder())
                .duration(dto.getDuration())
                .lessons(toApiLessonDTOList(dto.getLessons()))
                .build();
    }

    private com.skillvo.course.api.dto.LessonDTO toApiLessonDTO(com.skillvo.course.application.dto.LessonDTO dto) {
        return com.skillvo.course.api.dto.LessonDTO.builder()
                .id(dto.getLessonId().toString())
                .title(dto.getTitle())
                .description(dto.getDescription())
                .content(dto.getContent())
                .order(dto.getOrder())
                .duration(dto.getDuration())
                .videoUrl(dto.getVideoUrl())
                .thumbnailUrl(dto.getThumbnailUrl())
                .build();
    }

    private List<com.skillvo.course.api.dto.LessonDTO> toApiLessonDTOList(List<com.skillvo.course.application.dto.LessonDTO> dtos) {
        return dtos.stream()
                .map(this::toApiLessonDTO)
                .collect(Collectors.toList());
    }
} 