import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ButtonComponent, ButtonGroupComponent, ButtonVariant } from '@skillvo-web/ui-components';
import { RouterModule } from '@angular/router';
import { DemoShellComponent } from '../../../core/components/demo-shell/demo-shell.component';
import { ComponentDemo, EventDefinition, PropertyDefinition, PropertyType } from '../../../core/interfaces/component-demo.interface';
import { DemoRegistryService } from '../../../core/services/demo-registry.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-button-group-demo',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    ButtonComponent,
    ButtonGroupComponent,
    RouterModule,
    DemoShellComponent
  ],
  templateUrl: './button-group-demo.component.html',
  styleUrls: ['./button-group-demo.component.scss']
})
export class ButtonGroupDemoComponent implements AfterViewInit, OnDestroy {
  readonly DEMO_ID = 'button-group-component';
  private destroy$ = new Subject<void>();

  constructor(
    private demoRegistry: DemoRegistryService,
    private elementRef: ElementRef
  ) {
    // Register the Button Group component demo
    this.registerButtonGroupDemo();
  }

  ngAfterViewInit(): void {
    // Listen for when the component is rendered in the demo shell
    this.demoRegistry.activeDemo$
      .pipe(takeUntil(this.destroy$))
      .subscribe(demo => {
        if (demo && demo.id === this.DEMO_ID) {
          setTimeout(() => {
            this.applyButtonGroupContent();
            this.fixButtonGroupInPlayground();
          }, 100);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Special method to fix empty button groups in playground and responsive tabs
   */
  private fixButtonGroupInPlayground(): void {
    // For playground tab
    const playgroundContainers = document.querySelectorAll('.component-mount-point sv-button-group');
    this.populateButtonGroupElements(playgroundContainers);
    
    // For responsive tab
    const responsiveContainers = document.querySelectorAll('.viewport-content sv-button-group');
    this.populateButtonGroupElements(responsiveContainers);

    // Remove fallback buttons if our groups are rendered
    if (playgroundContainers.length > 0) {
      const fallbackButtons = document.querySelectorAll('.fallback-button-container');
      fallbackButtons.forEach((el) => {
        el.remove();
      });
    }
  }

  /**
   * Add button elements to empty button groups
   */
  private populateButtonGroupElements(containers: NodeListOf<Element>): void {
    containers.forEach((container: Element) => {
      // Only add buttons if the group is empty
      if (container.children.length === 0) {
        // Create three buttons
        for (let i = 0; i < 3; i++) {
          const button = document.createElement('sv-button');
          
          // Set appropriate variant based on parent group
          let buttonVariant = 'outline';
          if (container.classList.contains('sv-button-group-primary')) {
            buttonVariant = 'primary';
          } else if (container.classList.contains('sv-button-group-secondary')) {
            buttonVariant = 'secondary';
          }
          
          button.setAttribute('variant', buttonVariant);
          button.classList.add(`sv-button-${buttonVariant}`);
          
          // Add content span with text
          const contentSpan = document.createElement('span');
          contentSpan.className = 'sv-button-content';
          contentSpan.textContent = ['Left', 'Middle', 'Right'][i];
          
          button.appendChild(contentSpan);
          container.appendChild(button);
        }
      }
    });
  }

  private applyButtonGroupContent(): void {
    // Find the button group elements in the demo container
    const buttonGroupElements = this.elementRef.nativeElement.querySelectorAll('sv-button-group');
    
    // Apply button content to buttons inside button groups
    buttonGroupElements.forEach((group: Element) => {
      const buttons = group.querySelectorAll('sv-button');
      
      // Apply different text to each button in the group
      buttons.forEach((button: Element, index: number) => {
        // Get variant class if present
        const variantClass = Array.from(button.classList)
          .find(cls => cls.startsWith('sv-button-'));
        
        const variant = variantClass ? variantClass.replace('sv-button-', '') : 'primary';
        const contentSpan = button.querySelector('.sv-button-content');
        
        if (contentSpan && contentSpan.textContent?.trim() === '') {
          // Set appropriate text based on button position and variant
          let buttonText = '';
          
          if (buttons.length <= 3) {
            // For groups with 3 or fewer buttons, use descriptive labels
            const labels = ['Left', 'Middle', 'Right'];
            buttonText = labels[index] || `Button ${index + 1}`;
          } else {
            // For larger groups, just number them
            buttonText = `Button ${index + 1}`;
          }
          
          contentSpan.textContent = buttonText;
        }
      });
    });
  }

  private registerButtonGroupDemo(): void {
    const buttonGroupDemo: ComponentDemo<ButtonGroupComponent> = {
      id: this.DEMO_ID,
      name: 'Button Group Component',
      description: 'A component for grouping related buttons together with consistent styling and behavior.',
      component: ButtonGroupComponent,
      properties: this.getButtonGroupProperties(),
      events: this.getButtonGroupEvents(),
      codeSnippets: this.getButtonGroupCodeSnippets(),
      variants: this.getButtonGroupVariants(),
      defaultVariantId: 'outline-horizontal',
      cssClasses: [
        'sv-button-group',
        'sv-button-group-primary',
        'sv-button-group-secondary',
        'sv-button-group-outline',
        'sv-button-group-text',
        'sv-button-group-segmented',
        'sv-button-group-vertical',
        'sv-button-group-horizontal',
        'sv-button-group-spaced',
        'sv-button-group-pill'
      ]
    };

    this.demoRegistry.registerDemo(buttonGroupDemo);
  }

  private getButtonGroupProperties(): PropertyDefinition[] {
    return [
      {
        name: 'variant',
        type: PropertyType.SELECT,
        defaultValue: 'outline',
        category: 'Appearance',
        description: 'Visual style variant of the button group',
        options: ['primary', 'secondary', 'outline', 'text', 'segmented']
      },
      {
        name: 'orientation',
        type: PropertyType.SELECT,
        defaultValue: 'horizontal',
        category: 'Layout',
        description: 'Orientation of the button group',
        options: ['horizontal', 'vertical']
      },
      {
        name: 'spacing',
        type: PropertyType.SELECT,
        defaultValue: 'none',
        category: 'Layout',
        description: 'Spacing between buttons in the group',
        options: ['none', 'spaced']
      },
      {
        name: 'shape',
        type: PropertyType.SELECT,
        defaultValue: 'default',
        category: 'Appearance',
        description: 'Shape of the button group',
        options: ['default', 'pill']
      },
      {
        name: 'dividers',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'Appearance',
        description: 'Whether to show dividers between buttons'
      },
      {
        name: 'fullWidth',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'Layout',
        description: 'Whether the button group should take the full width of its container'
      },
      {
        name: 'responsive',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'Layout',
        description: 'Whether the button group should adapt to responsive layouts'
      },
      {
        name: 'role',
        type: PropertyType.SELECT,
        defaultValue: 'group',
        category: 'Accessibility',
        description: 'ARIA role of the button group',
        options: ['group', 'toolbar', 'radiogroup']
      }
    ];
  }

  private getButtonGroupEvents(): EventDefinition[] {
    return [
      // Button group itself doesn't emit events, but individual buttons do
    ];
  }

  private getButtonGroupCodeSnippets(): any[] {
    return [
      {
        language: 'html',
        title: 'Basic Usage',
        description: 'Basic button group with default outline style',
        code: `<sv-button-group>
  <sv-button variant="outline">Left</sv-button>
  <sv-button variant="outline">Middle</sv-button>
  <sv-button variant="outline">Right</sv-button>
</sv-button-group>`
      },
      {
        language: 'html',
        title: 'Primary Variant',
        description: 'Button group with primary variant',
        code: `<sv-button-group variant="primary">
  <sv-button variant="primary">Left</sv-button>
  <sv-button variant="primary">Middle</sv-button>
  <sv-button variant="primary">Right</sv-button>
</sv-button-group>`
      },
      {
        language: 'html',
        title: 'Vertical Orientation',
        description: 'Button group with vertical orientation',
        code: `<sv-button-group orientation="vertical" variant="outline">
  <sv-button variant="outline">Top</sv-button>
  <sv-button variant="outline">Middle</sv-button>
  <sv-button variant="outline">Bottom</sv-button>
</sv-button-group>`
      },
      {
        language: 'html',
        title: 'Pill Shape',
        description: 'Button group with pill shape',
        code: `<sv-button-group shape="pill" variant="secondary">
  <sv-button variant="secondary">Left</sv-button>
  <sv-button variant="secondary">Middle</sv-button>
  <sv-button variant="secondary">Right</sv-button>
</sv-button-group>`
      },
      {
        language: 'html',
        title: 'Radio Group Behavior',
        description: 'Button group with radiogroup behavior for selection',
        code: `<sv-button-group role="radiogroup" variant="outline">
  <sv-button variant="outline">Option 1</sv-button>
  <sv-button variant="outline">Option 2</sv-button>
  <sv-button variant="outline">Option 3</sv-button>
</sv-button-group>`
      },
      {
        language: 'typescript',
        title: 'Component Implementation',
        description: 'Example integration in a component',
        code: `import { Component } from '@angular/core';
import { ButtonComponent, ButtonGroupComponent } from '@skillvo-web/ui-components';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ButtonComponent, ButtonGroupComponent],
  template: \`
    <sv-button-group 
      variant="outline" 
      orientation="horizontal" 
      [fullWidth]="false">
      <sv-button variant="outline">Left</sv-button>
      <sv-button variant="outline">Middle</sv-button>
      <sv-button variant="outline">Right</sv-button>
    </sv-button-group>
  \`
})
export class ExampleComponent {}
`
      }
    ];
  }

  private getButtonGroupVariants(): any[] {
    return [
      {
        id: 'outline-horizontal',
        name: 'Outline (Default)',
        description: 'Default outline button group with horizontal orientation',
        properties: {
          variant: 'outline',
          orientation: 'horizontal'
        }
      },
      {
        id: 'primary-horizontal',
        name: 'Primary',
        description: 'Primary button group with horizontal orientation',
        properties: {
          variant: 'primary',
          orientation: 'horizontal'
        }
      },
      {
        id: 'secondary-horizontal',
        name: 'Secondary',
        description: 'Secondary button group with horizontal orientation',
        properties: {
          variant: 'secondary',
          orientation: 'horizontal'
        }
      },
      {
        id: 'outline-vertical',
        name: 'Vertical Orientation',
        description: 'Outline button group with vertical orientation',
        properties: {
          variant: 'outline',
          orientation: 'vertical'
        }
      },
      {
        id: 'pill-shape',
        name: 'Pill Shape',
        description: 'Button group with pill-shaped corners',
        properties: {
          variant: 'secondary',
          shape: 'pill'
        }
      },
      {
        id: 'spaced-buttons',
        name: 'Spaced Buttons',
        description: 'Button group with space between buttons',
        properties: {
          variant: 'outline',
          spacing: 'spaced'
        }
      },
      {
        id: 'full-width',
        name: 'Full Width',
        description: 'Button group that spans the full width of its container',
        properties: {
          variant: 'outline',
          fullWidth: true
        }
      },
      {
        id: 'radiogroup',
        name: 'Radio Group',
        description: 'Button group with radiogroup behavior for exclusive selection',
        properties: {
          variant: 'outline',
          role: 'radiogroup'
        }
      },
      {
        id: 'segmented',
        name: 'Segmented',
        description: 'Segmented control style button group',
        properties: {
          variant: 'segmented'
        }
      }
    ];
  }
} 