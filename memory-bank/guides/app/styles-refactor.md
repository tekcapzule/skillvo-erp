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
   - [ ] Remove duplicated properties
   - [ ] Ensure all values use tokens from `styles/abstracts/variables/`
   - [ ] Consolidate and simplify state mixins

2. **Extract Non-Core Functionality**
   - [ ] Move animations to `styles/base/utils/_animations.scss`
   - [ ] Move print styles to a dedicated utility file
   - [ ] Extract high contrast mode handling to accessibility utilities

3. **Migrate Mixins from Abstracts to Utils**
   - [ ] Create a proper structure in `styles/base/utils/` for different types of mixins:
     - `_layout-mixins.scss` - Grid, flexbox, positioning mixins
     - `_state-mixins.scss` - Interactive state management
     - `_responsive-mixins.scss` - Breakpoint handling (move from abstracts)
     - `_typography-mixins.scss` - Text styling helpers
     - `_accessibility-mixins.scss` - Focus states, keyboard navigation, etc.
   - [ ] Keep only token definitions in abstracts directory
   - [ ] Update all imports throughout the codebase
   - [ ] Document each mixin's purpose and usage pattern

4. **Document Base Control Interface**
   - [ ] Document all extension points
   - [ ] Create clear documentation for state handling
   - [ ] Define boundaries between base and category levels

## Phase 2: Category Base Classes Refinement ✅|❌

**Goal: Optimize each control category base class to properly extend the base control**

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
- Started: [DATE]
- Completed: [DATE]
- Notes:

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