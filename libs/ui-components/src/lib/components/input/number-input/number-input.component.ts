import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseInputComponent } from './../base-input/base-input.component';

@Component({
  selector: 'sv-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberInputComponent),
      multi: true
    }
  ]
})
export class NumberInputComponent extends BaseInputComponent {
  @Input() min?: number;
  @Input() max?: number;
  @Input() step: number = 1;
  @Input() precision: number = 0; // Number of decimal places
  @Input() showStepButtons: boolean = true;
  @Input() showSlider: boolean = false;
  @Input() showValue: boolean = true;
  @Input() suffix?: string;
  @Input() prefix?: string;
  
  @Output() numberChange = new EventEmitter<number>();
  
  numericValue: number = 0;
  
  ngOnInit() {
    // Initialize with default value if no input provided
    if (this.value === '' || this.value === undefined) {
      this.numericValue = this.min !== undefined ? this.min : 0;
      this.value = this.formatNumber(this.numericValue);
    } else {
      this.updateNumericValue(this.value);
    }
  }
  
  override writeValue(value: any): void {
    this.value = value;
    this.updateNumericValue(value);
  }
  
  updateNumericValue(value: any): void {
    if (value === null || value === undefined || value === '') {
      this.numericValue = this.min !== undefined ? this.min : 0;
      return;
    }
    
    // Handle numeric or string inputs
    const parsedValue = typeof value === 'string' ? parseFloat(value) : value;
    
    if (!isNaN(parsedValue)) {
      this.numericValue = this.applyConstraints(parsedValue);
    } else {
      this.numericValue = this.min !== undefined ? this.min : 0;
    }
  }
  
  override onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    
    // Handle empty input
    if (inputValue === '') {
      this.value = '';
      this.onChange(this.value);
      return;
    }
    
    // Remove prefix and suffix for parsing
    const strippedValue = this.stripPrefixSuffix(inputValue);
    const parsedValue = parseFloat(strippedValue);
    
    if (!isNaN(parsedValue)) {
      this.numericValue = this.applyConstraints(parsedValue);
      this.value = this.formatNumber(this.numericValue);
      this.onChange(this.value);
      this.numberChange.emit(this.numericValue);
    }
  }
  
  onSliderChange(event: Event): void {
    const value = +(event.target as HTMLInputElement).value;
    this.numericValue = this.applyConstraints(value);
    this.value = this.formatNumber(this.numericValue);
    this.onChange(this.value);
    this.numberChange.emit(this.numericValue);
  }
  
  increment(): void {
    this.numericValue = this.applyConstraints(this.numericValue + this.step);
    this.value = this.formatNumber(this.numericValue);
    this.onChange(this.value);
    this.numberChange.emit(this.numericValue);
  }
  
  decrement(): void {
    this.numericValue = this.applyConstraints(this.numericValue - this.step);
    this.value = this.formatNumber(this.numericValue);
    this.onChange(this.value);
    this.numberChange.emit(this.numericValue);
  }
  
  applyConstraints(value: number): number {
    // Apply min constraints
    if (this.min !== undefined && value < this.min) {
      value = this.min;
    }
    
    // Apply max constraints
    if (this.max !== undefined && value > this.max) {
      value = this.max;
    }
    
    // Apply precision
    if (this.precision >= 0) {
      const factor = Math.pow(10, this.precision);
      value = Math.round(value * factor) / factor;
    }
    
    return value;
  }
  
  formatNumber(num: number): string {
    let formatted = num.toFixed(this.precision);
    
    // Add prefix and suffix if specified
    if (this.prefix) {
      formatted = this.prefix + formatted;
    }
    
    if (this.suffix) {
      formatted += this.suffix;
    }
    
    return formatted;
  }
  
  stripPrefixSuffix(value: string): string {
    let result = value;
    
    // Remove prefix
    if (this.prefix && result.startsWith(this.prefix)) {
      result = result.substring(this.prefix.length);
    }
    
    // Remove suffix
    if (this.suffix && result.endsWith(this.suffix)) {
      result = result.substring(0, result.length - this.suffix.length);
    }
    
    return result;
  }
  
  // Calculate percentage for slider
  getPercentage(): number {
    if (this.min === undefined || this.max === undefined) {
      return 0;
    }
    
    return ((this.numericValue - this.min) / (this.max - this.min)) * 100;
  }
  
  isIncrementDisabled(): boolean {
    return this.disabled || (this.max !== undefined && this.numericValue >= this.max);
  }
  
  isDecrementDisabled(): boolean {
    return this.disabled || (this.min !== undefined && this.numericValue <= this.min);
  }
}