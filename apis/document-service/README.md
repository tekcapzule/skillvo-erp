# Document Service

Document management service for the SkillVo ERP platform.

## Architecture

This service follows a hexagonal (ports and adapters) architecture, organized into the following modules:

- **Domain**: Contains the core business entities, value objects, and business rules.
- **Application**: Contains use cases that coordinate and orchestrate business logic.
- **Infrastructure**: Contains external systems integrations, persistence implementations.
- **Interface**: Contains API endpoints, controllers, and other external interfaces.

## Development

### Prerequisites

- Java 11+
- Maven 3.8+
- Docker and Docker Compose (for local development)

### Building the Service

```bash
# Build the entire service
./build.sh

# Or use Maven directly
mvn clean install
```

### Running Locally

```bash
# Start the service with Maven
mvn spring-boot:run -pl interface

# Or using NX
nx serve document-service
```

### Running Tests

```bash
# Run all tests
mvn test

# Or using NX
nx test document-service
```

## API Documentation

Once the service is running, you can access the Swagger UI at:

```
http://localhost:8080/swagger-ui.html
```

## CI/CD

This service is built and deployed using the NX build system. See the root project documentation for more details on the CI/CD process. 