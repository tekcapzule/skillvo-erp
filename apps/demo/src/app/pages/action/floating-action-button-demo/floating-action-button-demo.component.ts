import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FloatingActionButtonComponent } from '@skillvo-web/ui-components';
import { RouterModule } from '@angular/router';
import { DemoShellComponent } from '../../../core/components/demo-shell/demo-shell.component';
import { ComponentDemo, EventDefinition, PropertyDefinition, PropertyType } from '../../../core/interfaces/component-demo.interface';
import { DemoRegistryService } from '../../../core/services/demo-registry.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-floating-action-button-demo',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    FloatingActionButtonComponent, 
    RouterModule,
    DemoShellComponent
  ],
  templateUrl: './floating-action-button-demo.component.html',
  styleUrls: ['./floating-action-button-demo.component.scss']
})
export class FloatingActionButtonDemoComponent implements AfterViewInit, OnDestroy {
  readonly DEMO_ID = 'floating-action-button-component';
  private destroy$ = new Subject<void>();

  constructor(
    private demoRegistry: DemoRegistryService,
    private elementRef: ElementRef
  ) {
    // Register the Floating Action Button component demo
    this.registerFloatingActionButtonDemo();
  }

  ngAfterViewInit(): void {
    // Listen for when the component is rendered in the demo shell
    this.demoRegistry.activeDemo$
      .pipe(takeUntil(this.destroy$))
      .subscribe(demo => {
        if (demo && demo.id === this.DEMO_ID) {
          setTimeout(() => {
            // Apply content for FABs
            this.applyFabContent();
          }, 0);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private applyFabContent(): void {
    // Find the FAB elements in the demo container
    const fabElements = this.elementRef.nativeElement.querySelectorAll('sv-fab');

    // Apply icon and text based on variant
    fabElements.forEach((fab: HTMLElement) => {
      // Check variant attributes
      const variantClass = Array.from(fab.classList)
        .find(cls => cls.startsWith('sv-fab-') && 
              !cls.includes('mini') && 
              !cls.includes('large') && 
              !cls.includes('absolute') && 
              !cls.includes('extended') && 
              !cls.includes('expandable') && 
              !cls.includes('bottom') && 
              !cls.includes('top') && 
              !cls.includes('center'));
      
      const variant = variantClass ? variantClass.replace('sv-fab-', '') : 'primary';
      const isExtended = fab.classList.contains('sv-fab-extended');
      const isLoading = fab.classList.contains('loading');
      const isDisabled = fab.classList.contains('disabled');
      
      // Add icon if not present
      let iconElement = fab.querySelector('.sv-fab-icon');
      if (!iconElement) {
        iconElement = document.createElement('i');
        iconElement.className = 'material-icons sv-fab-icon';
        
        // Select icon based on variant
        let iconName = 'add';
        if (variant === 'success') {
          iconName = 'check';
        } else if (variant === 'secondary') {
          iconName = 'edit';
        }
        
        iconElement.textContent = iconName;
        fab.appendChild(iconElement);
      }
      
      // Add text for extended FAB
      if (isExtended) {
        let textElement = fab.querySelector('.sv-fab-text');
        if (!textElement) {
          textElement = document.createElement('span');
          textElement.className = 'sv-fab-text';
          
          // Text based on variant and state
          let buttonText = variant.charAt(0).toUpperCase() + variant.slice(1);
          
          if (isLoading) {
            buttonText = 'Loading...';
          } else if (isDisabled) {
            buttonText = 'Disabled';
          } else if (variant === 'primary') {
            buttonText = 'Create';
          } else if (variant === 'secondary') {
            buttonText = 'Edit';
          } else if (variant === 'success') {
            buttonText = 'Complete';
          }
          
          textElement.textContent = buttonText;
          fab.appendChild(textElement);
        }
      }
    });
  }

  private registerFloatingActionButtonDemo(): void {
    const fabDemo: ComponentDemo<FloatingActionButtonComponent> = {
      id: this.DEMO_ID,
      name: 'Floating Action Button Component',
      description: 'A prominent floating button that triggers the primary action in an application or interface.',
      component: FloatingActionButtonComponent,
      properties: this.getFabProperties(),
      events: this.getFabEvents(),
      codeSnippets: this.getFabCodeSnippets(),
      variants: this.getFabVariants(),
      defaultVariantId: 'primary-regular',
      cssClasses: [
        'sv-fab-primary',
        'sv-fab-secondary',
        'sv-fab-success',
        'sv-fab-mini',
        'sv-fab-large',
        'sv-fab-extended',
        'sv-fab-expandable',
        'sv-fab-absolute',
        'sv-fab-bottom-right',
        'sv-fab-bottom-left',
        'sv-fab-top-right',
        'sv-fab-top-left',
        'sv-fab-center'
      ]
    };

    this.demoRegistry.registerDemo(fabDemo);
  }

  private getFabProperties(): PropertyDefinition[] {
    return [
      {
        name: 'variant',
        type: PropertyType.SELECT,
        defaultValue: 'primary',
        category: 'Appearance',
        description: 'Visual style variant of the FAB',
        options: ['primary', 'secondary', 'success']
      },
      {
        name: 'size',
        type: PropertyType.SELECT,
        defaultValue: 'regular',
        category: 'Appearance',
        description: 'Size of the floating action button',
        options: ['mini', 'regular', 'large']
      },
      {
        name: 'disabled',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'State',
        description: 'Whether the FAB is disabled'
      },
      {
        name: 'loading',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'State',
        description: 'Whether the FAB is in loading state'
      },
      {
        name: 'ariaLabel',
        type: PropertyType.STRING,
        defaultValue: '',
        category: 'Accessibility',
        description: 'Aria label for the FAB'
      },
      {
        name: 'position',
        type: PropertyType.SELECT,
        defaultValue: 'bottom-right',
        category: 'Layout',
        description: 'Position of the FAB in the container when absolute positioning is used',
        options: ['bottom-right', 'bottom-left', 'top-right', 'top-left', 'center']
      },
      {
        name: 'absolute',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'Layout',
        description: 'Whether the FAB should use absolute positioning'
      },
      {
        name: 'extended',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'Appearance',
        description: 'Whether the FAB should be extended with text label'
      },
      {
        name: 'expandable',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'Behavior',
        description: 'Whether the FAB can expand to show text on hover/focus'
      },
      {
        name: 'pressed',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'State',
        description: 'Whether the FAB is in a pressed/active state'
      }
    ];
  }

  private getFabEvents(): EventDefinition[] {
    return [
      {
        name: 'click',
        description: 'Emitted when the FAB is clicked'
      }
    ];
  }

  private getFabCodeSnippets(): any[] {
    return [
      {
        language: 'html',
        title: 'Basic Usage',
        description: 'Simple floating action button with an icon',
        code: `<sv-fab 
  variant="primary" 
  ariaLabel="Create New Item"
  (click)="onCreateItem()">
  <i class="material-icons sv-fab-icon">add</i>
</sv-fab>`
      },
      {
        language: 'html',
        title: 'Extended FAB',
        description: 'Extended floating action button with text',
        code: `<sv-fab 
  variant="primary" 
  [extended]="true"
  ariaLabel="Create New Item"
  (click)="onCreateItem()">
  <i class="material-icons sv-fab-icon">add</i>
  <span class="sv-fab-text">Create</span>
</sv-fab>`
      },
      {
        language: 'html',
        title: 'Positioned FAB',
        description: 'FAB with absolute positioning in the bottom-right corner',
        code: `<sv-fab 
  variant="primary"
  [absolute]="true" 
  position="bottom-right"
  ariaLabel="Add Item"
  (click)="onAddItem()">
  <i class="material-icons sv-fab-icon">add</i>
</sv-fab>`
      },
      {
        language: 'typescript',
        title: 'Component Implementation',
        description: 'Example of floating action button integration in a component',
        code: `import { Component } from '@angular/core';
import { FloatingActionButtonComponent } from '@skillvo-web/ui-components';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [FloatingActionButtonComponent],
  template: \`
    <div class="container" style="position: relative; height: 400px;">
      <sv-fab 
        variant="primary"
        [absolute]="true"
        position="bottom-right"
        [extended]="isExtended"
        [loading]="isLoading"
        (click)="onFabClick()">
        <i class="material-icons sv-fab-icon">add</i>
        <span class="sv-fab-text" *ngIf="isExtended">Create</span>
      </sv-fab>
    </div>
  \`
})
export class ExampleComponent {
  isExtended = false;
  isLoading = false;
  
  onFabClick() {
    this.isLoading = true;
    // Simulate an action
    setTimeout(() => {
      this.isLoading = false;
      console.log('FAB action completed');
    }, 1500);
  }
}`
      }
    ];
  }

  private getFabVariants(): any[] {
    return [
      {
        id: 'primary-regular',
        name: 'Primary (Default)',
        description: 'Default floating action button with primary styling',
        properties: {
          variant: 'primary',
          size: 'regular'
        }
      },
      {
        id: 'secondary-regular',
        name: 'Secondary',
        description: 'Floating action button with secondary styling',
        properties: {
          variant: 'secondary',
          size: 'regular'
        }
      },
      {
        id: 'success-regular',
        name: 'Success',
        description: 'Floating action button with success styling',
        properties: {
          variant: 'success',
          size: 'regular'
        }
      },
      {
        id: 'primary-mini',
        name: 'Mini Size',
        description: 'Smaller floating action button',
        properties: {
          variant: 'primary',
          size: 'mini'
        }
      },
      {
        id: 'primary-large',
        name: 'Large Size',
        description: 'Larger floating action button',
        properties: {
          variant: 'primary',
          size: 'large'
        }
      },
      {
        id: 'primary-extended',
        name: 'Extended',
        description: 'Extended floating action button with text label',
        properties: {
          variant: 'primary',
          size: 'regular',
          extended: true
        }
      },
      {
        id: 'primary-expandable',
        name: 'Expandable',
        description: 'Floating action button that expands on hover/focus',
        properties: {
          variant: 'primary',
          size: 'regular',
          expandable: true
        }
      },
      {
        id: 'disabled',
        name: 'Disabled',
        description: 'Floating action button in disabled state',
        properties: {
          variant: 'primary',
          size: 'regular',
          disabled: true
        }
      },
      {
        id: 'loading',
        name: 'Loading',
        description: 'Floating action button in loading state',
        properties: {
          variant: 'primary',
          size: 'regular',
          loading: true
        }
      }
    ];
  }
} 