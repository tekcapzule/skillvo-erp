import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseInputComponent } from '../base-input/base-input.component';

@Component({
  selector: 'sv-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextFieldComponent),
      multi: true
    }
  ]
})
export class TextFieldComponent extends BaseInputComponent {
  @Input() type: 'text' | 'email' | 'url' | 'tel' = 'text';
  @Input() maxLength?: number;
  @Input() minLength?: number;
  @Input() pattern?: string;
  @Input() autocomplete: string = 'off';
  @Input() multiline: boolean = false;
  @Input() rows: number = 3;
  @Input() showCharacterCount: boolean = false;
  
  get characterCount(): number {
    return this.value ? this.value.length : 0;
  }
  
  get isNearLimit(): boolean {
    if (!this.maxLength) return false;
    return this.characterCount >= this.maxLength * 0.9;
  }
  
  get isAtLimit(): boolean {
    if (!this.maxLength) return false;
    return this.characterCount >= this.maxLength;
  }
  
  getTextFieldClasses(): string {
    return `sv-text-field 
            ${this.multiline ? 'sv-text-field-multiline' : ''}
            ${this.showCharacterCount ? 'sv-text-field-with-limit' : ''}`;
  }
}