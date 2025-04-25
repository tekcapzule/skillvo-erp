import { Component, Input, Output, EventEmitter, forwardRef, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'sv-radio-button',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './radio-button.component.html',
  styleUrl: './radio-button.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioButtonComponent),
      multi: true
    }
  ]
})
export class RadioButtonComponent implements ControlValueAccessor {
  /**
   * The value of the radio button
   */
  @Input() value: any;
  
  /**
   * The name attribute for the radio button
   */
  @Input() name = '';
  
  /**
   * The label text for the radio button
   */
  @Input() label = '';
  
  /**
   * Whether the radio button is disabled
   */
  @Input() disabled = false;
  
  /**
   * Theme of the radio button
   */
  @Input() theme: 'light' | 'dark' = 'light';
  
  /**
   * Custom class to apply to the component
   */
  @Input() customClass = '';
  
  /**
   * The selected value (internal model)
   */
  private _selectedValue: any = null;
  
  /**
   * Event emitted when the radio button value changes
   */
  @Output() valueChange = new EventEmitter<any>();
  
  /**
   * Change callback
   */
  private onChange: (value: any) => void = () => {};
  
  /**
   * Touch callback
   */
  private onTouched: () => void = () => {};
  
  @HostBinding('class.theme-dark')
  get isDarkTheme(): boolean {
    return this.theme === 'dark';
  }
  
  /**
   * Whether the radio button is checked
   */
  get checked(): boolean {
    return this._selectedValue === this.value;
  }
  
  /**
   * Set the selected value
   */
  set selectedValue(value: any) {
    if (this._selectedValue !== value) {
      this._selectedValue = value;
      this.onChange(value);
      this.valueChange.emit(value);
    }
  }
  
  /**
   * Get the selected value
   */
  get selectedValue(): any {
    return this._selectedValue;
  }
  
  /**
   * Handle radio button change event
   */
  onRadioChange(): void {
    if (!this.disabled) {
      this.selectedValue = this.value;
      this.onTouched();
    }
  }
  
  // ControlValueAccessor implementation
  writeValue(value: any): void {
    this._selectedValue = value;
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