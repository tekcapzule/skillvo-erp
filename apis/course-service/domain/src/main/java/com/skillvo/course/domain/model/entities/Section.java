package com.skillvo.course.domain.model.entities;

import lombok.Getter;
import lombok.Setter;
import java.util.List;
import java.util.UUID;
import java.util.Objects;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Section extends BaseEntity {
    private UUID sectionId;
    private String title;
    private String description;
    private Integer order;
    private List<Lesson> lessons;
    private Integer duration;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Section section = (Section) o;
        return order == section.order &&
                duration == section.duration &&
                Objects.equals(sectionId, section.sectionId) &&
                Objects.equals(title, section.title) &&
                Objects.equals(description, section.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(sectionId, title, description, order, duration);
    }
} 