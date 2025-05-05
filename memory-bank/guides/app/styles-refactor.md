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

## Phase 2: Category Base Classes Refinement ✅|❌

**Goal: Optimize each control category base class to properly extend the base control**

### Directory Structure

When working on Phase 2, adhere to the following directory structure:

```
styles/
├── docs/                           # Documentation directory
│   ├── README.md                   # Documentation overview
│   ├── base-control-extensions.md  # Base control extension patterns
│   └── category-classes.md         # Category classes documentation (to be created)
├── base/
│   ├── core/                       # Core base classes
│   │   ├── _base-control.scss      # Base control
│   │   ├── _action-controls.scss   # Action controls category
│   │   ├── _selection-controls.scss # Selection controls category
│   │   └── ...                     # Other category base classes
│   └── utils/                      # Utilities
│       ├── css/                    # CSS utilities
│       │   └── _index.scss         # Forwards all CSS utilities
│       └── mixins/                 # SCSS mixins
│           └── _index.scss         # Forwards all mixins
└── components/                     # Component-specific styles
```

### Guidelines for Category Classes

Each category class should:
1. Extend the base control class
2. Only modify properties specific to that category
3. Use mixins from `styles/base/utils/mixins/`
4. Follow the extension patterns defined in `styles/docs/base-control-extensions.md`
5. Be documented in a new file `styles/docs/category-classes.md`

### Tasks for Each Category

1. **Action Controls** (`_action-controls.scss`)
   - [ ] Remove duplicated properties already in base control
   - [ ] Ensure all values use tokens
   - [ ] Document action control extension points

2. **Selection Controls** (`_selection-controls.scss`)
   - [ ] Remove duplicated properties already in base control
   - [ ] Ensure all values use tokens
   - [ ] Document selection control extension points

3. **Input Controls** (`_input-controls.scss`)
   - [ ] Remove duplicated properties already in base control
   - [ ] Ensure all values use tokens
   - [ ] Document input control extension points

4. **Continue for other categories:**
   - [ ] Navigation Controls
   - [ ] Feedback Controls
   - [ ] Information Display
   - [ ] Data Display
   - [ ] Containers

## Phase 3: Component Implementation Cleanup ✅|❌

**Goal: Ensure component implementations properly extend their category base classes**

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

3. **Continue for other component categories**

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
- Started: [DATE]
- Completed: [DATE]
- Notes:

### Phase 3 Progress
- Started: [DATE]
- Completed: [DATE]
- Notes:

### Phase 4 Progress
- Started: [DATE]
- Completed: [DATE]
- Notes: 