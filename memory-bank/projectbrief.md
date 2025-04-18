# projectbrief.md

## Project Name
SkillVo Talent Management Platform

## Project Goal
To build a unified, multi-tenant talent management system that covers the full lifecycle: hiring, onboarding, training, and administration, deployed as a scalable Angular monorepo.

## Key Requirements
- Modular apps: Learn, Hire, Onboard, Settings
- Single codebase (monorepo) with lazy loading
- AWS Cognito authentication and multi-tenant context
- Internationalization, theming, and accessibility support
- White-labeling support per tenant (custom logos, themes, URL routing)
- Admin panel for managing users, roles, companies, and configurations
- Learner dashboard and activity tracking
- Course management with assessments, references, reports
- Onboarding workflows with tasks, learning modules, and deadlines
- Full recruitment workflow: job posting, CV screening, tests, interviews, and reports

## Scope
- Web-only frontend for learners, recruiters, admins
- Integrated LMS, ATS, onboarding workflows
- Admin-controlled branding and access control


## Additional Technical Goals
- Mobile-first development approach; responsive for mobile, tablet, and desktop.
- Single unified deployment via a Shell application, lazy-loading feature apps.
- Managed through an Nx workspace (structured apps/libs monorepo).


## Updated Workspace Setup (April 2025)

- Nx workspace created using the Angular Monorepo preset (`--preset=angular-monorepo`).
- Shell app (`shell`) acts as the root container application.
- Additional applications created: `learn`, `hire`, `onboard`, `settings`.
- Shared libraries created:
  - `ui-components` (reusable UI components)
  - `data-access` (state management and services)
  - `feature-auth` (authentication and authorization features)
  - `shared-utils` (formatters, validators, localization utilities)
- Global SCSS styles organized manually under `styles/` directory with themes and variables.
- Mobile-first responsive design enforced.
- Smart (Page) vs Dumb (UI) component architecture followed across all feature modules.
- Single unified deployment strategy via Shell app with lazy-loaded feature modules.
