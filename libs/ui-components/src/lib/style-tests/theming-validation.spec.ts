import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';

/**
 * Style Guide Rule 4: Theming and CSS Variables Validation
 * 
 * Requirements:
 * - Theming must use CSS variables
 * - Variables should be defined in themes/_theme-vars.scss
 * - Theme variations should use data-theme attributes
 * - Component tokens should reference global tokens
 */

export function runThemingValidationTests() {
  it('theme variables should be defined in theme files', () => {
    // Check if theme files exist
    const themeDir = path.resolve(process.cwd(), 'styles/themes');
    if (!fs.existsSync(themeDir)) {
      fail('Missing themes directory. Create styles/themes/ directory with theme variable files.');
      return;
    }
    
    // Should have at least one theme file (typically _theme-vars.scss)
    const themeFiles = glob.sync(path.join(themeDir, '**/*.scss'));
    if (themeFiles.length === 0) {
      fail('No theme files found. Create at least one theme file in styles/themes/ (e.g., _theme-vars.scss).');
      return;
    }
    
    // Read theme files and check for CSS variable definitions
    let hasRootVariables = false;
    let hasThemeVariants = false;
    
    themeFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      
      // Check for :root with CSS variables
      if (/:root\s*{[\s\S]*--[a-z0-9-]+:/i.test(content)) {
        hasRootVariables = true;
      }
      
      // Check for theme variants (typically [data-theme="dark"])
      if (/\[data-theme=["'][a-z]+["']\]\s*{/i.test(content)) {
        hasThemeVariants = true;
      }
    });
    
    if (!hasRootVariables) {
      fail('No CSS variable definitions found in theme files. Define variables using :root { --variable-name: value; }');
    }
    
    if (!hasThemeVariants) {
      fail('No theme variants found. Define at least one theme variant using [data-theme="name"] { ... }');
    }
  });
  
  it('component styles should use CSS variables for theming', () => {
    // Check global component style files
    const componentStylesDir = path.resolve(process.cwd(), 'styles/components');
    if (!fs.existsSync(componentStylesDir)) {
      // Skip if the directory doesn't exist
      return;
    }
    
    const componentStyleFiles = glob.sync(path.join(componentStylesDir, '**/*.scss'));
    const violations: Record<string, string[]> = {};
    let totalViolations = 0;
    
    // Patterns to check
    const cssVarDefinitionPattern = /--[a-z0-9-]+:\s*var\(--[a-z0-9-]+(?:,\s*[^)]+)?\)/i;
    const cssVarUsagePattern = /var\(--[a-z0-9-]+(?:,\s*[^)]+)?\)/i;
    
    componentStyleFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      const lines = content.split('\n');
      const fileName = path.basename(file);
      const fileViolations: string[] = [];
      
      // Check if file has any CSS variable definitions that reference other variables
      const hasComponentTokens = lines.some(line => cssVarDefinitionPattern.test(line));
      
      // If the file has substantial content but no component tokens
      if (!hasComponentTokens && content.length > 100) {
        // Check if there are properties that should use CSS variables
        const propertiesThatShouldUseVars = [
          /color:/i,
          /background-color:/i,
          /border-color:/i,
          /border:/i,
          /box-shadow:/i,
          /font-size:/i,
          /font-weight:/i,
          /margin:/i,
          /padding:/i,
          /gap:/i,
          /width:/i,
          /height:/i,
        ];
        
        let foundPropertyThatShouldUseVars = false;
        let usesVars = false;
        
        lines.forEach((line, index) => {
          // Skip comment lines
          if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim() === '') {
            return;
          }
          
          // Check if line contains property that should use variables
          const hasPropertyThatShouldUseVars = propertiesThatShouldUseVars.some(p => p.test(line));
          
          if (hasPropertyThatShouldUseVars) {
            foundPropertyThatShouldUseVars = true;
            
            // If it doesn't use CSS variables
            if (!cssVarUsagePattern.test(line)) {
              fileViolations.push(`Line ${index + 1}: Should use CSS variables: ${line.trim()}`);
            } else {
              usesVars = true;
            }
          }
        });
        
        // If we found properties that should use vars, but none actually do
        if (foundPropertyThatShouldUseVars && !usesVars) {
          fileViolations.push('File should define component-specific tokens using CSS variables');
        }
      }
      
      // Add violations if found
      if (fileViolations.length > 0) {
        violations[fileName] = fileViolations;
        totalViolations += fileViolations.length;
      }
    });
    
    // If violations exist, fail the test with details
    if (totalViolations > 0) {
      let errorMessage = `Found ${totalViolations} component files not using CSS variables properly:\n\n`;
      
      Object.entries(violations).forEach(([file, violations]) => {
        errorMessage += `${file} (${violations.length} issues):\n`;
        errorMessage += violations.join('\n');
        errorMessage += '\n\n';
      });
      
      errorMessage += '\nFix by defining and using CSS variables for component tokens';
      
      fail(errorMessage);
    }
  });
  
  it('component SCSS should reference theme variables', () => {
    // Find component SCSS files
    const componentsDir = path.resolve(process.cwd(), 'libs/ui-components/src/lib/components');
    const scssFiles = glob.sync(path.join(componentsDir, '**/*.component.scss'));
    
    const violations: Record<string, string[]> = {};
    let totalViolations = 0;
    
    scssFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      const lines = content.split('\n');
      const componentName = path.basename(file).replace('.component.scss', '');
      const fileViolations: string[] = [];
      
      // CSS properties that commonly need theming
      const themableProperties = [
        /color:/i,
        /background-color:/i,
        /border-color:/i,
        /fill:/i,
        /stroke:/i,
        /box-shadow:/i,
      ];
      
      lines.forEach((line, index) => {
        // Skip comments and empty lines
        if (line.trim().startsWith('//') || 
            line.trim().startsWith('/*') || 
            line.trim() === '' ||
            !/:/.test(line)) {
          return;
        }
        
        // If line contains a themable property and has a hardcoded color value
        const hasThemableProperty = themableProperties.some(p => p.test(line));
        const hasHardcodedValue = /#[0-9a-fA-F]{3,8}|rgb\(|rgba\(|hsl\(|hsla\(/.test(line);
        
        if (hasThemableProperty && hasHardcodedValue && !line.includes('var(--')) {
          fileViolations.push(`Line ${index + 1}: Themable property with hardcoded value: ${line.trim()}`);
        }
      });
      
      if (fileViolations.length > 0) {
        violations[componentName] = fileViolations;
        totalViolations += fileViolations.length;
      }
    });
    
    // If violations exist, fail the test with details
    if (totalViolations > 0) {
      let errorMessage = `Found ${totalViolations} instances where component styles have hardcoded themable values:\n\n`;
      
      Object.entries(violations).forEach(([component, violations]) => {
        errorMessage += `${component} (${violations.length} violations):\n`;
        errorMessage += violations.join('\n');
        errorMessage += '\n\n';
      });
      
      errorMessage += '\nFix by using CSS variables for themable properties';
      
      fail(errorMessage);
    }
  });
} 