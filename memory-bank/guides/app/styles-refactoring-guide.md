# SkillVo UI Components Styling Architecture Refactoring Guide

## Overview

This guide outlines our plan to refactor the SkillVo UI component styling architecture to create a more consistent, maintainable, and scalable design system. The focus is on establishing a clear three-tier architecture for our styling approach:

1. **UI Control Base (`sv-ui-control-base`)**: Foundational styles for all UI components
2. **Action Control Base (`sv-action-control-base`)**: Base styles for interactive action components
3. **Component-Specific Styles (`sv-button`, etc.)**: Specialized styling for individual component types

This refactoring will improve component consistency, reduce CSS duplication, enhance accessibility, and create a more robust foundation for future UI development.

## Current Architecture Analysis

Our current styling architecture has several issues:

- Inconsistent application of base styles across components
- Duplication of styles between layers
- Unclear separation of concerns between base classes and component classes
- Accessibility features implemented inconsistently
- Limited support for component variants and states

## Refactoring Goals

1. Create a clear separation of concerns between styling layers
2. Establish consistent naming conventions and class structures
3. Improve accessibility across all components
4. Enhance support for theming and customization
5. Optimize CSS performance and specificity
6. Ensure consistent component behavior across all variants and states

## Detailed Refactoring Plan

### 1. UI Control Base Class (`sv-ui-control-base`)

**Purpose**: Provide foundational styling that applies to all interactive UI components.

#### Changes Needed:

- **Strip Non-Essential Properties**: Remove properties specific to particular component types
- **Normalize State Handling**: Create consistent state mixins for all possible component states
- **Enhance Accessibility Foundation**: Add improved a11y features at the core level
- **Simplify Inheritance Pattern**: Use more targeted mixins instead of relying heavily on @extend
- **Improve CSS Variable Usage**: Use CSS custom properties for all configurable aspects
- **Add Missing Base Properties**: Include z-index management, outline handling, and transition defaults
- **Optimize for Performance**: Minimize selector specificity and rule complexity

#### Properties to Include:

- Box model fundamentals (box-sizing, margin resets)
- Base typography settings
- Default border styling and border radius
- Focus, hover, active state behaviors
- Disabled and readonly state styling
- Error and success state styling
- Loading state indicators
- Accessibility enhancements (high contrast, print, RTL support)

#### Component Categories Affected:

- Form Controls (Inputs, Selects)
- Selection Controls (Checkboxes, Radios, Switches)
- Action Components (Buttons, Links)
- Container Components (Cards, Panels)
- Feedback Components (Alerts, Toasts)

### 2. Action Control Base Class (`sv-action-control-base`)

**Purpose**: Build on the UI Control Base to define shared behaviors for all action-oriented components.

#### Changes Needed:

- **Refine Scope**: Remove styling that should belong in specific components
- **Action-Specific Properties**: Clarify which properties are truly common to all action elements
- **Enhance Variant System**: Create more robust variant handling that works for all action types
- **Improve Icon Handling**: Standardize icon positioning and sizing across all action components
- **Size Variant Consistency**: Create a consistent sizing system compatible with all action components
- **Interactive State Refinement**: Enhance hover, active, and focus states for better feedback
- **Accessibility Enhancements**: Add missing ARIA support for action components
- **Add Loading State Variants**: Implement consistent loading states for all action types

#### Properties to Include:

- Interactive behavior (cursor styling, user selection prevention)
- Layout fundamentals (content alignment, padding ratios, minimum touch targets)
- Action-specific states (enhanced hover/active behaviors)
- Variant foundations (primary, secondary, tertiary, destructive actions)
- Group layout patterns
- Icon support (positioning, sizing, alignment)
- Size variants (typography, spacing adjustments)

#### Component Categories Affected:

- Buttons (Standard, Icon, Toggle)
- Navigation Actions (Menu Items, Tabs, Links)
- Form Submission Controls
- Interactive Controls (Dropdowns, Accordions)
- Toolbar Items

### 3. Button Component Class (`sv-button`)

**Purpose**: Provide button-specific styling that builds on the action base layer.

#### Changes Needed:

- **Remove Inherited Properties**: Delete any styles already defined in base classes
- **Enhance Button-Specific Variants**: Refine and complete the button variant system
- **Add Missing Button Types**: Ensure all required button types are supported (submit, reset, etc.)
- **Update Animation Properties**: Fine-tune transitions and animations for button interactions
- **Improve Content Alignment**: Enhance handling of icons, text, and other content within buttons
- **Better State Handling**: Ensure all button states are visually distinct and accessible
- **Optimize for Composition**: Make button class work well with other component classes
- **Add Missing Modifiers**: Support for full-width, squared, circular buttons, etc.

#### Properties to Include:

- Button-specific properties (font weight, transitions)
- Button variants (primary, secondary, outline, link, social)
- Button-specific interactions (ripple effects, press animations)
- Special button states (pressed, expanded)
- Content styling (icon positioning, text alignment, badges)
- Advanced features (dropdown indicators, status indicators, animations)

#### Button Types Affected:

- Standard Buttons
- Icon Buttons
- Split Buttons
- Toggle Buttons
- Button Groups
- Dropdown Buttons
- Floating Action Buttons

### 4. Angular Button Component Implementation

**Purpose**: Implement the button component in Angular with appropriate bindings to the styling system.

#### Changes Needed:

- **Move Component-Specific Logic**: Separate visual styling from component behavior
- **Enhance Template Structure**: Optimize HTML structure for accessibility and performance
- **Refine @Input Properties**: Ensure inputs align with styling capabilities
- **Add Missing Features**: Implement any missing functionality from other button libraries
- **Improve Host Binding**: Enhance how class bindings are applied to host elements
- **Standardize Event Handling**: Consistent approach to click, focus, and other events
- **Add Content Projection Options**: More flexibility for button content
- **Optimize Change Detection**: Reduce unnecessary renders and style calculations

#### Implementation Considerations:

- SSR Compatibility
- Framework Version Support
- Mobile Touch Interactions
- Form Integration
- Keyboard Navigation
- Screen Reader Announcements
- Component API Consistency

## Implementation Approach

The refactoring will follow this sequence for each layer:

1. **Audit Current Implementation**: Document what exists, what works, what's redundant
2. **Define Layer Boundaries**: Clearly identify what belongs at each level
3. **Create/Update Core Files**: Implement changes to base files first
4. **Test with Multiple Components**: Verify changes with various component types
5. **Document Changes**: Update inline documentation and examples
6. **Refine Based on Testing**: Adjust implementation as needed

## Key Components for Initial Refactoring

To validate our refactoring approach, we'll implement the new architecture with one component from each category defined in the base layer:

1. **Action Components**: Button (already detailed above)
2. **Form Controls**: Text Input
3. **Selection Controls**: Checkbox
4. **Container Components**: Card
5. **Feedback Components**: Alert
6. **Information Display Components**: Badge
7. **Navigation Components**: Tabs
8. **Data Components**: Table

### 1. Text Input Component Class (`sv-text-input`)

**Purpose**: Provide styling specific to text input fields that builds on the form control base layer.

#### Changes Needed:

- **Refine Input-Specific Styles**: Extract properties unique to text inputs from shared styles
- **Enhance Label Integration**: Improve handling of floating labels and placeholder text
- **Standardize Input States**: Ensure consistent styling for focus, hover, filled, empty states
- **Better Validation Feedback**: Enhance error, success, and warning state styling
- **Add Missing Input Types**: Support for all HTML5 input types (search, email, url, etc.)
- **Improve Prefix/Suffix Handling**: Standardize approach for icons, text, and other decorators
- **Enhance Accessibility**: Ensure all states are properly communicated to assistive technology
- **Add Support for Character Counters**: Implement character count displays

#### Properties to Include:

- Input-specific borders and padding
- Text alignment and typography
- Placeholder styling
- Focus and validation states
- Support for input groups and addons
- Clear button integration
- Input sizing variants
- Label positioning and animation

#### Input Types Affected:

- Single-line text inputs
- Password inputs
- Search inputs
- Email, URL, and other specialized inputs
- Number inputs
- Date and time inputs
- Phone number inputs

### 2. Checkbox Component Class (`sv-checkbox`)

**Purpose**: Provide checkbox-specific styling that builds on the selection control base layer.

#### Changes Needed:

- **Extract Checkbox-Specific Logic**: Remove styles shared with other selection controls
- **Enhance Visual Design**: Refine the appearance of checkboxes for better visibility
- **Improve State Visualization**: Create clear visual differentiation between states
- **Better Indeterminate State**: Enhance styling for the indeterminate checkbox state
- **Add Animation Effects**: Implement smooth transitions between states
- **Improve Checkbox Groups**: Better styling for grouped checkbox controls
- **Enhance Touch Target Sizing**: Ensure checkboxes are usable on touch devices
- **Add Custom Icon Support**: Allow for custom check marks and other visual indicators

#### Properties to Include:

- Check mark styling and animation
- Box shape and border styling
- State-specific colors and effects
- Label alignment and spacing
- Group layout patterns
- Size variants
- Custom themes and styling options
- Accessibility enhancements

#### Checkbox Types Affected:

- Standard checkboxes
- Indeterminate checkboxes
- Toggle-style checkboxes
- Checkbox groups
- Image or card checkboxes
- Checkbox lists
- Tree checkbox structures

### 3. Card Component Class (`sv-card`)

**Purpose**: Provide card-specific styling that builds on the container base layer.

#### Changes Needed:

- **Refine Card Structure**: Establish clear zones for header, body, footer, and media
- **Enhance Content Flexibility**: Improve how different content types are handled within cards
- **Standardize Card Variants**: Create consistent styling for different card types
- **Improve Shadow and Elevation**: Refine the visual hierarchy of cards
- **Better Interactive States**: Enhance styling for interactive and selectable cards
- **Add Missing Card Features**: Support for badges, overlays, and actionable areas
- **Enhance Media Handling**: Better support for images, videos, and other media
- **Improve Responsiveness**: Ensure cards adapt well to different screen sizes

#### Properties to Include:

- Card structure and layout
- Header, body, and footer styling
- Border and shadow effects
- Media content positioning
- Action area styling
- Card size variants
- Interactive state styling
- Themeable card properties

#### Card Types Affected:

- Basic information cards
- Media cards
- Action cards
- Profile cards
- Product cards
- Statistic cards
- List view cards

### 4. Alert Component Class (`sv-alert`)

**Purpose**: Provide alert-specific styling that builds on the feedback component base layer.

#### Changes Needed:

- **Refine Alert Design**: Improve the visual design of alerts for better visibility
- **Standardize Alert Types**: Create consistent styling for different alert types
- **Enhance Dismissible Alerts**: Improve the styling and behavior of dismissible alerts
- **Better Icon Integration**: Standardize how icons are used within alerts
- **Improve Alert Animations**: Enhance entry and exit animations
- **Add Support for Actions**: Better styling for actionable elements within alerts
- **Enhance Accessibility**: Ensure alerts are properly announced by screen readers
- **Improve Toast Variants**: Refine the styling for toast-style alerts

#### Properties to Include:

- Alert container styling
- Color schemes for different alert types
- Icon positioning and styling
- Close button styling
- Animation and transition effects
- Action button styling
- Timed alert behaviors
- Toast positioning

#### Alert Types Affected:

- Inline alerts
- Toast notifications
- System alerts
- Success/error/warning/info alerts
- Actionable alerts
- Banner alerts
- Status alerts

### 5. Badge Component Class (`sv-badge`)

**Purpose**: Provide badge-specific styling for displaying short information markers, counters, or status indicators.

#### Changes Needed:

- **Refine Badge Design**: Improve visual design for better visibility and clear information hierarchy
- **Standardize Badge Variants**: Create consistent styling for different badge types and contexts
- **Enhance Positioning System**: Improve how badges position relative to parent elements
- **Better Size Variants**: Create properly scaled badge sizes that work in different contexts
- **Improve Color System**: Implement consistent color schemes for different badge meanings
- **Add Animation Support**: Enhance entry/exit and value change animations
- **Improve Overlapping Badges**: Better handling when multiple badges are displayed together
- **Enhance Accessibility**: Ensure badges are properly announced by screen readers

#### Properties to Include:

- Badge container styling and shape
- Color schemes for different badge types
- Typography and content alignment
- Positioning relative to parent elements
- Size variants
- Animation and transition effects
- Overflow handling for content
- Interaction states for clickable badges

#### Badge Types Affected:

- Notification counters
- Status indicators
- Tag badges
- Pill badges
- Dot badges
- Icon badges
- Profile badges
- Position badges (corner, centered, etc.)

### 6. Tabs Component Class (`sv-tabs`)

**Purpose**: Provide styling for tab navigation components that enable content organization and switching between views.

#### Changes Needed:

- **Refine Tab Structure**: Establish clear styling for tab container, tab list, and tab panels
- **Enhance Tab Variants**: Create consistent styling for different tab types and orientations
- **Improve Active State Visualization**: Enhance how active tabs are visually distinguished
- **Better Animation Effects**: Implement smooth transitions between tab states
- **Add Scroll Support**: Better handling for scrollable tab lists
- **Improve Responsive Behavior**: Ensure tabs adapt well to different screen sizes
- **Enhance Accessibility**: Better ARIA support and keyboard navigation
- **Add Badge/Icon Support**: Standardize how badges and icons display within tabs

#### Properties to Include:

- Tab container and list layout
- Individual tab styling
- Active, hover, and disabled states
- Tab content panel styling
- Indicators and dividers
- Animation and transition effects
- Responsive behavior rules
- Vertical and horizontal orientation

#### Tab Types Affected:

- Basic tabs
- Icon tabs
- Pill tabs
- Underlined tabs
- Vertical tabs
- Scrollable tabs
- Stretched tabs
- Nested tabs

### 7. Table Component Class (`sv-table`)

**Purpose**: Provide styling for table components that display structured data in rows and columns.

#### Changes Needed:

- **Refine Table Structure**: Improve styling for table container, header, body, and footer
- **Enhance Row Variants**: Create consistent styling for different row types and states
- **Better Column Sizing**: Improve how column widths are handled
- **Add Sort Indicators**: Standardize sort indicator styling
- **Improve Selection States**: Enhance styling for selectable rows and cells
- **Better Responsive Behavior**: Implement solutions for tables on smaller screens
- **Enhance Accessibility**: Better ARIA support and keyboard navigation
- **Add Support for Complex Content**: Improve handling of non-text content in cells

#### Properties to Include:

- Table layout and structure
- Header, row, and cell styling
- Borders, dividers, and separators
- Row hover and selection states
- Sort indicators and filter styling
- Pagination controls integration
- Responsive behavior rules
- Loading and empty states

#### Table Types Affected:

- Basic data tables
- Sortable tables
- Selectable tables
- Fixed header tables
- Condensed tables
- Expandable row tables
- Bordered and borderless tables
- Responsive tables

## Angular Component Implementations

For each of the components above, we'll need to update the Angular implementations to align with the new styling architecture:

### Text Input Component Implementation

- Update template structure for better accessibility
- Enhance binding to form controls
- Improve error and validation handling
- Add support for additional input features
- Optimize change detection

### Checkbox Component Implementation

- Refine template structure for better accessibility
- Enhance support for indeterminate state
- Improve form integration
- Add better keyboard navigation
- Optimize change detection

### Card Component Implementation

- Update content projection slots for header, body, footer
- Enhance support for interactive cards
- Improve responsive behavior
- Add directives for different card variants
- Optimize DOM structure

### Alert Component Implementation

- Enhance template for better accessibility
- Improve dismissible behavior
- Add support for auto-dismissal
- Better integration with notification service
- Optimize animation performance

### Badge Component Implementation

- Update template structure for better positioning options
- Enhance content projection for different badge content types
- Improve positioning relative to parent elements
- Add support for counter animations
- Optimize rendering for dynamic content

### Tabs Component Implementation

- Refine template structure for accessibility
- Enhance keyboard navigation support
- Improve content projection for tab panels
- Add support for dynamic tabs
- Optimize change detection for tab switching

### Table Component Implementation

- Update template structure for better accessibility
- Enhance row and cell templating
- Improve sorting and filtering integration
- Add better keyboard navigation support
- Optimize rendering for large datasets

## CSS Variables Strategy

We'll implement a comprehensive CSS variable system with the following structure:

- **Global Design Tokens**: Color, typography, spacing, elevation, etc.
- **Component-Specific Variables**: Using namespaced variables for component-specific properties
- **State-Specific Variables**: Variables for different component states
- **Theming Variables**: Variables that can be overridden for custom themes

## Design Consistency System

Based on the Figma designs, we need to establish a centralized approach to ensure visual consistency across all components. This will be accomplished through:

### Design Variables System

We'll implement a comprehensive design variables system that serves as a single source of truth:

```
styles/
├── abstracts/
│     ├── variables/
│     │     ├── _colors.scss       # All color definitions
│     │     ├── _typography.scss   # Type scales, weights, families
│     │     ├── _spacing.scss      # Spacing and sizing scales
│     │     ├── _shadows.scss      # Elevation and shadow styles
│     │     ├── _borders.scss      # Border widths, radii, styles
│     │     ├── _animations.scss   # Timing functions, durations
│     │     └── _breakpoints.scss  # Responsive breakpoints
│     ├── mixins/
│     │     ├── _states.scss       # Interactive state mixins
│     │     ├── _typography.scss   # Typography mixins
│     │     └── _accessibility.scss # A11y enhancements
│     └── functions/
│           └── _color-functions.scss # Color manipulation functions
├── base/
│     ├── _variables.scss    # CSS Variables generation
│     └── _reset.scss        # CSS reset/normalize
├── components/              # Component-specific styles
└── themes/                  # Theme definitions
      ├── _default.scss      # Default light theme
      ├── _dark.scss         # Dark theme overrides
      └── _custom.scss       # Custom theme variations
```

### Key Visual Consistency Elements

From the Figma designs, we've identified these critical consistency elements:

1. **Color Palette**: Consistent use of primary (#7367F0), secondary, and neutral colors
2. **Rounded Corners**: Consistent 8px border radius for most components
3. **Shadow Styles**: Consistent drop shadow (0px 4px 24px rgba(0, 0, 0, 0.08))
4. **Interactive States**: Consistent hover/focus states with color shift and subtle scaling
5. **Typography System**: Clear heading and body text hierarchies
6. **Spacing System**: 8px-based spacing grid (8px, 16px, 24px, 32px, etc.)
7. **Icon System**: Consistent 24px icon sizing with proper alignment

### Centralized Styling Control

To enable easy system-wide styling updates:

1. **Single Source Modifications**: Any design change should only require updates in one place
2. **Semantic Variable Names**: Use intention-based naming rather than visual property names
3. **Component Variants**: Generate component variants through token application rather than hard-coded values
4. **Theme Generation**: Create the ability to generate alternate themes by changing token values

### Specific Component Consistency

The Figma designs show consistent treatment across components:

- **Form Controls**: All inputs share the same height, border style, and focus state
- **Buttons**: Consistent padding, height, and hover effects across button variants
- **Data Components**: Tables and data displays share consistent cell padding and border treatments
- **Feedback Components**: Alerts and notifications use the same visual language

## Implementation Workflow

The implementation of this design consistency system will follow this workflow:

1. **Variable Extraction**: Extract all design variables from Figma designs
2. **Variable Definition**: Create the variable files with all extracted values
3. **CSS Variable Generation**: Generate CSS variables from abstract variables
4. **Base Layer Updates**: Update the base layer with variable-based styles
5. **Component Updates**: Refactor components to use the variable system
6. **Variant Generation**: Create component variants using the variable system
7. **Theme Switching**: Implement theme switching capabilities

## Design Variable Implementation Examples

To illustrate how the design variable system will work in practice, here are concrete examples from the Figma designs:

### Color Variable Examples

```scss
// abstracts/variables/_colors.scss
$colors: (
  // Brand colors
  'primary': (
    'base': #7367F0,
    'light': #9E95F5,
    'dark': #5E50EE,
    'contrast': #FFFFFF
  ),
  // Other colors as shown previously
);
```

### Variable Generation Examples

```scss
// base/_variables.scss
@use 'sass:map';
@use '../abstracts/variables/colors' as *;

// Generate CSS variables from abstracts
:root {
  // Primary colors
  --sv-color-primary: #{map.get($colors, 'primary', 'base')};
  --sv-color-primary-light: #{map.get($colors, 'primary', 'light')};
  --sv-color-primary-dark: #{map.get($colors, 'primary', 'dark')};
  --sv-color-primary-contrast: #{map.get($colors, 'primary', 'contrast')};
  
  // Rest of the variables as shown previously
}
```

### Component Implementation Example

Here's how a button component would use these tokens:

```scss
// Button component (sv-button)
.sv-button {
  // Core properties from ui-control-base are inherited
  
  // Button-specific properties using tokens
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--sv-space-2) var(--sv-space-4);
  border-radius: var(--sv-border-radius);
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  
  // Variants through token application
  &--primary {
    background-color: var(--sv-button-primary-bg);
    color: var(--sv-button-primary-color);
    border: 1px solid var(--sv-button-primary-bg);
    
    &:hover {
      background-color: var(--sv-button-primary-hover-bg);
      border-color: var(--sv-button-primary-hover-bg);
      transform: translateY(-1px);
    }
    
    &:active {
      background-color: var(--sv-button-primary-active-bg);
      border-color: var(--sv-button-primary-active-bg);
      transform: translateY(0);
    }
  }
  
  // Secondary variant
  &--secondary {
    background-color: var(--sv-button-secondary-bg);
    color: var(--sv-button-secondary-color);
    border: 1px solid var(--sv-button-secondary-bg);
    
    // Similar hover/active styles
  }
  
  // Size variants
  &--sm {
    padding: var(--sv-space-1) var(--sv-space-3);
    font-size: 0.875rem;
  }
  
  &--lg {
    padding: var(--sv-space-3) var(--sv-space-5);
    font-size: 1.125rem;
  }
  
  // Icon handling
  .sv-icon {
    margin-right: var(--sv-space-2);
    
    &:only-child {
      margin-right: 0;
    }
  }
}
```

### Theme Implementation

The themes directory will be used to create distinct theme variations while leveraging our base variable system:

```scss
// themes/_dark.scss
@use '../abstracts/variables/colors' as colors;

// Dark theme class wrapper
.sv-theme-dark {
  // Primary color adjustments
  --sv-color-primary: #9E95F5; // Slightly adjusted for dark mode visibility
  
  // Background color inversions
  --sv-color-background-primary: #1A1A1A;
  --sv-color-background-secondary: #252525;
  
  // Text color inversions
  --sv-color-text-primary: #FFFFFF;
  --sv-color-text-secondary: #E6E6E6;
  
  // Component-specific overrides
  --sv-button-primary-color: #1A1A1A;
  --sv-card-bg: var(--sv-color-background-secondary);
  --sv-input-bg: var(--sv-color-background-secondary);
  
  // Adjust shadows for dark mode
  --sv-shadow: 0px 4px 24px rgba(0, 0, 0, 0.3);
}
```

This approach keeps our theme variations separate from our base variables, allowing for easy switching between themes while maintaining a single source of truth for our core design variables.

### Theme Switching Implementation

The theme system will be implemented to allow for easy switching:

```typescript
// Theme service example
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private activeTheme = 'default';
  
  setTheme(theme: 'default' | 'dark' | 'custom') {
    // Remove current theme class
    document.body.classList.remove(`sv-theme-${this.activeTheme}`);
    
    // Add new theme class
    document.body.classList.add(`sv-theme-${theme}`);
    
    // Update active theme
    this.activeTheme = theme;
    
    // Store preference
    localStorage.setItem('sv-theme', theme);
  }
  
  initTheme() {
    // Check for saved preference
    const savedTheme = localStorage.getItem('sv-theme') as 'default' | 'dark' | 'custom';
    
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // Use system preference as fallback
      this.setTheme('dark');
    }
  }
}
```

### Component Consistency Example

Based on the Figma designs, here's how we'll ensure consistency between components:

```scss
// Common form control base properties
.sv-input-base {
  height: 40px;
  padding: var(--sv-space-2) var(--sv-space-3);
  border: 1px solid var(--sv-input-border-color);
  border-radius: var(--sv-border-radius);
  background-color: var(--sv-input-bg, var(--sv-color-neutral-0));
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  
  &:focus {
    border-color: var(--sv-input-focus-border-color);
    box-shadow: var(--sv-input-focus-shadow);
    outline: 0;
  }
  
  &:disabled {
    background-color: var(--sv-input-disabled-bg, var(--sv-color-neutral-100));
    opacity: 0.65;
  }
  
  // Error state
  &.sv-is-invalid {
    border-color: var(--sv-color-danger-base);
    
    &:focus {
      box-shadow: 0 0 0 0.2rem rgba(var(--sv-color-danger-base-rgb), 0.25);
    }
  }
}
```

This consistent approach ensures that all form controls (text inputs, selects, textareas) share the same height, border style, focus effect, and other key characteristics.

## Figma to Code Implementation Process

To ensure that our implementation stays true to the Figma designs and can be easily updated when designs change, we'll establish a clear process:

### Design Variable Extraction Process

1. **Automated Extraction**: Use Figma API or design variable plugins to extract colors, typography, spacing, shadows, and other design variables from the Figma files
2. **Variable Validation**: Review extracted variables for consistency and completeness
3. **Variable Formatting**: Format variables into SCSS variables or maps in the abstracts/variables directory
4. **Documentation**: Generate documentation for the design variables

### Design-to-Code Verification

To ensure the implementation matches the design:

1. **Visual Comparison Tools**: Use tools to compare rendered components to Figma designs
2. **Design Variable Audits**: Regularly audit code to ensure variables are being used correctly
3. **Component Showcases**: Create a component showcase that can be compared to Figma designs
4. **Designer Review Sessions**: Regular reviews with designers to verify implementation

### Handling Design Evolution

As the design system evolves:

1. **Versioned Variables**: Implement versioning for design variables
2. **Migration Strategies**: Document how to migrate components to new variable versions
3. **Deprecation Process**: Process for deprecating old variable values
4. **Testing Strategy**: Test components against both current and upcoming variable versions

## Coding Standards

When implementing the refactoring, we'll adhere to these standards:

- Use BEM naming convention for all classes
- Place media queries at the component level, not in global files
- Use mixins for repeated code patterns
- Keep selector specificity as low as possible
- Document all mixins, variables, and classes
- Group related properties together
- Avoid deep nesting of selectors

## Testing Strategy

Each change will be tested across:

- Different browsers and devices
- Various component variations
- Different states (hover, active, disabled, etc.)
- Screen readers and keyboard navigation
- High contrast mode and other accessibility features

## Timeline and Phasing

The refactoring will be implemented in phases:

1. **Base Layer Refactoring**: Update UI Control Base
2. **Action Layer Refactoring**: Update Action Control Base
3. **Component-Specific Refactoring**: Update Button and other component classes
4. **Angular Implementation Updates**: Update component implementations
5. **Documentation and Examples**: Update documentation and create examples

## Documentation Requirements

Each layer should be documented with:

- Purpose and scope
- Available variables and mixins
- Component examples
- Accessibility considerations
- Browser compatibility notes

## Conclusion

This comprehensive refactoring will create a more robust, maintainable, and consistent styling architecture for the SkillVo UI component library. By clearly separating concerns and establishing strong design patterns, we'll create a foundation that can scale with our application and support future UI enhancements.

## Appendix: CSS Class Hierarchy Visualization

```
sv-ui-control-base
  ├── sv-action-control-base
  │     ├── sv-button
  │     ├── sv-icon-button
  │     ├── sv-menu-item
  │     └── sv-link
  │
  ├── sv-input-base
  │     ├── sv-text-input
  │     ├── sv-select
  │     └── sv-textarea
  │
  ├── sv-selection-control-base
  │     ├── sv-checkbox
  │     ├── sv-radio
  │     └── sv-switch
  │
  ├── sv-container-base
  │     ├── sv-card
  │     ├── sv-panel
  │     └── sv-dialog
  │
  ├── sv-feedback-base
  │     ├── sv-alert
  │     ├── sv-toast
  │     └── sv-progress
  │
  ├── sv-information-display-base
  │     ├── sv-badge
  │     ├── sv-tag
  │     └── sv-label
  │
  ├── sv-navigation-base
  │     ├── sv-tabs
  │     ├── sv-breadcrumb
  │     └── sv-pagination
  │
  └── sv-data-base
        ├── sv-table
        ├── sv-list
        └── sv-grid
``` 