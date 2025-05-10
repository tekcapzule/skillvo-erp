# SkillVo Microservice Documentation Generator

## Prompt for Generating Microservice Documentation

Use the following instructions to generate detailed documentation for given microservice in the SkillVo platform. You'll need to produce three separate files for this microservice under apis/<service-name>/docs folder following our DDD architecture principles:

1. **api-contract.md** - API specifications and contracts
2. **domain-model.md** - Domain model design and structure 
3. **service-design.md** - Service layer design and implementation

---

## General Instructions

- Use the provided service documentation as the source truth. DO NOT deviate from the design mentioned in the document.
- Strictly adhere to Domain-Driven Design principles
- Each file should be comprehensive but focused on its specific concern
- Use markdown formatting with proper headers, tables, and code blocks
- Include metadata at the top (owner, last updated date)
- Document should be readable by both technical and business stakeholders

---

## File 1: api-contract.md

Generate an API contract document that includes:

1. **API Overview**
   - Purpose of the API

2. **Endpoints Documentation**
   - For each endpoint:
     - HTTP method and path
     - Description/purpose
     - Request parameters
     - Request body schema with JSON example
     - Response status codes and meanings
     - Response body schema with JSON example
     - Error responses and handling


## File 2: domain-model.md

Generate a domain model design document that includes:

1. **Domain Overview**
   - Brief description of the bounded context
   - Business domain terminology

2. **Aggregates**
   - For each aggregate:
     - Purpose and invariants
     - Complete attribute list with types and descriptions
     - Business rules and constraints
     - Lifecycle states

3. **Entities**
   - For each entity:
     - Purpose and relationship to aggregate
     - Complete attribute list
     - Business rules

4. **Value Objects**
   - For each value object:
     - Purpose and immutability guarantee
     - Attributes and validation rules

5. **Domain Events**
   - Event definitions and payloads
   - When events are published


## File 3: service-design.md

Generate a service design document that includes:

1. **Service Overview**
   - Purpose of the service
   
2. **Domain Services**
   - For each service:
      - Purpose and responsibilities
      - Methods and behavior

3. **Repository Design**
   - For each repository:
     - Interface definition
     - Methods and queries

4. **Database Design**
   - Database design (tables, indexes)


## Usage Instructions

1. Create a `docs` directory in your microservice root if it doesn't exist
2. Generate each file separately based on the microservice documentation
3. Review and adapt to specific microservice requirements