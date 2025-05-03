import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TextFieldComponent } from '@skillvo-web/ui-components';
import { RouterModule } from '@angular/router';
import { DemoShellComponent } from '../../../core/components/demo-shell/demo-shell.component';
import { ComponentDemo, EventDefinition, PropertyDefinition, PropertyType } from '../../../core/interfaces/component-demo.interface';
import { DemoRegistryService } from '../../../core/services/demo-registry.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-text-field-demo',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    TextFieldComponent, 
    RouterModule,
    DemoShellComponent
  ],
  templateUrl: './text-field-demo.component.html',
  styleUrls: ['./text-field-demo.component.scss']
})
export class TextFieldDemoComponent implements AfterViewInit, OnDestroy {
  readonly DEMO_ID = 'text-field-component';
  private destroy$ = new Subject<void>();

  constructor(
    private demoRegistry: DemoRegistryService,
    private elementRef: ElementRef
  ) {
    // Register the Text Field component demo
    this.registerTextFieldDemo();
  }

  ngAfterViewInit(): void {
    // Listen for when the component is rendered in the demo shell
    this.demoRegistry.activeDemo$
      .pipe(takeUntil(this.destroy$))
      .subscribe(demo => {
        if (demo && demo.id === this.DEMO_ID) {
          setTimeout(() => {
            this.applyTextFieldContent();
          }, 0);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private applyTextFieldContent(): void {
    // Find text field elements in the demo container if needed
    // Add any specific manipulations for the demo
  }

  private registerTextFieldDemo(): void {
    const textFieldDemo: ComponentDemo<TextFieldComponent> = {
      id: this.DEMO_ID,
      name: 'Text Field Component',
      description: 'A versatile text input component for capturing user input with various styles, states, and validation options.',
      component: TextFieldComponent,
      properties: this.getTextFieldProperties(),
      events: this.getTextFieldEvents(),
      codeSnippets: this.getTextFieldCodeSnippets(),
      variants: this.getTextFieldVariants(),
      defaultVariantId: 'default',
      cssClasses: [
        'sv-input-base',
        'sv-text-field',
        'sv-ui-size-sm',
        'sv-ui-size-md', 
        'sv-ui-size-lg'
      ]
    };

    this.demoRegistry.registerDemo(textFieldDemo);
  }

  private getTextFieldProperties(): PropertyDefinition[] {
    return [
      {
        name: 'label',
        type: PropertyType.STRING,
        defaultValue: 'Label Text',
        category: 'Content',
        description: 'Label text for the text field'
      },
      {
        name: 'placeholder',
        type: PropertyType.STRING,
        defaultValue: 'Enter text...',
        category: 'Content',
        description: 'Placeholder text when the field is empty'
      },
      {
        name: 'value',
        type: PropertyType.STRING,
        defaultValue: '',
        category: 'Content',
        description: 'Current value of the text field'
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
        description: 'Size of the text field',
        options: ['sm', 'md', 'lg']
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
        description: 'Maximum character length for the text field'
      },
      {
        name: 'minLength',
        type: PropertyType.NUMBER,
        defaultValue: null,
        category: 'Validation',
        description: 'Minimum character length for the text field'
      },
      {
        name: 'type',
        type: PropertyType.SELECT,
        defaultValue: 'text',
        category: 'Behavior',
        description: 'HTML input type for the text field',
        options: ['text', 'email', 'tel', 'url', 'search']
      },
      {
        name: 'autocomplete',
        type: PropertyType.SELECT,
        defaultValue: 'off',
        category: 'Behavior',
        description: 'Autocomplete attribute for the text field',
        options: ['off', 'on', 'name', 'email', 'username', 'new-password', 'current-password', 'organization', 'street-address', 'tel']
      },
      {
        name: 'pattern',
        type: PropertyType.STRING,
        defaultValue: '',
        category: 'Validation',
        description: 'Regular expression pattern for validation'
      },
      {
        name: 'leadingIcon',
        type: PropertyType.STRING,
        defaultValue: '',
        category: 'Appearance',
        description: 'Icon displayed at the start of the input'
      },
      {
        name: 'trailingIcon',
        type: PropertyType.STRING,
        defaultValue: '',
        category: 'Appearance',
        description: 'Icon displayed at the end of the input'
      }
    ];
  }

  private getTextFieldEvents(): EventDefinition[] {
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
        name: 'keydown',
        description: 'Emitted when a key is pressed down while the input has focus'
      },
      {
        name: 'keyup',
        description: 'Emitted when a key is released while the input has focus'
      },
      {
        name: 'leadingIconClick',
        description: 'Emitted when the leading icon is clicked (if present)'
      },
      {
        name: 'trailingIconClick',
        description: 'Emitted when the trailing icon is clicked (if present)'
      }
    ];
  }

  private getTextFieldCodeSnippets(): any[] {
    return [
      {
        language: 'html',
        title: 'Basic Usage',
        description: 'Simple text field with label and placeholder',
        code: '<sv-text-field label="Full Name" placeholder="Enter your full name"></sv-text-field>'
      },
      {
        language: 'html',
        title: 'With Validation',
        description: 'Text field with required validation and error message',
        code: '<sv-text-field label="Email Address" [required]="true" type="email" errorText="Please enter a valid email address"></sv-text-field>'
      },
      {
        language: 'html',
        title: 'With Helper Text',
        description: 'Text field with helper text for additional context',
        code: '<sv-text-field label="Username" placeholder="Choose a username" helperText="Your username must be at least 5 characters"></sv-text-field>'
      },
      {
        language: 'html',
        title: 'With Icons',
        description: 'Text field with leading and trailing icons',
        code: '<sv-text-field label="Search" placeholder="Search..." leadingIcon="search" trailingIcon="mic"></sv-text-field>'
      },
      {
        language: 'html',
        title: 'Different States',
        description: 'Text field in different states',
        code: `<sv-text-field label="Disabled Field" [disabled]="true" placeholder="This field is disabled"></sv-text-field>
<sv-text-field label="Read-only Field" [readonly]="true" value="This field is read-only"></sv-text-field>
<sv-text-field label="Required Field" [required]="true" placeholder="This field is required"></sv-text-field>`
      },
      {
        language: 'typescript',
        title: 'Form Integration',
        description: 'Integration with Angular Reactive Forms',
        code: `import { Component } from '@angular/core';
import { TextFieldComponent } from '@skillvo-web/ui-components';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    TextFieldComponent,
    ReactiveFormsModule
  ],
  template: \`
    <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
      <sv-text-field 
        label="Name" 
        formControlName="name"
        [required]="true"
        [errorText]="getErrorMessage('name')">
      </sv-text-field>
      
      <sv-text-field 
        label="Email" 
        type="email"
        formControlName="email"
        [required]="true"
        [errorText]="getErrorMessage('email')">
      </sv-text-field>
      
      <sv-text-field 
        label="Subject" 
        formControlName="subject"
        [required]="true"
        [errorText]="getErrorMessage('subject')">
      </sv-text-field>
      
      <button type="submit" [disabled]="contactForm.invalid">Submit</button>
    </form>
  \`
})
export class ContactFormComponent {
  contactForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required]
    });
  }
  
  getErrorMessage(controlName: string): string {
    const control = this.contactForm.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    if (control?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    return '';
  }
  
  onSubmit() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      // Submit form data
    }
  }
}`
      }
    ];
  }

  private getTextFieldVariants(): any[] {
    return [
      {
        id: 'default',
        name: 'Default',
        description: 'Standard text field with label and placeholder',
        properties: {
          label: 'Full Name',
          placeholder: 'Enter your full name',
          size: 'md'
        }
      },
      {
        id: 'with-value',
        name: 'With Value',
        description: 'Text field with pre-filled value',
        properties: {
          label: 'Company',
          value: 'SkillVo Inc.',
          size: 'md'
        }
      },
      {
        id: 'required',
        name: 'Required',
        description: 'Required text field with validation',
        properties: {
          label: 'Email Address',
          placeholder: 'Enter your email',
          required: true,
          type: 'email',
          size: 'md'
        }
      },
      {
        id: 'with-helper',
        name: 'With Helper Text',
        description: 'Text field with helper text for guidance',
        properties: {
          label: 'Username',
          placeholder: 'Choose a username',
          helperText: 'Username must be between 5-20 characters',
          size: 'md'
        }
      },
      {
        id: 'with-error',
        name: 'With Error',
        description: 'Text field displaying error state',
        properties: {
          label: 'Password',
          placeholder: 'Enter password',
          required: true,
          errorText: 'Password must be at least 8 characters',
          size: 'md'
        }
      },
      {
        id: 'with-leading-icon',
        name: 'With Leading Icon',
        description: 'Text field with an icon at the start',
        properties: {
          label: 'Search',
          placeholder: 'Search...',
          leadingIcon: 'search',
          size: 'md'
        }
      },
      {
        id: 'with-trailing-icon',
        name: 'With Trailing Icon',
        description: 'Text field with an icon at the end',
        properties: {
          label: 'Location',
          placeholder: 'Enter location',
          trailingIcon: 'place',
          size: 'md'
        }
      },
      {
        id: 'email-field',
        name: 'Email Field',
        description: 'Specialized text field for email input',
        properties: {
          label: 'Email',
          placeholder: 'name@example.com',
          type: 'email',
          leadingIcon: 'email',
          size: 'md'
        }
      },
      {
        id: 'tel-field',
        name: 'Phone Number Field',
        description: 'Specialized text field for phone numbers',
        properties: {
          label: 'Phone Number',
          placeholder: '(555) 123-4567',
          type: 'tel',
          leadingIcon: 'phone',
          size: 'md'
        }
      },
      {
        id: 'url-field',
        name: 'URL Field',
        description: 'Specialized text field for web URLs',
        properties: {
          label: 'Website',
          placeholder: 'https://example.com',
          type: 'url',
          leadingIcon: 'language',
          size: 'md'
        }
      },
      {
        id: 'search-field',
        name: 'Search Field',
        description: 'Specialized text field for search functionality',
        properties: {
          label: 'Search',
          placeholder: 'Search for anything...',
          type: 'search',
          leadingIcon: 'search',
          trailingIcon: 'close',
          size: 'md'
        }
      },
      {
        id: 'disabled',
        name: 'Disabled',
        description: 'Text field in disabled state',
        properties: {
          label: 'Disabled Field',
          placeholder: 'This field is disabled',
          disabled: true,
          size: 'md'
        }
      },
      {
        id: 'readonly',
        name: 'Read-only',
        description: 'Text field in read-only state',
        properties: {
          label: 'Read-only Field',
          value: 'This content cannot be edited',
          readonly: true,
          size: 'md'
        }
      },
      {
        id: 'small',
        name: 'Small Size',
        description: 'Text field with small size',
        properties: {
          label: 'Small Input',
          placeholder: 'Small size input',
          size: 'sm'
        }
      },
      {
        id: 'large',
        name: 'Large Size',
        description: 'Text field with large size',
        properties: {
          label: 'Large Input',
          placeholder: 'Large size input',
          size: 'lg'
        }
      }
    ];
  }
} 