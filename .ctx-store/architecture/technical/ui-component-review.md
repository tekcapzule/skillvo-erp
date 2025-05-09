# UI Component Review Checklist

This checklist helps ensure components meet the SkillVo design system standards. Check each item during component review.

## Structure & Organization
- [ ] Located in correct directory (`libs/ui-components/src/lib/components/{category}/{component-name}/`)
- [ ] Files follow naming convention (.component.ts, .component.html, .component.scss, .component.spec.ts)
- [ ] Standalone component with necessary imports
- [ ] Properly exported via index.ts

## Styling Architecture
- [ ] Follows four-tier styling architecture:
  - [ ] Base Control → Category Base → Component → Angular Component
  - [ ] SCSS extends appropriate category base class
  - [ ] No style duplication between layers
- [ ] Uses BEM methodology for class naming (`sv-{component}`, `sv-{component}__element`, `sv-{component}--modifier`)
- [ ] Uses state classes with `.is-` prefix (`.is-disabled`, `.is-active`, etc.)
- [ ] Uses only CSS variables from `styles/abstracts/variables/` - no hardcoded values
- [ ] Minimal component-specific styles in component SCSS - primarily extends global styles

## Implementation
- [ ] Component uses `OnPush` change detection strategy
- [ ] Inputs have appropriate types and default values
- [ ] Events use proper naming conventions
- [ ] Consistent class handling with getter for computed classes
- [ ] No direct DOM manipulation

## Template
- [ ] Container element has appropriate BEM block class
- [ ] Proper nesting of elements with BEM element classes
- [ ] Content projection implemented correctly
- [ ] Clear component architecture (container/content/actions structure if applicable)

## Accessibility
- [ ] WCAG 2.1 AA compliant
- [ ] Proper keyboard navigation support
- [ ] Appropriate ARIA attributes based on component type
- [ ] High contrast mode support
- [ ] RTL language support (if applicable)
- [ ] Proper color contrast ratios (4.5:1+)

## Responsive Design
- [ ] Mobile-first approach
- [ ] Uses breakpoint mixins consistently
- [ ] Properly scales across device sizes
- [ ] Touch targets meet minimum size requirements (44×44px)

## Testing
- [ ] Comprehensive unit tests (80%+ coverage)
- [ ] Tests for all component states and variants
- [ ] Tests for input binding behavior
- [ ] Tests for output event emission
- [ ] Tests for user interactions
- [ ] Tests for accessibility

## Documentation
- [ ] JSDoc comments for public properties, inputs, outputs, and methods
- [ ] Documentation is complete and accurate
- [ ] Usage examples provided

## Performance
- [ ] Avoids expensive calculations in change detection
- [ ] Proper memory management (unsubscribe from observables, etc.)
- [ ] Efficient rendering without unnecessary DOM updates

## Component-Specific Requirements
- [ ] Implements all required features for this component type
- [ ] Follows design specifications
- [ ] Handles edge cases appropriately

## Theming & Customization
- [ ] Supports theme switching
- [ ] Design tokens used consistently 