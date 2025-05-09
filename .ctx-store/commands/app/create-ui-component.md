# Angular UI Component Creation Guide

## Overview
This guide provides specifications for creating a new Angular UI component for our component library across different categories (input, selector, navigation, feedback, etc.). The goal is to ensure consistency, maintainability, and accessibility across all components.

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
- Follow the four-tier styling architecture:
  1. **Base Control**: `styles/base/core/_base-control.scss` (universal foundation)
  2. **Category Base**: Appropriate category base class from:
     - Action: `styles/base/core/_action-controls.scss`
     - Selection: `styles/base/core/_selection-controls.scss`
     - Input: `styles/base/core/_input-controls.scss`
     - Navigation: `styles/base/core/_navigation-controls.scss`
     - Feedback: `styles/base/core/_feedback-controls.scss`
     - Information Display: `styles/base/core/_information-display.scss`
     - Data Display: `styles/base/core/_data-display.scss`
     - Containers: `styles/base/core/_containers.scss`
  3. **Component Level**: `styles/components/{category}/{component-name}.scss`
  4. **Angular Component**: Minimal component-specific adjustments in `{component-name}.component.scss`
- Implement BEM methodology for class naming:
  ```
  .sv-{component} (Block)
  .sv-{component}__element (Element)
  .sv-{component}--modifier (Modifier)
  ```
- Use standardized state classes with `.is-` prefix (`.is-disabled`, `.is-active`, etc.)
- Utilize mixins from:
  - `styles/base/utils/mixins/_layout-mixins.scss`
  - `styles/base/utils/mixins/_state-mixins.scss`
  - `styles/base/utils/mixins/_responsive-mixins.scss`
  - `styles/base/utils/mixins/_typography-mixins.scss`
  - `styles/base/utils/mixins/_accessibility-mixins.scss`
- In the Angular component SCSS, extend the component styles rather than duplicating them

## SCSS File Structure
For Angular component SCSS:
```scss
/* component-name.component.scss */
@use 'path-to-styles/components/{category}/{component-name}';

:host {
  display: block;
  
  .sv-{component-name} {
    @extend .sv-{component-name};
    
    // Only component instance-specific adjustments here
  }
}
```

## Component Template Structure
- Create a container element with the appropriate BEM block class
- Include label element when applicable (with appropriate BEM element class)
- Add the core component elements with BEM element classes and appropriate attributes
- Add help text section for guidance and error messages (for form controls)
- Ensure proper accessibility attributes (aria-* attributes)

## Implementation Details
- Include common properties based on the component category
- Add component-specific properties as needed
- Create appropriate getters for computed properties
- Implement helper methods for handling state classes
- Use OnPush change detection strategy
- DO NOT create base Angular component classes for each category - extend the SCSS only

## Class Handling
Use a consistent pattern for handling state classes:
```typescript
get classes(): string[] {
  return [
    'sv-{component-name}',
    this.size ? `sv-{component-name}--${this.size}` : '',
    this.variant ? `sv-{component-name}--${this.variant}` : '',
    this.disabled ? 'is-disabled' : '',
    this.isValid === false ? 'is-invalid' : '',
    this.isValid === true ? 'is-valid' : ''
  ].filter(Boolean);
}
```

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
- Support high contrast mode using the accessibility mixins
- Implement RTL language support where appropriate
- Ensure proper color contrast ratios (minimum 4.5:1 for normal text)
- Test with screen readers (NVDA, JAWS, VoiceOver)

## Responsive Design
- Follow mobile-first approach
- Start with styles for mobile devices
- Use breakpoint mixins for larger screens:
  ```scss
  @include media-breakpoint-up(md) {
    // Styles for medium screens and up
  }
  ```
- Test on multiple device sizes and orientations

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
  - Responsive behavior
- Test all state transitions and edge cases
- Use Harness testing patterns for complex components

## Documentation
- Add JSDoc comments for all public properties, inputs, outputs, and methods
- Include usage examples in the component's README.md
- Document all @Input() and @Output() properties with types and default values
- Provide examples of common use cases and configurations
- Document accessibility features and considerations
- Include information about any dependencies or requirements

## Performance Considerations
- Use OnPush change detection strategy
- Avoid direct DOM manipulation; use Angular's binding mechanisms
- Implement trackBy functions for NgFor loops
- Use pure pipes for computed values instead of methods in templates
- Lazy load complex component dependencies when appropriate
- Avoid unnecessary calculations in change detection cycles

## Export Strategy
- Export components through the public API in `index.ts` files
- Group related components in feature modules
- Follow the barrel pattern for exporting multiple components

## Consistency Checklist
Before submitting your component, verify that:
- All class names follow BEM methodology
- State classes use `.is-` prefix consistently
- Component extends the appropriate category base class
- No styles are duplicated between component and Angular component
- All values use CSS variables, not hardcoded values
- Responsive design is implemented correctly
- Accessibility requirements are met
- Tests cover all key functionality
- Documentation is complete and accurate