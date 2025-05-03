import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NumberInputComponent } from '@skillvo-web/ui-components';
import { RouterModule } from '@angular/router';
import { DemoShellComponent } from '../../../core/components/demo-shell/demo-shell.component';
import { ComponentDemo, EventDefinition, PropertyDefinition, PropertyType } from '../../../core/interfaces/component-demo.interface';
import { DemoRegistryService } from '../../../core/services/demo-registry.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-number-input-demo',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    NumberInputComponent, 
    RouterModule,
    DemoShellComponent
  ],
  templateUrl: './number-input-demo.component.html',
  styleUrls: ['./number-input-demo.component.scss']
})
export class NumberInputDemoComponent implements AfterViewInit, OnDestroy {
  readonly DEMO_ID = 'number-input-component';
  private destroy$ = new Subject<void>();

  constructor(
    private demoRegistry: DemoRegistryService,
    private elementRef: ElementRef
  ) {
    // Register the Number Input component demo
    this.registerNumberInputDemo();
  }

  ngAfterViewInit(): void {
    // Listen for when the component is rendered in the demo shell
    this.demoRegistry.activeDemo$
      .pipe(takeUntil(this.destroy$))
      .subscribe(demo => {
        if (demo && demo.id === this.DEMO_ID) {
          setTimeout(() => {
            this.applyNumberInputContent();
          }, 0);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private applyNumberInputContent(): void {
    // Find the number input elements in the demo container
    const numberInputElements = this.elementRef.nativeElement.querySelectorAll('sv-number-input');

    // Apply number input display text based on properties
    numberInputElements.forEach((numberInput: HTMLElement) => {
      // Check if it has slider
      const showSliderAttr = numberInput.getAttribute('ng-reflect-show-slider');
      const showSlider = showSliderAttr === 'true';
      
      // Check if disabled
      const isDisabled = numberInput.hasAttribute('disabled');
      
      let labelText = 'Basic Number Input';
      
      if (isDisabled) {
        labelText = 'Disabled Number Input';
      } else if (showSlider) {
        labelText = 'Number Input with Slider';
      }
      
      // Find the label element and set text
      const labelElement = numberInput.querySelector('.sv-input-label');
      if (labelElement) {
        labelElement.textContent = labelText;
      }
    });
  }

  private registerNumberInputDemo(): void {
    const numberInputDemo: ComponentDemo<NumberInputComponent> = {
      id: this.DEMO_ID,
      name: 'Number Input Component',
      description: 'A number input component that allows users to enter numeric values with validation, step buttons, and range slider options.',
      component: NumberInputComponent,
      properties: this.getNumberInputProperties(),
      events: this.getNumberInputEvents(),
      codeSnippets: this.getNumberInputCodeSnippets(),
      variants: this.getNumberInputVariants(),
      defaultVariantId: 'basic',
      cssClasses: [
        'sv-number-input-container',
        'sv-number-input-field',
        'sv-number-step-buttons',
        'sv-number-with-range',
        'sv-number-with-range-slider'
      ]
    };

    this.demoRegistry.registerDemo(numberInputDemo);
  }

  private getNumberInputProperties(): PropertyDefinition[] {
    return [
      {
        name: 'min',
        type: PropertyType.NUMBER,
        defaultValue: undefined,
        category: 'Constraints',
        description: 'Minimum allowed value'
      },
      {
        name: 'max',
        type: PropertyType.NUMBER,
        defaultValue: undefined,
        category: 'Constraints',
        description: 'Maximum allowed value'
      },
      {
        name: 'step',
        type: PropertyType.NUMBER,
        defaultValue: 1,
        category: 'Behavior',
        description: 'Step increment/decrement amount'
      },
      {
        name: 'precision',
        type: PropertyType.NUMBER,
        defaultValue: 0,
        category: 'Appearance',
        description: 'Number of decimal places to show'
      },
      {
        name: 'showStepButtons',
        type: PropertyType.BOOLEAN,
        defaultValue: true,
        category: 'Appearance',
        description: 'Whether to show increment/decrement buttons'
      },
      {
        name: 'showSlider',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'Appearance',
        description: 'Whether to show a range slider (requires min and max)'
      },
      {
        name: 'showValue',
        type: PropertyType.BOOLEAN,
        defaultValue: true,
        category: 'Appearance',
        description: 'Whether to show the numeric value'
      },
      {
        name: 'prefix',
        type: PropertyType.STRING,
        defaultValue: '',
        category: 'Appearance',
        description: 'Text to display before the number (e.g., "$")'
      },
      {
        name: 'suffix',
        type: PropertyType.STRING,
        defaultValue: '',
        category: 'Appearance',
        description: 'Text to display after the number (e.g., "%")'
      },
      {
        name: 'disabled',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'State',
        description: 'Whether the number input is disabled'
      },
      {
        name: 'readonly',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'State',
        description: 'Whether the number input is read-only'
      },
      {
        name: 'required',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'Validation',
        description: 'Whether the number input is required'
      },
      {
        name: 'label',
        type: PropertyType.STRING,
        defaultValue: '',
        category: 'Content',
        description: 'Label for the number input'
      },
      {
        name: 'placeholder',
        type: PropertyType.STRING,
        defaultValue: '',
        category: 'Content',
        description: 'Placeholder text when empty'
      },
      {
        name: 'helpText',
        type: PropertyType.STRING,
        defaultValue: '',
        category: 'Content',
        description: 'Help text displayed below the number input'
      }
    ];
  }

  private getNumberInputEvents(): EventDefinition[] {
    return [
      {
        name: 'numberChange',
        description: 'Emitted when the number value changes'
      }
    ];
  }

  private getNumberInputCodeSnippets(): any[] {
    return [
      {
        language: 'html',
        title: 'Basic Usage',
        description: 'Simple number input with default settings',
        code: '<sv-number-input label="Quantity"></sv-number-input>'
      },
      {
        language: 'html',
        title: 'With Min/Max',
        description: 'Number input with min and max constraints',
        code: '<sv-number-input [min]="0" [max]="100" label="Percentage"></sv-number-input>'
      },
      {
        language: 'html',
        title: 'With Slider',
        description: 'Number input with a range slider',
        code: '<sv-number-input [min]="0" [max]="100" [showSlider]="true" label="Volume"></sv-number-input>'
      },
      {
        language: 'html',
        title: 'With Prefix/Suffix',
        description: 'Number input with prefix and suffix',
        code: '<sv-number-input [min]="0" prefix="$" label="Price"></sv-number-input>'
      },
      {
        language: 'html',
        title: 'Decimal Precision',
        description: 'Number input with decimal precision',
        code: '<sv-number-input [precision]="2" [step]="0.1" label="Weight (kg)"></sv-number-input>'
      },
      {
        language: 'html',
        title: 'Full Configuration',
        description: 'Number input with all properties configured',
        code: `<sv-number-input 
  [min]="0" 
  [max]="1000" 
  [step]="5" 
  [precision]="2" 
  [showStepButtons]="true" 
  [showSlider]="true" 
  prefix="$" 
  [required]="true" 
  label="Budget" 
  helpText="Enter amount between $0 and $1000"
  (numberChange)="onNumberChange($event)">
</sv-number-input>`
      },
      {
        language: 'typescript',
        title: 'Component Implementation',
        description: 'Example of how to implement the number input in a component',
        code: `import { Component } from '@angular/core';
import { NumberInputComponent } from '@skillvo-web/ui-components';

@Component({
  selector: 'app-my-component',
  template: \`
    <sv-number-input
      [min]="0"
      [max]="100"
      [step]="1"
      [precision]="0"
      suffix="%"
      [required]="true"
      label="Completion"
      (numberChange)="onCompletionChange($event)">
    </sv-number-input>
  \`,
  standalone: true,
  imports: [NumberInputComponent]
})
export class MyComponent {
  onCompletionChange(value: number): void {
    console.log('Completion percentage:', value);
    // Handle the number change
  }
}`
      }
    ];
  }

  private getNumberInputVariants(): any[] {
    return [
      {
        id: 'basic',
        label: 'Basic Number Input',
        description: 'Default number input with step buttons',
        properties: {},
        template: `<sv-number-input label="Basic Number Input"></sv-number-input>`
      },
      {
        id: 'constrained',
        label: 'Constrained Input',
        description: 'Number input with min and max constraints',
        properties: {
          min: 0,
          max: 100
        },
        template: `<sv-number-input 
  [min]="0" 
  [max]="100" 
  label="Constrained (0-100)"
></sv-number-input>`
      },
      {
        id: 'slider',
        label: 'With Slider',
        description: 'Number input with a range slider',
        properties: {
          min: 0,
          max: 100,
          showSlider: true
        },
        template: `<sv-number-input 
  [min]="0" 
  [max]="100" 
  [showSlider]="true" 
  label="With Slider"
></sv-number-input>`
      },
      {
        id: 'decimal',
        label: 'Decimal Precision',
        description: 'Number input with decimal precision',
        properties: {
          precision: 2,
          step: 0.1
        },
        template: `<sv-number-input 
  [precision]="2" 
  [step]="0.1" 
  label="Decimal (0.1 steps)"
></sv-number-input>`
      },
      {
        id: 'with-prefix',
        label: 'With Prefix',
        description: 'Number input with currency prefix',
        properties: {
          prefix: '$',
          precision: 2,
          min: 0
        },
        template: `<sv-number-input 
  prefix="$" 
  [precision]="2" 
  [min]="0" 
  label="Price"
></sv-number-input>`
      },
      {
        id: 'with-suffix',
        label: 'With Suffix',
        description: 'Number input with percentage suffix',
        properties: {
          suffix: '%',
          min: 0,
          max: 100
        },
        template: `<sv-number-input 
  suffix="%" 
  [min]="0" 
  [max]="100" 
  label="Percentage"
></sv-number-input>`
      },
      {
        id: 'no-step-buttons',
        label: 'No Step Buttons',
        description: 'Number input without step buttons',
        properties: {
          showStepButtons: false
        },
        template: `<sv-number-input 
  [showStepButtons]="false" 
  label="No Step Buttons"
></sv-number-input>`
      },
      {
        id: 'disabled',
        label: 'Disabled',
        description: 'Disabled number input',
        properties: {
          disabled: true,
          value: 50
        },
        template: `<sv-number-input 
  [disabled]="true" 
  [value]="50" 
  label="Disabled Input"
></sv-number-input>`
      }
    ];
  }
} 