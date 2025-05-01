package com.skillvo.course.application.mapper;

import com.skillvo.course.application.command.CreateCourseCommand;
import com.skillvo.course.application.command.UpdateCourseCommand;
import com.skillvo.course.application.dto.AuthorDTO;
import com.skillvo.course.application.dto.CourseDTO;
import com.skillvo.course.application.dto.PrizeDTO;
import com.skillvo.course.application.dto.PublisherDTO;
import com.skillvo.course.application.dto.SectionDTO;
import com.skillvo.course.application.dto.LessonDTO;
import com.skillvo.course.domain.model.aggregates.Course;
import com.skillvo.course.domain.model.entities.Author;
import com.skillvo.course.domain.model.entities.Publisher;
import com.skillvo.course.domain.model.entities.Section;
import com.skillvo.course.domain.model.entities.Lesson;
import com.skillvo.course.domain.model.valueobjects.Prize;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class CourseMapper {
    public Course toEntity(CreateCourseCommand command) {
        return Course.builder()
                .courseId(UUID.randomUUID())
                .tenantId(command.getTenantId())
                .title(command.getTitle())
                .description(command.getDescription())
                .topicCode(command.getTopicCode())
                .categoryCode(command.getCategoryCode())
                .language(command.getLanguage())
                .level(command.getLevel())
                .pricingModel(command.getPricingModel())
                .prize(toPrize(command.getPrize()))
                .learningMode(command.getLearningMode())
                .points(command.getPoints())
                .tags(command.getTags())
                .authors(toAuthors(command.getAuthors()))
                .publisher(toPublisher(command.getPublisher()))
                .imageUrl(command.getImageUrl())
                .inMarketplace(command.isInMarketplace())
                .status(command.getStatus())
                .duration(command.getDuration())
                .sections(toSections(command.getSections()))
                .lessonNavigationMode(command.getLessonNavigationMode())
                .build();
    }

    public Course toEntity(UpdateCourseCommand command) {
        return Course.builder()
                .courseId(command.getCourseId())
                .tenantId(command.getTenantId())
                .title(command.getTitle())
                .description(command.getDescription())
                .topicCode(command.getTopicCode())
                .categoryCode(command.getCategoryCode())
                .language(command.getLanguage())
                .level(command.getLevel())
                .pricingModel(command.getPricingModel())
                .prize(toPrize(command.getPrize()))
                .learningMode(command.getLearningMode())
                .points(command.getPoints())
                .tags(command.getTags())
                .authors(toAuthors(command.getAuthors()))
                .publisher(toPublisher(command.getPublisher()))
                .imageUrl(command.getImageUrl())
                .inMarketplace(command.isInMarketplace())
                .status(command.getStatus())
                .duration(command.getDuration())
                .sections(toSections(command.getSections()))
                .lessonNavigationMode(command.getLessonNavigationMode())
                .build();
    }

    public CourseDTO toDTO(Course course) {
        if (course == null) {
            return null;
        }

        return CourseDTO.builder()
                .courseId(course.getCourseId())
                .title(course.getTitle())
                .description(course.getDescription())
                .language(course.getLanguage())
                .level(course.getLevel())
                .pricingModel(course.getPricingModel())
                .learningMode(course.getLearningMode())
                .duration(course.getDuration())
                .status(course.getStatus())
                .authors(course.getAuthors().stream()
                        .map(author -> AuthorDTO.builder()
                                .authorId(author.getAuthorId())
                                .firstName(author.getFirstName())
                                .lastName(author.getLastName())
                                .emailId(author.getEmailId())
                                .build())
                        .collect(Collectors.toList()))
                .sections(course.getSections().stream()
                        .map(section -> SectionDTO.builder()
                                .sectionId(section.getSectionId())
                                .title(section.getTitle())
                                .description(section.getDescription())
                                .order(section.getOrder())
                                .duration(section.getDuration())
                                .lessons(section.getLessons().stream()
                                        .map(lesson -> LessonDTO.builder()
                                                .lessonId(lesson.getLessonId())
                                                .title(lesson.getTitle())
                                                .duration(lesson.getDuration().intValue())
                                                .build())
                                        .collect(Collectors.toList()))
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }

    private PrizeDTO toPrizeDTO(Prize prize) {
        return PrizeDTO.builder()
                .prize(prize.getPrize())
                .discount(prize.getDiscount())
                .currency(prize.getCurrency())
                .build();
    }

    private Prize toPrize(PrizeDTO dto) {
        return Prize.builder()
                .prize(dto.getPrize())
                .discount(dto.getDiscount())
                .currency(dto.getCurrency())
                .build();
    }

    private List<AuthorDTO> toAuthorDTOs(List<Author> authors) {
        return authors.stream()
                .map(this::toAuthorDTO)
                .collect(Collectors.toList());
    }

    private AuthorDTO toAuthorDTO(Author author) {
        return AuthorDTO.builder()
                .authorId(author.getAuthorId())
                .firstName(author.getFirstName())
                .lastName(author.getLastName())
                .emailId(author.getEmailId())
                .build();
    }

    private List<Author> toAuthors(List<AuthorDTO> dtos) {
        return dtos.stream()
                .map(this::toAuthor)
                .collect(Collectors.toList());
    }

    private Author toAuthor(AuthorDTO dto) {
        return Author.builder()
                .authorId(dto.getAuthorId())
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .emailId(dto.getEmailId())
                .build();
    }

    private PublisherDTO toPublisherDTO(Publisher publisher) {
        return PublisherDTO.builder()
                .publisherId(publisher.getPublisherId())
                .name(publisher.getName())
                .type(publisher.getType())
                .logoUrl(publisher.getLogoUrl())
                .website(publisher.getWebsite())
                .contactEmail(publisher.getContactEmail())
                .description(publisher.getDescription())
                .country(publisher.getCountry())
                .build();
    }

    private Publisher toPublisher(PublisherDTO dto) {
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

    private List<SectionDTO> toSectionDTOs(List<Section> sections) {
        return sections.stream()
                .map(this::toSectionDTO)
                .collect(Collectors.toList());
    }

    private SectionDTO toSectionDTO(Section section) {
        return SectionDTO.builder()
                .sectionId(section.getSectionId())
                .title(section.getTitle())
                .description(section.getDescription())
                .order(section.getOrder())
                .duration(section.getDuration())
                .lessons(section.getLessons().stream()
                        .map(lesson -> LessonDTO.builder()
                                .lessonId(lesson.getLessonId())
                                .title(lesson.getTitle())
                                .duration(lesson.getDuration().intValue())
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }

    private List<Section> toSections(List<SectionDTO> dtos) {
        return dtos.stream()
                .map(this::toSection)
                .collect(Collectors.toList());
    }

    private Section toSection(SectionDTO dto) {
        return Section.builder()
                .sectionId(dto.getSectionId())
                .title(dto.getTitle())
                .description(dto.getDescription())
                .order(dto.getOrder())
                .duration(dto.getDuration())
                .lessons(dto.getLessons().stream()
                        .map(lesson -> {
                            Lesson l = new Lesson();
                            l.setLessonId(lesson.getLessonId());
                            l.setTitle(lesson.getTitle());
                            l.setDuration(lesson.getDuration().floatValue());
                            return l;
                        })
                        .collect(Collectors.toList()))
                .build();
    }

    public Course toDomain(CourseDTO dto) {
        if (dto == null) {
            return null;
        }

        Course course = new Course();
        course.setCourseId(dto.getCourseId());
        course.setTitle(dto.getTitle());
        course.setDescription(dto.getDescription());
        course.setLanguage(dto.getLanguage());
        course.setLevel(dto.getLevel());
        course.setPricingModel(dto.getPricingModel());
        course.setLearningMode(dto.getLearningMode());
        course.setDuration(dto.getDuration());
        course.setStatus(dto.getStatus());
        course.setAuthors(dto.getAuthors().stream()
                .map(author -> Author.builder()
                        .authorId(author.getAuthorId())
                        .firstName(author.getFirstName())
                        .lastName(author.getLastName())
                        .emailId(author.getEmailId())
                        .build())
                .collect(Collectors.toList()));
        course.setSections(dto.getSections().stream()
                .map(section -> Section.builder()
                        .sectionId(section.getSectionId())
                        .title(section.getTitle())
                        .description(section.getDescription())
                        .order(section.getOrder())
                        .duration(section.getDuration())
                        .lessons(section.getLessons().stream()
                                .map(lesson -> {
                                    Lesson l = new Lesson();
                                    l.setLessonId(lesson.getLessonId());
                                    l.setTitle(lesson.getTitle());
                                    l.setDuration(lesson.getDuration().floatValue());
                                    return l;
                                })
                                .collect(Collectors.toList()))
                        .build())
                .collect(Collectors.toList()));
        return course;
    }

    public List<CourseDTO> toDTOList(List<Course> courses) {
        if (courses == null) {
            return null;
        }

        return courses.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
} 