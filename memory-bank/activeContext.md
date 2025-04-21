# activeContext.md

## Current Work Focus

- Implementing and refining the theming system for light and dark modes
- Applying theme styles across UI components
- Define functional and technical scope of all modules
- Document folder structure and key responsibilities across apps
- Begin codebase setup with modular Angular CLI scaffolding

## Recent Changes

- Finalized light and dark theme implementation:
  - Removed ocean and classic themes to focus on core light/dark modes
  - Optimized color palettes for better accessibility and contrast
  - Implemented semantic tokens for consistent style application
  - Updated theme manager to handle theme switching and preferences
- Created documentation for project goals, product context, and requirements
- Finalized feature sets across Learn, Hire, Onboard, and Settings apps
- Outlined white-labeling and multi-tenant support as part of architecture

## Next Steps

1. Apply themed styles across all UI components:
   - Ensure consistent theming in shell application layout components
   - Verify dark mode compatibility for all UI elements
   - Create theme-aware component styles for better consistency

2. Set up project structure:
   - Create root `skillvo-web/` folder with `apps/` and `libs/`
   - Generate Learn, Hire, Onboard, and Settings app modules using Angular CLI
   - Scaffold main layout components (header, sidebar, footer) and shell app

3. Install and configure:
   - Angular Material and SCSS-based theming
   - NgRx for state management
   - Routing setup with lazy loading and guards

4. Version control initialization with Git
5. Create initial build and serve scripts
6. AWS Cognito authentication will be configured in later phase after module implementation


## Tooling Strategy

- Nx Workspace will be used to manage apps/libs under a monorepo structure.
- Single deployment strategy through the Shell app, lazy-loading other apps.
- Mobile-first approach to UI/UX development.
- Theme-aware components with CSS custom properties for styling consistency.
- Strict adherence to Angular best practices during all development stages.


## Current Workspace Status

- Theme system implemented with light and dark modes using CSS custom properties
- Two production-ready theme files (_light.scss and _dark.scss) finalized
- Theme manager (_theme-manager.scss) updated to support dynamic theme switching
- Nx Workspace (`skillvo-platform`) is fully initialized.
- Shell app created and operational with Angular routing and SCSS styling.
- Additional apps generated: Learn, Hire, Onboard, Settings with routing modules.
- Shared libraries (`ui-components`, `data-access`, `feature-auth`, `shared-utils`) generated to enforce reusability.
- Feature module structures are scaffolded for each app under `feature-modules/`.
- Layout components (Header, Sidebar, Footer) setup inside Shell app.
- Mobile-first SCSS theming structure is manually created under `/styles`.
- Current focus: Apply theming to components, implement routing integration, layout wiring, and core state management.
