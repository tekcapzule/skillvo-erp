# SkillVo Styles Refactoring Plan

This document outlines the phased approach for refactoring the SkillVo styling architecture, focusing on optimizing the multi-tier structure from base controls to Angular components.

## Style Architecture Overview

**Reference Documents:**
- [Style Guide](./style-guide.md)

**Key Directories:**
- `styles/abstracts/variables/` - Design tokens (colors, typography, spacing, etc.)
- `styles/abstracts/` - Mixins and utility functions (mixins can be moved to styles/base/utils)
- `styles/base/core/` - Base classes for all control categories
- `styles/components/` - Component-specific implementations
- `libs/**/components/` - Angular component implementations

## Architecture Layers & Responsibilities

**1. Base Level** (`sv-ui-control-base` in `_base-control.scss`)
- Universal foundation for all controls
- Basic box model properties, typography, colors
- Fundamental state handlers (focus, hover, disabled)
- Core accessibility features
- No component or category-specific properties

**2. Category Level** (`_action-controls.scss`, etc.)
- Extends base control with category-specific styles
- Category-specific layouts and structures
- State management for the category
- Common behavior for all components in category
- No component-specific properties

**3. Component Level** (`_button.scss`, etc.)
- Extends appropriate category base
- Visual design specifics (padding, shadows, etc.)
- Component variants (primary, secondary, etc.)
- Component-specific states and animations
- No Angular implementation details

**4. Angular Component SCSS**
- Component instance-specific adjustments only
- Host element styling and positioning
- Content projection styling
- Integration with Angular features
- Minimal use of direct styling - should extend component classes

## Phase 1: Base Control Optimization

**Goal: Create a solid foundation for all controls by optimizing `_base-control.scss`**

1. **Clean and Consolidate Base Control Class**
   - Remove duplicated properties
   - Ensure all values use tokens from `styles/abstracts/variables/`
   - Consolidate and simplify state mixins

2. **Extract Non-Core Functionality**
   - Move animations to `styles/base/utils/css/_animations.scss`
   - Move print styles to `styles/base/utils/mixins/_print.scss`
   - Extract high contrast mode handling to accessibility utilities

3. **Migrate Mixins from Abstracts to Utils**
   - Create a proper structure in `styles/base/utils/` for different types of mixins:
     - `mixins/_layout-mixins.scss` - Grid, flexbox, positioning mixins
     - `mixins/_state-mixins.scss` - Interactive state management
     - `mixins/_responsive-mixins.scss` - Breakpoint handling
     - `mixins/_typography-mixins.scss` - Text styling helpers
     - `mixins/_accessibility-mixins.scss` - Focus states, keyboard navigation, etc.
   - Keep only token definitions in abstracts directory
   - Update all imports throughout the codebase
   - Document each mixin's purpose and usage pattern

4. **Document Base Control Interface**
   - Document all extension points
   - Create clear documentation for state handling
   - Define boundaries between base and category levels

## Phase 2: Category Base Classes Refinement

**Goal: Optimize each control category base class to properly extend the base control**

### Directory Structure

```
styles/
├── docs/                           # Documentation directory
│   ├── README.md                   # Documentation overview
│   ├── base-control-extensions.md  # Base control extension patterns
│   └── category-classes.md         # Category classes documentation ✅
├── base/
│   ├── core/                       # Core base classes
│   │   ├── _base-control.scss      # Base control
│   │   ├── _action-controls.scss   # Action controls category
│   │   ├── _selection-controls.scss # Selection controls category
│   │   ├── _input-controls.scss    # Input controls category
│   │   ├── _navigation-controls.scss # Navigation controls category
│   │   ├── _feedback-controls.scss # Feedback controls category
│   │   ├── _information-display.scss # Information display category
│   │   ├── _data-display.scss      # Data display category
│   │   └── _containers.scss        # Container controls category
│   └── utils/                      # Utility mixins
│       └── mixins/                 # Mixins used by base classes
```

### Phase 2 Tasks

The following category base classes need to be properly refined to extend the base control class:

1. **Action Controls** (`_action-controls.scss`)
2. **Selection Controls** (`_selection-controls.scss`)
3. **Input Controls** (`_input-controls.scss`)
4. **Navigation Controls** (`_navigation-controls.scss`)
5. **Feedback Controls** (`_feedback-controls.scss`)
6. **Information Display** (`_information-display.scss`)
7. **Data Display** (`_data-display.scss`)
8. **Containers** (`_containers.scss`)

### Testing Requirements

After refining each category base class:

1. Create sample components extending each category class
2. Verify all extension points work as expected
3. Test accessibility using screen readers and keyboard navigation
4. Ensure backward compatibility with existing components

## Phase 3: Component Implementation Cleanup

**Goal: Ensure component implementations properly extend their category base classes**

### Phase 3 Pre-requisites

Before proceeding with component implementation cleanup, address the following naming inconsistencies:

1. **Input Controls Naming Fix**
   - Rename component references from `.sv-input-base` to `.sv-input-control-base` in all input component files:
     - `_text-field.scss`
     - `_password-field.scss`
     - `_number-input.scss`
     - `_date-time-picker.scss`
     - `_color-picker.scss`
     - `_search-field.scss`
     - `_file-upload.scss`

2. **Feedback Controls Naming Fix**
   - Rename component references from `.sv-feedback-base` to `.sv-feedback-control-base` in all feedback component files:
     - `_alert.scss`
     - `_toast.scss`
     - `_snackbar.scss`
     - `_dialog.scss`
     - `_popover.scss`
     - `_loading-indicator.scss`
     - `_error-message.scss`

3. **Container Controls Naming Fix**
   - Rename component references from `.sv-container-base` to `.sv-container-control-base` in all container component files:
     - `_card.scss`
     - `_panel.scss`
     - `_accordion.scss`
     - `_modal.scss`
     - `_drawer.scss`
     - `_tabs-panel.scss`
     - `_sidebar.scss`

### Component Implementation Tasks

1. **Action Components**
   - Button
   - Icon Button
   - Floating Action Button
   - Button Group
   - Split Button
   - Menu Button

2. **Selection Components**
   - Checkbox
   - Radio Button
   - Toggle Switch
   - Dropdown Menu
   - Multi-select List

3. **Input Components**
   - Text Field
   - Password Field
   - Number Input
   - Date/Time Picker
   - Color Picker
   - Search Field
   - File Upload

4. **Information Display Components**
   - Badge
   - Label
   - Tooltip
   - Tag
   - Avatar
   - Status Indicator
   - Progress Indicator

5. **Navigation Components**
   - Tabs
   - Side Navigation
   - Navigation Bar
   - Pagination
   - Breadcrumbs

6. **Feedback Components**
   - Alert
   - Toast
   - Snackbar
   - Dialog
   - Popover
   - Loading Indicator
   - Error Message

7. **Data Display Components**
   - Table
   - List
   - Card
   - Chart
   - Timeline
   - Data Grid

8. **Container Components**
   - Panel
   - Accordion
   - Modal
   - Drawer
   - Carousel
   - Tabs Container

## Phase 4: Angular Component Integration

**Goal: Streamline the use of SCSS in Angular components**

1. **Create Component Style Guide**
   - Document how to import and use styles in Angular components
   - Define pattern for component-specific customizations
   - Create examples of proper extensibility

2. **Establish Testing Protocol**
   - Define visual regression testing approach
   - Establish accessibility testing standards
   - Create guide for theme testing (light/dark)

## Progress Tracking

### Phase 1: Base Control Optimization
- Started: June 28, 2024
- Completed: June 28, 2024
- Notes:
  - Created the following new mixin files in `styles/base/utils/mixins/`:
    - `_layout-mixins.scss` - For layout, flexbox, grid, and positioning mixins
    - `_state-mixins.scss` - For interactive states handling
    - `_responsive-mixins.scss` - For breakpoint and responsive design mixins
    - `_typography-mixins.scss` - For text styling helpers
    - `_accessibility-mixins.scss` - For focus states, keyboard navigation, etc.
    - `_print.scss` - For print-specific styling
    - `_rtl.scss` - For right-to-left language support
  - Reorganized utils directory into:
    - `css/`: For CSS utility classes and variables
    - `mixins/`: For SCSS mixins and functions
  - Updated `_base-control.scss` to:
    - Remove duplicated mixins
    - Use token variables for all values
    - Import and use the newly created mixin files
    - Simplify the file structure by removing duplication
    - Remove non-core functionality into appropriate utility files
    - Add documentation for extension points
  - Created comprehensive documentation for the base control extension points and layer boundaries in `styles/docs/base-control-extensions.md`
  - Created README documentation in `styles/docs/README.md` to explain the documentation organization
  - Updated the utils index file to include all new mixin files
  - Completed tasks as per the review checklist in `memory-bank/guides/app/style-refactor-review.md`

### Phase 2: Category Base Classes Refinement
- Started: June 29, 2024
- Completed: June 29, 2024
- Notes:
  - Refactored all category base classes:
    - `_action-controls.scss`
    - `_selection-controls.scss`
    - `_input-controls.scss`
    - `_navigation-controls.scss`
    - `_feedback-controls.scss`
    - `_information-display.scss`
    - `_data-display.scss`
    - `_containers.scss`
  - Created documentation for category classes in `styles/docs/category-classes.md` with:
    - Detailed explanation of each category's purpose
    - Code examples showing extension points
    - Key features of each category
    - Guidelines for implementation and extension
  - Applied consistent import pattern across all category files
  - Ensured proper use of state mixins from utils
  - Updated variable names to match new token naming convention (--sv-space-* instead of --sv-padding-*)
  - Removed duplicated mixins and consolidated into the appropriate utility files
  - Fixed linter errors in refactored files

### Phase 3: Component Implementation Cleanup
- Started: June 30, 2024
- Completed: July 27, 2024 (Input Controls Refactoring In Progress)
- Notes:
  - Refactored all action components to properly extend their category base class:
    - `_button.scss`: Simplified and removed duplicated properties, better organization
    - `_icon-button.scss`: Refactored for clearer structure and better extensibility
    - `_floating-action-button.scss`: Streamlined and improved consistency
    - `_menu-button.scss`: Enhanced structure and clarified dropdown mechanisms
    - `_split-button.scss`: Simplified and improved parts handling
  - Updated SCSS structure for action components:
    - Added component-specific variables at the top of each file
    - Created SCSS variables that reference design tokens
    - Updated all hardcoded values to use these variables
    - Implemented consistent file structure across components
  - Fixed variable reference consistency (changed primary-500-rgb to primary-rgb)
  - Improved component documentation with clearer section comments
  - Updated all container components to use `.sv-container-control-base` instead of `.sv-container-base`
  - Refactored Card component with BEM naming conventions
  - Refactored Panel component with consistent state handling
  - Created consistent pattern for documenting animations and transitions
  - Improved accessibility features across all components
  - Enhanced responsive behaviors for all refactored components
  - Refactored all data display components to properly extend their category base class:
    - `_grid.scss`: Updated from `.sv-data-display-base` to `.sv-data-display-control-base`, applied BEM naming
    - `_list.scss`: Implemented consistent class naming with BEM, enhanced states and interactions
    - `_table.scss`: Improved structure with proper nesting and BEM naming conventions
  - Applied consistent patterns across data components:
    - Standardized state handling with `.is-selected`, `.is-active`, `.is-disabled` classes
    - Implemented responsive behaviors with appropriate media queries
    - Enhanced accessibility with proper focus states
    - Used component-specific variables referencing design tokens
    - Applied consistent modifier naming with double-dash format (e.g., `--compact`)
    - Structured files with clear sections for base, variations, states, and responsive behavior
  - Refactored feedback components to properly extend their category base class:
    - `_alert.scss`: Updated from `.sv-feedback-base` to `.sv-feedback-control-base`, applied BEM naming
    - `_toast.scss`: Implemented consistent class naming with BEM, improved animation handling
    - `_snackbar.scss`: Converted to BEM naming and updated to extend control base properly
    - `_dialog.scss`: Restructured with proper BEM naming and improved accessibility
    - `_popover.scss`: Replaced mixin-based approach with direct class definitions using BEM
    - `_loading-indicator.scss`: Simplified organization and consolidated styles with BEM patterns
    - `_error-message.scss`: Updated class structure and improved integration with form components
    - Other feedback components refactored with the same patterns:
      - Standardized state handling with `.is-visible`, `.is-hidden`, `.is-animating` classes
      - Consistent animation keyframe naming pattern with `sv-` prefix
      - Applied consistent modifier classes for variants (`--success`, `--error`, etc.)
      - Structured responsive behavior with media query mixins
      - Improved focus states for interactive elements using state mixins
      - Enhanced documentation with clear section comments
      - Optimized arrow styling and positioning in tooltip components
      - Consolidated redundant code and improved reusability
  - Refactored information display components to properly extend their category base class:
    - `_badge.scss`: Updated from `.sv-info-display-base` to `.sv-information-display-base`, applied BEM naming
    - `_label.scss`: Implemented consistent class naming with BEM, enhanced states and interactions
    - `_tooltip.scss`: Restructured with proper BEM naming and improved accessibility
    - `_tag.scss`: Converted to BEM naming and updated to extend control base properly
    - `_status-indicator.scss`: Renamed primary class to `.sv-status` and applied consistent BEM patterns
    - `_progress-indicator.scss`: Renamed primary class to `.sv-progress` and implemented BEM structure
    - `_text.scss`: Created comprehensive text styling with proper BEM structure and consistent patterns
    - Applied consistent patterns across information components:
      - Standardized state handling with `.is-interactive`, `.is-disabled`, `.is-visible` classes
      - Consistently used BEM-style naming with double-dash for modifiers (e.g., `--primary`, `--light`)
      - Enhanced accessibility features including high contrast mode support
      - Improved responsive behaviors for mobile devices
      - Used component-specific variables referencing design tokens
      - Structured files with consistent sections: imports, variables, base class, variations, states
      - Applied proper transition properties for interactive states
      - Enhanced documentation with clear section comments
      - Optimized for better maintainability and consistency across all information components
      - Created consistent component type variations (e.g., linear vs. circular progress)
      - Standardized animation handling with consistent naming and keyframe definitions
  - Refactored input components to properly extend their category base class:
    - `_text-field.scss`: Updated from `.sv-input-base` to `.sv-input-control-base`, applied BEM naming
    - `_password-field.scss`: Implemented consistent class naming with BEM, enhanced states and interactions
    - `_number-input.scss`: Restructured with proper BEM naming and improved accessibility
    - `_search-field.scss`: Converted to BEM naming and improved component organization
    - `_color-picker.scss`: Updated from `.sv-input-base` to `.sv-input-control-base`, applied BEM naming conventions
      - Implemented consistent state classes (`.is-valid`, `.is-invalid`, `.is-open`, etc.)
      - Enhanced accessibility with focus states and keyboard navigation
      - Restructured with proper layering (picker base, panel, palettes, sliders)
      - Standardized animation with named keyframes using the `sv-` prefix
      - Added high contrast mode support for better accessibility
      - Improved responsive behavior with appropriate breakpoint handling
    - `_date-time-picker.scss`: Refactored to follow established component patterns
      - Updated from `.sv-input-base` to `.sv-input-control-base`
      - Implemented BEM naming conventions consistently for all elements
      - Added proper state classes (`.is-open`, `.is-selected`, `.is-in-range`, `.is-disabled`)
      - Enhanced keyboard accessibility with improved focus management
      - Added high contrast mode support for screen readers and assistive technologies
      - Organized component sections into logical groups: base, calendar, time selector, range picker
      - Standardized transition properties with consistent timing variables
      - Improved responsive design with breakpoint mixins and mobile adaptations
      - Created proper variations with BEM modifier classes (`--sm`, `--lg`, `--inline`)
      - Enhanced documentation with comprehensive headers and inline comments
      - Added explicit accessibility section with focus management techniques
    - `_file-upload.scss`: Refactored to follow established component patterns
      - Updated from `.sv-input-base` to `.sv-input-control-base`
      - Implemented BEM naming conventions consistently (e.g., `.sv-file-upload__label`, `.sv-file-list__item`)
      - Standardized state classes with `.is-` prefix (`.is-drag-over`, `.is-error`, `.is-success`, `.is-active`)
      - Added component-specific variables with consistent naming ($file-upload-*)
      - Enhanced accessibility with focus-visible, screen reader support, and high contrast mode
      - Added explicit state section for all component variants (file list, progress, dropzone)
      - Improved transitions with consistent timing variables
      - Enhanced responsive design with proper breakpoint mixins
      - Ensured proper RTL language support
      - Consolidated related styles and improved organization
      - Added comprehensive documentation headers and inline comments
    - Applied consistent patterns across input components:
      - Added component-specific variables at the top of each file referencing design tokens
      - Updated class names from `.sv-input-base` to `.sv-input-control-base`
      - Properly implemented BEM naming conventions (e.g., `.sv-text-field__input`, `.sv-text-field--compact`)
      - Standardized state classes (`.is-valid`, `.is-invalid`, `.is-disabled`, `.is-readonly`) 
      - Improved focus states and keyboard navigation
      - Enhanced responsive behaviors with consistent breakpoint handling
      - Optimized transition properties for interactive elements
      - Organized files with consistent sections: imports, variables, base, variations, states, responsive
      - Improved accessibility with proper ARIA attribute support
      - Added appropriate documentation in file headers and section comments
  - Refactored navigation components to properly extend their category base class:
    - `_nav-bar.scss`: Renamed from `_nav-menu.scss` to better reflect component purpose, applied BEM naming conventions
    - `_breadcrumbs.scss`: Implemented consistent class naming with BEM and standardized state handling
    - `_side-nav.scss`: Updated to follow proper extension and consistent BEM structure
    - `_pagination.scss`: Improved structure with consistent state classes and responsive behavior
    - `_tabs.scss`: Enhanced with better organization, variable structure, and accessibility improvements
    - Applied consistent patterns across navigation components:
      - Added component-specific variables at the top of each file referencing design tokens
      - Updated class names to follow BEM methodology with consistent element and modifier naming
      - Standardized state classes (`.is-active`, `.is-disabled`, `.is-expanded`, `.is-visible`)
      - Improved focus states and keyboard navigation for better accessibility
      - Enhanced responsive behaviors with consistent breakpoint handling
      - Organized files with consistent sections: imports, variables, base, variations, states, responsive
      - Standardized transition properties for interactive elements
      - Improved animation handling with consistent naming conventions
      - Added proper high contrast mode support for accessibility
      - Enhanced documentation with clear section comments and versioning
      - Consolidated redundant code and improved reusability
  - Refactored selection components to properly extend their category base class:
    - `_checkbox.scss`: Updated with consistent BEM naming and standardized state handling
    - `_radio-button.scss`: Improved structure with proper variable definitions and consistent patterns
    - `_toggle-switch.scss`: Converted to use BEM-style modifiers and standardized states
    - `_dropdown-menu.scss`: Enhanced with clear variable structure and improved accessibility 
    - `_multi-select-list.scss`: Refactored with consistent element and state naming
    - Applied consistent patterns across selection components:
      - Added component-specific variables at the top of each file referencing design tokens
      - Updated class naming from variant-specific to BEM-style modifiers (e.g., `.sv-checkbox--tile` instead of `.sv-checkbox-tile`)
      - Standardized state classes using `is-` prefix (`.is-selected`, `.is-disabled`, `.is-readonly`, etc.)
      - Improved accessibility including high contrast mode support
      - Enhanced animations with standardized keyframe naming using `sv-` prefix
      - Implemented consistent responsive behaviors with appropriate breakpoints
      - Structured all files with the same organization: imports → variables → base → variations → states → accessibility → responsive
      - Improved documentation headers and section comments
      - Created SCSS variables that reference design tokens for better maintainability
      - Standardized imports and mixin usage patterns
      - Enhanced toggle and dropdown components with proper focus handling

### Phase 4: Angular Component Integration
- Not started
