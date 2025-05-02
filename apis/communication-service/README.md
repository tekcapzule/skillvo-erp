# Communication Service

The Communication Service is a microservice responsible for handling all communication-related operations in the SkillVo ERP Platform, including email, SMS, push notifications, and in-app notifications.

## Architecture

This service follows a hexagonal (ports and adapters) architecture with 4 main modules:

1. **Domain** - Core business logic, entities, and domain services
2. **Application** - Application services, use cases, and ports
3. **Infrastructure** - Database repositories, external API clients, and other infrastructure adapters
4. **Interface** - REST controllers, request/response DTOs, and other interface adapters

## Development

### Requirements
- Java 11+
- Maven 3.8+
- Docker (for local development)

### Build
```bash
./build.sh
```

### Run
```bash
mvn spring-boot:run -pl interface
```

### Test
```bash
mvn test
```

## API Documentation

Once the service is running, Swagger UI is available at:
http://localhost:8080/swagger-ui.html

## Configuration

Configuration is managed through Spring's configuration mechanism with profiles for different environments:
- `application.yml` - Default configuration
- `application-dev.yml` - Development configuration
- `application-test.yml` - Test configuration 
- `application-prod.yml` - Production configuration 