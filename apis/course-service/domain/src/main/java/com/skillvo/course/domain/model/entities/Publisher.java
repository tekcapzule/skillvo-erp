package com.skillvo.course.domain.model.entities;

import com.skillvo.course.domain.model.enums.PublisherType;
import lombok.Getter;
import lombok.Setter;
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
public class Publisher extends BaseEntity {
    private UUID publisherId;
    private String name;
    private PublisherType type;
    private String logoUrl;
    private String website;
    private String contactEmail;
    private String description;
    private String country;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Publisher publisher = (Publisher) o;
        return Objects.equals(publisherId, publisher.publisherId) &&
                Objects.equals(name, publisher.name) &&
                type == publisher.type &&
                Objects.equals(logoUrl, publisher.logoUrl) &&
                Objects.equals(website, publisher.website) &&
                Objects.equals(contactEmail, publisher.contactEmail) &&
                Objects.equals(description, publisher.description) &&
                Objects.equals(country, publisher.country);
    }

    @Override
    public int hashCode() {
        return Objects.hash(publisherId, name, type, logoUrl, website, contactEmail, description, country);
    }
} 