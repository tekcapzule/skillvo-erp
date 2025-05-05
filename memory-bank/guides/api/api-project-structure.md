# API Project Structure Guide

## Overview

This document outlines the standard API project structure for SkillVo ERP platform. We follow a multimodule architecture based on Domain-Driven Design (DDD) principles.

## Architecture Pattern

Our services implement a Hexagonal Architecture with DDD principles:

```
service-name/
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

## Nx Integration

Each service and module must be registered with Nx for monorepo tooling. Create minimal project.json files for the service root and each module.

## Creating a New Service

1. Create the directory structure
2. Set up Nx configuration files
3. Create Maven POM files
4. Configure module dependencies
5. Register with Nx workspace

## Reference Implementation

The `user-service` follows this structure and should be used as reference. 