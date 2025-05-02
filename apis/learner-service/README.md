# Learner Service

This service is responsible for managing learner-related functionality in the SkillVo platform. It follows a hexagonal architecture pattern to maintain separation of concerns and ensure testability.

## Architecture

The service is structured into multiple modules following the hexagonal architecture pattern:

- **Domain**: Contains the core business logic, entities, value objects, and domain services.
- **Application**: Contains use cases and orchestrates the domain logic.
- **Infrastructure**: Provides technical capabilities and implements the interfaces defined in the domain.
- **Interface**: Contains API endpoints and controllers, as the entry point to the application.

## Development

### Prerequisites

- Java 11 or higher
- Maven 3.6 or higher
- Docker (for containerization)

### Build

To build the service, run:

```bash
./build.sh
```

Or manually:

```bash
mvn clean install -DskipTests
mvn package spring-boot:repackage -pl interface -DskipTests
```

### Run

To run the service locally:

```bash
mvn spring-boot:run -pl interface
```

Or using NX:

```bash
nx serve learner-service
```

### Test

To run the tests:

```bash
mvn test
```

Or using NX:

```bash
nx test learner-service
```

## API Documentation

API documentation is available at `/swagger-ui.html` when the service is running.

## Integration with other services

This service integrates with other SkillVo platform services to provide a comprehensive learner management system. 