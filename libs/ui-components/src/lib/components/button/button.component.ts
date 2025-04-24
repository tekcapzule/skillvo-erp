import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'sv-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: ButtonType = 'button';
  @Input() disabled = false;
  @Input() fullWidth = false;
  @Input() iconLeft = '';
  @Input() iconRight = '';
  @Input() ariaLabel: string | null = null;
  
  @Output() buttonClick = new EventEmitter<Event>();
  
  @HostBinding('class') get hostClasses(): string {
    return [
      `sv-button--${this.variant}`,
      `sv-button--${this.size}`,
      this.fullWidth ? 'sv-button--full-width' : '',
      this.disabled ? 'sv-button--disabled' : ''
    ].filter(Boolean).join(' ');
  }
  
  @HostBinding('attr.disabled') get isDisabled(): string | null {
    return this.disabled ? 'disabled' : null;
  }
  
  @HostBinding('attr.aria-disabled') get ariaDisabled(): string {
    return this.disabled ? 'true' : 'false';
  }
  
  @HostBinding('attr.type') get buttonType(): ButtonType {
    return this.type;
  }

  onClick(event: Event): void {
    if (!this.disabled) {
      this.buttonClick.emit(event);
    } else {
      event.stopPropagation();
    }
  }
}
