import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { SplitButtonComponent } from '@skillvo-web/ui-components';
import { RouterModule } from '@angular/router';
import { DemoShellComponent } from '../../../core/components/demo-shell/demo-shell.component';
import { ComponentDemo, EventDefinition, PropertyDefinition, PropertyType } from '../../../core/interfaces/component-demo.interface';
import { DemoRegistryService } from '../../../core/services/demo-registry.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-split-button-demo',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    SplitButtonComponent, 
    RouterModule,
    DemoShellComponent
  ],
  templateUrl: './split-button-demo.component.html',
  styleUrls: ['./split-button-demo.component.scss']
})
export class SplitButtonDemoComponent implements AfterViewInit, OnDestroy {
  readonly DEMO_ID = 'split-button-component';
  private destroy$ = new Subject<void>();

  constructor(
    private demoRegistry: DemoRegistryService,
    private elementRef: ElementRef
  ) {
    // Register the Split Button component demo
    this.registerSplitButtonDemo();
  }

  ngAfterViewInit(): void {
    // Listen for when the component is rendered in the demo shell
    this.demoRegistry.activeDemo$
      .pipe(takeUntil(this.destroy$))
      .subscribe(demo => {
        if (demo && demo.id === this.DEMO_ID) {
          setTimeout(() => {
            // Apply any necessary content for split buttons in the demo
            this.applySplitButtonContent();
          }, 0);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private applySplitButtonContent(): void {
    // Find the split button elements in the demo container
    const splitButtonElements = this.elementRef.nativeElement.querySelectorAll('sv-split-button');

    // Apply button text based on variant
    splitButtonElements.forEach((button: HTMLElement) => {
      // Get the action button in the split button
      const actionButton = button.querySelector('.sv-split-button-action');
      if (!actionButton) return;
      
      // Check variant attributes
      const variantClass = Array.from(button.classList)
        .find(cls => cls.startsWith('sv-split-button-'));
      
      const variant = variantClass ? variantClass.replace('sv-split-button-', '') : 'primary';
      const isDisabled = button.classList.contains('disabled');
      const isLoading = button.classList.contains('loading');
      
      let buttonText = variant.charAt(0).toUpperCase() + variant.slice(1);
      
      if (isLoading) {
        buttonText = 'Loading...';
      } else if (isDisabled) {
        buttonText = 'Disabled';
      }
      
      // Apply text content if empty
      if (actionButton.textContent?.trim() === '') {
        actionButton.textContent = buttonText;
      }
    });
  }

  private registerSplitButtonDemo(): void {
    const splitButtonDemo: ComponentDemo<SplitButtonComponent> = {
      id: this.DEMO_ID,
      name: 'Split Button Component',
      description: 'A button component that combines a primary action with a dropdown menu for related options.',
      component: SplitButtonComponent,
      properties: this.getSplitButtonProperties(),
      events: this.getSplitButtonEvents(),
      codeSnippets: this.getSplitButtonCodeSnippets(),
      variants: this.getSplitButtonVariants(),
      defaultVariantId: 'primary-md',
      cssClasses: [
        'sv-split-button-primary',
        'sv-split-button-secondary',
        'sv-split-button-tertiary',
        'sv-split-button-outline',
        'sv-split-button-destructive',
        'sv-ui-size-sm',
        'sv-ui-size-md', 
        'sv-ui-size-lg',
        'sv-ui-size-xl'
      ]
    };

    this.demoRegistry.registerDemo(splitButtonDemo);
  }

  private getSplitButtonProperties(): PropertyDefinition[] {
    return [
      {
        name: 'variant',
        type: PropertyType.SELECT,
        defaultValue: 'primary',
        category: 'Appearance',
        description: 'Visual style variant of the split button',
        options: ['primary', 'secondary', 'tertiary', 'outline', 'destructive']
      },
      {
        name: 'size',
        type: PropertyType.SELECT,
        defaultValue: 'md',
        category: 'Appearance',
        description: 'Size of the split button',
        options: ['xs', 'sm', 'md', 'lg', 'xl']
      },
      {
        name: 'disabled',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'State',
        description: 'Whether the split button is disabled'
      },
      {
        name: 'loading',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'State',
        description: 'Whether the split button is in loading state'
      },
      {
        name: 'ariaLabel',
        type: PropertyType.STRING,
        defaultValue: '',
        category: 'Accessibility',
        description: 'Aria label for the primary action button'
      },
      {
        name: 'toggleAriaLabel',
        type: PropertyType.STRING,
        defaultValue: 'Toggle dropdown',
        category: 'Accessibility',
        description: 'Aria label for the toggle button'
      },
      {
        name: 'customToggleIcon',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'Appearance',
        description: 'Whether to use a custom toggle icon instead of the default dropdown arrow'
      }
    ];
  }

  private getSplitButtonEvents(): EventDefinition[] {
    return [
      {
        name: 'actionClick',
        description: 'Emitted when the main button is clicked'
      },
      {
        name: 'toggleClick',
        description: 'Emitted when the toggle button is clicked'
      }
    ];
  }

  private getSplitButtonCodeSnippets(): any[] {
    return [
      {
        language: 'html',
        title: 'Basic Usage',
        description: 'Simple split button with primary style',
        code: `<sv-split-button variant="primary" (actionClick)="onMainAction()" (toggleClick)="onToggle()">
  Main Action
  <div dropdown-content>
    <div class="dropdown-menu-items">
      <button class="dropdown-item" (click)="onOption1()">Option 1</button>
      <button class="dropdown-item" (click)="onOption2()">Option 2</button>
      <button class="dropdown-item" (click)="onOption3()">Option 3</button>
    </div>
  </div>
</sv-split-button>`
      },
      {
        language: 'html',
        title: 'With Templates',
        description: 'Split button with custom templates for action, toggle, and dropdown content',
        code: `<sv-split-button 
  variant="primary" 
  [customToggleIcon]="true"
  (actionClick)="onSave()" 
  (toggleClick)="onToggle()">
  
  <ng-template #actionContent>
    <span>Save</span>
  </ng-template>
  
  <ng-template #toggleContent>
    <i class="material-icons">arrow_drop_down</i>
  </ng-template>
  
  <ng-template #dropdownContent>
    <div class="custom-dropdown">
      <button (click)="saveAs('pdf')">Save as PDF</button>
      <button (click)="saveAs('docx')">Save as DOCX</button>
      <button (click)="saveAs('xlsx')">Save as Excel</button>
    </div>
  </ng-template>
</sv-split-button>`
      },
      {
        language: 'typescript',
        title: 'Component Implementation',
        description: 'Example of split button integration in a component',
        code: `import { Component } from '@angular/core';
import { SplitButtonComponent } from '@skillvo-web/ui-components';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [SplitButtonComponent],
  template: \`
    <sv-split-button 
      variant="primary" 
      (actionClick)="onPrimaryAction()" 
      (toggleClick)="onToggleDropdown()">
      Primary Action
      <div dropdown-content>
        <div class="dropdown-items">
          <button (click)="onOption1()">Option 1</button>
          <button (click)="onOption2()">Option 2</button>
        </div>
      </div>
    </sv-split-button>
  \`
})
export class ExampleComponent {
  onPrimaryAction() {
    console.log('Primary action clicked');
    // Handle primary action
  }
  
  onToggleDropdown() {
    console.log('Dropdown toggled');
  }
  
  onOption1() {
    console.log('Option 1 selected');
    // Handle option 1
  }
  
  onOption2() {
    console.log('Option 2 selected');
    // Handle option 2
  }
}`
      }
    ];
  }

  private getSplitButtonVariants(): any[] {
    return [
      {
        id: 'primary-md',
        name: 'Primary (Default)',
        description: 'Default split button with primary styling',
        properties: {
          variant: 'primary',
          size: 'md'
        }
      },
      {
        id: 'secondary-md',
        name: 'Secondary',
        description: 'Split button with secondary styling',
        properties: {
          variant: 'secondary',
          size: 'md'
        }
      },
      {
        id: 'tertiary-md',
        name: 'Tertiary',
        description: 'Split button with tertiary styling',
        properties: {
          variant: 'tertiary',
          size: 'md'
        }
      },
      {
        id: 'outline-md',
        name: 'Outline',
        description: 'Split button with outline styling',
        properties: {
          variant: 'outline',
          size: 'md'
        }
      },
      {
        id: 'destructive-md',
        name: 'Destructive',
        description: 'Split button with destructive styling',
        properties: {
          variant: 'destructive',
          size: 'md'
        }
      },
      {
        id: 'primary-sm',
        name: 'Small Size',
        description: 'Split button with small size',
        properties: {
          variant: 'primary',
          size: 'sm'
        }
      },
      {
        id: 'primary-lg',
        name: 'Large Size',
        description: 'Split button with large size',
        properties: {
          variant: 'primary',
          size: 'lg'
        }
      },
      {
        id: 'disabled',
        name: 'Disabled',
        description: 'Split button in disabled state',
        properties: {
          variant: 'primary',
          size: 'md',
          disabled: true
        }
      },
      {
        id: 'loading',
        name: 'Loading',
        description: 'Split button in loading state',
        properties: {
          variant: 'primary',
          size: 'md',
          loading: true
        }
      }
    ];
  }
} 