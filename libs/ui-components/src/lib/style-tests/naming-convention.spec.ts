import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';

/**
 * Style Guide Rule 5: Naming Conventions Validation
 * 
 * Requirements:
 * - Component CSS variables should follow naming conventions
 * - SCSS partials should use proper naming (with leading underscore)
 * - Component tokens should reference global tokens
 */

export function runNamingConventionTests() {
  it('component tokens should follow naming conventions', () => {
    // Check global component style files
    const componentStylesDir = path.resolve(process.cwd(), 'styles/components');
    if (!fs.existsSync(componentStylesDir)) {
      // Skip if the directory doesn't exist
      return;
    }
    
    const componentStyleFiles = glob.sync(path.join(componentStylesDir, '**/*.scss'));
    const violations: Record<string, string[]> = {};
    let totalViolations = 0;
    
    componentStyleFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      const lines = content.split('\n');
      const fileName = path.basename(file);
      const fileViolations: string[] = [];
      
      // Extract component name from filename (_button.scss -> button)
      let componentName = fileName.replace(/^_/, '').replace('.scss', '');
      componentName = componentName.replace(/-/g, '').toLowerCase();
      
      lines.forEach((line, index) => {
        // Look for component token definitions (--token-name: value)
        const varDefMatch = line.match(/--([a-z0-9-]+):/i);
        
        if (varDefMatch) {
          const tokenName = varDefMatch[1];
          
          // Component tokens should be prefixed with component name
          // Example: in _button.scss, tokens should be --button-bg, --button-text, etc.
          if (!tokenName.toLowerCase().includes(componentName)) {
            fileViolations.push(`Line ${index + 1}: Component token "${tokenName}" doesn't include component name prefix: ${line.trim()}`);
          }
        }
      });
      
      if (fileViolations.length > 0) {
        violations[fileName] = fileViolations;
        totalViolations += fileViolations.length;
      }
    });
    
    // If violations exist, fail the test with details
    if (totalViolations > 0) {
      let errorMessage = `Found ${totalViolations} component token naming violations:\n\n`;
      
      Object.entries(violations).forEach(([file, violations]) => {
        errorMessage += `${file} (${violations.length} violations):\n`;
        errorMessage += violations.join('\n');
        errorMessage += '\n\n';
      });
      
      errorMessage += '\nFix by using consistent naming with component prefix (e.g., --button-bg instead of --bg)';
      
      fail(errorMessage);
    }
  });
  
  it('SCSS partials should use leading underscore in filenames', () => {
    // Check all SCSS files in styles directory
    const stylesDir = path.resolve(process.cwd(), 'styles');
    if (!fs.existsSync(stylesDir)) {
      return;
    }
    
    // Get all SCSS files that aren't in node_modules or dist
    const scssFiles = glob.sync(path.join(stylesDir, '**/*.scss'), {
      ignore: ['**/node_modules/**', '**/dist/**', '**/main.scss'],
    });
    
    const invalidFiles: string[] = [];
    
    scssFiles.forEach(file => {
      const fileName = path.basename(file);
      
      // Partials should start with underscore
      if (!fileName.startsWith('_')) {
        invalidFiles.push(file);
      }
    });
    
    // If violations exist, fail the test with details
    if (invalidFiles.length > 0) {
      fail(`Found ${invalidFiles.length} SCSS files that don't follow partial naming convention (should start with underscore):\n${invalidFiles.join('\n')}\n\nRename files to start with underscore (e.g., _filename.scss)`);
    }
  });
  
  it('component tokens should reference global tokens where applicable', () => {
    // Check component style files
    const componentStylesDir = path.resolve(process.cwd(), 'styles/components');
    if (!fs.existsSync(componentStylesDir)) {
      return;
    }
    
    const componentStyleFiles = glob.sync(path.join(componentStylesDir, '**/*.scss'));
    const violations: Record<string, string[]> = {};
    let totalViolations = 0;
    
    // Token patterns that should reference global tokens
    const shouldReferenceGlobalTokens = [
      { pattern: /--[a-z0-9-]+-bg:/, globalReference: /var\(--bg-/ },
      { pattern: /--[a-z0-9-]+-color:/, globalReference: /var\(--text-/ },
      { pattern: /--[a-z0-9-]+-text:/, globalReference: /var\(--text-/ },
      { pattern: /--[a-z0-9-]+-border:/, globalReference: /var\(--border-/ },
      { pattern: /--[a-z0-9-]+-shadow:/, globalReference: /var\(--shadow-/ },
      { pattern: /--[a-z0-9-]+-size:/, globalReference: /var\(--size-/ },
      { pattern: /--[a-z0-9-]+-space:/, globalReference: /var\(--space-/ },
      { pattern: /--[a-z0-9-]+-spacing:/, globalReference: /var\(--space-/ },
      { pattern: /--[a-z0-9-]+-padding:/, globalReference: /var\(--space-/ },
      { pattern: /--[a-z0-9-]+-margin:/, globalReference: /var\(--space-/ },
      { pattern: /--[a-z0-9-]+-gap:/, globalReference: /var\(--space-/ },
      { pattern: /--[a-z0-9-]+-radius:/, globalReference: /var\(--radius-/ },
      { pattern: /--[a-z0-9-]+-font-size:/, globalReference: /var\(--font-size-/ },
      { pattern: /--[a-z0-9-]+-font-weight:/, globalReference: /var\(--font-weight-/ },
    ];
    
    componentStyleFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      const lines = content.split('\n');
      const fileName = path.basename(file);
      const fileViolations: string[] = [];
      
      lines.forEach((line, index) => {
        // Check each token pattern
        for (const { pattern, globalReference } of shouldReferenceGlobalTokens) {
          if (pattern.test(line)) {
            // If it matches a token that should reference a global token, but doesn't
            if (!globalReference.test(line) && !line.includes('var(--')) {
              fileViolations.push(`Line ${index + 1}: Component token should reference global token: ${line.trim()}`);
            }
          }
        }
      });
      
      if (fileViolations.length > 0) {
        violations[fileName] = fileViolations;
        totalViolations += fileViolations.length;
      }
    });
    
    // If violations exist, fail the test with details
    if (totalViolations > 0) {
      let errorMessage = `Found ${totalViolations} component tokens that should reference global tokens:\n\n`;
      
      Object.entries(violations).forEach(([file, violations]) => {
        errorMessage += `${file} (${violations.length} violations):\n`;
        errorMessage += violations.join('\n');
        errorMessage += '\n\n';
      });
      
      errorMessage += '\nFix by referencing global tokens in component tokens (e.g., --button-bg: var(--bg-surface))';
      
      fail(errorMessage);
    }
  });
} 