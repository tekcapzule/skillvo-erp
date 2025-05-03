import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { IconButtonComponent } from '@skillvo-web/ui-components';
import { RouterModule } from '@angular/router';
import { DemoShellComponent } from '../../../core/components/demo-shell/demo-shell.component';
import { ComponentDemo, EventDefinition, PropertyDefinition, PropertyType } from '../../../core/interfaces/component-demo.interface';
import { DemoRegistryService } from '../../../core/services/demo-registry.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-icon-button-demo',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    IconButtonComponent, 
    RouterModule,
    DemoShellComponent
  ],
  templateUrl: './icon-button-demo.component.html',
  styleUrls: ['./icon-button-demo.component.scss']
})
export class IconButtonDemoComponent implements AfterViewInit, OnDestroy {
  readonly DEMO_ID = 'icon-button-component';
  private destroy$ = new Subject<void>();
  showFallback = false;
  private observer: MutationObserver | null = null;

  constructor(
    private demoRegistry: DemoRegistryService,
    private elementRef: ElementRef
  ) {
    // Register the Icon Button component demo
    this.registerIconButtonDemo();
  }

  ngAfterViewInit(): void {
    // Listen for when the component is rendered in the demo shell
    this.demoRegistry.activeDemo$
      .pipe(takeUntil(this.destroy$))
      .subscribe(demo => {
        if (demo && demo.id === this.DEMO_ID) {
          setTimeout(() => {
            this.applyIconButtonContent();
            this.setupMutationObserver();
            
            // Check if playground content is properly rendered
            setTimeout(() => {
              this.checkForPlaygroundContent();
            }, 300);
          }, 100);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.destroy$.next();
    this.destroy$.complete();
  }

  private checkForPlaygroundContent(): void {
    // Check if the playground tab content exists and has icon buttons
    const playgroundContainer = document.querySelector('.playground-tab-content .component-preview-container');
    if (!playgroundContainer || playgroundContainer.querySelectorAll('sv-icon-button').length === 0) {
      this.showFallback = true;
    }
  }

  private applyIconButtonContent(): void {
    try {
      // Find all demo containers to ensure we catch all buttons
      const demoContainers = document.querySelectorAll('.component-preview-container');
      
      demoContainers.forEach(container => {
        if (!container) return;
        
        // Find the icon-button elements in each container
        const iconButtonElements = container.querySelectorAll('sv-icon-button');
        
        // Apply material icons based on variant
        iconButtonElements.forEach((button) => {
          // Cast to HTMLElement to resolve type error
          const buttonEl = button as HTMLElement;
          
          // Skip if button already has an icon
          if (buttonEl.querySelector('span.material-icons')) return;
          
          // Create and insert icon
          const iconElement = document.createElement('span');
          iconElement.className = 'material-icons';
          
          // Determine icon based on variant or other properties
          const variantClass = Array.from(buttonEl.classList)
            .find(cls => cls.startsWith('sv-icon-button-'));
          
          const variant = variantClass ? variantClass.replace('sv-icon-button-', '') : 'primary';
          const isCircular = buttonEl.classList.contains('sv-icon-button-circular');
          const isToggle = buttonEl.classList.contains('sv-icon-button-toggle');
          const isWithBadge = buttonEl.classList.contains('sv-icon-button-with-badge');
          const isExpandable = buttonEl.classList.contains('sv-icon-button-expandable');
          const isCloseButton = buttonEl.classList.contains('sv-close-button');
          
          // Choose icon based on properties
          let iconName = 'star';
          
          if (isCircular) {
            iconName = 'add';
          } else if (isToggle) {
            iconName = 'favorite';
          } else if (isWithBadge) {
            iconName = 'notifications';
          } else if (isExpandable) {
            iconName = 'more_vert';
          } else if (isCloseButton) {
            iconName = 'close';
          } else {
            // Default icons by variant
            switch (variant) {
              case 'primary': iconName = 'check'; break;
              case 'secondary': iconName = 'edit'; break;
              case 'tertiary': iconName = 'info'; break;
              case 'destructive': iconName = 'delete'; break;
              case 'outline': iconName = 'bookmark_border'; break;
              case 'minimal': iconName = 'star_border'; break;
              default: iconName = 'star';
            }
          }
          
          iconElement.textContent = iconName;
          buttonEl.appendChild(iconElement);
        });
      });
    } catch (error) {
      console.error('Error applying icon button content:', error);
    }
  }

  private registerIconButtonDemo(): void {
    const iconButtonDemo: ComponentDemo<IconButtonComponent> = {
      id: this.DEMO_ID,
      name: 'Icon Button Component',
      description: 'A button component designed for displaying icons with various styles, sizes, and states.',
      component: IconButtonComponent,
      properties: this.getIconButtonProperties(),
      events: this.getIconButtonEvents(),
      codeSnippets: this.getIconButtonCodeSnippets(),
      variants: this.getIconButtonVariants(),
      defaultVariantId: 'primary-md',
      cssClasses: [
        'sv-icon-button-primary',
        'sv-icon-button-secondary',
        'sv-icon-button-tertiary',
        'sv-icon-button-outline',
        'sv-icon-button-minimal',
        'sv-icon-button-destructive',
        'sv-icon-button-circular',
        'sv-icon-button-toggle',
        'sv-icon-button-with-badge',
        'sv-icon-button-expandable',
        'sv-close-button',
        'sv-ui-size-xs',
        'sv-ui-size-sm',
        'sv-ui-size-md', 
        'sv-ui-size-lg',
        'sv-ui-size-xl'
      ]
    };

    this.demoRegistry.registerDemo(iconButtonDemo);
  }

  private getIconButtonProperties(): PropertyDefinition[] {
    return [
      {
        name: 'variant',
        type: PropertyType.SELECT,
        defaultValue: 'primary',
        category: 'Appearance',
        description: 'Visual style variant of the icon button',
        options: ['primary', 'secondary', 'tertiary', 'outline', 'minimal', 'destructive']
      },
      {
        name: 'size',
        type: PropertyType.SELECT,
        defaultValue: 'md',
        category: 'Appearance',
        description: 'Size of the icon button',
        options: ['xs', 'sm', 'md', 'lg', 'xl']
      },
      {
        name: 'disabled',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'State',
        description: 'Whether the icon button is disabled'
      },
      {
        name: 'circular',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'Appearance',
        description: 'Whether the icon button should be circular'
      },
      {
        name: 'toggle',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'Behavior',
        description: 'Whether the icon button acts as a toggle'
      },
      {
        name: 'pressed',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'State',
        description: 'Whether the toggle button is in pressed state (only applicable when toggle=true)'
      },
      {
        name: 'withBadge',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'Appearance',
        description: 'Whether the icon button should display with a notification badge'
      },
      {
        name: 'expandable',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'Behavior',
        description: 'Whether the icon button is expandable (e.g., for dropdown menus)'
      },
      {
        name: 'closeButton',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'Appearance',
        description: 'Whether the icon button should be styled as a close button'
      },
      {
        name: 'ariaLabel',
        type: PropertyType.STRING,
        defaultValue: '',
        category: 'Accessibility',
        description: 'Accessibility label for the icon button'
      },
      {
        name: 'type',
        type: PropertyType.SELECT,
        defaultValue: 'button',
        category: 'Behavior',
        description: 'HTML button type attribute',
        options: ['button', 'submit', 'reset']
      }
    ];
  }

  private getIconButtonEvents(): EventDefinition[] {
    return [
      {
        name: 'click',
        description: 'Emitted when the icon button is clicked and not disabled'
      }
    ];
  }

  private getIconButtonCodeSnippets(): any[] {
    return [
      {
        language: 'html',
        title: 'Basic Usage',
        description: 'Simple icon button with primary style',
        code: '<sv-icon-button variant="primary"><span class="material-icons">star</span></sv-icon-button>'
      },
      {
        language: 'html',
        title: 'Circular Button',
        description: 'Circular icon button commonly used for actions like add',
        code: '<sv-icon-button variant="primary" [circular]="true"><span class="material-icons">add</span></sv-icon-button>'
      },
      {
        language: 'html',
        title: 'Toggle Button',
        description: 'Icon button that can be toggled on/off',
        code: '<sv-icon-button variant="primary" [toggle]="true" [pressed]="isPressed" (click)="togglePressed()"><span class="material-icons">favorite</span></sv-icon-button>'
      },
      {
        language: 'html',
        title: 'With Badge',
        description: 'Icon button with notification badge',
        code: '<sv-icon-button variant="primary" [withBadge]="true"><span class="material-icons">notifications</span></sv-icon-button>'
      },
      {
        language: 'html',
        title: 'Different Sizes',
        description: 'Icon buttons in different sizes',
        code: `<sv-icon-button variant="primary" size="sm"><span class="material-icons">star</span></sv-icon-button>
<sv-icon-button variant="primary" size="md"><span class="material-icons">star</span></sv-icon-button>
<sv-icon-button variant="primary" size="lg"><span class="material-icons">star</span></sv-icon-button>`
      },
      {
        language: 'typescript',
        title: 'Component Implementation',
        description: 'Example of icon button integration in a component',
        code: `import { Component } from '@angular/core';
import { IconButtonComponent } from '@skillvo-web/ui-components';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [IconButtonComponent],
  template: \`
    <sv-icon-button 
      variant="primary" 
      [toggle]="true"
      [pressed]="isFavorite" 
      (click)="toggleFavorite()">
      <span class="material-icons">{{ isFavorite ? 'favorite' : 'favorite_border' }}</span>
    </sv-icon-button>
  \`
})
export class ExampleComponent {
  isFavorite = false;
  
  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    // Handle favorite state change
  }
}`
      }
    ];
  }

  private getIconButtonVariants(): any[] {
    return [
      {
        id: 'primary-md',
        name: 'Primary (Default)',
        description: 'Primary icon button with medium size',
        properties: {
          variant: 'primary',
          size: 'md'
        }
      },
      {
        id: 'secondary-md',
        name: 'Secondary',
        description: 'Secondary icon button with medium size',
        properties: {
          variant: 'secondary',
          size: 'md'
        }
      },
      {
        id: 'tertiary-md',
        name: 'Tertiary',
        description: 'Tertiary icon button with medium size',
        properties: {
          variant: 'tertiary',
          size: 'md'
        }
      },
      {
        id: 'outline-md',
        name: 'Outline',
        description: 'Outline icon button with medium size',
        properties: {
          variant: 'outline',
          size: 'md'
        }
      },
      {
        id: 'minimal-md',
        name: 'Minimal',
        description: 'Minimal icon button with medium size',
        properties: {
          variant: 'minimal',
          size: 'md'
        }
      },
      {
        id: 'destructive-md',
        name: 'Destructive',
        description: 'Destructive icon button with medium size',
        properties: {
          variant: 'destructive',
          size: 'md'
        }
      },
      {
        id: 'circular-primary',
        name: 'Circular Primary',
        description: 'Circular primary icon button',
        properties: {
          variant: 'primary',
          size: 'md',
          circular: true
        }
      },
      {
        id: 'toggle-primary',
        name: 'Toggle',
        description: 'Toggle icon button',
        properties: {
          variant: 'primary',
          size: 'md',
          toggle: true
        }
      },
      {
        id: 'with-badge',
        name: 'With Badge',
        description: 'Icon button with notification badge',
        properties: {
          variant: 'primary',
          size: 'md',
          withBadge: true
        }
      },
      {
        id: 'close-button',
        name: 'Close Button',
        description: 'Icon button styled as a close button',
        properties: {
          variant: 'primary',
          size: 'md',
          closeButton: true
        }
      },
      {
        id: 'size-extra-small',
        name: 'Extra Small Size',
        description: 'Extra small icon button',
        properties: {
          variant: 'primary',
          size: 'xs'
        }
      },
      {
        id: 'size-small',
        name: 'Small Size',
        description: 'Small icon button',
        properties: {
          variant: 'primary',
          size: 'sm'
        }
      },
      {
        id: 'size-large',
        name: 'Large Size',
        description: 'Large icon button',
        properties: {
          variant: 'primary',
          size: 'lg'
        }
      },
      {
        id: 'size-extra-large',
        name: 'Extra Large Size',
        description: 'Extra large icon button',
        properties: {
          variant: 'primary',
          size: 'xl'
        }
      },
      {
        id: 'disabled',
        name: 'Disabled',
        description: 'Disabled icon button',
        properties: {
          variant: 'primary',
          size: 'md',
          disabled: true
        }
      }
    ];
  }

  private setupMutationObserver(): void {
    // Set up mutation observer to catch dynamically added buttons
    this.observer = new MutationObserver((mutations) => {
      let shouldApplyIcons = false;
      
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          // Check if any new sv-icon-button elements were added
          const addedNodes = Array.from(mutation.addedNodes);
          for (const node of addedNodes) {
            if (node instanceof HTMLElement) {
              if (node.tagName.toLowerCase() === 'sv-icon-button' || 
                  node.querySelector('sv-icon-button')) {
                shouldApplyIcons = true;
                break;
              }
            }
          }
        }
      });
      
      if (shouldApplyIcons) {
        setTimeout(() => this.applyIconButtonContent(), 0);
      }
    });
    
    // Observe the entire document for changes
    this.observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });
  }
} 