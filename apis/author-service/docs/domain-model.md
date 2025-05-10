---
owner: SkillVo Team
last_updated: 2023-06-15
---

# Author Service Domain Model

## Domain Overview

The Author Management bounded context is responsible for managing course authors and maintaining their profiles within the SkillVo Learn module. This domain concerns all aspects of author registration, profile management, and course assignment within the platform.

### Business Domain Terminology

- **Author**: An individual who creates or contributes to educational content on the SkillVo platform
- **Tenant**: A separate organizational entity using the SkillVo platform (multi-tenancy support)
- **Course**: Educational content created by authors for learners

## Aggregates

### Author Aggregate

The Author aggregate represents a content creator within the SkillVo platform.

#### Purpose and Invariants

- Maintains the integrity of author information
- Ensures each author has a unique identifier within a tenant
- Tracks the authorship relationship between authors and courses
- Manages author status changes through the author lifecycle

#### Attributes

| Attribute   | Type         | Description                          |
|-------------|--------------|--------------------------------------|
| authorId    | UUID         | Unique identifier for the author     |
| tenantId    | String       | Multi-tenant scope                   |
| email       | String       | Email id                             |
| firstName   | String       | First name                           |
| lastName    | String       | Last name                            |
| courses     | List<Course> | Authored courses                     |
| status      | Status       | Enum: Active, Inactive, Archived     |
| addedBy     | String       | Added system or user id              |
| updatedBy   | String       | Updated system or user id            |
| addedOn     | DateTime     | UTC Datetime                         |
| updatedOn   | DateTime     | UTC Datetime                         |

#### Business Rules and Constraints

1. An author must have a unique email address within a tenant
2. An author can only be in one of three states: Active, Inactive, or Archived
3. Once archived, an author cannot be reactivated
4. Author email address must be valid and verified
5. First name and last name are required fields

#### Lifecycle States

1. **Active**: Author can create and modify courses
2. **Inactive**: Author is suspended and cannot create or modify courses temporarily
3. **Archived**: Author is soft-deleted from the system (historical records maintained)

## Entities

### Course Entity

Represents a course that has been authored by an Author.

#### Purpose and Relationship to Aggregate

- Represents educational content created by an author
- Part of the Author aggregate to track what courses an author has created
- Contains essential information about courses for author profile display

#### Attributes

| Attribute   | Type         | Description                          |
|-------------|--------------|--------------------------------------|
| courseId    | String       | Unique identifier of the course      |
| title       | String       | Course title                         |
| description | String       | Course description                   |
| topicCode   | String       | Topic classification code            |
| level       | Level        | Enum: Beginner, Intermediate, Advanced |
| learningMode| LearningMode | Enum: Online, Offline, Hybrid        |
| status      | Status       | Enum: DRAFT, PUBLISHED, ARCHIVED     |

#### Business Rules

1. A course must have a title and description
2. Each course must have a specified difficulty level
3. Courses can be in different stages of completion (draft, published, archived)

## Value Objects

### Status

Represents the current state of an Author in the system.

#### Purpose and Immutability Guarantee

- Encapsulates the possible states an author can be in
- Immutable after creation to ensure state transitions are handled properly

#### Attributes and Validation Rules

- **Value**: ACTIVE, INACTIVE, ARCHIVED
- Validation ensures only these predefined states are allowed

### Level

Represents the difficulty level of a course.

#### Purpose and Immutability Guarantee

- Defines the skill level required for a course
- Immutable after course creation

#### Attributes and Validation Rules

- **Value**: BEGINNER, INTERMEDIATE, ADVANCED
- Validation ensures only these predefined levels are allowed

### LearningMode

Represents how a course is delivered to learners.

#### Purpose and Immutability Guarantee

- Defines the delivery method of course content
- Immutable after course creation

#### Attributes and Validation Rules

- **Value**: ONLINE, OFFLINE, HYBRID
- Validation ensures only these predefined modes are allowed

## Domain Events

### AuthorCreated

Triggered when a new author profile is created in the system.

#### Event Payload

| Field      | Type    | Description                    |
|------------|---------|--------------------------------|
| authorId   | UUID    | The ID of the created author   |
| tenantId   | String  | The tenant ID                  |
| emailId    | String  | The author's email address     |

#### When Published

This event is published when:
- A new author is successfully registered
- The author's profile details are validated and stored 