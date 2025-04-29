import { Component, Input, Output, EventEmitter, HostBinding, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'outline' | 'link' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';
export type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'sv-button',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: ButtonType = 'button';
  @Input() disabled = false;
  @Input() fullWidth = false;
  @Input() icon: string | null = null;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() withRipple = false;
  @Input() ariaLabel: string | null = null;
  @Input() loading = false;
  @Input() responsive = false;
  
  @Output() clicked = new EventEmitter<Event>();
  
  // Apply button variant classes
  @HostBinding('class') get hostClasses(): string {
    return [
      // Add variant class based on input
      `sv-button-${this.variant}`,
      // Add size class based on input
      `sv-ui-size-${this.size}`,
      // Add additional feature classes as needed
      this.fullWidth ? 'sv-button-responsive' : '',
      this.withRipple ? 'sv-button-with-ripple' : '',
      this.responsive ? 'sv-button-responsive' : ''
    ].filter(Boolean).join(' ');
  }
  
  @HostBinding('attr.disabled') get isDisabled(): string | null {
    return this.disabled ? 'disabled' : null;
  }
  
  @HostBinding('attr.aria-disabled') get ariaDisabled(): string {
    return this.disabled ? 'true' : 'false';
  }
  
  onClick(event: Event): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
    } else {
      event.stopPropagation();
      event.preventDefault();
    }
  }
}