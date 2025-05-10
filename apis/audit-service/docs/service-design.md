# Audit Service Design

**Owner:** Linjith Koova Kunnon
**Last Updated:** 2023-09-10

## Service Overview

The Audit Service is responsible for capturing, storing, and retrieving all critical user and system actions across the SkillVo platform. It provides a centralized mechanism for recording actions taken by users or systems in any module, supporting time-based log queries, and enabling compliance and security monitoring.

## Domain Services

### AuditService

**Purpose and Responsibilities:**
- Provide an interface for creating and retrieving audit logs
- Handle business rules around audit log creation
- Support filtering and querying of audit logs based on various criteria

**Methods and Behavior:**

| Method                     | Description                                                  |
|---------------------------|--------------------------------------------------------------|
| create                    | Store an audit log entry                                     |
| getByUserId(moduleType)   | Get paginated audit records for the given user               |
| getByTenantId(moduleType) | Get paginated audit records for the given tenant             |
| getByTimeRangeforTenantId | Get the audits for a given tenant and time range             |

## Repository Design

### AuditRepository

**Interface Definition:**
```java
public interface AuditRepository {
    AuditLog save(AuditLog auditLog);
    Page<AuditLog> getByUserId(String userId, String moduleType, Pageable pageable);
    Page<AuditLog> getByTenantId(String tenantId, String moduleType, Pageable pageable);
    Page<AuditLog> getByTimeRangeforTenantId(String tenantId, String moduleType, 
                                           LocalDateTime from, LocalDateTime to, 
                                           Pageable pageable);
}
```

**Methods and Queries:**

| Method                     | Description                                                  |
|---------------------------|--------------------------------------------------------------|
| save()                    | Store an audit log entry                                     |
| getByUserId(moduleType)   | Get paginated audit records for the given user               |
| getByTenantId(moduleType) | Get paginated audit records for the given tenant             |
| getByTimeRangeforTenantId | Get the audits for a given tenant and time range             |

## Database Design

### DynamoDB Table Design

**Table:** AuditTable  
**Partition Key (PK):** `TENANT#<tenantId>#AUDIT#<auditId>`  
**Sort Key (SK):** `MODULE#<moduleType>`

### Attributes

| Attribute   | Type     | Description                                     |
|-------------|----------|-------------------------------------------------|
| PK          | String   | Partition key                                   |
| SK          | String   | Sort key                                        |
| userId      | String   | ID of the user who performed the action         |
| action      | String   | Action performed                                |
| entityType  | String   | Type of entity affected                         |
| entityId    | String   | ID of entity affected                           |
| actorType   | String   | Type of actor (User or System)                  |
| ipAddress   | String   | IP address of the actor                         |
| remarks     | String   | Additional comments                             |
| oldValue    | String   | JSON string of previous state                   |
| newValue    | String   | JSON string of new state                        |
| addedBy     | String   | Created by                                      |
| updatedBy   | String   | Updated by                                      |
| addedOn     | String   | Creation timestamp in ISO format                |
| updatedOn   | String   | Last update timestamp in ISO format             |
| timestamp   | Number   | Epoch time for sorting                          |

### Secondary Indexes

| GSI Name       | Partition Key | Sort Key  | Use Case                                   |
|----------------|----------------|-----------|--------------------------------------------|
| GSI_User       | userId         | moduleType| View actions by user over time             |
| GSI_Tenant     | tenantId       | moduleType| View logs for specific action across tenant|
| GSI_Timestamp  | tenantId       | timestamp | Time-based query for audit timeline/reporting |

## Application Services / Lambda Functions

The service exposes the following Lambda functions to handle different audit operations:

| Lambda Function     | Description                             | API Endpoint                         |
|---------------------|-----------------------------------------|--------------------------------------|
| create              | Record a new audit event                | POST /api/v1/audit                   |
| getByUser           | List actions by a specific user         | GET /api/v1/audit/user/{userId}      |
| getByTenant         | List logs by tenant                     | GET /api/v1/audit/tenant/{tenantId}  |
| getByTimeRange      | Retrieve logs within time window        | GET /api/v1/audit/tenant/{tenantId}/timerange |

### Access Control

- All audit endpoints require authentication
- Creating audit logs requires appropriate permissions
- Reading audit logs is restricted to users with admin privileges
- Cross-tenant access is strictly prohibited 