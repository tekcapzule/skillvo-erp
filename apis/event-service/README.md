# Event Service

Event Service for SkillVo Platform. This service handles all functionality related to event management.

## Architecture

The service follows a Clean Architecture / Hexagonal Architecture pattern with the following modules:

- **Domain**: Contains the core business logic and entities
- **Application**: Contains the use cases and service implementations
- **Infrastructure**: Contains external integrations like databases
- **Interface**: Contains API endpoints, controllers, and DTOs

## Development

### Prerequisites

- Java 11
- Maven 3.8+
- AWS SAM CLI (for local testing)
- Docker (for local testing)

### Building

To build the service:

```bash
mvn clean package
```

### Running Locally

To run the service locally using SAM:

```bash
sam local start-api
```

Or using Spring Boot directly:

```bash
mvn spring-boot:run -pl interface
```

### Testing

To run tests:

```bash
mvn test
```

## Deployment

The service is deployed using AWS SAM:

```bash
sam build
sam deploy --guided
```

## API Documentation

API documentation is available via Swagger UI when running the service locally at:

```
http://localhost:8080/swagger-ui.html
```

## Project Structure

```
event-service/
├── application/        # Application layer
├── domain/             # Domain layer
├── infrastructure/     # Infrastructure layer
├── interface/          # Interface layer
├── events/             # Event definitions
├── api-docs/           # API documentation
├── template.yaml       # SAM template
└── pom.xml             # Root POM file
``` 