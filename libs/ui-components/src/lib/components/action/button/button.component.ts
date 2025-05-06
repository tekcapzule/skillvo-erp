import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Button component for the SkillVo design system
 * 
 * Provides a standard button control with various styling options
 */
@Component({
  selector: 'sv-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
  host: {
    '[class]': 'hostClasses',
    '[attr.disabled]': 'disabled || null',
    '[attr.aria-disabled]': 'disabled || null',
    '[attr.aria-busy]': 'loading || null',
    '[attr.aria-pressed]': 'pressed || null',
    '[type]': 'type'
  }
})
export class ButtonComponent {
  /**
   * Button variant: primary, secondary, tertiary, destructive, outline, link
   */
  @Input() variant: 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'outline' | 'link' = 'primary';
  
  /**
   * Button size: default, sm, lg
   */
  @Input() size: 'default' | 'sm' | 'lg' = 'default';
  
  /**
   * Whether the button is disabled
   */
  @Input() disabled = false;
  
  /**
   * Button type attribute
   */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  
  /**
   * Whether the button is in loading state
   */
  @Input() loading = false;
  
  /**
   * Whether the button should show a ripple effect
   */
  @Input() ripple = false;
  
  /**
   * Whether the button should show a pulse animation
   */
  @Input() pulse = false;
  
  /**
   * Whether the button is in pressed/selected state
   */
  @Input() pressed: boolean | null = null;
  
  /**
   * Whether to display the button with full width
   */
  @Input() fullWidth = false;
  
  /**
   * Whether this button has an icon only (no text)
   */
  @Input() iconOnly = false;
  
  /**
   * Accessible label for the button (required for icon-only buttons)
   */
  @Input() ariaLabel?: string;
  
  /**
   * Click event emitter
   */
  @Output() buttonClick = new EventEmitter<MouseEvent>();

  /**
   * Handles button click events
   */
  onClick(event: MouseEvent): void {
    if (!this.disabled && !this.loading) {
      this.buttonClick.emit(event);
    }
  }

  /**
   * Computes classes for the host element
   */
  get hostClasses(): string {
    return [
      'sv-button',
      `sv-button-${this.variant}`,
      this.size !== 'default' ? `sv-size-${this.size}` : '',
      this.iconOnly ? 'sv-action-icon-only' : '',
      this.fullWidth ? 'sv-button-full-width' : '',
      this.ripple ? 'sv-button-with-ripple' : '',
      this.pulse ? 'sv-button-pulse' : '',
      this.loading ? 'is-loading' : '',
      this.disabled ? 'is-disabled' : ''
    ].filter(Boolean).join(' ');
  }
} 