# Candidate Service

This service manages candidate-related functionality for the SkillVo ERP platform.

## Architecture

The service follows a hexagonal architecture with Domain-Driven Design principles:

```
candidate-service/
├── application/     # Service implementations, use cases, orchestration
├── domain/          # Core domain model, interfaces only
├── infrastructure/  # External integrations, repository implementations 
├── interface/       # Lambda functions, controllers, DTOs
└── pom.xml          # Root POM file
```

## Module Responsibilities

### Domain Module
- Aggregate roots, entities and value objects
- Domain events and exceptions
- Repository interfaces
- Service interfaces only
- No external dependencies
- Pure domain language

### Application Module
- Service implementations
- Use case orchestration
- Transaction management
- Command/query handlers
- Domain service implementation

### Infrastructure Module
- Repository implementations
- Database configurations
- External service integrations
- Messaging implementation
- Technical concerns

### Interface Module
- AWS Lambda functions
- API Gateway definitions
- Request/response DTOs
- Input validation
- API documentation

## Building and Running

To build the service:

```
mvn clean install
```

## Development Guidelines

- Follow DDD principles for domain modeling
- Use CQRS pattern for operations
- Follow repository pattern for data access
- Use value objects for immutable concepts 