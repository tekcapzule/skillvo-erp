package com.skillvo.course.domain.model.entities;

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
public class Author extends BaseEntity {
    private UUID authorId;
    private String firstName;
    private String lastName;
    private String emailId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Author author = (Author) o;
        return Objects.equals(authorId, author.authorId) &&
                Objects.equals(firstName, author.firstName) &&
                Objects.equals(lastName, author.lastName) &&
                Objects.equals(emailId, author.emailId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(authorId, firstName, lastName, emailId);
    }
} 