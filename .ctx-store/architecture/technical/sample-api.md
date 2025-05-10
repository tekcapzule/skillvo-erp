# 2.3.1.3.1.1 Course Management

**Owned by:** Linjith Koova Kunnon
**Last updated:** April 03, 2025

---

## 1. Overview

The Course Management bounded context handles the authoring, structuring, and publishing of courses in the SkillVo Learn module. It follows Domain-Driven Design (DDD) principles.

---

## 2. Bounded Context: Course Management

**Purpose:**

* Course lifecycle management (create, update, publish, archive)
* Hierarchical content structuring (sections and lessons)
* Metadata: tags, level, language, pricing model
* Used by authors; learner tracking is handled by a separate bounded context

---

## 3. Domain Model

### 3.1 Aggregate Root: `Course`

| Attribute            | Type                 | Description                            |
| -------------------- | -------------------- | -------------------------------------- |
| courseId             | UUID                 | Unique identifier                      |
| tenantId             | String               | Tenant scope for multi-tenancy         |
| title                | String               | Name of the course                     |
| description          | String               | Overview of the course                 |
| topicCode            | String               | Topic code from Topic value object     |
| categoryCode         | String               | Category code                          |
| language             | List                 | Enum: Currently only English           |
| level                | Level                | Enum: Beginner, Intermediate, Advanced |
| pricingModel         | PrizingModel         | Enum: Free, Paid                       |
| prize                | Prize                | Course price details                   |
| learningMode         | LearningMode         | Enum: Online, Offline, Hybrid          |
| points               | Integer              | Reward points                          |
| tags                 | List                 | Category tags                          |
| authors              | List                 | List of authors                        |
| publisher            | Publisher            | Publisher details                      |
| publishedOn          | DateTime             | Publish timestamp                      |
| imageUrl             | String               | Cover image URL                        |
| isInMarketplace      | Boolean              | Marketplace status                     |
| status               | Status               | Enum: DRAFT, PUBLISHED, ARCHIVED       |
| duration             | Duration             | Total duration                         |
| sections             | List                 | Structured content                     |
| lessonNavigationMode | LessonNavigationMode | Enum: Flexible, Sequential             |
| version              | Integer              | Course version (integer only)          |
| addedBy              | String               | Creator ID                             |
| updatedBy            | String               | Modifier ID                            |
| addedOn              | DateTime             | Creation time                          |
| updatedOn            | DateTime             | Last modified time                     |

### 3.2 Entity: `Section`

| Attribute   | Type     | Description                |
| ----------- | -------- | -------------------------- |
| sectionId   | UUID     | Unique ID                  |
| title       | String   | Section title              |
| description | String   | Summary                    |
| order       | Integer  | Order in course            |
| lessons     | List     | Lessons in this section    |
| duration    | Duration | Estimated section duration |
| addedBy     | String   | Creator ID                 |
| updatedBy   | String   | Modifier ID                |
| addedOn     | DateTime | Created time               |
| updatedOn   | DateTime | Last modified time         |

### 3.3 Entity: `Lesson`

| Attribute     | Type     | Description          |
| ------------- | -------- | -------------------- |
| lessonId      | UUID     | Unique ID            |
| title         | String   | Lesson title         |
| duration      | Float    | Time estimate        |
| coverImageUrl | String   | Thumbnail image      |
| content       | Content  | Video, PDF, or Quiz  |
| mandatory     | Boolean  | Required to complete |
| addedBy       | String   | Creator ID           |
| updatedBy     | String   | Modifier ID          |
| addedOn       | DateTime | Created time         |
| updatedOn     | DateTime | Last modified time   |

### 3.4 Entity: `Author`

| Attribute | Type     | Description        |
| --------- | -------- | ------------------ |
| authorId  | UUID     | Unique ID          |
| firstName | String   | First name         |
| lastName  | String   | Last name          |
| emailId   | String   | Author’s email     |
| addedBy   | String   | Creator ID         |
| updatedBy | String   | Modifier ID        |
| addedOn   | DateTime | Created time       |
| updatedOn | DateTime | Last modified time |

### 3.5 Entity: `Publisher`

| Field        | Type          | Description               |
| ------------ | ------------- | ------------------------- |
| publisherId  | UUID          | Unique ID                 |
| name         | String        | Name of org/individual    |
| type         | PublisherType | Enum: Company, Individual |
| logoUrl      | String        | Logo URL                  |
| website      | String        | Website URL               |
| contactEmail | String        | Contact email             |
| description  | String        | Optional description      |
| country      | String        | Optional country          |
| addedBy      | String        | Creator ID                |
| updatedBy    | String        | Modifier ID               |
| addedOn      | DateTime      | Created time              |
| updatedOn    | DateTime      | Last modified time        |

### 3.6 Value Object: `Prize`

| Field    | Type     | Description    |
| -------- | -------- | -------------- |
| prize    | Double   | Base price     |
| discount | Integer  | Discount %     |
| currency | Currency | Enum: INR, USD |

### 3.7-3.10 Value Objects: `Content` (Abstract Base) and Subtypes

* **ContentType Enum**: Video, PDF, Quizz
* **VideoContent**: `videoUrl`
* **PDFContent**: `pdfUrl`
* **QuizzContent**: Same fields as Prize

### 3.11 Value Object: `QuizzItem`

* question: String
* options: List
* answerChoice: Enum (Single, Multiple)

### 3.12 Value Object: `AnswerOption`

* answer: String
* isCorrect: Boolean

---

## 4. Domain Services

### `CourseService`

| Method  | Description                                         |
| ------- | --------------------------------------------------- |
| create  | Creates a course, sets metadata and initial version |
| update  | Updates course and its internal structure           |
| publish | Validates and publishes the course                  |
| archive | Archives a course version                           |
| get     | Retrieves course by ID/version/status               |
| list    | Filters and lists courses by tenant/topic/status    |

---

## 5. Repository

### `CourseRepository`

* Backed by **DynamoDB** table `CourseTable`
* Handles aggregate reads/writes (Course + Sections + Lessons)

| Method  | Description                   |
| ------- | ----------------------------- |
| save    | Save or update course         |
| getById | Fetch by ID                   |
| delete  | Delete course                 |
| list    | Filtered list by tenant, etc. |

---

## 6. Domain Events

| Event           | Payload Description                                     |
| --------------- | ------------------------------------------------------- |
| CourseCreated   | courseId, tenantId, title, description, topicCode, etc. |
| CoursePublished | Same as CourseCreated                                   |
| CourseArchived  | courseId, tenantId                                      |

---

## 7. DynamoDB Design

* **Table**: `CourseTable`
* **PK**: `TENANT#<tenantId>#COURSE#<courseId>`
* **SK**: `<status>#<version>` (e.g., PUBLISHED#3)

### Query Flexibility:

* Fetch all versions of a course
* Fetch latest published version
* Filter by DRAFT, ARCHIVED

### GSI

| GSI Name           | Partition Key | Sort Key | Purpose                 |
| ------------------ | ------------- | -------- | ----------------------- |
| GSI\_TenantCourses | tenantId      | courseId | List courses per tenant |

> ⚠️ Filtering by topic, status, etc., is done in application logic to minimize GSI load.

---

## 8. Application Services / Lambda Functions

| Lambda Function | Description                   |
| --------------- | ----------------------------- |
| create          | Creates a new course          |
| update          | Updates structure and details |
| publish         | Publishes the course          |
| archive         | Archives the course           |
| get             | Returns complete course data  |
| list            | Returns filtered course list  |

## **9. API Definitions**

### \`\`

`{ "tenantId": "123", "title": "Intro to Deep Learning", "description": "Basics of DL", "topicCode": "AI", "categoryCode": "ML", "authors": [ { "authorId": "uuid", "firstName": "John", "lastName": "Doe", "emailId": "john@example.com" } ], "tags": ["AI", "Deep Learning"], "language": ["English"], "level": "Beginner", "learningMode": "Online", "pricingModel": "Free", "prize": { "prize": 0.0, "discount": 0, "currency": "INR" }, "points": 100, "publisher": { "publisherId": "pub-001", "name": "SkillVo", "type": "Company", "logoUrl": "https://cdn/logo.png", "website": "https://skillvo.com", "contactEmail": "support@skillvo.com", "description": "Online learning provider", "country": "India" }, "imageUrl": "https://cdn/cover.jpg", "isInMarketplace": true, "status": "DRAFT", "duration": 120, "lessonNavigationMode": "Flexible", "version": 1, "sections": [ { "sectionId": "section-1", "title": "Introduction", "description": "Welcome to the course", "order": 1, "duration": 30, "lessons": [ { "lessonId": "lesson-1", "title": "What is Deep Learning?", "duration": 20.0, "coverImageUrl": "https://cdn/lesson.jpg", "content": { "contentType": "Video", "videoUrl": "https://cdn/lesson.mp4" }, "mandatory": true } ] } ] }`

### \`\`

`{ "tenantId": "123", "courseId": "abc", "title": "Updated Title", "description": "Updated Desc", "tags": ["AI"], "language": ["English"], "pricingModel": "Paid", "prize": { "prize": 199.0, "discount": 10, "currency": "INR" }, "sections": [ { "sectionId": "section-1", "title": "Updated Introduction", "description": "Updated section overview", "order": 1, "duration": 45, "lessons": [ { "lessonId": "lesson-1", "title": "Deep Learning Fundamentals", "duration": 25.0, "coverImageUrl": "https://cdn/lesson-updated.jpg", "content": { "contentType": "Video", "videoUrl": "https://cdn/lesson-updated.mp4" }, "mandatory": true } ] } ] }`

### \`\`

`{ "tenantId": "123", "courseId": "abc" }`

### \`\`

`{ "tenantId": "123", "filters": { "status": "PUBLISHED", "tags": ["AI"], "level": "Beginner" }, "limit": 10, "offset": 0 }`
