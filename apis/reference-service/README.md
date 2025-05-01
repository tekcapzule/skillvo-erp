# Reference Service

A microservice for managing references in a multi-tenant environment, built using Domain-Driven Design (DDD) and Command Query Responsibility Segregation (CQRS) patterns.

## Project Structure

The project is organized into the following modules:

- **domain**: Contains the core domain model, entities, and business rules
- **application**: Contains the application services, commands, queries, and handlers
- **infrastructure**: Contains the implementations of repositories and external services
- **interface**: Contains the REST controllers and API endpoints

## Prerequisites

- Java 17
- Maven 3.8+
- AWS Account with appropriate permissions
- AWS CLI configured with credentials

## Configuration

The service requires the following environment variables:

- `EVENT_QUEUE_URL`: The URL of the SQS queue for domain events
- AWS credentials (configured via AWS CLI or environment variables)

## Building

To build the project:

```bash
mvn clean install
```

## Running

To run the service:

```bash
mvn spring-boot:run -pl interface
```

## API Endpoints

### References

- `POST /api/v1/references`: Create a new reference
- `PUT /api/v1/references/{id}`: Update an existing reference
- `DELETE /api/v1/references/{id}`: Delete a reference
- `GET /api/v1/references/{id}`: Get a reference by ID
- `GET /api/v1/references?tenantId={tenantId}`: List references for a tenant
- `GET /api/v1/references/search?tenantId={tenantId}&query={query}`: Search references

## Architecture

The service follows DDD and CQRS patterns:

- **Domain Layer**: Contains the core business logic and entities
- **Application Layer**: Orchestrates the flow of data and coordinates domain objects
- **Infrastructure Layer**: Provides implementations for persistence and external services
- **Interface Layer**: Handles HTTP requests and responses

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request 