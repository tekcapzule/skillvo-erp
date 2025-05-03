import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TextFieldComponent, PasswordFieldComponent, NumberInputComponent } from '@skillvo-web/ui-components';
import { RouterModule } from '@angular/router';
import { DemoShellComponent } from '../../../core/components/demo-shell/demo-shell.component';
import { ComponentDemo, EventDefinition, PropertyDefinition, PropertyType } from '../../../core/interfaces/component-demo.interface';
import { DemoRegistryService } from '../../../core/services/demo-registry.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-controls-demo',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    TextFieldComponent,
    PasswordFieldComponent,
    NumberInputComponent,
    RouterModule,
    DemoShellComponent
  ],
  templateUrl: './controls-demo.component.html',
  styleUrls: ['./controls-demo.component.scss']
})
export class ControlsDemoComponent implements AfterViewInit, OnDestroy {
  readonly DEMO_ID = 'controls-component';
  private destroy$ = new Subject<void>();

  constructor(
    private demoRegistry: DemoRegistryService,
    private elementRef: ElementRef
  ) {
    // Register the Controls component demo
    this.registerControlsDemo();
  }

  ngAfterViewInit(): void {
    // Listen for when the component is rendered in the demo shell
    this.demoRegistry.activeDemo$
      .pipe(takeUntil(this.destroy$))
      .subscribe(demo => {
        if (demo && demo.id === this.DEMO_ID) {
          setTimeout(() => {
            this.applyControlsContent();
          }, 0);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private applyControlsContent(): void {
    // Find control elements in the demo container if needed
    // Add any specific manipulation of the controls for demo purposes
  }

  private registerControlsDemo(): void {
    const controlsDemo: ComponentDemo<TextFieldComponent> = {
      id: this.DEMO_ID,
      name: 'Input Controls',
      description: 'A collection of input controls for capturing various types of user data.',
      component: TextFieldComponent, // Using TextFieldComponent as the primary component
      properties: this.getControlsProperties(),
      events: this.getControlsEvents(),
      codeSnippets: this.getControlsCodeSnippets(),
      variants: this.getControlsVariants(),
      defaultVariantId: 'text-field-default',
      cssClasses: [
        'sv-input-base',
        'sv-text-field',
        'sv-password-field',
        'sv-number-input',
        'sv-ui-size-sm',
        'sv-ui-size-md', 
        'sv-ui-size-lg'
      ]
    };

    this.demoRegistry.registerDemo(controlsDemo);
  }

  private getControlsProperties(): PropertyDefinition[] {
    return [
      // Common properties across input controls
      {
        name: 'label',
        type: PropertyType.STRING,
        defaultValue: 'Label Text',
        category: 'Content',
        description: 'Label text for the input control'
      },
      {
        name: 'placeholder',
        type: PropertyType.STRING,
        defaultValue: 'Enter value...',
        category: 'Content',
        description: 'Placeholder text when the input is empty'
      },
      {
        name: 'required',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'Validation',
        description: 'Whether the input is required'
      },
      {
        name: 'disabled',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'State',
        description: 'Whether the input is disabled'
      },
      {
        name: 'readonly',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'State',
        description: 'Whether the input is read-only'
      },
      {
        name: 'size',
        type: PropertyType.SELECT,
        defaultValue: 'md',
        category: 'Appearance',
        description: 'Size of the input control',
        options: ['sm', 'md', 'lg']
      },
      {
        name: 'helperText',
        type: PropertyType.STRING,
        defaultValue: '',
        category: 'Content',
        description: 'Helper text displayed below the input'
      },
      {
        name: 'errorText',
        type: PropertyType.STRING,
        defaultValue: '',
        category: 'Validation',
        description: 'Error message displayed when validation fails'
      },
      // Text Field specific properties
      {
        name: 'maxLength',
        type: PropertyType.NUMBER,
        defaultValue: null,
        category: 'Validation',
        description: 'Maximum character length for text inputs'
      },
      // Password Field specific properties
      {
        name: 'showToggle',
        type: PropertyType.BOOLEAN,
        defaultValue: true,
        category: 'Behavior',
        description: 'Whether to show password visibility toggle (for password fields)'
      },
      // Number Input specific properties
      {
        name: 'min',
        type: PropertyType.NUMBER,
        defaultValue: null,
        category: 'Validation',
        description: 'Minimum value for number inputs'
      },
      {
        name: 'max',
        type: PropertyType.NUMBER,
        defaultValue: null,
        category: 'Validation',
        description: 'Maximum value for number inputs'
      },
      {
        name: 'step',
        type: PropertyType.NUMBER,
        defaultValue: 1,
        category: 'Behavior',
        description: 'Step value for number inputs'
      }
    ];
  }

  private getControlsEvents(): EventDefinition[] {
    return [
      {
        name: 'valueChange',
        description: 'Emitted when the input value changes'
      },
      {
        name: 'blur',
        description: 'Emitted when the input loses focus'
      },
      {
        name: 'focus',
        description: 'Emitted when the input gains focus'
      }
    ];
  }

  private getControlsCodeSnippets(): any[] {
    return [
      {
        language: 'html',
        title: 'Text Field',
        description: 'Basic text input field',
        code: '<sv-text-field label="Full Name" placeholder="Enter your full name"></sv-text-field>'
      },
      {
        language: 'html',
        title: 'Password Field',
        description: 'Secure password input with visibility toggle',
        code: '<sv-password-field label="Password" [showToggle]="true"></sv-password-field>'
      },
      {
        language: 'html',
        title: 'Number Input',
        description: 'Input for numerical values with increment/decrement controls',
        code: '<sv-number-input label="Quantity" [min]="0" [max]="100" [step]="1"></sv-number-input>'
      },
      {
        language: 'html',
        title: 'Required Field with Validation',
        description: 'Input field with required validation and error message',
        code: '<sv-text-field label="Email Address" [required]="true" errorText="Please enter a valid email address"></sv-text-field>'
      },
      {
        language: 'typescript',
        title: 'Component Implementation',
        description: 'Example of form controls integration in a component',
        code: `import { Component } from '@angular/core';
import { TextFieldComponent, PasswordFieldComponent } from '@skillvo-web/ui-components';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    TextFieldComponent, 
    PasswordFieldComponent,
    ReactiveFormsModule
  ],
  template: \`
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <sv-text-field 
        label="Email" 
        formControlName="email"
        [required]="true"
        [errorText]="getErrorMessage('email')">
      </sv-text-field>
      
      <sv-password-field 
        label="Password" 
        formControlName="password"
        [required]="true"
        [showToggle]="true"
        [errorText]="getErrorMessage('password')">
      </sv-password-field>
      
      <button type="submit" [disabled]="loginForm.invalid">Login</button>
    </form>
  \`
})
export class LoginFormComponent {
  loginForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  
  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (control?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if (control?.hasError('minlength')) {
      return 'Password must be at least 8 characters';
    }
    return '';
  }
  
  onSubmit() {
    if (this.loginForm.valid) {
      // Handle login logic
      console.log(this.loginForm.value);
    }
  }
}`
      }
    ];
  }

  private getControlsVariants(): any[] {
    return [
      // Text Field variants
      {
        id: 'text-field-default',
        name: 'Text Field (Default)',
        description: 'Standard text input field',
        component: TextFieldComponent,
        properties: {
          label: 'Full Name',
          placeholder: 'Enter your full name',
          size: 'md'
        }
      },
      {
        id: 'text-field-required',
        name: 'Required Text Field',
        description: 'Required text input with validation',
        component: TextFieldComponent,
        properties: {
          label: 'Email Address',
          placeholder: 'Enter your email',
          required: true,
          helperText: 'We\'ll never share your email',
          size: 'md'
        }
      },
      {
        id: 'text-field-with-error',
        name: 'Text Field with Error',
        description: 'Text field displaying an error state',
        component: TextFieldComponent,
        properties: {
          label: 'Username',
          placeholder: 'Choose a username',
          required: true,
          errorText: 'Username is already taken',
          size: 'md'
        }
      },
      // Password Field variants
      {
        id: 'password-field-default',
        name: 'Password Field',
        description: 'Password input with visibility toggle',
        component: PasswordFieldComponent,
        properties: {
          label: 'Password',
          placeholder: 'Enter your password',
          showToggle: true,
          size: 'md'
        }
      },
      {
        id: 'password-field-with-requirements',
        name: 'Password with Requirements',
        description: 'Password field with helper text for requirements',
        component: PasswordFieldComponent,
        properties: {
          label: 'Create Password',
          placeholder: 'Min. 8 characters',
          required: true,
          showToggle: true,
          helperText: 'Must include uppercase, lowercase, number, and special character',
          size: 'md'
        }
      },
      // Number Input variants
      {
        id: 'number-input-default',
        name: 'Number Input',
        description: 'Input for numerical values',
        component: NumberInputComponent,
        properties: {
          label: 'Quantity',
          min: 0,
          max: 100,
          step: 1,
          size: 'md'
        }
      },
      {
        id: 'number-input-currency',
        name: 'Currency Input',
        description: 'Number input configured for currency values',
        component: NumberInputComponent,
        properties: {
          label: 'Price',
          placeholder: '0.00',
          min: 0,
          step: 0.01,
          size: 'md'
        }
      },
      // Size variants
      {
        id: 'small-input',
        name: 'Small Size',
        description: 'Input control with small size',
        component: TextFieldComponent,
        properties: {
          label: 'Small Input',
          placeholder: 'Small size input',
          size: 'sm'
        }
      },
      {
        id: 'large-input',
        name: 'Large Size',
        description: 'Input control with large size',
        component: TextFieldComponent,
        properties: {
          label: 'Large Input',
          placeholder: 'Large size input',
          size: 'lg'
        }
      },
      // State variants
      {
        id: 'disabled-input',
        name: 'Disabled Input',
        description: 'Input control in disabled state',
        component: TextFieldComponent,
        properties: {
          label: 'Disabled Field',
          placeholder: 'This field is disabled',
          disabled: true,
          size: 'md'
        }
      },
      {
        id: 'readonly-input',
        name: 'Read-only Input',
        description: 'Input control in read-only state',
        component: TextFieldComponent,
        properties: {
          label: 'Read-only Field',
          placeholder: 'This field is read-only',
          readonly: true,
          size: 'md'
        }
      }
    ];
  }
} 