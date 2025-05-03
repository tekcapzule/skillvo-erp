Create a demo page for the [COMPONENT_NAME] component similar to the button and color-picker demo pages. Please follow these steps:

1. Create the following files in apps/demo/src/app/pages/[CATEGORY]/[COMPONENT_NAME]-demo/:
   - [COMPONENT_NAME]-demo.component.html
   - [COMPONENT_NAME]-demo.component.scss
   - [COMPONENT_NAME]-demo.component.ts

2. HTML structure should be simple:
   ```html
   <div class="component-demo-container">
     <demo-shell [demoId]="DEMO_ID"></demo-shell>
   </div>
   ```

3. In the TypeScript file:
   - Set DEMO_ID to '[COMPONENT_NAME]-component'
   - Import the component from '@skillvo-web/ui-components'
   - Implement the following methods:
     - registerComponentDemo() with properties, events, code snippets, and variants
     - getComponentProperties() with all input properties
     - getComponentEvents() with all output events
     - getComponentCodeSnippets() with usage examples
     - getComponentVariants() with different configurations

4. Add appropriate styling in the SCSS file

5. Update the app.routes.ts file to include the new route:
   ```typescript
   { 
     path: '[COMPONENT_PATH]', 
     loadComponent: () => import('./pages/[CATEGORY]/[COMPONENT_NAME]-demo/[COMPONENT_NAME]-demo.component').then(m => m.[COMPONENT_NAME_PASCAL]DemoComponent) 
   }
   ```

Please use the same patterns and structure as the existing demo pages, and ensure all component properties, events, and variants are properly documented.