# Checkbox Component

The Checkbox component allows users to select one or multiple items from a set of options.

## Basic Usage

```html
<sv-checkbox 
  id="terms" 
  name="terms" 
  label="I agree to the terms and conditions" 
  [required]="true">
</sv-checkbox>
```

## With Form Control

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  template: `
    <form [formGroup]="form">
      <sv-checkbox 
        id="subscribe" 
        formControlName="subscribe" 
        label="Subscribe to newsletter">
      </sv-checkbox>
    </form>
  `
})
export class CheckboxExampleComponent {
  form: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      subscribe: [false, Validators.required]
    });
  }
}
```

## Features

### Indeterminate State

```html
<sv-checkbox 
  id="selectAll" 
  [indeterminate]="someSelected" 
  [value]="allSelected"
  (change)="toggleAll($event)"
  label="Select All">
</sv-checkbox>
```

### Sizes

```html
<!-- Small -->
<sv-checkbox id="option1" size="small" label="Small option"></sv-checkbox>

<!-- Medium (default) -->
<sv-checkbox id="option2" label="Medium option"></sv-checkbox>

<!-- Large -->
<sv-checkbox id="option3" size="large" label="Large option"></sv-checkbox>
```

### Inline Layout

```html
<div>
  <sv-checkbox id="color1" [inline]="true" label="Red"></sv-checkbox>
  <sv-checkbox id="color2" [inline]="true" label="Green"></sv-checkbox>
  <sv-checkbox id="color3" [inline]="true" label="Blue"></sv-checkbox>
</div>
```

### Disabled State

```html
<sv-checkbox id="disabled" [disabled]="true" label="Disabled option"></sv-checkbox>
```

### With Help Text

```html
<sv-checkbox 
  id="option" 
  label="Enable feature" 
  helpText="Enabling this feature will allow access to advanced settings">
</sv-checkbox>
```

### Validation

```html
<sv-checkbox 
  id="terms" 
  [required]="true"
  [isValid]="termsAccepted" 
  errorMessage="You must accept the terms to continue"
  label="I accept the terms and conditions">
</sv-checkbox>
```

## API Reference

### Inputs

| Name | Type | Default | Description |
|------|------|---------|-------------|
| id | string | '' | Unique identifier for the checkbox |
| name | string | '' | Form control name |
| label | string | '' | Label text |
| required | boolean | false | Whether the checkbox is required |
| disabled | boolean | false | Whether the checkbox is disabled |
| readonly | boolean | false | Whether the checkbox is read-only |
| indeterminate | boolean | false | Whether the checkbox is in an indeterminate state |
| inline | boolean | false | Whether the checkbox should display inline |
| helpText | string | '' | Help text to display below the checkbox |
| errorMessage | string | '' | Error message to display when invalid |
| successMessage | string | '' | Success message to display when valid |
| size | 'small' \| 'medium' \| 'large' | 'medium' | Size of the checkbox |
| ariaLabel | string | undefined | ARIA label for accessibility |
| ariaLabelledby | string | undefined | ID of element that labels this checkbox |
| inputValue | string | undefined | Value attribute of the checkbox |

### Outputs

The checkbox implements ControlValueAccessor, so it works with both template-driven and reactive forms. 