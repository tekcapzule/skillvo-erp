# SkillVo Backend Architecture

## Overview

SkillVo backend services follow a modular, serverless microservices architecture built using Java (Spring Boot) and AWS technologies. Each service is a multi-module Maven project and is deployed independently using AWS Lambda with SAM.

---

## Technology Stack

| Component         | Technology/Tool                          |
| ----------------- | ---------------------------------------- |
| Language          | Java 17                                  |
| Framework         | Spring Boot (spring-boot-starter-parent) |
| Runtime           | AWS Lambda                               |
| API Gateway       | AWS API Gateway                          |
| Database          | AWS DynamoDB                             |
| Deployment        | AWS SAM + CloudFormation                 |
| CI/CD             | GitHub Actions                           |
| Project Structure | Multi-module Maven                       |
| Code Generation   | Lombok                                   |
| Logging           | SLF4J with Logback                       |

---

## Logging Configuration

* **Library**: SLF4J + Logback
* **Pattern (logback.xml)**: `%d{yyyy-MM-dd HH:mm:ss} %-5level %logger{36} - %msg%n`
* **Best Practices**:

  * Use parameterized logs: `logger.info("User {} logged in", userId);`
  * Use DEBUG for development logs and INFO for business operations
  * Log exceptions with stack trace only when necessary

---

## Key Dependencies

| Group ID                   | Artifact ID                       | Purpose                         |
| -------------------------- | --------------------------------- | ------------------------------- |
| org.springframework.boot   | spring-boot-starter               | Core Spring Boot starter        |
| org.springframework.boot   | spring-boot-starter-web           | For local web context           |
| org.springframework.boot   | spring-boot-starter-test          | Testing                         |
| org.projectlombok          | lombok                            | Boilerplate code removal        |
| com.fasterxml.jackson.core | jackson-annotations               | JSON mapping                    |
| com.amazonaws              | aws-java-sdk-dynamodb             | DynamoDB client                 |
| com.amazonaws              | aws-lambda-java-events            | Lambda event support            |
| org.springframework.cloud  | spring-cloud-function-adapter-aws | Spring + AWS Lambda integration |
| spring-boot-thin-layout    | spring-boot-thin-layout           | Smaller Lambda JARs             |

---

## Module Breakdown

### 1. Domain Layer

* Core business logic: Aggregates, Entities, Value Objects, Domain Services
* Business rule enforcement (e.g., course lifecycle)
* Domain events (e.g., CourseCreated, CoursePublished, CourseArchived)
* Repository interface and service interface declarations
* **Folder**: `domain/src/main/java/com/skillvo/course/domain`

### 2. Application Layer

* Application services or command/query handlers (e.g., CreateCourseCommandHandler)
* Coordinates domain and infrastructure interactions
* Manages transactions and publishes domain events
* Implementation of service interfaces
* **Folder**: `application/src/main/java/com/skillvo/course/application`

### 3. Interface Layer (API Layer)

* Exposes use cases via AWS Lambda handlers
* Uses AWS API Gateway to route HTTP requests
* Responsibilities:

  * Input validation
  * Authentication and authorization
  * Request transformation (e.g., JSON to command)
  * Delegation to application services
  * Response formatting
* **Note**: Consolidate Lambda handlers under `api/aws/lambda`
* **Folder**: `api/src/main/java/com/skillvo/course/api/aws/lambda`

### 4. Infrastructure Layer

* Handles persistence, messaging, and integrations
* Implements repository interfaces (e.g., DynamoDBCourseRepository)
* Integrates with DynamoDB, SQS, etc.
* Handles event emission and subscription
* **Folder**: `infrastructure/src/main/java/com/skillvo/course/infrastructure`

---

## Design Recommendations

* Maintain separation of concerns across layers
* No business logic in API or Infrastructure layers
* Abstract DynamoDB behind repositories
* AWS Lambda functions should map directly to use cases

---

## Summary Table

| Layer          | Responsibilities                                   | Folder Location    |
| -------------- | -------------------------------------------------- | ------------------ |
| Domain         | Business rules, aggregates, entities, services     | domain/...         |
| Application    | Use case orchestration, command/query handlers     | application/...    |
| Interface      | Input validation, HTTP mapping, request delegation | api/...            |
| Infrastructure | Persistence, messaging, external integrations      | infrastructure/... |

---
