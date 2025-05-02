# Task Service

This is the Task Service for the SkillVo ERP Platform, responsible for managing tasks, assignments, and related operations.

## Architecture

The service follows a Hexagonal (Ports and Adapters) architecture with the following modules:

- **Domain**: Contains the core business entities, value objects, and domain services
- **Application**: Contains application services, use cases, and port definitions
- **Infrastructure**: Contains adapters for external systems and implementation of ports
- **Interface**: Contains REST API controllers, message listeners, and configuration

## Development

### Prerequisites

- Java 11
- Maven
- Docker (for local development)

### Building the Service

To build the service:

```bash
./build.sh
```

Or manually:

```bash
mvn clean install -DskipTests
mvn package spring-boot:repackage -pl interface -DskipTests
```

### Running the Service

Using Maven:

```bash
mvn spring-boot:run -pl interface
```

Using the packaged JAR:

```bash
java -jar interface/target/task-service-interface-1.0.0-SNAPSHOT.jar
```

### Testing

To run tests:

```bash
mvn test
```

## API Documentation

API documentation is available at `/swagger-ui/index.html` when the service is running.

## Configuration

Configuration is done through environment variables and application properties. See `application.yml` for details.

## CI/CD

The service is built and deployed using NX build system and GitHub Actions. 