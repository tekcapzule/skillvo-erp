# SkillVo Styling Architecture

This document outlines the styling architecture for the SkillVo platform, describing the structure, organization, and best practices for working with our CSS/SCSS system.

## Directory Structure

```
styles/
├── abstracts/           # Variables, functions, mixins
│   ├── _index.scss      # Single entry point for abstracts
│   ├── _colors.scss     # Color variables & functions
│   ├── _typography.scss # Typography variables
│   ├── _spacing.scss    # Spacing variables
│   ├── _breakpoints.scss # Responsive breakpoints
│   ├── _accessibility.scss # Accessibility variables
│   ├── _a11y-mixins.scss # Accessibility mixins
│   ├── _mixins.scss     # General mixins
│   └── _theme-mixins.scss # Theme-related mixins
├── base/                # Base styles
│   ├── _reset.scss      # CSS reset
│   ├── _typography.scss # Base typography
│   └── _accessibility.scss # Base accessibility styles
├── components/          # Component styles
│   ├── _buttons.scss
│   ├── _cards.scss
│   ├── _forms.scss
│   └── ...
├── layout/              # Layout styles
│   ├── _grid.scss
│   ├── _header.scss
│   └── ...
├── themes/              # Theme definitions
│   ├── _light.scss
│   ├── _dark.scss
│   └── _theme-manager.scss
├── utilities/           # Utility classes
│   ├── _spacing.scss
│   ├── _visibility.scss
│   └── ...
└── main.scss            # Main entry point
```

## Import Strategy

All imports are centralized through the `main.scss` file, which follows this order:

1. Configuration & Abstract imports
2. Base styles
3. Layout styles
4. Component styles
5. Theme styles
6. Utility styles

## Abstracts Organization

The abstracts directory contains all non-outputting SCSS code: variables, functions, and mixins. These are organized into specific files and consolidated through the `_index.scss` file.

### Key Abstracts Files

- **_index.scss**: Forwards all abstracts to allow importing everything with a single `@use 'abstracts';` statement
- **_colors.scss**: Color variables, palettes, and color utility functions
- **_typography.scss**: Font families, sizes, weights, and line heights
- **_spacing.scss**: Standard spacing units and variables
- **_accessibility.scss**: Variables related to accessibility features
- **_a11y-mixins.scss**: Mixins for implementing accessibility features

## Accessibility Implementation

We've separated accessibility variables and mixins to ensure proper organization:

1. **_accessibility.scss**: Contains only accessibility-related variables
   - Focus styles
   - Motion & animations
   - Keyboard navigation
   - Color contrast
   - Z-index layers
   - Interaction sizing

2. **_a11y-mixins.scss**: Contains all accessibility-related mixins
   - `visually-hidden`: Hide elements visually but keep them accessible to screen readers
   - `focus-ring`: Apply consistent focus styles for keyboard navigation
   - `skip-link`: Create accessible skip navigation links
   - `touch-target` mixins: Ensure interactive elements meet WCAG size requirements
   - Various other accessibility utilities

## Theming System

The SkillVo platform supports both light and dark themes:

1. Theme variables are defined in `themes/_light.scss` and `themes/_dark.scss`
2. Theme switching is handled through the `themes/_theme-manager.scss`
3. The Angular `ThemeService` applies theme classes to the document

## Best Practices

1. **Single Source of Truth**: Use variables from the abstracts directory rather than hard-coding values
2. **Component-Specific Theming**: Use CSS variables for theme values
3. **Dark Mode Support**: Always test components in both light and dark modes
4. **Accessibility First**: Leverage our accessibility mixins to ensure WCAG compliance
5. **Mobile First**: Start with mobile styles and use breakpoint mixins to add styles for larger screens

## Usage Examples

### Importing Abstracts

```scss
// Recommended approach
@use 'abstracts' as *;

// Specific imports if needed
@use 'abstracts/colors' as colors;
```

### Using Accessibility Mixins

```scss
@use 'abstracts' as *;

.skip-nav {
  @include skip-link;
}

.screen-reader-text {
  @include visually-hidden;
}

.button {
  @include touch-target;
  @include focus-ring;
}
```

### Theming Components

```scss
@use 'abstracts' as *;

.my-component {
  background-color: var(--component-background);
  color: var(--component-text);
  
  &:hover {
    background-color: var(--component-background-hover);
  }
  
  @include dark-mode {
    // Dark-mode specific overrides if needed
  }
}
``` 