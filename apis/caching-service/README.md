# Caching Service

This is the caching service for the SkillVo ERP Platform. It provides centralized caching capabilities for the platform.

## Architecture

The service follows a hexagonal architecture with the following modules:

- **Domain**: Contains the core business logic and entities
- **Application**: Contains application services and use cases
- **Infrastructure**: Contains technical implementations of domain interfaces
- **Interface**: Contains controllers, DTOs, and API endpoints

## Development

### Prerequisites

- Java 11
- Maven
- Docker (for local deployment)

### Building the Service

```bash
mvn clean package
```

### Running the Service

```bash
mvn spring-boot:run
```

### Running Tests

```bash
mvn test
```

## API Documentation

API documentation is available at `/swagger-ui.html` when the service is running.

## Project Structure

```
caching-service/
├── domain/            # Domain layer
├── application/       # Application layer
├── infrastructure/    # Infrastructure layer
├── interface/         # Interface layer
├── events/            # Event definitions
├── api-docs/          # API documentation
└── test-data/         # Test data
``` 