import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'sv-base-selection',
  template: '',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaseSelectionComponent),
      multi: true
    }
  ]
})
export class BaseSelectionComponent implements ControlValueAccessor {
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() helpText: string = '';
  @Input() errorMessage: string = '';
  @Input() successMessage: string = '';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() inline: boolean = false;

  value: any = false;
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

  onSelectionChange(event: Event): void {
    const value = (event.target as HTMLInputElement).checked;
    this.value = value;
    this.onChange(value);
  }

  onBlur(): void {
    this.isTouched = true;
    this.onTouched();
  }

  getSelectionClasses(): string {
    return `sv-selection-control-base 
            ${this.inline ? 'sv-selection-control-inline' : ''}
            ${this.size === 'small' ? 'sv-selection-sm' : this.size === 'large' ? 'sv-selection-lg' : ''}
            ${this.disabled ? 'sv-selection-disabled' : ''}
            ${this.readonly ? 'sv-selection-readonly' : ''}
            ${!this.isValid && this.isTouched ? 'sv-selection-error' : ''}
            ${this.isValid && this.isTouched && this.value ? 'sv-selection-success' : ''}`;
  }
} 