# SkillVo Styling Architecture

This document outlines the styling architecture for the SkillVo platform, describing the structure, organization, and best practices for working with our CSS/SCSS system.

## Design Principles
1. **Single Source of Truth**: Variables and tokens live only in `/abstracts/variables/`.
2. **Multi-Tier Structure**: Base Control → Category Base → Component → Angular Component
3. **BEM Methodology**: Block__Element--Modifier pattern for consistent naming
4. **State Management**: Standardized state classes using `.is-` prefix
5. **Accessibility First**: Built-in support for keyboard navigation, screen readers, and high contrast mode
6. **Lightweight Themes**: Theme switching based on attribute `[data-theme="dark"]`.
7. **Minimal Runtime Complexity**: All utilities are simple and predictable (no dynamic generation needed at runtime).

## Directory Structure

```
styles/
├── abstracts/
│   ├── _index.scss
│   └── variables/
│       ├── _colors.scss
│       ├── _typography.scss
│       ├── _spacing.scss
│       └── [other token files]
├── base/
│   ├── core/
│   │   ├── _base-control.scss
│   │   ├── _action-controls.scss
│   │   ├── _selection-controls.scss
│   │   └── [other category base classes]
│   └── utils/
│       ├── css/
│       │   └── _animations.scss
│       └── mixins/
│           ├── _layout-mixins.scss
│           ├── _state-mixins.scss
│           ├── _responsive-mixins.scss
│           ├── _typography-mixins.scss
│           ├── _accessibility-mixins.scss
│           ├── _print.scss
│           └── _rtl.scss
├── components/
│   ├── _button.scss
│   ├── _checkbox.scss
│   └── [other component files]
├── docs/
│   ├── README.md
│   ├── base-control-extensions.md
│   └── category-classes.md
├── main.scss
└── themes/
    ├── _theme-manager.scss
    └── _theme-vars.scss
```

## Import Strategy

All imports are centralized through the `main.scss` file, use it for global styling in individual apps.

## Architecture Layers

### 1. Base Control (`sv-ui-control-base`)
- Universal foundation for all controls
- Basic box model properties, typography, colors
- Fundamental state handlers (focus, hover, disabled)
- Core accessibility features
- No component or category-specific properties

### 2. Category Level (e.g. `.sv-action-control-base`)
- Extends base control with category-specific styles
- Category-specific layouts and structures
- Common behavior for all components in category
- State management for the category
- No component-specific properties

### 3. Component Level (e.g. `.sv-button`)
- Extends appropriate category base
- Visual design specifics (padding, shadows, etc.)
- Component variants using BEM modifiers (e.g. `.sv-button--primary`)
- Component-specific states and animations
- No Angular implementation details

### 4. Angular Component SCSS
- Component instance-specific adjustments
- Host element styling and positioning
- Content projection styling
- Integration with Angular features
- Minimal use of direct styling - should extend component classes

## Abstracts Organization

The abstracts directory contains all non-outputting SCSS code: variables, functions, and mixins. These are organized into specific files and consolidated through the `_index.scss` file.

### Key Abstracts Files

- **_index.scss**: Forwards all abstracts to allow importing everything with a single `@use 'abstracts';` statement
- **_colors.scss**: Color variables, palettes, and color utility functions
- **_typography.scss**: Font families, sizes, weights, and line heights
- **_spacing.scss**: Standard spacing units and variables
- **_accessibility.scss**: Variables related to accessibility features

## Naming Conventions

### BEM Methodology
```scss
// Block
.sv-button { }

// Element
.sv-button__icon { }

// Modifier
.sv-button--primary { }
```

### State Classes
Use `.is-` prefix for all state classes:
```scss
.is-disabled { }
.is-selected { }
.is-active { }
.is-valid { }
.is-invalid { }
```

## Mixins and Utilities

All mixins are now organized by function in `styles/base/utils/mixins/`:
- `_layout-mixins.scss`: Grid, flexbox, positioning
- `_state-mixins.scss`: Interactive state management
- `_responsive-mixins.scss`: Breakpoint handling
- `_typography-mixins.scss`: Text styling helpers
- `_accessibility-mixins.scss`: Focus states, keyboard navigation
- `_print.scss`: Print-specific styling
- `_rtl.scss`: Right-to-left language support

## Theming System

The SkillVo platform supports both light and dark themes:

1. Theme variables are defined in `themes/_theme-vars.scss`
2. Theme switching is handled through the `themes/_theme-manager.scss`
3. Theme implementation uses CSS variables with a `[data-theme]` attribute:
```scss
.sv-button {
  background-color: var(--sv-primary);
  color: var(--sv-on-primary);
}

[data-theme="dark"] {
  --sv-primary: #2a6fd6;
  --sv-on-primary: #ffffff;
}
```
4. The Angular `ThemeService` applies theme classes to the document

## Best Practices

### 1. Extend the Appropriate Base
Component implementations should extend their category base class:
```scss
.sv-button {
  @extend .sv-action-control-base;
  // Component-specific styles
}
```

### 2. Use Variables for All Values
```scss
// Component-specific variables
$button-padding: var(--sv-space-sm) var(--sv-space-md);
$button-border-radius: var(--sv-radius-md);

.sv-button {
  padding: $button-padding;
  border-radius: $button-border-radius;
}
```

### 3. Follow the File Structure Pattern
- Import statements
- Component variables
- Base component class
- Variations (modifiers)
- States
- Responsive behavior

### 4. Implement Proper State Handling
```scss
.sv-button {
  &.is-disabled {
    opacity: 0.5;
    pointer-events: none;
  }
  
  &.is-active {
    transform: translateY(1px);
  }
}
```

### 5. Mobile First
Start with mobile styles and use breakpoint mixins to add styles for larger screens:
```scss
.sv-component {
  width: 100%;
  
  @include media-breakpoint-up(md) {
    width: 50%;
  }
}
```

### 6. Ensure Accessibility
- Implement keyboard focus states
- Support high contrast mode
- Add RTL language support where needed
- Test with screen readers

## Using Styles in Angular Components

```scss
/* my-component.component.scss */
@use 'path-to-components/button';

:host {
  display: block;
  
  .custom-button {
    @extend .sv-button;
    @extend .sv-button--primary;
    
    // Only add component-specific adjustments here
    margin-bottom: var(--sv-space-md);
  }
}
```
