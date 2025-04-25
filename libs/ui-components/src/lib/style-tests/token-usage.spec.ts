import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';

/**
 * Style Guide Rule 1: All styles must use design tokens
 * 
 * Tests that components don't use hardcoded values like:
 * - color: #fff
 * - margin: 16px
 * - font-size: 14px
 * 
 * And instead use design tokens:
 * - color: var(--text-primary)
 * - margin: var(--space-4)
 * - font-size: var(--font-size-base)
 */

export function runTokenUsageTests() {
  // Define patterns to detect hardcoded values
  const colorPattern = /#[0-9a-fA-F]{3,8}|rgb\(|rgba\(|hsl\(|hsla\(/;
  const spacingPattern = /\b(margin|padding|gap|top|right|bottom|left|width|height):\s*\d+px/;
  const fontSizePattern = /font-size:\s*\d+px/;
  const fontWeightPattern = /font-weight:\s*\d+\b(?!\s*\/)/;
  const fontFamilyPattern = /font-family:[^;]+(?!var\(--)/;
  const borderPattern = /border(?:-\w+)?:\s*\d+px/;
  const boxShadowPattern = /box-shadow:[^;]+(?!var\(--)/;
  const zIndexPattern = /z-index:\s*\d+\b/;
  
  // List of acceptable exceptions (if any)
  const allowedExceptions = [
    // For example: animation timing, transform properties, etc.
    /transform:/,
    /animation:/,
    /transition:/,
    /0px/,  // Zero values are acceptable (0px is the same as 0)
    /calc\(/,
    /--/,   // Variable declarations are fine
  ];
  
  // Function to test if a line contains an acceptable exception
  const isException = (line: string) => {
    return allowedExceptions.some(pattern => pattern.test(line));
  };
  
  // Test component SCSS files
  it('component SCSS files should use design tokens, not hardcoded values', () => {
    // Find all component SCSS files in the component directories
    const componentsDir = path.resolve(process.cwd(), 'libs/ui-components/src/lib/components');
    const scssFiles = glob.sync(path.join(componentsDir, '**/*.scss'));
    
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
        if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim() === '') {
          return;
        }
        
        // Skip lines with variable declarations
        if (line.includes(':root') || line.includes('$') || isException(line)) {
          return;
        }
        
        // Test for violations of each pattern
        if (colorPattern.test(line) && !line.includes('var(--')) {
          violations.push(`Line ${index + 1}: Hardcoded color: ${line.trim()}`);
        }
        
        if (spacingPattern.test(line) && !line.includes('var(--')) {
          violations.push(`Line ${index + 1}: Hardcoded spacing: ${line.trim()}`);
        }
        
        if (fontSizePattern.test(line) && !line.includes('var(--')) {
          violations.push(`Line ${index + 1}: Hardcoded font size: ${line.trim()}`);
        }
        
        if (fontWeightPattern.test(line) && !line.includes('var(--')) {
          violations.push(`Line ${index + 1}: Hardcoded font weight: ${line.trim()}`);
        }
        
        if (fontFamilyPattern.test(line) && !line.includes('var(--')) {
          violations.push(`Line ${index + 1}: Hardcoded font family: ${line.trim()}`);
        }
        
        if (borderPattern.test(line) && !line.includes('var(--')) {
          violations.push(`Line ${index + 1}: Hardcoded border: ${line.trim()}`);
        }
        
        if (boxShadowPattern.test(line) && !line.includes('var(--')) {
          violations.push(`Line ${index + 1}: Hardcoded box shadow: ${line.trim()}`);
        }
        
        if (zIndexPattern.test(line) && !line.includes('var(--')) {
          violations.push(`Line ${index + 1}: Hardcoded z-index: ${line.trim()}`);
        }
      });
      
      if (violations.length > 0) {
        allViolations[componentName] = violations;
        totalViolations += violations.length;
      }
    });
    
    // If violations exist, fail the test with details
    if (totalViolations > 0) {
      let errorMessage = `Found ${totalViolations} hardcoded values that should be using design tokens:\n\n`;
      
      Object.entries(allViolations).forEach(([component, violations]) => {
        errorMessage += `${component} (${violations.length} violations):\n`;
        errorMessage += violations.join('\n');
        errorMessage += '\n\n';
      });
      
      errorMessage += '\nFix by replacing hardcoded values with design tokens: var(--token-name)';
      
      fail(errorMessage);
    }
  });
  
  // Test for global style files in the styles directory
  it('global style files should use design tokens, not hardcoded values', () => {
    // Find relevant SCSS files in the global styles directory
    // Excluding abstracts (which are allowed to define variables)
    const stylesDir = path.resolve(process.cwd(), 'styles');
    const scssFiles = glob.sync(path.join(stylesDir, '{components,layout,utilities}/**/*.scss'));
    
    // Track violations
    const allViolations: Record<string, string[]> = {};
    let totalViolations = 0;
    
    scssFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      const lines = content.split('\n');
      const fileName = path.basename(file);
      const violations: string[] = [];
      
      lines.forEach((line, index) => {
        // Skip comments, empty lines, and variable declarations
        if (line.trim().startsWith('//') || 
            line.trim().startsWith('/*') || 
            line.trim() === '' ||
            line.includes('$') ||
            line.includes(':root') ||
            isException(line)) {
          return;
        }
        
        // Test for violations (same as component test)
        // Only apply to actual CSS property lines
        if (/:/.test(line)) {
          if (colorPattern.test(line) && !line.includes('var(--')) {
            violations.push(`Line ${index + 1}: Hardcoded color: ${line.trim()}`);
          }
          
          if (spacingPattern.test(line) && !line.includes('var(--')) {
            violations.push(`Line ${index + 1}: Hardcoded spacing: ${line.trim()}`);
          }
          
          if (fontSizePattern.test(line) && !line.includes('var(--')) {
            violations.push(`Line ${index + 1}: Hardcoded font size: ${line.trim()}`);
          }
          
          // ... other checks similar to component test
        }
      });
      
      if (violations.length > 0) {
        allViolations[fileName] = violations;
        totalViolations += violations.length;
      }
    });
    
    // If violations exist, fail the test with details
    if (totalViolations > 0) {
      let errorMessage = `Found ${totalViolations} hardcoded values in global styles that should be using design tokens:\n\n`;
      
      Object.entries(allViolations).forEach(([file, violations]) => {
        errorMessage += `${file} (${violations.length} violations):\n`;
        errorMessage += violations.join('\n');
        errorMessage += '\n\n';
      });
      
      fail(errorMessage);
    }
  });
} 