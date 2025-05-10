# Author Service - Domain Model

**Owner**: SkillVo Platform Team  
**Last Updated**: 2023-08-01

## Domain Overview

The Author Management bounded context is responsible for managing course authors, tracking their contributions, and maintaining their profiles, performance, and recognitions within the SkillVo Learn module. This domain focuses on the author's lifecycle, their expertise, and their contributions to the learning platform.

### Business Domain Terminology

- **Author**: A content creator who develops courses in the SkillVo platform
- **Contribution**: A record linking an author to a course with a specific role (Primary Author, Co-Author, Reviewer)
- **Badge**: A recognition awarded to authors based on performance or achievement
- **Expertise**: Subject matter areas in which an author is proficient

## Aggregates

### AuthorProfile Aggregate

The AuthorProfile aggregate represents the core entity in the Author Management bounded context. It encapsulates the author's identity, status, and professional information.

#### Purpose and Invariants

- Maintain the complete author profile information
- Ensure each author has a unique identifier within a tenant
- Track author status for platform access control
- Preserve the history of author profile changes

#### Attributes

| Attribute  | Type         | Description                        |
|------------|--------------|----------------------------------- |
| authorId   | UUID         | Unique identifier for the author   |
| tenantId   | String       | Multi-tenant scope                 |
| email      | String       | Email id                           |
| firstName  | String       | First name                         |
| lastName   | String       | Last name                          |
| courses    | List<Course> | Authored courses                   |
| status     | Status       | Enum: Active, Inactive             |
| addedBy    | String       | Added system or user id            |
| updatedBy  | String       | Updated system or user id          |
| addedOn    | DateTime     | UTC Datetime                       |
| updatedOn  | DateTime     | UTC Datetime                       |

#### Business Rules and Constraints

1. An author must belong to exactly one tenant
2. Author email must be unique within a tenant
3. Author status must be either ACTIVE or INACTIVE
4. Author profile creation must capture creation metadata (who and when)
5. Any updates to the profile must capture modification metadata

#### Lifecycle States

1. **Creation**: Author profile is created with minimal required information
2. **Active**: Author can create and manage courses
3. **Inactive**: Author is deactivated and cannot create new courses

## Entities

### Contribution Entity

The Contribution entity represents the relationship between an author and a course.

#### Purpose and Relationship to Aggregate

- Tracks the author's role and involvement with specific courses
- Belongs to the AuthorProfile aggregate
- Captures the nature of the author's contribution to each course

#### Attributes

| Attribute       | Type     | Description                                           |
|-----------------|----------|-------------------------------------------------------|
| authorId        | UUID     | Reference to the author                               |
| courseId        | String   | Reference to the course                               |
| contributionType| String   | Enum: PRIMARY_AUTHOR, CO_AUTHOR, REVIEWER             |
| addedOn         | DateTime | When the contribution was recorded                    |
| status          | String   | Enum: ACTIVE, INACTIVE                                |

#### Business Rules

1. An author can have multiple contributions to different courses
2. An author can have only one type of contribution to a single course
3. Contribution types determine the author's permissions and recognition for the course

### Badge Entity

The Badge entity represents achievements and recognitions awarded to authors.

#### Purpose and Relationship to Aggregate

- Recognizes author achievements and expertise
- Belongs to the AuthorProfile aggregate
- Enhances author credibility and visibility in the platform

#### Attributes

| Attribute  | Type     | Description                           |
|------------|----------|---------------------------------------|
| authorId   | UUID     | Reference to the author               |
| badgeName  | String   | Name of the badge or title            |
| awardedOn  | DateTime | When the badge was awarded            |
| awardedBy  | String   | System or user who awarded the badge  |

#### Business Rules

1. Badges are permanent once awarded
2. Multiple badges can be awarded to a single author
3. Certain badges may grant special privileges in the platform

## Value Objects

### Course Value Object

The Course value object represents the essential information about a course that an author has contributed to.

#### Purpose and Immutability Guarantee

- Provides read-only access to course details relevant to authors
- Immutable representation of course information
- Reference to the full course details in the Course bounded context

#### Attributes and Validation Rules

| Attribute     | Type     | Description                 | Validation Rules                       |
|---------------|----------|-----------------------------|----------------------------------------|
| courseId      | String   | Unique identifier           | Non-empty string                       |
| title         | String   | Course title                | Non-empty string                       |
| description   | String   | Brief course description    | Optional                               |
| topic         | Topic    | Course's main subject area  | Must be a valid Topic enumeration      |
| level         | Level    | Course difficulty level     | Must be a valid Level enumeration      |
| learningMode  | LearningMode | Mode of learning        | Must be a valid LearningMode enumeration|
| status        | Status   | Course publication status   | Must be a valid Status enumeration     |

### Topic Value Object

Represents a subject area category.

#### Attributes and Validation Rules

| Attribute   | Type   | Description          | Validation Rules                  |
|-------------|--------|----------------------|-----------------------------------|
| topicId     | String | Topic identifier     | Non-empty string                  |
| name        | String | Topic name           | Non-empty string                  |
| description | String | Topic description    | Optional                          |

### Level Enumeration

Represents the difficulty level of a course.

- BEGINNER
- INTERMEDIATE
- ADVANCED
- EXPERT

### LearningMode Enumeration

Represents the delivery format of a course.

- SELF_PACED
- INSTRUCTOR_LED
- BLENDED
- WORKSHOP

### Status Enumeration

Represents the status of entities in the system.

- ACTIVE
- INACTIVE
- DRAFT
- PUBLISHED
- ARCHIVED

## Domain Events

### AuthorRegistered

Triggered when a new author is registered in the system.

#### Payload

| Field      | Type     | Description                            |
|------------|----------|----------------------------------------|
| authorId   | UUID     | Unique identifier for the author       |
| tenantId   | String   | Tenant identifier                      |
| createdAt  | DateTime | Timestamp of author registration       |

### CoursePublishedByAuthor

Triggered when an author publishes a new course.

#### Payload

| Field      | Type     | Description                            |
|------------|----------|----------------------------------------|
| courseId   | String   | Unique identifier for the course       |
| authorId   | UUID     | Author who published the course        |
| tenantId   | String   | Tenant identifier                      |
| publishedAt| DateTime | Timestamp of course publication        |

### AuthorPerformanceUpdated

Triggered when an author's performance metrics are updated.

#### Payload

| Field        | Type     | Description                            |
|--------------|----------|----------------------------------------|
| authorId     | UUID     | Unique identifier for the author       |
| tenantId     | String   | Tenant identifier                      |
| rating       | Decimal  | Current average rating of author's courses |
| totalCourses | Integer  | Total number of published courses      |
| updatedAt    | DateTime | Timestamp of the update                |

### BadgeAwarded

Triggered when a badge is awarded to an author.

#### Payload

| Field      | Type     | Description                            |
|------------|----------|----------------------------------------|
| authorId   | UUID     | Unique identifier for the author       |
| tenantId   | String   | Tenant identifier                      |
| badgeName  | String   | Name of the badge awarded              |
| awardedAt  | DateTime | Timestamp when badge was awarded       | 