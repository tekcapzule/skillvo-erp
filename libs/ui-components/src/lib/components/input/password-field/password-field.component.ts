import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseInputComponent } from './../base-input/base-input.component';

@Component({
  selector: 'sv-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordFieldComponent),
      multi: true
    }
  ]
})
export class PasswordFieldComponent extends BaseInputComponent {
  @Input() showToggle: boolean = true;
  @Input() showStrengthMeter: boolean = false;
  @Input() minStrength: number = 0; // 0-100 scale
  
  isPasswordVisible: boolean = false;
  passwordStrength: 'weak' | 'fair' | 'good' | 'strong' = 'weak';
  strengthScore: number = 0;
  
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  
  getInputType(): string {
    return this.isPasswordVisible ? 'text' : 'password';
  }
  
  override onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
    
    if (this.showStrengthMeter) {
      this.calculatePasswordStrength(value);
    }
  }
  
  calculatePasswordStrength(password: string): void {
    // Basic password strength calculation
    let score = 0;
    
    if (!password) {
      this.strengthScore = 0;
      this.passwordStrength = 'weak';
      return;
    }
    
    // Length check
    if (password.length >= 8) score += 25;
    if (password.length >= 12) score += 15;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) score += 15; // Has uppercase
    if (/[a-z]/.test(password)) score += 10; // Has lowercase
    if (/[0-9]/.test(password)) score += 15; // Has number
    if (/[^A-Za-z0-9]/.test(password)) score += 20; // Has special char
    
    // Assign strength category
    this.strengthScore = Math.min(score, 100);
    
    if (score < 40) {
      this.passwordStrength = 'weak';
    } else if (score < 60) {
      this.passwordStrength = 'fair';
    } else if (score < 80) {
      this.passwordStrength = 'good';
    } else {
      this.passwordStrength = 'strong';
    }
    
    // Update validity based on minimum strength required
    this.isValid = this.strengthScore >= this.minStrength;
  }
}