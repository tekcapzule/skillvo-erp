# Audit Service API Contract

**Owner:** Linjith Koova Kunnon
**Last Updated:** 2023-09-10

## API Overview

The Audit Service API provides endpoints for capturing, storing, and retrieving user and system actions across the SkillVo platform. It enables comprehensive audit logging for compliance, security monitoring, and operational tracking purposes.

## Endpoints Documentation

### 1. Create Audit Log

**HTTP Method:** POST  
**Path:** `/api/v1/audit`

**Description:** Records a new audit event in the system.

**Request Body Schema:**
```json
{
  "tenantId": "string",
  "moduleType": "string",
  "actorType": "string",
  "userId": "string",
  "action": "string",
  "entityType": "string",
  "entityId": "string",
  "ipAddress": "string",
  "remarks": "string",
  "oldValue": "object",
  "newValue": "object",
  "addedBy": "string",
  "updatedBy": "string"
}
```

**Request Body Example:**
```json
{
  "tenantId": "tenant-001",
  "moduleType": "Learn",
  "actorType": "User",
  "userId": "user-123",
  "action": "CreateCourse",
  "entityType": "Course",
  "entityId": "course-456",
  "ipAddress": "192.168.0.1",
  "remarks": "Course created",
  "oldValue": null,
  "newValue": {
    "title": "New Course Title"
  },
  "addedBy": "system",
  "updatedBy": "system"
}
```

**Response Status Codes:**
- 201: Created successfully
- 400: Bad request
- 401: Unauthorized
- 403: Forbidden
- 500: Internal server error

**Response Body Example:**
```json
{
  "status": "success",
  "data": {
    "auditId": "uuid-001"
  }
}
```

### 2. Get Audit Logs by User ID

**HTTP Method:** GET  
**Path:** `/api/v1/audit/user/{userId}`

**Description:** Retrieves a paginated list of audit logs for a specific user and module.

**Request Parameters:**
- `userId` (path): ID of the user
- `tenantId` (query): ID of the tenant
- `moduleType` (query): Type of module (Learn, Hire, Admin)
- `page` (query): Page number (default: 1)
- `pageSize` (query): Number of items per page (default: 20)

**Response Status Codes:**
- 200: OK
- 400: Bad request
- 401: Unauthorized
- 403: Forbidden
- 404: User not found
- 500: Internal server error

**Response Body Example:**
```json
{
  "status": "success",
  "data": {
    "logs": [
      {
        "auditId": "uuid-001",
        "action": "CreateCourse",
        "entityType": "Course",
        "entityId": "course-456",
        "timestamp": "2025-05-10T10:00:00Z"
      }
    ],
    "totalCount": 5,
    "page": 1,
    "pageSize": 20
  }
}
```

### 3. Get Audit Logs by Tenant ID

**HTTP Method:** GET  
**Path:** `/api/v1/audit/tenant/{tenantId}`

**Description:** Retrieves a paginated list of audit logs for a specific tenant and module.

**Request Parameters:**
- `tenantId` (path): ID of the tenant
- `moduleType` (query): Type of module (Learn, Hire, Admin)
- `page` (query): Page number (default: 1)
- `pageSize` (query): Number of items per page (default: 20)

**Response Status Codes:**
- 200: OK
- 400: Bad request
- 401: Unauthorized
- 403: Forbidden
- 404: Tenant not found
- 500: Internal server error

**Response Body Example:**
```json
{
  "status": "success",
  "data": {
    "logs": [
      {
        "auditId": "uuid-002",
        "userId": "admin-001",
        "action": "DeleteUser",
        "entityType": "User",
        "entityId": "user-567",
        "timestamp": "2025-05-09T15:23:00Z"
      }
    ],
    "totalCount": 10,
    "page": 1,
    "pageSize": 20
  }
}
```

### 4. Get Audit Logs by Time Range

**HTTP Method:** GET  
**Path:** `/api/v1/audit/tenant/{tenantId}/timerange`

**Description:** Retrieves audit logs for a tenant and module within a specified time range.

**Request Parameters:**
- `tenantId` (path): ID of the tenant
- `moduleType` (query): Type of module (Learn, Hire, Admin)
- `from` (query): Start date-time in ISO format
- `to` (query): End date-time in ISO format
- `page` (query): Page number (default: 1)
- `pageSize` (query): Number of items per page (default: 50)

**Response Status Codes:**
- 200: OK
- 400: Bad request
- 401: Unauthorized
- 403: Forbidden
- 404: Tenant not found
- 500: Internal server error

**Response Body Example:**
```json
{
  "status": "success",
  "data": {
    "logs": [
      {
        "auditId": "uuid-003",
        "userId": "hr-789",
        "action": "ShortlistCV",
        "entityType": "Candidate",
        "entityId": "cv-001",
        "timestamp": "2025-05-05T08:40:00Z"
      }
    ],
    "totalCount": 15,
    "page": 1,
    "pageSize": 50
  }
}
``` 