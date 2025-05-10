---
owner: SkillVo Team
last_updated: 2023-06-15
---

# Author Service Design

## Service Overview

The Author Service is responsible for managing course authors within the SkillVo Learn module. It handles the registration, profile management, and lifecycle of authors in the platform. The service ensures proper author identity management, associations with their courses, and author-specific status controls.

## Domain Services

### AuthorService

The core domain service responsible for managing author profiles and their lifecycle.

#### Purpose and Responsibilities

- Author profile creation and registration
- Author profile updates and maintenance
- Author status management (activation, suspension, archival)
- Retrieving author information

#### Methods and Behavior

| Method   | Description                          | Behavior |
|----------|--------------------------------------|----------|
| create   | Registers a new author               | Validates author information, creates a new author record, and publishes AuthorCreated event |
| update   | Updates author's details             | Updates the author's profile information while maintaining data integrity |
| get      | Get the author profile               | Retrieves an author's complete profile including associated courses |
| activate | Reactivate a blocked/suspended user  | Changes an Inactive author status to Active, allowing them to resume activities |
| suspend  | Temporarily suspend the author       | Changes an Active author status to Inactive, preventing activity while maintaining their data |
| delete   | Soft delete (Archive) author profile | Changes author status to Archived (soft delete) to maintain historical data |

## Repository Design

### AuthorRepository

Interface responsible for the persistence operations related to Author entities.

#### Interface Definition

```java
public interface AuthorRepository {
    Author save(Author author);
    Optional<Author> getById(String tenantId, String authorId);
    List<Author> findByTenantId(String tenantId);
    boolean existsByTenantIdAndEmail(String tenantId, String email);
}
```

#### Methods and Queries

| Method                      | Description                                              |
|-----------------------------|----------------------------------------------------------|
| save()                      | Persists a new author or updates an existing one         |
| getById()                   | Retrieves an author by their ID within a specific tenant |
| findByTenantId()            | Finds all authors belonging to a specific tenant         |
| existsByTenantIdAndEmail()  | Checks if an author with a specific email already exists |

## Database Design

### DynamoDB Design

The Author Service uses Amazon DynamoDB for data persistence, providing high performance and scalability.

#### Table Structure

- **Table Name**: `AuthorTable`
- **Partition Key (PK)**: `TENANT#<tenantId>#AUTHOR#<authorId>`
- **Sort Key (SK)**: `<status>`


#### Example Item Structure

```json
{
  "PK": "TENANT#123#AUTHOR#auth-001",
  "SK": "ACTIVE",
  "authorId": "auth-001",
  "tenantId": "123",
  "email": "jane.doe@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "status": "ACTIVE",
  "courses": [
    {
      "courseId": "course-001",
      "title": "Introduction to Machine Learning",
      "description": "A beginner's guide to ML concepts",
      "topicCode": "ML-101",
      "level": "BEGINNER",
      "learningMode": "ONLINE",
      "status": "PUBLISHED"
    }
  ],
  "addedBy": "system",
  "updatedBy": "user-123",
  "addedOn": "2023-06-15T10:30:00Z",
  "updatedOn": "2023-06-15T11:45:00Z"
}
```

## Application Services / Lambda Functions

The Author Service is implemented as a set of AWS Lambda functions that handle different aspects of author management.

| Lambda Function | Description                              | Input                                   | Output                                |
|-----------------|------------------------------------------|----------------------------------------|---------------------------------------|
| create          | Creates a new author profile             | tenantId, email, firstName, lastName   | authorId and creation status          |
| update          | Updates author name, bio, expertise      | tenantId, authorId, updated fields     | Updated author profile                |
| activate        | Reactivate a blocked/suspended user      | tenantId, authorId                     | Activation status                     |
| get             | Retrieves author profile by ID           | tenantId, authorId                     | Complete author profile with courses  |
| suspend         | Temporarily suspend the author           | tenantId, authorId                     | Suspension status                     |
| delete          | Soft delete (Archive) author profile     | tenantId, authorId                     | Deletion status                       | 