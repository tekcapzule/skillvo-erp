# Platform Admin Service

This service is responsible for platform administration functionality within the SkillVo ERP system.

## Structure

This service follows a hexagonal (ports and adapters) architecture:

- **Domain**: Contains the core business logic, entities, and value objects
- **Application**: Contains application services and use cases
- **Infrastructure**: Contains implementations of the domain interfaces
- **Interface**: Contains REST controllers, event handlers, and DTOs

## Development

### Prerequisites

- Java 11
- Maven
- Docker (for local development)

### Build

```bash
mvn clean install
```

### Run

```bash
mvn spring-boot:run
```

### Build Docker Image

```bash
mvn spring-boot:build-image
```

## Testing

```bash
mvn test
``` 