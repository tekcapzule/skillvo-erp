# Theme Setup for SkillVo Platform

## Overview
The SkillVo platform uses a highly modular, scalable theme architecture designed for maintainability, accessibility, and responsiveness. The theme files are located in the `/styles` directory at the root of the Nx workspace.

The platform supports **Light** and **Dark** themes, optimized for mobile-first development and seamless theme switching. Themes are managed via CSS custom properties (variables) structured across multiple SCSS files.

---

## Folder Structure
```
styles/
├── main.scss               # Central entry point
├── abstracts/              # Shared SCSS mixins
│   └── _mixins.scss
├── variables/              # Core design tokens
│   ├── _colors.scss
│   ├── _typography.scss
│   ├── _accessibility.scss
│   ├── _layout.scss
│   ├── _breakpoints.scss
│   └── _spacing.scss
├── themes/                 # Theme-specific tokens
│   ├── _light.scss
│   ├── _dark.scss
│   └── _theme-manager.scss
├── base/                   # Base styles and backward compatibility
│   ├── _variables.scss
│   ├── _typography.scss
│   ├── _reset.scss
│   ├── _accessibility.scss
│   └── _mixins.scss
```

---

## Theme Management

### Light Theme (`_light.scss`)
- Primary Color: `#1971E5`
- Secondary Color: `#1A1A1A`
- Tertiary Color: `#689F38`
- Optimized for standard (bright) UI usage.
- Includes semantic tokens like `--bg-app`, `--text-primary`, `--border-default`.

### Dark Theme (`_dark.scss`)
- Primary Color: `#4C8FF8` (adapted for dark contrast)
- Background Base: `#1E1E1E` (matches Visual Studio Code Dark theme)
- Lightened secondary colors for text readability.
- Separate dark-mode tokens loaded under `[data-theme="dark"]`.

### Theme Switching (`_theme-manager.scss`)
- Dynamically switches between Light and Dark by toggling `data-theme` attribute on `<html>` or `<body>`.
- All theme tokens react automatically without recompiling CSS.

---

## Design Tokens

Tokens are divided for better maintainability:
- **Color Tokens**: `/variables/_colors.scss`
- **Typography Tokens**: `/variables/_typography.scss`
- **Spacing Tokens**: `/variables/_spacing.scss`
- **Breakpoint Tokens**: `/variables/_breakpoints.scss`
- **Layout Tokens**: `/variables/_layout.scss`
- **Accessibility Settings**: `/variables/_accessibility.scss`

These are imported into `main.scss` to make them globally available.

---

## Base Styles

Located in `/base/`, providing platform-wide normalization:
- CSS resets (`_reset.scss`)
- Default typography styles (`_typography.scss`)
- Accessibility helpers (`_accessibility.scss`)
- Legacy SCSS variable mappings for backward compatibility (`_variables.scss`)

**Important**: Old SCSS variables are mapped from CSS custom properties in `_variables.scss` for legacy components.

---

## Development Best Practices
- **Use CSS Variables** whenever possible for new components.
- **Avoid Hardcoding Colors** inside components.
- **Mobile First**: All font sizes, spacings, and layouts scale responsively.
- **No Inline Styles**: Styling should be driven by SCSS classes.
- **Dark Mode Compatible**: All components must work seamlessly under Light and Dark modes.

---

> After memory reset, always refer to this Theme Setup document before modifying or creating new components or pages.
