# techContext.md

## Technology Stack

### Frontend
- **Framework**: Angular (latest LTS version)
- **State Management**: NgRx for predictable and testable state management
- **UI Components**: Angular Material with custom reusable UI elements
- **Styling**: SASS with theming support and responsive SCSS variables
- **Reactive Programming**: RxJS
- **Internationalization**: ngx-translate
- **Forms**: Reactive Forms + custom form validations

### Authentication & Authorization
- **Authentication Provider**: AWS Cognito User Pools (configured after module setup)
- **Authorization**: Role-based access control (RBAC) using JWT tokens
- **Multi-tenancy**: Tenant ID embedded in JWT tokens and scoped via API headers

### Deployment
- **Hosting**: AWS S3
- **CDN**: AWS CloudFront
- **DNS**: Route53 with custom domain mapping
- **SSL**: AWS Certificate Manager for HTTPS setup

---

## Code Organization

### Monorepo
- Angular CLI workspace using structured `apps/` and `libs/`
- Central shell application hosting all lazy-loaded modules

### Modules
- **Feature-based slicing**: Learn, Hire, Onboard, Settings as independent Angular modules
- **Lazy loading** for performance and modular independence

### Libraries
- **UI Components**: Shared Angular Material components and layout templates
- **Data Access**: NgRx stores, selectors, effects, and service facades
- **Auth**: Guards, interceptors, token handlers
- **Utils**: Shared formatters, validators, date utils

---

## Architecture Principles

- Modular and reusable codebase
- Smart/dumb component split
- Strict separation of concerns
- Unidirectional data flow via NgRx
- Feature-level isolation of routing and state
- White-labeling and theming support per tenant

---

## Performance Optimization

### Loading Strategy
- Lazy loading via route-based chunking
- Preload likely user flows using custom strategies

### Runtime Optimization
- OnPush change detection
- Memoized selectors
- Debounced inputs
- Optimized loop handling (trackBy)

### Bundle Strategy
- Differential loading
- Tree-shaking and dead code elimination
- Asset compression and image optimization

---

## Testing Strategy

- **Unit Testing**: Jest for services, components, pipes
- **Integration Testing**: NgRx integration, feature routing
- **E2E Testing**: Cypress for user flows
- **Visual Testing**: Storybook for isolated component rendering

---

## CI/CD Pipeline

- GitHub Actions for test, build, and linting
- Auto-format with Prettier and ESLint
- Environment-based deploy targets (dev/staging/prod)
- Smoke tests post-deployment

---

## Security

### Frontend
- Content Security Policy (CSP)
- JWT token handling with auto-refresh
- XSRF protection
- Secure storage of tokens

### API Integration
- Auth headers with JWT token
- Rate limiting on endpoints
- Error sanitization

---

## Developer Conventions

### Naming
- **Components**: `ComponentNameComponent`
- **Services**: `ServiceNameService`
- **Interfaces**: `IName`
- **Enums**: `EnumName`
- **Files**: kebab-case

### Style & Tools
- ESLint + Prettier
- Strict TypeScript config
- VS Code recommended extensions

---

## Environment Setup

- Node.js (LTS)
- Angular CLI (latest stable)
- Local development: `ng serve shell`
- Build command: `ng build shell --configuration production`


---

## Naming Conventions

### File Names
- Use **kebab-case**: `user-profile.component.ts`
- Include file type suffix: `.component.ts`, `.service.ts`, `.pipe.ts`, etc.
- Be concise and descriptive

### Component Naming
- Use **PascalCase** for class names: `UserProfileComponent`
- Use **kebab-case** for selectors: `app-user-profile`
- Always suffix with `Component`

### Service Naming
- Use **PascalCase**: `UserDataService`
- Suffix with `Service`

### Interface Naming
- Use **PascalCase**: `UserProfile`
- Prefix with `I` only if needed: `IUserProfile` (optional for clarity)

### Directive Naming
- Selector in **camelCase**: `appHighlight`
- Class in **PascalCase**: `HighlightDirective`
- Prefix with app prefix: `app-`

### Module Naming
- Use **PascalCase**: `UserModule`
- Suffix with `Module`: `SharedModule`, `CoreModule`

### Constants & Enums
- **Constants**: `UPPER_SNAKE_CASE`: `API_ENDPOINT`
- **Enum names**: `PascalCase`: `UserRole`
- **Enum values**: `PascalCase`: `UserRole.Admin`

### Method & Property Naming
- Use **camelCase**: `getUserProfile()`, `userName`
- Boolean fields prefixed with `is`, `has`, `should`: `isActive`, `hasPermission`
- Event handlers: prefix with `on`: `onClick()`, `onSubmit()`

### NgRx State Management
- **Actions**: Bracket format: `[Auth] Login Success`
- **Reducers**: `camelCase`: `authReducer`
- **Selectors**: Prefix with `select`: `selectCurrentUser`
- **Effects**: Suffix with `Effects`: `AuthEffects`


---

## Project Folder Structure

Below is the proposed folder structure for the SkillVo Angular monorepo:

```
skillvo-platform/                       # Root workspace directory
├── apps/                              # Container for all applications
│   ├── shell/                         # Main application shell
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── core/              # Core shell functionality
│   │   │   │   ├── layout/            # Main layout components
│   │   │   │   │   ├── header/        # Global header with navigation
│   │   │   │   │   ├── sidebar/       # Sidebar navigation
│   │   │   │   │   └── footer/        # Global footer
│   │   │   │   ├── app.module.ts      # Main app module
│   │   │   │   └── app-routing.module.ts # Routes to lazy-load modules
│   │   │   └── styles/                # Shell-specific styles
│   │   └── project.json               # Shell configuration
│   ├── learn/                         # Learning Management System
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── feature-modules/   # Learn app features
│   │   │   │   │   ├── courses/       # Course management
│   │   │   │   │   ├── learning-paths/ # Learning paths 
│   │   │   │   │   ├── assessments/   # Tests and assessments
│   │   │   │   │   └── reports/       # Learning analytics
│   │   │   │   ├── learn.module.ts    # Learn feature module
│   │   │   │   └── learn-routing.module.ts # Learn routing
│   │   │   └── styles/                # Learn-specific styles
│   │   └── project.json               # Learn configuration
│   ├── hire/                          # Recruitment and Assessment
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── feature-modules/   # Hire app features
│   │   │   │   │   ├── candidates/    # Candidate management
│   │   │   │   │   ├── assessments/   # Technical assessments
│   │   │   │   │   ├── interviews/    # Interview scheduling
│   │   │   │   │   └── reports/       # Hiring analytics
│   │   │   │   ├── hire.module.ts     # Hire feature module
│   │   │   │   └── hire-routing.module.ts # Hire routing
│   │   │   └── styles/                # Hire-specific styles
│   │   └── project.json               # Hire configuration
│   ├── onboard/                       # Employee Onboarding
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── feature-modules/   # Onboard app features
│   │   │   │   │   ├── workflows/     # Onboarding workflows
│   │   │   │   │   ├── documents/     # Document management
│   │   │   │   │   ├── tasks/         # Task management
│   │   │   │   │   └── reports/       # Onboarding analytics
│   │   │   │   ├── onboard.module.ts  # Onboard feature module
│   │   │   │   └── onboard-routing.module.ts # Onboard routing
│   │   │   └── styles/                # Onboard-specific styles  
│   │   └── project.json               # Onboard configuration
│   └── settings/                      # Platform Settings
│       ├── src/
│       │   ├── app/
│       │   │   ├── feature-modules/   # Settings app features
│       │   │   │   ├── users/         # User management
│       │   │   │   ├── tenants/       # Tenant configuration
│       │   │   │   ├── roles/         # Role and permissions
│       │   │   │   └── system/        # System settings
│       │   │   ├── settings.module.ts # Settings feature module
│       │   │   └── settings-routing.module.ts # Settings routing
│       │   └── styles/                # Settings-specific styles
│       └── project.json               # Settings configuration
├── libs/                              # Shared libraries
│   ├── ui-components/                 # Reusable UI components
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── buttons/           # Button components
│   │   │   │   ├── forms/             # Form controls
│   │   │   │   ├── cards/             # Card components
│   │   │   │   ├── modals/            # Modal components
│   │   │   │   └── index.ts           # Public API
│   │   │   └── styles/                # Component styles
│   │   └── project.json               # UI library configuration
│   ├── data-access/                   # State management and services
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── store/             # NgRx store
│   │   │   │   │   ├── actions/       # Global actions
│   │   │   │   │   ├── effects/       # Global effects
│   │   │   │   │   ├── reducers/      # Global reducers
│   │   │   │   │   └── selectors/     # Global selectors
│   │   │   │   ├── services/          # Shared services
│   │   │   │   │   ├── api/           # API services
│   │   │   │   │   ├── auth/          # Auth services
│   │   │   │   │   └── util/          # Utility services
│   │   │   │   └── index.ts           # Public API
│   │   │   └── styles/                # Styles for data components
│   │   └── project.json               # Data access library configuration
│   ├── feature-auth/                  # Authentication features
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── components/        # Auth components
│   │   │   │   ├── services/          # Auth services
│   │   │   │   ├── guards/            # Auth guards
│   │   │   │   └── index.ts           # Public API
│   │   │   └── styles/                # Auth-specific styles
│   │   └── project.json               # Auth library configuration
│   └── shared-utils/                  # Shared utilities
│       ├── src/
│       │   ├── lib/
│       │   │   ├── formatters/        # Data formatters
│       │   │   ├── validators/        # Form validators
│       │   │   ├── localization/      # i18n utilities
│       │   │   └── index.ts           # Public API
│       │   └── styles/                # Utility styles
│       └── project.json               # Utils library configuration
└── styles/                            # Global styling system
    ├── themes/                        # Theme configurations
    │   ├── light/                     # Light theme
    │   │   ├── _colors.scss           # Light theme colors
    │   │   ├── _typography.scss       # Light theme typography
    │   │   └── _components.scss       # Light theme component styles
    │   ├── dark/                      # Dark theme
    │   │   ├── _colors.scss           # Dark theme colors
    │   │   ├── _typography.scss       # Dark theme typography
    │   │   └── _components.scss       # Dark theme component styles
    │   └── _theme-manager.scss        # Theme switching logic
    ├── base/                          # Base styles
    │   ├── _reset.scss                # CSS reset
    │   ├── _typography.scss           # Typography styles
    │   └── _layout.scss               # Layout styles
    └── variables/                     # Global SCSS variables
        ├── _colors.scss               # Color variables
        ├── _spacing.scss              # Spacing variables
        └── _breakpoints.scss          # Responsive breakpoints
```



---

## Angular Development Best Practices

- No inline templates or inline styles; always use `templateUrl` and `styleUrls`.
- Follow Smart (container) vs Dumb (presentational) component separation.
- Use `OnPush` change detection wherever possible for better performance.
- Enable strict TypeScript checks (`"strict": true` in tsconfig).
- Prefer Observables over Promises for reactive flows.
- Use `async` pipe for automatic subscription management in templates.
- Avoid creating "God Components" that are too large or complex.
- Segregate services logically: one responsibility per service.
- Centralize error handling using HTTP interceptors.
- Maintain consistent naming conventions across components, services, directives, and libraries.


---

## Smart vs Dumb Components Architecture

SkillVo enforces the Smart-Dumb component architecture pattern:

- **Smart (Page) Components**: Located in `pages/`, handle API/store communication, state management, and orchestrate dumb components.
- **Dumb (Presentational) Components**: Located in `components/`, purely concerned with display, input properties, and event output. No direct service or store calls allowed.

This separation improves testability, scalability, and team collaboration.

### Folder Structure Enrichment

Each feature module (e.g., courses, jobs, onboarding workflows) will be organized as:

```
feature-modules/
  └── <feature-name>/
      ├── pages/         # Smart containers
      ├── components/    # Dumb presentational components
      ├── feature.module.ts
      ├── feature-routing.module.ts
```

Smart components drive the feature logic; dumb components render reusable UI blocks.


---

## Updated Technical Context (April 2025)

- SkillVo Talent Management Platform is structured as an Nx Angular Monorepo.
- Core applications: Shell, Learn, Hire, Onboard, Settings.
- Shared libraries:
  - `ui-components`: Reusable UI presentation components (buttons, forms, cards, modals)
  - `data-access`: NgRx store modules, API services, effect handling
  - `feature-auth`: Authentication services, guards, login components
  - `shared-utils`: Validators, formatters, localization helpers
- SCSS-based mobile-first theming implemented with theme manager and base styles.
- No third-party proprietary UI libraries (like Syncfusion); only open-source Angular Material components extended via `ui-components` library.
- Shell app manages global layout (Header, Sidebar, Footer) and routes to feature apps.
- Nx workspace orchestrates build, serve, lint, and test commands efficiently across apps/libs.
