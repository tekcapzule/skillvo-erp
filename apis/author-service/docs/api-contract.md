---
owner: SkillVo Team
last_updated: 2023-06-15
---

# Author Service API Contract

## API Overview

The Author Service API provides endpoints for managing course authors within the SkillVo Learn module. It enables the registration, updating, and management of author profiles across the platform.

## Endpoints Documentation

### 1. Create Author

Creates a new author profile in the system.

- **HTTP Method**: POST
- **Path**: `/author/create`
- **Description**: Registers a new author in the system with basic profile information

#### Request Body

```json
{
  "tenantId": "123",
  "email": "jane.doe@example.com",
  "firstName": "Jane",
  "lastName": "Doe"
}
```

#### Response

- **Success Status Code**: 201 Created

```json
{
  "status": "success",
  "data": {
    "authorId": "auth-001",
    "tenantId": "123",
    "email": "jane.doe@example.com",
    "firstName": "Jane",
    "lastName": "Doe",
    "status": "ACTIVE",
    "courses": [],
    "addedBy": "system",
    "updatedBy": "system",
    "addedOn": "2023-06-15T10:30:00Z",
    "updatedOn": "2023-06-15T10:30:00Z"
  }
}
```

- **Error Response Codes**:
  - 400 Bad Request - Missing required fields
  - 409 Conflict - Author with email already exists
  - 500 Internal Server Error

### 2. Update Author

Updates an existing author's profile information.

- **HTTP Method**: POST
- **Path**: `/author/update`
- **Description**: Updates an author's profile information

#### Request Body

```json
{
  "tenantId": "123",
  "authorId": "auth-001",
  "email": "jane.doe@example.com",
  "firstName": "Jane",
  "lastName": "Doe"
}
```

#### Response

- **Success Status Code**: 200 OK

```json
{
  "status": "success",
  "data": {
    "authorId": "auth-001",
    "tenantId": "123",
    "email": "jane.doe@example.com",
    "firstName": "Jane",
    "lastName": "Doe",
    "status": "ACTIVE",
    "courses": [],
    "addedBy": "system",
    "updatedBy": "user-123",
    "addedOn": "2023-06-15T10:30:00Z",
    "updatedOn": "2023-06-15T11:45:00Z"
  }
}
```

- **Error Response Codes**:
  - 400 Bad Request - Invalid request format
  - 404 Not Found - Author not found
  - 500 Internal Server Error

### 3. Get Author

Retrieves an author's profile by ID.

- **HTTP Method**: POST
- **Path**: `/author/get`
- **Description**: Fetches an author's profile information

#### Request Body

```json
{
  "tenantId": "123",
  "authorId": "auth-001"
}
```

#### Response

- **Success Status Code**: 200 OK

```json
{
  "status": "success",
  "data": {
    "authorId": "auth-001",
    "tenantId": "123",
    "email": "jane.doe@example.com",
    "firstName": "Jane",
    "lastName": "Doe",
    "status": "ACTIVE", 
    "courses": [
      {
        "courseId": "course-001",
        "title": "Introduction to Machine Learning",
        "description": "A beginner's guide to ML concepts",
        "topicCode": "ML-101",
        "level": "BEGINNER",
        "learningMode": "ONLINE",
        "status": "PUBLISHED"
      }
    ],
    "addedBy": "system",
    "updatedBy": "user-123",
    "addedOn": "2023-06-15T10:30:00Z",
    "updatedOn": "2023-06-15T11:45:00Z"
  }
}
```

- **Error Response Codes**:
  - 400 Bad Request - Invalid request format
  - 404 Not Found - Author not found
  - 500 Internal Server Error

### 4. Activate Author

Reactivates a previously suspended author.

- **HTTP Method**: POST
- **Path**: `/author/activate`
- **Description**: Reactivates a blocked or suspended author profile

#### Request Body

```json
{
  "tenantId": "123",
  "authorId": "auth-001"
}
```

#### Response

- **Success Status Code**: 200 OK

```json
{
  "status": "success",
  "data": {
    "authorId": "auth-001",
    "status": "ACTIVE",
    "updatedBy": "admin-user",
    "updatedOn": "2023-06-15T14:25:00Z"
  }
}
```

- **Error Response Codes**:
  - 400 Bad Request - Invalid request format
  - 404 Not Found - Author not found
  - 500 Internal Server Error

### 5. Suspend Author

Temporarily suspends an author.

- **HTTP Method**: POST
- **Path**: `/author/suspend`
- **Description**: Temporarily suspends an author's access and activity

#### Request Body

```json
{
  "tenantId": "123",
  "authorId": "auth-001"
}
```

#### Response

- **Success Status Code**: 200 OK

```json
{
  "status": "success",
  "data": {
    "authorId": "auth-001",
    "status": "INACTIVE",
    "updatedBy": "admin-user",
    "updatedOn": "2023-06-15T16:10:00Z"
  }
}
```

- **Error Response Codes**:
  - 400 Bad Request - Invalid request format
  - 404 Not Found - Author not found
  - 500 Internal Server Error

### 6. Delete Author

Soft-deletes (archives) an author profile.

- **HTTP Method**: POST
- **Path**: `/author/delete`
- **Description**: Archives an author profile (soft deletion)

#### Request Body

```json
{
  "tenantId": "123",
  "authorId": "auth-001"
}
```

#### Response

- **Success Status Code**: 200 OK

```json
{
  "status": "success",
  "data": {
    "authorId": "auth-001",
    "status": "ARCHIVED",
    "updatedBy": "admin-user",
    "updatedOn": "2023-06-15T17:45:00Z"
  }
}
```

- **Error Response Codes**:
  - 400 Bad Request - Invalid request format
  - 404 Not Found - Author not found
  - 500 Internal Server Error 