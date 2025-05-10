# Author Service - Service Design

**Owner**: SkillVo Platform Team  
**Last Updated**: 2023-08-01

## Service Overview

The Author Service is responsible for managing the complete lifecycle of course authors within the SkillVo Learn module. It handles author registration, profile management, contribution tracking, and recognition through badges and performance metrics. This service operates as a dedicated microservice within the SkillVo platform, following Domain-Driven Design principles.

## Domain Services

### AuthorService

Manages the core operations related to author profiles and their lifecycle.

#### Purpose and Responsibilities

- Author registration and profile management
- Author status control (activation/deactivation)
- Author profile data validation and enrichment

#### Methods and Behavior

| Method            | Description                                   | Parameters                                                    | Return Value           |
|-------------------|-----------------------------------------------|---------------------------------------------------------------|------------------------|
| registerAuthor    | Registers a new author profile                | tenantId, userId, name, bio, expertise                        | AuthorProfile          |
| updateProfile     | Updates author's profile details              | authorId, tenantId, [name, bio, expertise]                    | AuthorProfile          |
| deactivateAuthor  | Deactivates an author                         | authorId, tenantId, reason                                    | AuthorProfile          |
| getAuthorById     | Retrieves author by ID                        | authorId, tenantId                                            | AuthorProfile          |
| listAuthors       | Lists authors with filters                    | tenantId, [status, expertise, limit, nextToken]               | List<AuthorProfile>    |

### ContributionService

Manages author contributions to courses and their performance metrics.

#### Purpose and Responsibilities

- Track and manage author contributions to courses
- Update author performance metrics based on course ratings
- Award badges and recognitions to authors

#### Methods and Behavior

| Method             | Description                                        | Parameters                                               | Return Value           |
|--------------------|----------------------------------------------------|----------------------------------------------------------|------------------------|
| recordContribution | Records author's course contribution               | authorId, tenantId, courseId, contributionType           | Contribution           |
| updateCourseStats  | Updates course rating and metrics                  | courseId, tenantId, [rating, completions, enrollments]   | Course                 |
| awardBadge         | Awards badge or title to an author                 | authorId, tenantId, badge                                | Badge                  |
| getContributions   | Gets contributions for an author                   | authorId, tenantId, [contributionType, limit, nextToken] | List<Contribution>     |

## Repository Design

### AuthorRepository

Interface for managing author profile persistence.

#### Interface Definition

```java
public interface AuthorRepository {
    AuthorProfile save(AuthorProfile author);
    Optional<AuthorProfile> getById(UUID authorId, String tenantId);
    List<AuthorProfile> listByStatus(String tenantId, Status status, int limit, String nextToken);
    List<AuthorProfile> listByExpertise(String tenantId, String expertise, int limit, String nextToken);
    void delete(UUID authorId, String tenantId);
}
```

#### Methods and Queries

| Method             | Description                                          | Query Pattern                                                |
|--------------------|------------------------------------------------------|-------------------------------------------------------------|
| save               | Persists author profile                              | PutItem with PK: TENANT#{tenantId}#AUTHOR#{authorId}, SK: PROFILE |
| getById            | Retrieves author by ID                               | GetItem with PK: TENANT#{tenantId}#AUTHOR#{authorId}, SK: PROFILE |
| listByStatus       | Lists authors by status                              | Query on PK begins_with "TENANT#{tenantId}#AUTHOR#" with filter on status |
| listByExpertise    | Lists authors by expertise                           | Query on GSI with expertise as key                           |
| delete             | Soft deletes an author by changing status            | UpdateItem to change status to INACTIVE                      |

### ContributionRepository

Interface for managing author contributions to courses.

#### Interface Definition

```java
public interface ContributionRepository {
    Contribution save(Contribution contribution);
    Optional<Contribution> getByCourseId(String courseId, UUID authorId, String tenantId);
    List<Contribution> listByAuthorId(UUID authorId, String tenantId, String contributionType, int limit, String nextToken);
    void delete(String courseId, UUID authorId, String tenantId);
}
```

#### Methods and Queries

| Method             | Description                                          | Query Pattern                                                |
|--------------------|------------------------------------------------------|-------------------------------------------------------------|
| save               | Persists contribution                                | PutItem with PK: TENANT#{tenantId}#AUTHOR#{authorId}, SK: CONTRIBUTION#{courseId} |
| getByCourseId      | Retrieves contribution for a course                  | GetItem with PK: TENANT#{tenantId}#AUTHOR#{authorId}, SK: CONTRIBUTION#{courseId} |
| listByAuthorId     | Lists all contributions by an author                 | Query on PK: TENANT#{tenantId}#AUTHOR#{authorId}, SK begins_with "CONTRIBUTION#" |
| delete             | Removes a contribution record                        | DeleteItem or UpdateItem to change status to INACTIVE        |

### BadgeRepository

Interface for managing author badges and recognitions.

#### Interface Definition

```java
public interface BadgeRepository {
    Badge save(Badge badge);
    List<Badge> listByAuthorId(UUID authorId, String tenantId);
}
```

#### Methods and Queries

| Method             | Description                                          | Query Pattern                                                |
|--------------------|------------------------------------------------------|-------------------------------------------------------------|
| save               | Persists badge                                       | PutItem with PK: TENANT#{tenantId}#AUTHOR#{authorId}, SK: BADGE#{badgeName} |
| listByAuthorId     | Lists all badges for an author                       | Query on PK: TENANT#{tenantId}#AUTHOR#{authorId}, SK begins_with "BADGE#" |

## Database Design

### DynamoDB Table: AuthorTable

Primary table for storing all author-related data using a single-table design.

#### Key Structure

- **Partition Key (PK)**: `TENANT#{tenantId}#AUTHOR#{authorId}`
- **Sort Key (SK)**: 
  - `PROFILE` → for AuthorProfile
  - `CONTRIBUTION#{courseId}` → for AuthorContribution
  - `BADGE#{badgeName}` → for Author Badges

#### Global Secondary Indexes (GSIs)

##### GSI_AuthorCourses

- **Partition Key**: `authorId`
- **Sort Key**: `courseId`
- **Purpose**: Used to fetch all courses associated with an author

##### GSI_TenantAuthors

- **Partition Key**: `tenantId`
- **Sort Key**: `status`
- **Purpose**: Used to list authors by tenant and status

#### Item Types and Attributes

**AuthorProfile Item**

```json
{
  "PK": "TENANT#123#AUTHOR#auth-001",
  "SK": "PROFILE",
  "authorId": "auth-001",
  "tenantId": "123",
  "email": "jane.doe@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "expertise": ["Machine Learning", "Deep Learning"],
  "status": "ACTIVE",
  "addedBy": "system",
  "updatedBy": "system",
  "addedOn": "2023-08-01T12:00:00Z",
  "updatedOn": "2023-08-01T12:00:00Z"
}
```

**Contribution Item**

```json
{
  "PK": "TENANT#123#AUTHOR#auth-001",
  "SK": "CONTRIBUTION#course-xyz",
  "authorId": "auth-001",
  "tenantId": "123",
  "courseId": "course-xyz",
  "contributionType": "PRIMARY_AUTHOR",
  "addedOn": "2023-08-01T15:00:00Z",
  "status": "ACTIVE"
}
```

**Badge Item**

```json
{
  "PK": "TENANT#123#AUTHOR#auth-001",
  "SK": "BADGE#TopContributor",
  "authorId": "auth-001",
  "tenantId": "123",
  "badgeName": "Top Contributor",
  "awardedOn": "2023-08-01T16:45:00Z",
  "awardedBy": "system"
}
```

#### Data Access Patterns

| Access Pattern                 | Implementation                                                            |
|--------------------------------|--------------------------------------------------------------------------|
| Get author profile             | GetItem on PK/SK = TENANT#{tenantId}#AUTHOR#{authorId}/PROFILE           |
| List author's contributions    | Query on PK = TENANT#{tenantId}#AUTHOR#{authorId}, SK begins_with "CONTRIBUTION#" |
| List author's badges           | Query on PK = TENANT#{tenantId}#AUTHOR#{authorId}, SK begins_with "BADGE#" |
| Find authors by tenant         | Query on GSI_TenantAuthors with tenantId                                 |
| Find courses by author         | Query on GSI_AuthorCourses with authorId                                 |

## Application Services / Lambda Functions

The Author Service is implemented as a set of AWS Lambda functions, each responsible for a specific operation:

| Lambda Function    | Description                                         | Triggered By              |
|--------------------|-----------------------------------------------------|---------------------------|
| registerAuthor     | Creates a new author profile                        | API Gateway - POST        |
| updateProfile      | Updates author name, bio, expertise                 | API Gateway - PUT         |
| recordContribution | Links an author to a course                         | API Gateway - POST        |
| getProfile         | Retrieves author profile by ID                      | API Gateway - GET         |
| listAuthors        | Lists authors with optional filters                 | API Gateway - GET         |
| listContributions  | Lists courses authored by a user                    | API Gateway - GET         |
| awardBadge         | Assigns badge or title to an author                 | API Gateway - POST        |
| deactivateAuthor   | Deactivates an author                               | API Gateway - PUT         |

### Application Layer Implementation

Each Lambda function follows this general structure:

1. **Controller Layer**: Handles HTTP request/response, validation, and error handling
2. **Service Layer**: Implements business logic using the domain services
3. **Repository Layer**: Handles data persistence using the repositories
4. **Event Publishing**: Publishes domain events to EventBridge

### Example Lambda Implementation (pseudocode)

```java
public class RegisterAuthorLambda implements RequestHandler<APIGatewayProxyRequest, APIGatewayProxyResponse> {
    
    private final AuthorService authorService;
    private final EventPublisher eventPublisher;
    
    @Inject
    public RegisterAuthorLambda(AuthorService authorService, EventPublisher eventPublisher) {
        this.authorService = authorService;
        this.eventPublisher = eventPublisher;
    }
    
    @Override
    public APIGatewayProxyResponse handleRequest(APIGatewayProxyRequest request, Context context) {
        try {
            // Parse request
            RegisterAuthorRequest registerRequest = parseRequest(request);
            
            // Validate request
            validateRequest(registerRequest);
            
            // Call domain service
            AuthorProfile authorProfile = authorService.registerAuthor(
                registerRequest.getTenantId(),
                registerRequest.getUserId(),
                registerRequest.getName(),
                registerRequest.getBio(),
                registerRequest.getExpertise()
            );
            
            // Publish domain event
            eventPublisher.publish(new AuthorRegistered(
                authorProfile.getAuthorId(),
                authorProfile.getTenantId(),
                Instant.now()
            ));
            
            // Return response
            return createSuccessResponse(authorProfile);
        } catch (Exception e) {
            return createErrorResponse(e);
        }
    }
}
``` 