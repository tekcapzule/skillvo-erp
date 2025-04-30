import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'sv-base-input',
  template: '',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaseInputComponent),
      multi: true
    }
  ]
})
export class BaseInputComponent implements ControlValueAccessor {
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() helpText: string = '';
  @Input() errorMessage: string = '';
  @Input() successMessage: string = '';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  value: any = '';
  isValid: boolean = true;
  isTouched: boolean = false;
  
  // Control Value Accessor Methods
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
  }

  onBlur(): void {
    this.isTouched = true;
    this.onTouched();
  }

  getInputClasses(): string {
    return `sv-input-base 
            ${this.size === 'small' ? 'sv-input-sm' : this.size === 'large' ? 'sv-input-lg' : ''}
            ${this.disabled ? 'sv-input-disabled' : ''}
            ${this.readonly ? 'sv-input-readonly' : ''}
            ${!this.isValid && this.isTouched ? 'sv-input-error' : ''}
            ${this.isValid && this.isTouched && this.value ? 'sv-input-success' : ''}`;
  }
}