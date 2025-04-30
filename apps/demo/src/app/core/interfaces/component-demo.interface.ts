import { Type } from '@angular/core';

/**
 * Property type for component properties
 */
export enum PropertyType {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  SELECT = 'select',
  COLOR = 'color',
  OBJECT = 'object',
  ARRAY = 'array'
}

/**
 * Interface for property definitions
 */
export interface PropertyDefinition {
  name: string;
  type: PropertyType;
  defaultValue: any;
  description?: string;
  options?: any[]; // For SELECT type properties
  category?: string; // For grouping properties
  required?: boolean;
}

/**
 * Interface for event definitions
 */
export interface EventDefinition {
  name: string;
  description?: string;
}

/**
 * Interface for code snippets
 */
export interface CodeSnippet {
  language: 'html' | 'typescript' | 'scss';
  code: string;
  title?: string;
  description?: string;
}

/**
 * Interface for component variants/examples
 */
export interface ComponentVariant {
  id: string;
  name: string;
  description?: string;
  properties: Record<string, any>;
}

/**
 * Interface for viewport settings
 */
export interface ViewportSetting {
  id: string;
  name: string;
  width: number;
  height: number;
  deviceType: 'mobile' | 'tablet' | 'desktop';
}

/**
 * Main interface for component demo configuration
 */
export interface ComponentDemo<T = any> {
  id: string;
  name: string;
  description?: string;
  component: Type<T>;
  properties: PropertyDefinition[];
  events: EventDefinition[];
  codeSnippets: CodeSnippet[];
  variants: ComponentVariant[];
  defaultVariantId?: string;
  cssClasses?: string[];
} 