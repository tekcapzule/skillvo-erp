# productContext.md

## Why This Project Exists

SkillVo addresses a growing need for a unified talent management solution that eliminates fragmented tools across hiring, onboarding, and learning. Most companies rely on disconnected systems which lead to inefficiencies, lack of visibility, and poor user experience. SkillVo brings these under one umbrella with modularity and flexibility.

## Problems It Solves

- Disjointed experiences across hiring, onboarding, and learning
- Manual task management and reporting
- Lack of personalization and tenant-level branding
- Inefficient collaboration between HR, training, and recruitment teams
- Inconsistent UX across tools
- High setup and operational overhead in traditional HR tech

## How It Should Work

SkillVo operates as a web-based multi-tenant SaaS application that allows:
- Recruiters to manage job listings, screen candidates, and conduct tests/interviews
- Learners to track courses, references, tests, tasks, and batch progress
- HR/Admins to onboard employees, assign learning, and track progress
- Tenant-specific branding, content, roles, permissions, and reports

## User Experience Goals

- Intuitive navigation with role-based access and modular menus
- Mobile-first and responsive design across views
- Seamless transitions between apps (Learn, Hire, Onboard, Settings)
- Personalized dashboards and tasks
- White-labeled experience for each tenant
- Accessibility and i18n ready


## Mobile-First Experience

SkillVo is designed to deliver a seamless, responsive mobile experience by following a mobile-first development strategy. Interfaces will adapt fluidly to mobile, tablet, and desktop devices to ensure a consistent user experience across platforms.


## Updated Architecture Context

- SkillVo Talent Management Platform is now structured as an Nx Angular Monorepo for scalable development and maintainability.
- Focus on modular feature separation: Learn, Hire, Onboard, Settings as independent apps.
- Unified user experience through a Shell app with lazy-loaded feature apps.
- Mobile-first development is mandatory to ensure seamless UX across devices.
- Smart/Dumb component pattern enforced for better scalability and reusability.
- Centralized global SCSS theming system across all apps and libraries.
