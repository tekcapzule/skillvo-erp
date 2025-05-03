import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MenuButtonComponent } from '@skillvo-web/ui-components';
import { RouterModule } from '@angular/router';
import { DemoShellComponent } from '../../../core/components/demo-shell/demo-shell.component';
import { ComponentDemo, EventDefinition, PropertyDefinition, PropertyType } from '../../../core/interfaces/component-demo.interface';
import { DemoRegistryService } from '../../../core/services/demo-registry.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-menu-button-demo',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MenuButtonComponent, 
    RouterModule,
    DemoShellComponent
  ],
  templateUrl: './menu-button-demo.component.html',
  styleUrls: ['./menu-button-demo.component.scss']
})
export class MenuButtonDemoComponent implements AfterViewInit, OnDestroy {
  readonly DEMO_ID = 'menu-button-component';
  private destroy$ = new Subject<void>();

  constructor(
    private demoRegistry: DemoRegistryService,
    private elementRef: ElementRef
  ) {
    // Register the Menu Button component demo
    this.registerMenuButtonDemo();
  }

  ngAfterViewInit(): void {
    // Listen for when the component is rendered in the demo shell
    this.demoRegistry.activeDemo$
      .pipe(takeUntil(this.destroy$))
      .subscribe(demo => {
        if (demo && demo.id === this.DEMO_ID) {
          setTimeout(() => {
            // Apply any necessary content for menu buttons in the demo
            this.applyMenuButtonContent();
          }, 0);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private applyMenuButtonContent(): void {
    // Find the menu button elements in the demo container
    const menuButtonElements = this.elementRef.nativeElement.querySelectorAll('sv-menu-button');

    // Apply button text based on variant
    menuButtonElements.forEach((button: HTMLElement) => {
      // Check variant attributes
      const variantClass = Array.from(button.classList)
        .find(cls => cls.startsWith('sv-menu-button-'));
      
      const variant = variantClass ? variantClass.replace('sv-menu-button-', '') : 'primary';
      const isDisabled = button.classList.contains('disabled');
      const isIconOnly = button.classList.contains('sv-menu-button-icon-only');
      
      let buttonText = variant.charAt(0).toUpperCase() + variant.slice(1) + ' Menu';
      
      if (isDisabled) {
        buttonText = 'Disabled Menu';
      } else if (isIconOnly) {
        buttonText = '';
      }
      
      // Find the button content element and set text if empty
      const buttonContent = button.querySelector('.sv-menu-button-content');
      if (buttonContent && buttonContent.textContent?.trim() === '') {
        buttonContent.textContent = buttonText;
      }
      
      // Add sample menu items if the menu is empty
      const menuContent = button.querySelector('.sv-menu-button-menu');
      if (menuContent && menuContent.children.length === 0) {
        // Create sample menu items
        const menuItems = document.createElement('div');
        menuItems.className = 'menu-items';
        
        ['Profile', 'Settings', 'Logout'].forEach(item => {
          const menuItem = document.createElement('button');
          menuItem.className = 'menu-item';
          menuItem.textContent = item;
          menuItems.appendChild(menuItem);
        });
        
        menuContent.appendChild(menuItems);
      }
    });
  }

  private registerMenuButtonDemo(): void {
    const menuButtonDemo: ComponentDemo<MenuButtonComponent> = {
      id: this.DEMO_ID,
      name: 'Menu Button Component',
      description: 'A button that opens a dropdown menu when clicked.',
      component: MenuButtonComponent,
      properties: this.getMenuButtonProperties(),
      events: this.getMenuButtonEvents(),
      codeSnippets: this.getMenuButtonCodeSnippets(),
      variants: this.getMenuButtonVariants(),
      defaultVariantId: 'primary-md',
      cssClasses: [
        'sv-menu-button-primary',
        'sv-menu-button-secondary',
        'sv-menu-button-tertiary',
        'sv-menu-button-outline',
        'sv-menu-button-link',
        'sv-ui-size-sm',
        'sv-ui-size-md', 
        'sv-ui-size-lg',
        'sv-ui-size-xl',
        'sv-menu-button-icon-only',
        'sv-menu-button-no-caret',
        'sv-menu-button-responsive'
      ]
    };

    this.demoRegistry.registerDemo(menuButtonDemo);
  }

  private getMenuButtonProperties(): PropertyDefinition[] {
    return [
      {
        name: 'variant',
        type: PropertyType.SELECT,
        defaultValue: 'primary',
        category: 'Appearance',
        description: 'Visual style variant of the menu button',
        options: ['primary', 'secondary', 'tertiary', 'outline', 'link']
      },
      {
        name: 'size',
        type: PropertyType.SELECT,
        defaultValue: 'md',
        category: 'Appearance',
        description: 'Size of the menu button',
        options: ['xs', 'sm', 'md', 'lg', 'xl']
      },
      {
        name: 'disabled',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'State',
        description: 'Whether the menu button is disabled'
      },
      {
        name: 'ariaLabel',
        type: PropertyType.STRING,
        defaultValue: '',
        category: 'Accessibility',
        description: 'Aria label for the menu button'
      },
      {
        name: 'menuLabel',
        type: PropertyType.STRING,
        defaultValue: 'Menu',
        category: 'Accessibility',
        description: 'Aria label for the dropdown menu'
      },
      {
        name: 'iconOnly',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'Appearance',
        description: 'Whether to display only an icon without text'
      },
      {
        name: 'noCaret',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'Appearance',
        description: 'Whether to hide the dropdown caret icon'
      },
      {
        name: 'menuPosition',
        type: PropertyType.SELECT,
        defaultValue: 'right',
        category: 'Layout',
        description: 'Position of the dropdown menu relative to the button',
        options: ['right', 'center', 'top', 'start', 'end']
      },
      {
        name: 'animated',
        type: PropertyType.BOOLEAN,
        defaultValue: true,
        category: 'Appearance',
        description: 'Whether to animate the dropdown menu opening/closing'
      },
      {
        name: 'responsive',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'Layout',
        description: 'Whether the menu button should be responsive to container width'
      }
    ];
  }

  private getMenuButtonEvents(): EventDefinition[] {
    return [
      {
        name: 'menuToggle',
        description: 'Emitted when the menu is opened or closed with the current state'
      },
      {
        name: 'menuItemClick',
        description: 'Emitted when a menu item is clicked with the item details'
      }
    ];
  }

  private getMenuButtonCodeSnippets(): any[] {
    return [
      {
        language: 'html',
        title: 'Basic Usage',
        description: 'Simple menu button with primary style',
        code: `<sv-menu-button variant="primary" (menuToggle)="onMenuToggle($event)" (menuItemClick)="onMenuItemClick($event)">
  Menu Options
  <ng-template #menuContent>
    <div class="menu-items">
      <button class="menu-item" (click)="onMenuItemClick('profile')">Profile</button>
      <button class="menu-item" (click)="onMenuItemClick('settings')">Settings</button>
      <button class="menu-item" (click)="onMenuItemClick('logout')">Logout</button>
    </div>
  </ng-template>
</sv-menu-button>`
      },
      {
        language: 'html',
        title: 'Icon Only Menu Button',
        description: 'Menu button with only an icon',
        code: `<sv-menu-button 
  variant="tertiary" 
  [iconOnly]="true" 
  ariaLabel="User Menu">
  <ng-template #buttonContent>
    <i class="material-icons">account_circle</i>
  </ng-template>
  <ng-template #menuContent>
    <div class="user-menu">
      <div class="user-info">
        <img src="user-avatar.jpg" alt="User Avatar" />
        <div class="user-details">
          <div class="user-name">John Doe</div>
          <div class="user-email">john.doe@example.com</div>
        </div>
      </div>
      <div class="menu-items">
        <button class="menu-item" (click)="onMenuItemClick('profile')">View Profile</button>
        <button class="menu-item" (click)="onMenuItemClick('settings')">Settings</button>
        <button class="menu-item" (click)="onMenuItemClick('logout')">Sign Out</button>
      </div>
    </div>
  </ng-template>
</sv-menu-button>`
      },
      {
        language: 'typescript',
        title: 'Component Implementation',
        description: 'Example of menu button integration in a component',
        code: `import { Component } from '@angular/core';
import { MenuButtonComponent } from '@skillvo-web/ui-components';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [MenuButtonComponent],
  template: \`
    <sv-menu-button 
      variant="secondary" 
      (menuToggle)="onMenuToggle($event)" 
      (menuItemClick)="onMenuItemClick($event)">
      Options
      <ng-template #menuContent>
        <div class="menu-items">
          <button class="menu-item" (click)="onMenuItemClick('edit')">Edit</button>
          <button class="menu-item" (click)="onMenuItemClick('duplicate')">Duplicate</button>
          <button class="menu-item" (click)="onMenuItemClick('delete')">Delete</button>
        </div>
      </ng-template>
    </sv-menu-button>
  \`
})
export class ExampleComponent {
  onMenuToggle(isOpen: boolean) {
    console.log('Menu is now', isOpen ? 'open' : 'closed');
  }
  
  onMenuItemClick(action: string) {
    console.log('Menu action selected:', action);
    // Handle the action based on selection
    switch(action) {
      case 'edit':
        // Handle edit action
        break;
      case 'duplicate':
        // Handle duplicate action
        break;
      case 'delete':
        // Handle delete action
        break;
    }
  }
}`
      }
    ];
  }

  private getMenuButtonVariants(): any[] {
    return [
      {
        id: 'primary-md',
        name: 'Primary (Default)',
        description: 'Default menu button with primary styling',
        properties: {
          variant: 'primary',
          size: 'md'
        }
      },
      {
        id: 'secondary-md',
        name: 'Secondary',
        description: 'Menu button with secondary styling',
        properties: {
          variant: 'secondary',
          size: 'md'
        }
      },
      {
        id: 'tertiary-md',
        name: 'Tertiary',
        description: 'Menu button with tertiary styling',
        properties: {
          variant: 'tertiary',
          size: 'md'
        }
      },
      {
        id: 'outline-md',
        name: 'Outline',
        description: 'Menu button with outline styling',
        properties: {
          variant: 'outline',
          size: 'md'
        }
      },
      {
        id: 'link-md',
        name: 'Link',
        description: 'Menu button styled as a link',
        properties: {
          variant: 'link',
          size: 'md'
        }
      },
      {
        id: 'icon-only',
        name: 'Icon Only',
        description: 'Menu button with only an icon',
        properties: {
          variant: 'primary',
          size: 'md',
          iconOnly: true
        }
      },
      {
        id: 'no-caret',
        name: 'No Caret',
        description: 'Menu button without dropdown caret',
        properties: {
          variant: 'primary',
          size: 'md',
          noCaret: true
        }
      },
      {
        id: 'small-size',
        name: 'Small Size',
        description: 'Menu button with small size',
        properties: {
          variant: 'primary',
          size: 'sm'
        }
      },
      {
        id: 'large-size',
        name: 'Large Size',
        description: 'Menu button with large size',
        properties: {
          variant: 'primary',
          size: 'lg'
        }
      },
      {
        id: 'disabled',
        name: 'Disabled',
        description: 'Menu button in disabled state',
        properties: {
          variant: 'primary',
          size: 'md',
          disabled: true
        }
      },
      {
        id: 'responsive',
        name: 'Responsive',
        description: 'Responsive menu button that adapts to container width',
        properties: {
          variant: 'primary',
          size: 'md',
          responsive: true
        }
      }
    ];
  }
} 