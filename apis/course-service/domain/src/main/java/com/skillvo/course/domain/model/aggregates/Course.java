package com.skillvo.course.domain.model.aggregates;

import com.skillvo.course.domain.model.entities.*;
import com.skillvo.course.domain.model.enums.*;
import com.skillvo.course.domain.model.valueobjects.Prize;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.Objects;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Course extends BaseEntity {
    private UUID courseId;
    private String tenantId;
    private String title;
    private String description;
    private String topicCode;
    private String categoryCode;
    private List<Language> language;
    private Level level;
    private PricingModel pricingModel;
    private Prize prize;
    private LearningMode learningMode;
    private Integer points;
    private List<String> tags;
    private List<Author> authors;
    private Publisher publisher;
    private LocalDateTime publishedOn;
    private String imageUrl;
    private boolean inMarketplace;
    private Status status;
    private Integer duration;
    private List<Section> sections;
    private LessonNavigationMode lessonNavigationMode;
    private Integer version;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Course course = (Course) o;
        return Objects.equals(courseId, course.courseId) &&
                Objects.equals(tenantId, course.tenantId) &&
                Objects.equals(title, course.title) &&
                Objects.equals(description, course.description) &&
                Objects.equals(topicCode, course.topicCode) &&
                Objects.equals(categoryCode, course.categoryCode) &&
                Objects.equals(language, course.language) &&
                level == course.level &&
                pricingModel == course.pricingModel &&
                Objects.equals(prize, course.prize) &&
                learningMode == course.learningMode &&
                Objects.equals(points, course.points) &&
                Objects.equals(tags, course.tags) &&
                Objects.equals(authors, course.authors) &&
                Objects.equals(publisher, course.publisher) &&
                Objects.equals(publishedOn, course.publishedOn) &&
                Objects.equals(imageUrl, course.imageUrl) &&
                inMarketplace == course.inMarketplace &&
                status == course.status &&
                Objects.equals(duration, course.duration) &&
                Objects.equals(sections, course.sections) &&
                lessonNavigationMode == course.lessonNavigationMode &&
                Objects.equals(version, course.version);
    }

    @Override
    public int hashCode() {
        return Objects.hash(courseId, tenantId, title, description, topicCode, categoryCode,
                language, level, pricingModel, prize, learningMode, points, tags, authors,
                publisher, publishedOn, imageUrl, inMarketplace, status, duration,
                sections, lessonNavigationMode, version);
    }
} 