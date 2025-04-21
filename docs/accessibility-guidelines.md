# SkillVo Accessibility Guidelines

This guide explains how to implement accessible features using our accessibility tools and best practices. Following these guidelines will ensure our app is usable by everyone, including people with disabilities.

## Table of Contents

1. [Using Accessibility Tools](#using-accessibility-tools)
2. [High Contrast Mode](#high-contrast-mode)
3. [Reduced Motion](#reduced-motion)
4. [Touch Targets](#touch-targets)
5. [Focus Management](#focus-management)
6. [Screen Reader Support](#screen-reader-support)
7. [Colorblind-Safe Colors](#colorblind-safe-colors)
8. [Testing for Accessibility](#testing-for-accessibility)

## Using Accessibility Tools

Our codebase includes accessibility tools in the form of SCSS mixins and utility classes:

```scss
// Import the accessibility tools:
@import 'styles/base/accessibility';

// Use mixins in your component SCSS:
.my-component {
  @include high-contrast-adapt {
    // High contrast mode styles here
  }
  
  @include focus-visible {
    // Custom focus styles here
  }
}
```

## High Contrast Mode

High contrast mode helps users with low vision. We've added tools to support Windows High Contrast Mode and other OS-level contrast settings.

### Basic Usage

```scss
// Apply high contrast mode adaptations to any element
.my-element {
  @include high-contrast-adapt {
    border: 1px solid ButtonText;
    color: ButtonText;
    background-color: Canvas;
    // Other high contrast adjustments
  }
}
```

### System Colors in High Contrast Mode

When in high contrast mode, use system color keywords for maximum compatibility:

| System Color | Purpose |
|-------------|---------|
| `Canvas` | Main background color |
| `CanvasText` | Main text color |
| `LinkText` | Link text color |
| `ButtonText` | Text on buttons |
| `ButtonFace` | Button background color |
| `HighlightText` | Selected text color |
| `Highlight` | Selection background color |

### Example Implementation

See the `high-contrast-demo` component for a complete implementation example:
- `/apps/shell/src/app/shared/components/high-contrast-demo/`

## Reduced Motion

Some users can experience motion sickness from animations. Our tools respect the user's system preference for reduced motion.

### Using the Reduced Motion Mixin

```scss
@include reduced-motion {
  // These styles apply only when user prefers reduced motion
  animation-duration: 0.001ms !important;
  transition-duration: 0.001ms !important;
}
```

### Applying to Components

For any component with animations:

```scss
.animated-component {
  transition: transform 0.3s ease;
  
  // Respect reduced motion preference
  @include reduced-motion {
    transition-duration: 0.001ms;
  }
}
```

## Touch Targets

Touch targets should be at least 44x44px to ensure they're easily tappable on touch devices.

### Basic Touch Target

```scss
.my-button {
  @include touch-target(44px);
}
```

### Extended Touch Area

To increase the touch area without changing the visual size:

```scss
.icon-button {
  // Visual size can be smaller
  width: 24px;
  height: 24px;
  
  // But extend touch area for better accessibility
  @include extended-touch-area(10px);
}
```

## Focus Management

Proper focus management is essential for keyboard users.

### Focus Styles

```scss
.interactive-element {
  @include focus-visible {
    // Custom focus styles
    box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.5);
  }
}
```

### Skip Links

Add skip links to your main layout to help keyboard users bypass navigation:

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

## Screen Reader Support

Use proper semantic HTML and ARIA attributes when needed.

### Screen Reader Only Text

Use the `.sr-only` class to hide text visually but keep it available to screen readers:

```html
<button>
  <span class="sr-only">Close dialog</span>
  <mat-icon>close</mat-icon>
</button>
```

## Colorblind-Safe Colors

We've added a colorblind-safe palette that's distinguishable for all types of color blindness.

### Using Colorblind-Safe Colors

```scss
.error-message {
  color: var(--color-blind-red);
}

.success-message {
  color: var(--color-blind-green);
}
```

### Color Utility Classes

```html
<div class="color-blind-safe-red">Error message</div>
<div class="bg-color-blind-safe-green">Success alert</div>
```

## Testing for Accessibility

### Manual Testing

1. **Keyboard Navigation**: Test all interactions using only the keyboard
2. **Screen Reader**: Test with VoiceOver (macOS) or NVDA/JAWS (Windows)
3. **High Contrast Mode**: Test with Windows High Contrast mode or macOS Increase Contrast
4. **Zoom**: Test at 200% zoom
5. **Reduced Motion**: Test with "Reduce motion" enabled in OS settings

### Automated Testing

Run accessibility checks using:
- Lighthouse in Chrome DevTools
- axe DevTools extension
- pa11y or similar automated testing tools

### WCAG Compliance Checklist

Ensure your features meet these requirements:
- [ ] Sufficient color contrast (4.5:1 for normal text, 3:1 for large text)
- [ ] No reliance on color alone to convey information
- [ ] Keyboard accessible interactions (no keyboard traps)
- [ ] Proper focus management and visible focus indicators
- [ ] Proper semantic HTML with ARIA when needed
- [ ] Text alternatives for non-text content
- [ ] Content readable and functional with zoom up to 200%

## Further Resources

- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [MDN Accessibility Guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [Inclusive Components](https://inclusive-components.design/)
- [Deque University](https://dequeuniversity.com/) 