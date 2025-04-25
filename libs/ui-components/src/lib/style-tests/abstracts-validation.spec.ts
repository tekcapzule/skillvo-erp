import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';

/**
 * Style Guide Rule 3: Abstracts Folder Validation
 * 
 * Files in abstracts/ should:
 * - ONLY contain SCSS maps, mixins, functions, and variables
 * - NOT output any CSS directly
 * - NOT contain root, body, or other selectors
 * 
 * Everything in abstracts/ should only be used in other files
 */

export function runAbstractsValidationTests() {
  it('abstracts folder should not output CSS directly', () => {
    // Get all SCSS files in the abstracts directory
    const abstractsDir = path.resolve(process.cwd(), 'styles/abstracts');
    if (!fs.existsSync(abstractsDir)) {
      return; // Skip test if abstracts directory doesn't exist
    }
    
    const scssFiles = glob.sync(path.join(abstractsDir, '**/*.scss'));
    
    // Patterns to detect CSS output
    const cssOutputPatterns = [
      /^\s*[^\$@:._]+\s*{/,        // Selectors followed by opening bracket
      /^\s*:root\s*{/,             // :root selector
      /^\s*body\s*{/,              // body selector
      /^\s*html\s*{/,              // html selector
      /^\s*\*\s*{/,                // * selector
      /^\s*\.\w+\s*{/,             // Class selectors
      /^\s*#\w+\s*{/               // ID selectors
    ];
    
    // Allowed patterns in abstracts
    const allowedPatterns = [
      /^\s*\/\//,                  // Comments
      /^\s*\/\*/,                  // Block comments
      /^\s*\*\//,                  // Block comment end
      /^\s*\$/,                    // Variables
      /^\s*@function/,             // Functions
      /^\s*@mixin/,                // Mixins
      /^\s*@include/,              // Include statements
      /^\s*@import/,               // Import statements
      /^\s*@forward/,              // Forward statements
      /^\s*@use/,                  // Use statements
      /^\s*@return/,               // Return statements
      /^\s*@if/,                   // If statements
      /^\s*@else/,                 // Else statements
      /^\s*@each/,                 // Each statements
      /^\s*@for/,                  // For statements
      /^\s*@while/,                // While statements
      /^\s*@error/,                // Error statements
      /^\s*@warn/,                 // Warn statements
      /^\s*@debug/,                // Debug statements
      /^\s*\(/,                    // Opening parenthesis
      /^\s*\)/,                    // Closing parenthesis
      /^\s*{/,                     // Opening bracket (for maps)
      /^\s*}/,                     // Closing bracket
      /^\s*["']/,                  // String
      /^\s*[0-9]/,                 // Numbers
      /^\s*$/                      // Empty lines
    ];
    
    const violations: Record<string, string[]> = {};
    let totalViolations = 0;
    
    scssFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      const lines = content.split('\n');
      const fileName = path.basename(file);
      const fileViolations: string[] = [];
      
      lines.forEach((line, index) => {
        // Check if line looks like a CSS selector or output
        const hasCssOutput = cssOutputPatterns.some(pattern => pattern.test(line));
        
        if (hasCssOutput) {
          const isAllowed = allowedPatterns.some(pattern => pattern.test(line));
          
          if (!isAllowed) {
            fileViolations.push(`Line ${index + 1}: Direct CSS output found: ${line.trim()}`);
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
      let errorMessage = `Found ${totalViolations} violations in abstracts/ that directly output CSS:\n\n`;
      
      Object.entries(violations).forEach(([file, violations]) => {
        errorMessage += `${file} (${violations.length} violations):\n`;
        errorMessage += violations.join('\n');
        errorMessage += '\n\n';
      });
      
      errorMessage += '\nFix by moving direct CSS output to appropriate folders (base/, components/, etc.)';
      
      fail(errorMessage);
    }
  });
  
  it('abstracts folder should only contain maps, variables, functions, and mixins', () => {
    // Get all SCSS files in the abstracts directory
    const abstractsDir = path.resolve(process.cwd(), 'styles/abstracts');
    if (!fs.existsSync(abstractsDir)) {
      return; // Skip test if abstracts directory doesn't exist
    }
    
    const scssFiles = glob.sync(path.join(abstractsDir, '**/*.scss'));
    
    // Required patterns in abstracts (at least one of these should be present)
    const requiredPatterns = [
      /\$/,                        // Variables
      /@function/,                 // Functions
      /@mixin/,                    // Mixins
      /\(\s*\)/,                   // Maps
      /map\-get/,                  // Map utilities
      /@forward/,                  // Forward statement
      /@use/                       // Use statement
    ];
    
    const invalidFiles: string[] = [];
    
    scssFiles.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      const fileName = path.basename(file);
      
      // Check if file has at least one of the required patterns
      const hasRequiredContent = requiredPatterns.some(pattern => pattern.test(content));
      
      if (!hasRequiredContent) {
        invalidFiles.push(fileName);
      }
    });
    
    // If violations exist, fail the test with details
    if (invalidFiles.length > 0) {
      fail(`The following files in abstracts/ don't contain maps, variables, functions, or mixins:\n${invalidFiles.join('\n')}\n\nFix by moving these files to appropriate folders or adding appropriate content.`);
    }
  });
} 