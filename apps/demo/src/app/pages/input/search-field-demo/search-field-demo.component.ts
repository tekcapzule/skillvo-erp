import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { SearchFieldComponent } from '@skillvo-web/ui-components';
import { RouterModule } from '@angular/router';
import { DemoShellComponent } from '../../../core/components/demo-shell/demo-shell.component';
import { ComponentDemo, EventDefinition, PropertyDefinition, PropertyType } from '../../../core/interfaces/component-demo.interface';
import { DemoRegistryService } from '../../../core/services/demo-registry.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-field-demo',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    SearchFieldComponent, 
    RouterModule,
    DemoShellComponent
  ],
  templateUrl: './search-field-demo.component.html',
  styleUrls: ['./search-field-demo.component.scss']
})
export class SearchFieldDemoComponent implements AfterViewInit, OnDestroy {
  readonly DEMO_ID = 'search-field-component';
  private destroy$ = new Subject<void>();

  constructor(
    private demoRegistry: DemoRegistryService,
    private elementRef: ElementRef
  ) {
    // Register the Search Field component demo
    this.registerSearchFieldDemo();
  }

  ngAfterViewInit(): void {
    // Listen for when the component is rendered in the demo shell
    this.demoRegistry.activeDemo$
      .pipe(takeUntil(this.destroy$))
      .subscribe(demo => {
        if (demo && demo.id === this.DEMO_ID) {
          setTimeout(() => {
            this.applySearchFieldContent();
          }, 0);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private applySearchFieldContent(): void {
    // Find the search field elements in the demo container
    const searchFieldElements = this.elementRef.nativeElement.querySelectorAll('sv-search-field');

    // Apply search field display text based on properties
    searchFieldElements.forEach((searchField: HTMLElement) => {
      // Get variant type
      const variantAttr = searchField.getAttribute('ng-reflect-variant');
      const variant = variantAttr ? variantAttr : 'default';
      
      // Check if disabled
      const isDisabled = searchField.hasAttribute('disabled');
      
      let labelText = 'Standard Search';
      
      if (isDisabled) {
        labelText = 'Disabled Search';
      } else if (variant === 'compact') {
        labelText = 'Compact Search';
      } else if (variant === 'expanded') {
        labelText = 'Expanded Search';
      } else if (variant === 'rounded') {
        labelText = 'Rounded Search';
      }
      
      // Find the label element and set text
      const labelElement = searchField.querySelector('.sv-input-label');
      if (labelElement) {
        labelElement.textContent = labelText;
      }
    });
  }

  private registerSearchFieldDemo(): void {
    const searchFieldDemo: ComponentDemo<SearchFieldComponent> = {
      id: this.DEMO_ID,
      name: 'Search Field Component',
      description: 'A search field component with different variants, real-time search suggestions, and customizable behavior.',
      component: SearchFieldComponent,
      properties: this.getSearchFieldProperties(),
      events: this.getSearchFieldEvents(),
      codeSnippets: this.getSearchFieldCodeSnippets(),
      variants: this.getSearchFieldVariants(),
      defaultVariantId: 'default',
      cssClasses: [
        'sv-search-field-container',
        'sv-search-field-inner',
        'sv-search-field-input',
        'sv-search-field-icon',
        'sv-search-field-clear'
      ]
    };

    this.demoRegistry.registerDemo(searchFieldDemo);
  }

  private getSearchFieldProperties(): PropertyDefinition[] {
    return [
      {
        name: 'variant',
        type: PropertyType.SELECT,
        defaultValue: 'default',
        category: 'Appearance',
        description: 'The visual style of the search field',
        options: ['default', 'compact', 'expanded', 'rounded']
      },
      {
        name: 'showSubmitButton',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'Appearance',
        description: 'Whether to show a submit button next to the search input'
      },
      {
        name: 'submitButtonText',
        type: PropertyType.STRING,
        defaultValue: 'Search',
        category: 'Content',
        description: 'Text to display on the submit button'
      },
      {
        name: 'results',
        type: PropertyType.ARRAY,
        defaultValue: '[]',
        category: 'Data',
        description: 'Array of search results to display in dropdown'
      },
      {
        name: 'isLoading',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'State',
        description: 'Whether the search is currently loading'
      },
      {
        name: 'emptyResultsMessage',
        type: PropertyType.STRING,
        defaultValue: 'No results found',
        category: 'Content',
        description: 'Message to display when no results are found'
      },
      {
        name: 'loadingMessage',
        type: PropertyType.STRING,
        defaultValue: 'Searching...',
        category: 'Content',
        description: 'Message to display while searching'
      },
      {
        name: 'showClearButton',
        type: PropertyType.BOOLEAN,
        defaultValue: true,
        category: 'Appearance',
        description: 'Whether to show the clear button when text is entered'
      },
      {
        name: 'debounceTime',
        type: PropertyType.NUMBER,
        defaultValue: 300,
        category: 'Behavior',
        description: 'Time in milliseconds to wait before triggering a search after typing'
      },
      {
        name: 'minChars',
        type: PropertyType.NUMBER,
        defaultValue: 2,
        category: 'Behavior',
        description: 'Minimum number of characters before triggering a search'
      },
      {
        name: 'highlightMatches',
        type: PropertyType.BOOLEAN,
        defaultValue: true,
        category: 'Appearance',
        description: 'Whether to highlight matched text in search results'
      },
      {
        name: 'groupedResults',
        type: PropertyType.OBJECT,
        defaultValue: '{}',
        category: 'Data',
        description: 'Object containing grouped search results by category'
      },
      {
        name: 'placeholder',
        type: PropertyType.STRING,
        defaultValue: 'Search...',
        category: 'Content',
        description: 'Placeholder text for the search input'
      },
      {
        name: 'disabled',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'State',
        description: 'Whether the search field is disabled'
      },
      {
        name: 'readonly',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'State',
        description: 'Whether the search field is read-only'
      },
      {
        name: 'label',
        type: PropertyType.STRING,
        defaultValue: '',
        category: 'Content',
        description: 'Label for the search field'
      },
      {
        name: 'helpText',
        type: PropertyType.STRING,
        defaultValue: '',
        category: 'Content',
        description: 'Help text displayed below the search field'
      }
    ];
  }

  private getSearchFieldEvents(): EventDefinition[] {
    return [
      {
        name: 'search',
        description: 'Emitted when the user types in the search field (debounced)'
      },
      {
        name: 'resultSelected',
        description: 'Emitted when a search result is selected'
      },
      {
        name: 'clear',
        description: 'Emitted when the search is cleared'
      },
      {
        name: 'submit',
        description: 'Emitted when the search is submitted via button or Enter key'
      }
    ];
  }

  private getSearchFieldCodeSnippets(): any[] {
    return [
      {
        language: 'html',
        title: 'Basic Usage',
        description: 'Simple search field with default settings',
        code: '<sv-search-field placeholder="Search..."></sv-search-field>'
      },
      {
        language: 'html',
        title: 'With Submit Button',
        description: 'Search field with submit button',
        code: '<sv-search-field [showSubmitButton]="true" submitButtonText="Find"></sv-search-field>'
      },
      {
        language: 'html',
        title: 'Compact Variant',
        description: 'Compact search field for smaller spaces',
        code: '<sv-search-field variant="compact" placeholder="Quick search..."></sv-search-field>'
      },
      {
        language: 'html',
        title: 'With Results',
        description: 'Search field with result dropdown',
        code: '<sv-search-field [results]="searchResults" (search)="onSearch($event)" (resultSelected)="onResultSelected($event)"></sv-search-field>'
      },
      {
        language: 'html',
        title: 'Full Configuration',
        description: 'Search field with all properties configured',
        code: `<sv-search-field 
  variant="rounded"
  [showSubmitButton]="true"
  submitButtonText="Search"
  [results]="searchResults"
  [isLoading]="isSearching"
  emptyResultsMessage="No matches found"
  loadingMessage="Looking for results..."
  [showClearButton]="true"
  [debounceTime]="500"
  [minChars]="3"
  [highlightMatches]="true"
  placeholder="Search knowledge base"
  label="Knowledge Search"
  helpText="Enter at least 3 characters to search"
  (search)="onSearch($event)"
  (resultSelected)="onResultSelected($event)"
  (clear)="onSearchCleared()"
  (submit)="onSearchSubmitted($event)">
</sv-search-field>`
      },
      {
        language: 'typescript',
        title: 'Component Implementation',
        description: 'Example of how to implement the search field in a component',
        code: `import { Component } from '@angular/core';
import { SearchFieldComponent, SearchResult } from '@skillvo-web/ui-components';

@Component({
  selector: 'app-my-component',
  template: \`
    <sv-search-field
      [results]="searchResults"
      [isLoading]="isSearching"
      (search)="onSearch($event)"
      (resultSelected)="onResultSelected($event)">
    </sv-search-field>
  \`,
  standalone: true,
  imports: [SearchFieldComponent]
})
export class MyComponent {
  searchResults: SearchResult[] = [];
  isSearching = false;
  
  onSearch(query: string): void {
    this.isSearching = true;
    
    // Simulate API call
    setTimeout(() => {
      this.searchResults = [
        { id: 1, title: 'Result 1', description: 'Description for result 1' },
        { id: 2, title: 'Result 2', description: 'Description for result 2' },
        { id: 3, title: 'Result 3', description: 'Description for result 3' }
      ].filter(result => 
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.description.toLowerCase().includes(query.toLowerCase())
      );
      
      this.isSearching = false;
    }, 500);
  }
  
  onResultSelected(result: SearchResult): void {
    console.log('Selected result:', result);
    // Handle the selected result
  }
}`
      }
    ];
  }

  private getSearchFieldVariants(): any[] {
    return [
      {
        id: 'default',
        label: 'Default',
        description: 'Standard search field with icon and clear button',
        properties: {},
        template: `<sv-search-field 
  placeholder="Search..." 
  label="Standard Search"
></sv-search-field>`
      },
      {
        id: 'compact',
        label: 'Compact',
        description: 'Smaller search field for limited space',
        properties: {
          variant: 'compact'
        },
        template: `<sv-search-field 
  variant="compact" 
  placeholder="Quick search..." 
  label="Compact Search"
></sv-search-field>`
      },
      {
        id: 'expanded',
        label: 'Expanded',
        description: 'Larger search field for primary search experiences',
        properties: {
          variant: 'expanded'
        },
        template: `<sv-search-field 
  variant="expanded" 
  placeholder="Search everything..." 
  label="Expanded Search"
></sv-search-field>`
      },
      {
        id: 'rounded',
        label: 'Rounded',
        description: 'Fully rounded search field',
        properties: {
          variant: 'rounded'
        },
        template: `<sv-search-field 
  variant="rounded" 
  placeholder="Search..." 
  label="Rounded Search"
></sv-search-field>`
      },
      {
        id: 'with-button',
        label: 'With Submit Button',
        description: 'Search field with a submit button',
        properties: {
          showSubmitButton: true,
          submitButtonText: 'Search'
        },
        template: `<sv-search-field 
  [showSubmitButton]="true" 
  submitButtonText="Search" 
  placeholder="Enter search term" 
  label="Search with Button"
></sv-search-field>`
      },
      {
        id: 'with-results',
        label: 'With Results',
        description: 'Search field with example results',
        properties: {
          results: [
            { id: 1, title: 'Result 1', description: 'Description for result 1' },
            { id: 2, title: 'Result 2', description: 'Description for result 2' },
            { id: 3, title: 'Result 3', description: 'Description for result 3' }
          ]
        },
        template: `<sv-search-field 
  [results]="[
    { id: 1, title: 'Result 1', description: 'Description for result 1' },
    { id: 2, title: 'Result 2', description: 'Description for result 2' },
    { id: 3, title: 'Result 3', description: 'Description for result 3' }
  ]" 
  placeholder="Type to see results" 
  label="Search with Results"
></sv-search-field>`
      },
      {
        id: 'loading',
        label: 'Loading State',
        description: 'Search field in loading state',
        properties: {
          isLoading: true
        },
        template: `<sv-search-field 
  [isLoading]="true" 
  loadingMessage="Searching..." 
  placeholder="Loading example" 
  label="Loading Search"
></sv-search-field>`
      },
      {
        id: 'disabled',
        label: 'Disabled',
        description: 'Disabled search field',
        properties: {
          disabled: true
        },
        template: `<sv-search-field 
  [disabled]="true" 
  placeholder="Cannot search" 
  label="Disabled Search"
></sv-search-field>`
      }
    ];
  }
} 