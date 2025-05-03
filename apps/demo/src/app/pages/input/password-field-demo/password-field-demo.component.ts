import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { PasswordFieldComponent } from '@skillvo-web/ui-components';
import { RouterModule } from '@angular/router';
import { DemoShellComponent } from '../../../core/components/demo-shell/demo-shell.component';
import { ComponentDemo, EventDefinition, PropertyDefinition, PropertyType } from '../../../core/interfaces/component-demo.interface';
import { DemoRegistryService } from '../../../core/services/demo-registry.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-password-field-demo',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    PasswordFieldComponent, 
    RouterModule,
    DemoShellComponent
  ],
  templateUrl: './password-field-demo.component.html',
  styleUrls: ['./password-field-demo.component.scss']
})
export class PasswordFieldDemoComponent implements AfterViewInit, OnDestroy {
  readonly DEMO_ID = 'password-field-component';
  private destroy$ = new Subject<void>();

  constructor(
    private demoRegistry: DemoRegistryService,
    private elementRef: ElementRef
  ) {
    // Register the Password Field component demo
    this.registerPasswordFieldDemo();
  }

  ngAfterViewInit(): void {
    // Listen for when the component is rendered in the demo shell
    this.demoRegistry.activeDemo$
      .pipe(takeUntil(this.destroy$))
      .subscribe(demo => {
        if (demo && demo.id === this.DEMO_ID) {
          setTimeout(() => {
            this.applyPasswordFieldContent();
          }, 0);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private applyPasswordFieldContent(): void {
    // Find password field elements in the demo container if needed
    // Add any specific manipulations for the demo
  }

  private registerPasswordFieldDemo(): void {
    const passwordFieldDemo: ComponentDemo<PasswordFieldComponent> = {
      id: this.DEMO_ID,
      name: 'Password Field Component',
      description: 'A secure password input component with visibility toggle and strength validation features.',
      component: PasswordFieldComponent,
      properties: this.getPasswordFieldProperties(),
      events: this.getPasswordFieldEvents(),
      codeSnippets: this.getPasswordFieldCodeSnippets(),
      variants: this.getPasswordFieldVariants(),
      defaultVariantId: 'default',
      cssClasses: [
        'sv-input-base',
        'sv-password-field',
        'sv-ui-size-sm',
        'sv-ui-size-md', 
        'sv-ui-size-lg'
      ]
    };

    this.demoRegistry.registerDemo(passwordFieldDemo);
  }

  private getPasswordFieldProperties(): PropertyDefinition[] {
    return [
      {
        name: 'label',
        type: PropertyType.STRING,
        defaultValue: 'Password',
        category: 'Content',
        description: 'Label text for the password field'
      },
      {
        name: 'placeholder',
        type: PropertyType.STRING,
        defaultValue: 'Enter password...',
        category: 'Content',
        description: 'Placeholder text when the field is empty'
      },
      {
        name: 'value',
        type: PropertyType.STRING,
        defaultValue: '',
        category: 'Content',
        description: 'Current value of the password field'
      },
      {
        name: 'required',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'Validation',
        description: 'Whether the field is required'
      },
      {
        name: 'disabled',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'State',
        description: 'Whether the field is disabled'
      },
      {
        name: 'readonly',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'State',
        description: 'Whether the field is read-only'
      },
      {
        name: 'size',
        type: PropertyType.SELECT,
        defaultValue: 'md',
        category: 'Appearance',
        description: 'Size of the password field',
        options: ['sm', 'md', 'lg']
      },
      {
        name: 'showToggle',
        type: PropertyType.BOOLEAN,
        defaultValue: true,
        category: 'Behavior',
        description: 'Whether to show the password visibility toggle'
      },
      {
        name: 'showStrengthMeter',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'Behavior',
        description: 'Whether to show password strength meter'
      },
      {
        name: 'helperText',
        type: PropertyType.STRING,
        defaultValue: '',
        category: 'Content',
        description: 'Helper text displayed below the field'
      },
      {
        name: 'errorText',
        type: PropertyType.STRING,
        defaultValue: '',
        category: 'Validation',
        description: 'Error message displayed when validation fails'
      },
      {
        name: 'maxLength',
        type: PropertyType.NUMBER,
        defaultValue: null,
        category: 'Validation',
        description: 'Maximum character length for the password'
      },
      {
        name: 'minLength',
        type: PropertyType.NUMBER,
        defaultValue: null,
        category: 'Validation',
        description: 'Minimum character length for the password'
      },
      {
        name: 'autocomplete',
        type: PropertyType.SELECT,
        defaultValue: 'off',
        category: 'Behavior',
        description: 'Autocomplete attribute for the password field',
        options: ['off', 'on', 'new-password', 'current-password']
      },
      {
        name: 'strengthThresholds',
        type: PropertyType.STRING,
        defaultValue: '[8, 12, 16]',
        category: 'Validation',
        description: 'Thresholds for weak, medium, and strong password (when using strength meter)'
      },
      {
        name: 'toggleIconShow',
        type: PropertyType.STRING,
        defaultValue: 'visibility',
        category: 'Appearance',
        description: 'Icon to show when password is hidden'
      },
      {
        name: 'toggleIconHide',
        type: PropertyType.STRING,
        defaultValue: 'visibility_off',
        category: 'Appearance',
        description: 'Icon to show when password is visible'
      }
    ];
  }

  private getPasswordFieldEvents(): EventDefinition[] {
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
      },
      {
        name: 'visibilityChange',
        description: 'Emitted when the password visibility is toggled'
      },
      {
        name: 'strengthChange',
        description: 'Emitted when the password strength changes (if strength meter is enabled)'
      }
    ];
  }

  private getPasswordFieldCodeSnippets(): any[] {
    return [
      {
        language: 'html',
        title: 'Basic Usage',
        description: 'Simple password field with visibility toggle',
        code: '<sv-password-field label="Password" [showToggle]="true"></sv-password-field>'
      },
      {
        language: 'html',
        title: 'With Validation',
        description: 'Password field with required validation and error message',
        code: '<sv-password-field label="Password" [required]="true" errorText="Password is required"></sv-password-field>'
      },
      {
        language: 'html',
        title: 'With Strength Meter',
        description: 'Password field with strength meter and helper text',
        code: '<sv-password-field label="Create Password" [showStrengthMeter]="true" helperText="Strong passwords include uppercase, lowercase, numbers, and special characters"></sv-password-field>'
      },
      {
        language: 'html',
        title: 'Custom Autocomplete',
        description: 'Password field with specific autocomplete setting',
        code: '<sv-password-field label="New Password" autocomplete="new-password" helperText="Choose a strong password"></sv-password-field>'
      },
      {
        language: 'html',
        title: 'Different States',
        description: 'Password field in different states',
        code: `<sv-password-field label="Disabled Password" [disabled]="true"></sv-password-field>
<sv-password-field label="Read-only Password" [readonly]="true" value="SecurePassword123!"></sv-password-field>
<sv-password-field label="Required Password" [required]="true"></sv-password-field>`
      },
      {
        language: 'typescript',
        title: 'Form Integration',
        description: 'Integration with Angular Reactive Forms',
        code: `import { Component } from '@angular/core';
import { PasswordFieldComponent } from '@skillvo-web/ui-components';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-password-form',
  standalone: true,
  imports: [
    PasswordFieldComponent,
    ReactiveFormsModule
  ],
  template: \`
    <form [formGroup]="passwordForm" (ngSubmit)="onSubmit()">
      <sv-password-field 
        label="Current Password" 
        formControlName="currentPassword"
        [required]="true"
        [showToggle]="true"
        autocomplete="current-password"
        [errorText]="getErrorMessage('currentPassword')">
      </sv-password-field>
      
      <sv-password-field 
        label="New Password" 
        formControlName="newPassword"
        [required]="true"
        [showToggle]="true"
        [showStrengthMeter]="true"
        autocomplete="new-password"
        [errorText]="getErrorMessage('newPassword')">
      </sv-password-field>
      
      <sv-password-field 
        label="Confirm Password" 
        formControlName="confirmPassword"
        [required]="true"
        [showToggle]="true"
        autocomplete="new-password"
        [errorText]="getErrorMessage('confirmPassword')">
      </sv-password-field>
      
      <button type="submit" [disabled]="passwordForm.invalid">Change Password</button>
    </form>
  \`
})
export class PasswordFormComponent {
  passwordForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [
        Validators.required, 
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/)
      ]],
      confirmPassword: ['', Validators.required]
    }, { 
      validators: this.passwordMatchValidator 
    });
  }
  
  passwordMatchValidator(g: FormGroup) {
    const newPassword = g.get('newPassword')?.value;
    const confirmPassword = g.get('confirmPassword')?.value;
    
    return newPassword === confirmPassword 
      ? null 
      : { mismatch: true };
  }
  
  getErrorMessage(controlName: string): string {
    const control = this.passwordForm.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (control?.hasError('minlength')) {
      return 'Password must be at least 8 characters';
    }
    if (control?.hasError('pattern')) {
      return 'Password must include uppercase, lowercase, number, and special character';
    }
    if (controlName === 'confirmPassword' && this.passwordForm.hasError('mismatch')) {
      return 'Passwords do not match';
    }
    return '';
  }
  
  onSubmit() {
    if (this.passwordForm.valid) {
      console.log('Password change submitted');
      // Process password change
    }
  }
}`
      }
    ];
  }

  private getPasswordFieldVariants(): any[] {
    return [
      {
        id: 'default',
        name: 'Default',
        description: 'Standard password field with visibility toggle',
        properties: {
          label: 'Password',
          placeholder: 'Enter your password',
          showToggle: true,
          size: 'md'
        }
      },
      {
        id: 'with-strength-meter',
        name: 'With Strength Meter',
        description: 'Password field with strength meter visualization',
        properties: {
          label: 'Create Password',
          placeholder: 'Enter a strong password',
          showToggle: true,
          showStrengthMeter: true,
          size: 'md'
        }
      },
      {
        id: 'required',
        name: 'Required',
        description: 'Required password field with validation',
        properties: {
          label: 'Password',
          placeholder: 'Password is required',
          required: true,
          showToggle: true,
          size: 'md'
        }
      },
      {
        id: 'with-helper',
        name: 'With Helper Text',
        description: 'Password field with helper text for guidance',
        properties: {
          label: 'Create Password',
          placeholder: 'Min. 8 characters',
          helperText: 'Use at least 8 characters with a mix of letters, numbers & symbols',
          showToggle: true,
          size: 'md'
        }
      },
      {
        id: 'with-error',
        name: 'With Error',
        description: 'Password field displaying error state',
        properties: {
          label: 'Password',
          placeholder: 'Enter password',
          required: true,
          errorText: 'Password does not meet requirements',
          showToggle: true,
          size: 'md'
        }
      },
      {
        id: 'visibility-off',
        name: 'Without Visibility Toggle',
        description: 'Password field without visibility toggle',
        properties: {
          label: 'Secret Password',
          placeholder: 'Enter secret password',
          showToggle: false,
          size: 'md'
        }
      },
      {
        id: 'current-password',
        name: 'Current Password',
        description: 'Password field configured for current password input',
        properties: {
          label: 'Current Password',
          placeholder: 'Enter your current password',
          showToggle: true,
          autocomplete: 'current-password',
          size: 'md'
        }
      },
      {
        id: 'new-password',
        name: 'New Password',
        description: 'Password field configured for new password input',
        properties: {
          label: 'New Password',
          placeholder: 'Choose a new password',
          showToggle: true,
          showStrengthMeter: true,
          autocomplete: 'new-password',
          size: 'md'
        }
      },
      {
        id: 'disabled',
        name: 'Disabled',
        description: 'Password field in disabled state',
        properties: {
          label: 'Password',
          placeholder: 'This field is disabled',
          disabled: true,
          showToggle: true,
          size: 'md'
        }
      },
      {
        id: 'readonly',
        name: 'Read-only',
        description: 'Password field in read-only state',
        properties: {
          label: 'Password',
          value: '••••••••••',
          readonly: true,
          showToggle: false,
          size: 'md'
        }
      },
      {
        id: 'small',
        name: 'Small Size',
        description: 'Password field with small size',
        properties: {
          label: 'Password',
          placeholder: 'Small password field',
          showToggle: true,
          size: 'sm'
        }
      },
      {
        id: 'large',
        name: 'Large Size',
        description: 'Password field with large size',
        properties: {
          label: 'Password',
          placeholder: 'Large password field',
          showToggle: true,
          size: 'lg'
        }
      }
    ];
  }
} 