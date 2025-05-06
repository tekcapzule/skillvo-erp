import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ButtonComponent } from '@skillvo-web/ui-components';
import { RouterModule } from '@angular/router';
import { DemoShellComponent } from '../../../core/components/demo-shell/demo-shell.component';
import { ComponentDemo, EventDefinition, PropertyDefinition, PropertyType } from '../../../core/interfaces/component-demo.interface';
import { DemoRegistryService } from '../../../core/services/demo-registry.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-button-demo',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    ButtonComponent, 
    RouterModule,
    DemoShellComponent
  ],
  templateUrl: './button-demo.component.html',
  styleUrls: ['./button-demo.component.scss']
})
export class ButtonDemoComponent implements AfterViewInit, OnDestroy {
  readonly DEMO_ID = 'button-component';
  private destroy$ = new Subject<void>();

  constructor(
    private demoRegistry: DemoRegistryService,
    private elementRef: ElementRef
  ) {
    // Register the Button component demo
    this.registerButtonDemo();
  }

  ngAfterViewInit(): void {
    // Listen for when the component is rendered in the demo shell
    this.demoRegistry.activeDemo$
      .pipe(takeUntil(this.destroy$))
      .subscribe(demo => {
        if (demo && demo.id === this.DEMO_ID) {
          setTimeout(() => {
            this.applyButtonContent();
          }, 0);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private applyButtonContent(): void {
    // Find the button element in the demo container
    const buttonElements = this.elementRef.nativeElement.querySelectorAll('sv-button');

    // Apply button text based on variant
    buttonElements.forEach((button: HTMLElement) => {
      // Check variant attributes and add appropriate text
      const variantClass = Array.from(button.classList)
        .find(cls => cls.startsWith('sv-button-'));
      
      const variant = variantClass ? variantClass.replace('sv-button-', '') : 'primary';
      const hasIcon = button.querySelector('.sv-button-icon') !== null;
      const isFullWidth = button.classList.contains('sv-button-responsive');
      const isLoading = button.hasAttribute('disabled') && button.querySelector('.sv-button-loader') !== null;
      const isDisabled = button.hasAttribute('disabled');
      
      let buttonText = variant.charAt(0).toUpperCase() + variant.slice(1);
      
      if (isFullWidth) {
        buttonText = 'Full Width Button';
      } else if (isLoading) {
        buttonText = 'Loading...';
      } else if (isDisabled) {
        buttonText = 'Disabled Button';
      } else if (hasIcon) {
        buttonText = 'Button with Icon';
      }
      
      // Find the content span and add the text
      const contentSpan = button.querySelector('.sv-button-content');
      if (contentSpan && contentSpan.textContent?.trim() === '') {
        contentSpan.textContent = buttonText;
      }
    });
  }

  private registerButtonDemo(): void {
    const buttonDemo: ComponentDemo<ButtonComponent> = {
      id: this.DEMO_ID,
      name: 'Button Component',
      description: 'A versatile button component that supports various styles, sizes, and states.',
      component: ButtonComponent,
      properties: this.getButtonProperties(),
      events: this.getButtonEvents(),
      codeSnippets: this.getButtonCodeSnippets(),
      variants: this.getButtonVariants(),
      defaultVariantId: 'primary-md',
      cssClasses: [
        'sv-button-primary',
        'sv-button-secondary',
        'sv-button-tertiary',
        'sv-button-outline',
        'sv-button-link',
        'sv-button-destructive',
        'sv-ui-size-sm',
        'sv-ui-size-md', 
        'sv-ui-size-lg',
        'sv-ui-size-xl'
      ]
    };

    this.demoRegistry.registerDemo(buttonDemo);
  }

  private getButtonProperties(): PropertyDefinition[] {
    return [
      {
        name: 'variant',
        type: PropertyType.SELECT,
        defaultValue: 'primary',
        category: 'Appearance',
        description: 'Visual style variant of the button',
        options: ['primary', 'secondary', 'tertiary', 'outline', 'link', 'destructive']
      },
      {
        name: 'size',
        type: PropertyType.SELECT,
        defaultValue: 'md',
        category: 'Appearance',
        description: 'Size of the button',
        options: ['sm', 'md', 'lg', 'xl']
      },
      {
        name: 'disabled',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'State',
        description: 'Whether the button is disabled'
      },
      {
        name: 'loading',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'State',
        description: 'Whether the button is in loading state'
      },
      {
        name: 'fullWidth',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'Layout',
        description: 'Whether the button should take the full width of its container'
      },
      {
        name: 'icon',
        type: PropertyType.STRING,
        defaultValue: '',
        category: 'Content',
        description: 'Material icon name to display'
      },
      {
        name: 'iconPosition',
        type: PropertyType.SELECT,
        defaultValue: 'left',
        category: 'Content',
        description: 'Position of the icon relative to the text',
        options: ['left', 'right']
      }
    ];
  }

  private getButtonEvents(): EventDefinition[] {
    return [
      {
        name: 'clicked',
        description: 'Emitted when the button is clicked and not disabled or loading'
      }
    ];
  }

  private getButtonCodeSnippets(): any[] {
    return [
      {
        language: 'html',
        title: 'Basic Usage',
        description: 'Simple button with primary style',
        code: '<sv-button variant="primary">Button Text</sv-button>'
      },
      {
        language: 'html',
        title: 'With Icon',
        description: 'Button with an icon',
        code: '<sv-button variant="primary" icon="add" iconPosition="left">Add Item</sv-button>'
      },
      {
        language: 'html',
        title: 'Different States',
        description: 'Button in disabled and loading states',
        code: `<sv-button variant="primary" [disabled]="isDisabled">Disabled Button</sv-button>
<sv-button variant="primary" [loading]="isLoading">Loading Button</sv-button>`
      },
      {
        language: 'html',
        title: 'Full Configuration',
        description: 'Button with all properties configured',
        code: `<sv-button 
  variant="primary" 
  size="md"
  [disabled]="false"
  [loading]="isLoading"
  [fullWidth]="false"
  icon="arrow_forward"
  iconPosition="right"
  (clicked)="handleClick()">
  Button Text
</sv-button>`
      },
      {
        language: 'typescript',
        title: 'Component Implementation',
        description: 'Example of button integration in a component',
        code: `import { Component } from '@angular/core';
import { ButtonComponent } from '@skillvo-web/ui-components';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ButtonComponent],
  template: \`
    <sv-button 
      variant="primary" 
      [loading]="isLoading" 
      (clicked)="onButtonClick()">
      Submit
    </sv-button>
  \`
})
export class ExampleComponent {
  isLoading = false;
  
  onButtonClick() {
    this.isLoading = true;
    // Handle button click logic
    setTimeout(() => this.isLoading = false, 2000);
  }
}`
      }
    ];
  }

  private getButtonVariants(): any[] {
    return [
      {
        id: 'primary-md',
        name: 'Primary (Default)',
        description: 'Primary action button with medium size',
        properties: {
          variant: 'primary',
          size: 'md'
        }
      },
      {
        id: 'secondary-md',
        name: 'Secondary',
        description: 'Secondary action button',
        properties: {
          variant: 'secondary',
          size: 'md'
        }
      },
      {
        id: 'tertiary-md',
        name: 'Tertiary',
        description: 'Tertiary action button',
        properties: {
          variant: 'tertiary',
          size: 'md'
        }
      },
      {
        id: 'outline-md',
        name: 'Outline',
        description: 'Outline style button',
        properties: {
          variant: 'outline',
          size: 'md'
        }
      },
      {
        id: 'link-md',
        name: 'Link',
        description: 'Link style button',
        properties: {
          variant: 'link',
          size: 'md'
        }
      },
      {
        id: 'destructive-md',
        name: 'Destructive',
        description: 'Destructive action button',
        properties: {
          variant: 'destructive',
          size: 'md'
        }
      },
      {
        id: 'primary-with-icon',
        name: 'With Icon',
        description: 'Primary button with an icon',
        properties: {
          variant: 'primary',
          size: 'md',
          icon: 'add',
          iconPosition: 'left'
        }
      },
      {
        id: 'primary-disabled',
        name: 'Disabled',
        description: 'Disabled button',
        properties: {
          variant: 'primary',
          size: 'md',
          disabled: true
        }
      },
      {
        id: 'primary-loading',
        name: 'Loading',
        description: 'Button in loading state',
        properties: {
          variant: 'primary',
          size: 'md',
          loading: true
        }
      },
      {
        id: 'primary-full-width',
        name: 'Full Width',
        description: 'Full width button',
        properties: {
          variant: 'primary',
          size: 'md',
          fullWidth: true
        }
      },
      {
        id: 'small-button',
        name: 'Small Size',
        description: 'Small sized button',
        properties: {
          variant: 'primary',
          size: 'sm'
        }
      },
      {
        id: 'large-button',
        name: 'Large Size',
        description: 'Large sized button',
        properties: {
          variant: 'primary',
          size: 'lg'
        }
      },
      {
        id: 'extra-large-button',
        name: 'Extra Large Size',
        description: 'Extra large sized button',
        properties: {
          variant: 'primary',
          size: 'xl'
        }
      }
    ];
  }
} 