# Audit Service Domain Model

**Owner:** Linjith Koova Kunnon
**Last Updated:** 2023-09-10

## Domain Overview

The Audit Management bounded context is responsible for capturing, storing, and retrieving all critical user and system actions across the SkillVo platform. It establishes a consistent approach to tracking and querying actions for compliance, security, and operational purposes. The domain ensures a complete audit trail is maintained for all significant operations.

### Business Domain Terminology

- **Audit Log**: A record of an action taken by a user or system
- **Actor**: The entity (user or system) that performed the action
- **ModuleType**: The specific module where the action occurred (Learn, Hire, Admin)
- **EntityType**: The type of resource affected by the action (Course, User, Task, etc.)

## Aggregates

### AuditLog Aggregate

**Purpose and Invariants:**
- To maintain a complete and immutable record of actions
- Each audit record must be associated with a tenant and module
- Each audit record must capture who performed what action on which entity
- Audit logs cannot be modified after creation (immutable by design)

**Complete Attribute List:**

| Attribute   | Type     | Description                                     |
|-------------|----------|-------------------------------------------------|
| auditId     | UUID     | Unique identifier for the audit entry           |
| tenantId    | String   | Identifier of the tenant/organization           |
| moduleType  | Enum     | ModuleType: Learn, Hire, Admin                  |
| actorType   | Enum     | ActorType: User, System                         |
| userId      | String   | ID of the user who performed the action         |
| action      | String   | Action like: CreateCourse, PublishCourse, etc.  |
| entityType  | String   | Entity affected (e.g., Course, User, Task)      |
| entityId    | String   | Unique ID of the affected entity                |
| ipAddress   | String   | IP address of the actor                         |
| remarks     | String   | Additional remarks (optional)                   |
| addedBy     | String   | Added system or user id                         |
| updatedBy   | String   | Updated system or user id                       |
| addedOn     | DateTime | UTC Datetime                                    |
| updatedOn   | DateTime | UTC Datetime                                    |

**Business Rules and Constraints:**
- An audit log entry cannot be deleted
- An audit log entry cannot be modified after creation
- TenantId, ModuleType, and Action are mandatory
- Either User or System must be identified as the actor
- All timestamps are stored in UTC

**Lifecycle States:**
- Created: The audit log is created and persisted
- Retrieved: The audit log is fetched for reporting or display

## Entities

The Audit Management domain contains only the AuditLog aggregate, which is also the primary entity. There are no additional entities beyond the aggregate.

## Value Objects

### ModuleType

**Purpose:** Defines the module where the action occurred
**Immutability:** Cannot be changed once assigned to an audit log
**Values:**
- Learn
- Hire
- Admin

### ActorType

**Purpose:** Defines whether the action was performed by a human user or a system process
**Immutability:** Cannot be changed once assigned to an audit log
**Values:**
- User
- System

## Domain Events

### AuditLogCreatedEvent

**Purpose:** Published when a new audit log is successfully recorded

**Payload:**
```json
{
  "auditId": "UUID",
  "tenantId": "string",
  "moduleType": "string",
  "action": "string",
  "timestamp": "ISO8601 datetime"
}
```

**When Published:**
- After an audit log is successfully created and stored 
