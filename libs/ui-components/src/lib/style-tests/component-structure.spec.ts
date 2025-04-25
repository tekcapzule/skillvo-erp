import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';

/**
 * Style Guide Rule 2: Component SCSS Structure Validation
 * 
 * Component SCSS files should ONLY contain:
 * - Layout structure (flexbox, grid, positioning)
 * - Component-specific behavior (animation, state transitions)
 * - z-index and display properties
 * 
 * Component SCSS files should NOT contain:
 * - Visual styling (colors, borders, shadows)
 * - Typography (font-weight, font-size)
 * - These should be in styles/components/ partials
 */

export function runComponentStructureTests() {
  it('component SCSS files should only contain layout/structure', () => {
    // Find all component SCSS files
    const componentsDir = path.resolve(process.cwd(), 'libs/ui-components/src/lib/components');
    const scssFiles = glob.sync(path.join(componentsDir, '**/*.component.scss'));
    
    // Properties that should not be directly in component SCSS files
    const visualStyleProps = [
      /color:/,
      /background-color:/,
      /border-color:/,
      /border-style:/,
      /border-radius:/,
      /box-shadow:/,
      /text-shadow:/,
      /font-weight:/,
      /font-size:/,
      /font-family:/,
      /line-height:/,
      /letter-spacing:/,
    ];
    
    // Properties that are allowed (layout/structure)
    const allowedProps = [
      /display:/,
      /position:/,
      /flex:/,
      /grid:/,
      /margin:/,
      /padding:/,
      /width:/,
      /height:/,
      /top:/,
      /right:/,
      /bottom:/,
      /left:/,
      /z-index:/,
      /overflow:/,
      /visibility:/,
      /opacity:/,
      /transform:/,
      /transition:/,
      /animation:/,
      /gap:/,
    ];
    
    // Track violations
    const allViolations: Record<string, string[]> = {};
    let totalViolations = 0;
    
    scssFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      const lines = content.split('\n');
      const componentName = path.basename(file).replace('.component.scss', '');
      const violations: string[] = [];
      
      lines.forEach((line, index) => {
        // Skip comments and empty lines
        if (line.trim().startsWith('//') || 
            line.trim().startsWith('/*') || 
            line.trim() === '' ||
            !/:/.test(line)) {
          return;
        }
        
        // Skip nested structure/selector lines
        if (line.includes('{') || line.includes('}')) {
          return;
        }
        
        // Check if line contains any of the visual style properties 
        // that should not be directly in component SCSS
        for (const prop of visualStyleProps) {
          if (prop.test(line) && !line.includes('var(--')) {
            violations.push(`Line ${index + 1}: Visual styling found in component SCSS: ${line.trim()}`);
            break;
          }
        }
      });
      
      if (violations.length > 0) {
        allViolations[componentName] = violations;
        totalViolations += violations.length;
      }
    });
    
    // If violations exist, fail the test with details
    if (totalViolations > 0) {
      let errorMessage = `Found ${totalViolations} component SCSS files with visual styling that should be in global component partials:\n\n`;
      
      Object.entries(allViolations).forEach(([component, violations]) => {
        errorMessage += `${component} (${violations.length} violations):\n`;
        errorMessage += violations.join('\n');
        errorMessage += '\n\n';
      });
      
      errorMessage += '\nFix by moving visual styling to styles/components/_component.scss';
      
      fail(errorMessage);
    }
  });
  
  it('global component partials should exist for each component', () => {
    // Get all component names from component directory
    const componentsDir = path.resolve(process.cwd(), 'libs/ui-components/src/lib/components');
    const componentDirs = fs.readdirSync(componentsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    // Get all component partials from global styles
    const stylesDir = path.resolve(process.cwd(), 'styles/components');
    const partialFiles = fs.existsSync(stylesDir) ? 
      fs.readdirSync(stylesDir)
        .filter(file => file.startsWith('_') && file.endsWith('.scss'))
        .map(file => file.slice(1, -5)) : // Remove leading _ and .scss extension
      [];
    
    // Check if each component has a corresponding partial
    const missingPartials: string[] = [];
    
    componentDirs.forEach(component => {
      // Check if a corresponding partial exists
      // We need to normalize the names as components might be kebab-case
      // while partials might remove the hyphens
      const normalizedComponent = component.replace(/-/g, '').toLowerCase();
      
      const hasPartial = partialFiles.some(partial => {
        const normalizedPartial = partial.replace(/-/g, '').toLowerCase();
        return normalizedPartial.includes(normalizedComponent);
      });
      
      if (!hasPartial) {
        missingPartials.push(component);
      }
    });
    
    // Fail if any component is missing a partial
    if (missingPartials.length > 0) {
      fail(`The following components are missing global style partials in styles/components/:\n${missingPartials.join('\n')}\n\nCreate _component-name.scss files for each component.`);
    }
  });
} 