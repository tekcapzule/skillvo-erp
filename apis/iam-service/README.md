# Identity and Access Management (IAM) Service

The IAM Service is a microservice that manages authentication, authorization, and access control for the SkillVo ERP platform.

## Architecture

This service follows the Clean Architecture pattern, organized into four distinct layers:

1. **Domain Layer**: Contains the core business logic, entities, and business rules.
2. **Application Layer**: Contains the use cases, orchestrating the flow of data to and from the entities.
3. **Infrastructure Layer**: Contains the implementation details, such as repositories, external services, and database configurations.
4. **Interface Layer**: Contains the controllers, adapters, and other entry points to the application.

## Project Structure

```
iam-service/
├── domain/              # Core business logic and rules
├── application/         # Use cases and service implementations
├── infrastructure/      # External services and repository implementations
├── interface/           # Controllers and entry points
├── api-docs/            # API documentation
├── events/              # Event definitions and handlers
└── test-data/           # Test data for development and testing
```

## Getting Started

### Prerequisites

- Java 11
- Maven 3.6+
- Docker (optional, for containerized development)

### Building the Service

```bash
./build.sh
```

This will compile the code, run tests, and package the service into a JAR file.

### Running the Service

```bash
java -jar interface/target/iam-service-interface-1.0.0-SNAPSHOT.jar
```

### Running with Docker

```bash
docker build -t skillvo/iam-service .
docker run -p 8080:8080 skillvo/iam-service
```

## Development

### Key Components

- **User Authentication**: Handles user login, token generation, and validation
- **Authorization**: Manages role-based access control
- **Permission Management**: Manages fine-grained permissions

### API Endpoints

The API endpoints will be documented using Swagger and will be available at `/swagger-ui.html` when the service is running.

## Testing

To run the tests:

```bash
mvn test
```

## Configuration

Configuration properties are defined in `application.properties` or `application.yml` files within the `interface/src/main/resources` directory.

## Deployment

This service can be deployed as a standalone JAR or as a Docker container. It integrates with the SkillVo ERP platform's infrastructure.

## License

[License information will be added here]

## Contact

[Contact information will be added here] 