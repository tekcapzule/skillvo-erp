# SkillVo Styling Architecture

This document outlines the styling architecture for the SkillVo platform, describing the structure, organization, and best practices for working with our CSS/SCSS system.

## Design Principles
1. Single Source of Truth: Variables and tokens live only in /abstracts/variables/.
2. Strict Layering: Variables → Base → Themes.
3. Minimal Runtime Complexity: All utilities are simple and predictable (no dynamic generation needed at runtime).
4. Lightweight Themes: Theme switching based on attribute [data-theme="dark"].
5. Clear Utility Classes: Developers and AI tools can use .padding-md, .radius-sm, .shadow-lg, .text-primary, etc.

## Directory Structure

```
├── abstracts
│   ├── _index.scss
│   ├── _mixins.scss
│   └── variables
│       ├── _accessibility.scss
│       ├── _border-radius.scss
│       ├── _breakpoints.scss
│       ├── _colors.scss
│       ├── _icons.scss
│       ├── _padding.scss
│       ├── _shadows.scss
│       ├── _sizes.scss
│       ├── _spacing.scss
│       └── _typography.scss
├── base
│   ├── _accessibility.scss
│   ├── _border-radius.scss
│   ├── _breakpoints.scss
│   ├── _colors.scss
│   ├── _icons.scss
│   ├── _layout.scss
│   ├── _padding.scss
│   ├── _reset.scss
│   ├── _shadows.scss
│   ├── _sizes.scss
│   ├── _spacing.scss
│   └── _typography.scss
├── main.scss
└── themes
    ├── _theme-manager.scss
    └── _theme-vars.scss

```

## Import Strategy

All imports are centralized through the `main.scss` file, use it for global styling in individual apps.


## Abstracts Organization

The abstracts directory contains all non-outputting SCSS code: variables, functions, and mixins. These are organized into specific files and consolidated through the `_index.scss` file.

### Key Abstracts Files

- **_index.scss**: Forwards all abstracts to allow importing everything with a single `@use 'abstracts';` statement
- **_colors.scss**: Color variables, palettes, and color utility functions
- **_typography.scss**: Font families, sizes, weights, and line heights
- **_spacing.scss**: Standard spacing units and variables
- **_accessibility.scss**: Variables related to accessibility features

## Theming System

The SkillVo platform supports both light and dark themes:

1. Theme variables are defined in `themes/_theme-vars`
2. Theme switching is handled through the `themes/_theme-manager.scss`
3. The Angular `ThemeService` applies theme classes to the document

## Best Practices

1. **Single Source of Truth**: Use variables from the abstracts directory rather than hard-coding values
2. **Component-Specific Theming**: Use CSS utility classes (styles/base) for styling components.
3. **Dark Mode Support**: Always test components in both light and dark modes
4. **Mobile First**: Start with mobile styles and use breakpoint mixins to add styles for larger screens

## Usage Examples

### Importing Abstracts

```scss
@use 'abstracts/variables/colors' as colors;
```

### Stlying Components

Option 1 (Preferred for 90% usecases)
Always import utility styles into your component .scss, not directly in the HTML.

```scss
/* card.component.scss */
@use 'path-to-base-utilities' as *; // adjust import path if needed

.card {
  @extend .radius-md;
  @extend .shadow-md;
  @extend .bg-primary;
  @extend .text-on-light;
  @extend .padding-md;
}
```
Then in your HTML

```html
<!-- Clean HTML -->
<div class="card">
  Welcome to SkillVo!
</div>
```
Option 2 

You can manually apply variables if you need more control.

```scss
/* card.component.scss */
.card {
  background-color: var(--primary);
  color: var(--text-on-light);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  padding: var(--padding-md);
}
```
Then in your HTML

```html
<div class="card">
  Welcome to SkillVo!
</div>

```
