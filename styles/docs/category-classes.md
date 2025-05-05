# SkillVo Category Base Classes Documentation

This document provides detailed information on the various category base classes in the SkillVo design system. Each category class extends the core `sv-ui-control-base` with functionality specific to that control category.

## Category Overview

The SkillVo design system organizes UI controls into the following categories:

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

## 1. Action Controls (`sv-action-control-base`)

**Purpose:** Provides the foundation for all action-triggering UI components like buttons, links, and icon buttons.

**Extension Points:**

```scss
.sv-action-control-base {
  @extend .sv-ui-control-base;
  
  // Box model adjustments
  min-width: var(--sv-min-touch-target);
  padding-left: calc(var(--sv-space-3) * $action-padding-x-factor);
  padding-right: calc(var(--sv-space-3) * $action-padding-x-factor);
  
  // Action-specific interaction models
  cursor: pointer;
  user-select: none;
  
  // Content layout
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--sv-space-2);
  white-space: nowrap;
  
  // Action states
  &:hover:not(:disabled):not(.disabled) { ... }
  &:active:not(:disabled):not(.disabled) { ... }
  
  // Variants
  &.sv-action-primary { ... }
  &.sv-action-secondary { ... }
  &.sv-action-tertiary { ... }
  &.sv-action-destructive { ... }
}
```

**Key Features:**
- Centralized cursor pointer behavior
- Action-specific hover/active states
- Icon and text layout support
- Support for various emphasis levels (primary, secondary, tertiary)
- Special handling for destructive actions
- Consistent padding and sizing

## 2. Selection Controls (`sv-selection-control-base`)

**Purpose:** Provides the foundation for input controls that allow users to select from predefined options, such as checkboxes, radio buttons, and toggle switches.

**Extension Points:**

```scss
.sv-selection-control-base {
  @extend .sv-ui-control-base;
  
  // Layout structure
  position: relative;
  display: inline-flex;
  align-items: center;
  
  // Reset certain base control properties
  background-color: transparent;
  padding: 0;
  border: none;
  
  // Hidden input handling
  &__input { ... }
  
  // Visual control element
  &__control { ... }
  
  // Label text
  &__label { ... }
  
  // Control states
  &.has-error { ... }
  &.has-success { ... }
}
```

**Key Features:**
- Accessible structure with visually hidden inputs
- Support for label + control pairs
- Selection state indicators (checkmark, dot, etc.)
- Validation state styling
- Support for checkbox, radio, and switch variations

## 3. Input Controls (`sv-input-control-base`)

**Purpose:** Provides the foundation for text-based input controls like text fields, text areas, and select dropdowns.

**Extension Points:**

```scss
.sv-input-control-base {
  @extend .sv-ui-control-base;
  
  // Box model and appearance
  width: 100%;
  padding: var(--sv-space-2) var(--sv-space-3);
  
  // Text appearance
  text-align: left;
  
  // Input structure and components
  &__field { ... }
  &__label { ... }
  &__helper-text { ... }
  
  // State styling
  &.has-error { ... }
  &.has-success { ... }
  &.is-readonly { ... }
}
```

**Key Features:**
- Full-width layout by default
- Text alignment appropriate for input fields
- Support for floating labels
- Helper/error text positioning
- Input states (focus, empty, filled)

## 4. Navigation Controls (`sv-navigation-control-base`)

**Purpose:** Provides the foundation for navigation-related components like tabs, pagination, and breadcrumbs.

**Extension Points:**

```scss
.sv-navigation-control-base {
  @extend .sv-ui-control-base;
  
  // Navigation-specific layout
  display: inline-flex;
  
  // Interactive state
  cursor: pointer;
  
  // Active state
  &.active { ... }
  
  // Disabled state
  &.disabled { ... }
}
```

**Key Features:**
- Distinguishable active/current state
- Hover interaction appropriate for navigation
- Support for hierarchical relationships
- Directional indicators where appropriate

## 5. Feedback Controls (`sv-feedback-control-base`)

**Purpose:** Provides the foundation for components that communicate system state, like alerts, toasts, and progress indicators.

**Extension Points:**

```scss
.sv-feedback-control-base {
  @extend .sv-ui-control-base;
  
  // Feedback control appearance
  width: 100%;
  border-radius: var(--sv-radius-md);
  padding: var(--sv-space-3);
  
  // Content layout
  display: flex;
  align-items: center;
  
  // Type variants
  &.sv-feedback-info { ... }
  &.sv-feedback-success { ... }
  &.sv-feedback-warning { ... }
  &.sv-feedback-error { ... }
}
```

**Key Features:**
- Status-appropriate coloring
- Icon + text layout
- Dismissible actions where appropriate
- Animated entrances/exits
- Various importance levels

## 6. Information Display (`sv-information-display-base`)

**Purpose:** Provides the foundation for content display components that aren't interactive, such as cards, panels, and tooltips.

**Extension Points:**

```scss
.sv-information-display-base {
  @extend .sv-ui-control-base;
  
  // Reset interaction styles
  cursor: default;
  user-select: text;
  
  // Layout
  display: block;
  padding: var(--sv-space-4);
  
  // Content structure
  &__header { ... }
  &__body { ... }
  &__footer { ... }
}
```

**Key Features:**
- Content organization with header/body/footer
- Appropriate text selection behavior
- Default cursor styling
- Consistent padding and spacing

## 7. Data Display (`sv-data-display-base`)

**Purpose:** Provides the foundation for components that display structured data, such as tables, lists, and data grids.

**Extension Points:**

```scss
.sv-data-display-base {
  @extend .sv-ui-control-base;
  
  // Full width layout
  width: 100%;
  
  // Reset certain properties
  cursor: default;
  
  // Data structure
  &__header { ... }
  &__body { ... }
  &__footer { ... }
  
  // Row and cell structure
  &__row { ... }
  &__cell { ... }
}
```

**Key Features:**
- Row and column organization
- Header and footer handling
- Cell padding consistency
- Utility for vertical and horizontal separation

## 8. Containers (`sv-container-base`)

**Purpose:** Provides the foundation for layout containers like dialog boxes, modals, and drawers.

**Extension Points:**

```scss
.sv-container-base {
  @extend .sv-ui-control-base;
  
  // Container structure
  width: 100%;
  display: flex;
  flex-direction: column;
  
  // Content structure
  &__header { ... }
  &__body { ... }
  &__footer { ... }
  
  // States
  &.is-open { ... }
  &.is-closed { ... }
}
```

**Key Features:**
- Consistent header/body/footer structure
- Open/closed states for animated containers
- Default sizing and spacing
- Variable width handling

## Category Class Implementation Guidelines

When implementing or modifying category classes, follow these guidelines:

1. **Properly Extend Base Control**: Always use `@extend .sv-ui-control-base` at the beginning of the category class
2. **Reset Unnecessary Base Properties**: If a property from the base control doesn't apply to the category, explicitly reset it
3. **Use Design Tokens**: All values should reference design tokens from `abstracts/variables/`
4. **Use State Mixins**: Utilize the state mixins from `utils/mixins/state` for consistent state styling
5. **Document Extension Points**: Add comments for properties meant to be extended by component classes
6. **Maintain Clear Boundaries**: Keep category-specific styles in the category class, not in the base control or component class

## Usage in Component Classes

Component classes should extend their appropriate category base class:

```scss
.sv-button {
  @extend .sv-action-control-base;
  // Button-specific styling here
}

.sv-checkbox {
  @extend .sv-selection-control-base;
  // Checkbox-specific styling here
}
``` 