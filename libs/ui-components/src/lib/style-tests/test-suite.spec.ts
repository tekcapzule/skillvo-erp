/**
 * SkillVo Style Guide Test Suite
 * 
 * This test suite validates that all components adhere to the 
 * SkillVo Frontend Style Guide requirements.
 */

// Directly import the functions instead of using import statements
// that might cause issues with test discovery

import * as fs from 'fs';
import * as path from 'path';
import * as glob from 'glob';

// Helper function to skip tests if certain directories don't exist
function skipIfMissing(directory: string, message: string): boolean {
  if (!fs.existsSync(directory)) {
    console.warn(`Skipping tests: ${message}`);
    return true;
  }
  return false;
}

describe('SkillVo Style Guide Compliance', () => {
  // Import test functions directly to avoid module resolution issues
  const { runTokenUsageTests } = require('./token-usage.spec');
  const { runComponentStructureTests } = require('./component-structure.spec');
  const { runAbstractsValidationTests } = require('./abstracts-validation.spec');
  const { runThemingValidationTests } = require('./theming-validation.spec');
  const { runNamingConventionTests } = require('./naming-convention.spec');
  
  describe('Rule 1: No hardcoded style values - Use design tokens', () => {
    runTokenUsageTests();
  });
  
  describe('Rule 2: Component SCSS structure validation', () => {
    runComponentStructureTests();
  });
  
  describe('Rule 3: Abstracts folder validation', () => {
    runAbstractsValidationTests();
  });
  
  describe('Rule 4: Theming and CSS variables validation', () => {
    runThemingValidationTests();
  });
  
  describe('Rule 5: Naming conventions validation', () => {
    runNamingConventionTests();
  });
}); 