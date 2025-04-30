import { Component, Input, Output, EventEmitter, HostBinding, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sv-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class IconButtonComponent implements OnInit {
  @Input() variant: 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'outline' | 'minimal' = 'primary';
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() disabled = false;
  @Input() ariaLabel?: string;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() circular = false;
  @Input() pressed?: boolean;
  @Input() toggle = false;
  @Input() withBadge = false;
  @Input() expandable = false;
  @Input() closeButton = false;
  
  @Output() click = new EventEmitter<MouseEvent>();
  
  @HostBinding('class')
  get hostClasses(): string {
    return [
      'sv-icon-button',
      `sv-icon-button-${this.variant}`,
      `sv-ui-size-${this.size}`,
      this.circular ? 'sv-icon-button-circular' : '',
      this.toggle ? 'sv-icon-button-toggle' : '',
      this.withBadge ? 'sv-icon-button-with-badge' : '',
      this.expandable ? 'sv-icon-button-expandable' : '',
      this.closeButton ? 'sv-close-button' : '',
      this.disabled ? 'disabled' : ''
    ].filter(Boolean).join(' ');
  }
  
  @HostBinding('attr.aria-pressed')
  get ariaPressed(): string | null {
    return this.toggle ? String(!!this.pressed) : null;
  }
  
  ngOnInit(): void {}
  
  onClick(event: MouseEvent): void {
    if (this.disabled) return;
    
    if (this.toggle) {
      this.pressed = !this.pressed;
    }
    
    this.click.emit(event);
  }
}