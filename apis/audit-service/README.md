# Audit Service

This is the Audit Service for SkillVo Platform. It follows a hexagonal architecture approach with the following modules:

## Modules

### Domain
Contains the core business logic, domain entities, and business rules.

### Application
Contains the application services that orchestrate the domain logic.

### Infrastructure
Contains adapters for external services, repositories, and other infrastructure concerns.

### Interface
Contains the REST controllers, DTOs, and other interface-related components.

## Development

### Building the Service

To build the service, run:

```bash
./build.sh
```

### Running the Service

To run the service using Maven:

```bash
mvn spring-boot:run -pl interface
```

Or with nx:

```bash
nx serve audit-service
```

### Testing

To run tests:

```bash
mvn test
```

Or with nx:

```bash
nx test audit-service
```

## Architecture

This service follows hexagonal architecture principles, with clear separation between:

- Core domain logic
- Application services
- External interfaces
- Infrastructure concerns

This structure promotes:

- Testability
- Maintainability
- Separation of concerns
- Domain-driven design 