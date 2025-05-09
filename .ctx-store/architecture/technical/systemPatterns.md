# System Patterns

This document outlines the core design patterns, architecture principles, and component relationships used in the SkillVo Talent Management Platform. This serves as a reference for Cursor AI IDE to understand the system structure.

## Design Patterns in Use

### 1. Module Federation Pattern
- **Implementation**: The platform uses a shell application that lazy-loads feature modules (Learn, Hire, Onboard, Settings)
- **Purpose**: Enables independent development of features while maintaining a unified application experience
- **Key Locations**: 
  - `apps/shell/src/app/app-routing.module.ts` - Module loading configuration
  - Each feature module exports through its main module file (e.g., `LearnModule`)

### 2. Container-Presenter Pattern
- **Implementation**: Components are divided into container components (managing state) and presenter components (UI rendering)
- **Purpose**: Separation of concerns, improved testability, and reusability
- **Key Locations**: Throughout feature modules in component architecture

### 3. Repository Pattern
- **Implementation**: Data access layer abstracts data sources behind service interfaces
- **Purpose**: Isolates business logic from data access implementation details
- **Key Locations**: `libs/data-access/src/lib/services/api/`

### 4. Facade Pattern
- **Implementation**: Service facades that simplify complex subsystem interactions
- **Purpose**: Provides simplified interfaces to complex subsystems
- **Key Locations**: Each feature module has service facades that coordinate with NgRx and API services

### 5. Observer Pattern
- **Implementation**: Reactive programming using RxJS Observables throughout the application
- **Purpose**: Handles asynchronous operations and propagates state changes
- **Key Locations**: NgRx effects, services, and component subscriptions

### 6. Strategy Pattern
- **Implementation**: Pluggable strategies for features like authentication, theming, and localization
- **Purpose**: Allows for runtime switching between different algorithms or processes
- **Key Locations**: 
  - `libs/feature-auth/src/lib/services/`
  - Theme service implementation

### 7. Guard Pattern
- **Implementation**: Route guards protect access to specific routes based on authentication and authorization
- **Purpose**: Security and controlled navigation
- **Key Locations**: `AuthGuard`, `AdminGuard` in routing configuration

### 8. Singleton Pattern
- **Implementation**: Services provided at root level as application-wide singletons
- **Purpose**: Ensures a single instance of services for state management and shared functionality
- **Key Locations**: Services with `providedIn: 'root'` annotations

### 9. Command Pattern
- **Implementation**: Actions in NgRx represent commands to modify state
- **Purpose**: Encapsulates state modification requests
- **Key Locations**: Action files in store implementation

## Component Relationships

### Application Shell and Feature Modules

```
Shell Application
    ├── Provides: Global layout, navigation, authentication
    ├── Consumes: Nothing from feature modules (one-way dependency)
    └── Relationship: Parent container that hosts feature modules
        ├── Learn Module
        │   ├── Provides: LMS functionality
        │   ├── Consumes: Auth services, UI components, shared utilities
        │   └── Relationship: Lazy-loaded child module with isolated state
        │
        ├── Hire Module
        │   ├── Provides: Recruitment functionality
        │   ├── Consumes: Auth services, UI components, shared utilities
        │   └── Relationship: Lazy-loaded child module with isolated state
        │
        ├── Onboard Module
        │   ├── Provides: Employee onboarding functionality
        │   ├── Consumes: Auth services, UI components, shared utilities
        │   └── Relationship: Lazy-loaded child module with isolated state
        │
        └── Settings Module
            ├── Provides: System configuration functionality
            ├── Consumes: Auth services, UI components, shared utilities
            └── Relationship: Lazy-loaded child module with isolated state
```

### Shared Libraries

```
UI Components Library
    ├── Provides: Reusable UI components
    ├── Consumes: Nothing (zero dependencies outside Angular framework)
    └── Relationship: Used by all modules, no knowledge of consumers

Data Access Library
    ├── Provides: State management and API services
    ├── Consumes: Nothing from application modules
    └── Relationship: Used by all modules for data management

Feature Auth Library
    ├── Provides: Authentication components and services
    ├── Consumes: Data access services
    └── Relationship: Used by shell and feature modules for auth

Shared Utils Library
    ├── Provides: Utility functions and helpers
    ├── Consumes: Nothing (zero dependencies)
    └── Relationship: Used by all other libraries and modules
```

### State Management Relationships

```
Global State (AppState)
    ├── Provides: Auth state, UI state, configuration
    ├── Accessible by: All modules
    └── Relationship: Parent state to feature states

Feature States (e.g., LearnState)
    ├── Provides: Feature-specific state
    ├── Accessible by: Only the respective feature module
    └── Relationship: Isolated state registered only when module is loaded
```

### Authentication Flow

```
User → Shell Authentication → Cognito Authentication → JWT Token Storage → API Authorization
```

### Theme Management Flow

```
Theme Selection → Theme Service → Store Theme Preference → Apply Theme CSS → Component Styling
```

## Cross-Cutting Concerns

### 1. Multi-tenancy
- **Implementation**: Tenant context maintained in JWT tokens and state
- **Flow**: 
  ```
  User Login → Tenant Selection → Set Tenant Context → API Requests Include Tenant → UI Customized per Tenant
  ```

### 2. Internationalization
- **Implementation**: Translation files managed by feature with common shared translations
- **Flow**:
  ```
  User Language Preference → Load Language Files → Apply Translations → UI Renders in Selected Language
  ```

### 3. Error Handling
- **Implementation**: Centralized error handling with specific error states per feature
- **Flow**:
  ```
  Error Occurs → Error Intercepted → Error State Updated → UI Shows Appropriate Message
  ```

### 4. Performance Optimization
- **Implementation**: Lazy loading, preloading strategies, bundle optimization
- **Flow**:
  ```
  Initial App Load → Load Shell → User Navigation → Lazy Load Module → Preload Likely Next Modules
  ```


## Nx Workspace and Shell Deployment Pattern

- Nx Workspace manages all applications (Learn, Hire, Onboard, Admin) and libraries under a monorepo.
- Shell app acts as a single point of entry; lazy-loads feature modules at runtime.
- Supports a single production deployment via the built Shell application.

## Mobile-First Design Pattern

- SCSS media queries prioritize mobile screen sizes first, then progressively enhance for tablet and desktop.
- All UI components and layouts must ensure responsive behavior from mobile upwards.


## Smart vs Dumb Component Pattern

- **Smart Components (Pages)**: Located under `pages/`, handle data fetching, orchestration, and coordination between dumb components.
- **Dumb Components (UI)**: Located under `components/`, purely presentational, accept `@Input()` properties, emit `@Output()` events, and have no direct dependency on services or store.
- **Communication**: Smart components bind data to dumb components and handle emitted events from them.

### Folder Structure Example

```
feature-modules/
  └── courses/
      ├── pages/
      │   ├── courses-list-page.component.ts (smart)
      │   ├── course-detail-page.component.ts (smart)
      ├── components/
      │   ├── course-card.component.ts (dumb)
      │   ├── course-progress-bar.component.ts (dumb)
      ├── courses.module.ts
      ├── courses-routing.module.ts
```

Smart components orchestrate data → Dumb components present UI.


## Nx Monorepo Project Structure

SkillVo now follows an Nx monorepo design with the following structure:

- `apps/`
  - `shell/` (main container app)
  - `learn/` (learning management app)
  - `hire/` (recruitment management app)
  - `onboard/` (employee onboarding app)
  - `settings/` (admin settings app)
- `libs/`
  - `ui-components/` (reusable Angular Material-based UI components)
  - `data-access/` (state management, API services, store modules)
  - `feature-auth/` (authentication services, guards, components)
  - `shared-utils/` (shared utility modules like formatters, validators)
- `styles/`
  - `themes/` (light and dark themes)
  - `base/` (typography, layout, reset styles)
  - `variables/` (SCSS variables for colors, spacing, breakpoints)

Shell app lazy-loads feature modules at runtime, ensuring optimal initial bundle sizes and scalability.

## Development Principles

- Mobile-first SCSS theming mandatory for all pages and components.
- Smart (container) and Dumb (presentational) component architecture across all apps.
- Consistent folder and naming conventions applied across workspace.
