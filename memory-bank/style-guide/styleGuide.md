
# 🧩 SkillVo Frontend Style Guide

This document defines the styling architecture, file structure, and SCSS usage guidelines for the SkillVo frontend codebase.

---

## 📁 Folder Structure (7-1 Architecture)

```
styles/
├── abstracts/             # SCSS maps, mixins, variables (no CSS output)
├── base/                  # Resets, accessibility, base typography
├── components/            # Design tokens and styles for UI components
├── layout/                # Styles for grid, layout shell, wrappers
├── themes/                # Emits CSS variables (light, dark, etc.)
├── utilities/             # Helpers like scrollbar, flex, spacing
└── main.scss              # Central entry file (used in styles.scss)
```

---

## 📜 Global SCSS Rules

1. ✅ **All styles must use design tokens**  
   No hardcoded values like `#fff`, `16px`, `margin: 12px`. Use:
   ```scss
   color: var(--text-primary);
   padding: var(--space-4);
   ```

2. ✅ **Component SCSS files**
   - File: `apps/shell/app/layout/notification/notification.component.scss`
   - Purpose: structure/layout only (e.g., flexbox, z-index, gaps)

3. ✅ **Component SCSS partials** (`styles/components/_notification.scss`)
   - Should define design tokens and stylings like colors, sizes, borders, etc.
   - Can use `@include` mixins, token logic, theme selectors.
   - Can emit `:root` variables for reusable component tokens.
   - ✅ Tokens specific to the component are allowed here.

4. ❌ **No CSS output in `abstracts/`**  
   Abstracts should only include maps, mixins, and functions. No `:root` or `body {}` styles.

5. ✅ **Theming must use CSS variables**
   Tokens are emitted from:
   ```
   styles/themes/_theme-vars.scss
   ```
   Example:
   ```scss
   :root {
     --primary-500: #1971e5;
   }
   [data-theme="dark"] {
     --primary-500: #0a69c1;
   }
   ```

6. ✅ **Theme switching**
   Handled by:
   - `ThemeService` in shell core module
   - Changes `<html data-theme="dark">`
   - Styles update automatically via `var(--token)` resolution

---

## 🧪 Naming Guidelines

- **Component token** example:
  ```scss
  --notification-bg: var(--bg-surface);
  --notification-text: var(--text-primary);
  ```

- **Global tokens** are scoped in:
  ```
  abstracts/_colors.scss
  abstracts/_spacing.scss
  abstracts/_typography.scss
  ```

---

## ✅ Example Component Styling Flow

| Layer | File | Role |
|-------|------|------|
| Shell Entry | `styles.scss` | Imports `main.scss` |
| Main Styles | `main.scss` | Includes abstracts, base, themes, components |
| Component Tokens | `_notification.scss` | Token definitions and design |
| Component Structure | `notification.component.scss` | Flexbox layout, visibility, animation |
| Theme Output | `_theme-vars.scss` | Emits all `--token` for light/dark |
| Theme Switch | `theme.service.ts` | Switches `data-theme` dynamically |

---

## 🛠️ Developer Checklist

- [ ] Use only `var(--token)` or `$theme-map` references
- [ ] Declare new component tokens in `styles/components/_component.scss`
- [ ] Use component `.scss` file only for layout/structure
- [ ] Do not emit CSS from `abstracts/`
- [ ] Test theme switching after any style changes

---

## ✅ Cursor AI: Important Notes

- Component styling should be **split** into:
  - **Design tokens** → `styles/components/_xyz.scss`
  - **Structure/animation/layout** → `xyz.component.scss`
- Use `var(--token)` values always.
- Fallbacks like `var(--space-4, 16px)` allowed only where necessary.