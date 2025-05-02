# Rewards Service

This microservice handles the rewards functionality for the SkillVo platform. It follows a hexagonal architecture pattern with clear separation between domain, application, infrastructure, and interface layers.

## Project Structure

The project is organized into the following modules:

- **domain**: Contains the core business logic, entities, and domain services.
- **application**: Contains application services, use cases, and ports.
- **infrastructure**: Contains adapters for external systems, repositories, and other infrastructure concerns.
- **interface**: Contains REST controllers, request/response models, and the main application class.

## Development

### Prerequisites

- Java 11
- Maven
- Docker (for local development with containerized dependencies)

### Building the Project

```bash
# Build the entire project
./build.sh

# or manually with Maven
mvn clean install
```

### Running the Service

```bash
# Using Maven
mvn spring-boot:run -pl interface

# Using NX
nx serve rewards-service
```

### Testing

```bash
# Run all tests
mvn test

# Using NX
nx test rewards-service
```

## API Documentation

API documentation is available at `/swagger-ui.html` when the service is running.

## Docker Support

The service can be containerized using the Spring Boot Docker plugin:

```bash
mvn spring-boot:build-image -pl interface
```

## Integration with other Services

This service integrates with other SkillVo platform services including:
- User Service
- Company Service
- Course Service 