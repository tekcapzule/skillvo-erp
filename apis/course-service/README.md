# Course Service

A microservice for managing courses in the SkillVo platform. This service is built using Domain-Driven Design (DDD) principles and follows a hexagonal architecture pattern.

## Architecture

The service is structured into multiple modules:

- **domain**: Contains the core domain models, aggregates, and business logic
- **application**: Houses the application services, command/query handlers, and mappers
- **infrastructure**: Implements infrastructure concerns like persistence and event publishing
- **interface**: Contains the API layer with AWS Lambda handlers and DTOs

### Key Components

- Course aggregate root with associated value objects and entities
- Command and Query handlers following CQRS pattern
- DynamoDB repository implementation
- AWS Lambda functions for API endpoints
- Domain event publishing to SQS

## Features

- Create new courses
- Update course details
- Delete courses
- Publish courses to marketplace
- List courses with filtering
- Get course by ID

## Prerequisites

- Java 17
- Maven
- AWS CLI configured
- DynamoDB Local (for testing)

## Building

```bash
mvn clean install
```

## Testing

The service includes comprehensive test coverage:

- Unit tests for domain logic
- Integration tests for repositories
- End-to-end tests for Lambda handlers

Run tests with:

```bash
mvn test
```

## API Endpoints

### Create Course
- Function: `CreateCourseLambda`
- Method: POST
- Input: CreateCourseRequest

### Update Course
- Function: `UpdateCourseLambda`
- Method: PUT
- Input: UpdateCourseRequest

### Delete Course
- Function: `DeleteCourseLambda`
- Method: DELETE
- Input: Course ID

### Publish Course
- Function: `PublishCourseLambda`
- Method: POST
- Input: Course ID

### Get Course
- Function: `GetCourseLambda`
- Method: GET
- Input: Course ID

### List Courses
- Function: `ListCoursesLambda`
- Method: GET
- Input: Optional filters (tenant ID, marketplace status)

## Domain Events

The service publishes the following domain events to SQS:

- CourseCreatedEvent
- CourseUpdatedEvent
- CourseDeletedEvent
- CoursePublishedEvent

## Configuration

Environment variables required:

- `DYNAMODB_TABLE_NAME`: DynamoDB table name
- `SQS_QUEUE_URL`: URL of the SQS queue for domain events
- `AWS_REGION`: AWS region

## Project Structure

```
course-service/
├── domain/
│   └── src/
│       └── main/
│           └── java/
│               └── com/skillvo/course/domain/
├── application/
│   └── src/
│       └── main/
│           └── java/
│               └── com/skillvo/course/application/
├── infrastructure/
│   └── src/
│       └── main/
│           └── java/
│               └── com/skillvo/course/infrastructure/
└── interface/
    └── src/
        └── main/
            └── java/
                └── com/skillvo/course/api/
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 