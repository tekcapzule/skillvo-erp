# Angular UI Component Creation Guide

## Overview
This guide provides specifications for creating a new Angular UI component for our component library across different categories (input, selector, navigation, feedback, etc.).

## Component Structure and Location
- Create the component in `libs/ui-components/src/lib/components/{category}/{component-name}/`
- Follow the standard naming pattern:
  - `{component-name}.component.html`
  - `{component-name}.component.scss`
  - `{component-name}.component.ts`
  - `{component-name}.component.spec.ts`
- Make the component standalone with CommonModule and necessary module imports

## Styling Guidelines
- Use only CSS variables defined in `styles/abstracts/variables/` - no hardcoded values
- Follow the three-tier styling hierarchy:
  1. Core base styles from `styles/base/core/_base-control.scss`
  2. Category-specific base styles:
    - Input: `styles/base/core/_input-controls.scss`
     - Selection: `styles/base/core/_selection-controls.scss`
     - Navigation: `styles/base/core/_navigation-controls.scss`
     - Feedback: `styles/base/core/_feedback-controls.scss`
     - Action: `styles/base/core/_action-controls.scss`
     - Information Display: `styles/base/core/_information-display.scss`
     - Data Display: `styles/base/core/_data-display.scss`
     - Containers: `styles/base/core/_containers.scss`
  3. Component-specific styles under `styles/components/{category}/{component-name}.scss`
- Utilize mixins from:
  - `styles/abstracts/_mixins.scss`
  - Appropriate base control SCSS files
- For responsive design, use the breakpoint mixins provided in `_mixins.scss`

## Component Template Structure
- Create a container div with appropriate class names
- Include label element when applicable
- Add the core component elements with appropriate attributes
- Add help text section for guidance and error messages (for form controls)
- Ensure proper accessibility attributes (aria-* attributes)

## Implementation Details
- Include common properties based on the component category
- Add component-specific properties as needed
- Create appropriate getters for computed properties
- Implement helper methods for class bindings
- Use OnPush change detection strategy where appropriate

## Properties to Include
- Standard base component properties (inherited from the appropriate base class)
- Component-specific properties relevant to its category and function
- Validation-related properties (for form controls)
- Appearance configuration

## Component Metadata
- Use selector prefix `sv-` (e.g., `sv-text-field`, `sv-dropdown`, `sv-nav-bar`)
- Implement standalone component with necessary imports
- Include proper providers for form integration (when applicable)
- Follow existing component patterns in the codebase for consistency

## Accessibility Requirements
- Ensure all components meet WCAG 2.1 AA standards
- Implement proper keyboard navigation and focus management
- Include appropriate ARIA attributes based on component type:
  - For inputs: aria-invalid, aria-required, aria-describedby
  - For selectors: aria-expanded, aria-selected, aria-controls
  - For navigation: aria-current
  - For feedback: aria-live, aria-atomic
- Ensure proper color contrast ratios (minimum 4.5:1 for normal text)
- Test with screen readers (NVDA, JAWS, VoiceOver)

## Testing Requirements
- Create spec file (`{component-name}.component.spec.ts`) with comprehensive unit tests
- Minimum test coverage: 80%
- Test scenarios to include:
  - Component creation
  - Input property behavior
  - Output event emission
  - User interactions (click, keyboard, focus)
  - State changes and rendering updates
  - Accessibility compliance
- Use Harness testing patterns for complex components

## Documentation
- Add JSDoc comments for all public properties, inputs, outputs, and methods
- Include usage examples in the component's README.md
- Document all @Input() and @Output() properties with types and default values
- Provide examples of common use cases and configurations
- Include information about any dependencies or requirements

## Performance Considerations
- Use OnPush change detection strategy for complex components
- Avoid direct DOM manipulation; use Angular's binding mechanisms
- Implement trackBy functions for NgFor loops
- Use pure pipes for computed values instead of methods in templates
- Lazy load complex component dependencies when appropriate

## Export Strategy
- Export components through the public API in `index.ts` files
- Group related components in feature modules
- Follow the barrel pattern for exporting multiple components

## State Management
- Keep component state localized when possible
- For shared state, use services or state management libraries
- Document state dependencies and interactions

## Versioning and Deprecation
- Follow semantic versioning (MAJOR.MINOR.PATCH)
- Mark deprecated features with @deprecated JSDoc tag
- Include migration path in deprecation notices
- Maintain backwards compatibility within the same major version