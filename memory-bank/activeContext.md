# activeContext.md

## Current Work Focus

- Define functional and technical scope of all modules
- Document folder structure and key responsibilities across apps
- Begin codebase setup with modular Angular CLI scaffolding

## Recent Changes

- Created documentation for project goals, product context, and requirements
- Finalized feature sets across Learn, Hire, Onboard, and Settings apps
- Outlined white-labeling and multi-tenant support as part of architecture

## Next Steps

1. Set up project structure:
   - Create root `skillvo-web/` folder with `apps/` and `libs/`
   - Generate Learn, Hire, Onboard, and Settings app modules using Angular CLI
   - Scaffold main layout components (header, sidebar, footer) and shell app

2. Install and configure:
   - Angular Material and SCSS-based theming
   - NgRx for state management
   - Routing setup with lazy loading and guards

3. Version control initialization with Git
4. Create initial build and serve scripts
5. AWS Cognito authentication will be configured in later phase after module implementation


## Tooling Strategy

- Nx Workspace will be used to manage apps/libs under a monorepo structure.
- Single deployment strategy through the Shell app, lazy-loading other apps.
- Mobile-first approach to UI/UX development.
- Strict adherence to Angular best practices during all development stages.


## Current Workspace Status

- Nx Workspace (`skillvo-platform`) is fully initialized.
- Shell app created and operational with Angular routing and SCSS styling.
- Additional apps generated: Learn, Hire, Onboard, Settings with routing modules.
- Shared libraries (`ui-components`, `data-access`, `feature-auth`, `shared-utils`) generated to enforce reusability.
- Feature module structures are scaffolded for each app under `feature-modules/`.
- Layout components (Header, Sidebar, Footer) setup inside Shell app.
- Mobile-first SCSS theming structure is manually created under `/styles`.
- Current focus: Implement routing integration, layout wiring, and core state management.
