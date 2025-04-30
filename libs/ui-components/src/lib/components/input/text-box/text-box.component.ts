import { Component, Input, Output, EventEmitter, forwardRef, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'sv-text-box',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextBoxComponent),
      multi: true
    }
  ]
})
export class TextBoxComponent implements ControlValueAccessor {
  /** Placeholder text */
  @Input() placeholder: string = '';
  
  /** Whether the input is disabled */
  @Input() disabled: boolean = false;
  
  /** Whether input is required */
  @Input() required: boolean = false;
  
  /** Input type (text, email, password, etc.) */
  @Input() type = 'text';
  
  /** Maximum input length */
  @Input() maxLength?: number;
  
  /** Text input mode (numeric, email, etc.) */
  @Input() inputMode?: string;
  
  /** Whether the input is a multiline textarea */
  @Input() multiline: boolean = false;
  
  /** Number of rows for multiline textarea */
  @Input() rows: number = 3;
  
  /** Optional error message to display */
  @Input() errorMessage: string = '';
  
  /** Optional helper text to display */
  @Input() helperText: string = '';
  
  /** Optional custom CSS class */
  @Input() customClass = '';
  
  /** Internal value storage */
  private _value = '';
  
  /** Emits when value changes */
  @Output() valueChange = new EventEmitter<string>();
  
  /** Emits when input loses focus */
  @Output() inputBlur = new EventEmitter<FocusEvent>();
  
  /** Emits when input gains focus */
  @Output() inputFocus = new EventEmitter<FocusEvent>();
  
  /** Gets the current value */
  get value(): string {
    return this._value;
  }
  
  /** Sets the input value */
  set value(val: string) {
    if (val !== this._value) {
      this._value = val;
      this.onChange(val);
      this.valueChange.emit(val);
    }
  }
  
  /** Track if field is focused */
  isFocused = false;
  
  // ControlValueAccessor implementation
  private onChange: any = () => {};
  private onTouched: any = () => {};
  
  /** Write value from form control */
  writeValue(value: string): void {
    this._value = value || '';
  }
  
  /** Register onChange callback */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  
  /** Register onTouched callback */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  
  /** Set disabled state */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  
  /** Handle focus event */
  onFocus(): void {
    this.isFocused = true;
  }
  
  /** Handle blur event */
  onBlur(event: FocusEvent): void {
    this.isFocused = false;
    this.onTouched();
    this.inputBlur.emit(event);
  }
  
  @HostBinding('class.disabled') get isDisabled() {
    return this.disabled;
  }

  @HostBinding('class.error') get hasError() {
    return !!this.errorMessage;
  }

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    this.value = target.value;
    this.onChange(target.value);
    this.valueChange.emit(target.value);
  }

  onInputFocus(event: FocusEvent) {
    this.inputFocus.emit(event);
  }

  onInputBlur(event: FocusEvent) {
    this.onTouched();
    this.inputBlur.emit(event);
  }
} 