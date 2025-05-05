# SkillVo Styles Documentation

This directory contains documentation files for the SkillVo styling architecture.

## Purpose

The `styles/docs` directory serves as a central place for comprehensive documentation on the styling system, including:

- Style architecture and organization
- Extension patterns and guidelines
- Component styling guidelines
- Theming documentation
- Design tokens usage
- Accessibility guidelines

## Available Documentation

- [Base Control Extensions](./base-control-extensions.md) - Documentation for the base control extension points and layer boundaries

## Documentation Organization

Documentation in this directory should follow these principles:

1. **Focus on architecture and patterns** - Implementation details belong in code comments
2. **Use examples liberally** - Show real-world examples of patterns
3. **Update with code changes** - Keep documentation in sync with code
4. **Cross-reference** - Link between documentation files when relevant

## Directory Structure

```
styles/
├── docs/                           # Documentation directory
│   ├── README.md                   # This file
│   ├── base-control-extensions.md  # Base control extension documentation
│   ├── component-guidelines.md     # Guidelines for component styling (future)
│   └── theming.md                  # Theming documentation (future)
├── abstracts/                      # Design tokens and variables
├── base/                           # Base styles
│   ├── core/                       # Core base classes
│   └── utils/                      # Utilities
│       ├── css/                    # CSS utilities and helpers
│       └── mixins/                 # SCSS mixins
└── components/                     # Component-specific styles
```

## Additional Resources

Documentation should be maintained alongside the code for easy reference, but can reference external resources:

- Design system documentation
- UI/UX guidelines
- Accessibility standards
- Browser compatibility information 