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

## Phase 1: Base Control Optimization ✅|❌

**Goal: Create a solid foundation for all controls by optimizing `_base-control.scss`**

1. **Clean and Consolidate Base Control Class**
   - [x] Remove duplicated properties
   - [x] Ensure all values use tokens from `styles/abstracts/variables/`
   - [x] Consolidate and simplify state mixins

2. **Extract Non-Core Functionality**
   - [x] Move animations to `styles/base/utils/css/_animations.scss`
   - [x] Move print styles to `styles/base/utils/mixins/_print.scss`
   - [x] Extract high contrast mode handling to accessibility utilities

3. **Migrate Mixins from Abstracts to Utils**
   - [x] Create a proper structure in `styles/base/utils/` for different types of mixins:
     - `mixins/_layout-mixins.scss` - Grid, flexbox, positioning mixins
     - `mixins/_state-mixins.scss` - Interactive state management
     - `mixins/_responsive-mixins.scss` - Breakpoint handling
     - `mixins/_typography-mixins.scss` - Text styling helpers
     - `mixins/_accessibility-mixins.scss` - Focus states, keyboard navigation, etc.
   - [x] Keep only token definitions in abstracts directory
   - [x] Update all imports throughout the codebase
   - [x] Document each mixin's purpose and usage pattern

4. **Document Base Control Interface**
   - [x] Document all extension points
   - [x] Create clear documentation for state handling
   - [x] Define boundaries between base and category levels

## Phase 2: Category Base Classes Refinement ✅

**Goal: Optimize each control category base class to properly extend the base control**

### Directory Structure

When working on Phase 2, adhere to the following directory structure:

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

1. **Action Controls** (`_action-controls.scss`) ✅
   - Initiated: June 29, 2024
   - Completed: June 29, 2024
   - Properly extended from the base control
   - Added clear documentation and extension points
   - Implemented consistent structure for variants and sizes

2. **Selection Controls** (`_selection-controls.scss`) ✅
   - Initiated: June 29, 2024
   - Completed: June 29, 2024
   - Properly extended from the base control
   - Added clear documentation for checkbox, radio, and switch variants
   - Implemented accessible selection states

3. **Input Controls** (`_input-controls.scss`) ✅
   - Initiated: June 29, 2024
   - Completed: June 29, 2024
   - Properly extended from the base control
   - Consolidated text field, textarea, and select styling
   - Implemented error and validation states

4. **Navigation Controls** (`_navigation-controls.scss`) ✅
   - Initiated: June 29, 2024
   - Completed: June 29, 2024
   - Properly extended from the base control 
   - Consolidated navigation states and styles
   - Improved accessibility for navigation components

5. **Feedback Controls** (`_feedback-controls.scss`) ✅
   - Initiated: June 29, 2024
   - Completed: June 29, 2024
   - Properly extended from the base control
   - Improved animation and positioning options
   - Enhanced accessibility for feedback components

6. **Information Display** (`_information-display.scss`) ✅
   - Initiated: June 29, 2024
   - Completed: June 29, 2024
   - Properly extended from the base control
   - Improved documentation for information display components
   - Added support for various information priority levels

7. **Data Display** (`_data-display.scss`) ✅
   - Initiated: June 29, 2024
   - Completed: June 29, 2024
   - Properly extended from the base control
   - Refined data presentation components
   - Improved accessibility for data display components

8. **Containers** (`_containers.scss`) ✅
   - Initiated: June 29, 2024
   - Completed: June 29, 2024
   - Properly extended from the base control
   - Enhanced container layouts and structure
   - Improved container transitions and animations

### Testing Requirements

After refining each category base class:

1. Create sample components extending each category class
2. Verify all extension points work as expected
3. Test accessibility using screen readers and keyboard navigation
4. Ensure backward compatibility with existing components

## Phase 3: Component Implementation Cleanup ✅|❌

**Goal: Ensure component implementations properly extend their category base classes**

### Phase 3 Pre-requisites

Before proceeding with component implementation cleanup, address the following naming inconsistencies:

1. **Input Controls Naming Fix**
   - [ ] Rename component references from `.sv-input-base` to `.sv-input-control-base` in all input component files:
     - `_text-field.scss`
     - `_password-field.scss`
     - `_number-input.scss`
     - `_date-time-picker.scss`
     - `_color-picker.scss`
     - `_search-field.scss`
     - `_file-upload.scss`

2. **Feedback Controls Naming Fix**
   - [ ] Rename component references from `.sv-feedback-base` to `.sv-feedback-control-base` in all feedback component files:
     - `_alert.scss`
     - `_toast.scss`
     - `_snackbar.scss`
     - `_dialog.scss`
     - `_popover.scss`
     - `_loading-indicator.scss`
     - `_error-message.scss`

3. **Container Controls Naming Fix**
   - [ ] Rename component references from `.sv-container-base` to `.sv-container-control-base` in all container component files:
     - `_card.scss`
     - `_panel.scss`
     - `_accordion.scss`
     - `_modal.scss`
     - `_drawer.scss`
     - `_tabs-panel.scss`
     - `_sidebar.scss`

### Component Implementation Tasks

1. **Action Components**
   - [ ] Button
   - [ ] Icon Button
   - [ ] Floating Action Button
   - [ ] Button Group
   - [ ] Split Button
   - [ ] Menu Button

2. **Selection Components**
   - [ ] Checkbox
   - [ ] Radio Button
   - [ ] Toggle Switch
   - [ ] Dropdown Menu
   - [ ] Multi-select List

3. **Input Components**
   - [ ] Text Field
   - [ ] Password Field
   - [ ] Number Input
   - [ ] Date/Time Picker
   - [ ] Color Picker
   - [ ] Search Field
   - [ ] File Upload

4. **Information Display Components**
   - [ ] Badge
   - [ ] Label
   - [ ] Tooltip
   - [ ] Tag
   - [ ] Avatar
   - [ ] Status Indicator
   - [ ] Progress Indicator

5. **Navigation Components**
   - [ ] Tabs
   - [ ] Side Navigation
   - [ ] Navigation Bar
   - [ ] Pagination
   - [ ] Breadcrumbs

6. **Feedback Components**
   - [ ] Alert
   - [ ] Toast
   - [ ] Snackbar
   - [ ] Dialog
   - [ ] Popover
   - [ ] Loading Indicator
   - [ ] Error Message

7. **Data Display Components**
   - [ ] Table
   - [ ] List
   - [ ] Card
   - [ ] Chart
   - [ ] Timeline
   - [ ] Data Grid

8. **Container Components**
   - [ ] Panel
   - [ ] Accordion
   - [ ] Modal
   - [ ] Drawer
   - [ ] Carousel
   - [ ] Tabs Container

## Phase 4: Angular Component Integration ✅|❌

**Goal: Streamline the use of SCSS in Angular components**

1. **Create Component Style Guide**
   - [ ] Document how to import and use styles in Angular components
   - [ ] Define pattern for component-specific customizations
   - [ ] Create examples of proper extensibility

2. **Establish Testing Protocol**
   - [ ] Define visual regression testing approach
   - [ ] Establish accessibility testing standards
   - [ ] Create guide for theme testing (light/dark)

## Progress Tracking

### Phase 1 Progress
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

### Phase 2 Progress
- Started: June 29, 2024
- Completed: June 29, 2024
- Notes:
  - Refactored three category base classes:
    - `_action-controls.scss`: Properly extended base control, removed duplicated properties, organized into clearer sections
    - `_selection-controls.scss`: Removed duplicated properties, streamlined structure, ensured all values use design tokens
    - `_input-controls.scss`: Restructured for clarity, removed redundant mixins, improved organization
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

### Phase 3 Progress
- Started: [DATE]
- Completed: [DATE]
- Notes:

### Phase 4 Progress
- Started: [DATE]
- Completed: [DATE]
- Notes: 