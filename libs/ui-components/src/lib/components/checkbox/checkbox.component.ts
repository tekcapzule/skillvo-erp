import { Component, Input, Output, EventEmitter, forwardRef, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'sv-checkbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent implements ControlValueAccessor {
  /**
   * The label text for the checkbox
   */
  @Input() label = '';
  
  /**
   * Whether the checkbox is disabled
   */
  @Input() disabled = false;
  
  /**
   * Whether the checkbox is required
   */
  @Input() required = false;
  
  /**
   * The name attribute for the checkbox
   */
  @Input() name = '';
  
  /**
   * The value of the checkbox
   */
  @Input() value: any;
  
  /**
   * Theme of the checkbox
   */
  @Input() theme: 'light' | 'dark' = 'light';
  
  /**
   * Custom class to apply to the component
   */
  @Input() customClass = '';
  
  /**
   * Whether the checkbox is indeterminate
   */
  @Input() indeterminate = false;
  
  /**
   * The internal checked state
   */
  private _checked = false;
  
  /**
   * Event emitted when the checkbox value changes
   */
  @Output() valueChange = new EventEmitter<boolean>();
  
  /**
   * Change callback
   */
  private onChange: (value: boolean) => void = () => {};
  
  /**
   * Touch callback
   */
  private onTouched: () => void = () => {};
  
  @HostBinding('class.theme-dark')
  get isDarkTheme(): boolean {
    return this.theme === 'dark';
  }
  
  /**
   * Whether the checkbox is checked
   */
  get checked(): boolean {
    return this._checked;
  }
  
  /**
   * Set the checked state
   */
  @Input()
  set checked(value: boolean) {
    if (this._checked !== value) {
      this._checked = value;
      this.onChange(value);
      this.valueChange.emit(value);
    }
  }
  
  /**
   * Handle checkbox change event
   */
  onCheckboxChange(event: Event): void {
    if (!this.disabled) {
      const target = event.target as HTMLInputElement;
      this.checked = target.checked;
      this.onTouched();
    }
  }
  
  // ControlValueAccessor implementation
  writeValue(value: boolean): void {
    this._checked = !!value;
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
} 