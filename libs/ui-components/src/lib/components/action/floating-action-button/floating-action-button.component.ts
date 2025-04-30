import { Component, Input, Output, EventEmitter, HostBinding, OnInit, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sv-fab',
  templateUrl: './floating-action-button.component.html',
  styleUrls: ['./floating-action-button.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class FloatingActionButtonComponent implements OnInit {
  @Input() variant: 'primary' | 'secondary' | 'success' = 'primary';
  @Input() size: 'mini' | 'regular' | 'large' = 'regular';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() ariaLabel?: string;
  @Input() position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'center' = 'bottom-right';
  @Input() absolute = false;
  @Input() extended = false;
  @Input() expandable = false;
  @Input() pressed = false;
  
  @Output() click = new EventEmitter<MouseEvent>();
  
  @ContentChild('text') textTemplate!: TemplateRef<any>;
  
  @HostBinding('class')
  get hostClasses(): string {
    const sizeClass = this.size === 'mini' ? 'sv-fab-mini' : 
                     this.size === 'large' ? 'sv-fab-large' : '';
    
    return [
      'sv-fab',
      `sv-fab-${this.variant}`,
      sizeClass,
      `sv-fab-${this.position}`,
      this.absolute ? 'sv-fab-absolute' : '',
      this.extended ? 'sv-fab-extended' : '',
      this.expandable ? 'sv-fab-expandable' : '',
      this.disabled ? 'disabled' : '',
      this.loading ? 'loading' : ''
    ].filter(Boolean).join(' ');
  }
  
  @HostBinding('attr.aria-pressed')
  get ariaPressed(): string | null {
    return this.pressed !== undefined ? String(this.pressed) : null;
  }
  
  @HostBinding('attr.aria-busy')
  get ariaBusy(): string | null {
    return this.loading ? 'true' : null;
  }
  
  ngOnInit(): void {}
  
  onClick(event: MouseEvent): void {
    if (this.disabled || this.loading) return;
    
    if (this.pressed !== undefined) {
      this.pressed = !this.pressed;
    }
    
    this.click.emit(event);
  }
}