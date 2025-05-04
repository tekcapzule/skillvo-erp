import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CheckboxComponent } from '@skillvo-web/ui-components';
import { RouterModule } from '@angular/router';
import { DemoShellComponent } from '../../../core/components/demo-shell/demo-shell.component';
import { ComponentDemo, EventDefinition, PropertyDefinition, PropertyType } from '../../../core/interfaces/component-demo.interface';
import { DemoRegistryService } from '../../../core/services/demo-registry.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-checkbox-demo',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    CheckboxComponent, 
    RouterModule,
    DemoShellComponent
  ],
  templateUrl: './checkbox-demo.component.html',
  styleUrls: ['./checkbox-demo.component.scss']
})
export class CheckboxDemoComponent implements AfterViewInit, OnDestroy {
  readonly DEMO_ID = 'checkbox-component';
  private destroy$ = new Subject<void>();

  constructor(
    private demoRegistry: DemoRegistryService,
    private elementRef: ElementRef
  ) {
    // Register the Checkbox component demo
    this.registerCheckboxDemo();
  }

  ngAfterViewInit(): void {
    // Listen for when the component is rendered in the demo shell
    this.demoRegistry.activeDemo$
      .pipe(takeUntil(this.destroy$))
      .subscribe(demo => {
        if (demo && demo.id === this.DEMO_ID) {
          setTimeout(() => {
            this.applyCheckboxContent();
          }, 0);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private applyCheckboxContent(): void {
    // Find the checkbox elements in the demo container
    const checkboxElements = this.elementRef.nativeElement.querySelectorAll('sv-checkbox');

    // Apply checkbox display text based on properties
    checkboxElements.forEach((checkbox: HTMLElement) => {
      // Check if indeterminate
      const indeterminateAttr = checkbox.getAttribute('ng-reflect-indeterminate');
      const isIndeterminate = indeterminateAttr === 'true';
      
      // Check if disabled
      const disabledAttr = checkbox.getAttribute('ng-reflect-disabled');
      const isDisabled = disabledAttr === 'true';
      
      // Check if required
      const requiredAttr = checkbox.getAttribute('ng-reflect-required');
      const isRequired = requiredAttr === 'true';
      
      let labelText = 'Standard Checkbox';
      
      if (isIndeterminate) {
        labelText = 'Indeterminate Checkbox';
      } else if (isDisabled) {
        labelText = 'Disabled Checkbox';
      } else if (isRequired) {
        labelText = 'Required Checkbox';
      }
      
      // Find the label element and set text if no explicit label is provided
      const labelElement = checkbox.querySelector('.sv-checkbox-label');
      if (labelElement && !labelElement.textContent?.trim()) {
        labelElement.textContent = labelText;
      }
    });
  }

  private registerCheckboxDemo(): void {
    const checkboxDemo: ComponentDemo<CheckboxComponent> = {
      id: this.DEMO_ID,
      name: 'Checkbox Component',
      description: 'A checkbox component that allows users to select or deselect options with different states.',
      component: CheckboxComponent,
      properties: this.getCheckboxProperties(),
      events: this.getCheckboxEvents(),
      codeSnippets: this.getCheckboxCodeSnippets(),
      variants: this.getCheckboxVariants(),
      defaultVariantId: 'standard',
      cssClasses: [
        'sv-checkbox',
        'sv-checkbox-label',
        'sv-checkbox-indeterminate',
        'sv-checkbox-disabled'
      ]
    };

    this.demoRegistry.registerDemo(checkboxDemo);
  }

  private getCheckboxProperties(): PropertyDefinition[] {
    return [
      {
        name: 'checked',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'State',
        description: 'Whether the checkbox is checked'
      },
      {
        name: 'indeterminate',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'State',
        description: 'Whether the checkbox appears indeterminate (neither checked nor unchecked)'
      },
      {
        name: 'disabled',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'State',
        description: 'Whether the checkbox is disabled'
      },
      {
        name: 'required',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'Validation',
        description: 'Whether the checkbox is required'
      },
      {
        name: 'name',
        type: PropertyType.STRING,
        defaultValue: '',
        category: 'Identification',
        description: 'Name attribute of the checkbox input element'
      },
      {
        name: 'value',
        type: PropertyType.STRING,
        defaultValue: '',
        category: 'Content',
        description: 'Value attribute of the checkbox input element'
      },
      {
        name: 'label',
        type: PropertyType.STRING,
        defaultValue: '',
        category: 'Content',
        description: 'Label text for the checkbox'
      },
      {
        name: 'ariaLabel',
        type: PropertyType.STRING,
        defaultValue: '',
        category: 'Accessibility',
        description: 'ARIA label for the checkbox'
      },
      {
        name: 'ariaLabelledby',
        type: PropertyType.STRING,
        defaultValue: '',
        category: 'Accessibility',
        description: 'ID of element that labels the checkbox'
      },
      {
        name: 'color',
        type: PropertyType.SELECT,
        defaultValue: 'primary',
        category: 'Appearance',
        description: 'Color theme for the checkbox',
        options: ['primary', 'secondary', 'accent', 'success', 'warning', 'danger', 'info']
      }
    ];
  }

  private getCheckboxEvents(): EventDefinition[] {
    return [
      {
        name: 'change',
        description: 'Emitted when the checkbox checked state changes'
      },
      {
        name: 'blur',
        description: 'Emitted when the checkbox loses focus'
      },
      {
        name: 'focus',
        description: 'Emitted when the checkbox receives focus'
      }
    ];
  }

  private getCheckboxCodeSnippets(): any[] {
    return [
      {
        language: 'html',
        title: 'Basic Usage',
        description: 'Simple checkbox with label',
        code: '<sv-checkbox label="Accept terms and conditions"></sv-checkbox>'
      },
      {
        language: 'html',
        title: 'Checked State',
        description: 'Checkbox in checked state',
        code: '<sv-checkbox [checked]="true" label="Selected option"></sv-checkbox>'
      },
      {
        language: 'html',
        title: 'Indeterminate State',
        description: 'Checkbox in indeterminate state',
        code: '<sv-checkbox [indeterminate]="true" label="Partially selected"></sv-checkbox>'
      },
      {
        language: 'html',
        title: 'Disabled State',
        description: 'Disabled checkbox',
        code: '<sv-checkbox [disabled]="true" label="Unavailable option"></sv-checkbox>'
      },
      {
        language: 'html',
        title: 'Required Checkbox',
        description: 'Required checkbox for forms',
        code: '<sv-checkbox [required]="true" label="Required field"></sv-checkbox>'
      },
      {
        language: 'html',
        title: 'Custom Color',
        description: 'Checkbox with custom color',
        code: '<sv-checkbox color="accent" label="Accent colored checkbox"></sv-checkbox>'
      },
      {
        language: 'html',
        title: 'Full Configuration',
        description: 'Checkbox with all properties configured',
        code: `<sv-checkbox 
  [checked]="isChecked"
  [indeterminate]="isIndeterminate"
  [disabled]="isDisabled"
  [required]="isRequired"
  name="agreementCheckbox"
  value="agreed"
  label="I agree to the terms and conditions"
  ariaLabel="Terms agreement"
  color="success"
  (change)="onCheckboxChange($event)"
  (blur)="onCheckboxBlur($event)"
  (focus)="onCheckboxFocus($event)">
</sv-checkbox>`
      },
      {
        language: 'typescript',
        title: 'Component Implementation',
        description: 'Example usage in a component',
        code: `import { Component } from '@angular/core';
import { CheckboxComponent } from '@skillvo-web/ui-components';

@Component({
  selector: 'app-my-form',
  template: \`
    <div class="form-container">
      <sv-checkbox 
        [(checked)]="termsAccepted"
        [required]="true"
        label="I accept the terms and conditions"
        (change)="onTermsChange($event)">
      </sv-checkbox>
      
      <sv-checkbox 
        [(checked)]="subscribeToNewsletter"
        label="Subscribe to newsletter">
      </sv-checkbox>
      
      <button [disabled]="!termsAccepted">Submit</button>
    </div>
  \`,
  standalone: true,
  imports: [CheckboxComponent]
})
export class MyFormComponent {
  termsAccepted = false;
  subscribeToNewsletter = false;
  
  onTermsChange(event: any): void {
    console.log('Terms accepted:', event);
  }
}`
      }
    ];
  }

  private getCheckboxVariants(): any[] {
    return [
      {
        id: 'standard',
        name: 'Standard',
        description: 'Default checkbox appearance',
        properties: {}
      },
      {
        id: 'checked',
        name: 'Checked',
        description: 'Checkbox in the checked state',
        properties: {
          checked: true,
          label: 'Checked Checkbox'
        }
      },
      {
        id: 'indeterminate',
        name: 'Indeterminate',
        description: 'Checkbox in the indeterminate state',
        properties: {
          indeterminate: true,
          label: 'Indeterminate Checkbox'
        }
      },
      {
        id: 'disabled',
        name: 'Disabled',
        description: 'Disabled checkbox',
        properties: {
          disabled: true,
          label: 'Disabled Checkbox'
        }
      },
      {
        id: 'disabled-checked',
        name: 'Disabled Checked',
        description: 'Disabled checkbox in checked state',
        properties: {
          disabled: true,
          checked: true,
          label: 'Disabled Checked Checkbox'
        }
      },
      {
        id: 'required',
        name: 'Required',
        description: 'Required checkbox',
        properties: {
          required: true,
          label: 'Required Checkbox'
        }
      },
      {
        id: 'colored',
        name: 'Colored',
        description: 'Checkbox with different colors',
        properties: {
          color: 'accent',
          label: 'Accent Colored Checkbox'
        }
      },
      {
        id: 'success-color',
        name: 'Success Color',
        description: 'Checkbox with success color',
        properties: {
          color: 'success',
          checked: true,
          label: 'Success Colored Checkbox'
        }
      }
    ];
  }
} 