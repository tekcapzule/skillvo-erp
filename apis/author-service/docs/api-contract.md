# Author Service - API Contract

**Owner**: SkillVo Platform Team  
**Last Updated**: 2023-08-01

## API Overview

The Author Service API manages course author profiles, their contributions, and performance metrics within the SkillVo Learn module. It enables registering new authors, tracking their course contributions, and managing their recognition through badges and titles.

## Endpoints Documentation

### 1. Register Author

Creates a new author profile in the system.

- **HTTP Method**: POST
- **Path**: `/registerAuthor`
- **Description**: Registers a new author profile in the system

#### Request Body

```json
{
  "tenantId": "123",
  "userId": "user-001",
  "name": "Jane Doe",
  "bio": "AI and ML instructor",
  "expertise": ["Machine Learning", "Deep Learning"]
}
```

#### Response

- **Status Code**: 201 Created
- **Response Body**:

```json
{
  "authorId": "auth-001",
  "tenantId": "123",
  "name": "Jane Doe",
  "bio": "AI and ML instructor",
  "expertise": ["Machine Learning", "Deep Learning"],
  "status": "ACTIVE",
  "createdAt": "2023-08-01T12:00:00Z"
}
```

#### Error Responses

- **400 Bad Request**: Invalid input parameters
- **409 Conflict**: Author already exists
- **500 Internal Server Error**: Server processing error

### 2. Update Author Profile

Updates an existing author's profile information.

- **HTTP Method**: PUT
- **Path**: `/updateProfile`
- **Description**: Updates author's profile details

#### Request Body

```json
{
  "tenantId": "123",
  "authorId": "auth-001",
  "name": "Jane Smith",
  "bio": "AI, ML and Deep Learning instructor",
  "expertise": ["Machine Learning", "Deep Learning", "Neural Networks"]
}
```

#### Response

- **Status Code**: 200 OK
- **Response Body**:

```json
{
  "authorId": "auth-001",
  "tenantId": "123",
  "name": "Jane Smith",
  "bio": "AI, ML and Deep Learning instructor",
  "expertise": ["Machine Learning", "Deep Learning", "Neural Networks"],
  "status": "ACTIVE",
  "updatedAt": "2023-08-01T14:30:00Z"
}
```

#### Error Responses

- **400 Bad Request**: Invalid input parameters
- **404 Not Found**: Author not found
- **500 Internal Server Error**: Server processing error

### 3. Record Contribution

Records an author's contribution to a course.

- **HTTP Method**: POST
- **Path**: `/recordContribution`
- **Description**: Links an author to a course with a specific contribution type

#### Request Body

```json
{
  "tenantId": "123",
  "authorId": "auth-001",
  "courseId": "course-xyz",
  "contributionType": "PRIMARY_AUTHOR",
  "createdAt": "2023-08-01T15:00:00Z"
}
```

#### Response

- **Status Code**: 201 Created
- **Response Body**:

```json
{
  "tenantId": "123",
  "authorId": "auth-001",
  "courseId": "course-xyz",
  "contributionType": "PRIMARY_AUTHOR",
  "createdAt": "2023-08-01T15:00:00Z",
  "status": "ACTIVE"
}
```

#### Error Responses

- **400 Bad Request**: Invalid input parameters
- **404 Not Found**: Author or course not found
- **409 Conflict**: Contribution already exists
- **500 Internal Server Error**: Server processing error

### 4. Get Author Profile

Retrieves a specific author's profile.

- **HTTP Method**: GET
- **Path**: `/getProfile`
- **Description**: Retrieves author profile by ID

#### Request Parameters

- `tenantId` (string, required): The tenant identifier
- `authorId` (string, required): The author identifier

#### Response

- **Status Code**: 200 OK
- **Response Body**:

```json
{
  "authorId": "auth-001",
  "tenantId": "123",
  "name": "Jane Smith",
  "bio": "AI, ML and Deep Learning instructor",
  "expertise": ["Machine Learning", "Deep Learning", "Neural Networks"],
  "courses": [
    {
      "courseId": "course-xyz",
      "title": "Introduction to Machine Learning",
      "contributionType": "PRIMARY_AUTHOR"
    }
  ],
  "badges": ["Top Contributor"],
  "status": "ACTIVE",
  "createdAt": "2023-08-01T12:00:00Z",
  "updatedAt": "2023-08-01T14:30:00Z"
}
```

#### Error Responses

- **400 Bad Request**: Invalid input parameters
- **404 Not Found**: Author not found
- **500 Internal Server Error**: Server processing error

### 5. List Authors

Lists authors with optional filtering.

- **HTTP Method**: GET
- **Path**: `/listAuthors`
- **Description**: Lists authors with optional filters

#### Request Parameters

- `tenantId` (string, required): The tenant identifier
- `status` (string, optional): Filter by author status (ACTIVE, INACTIVE)
- `expertise` (string, optional): Filter by expertise area
- `limit` (integer, optional): Maximum number of results to return
- `nextToken` (string, optional): Pagination token

#### Response

- **Status Code**: 200 OK
- **Response Body**:

```json
{
  "authors": [
    {
      "authorId": "auth-001",
      "tenantId": "123",
      "name": "Jane Smith",
      "expertise": ["Machine Learning", "Deep Learning", "Neural Networks"],
      "status": "ACTIVE"
    },
    {
      "authorId": "auth-002",
      "tenantId": "123",
      "name": "John Doe",
      "expertise": ["Web Development", "JavaScript"],
      "status": "ACTIVE"
    }
  ],
  "nextToken": "eyJsYXN0RXZhbHVhdGVkS2V5Ijp7IklEIjp7IlMiOiJhdXRoLTAwMyJ9fX0="
}
```

#### Error Responses

- **400 Bad Request**: Invalid input parameters
- **500 Internal Server Error**: Server processing error

### 6. List Contributions

Lists courses authored by a specific author.

- **HTTP Method**: GET
- **Path**: `/listContributions`
- **Description**: Lists courses authored by a user

#### Request Parameters

- `tenantId` (string, required): The tenant identifier
- `authorId` (string, required): The author identifier
- `contributionType` (string, optional): Filter by contribution type (PRIMARY_AUTHOR, CO_AUTHOR, REVIEWER)
- `limit` (integer, optional): Maximum number of results to return
- `nextToken` (string, optional): Pagination token

#### Response

- **Status Code**: 200 OK
- **Response Body**:

```json
{
  "contributions": [
    {
      "courseId": "course-xyz",
      "title": "Introduction to Machine Learning",
      "description": "Learn the basics of machine learning",
      "topic": "Data Science",
      "level": "BEGINNER",
      "contributionType": "PRIMARY_AUTHOR",
      "status": "PUBLISHED"
    },
    {
      "courseId": "course-abc",
      "title": "Advanced Deep Learning",
      "description": "Master deep learning techniques",
      "topic": "Data Science",
      "level": "ADVANCED",
      "contributionType": "CO_AUTHOR",
      "status": "DRAFT"
    }
  ],
  "nextToken": "eyJsYXN0RXZhbHVhdGVkS2V5Ijp7IklEIjp7IlMiOiJjb3Vyc2UtMDA1In19fQ=="
}
```

#### Error Responses

- **400 Bad Request**: Invalid input parameters
- **404 Not Found**: Author not found
- **500 Internal Server Error**: Server processing error

### 7. Award Badge

Assigns a badge or title to an author.

- **HTTP Method**: POST
- **Path**: `/awardBadge`
- **Description**: Assigns badge or title to an author

#### Request Body

```json
{
  "tenantId": "123",
  "authorId": "auth-001",
  "badge": "Top Contributor"
}
```

#### Response

- **Status Code**: 200 OK
- **Response Body**:

```json
{
  "authorId": "auth-001",
  "tenantId": "123",
  "badge": "Top Contributor",
  "awardedAt": "2023-08-01T16:45:00Z"
}
```

#### Error Responses

- **400 Bad Request**: Invalid input parameters
- **404 Not Found**: Author not found
- **500 Internal Server Error**: Server processing error

### 8. Deactivate Author

Deactivates an author profile.

- **HTTP Method**: PUT
- **Path**: `/deactivateAuthor`
- **Description**: Deactivates or bans an author

#### Request Body

```json
{
  "tenantId": "123",
  "authorId": "auth-001",
  "reason": "Author requested account deactivation"
}
```

#### Response

- **Status Code**: 200 OK
- **Response Body**:

```json
{
  "authorId": "auth-001",
  "tenantId": "123",
  "status": "INACTIVE",
  "deactivatedAt": "2023-08-01T17:30:00Z"
}
```

#### Error Responses

- **400 Bad Request**: Invalid input parameters
- **404 Not Found**: Author not found
- **500 Internal Server Error**: Server processing error 