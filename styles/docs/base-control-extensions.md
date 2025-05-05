# SkillVo Base Control Extension Documentation

This document outlines the extension points and boundaries between the styling architecture layers in the SkillVo design system.

## Three-Tier Styling Architecture

```
┌────────────────────────┐
│ Component-specific     │ e.g., sv-button, sv-checkbox, sv-input
│ sv-{component}         │ Specific visual design & variants
└────────────┬───────────┘
             │
┌────────────▼───────────┐
│ Category Base          │ e.g., sv-action-control-base, sv-input-control-base
│ sv-{category}-base     │ Category-specific behavior & structure
└────────────┬───────────┘
             │
┌────────────▼───────────┐
│ Base Control           │ sv-ui-control-base
│ sv-ui-control-base     │ Common interactive behavior & structure
└────────────────────────┘
```

## Base Control Extension Points

The `sv-ui-control-base` class is designed to be extended through several well-defined extension points:

### 1. Box Model Extensions

```scss
.sv-{category}-base {
  @extend .sv-ui-control-base;
  
  // Adjust basic box model properties
  height: var(--sv-category-height, $control-height-md);
  padding: var(--sv-category-padding-y, var(--sv-space-2)) 
           var(--sv-category-padding-x, var(--sv-space-3));
  margin: var(--sv-category-margin, 0);
}
```

### 2. Visual Styling Extensions

```scss
.sv-{category}-base {
  @extend .sv-ui-control-base;
  
  // Adjust visual appearance
  border-radius: var(--sv-category-radius, var(--sv-radius-md));
  border-width: var(--sv-category-border-width, 1px);
  box-shadow: var(--sv-category-shadow, none);
}
```

### 3. State Handling Extensions

```scss
.sv-{category}-base {
  @extend .sv-ui-control-base;
  
  // Override state behaviors if needed
  &:hover:not(:disabled):not(.disabled):not([readonly]):not(.readonly) {
    background-color: var(--sv-category-hover-bg, var(--sv-bg-element-hover));
  }
  
  // Add category-specific states
  &.active {
    background-color: var(--sv-category-active-bg, var(--sv-primary-light));
  }
}
```

### 4. Layout & Positioning Extensions

```scss
.sv-{category}-base {
  @extend .sv-ui-control-base;
  
  // Change layout behavior
  display: var(--sv-category-display, inline-flex);
  flex-direction: var(--sv-category-direction, row);
  
  // Category-specific layout
  gap: var(--sv-category-gap, var(--sv-space-2));
}
```

### 5. Typography Extensions

```scss
.sv-{category}-base {
  @extend .sv-ui-control-base;
  
  // Customize typography
  font-size: var(--sv-category-font-size, var(--sv-font-size-md));
  font-weight: var(--sv-category-font-weight, var(--sv-font-weight-medium));
  text-transform: var(--sv-category-text-transform, none);
}
```

## Layer Boundaries & Responsibilities

### 1. Base Control Layer (sv-ui-control-base)

**Responsibilities:**
- Basic box model setup
- Common interactive behaviors
- Default state styling
- Basic structure & layout
- Accessibility foundation
- Touch target sizing

**Should NOT include:**
- Category-specific layouts
- Component-specific visual design
- Domain-specific behaviors
- Custom variant styling

### 2. Category Base Layer (sv-{category}-base)

**Responsibilities:**
- Category-specific layouts
- Common behavior patterns for category
- Shared state management for category
- Extended accessibility for category
- Category-specific structure

**Should NOT include:**
- Component-specific visual design
- Variant/theme specific styling
- Hard-coded values not from design tokens
- Implementation-specific details

### 3. Component Layer (sv-{component})

**Responsibilities:**
- Specific visual design
- Component variants
- Component-specific animations
- Implementation details
- Size variations
- Theme adaptations

**Should NOT include:**
- Core interactive behaviors already defined at base level
- Category behaviors already defined at category level
- Duplication of base or category styles

## Extension Guidelines

1. **Always extend in order**: Components should extend category bases, which extend the base control
2. **Use design tokens**: Never hardcode values that should come from design tokens
3. **Override thoughtfully**: Only override base styles when necessary for the category/component
4. **Document extensions**: Document any non-obvious extensions or overrides
5. **Maintain boundaries**: Respect the separation of concerns between layers

By following these extension patterns and respecting layer boundaries, we maintain a clean, maintainable styling architecture that promotes consistency while allowing for specific component variations. 