# SkillVo Talent Management Platform

A unified, multi-tenant talent management system covering the full lifecycle: hiring, onboarding, training, and administration.

## Overview

SkillVo addresses the need for a unified talent management solution that eliminates fragmented tools across hiring, onboarding, and learning. Built as an Angular monorepo, it provides modular applications for different aspects of talent management:

- **Learn** - Learning management system
- **Hire** - Recruitment and assessment platform
- **Onboard** - Employee onboarding workflows
- **Settings** - Platform administration and configuration

## Architecture

- Angular monorepo managed with Nx
- Shell application providing global layout and navigation
- Feature applications lazy-loaded as needed
- Shared libraries for UI components, data access, authentication, and utilities
- Mobile-first design approach
- AWS Cognito for authentication
- Multi-tenant with white-labeling support

## Prerequisites

- Node.js (LTS version)
- npm or yarn
- Angular CLI
- Nx CLI

## Getting Started

### Installation

```bash
# Clone the repository
git clone [repository-url]
cd skillvo-web

# Install dependencies
npm install
```

### Development Server

```bash
# Serve the shell application
npx nx serve shell

# Serve a specific feature application
npx nx serve learn
npx nx serve hire
npx nx serve onboard
npx nx serve settings
```

### Building

```bash
# Build the shell application (includes all feature apps)
npx nx build shell --configuration=production

# Build a specific feature application
npx nx build learn --configuration=production
```

## Development Guidelines

### Code Structure

- Smart components (with data access) in `pages/` directories
- Dumb components (UI only) in `components/` directories
- Follow mobile-first responsive design in all UI components
- Maintain strict separation between UI and business logic

### Naming Conventions

- Use kebab-case for filenames: `user-profile.component.ts`
- Use PascalCase for class names: `UserProfileComponent`
- Use kebab-case for selectors with appropriate prefix: `app-user-profile`
- Use camelCase for methods and properties: `getUserProfile()`, `userName`

### Testing

```bash
# Run unit tests
npx nx test [project-name]

# Run end-to-end tests
npx nx e2e [project-name-e2e]
```

## Contributing

- Follow the established code patterns and naming conventions
- Write unit tests for new functionality
- Ensure all code passes linting and testing before submitting PRs
- Follow conventional commit format for all commits

## License

[License information]
