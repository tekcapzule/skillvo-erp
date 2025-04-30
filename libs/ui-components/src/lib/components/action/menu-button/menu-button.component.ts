import { Component, Input, Output, EventEmitter, HostBinding, OnInit, ContentChild, TemplateRef, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sv-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class MenuButtonComponent implements OnInit {
  @Input() variant: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'link' = 'primary';
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() disabled = false;
  @Input() ariaLabel?: string;
  @Input() menuLabel = 'Menu';
  @Input() iconOnly = false;
  @Input() noCaret = false;
  @Input() menuPosition: 'right' | 'center' | 'top' | 'start' | 'end' = 'right';
  @Input() animated = true;
  @Input() responsive = false;
  
  @Output() menuToggle = new EventEmitter<boolean>();
  @Output() menuItemClick = new EventEmitter<any>();
  
  @ViewChild('menuContainer') menuContainer!: ElementRef;
  @ContentChild('menuContent') menuContentTemplate!: TemplateRef<any>;
  @ContentChild('buttonContent') buttonContentTemplate!: TemplateRef<any>;
  
  isMenuOpen = false;
  
  @HostBinding('class')
  get hostClasses(): string {
    return [
      'sv-menu-button',
      `sv-menu-button-${this.variant}`,
      `sv-ui-size-${this.size}`,
      this.iconOnly ? 'sv-menu-button-icon-only' : '',
      this.noCaret ? 'sv-menu-button-no-caret' : '',
      this.responsive ? 'sv-menu-button-responsive' : '',
      this.disabled ? 'disabled' : ''
    ].filter(Boolean).join(' ');
  }
  
  ngOnInit(): void {}
  
  toggleMenu(event: MouseEvent): void {
    if (this.disabled) return;
    
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
    this.menuToggle.emit(this.isMenuOpen);
  }
  
  onMenuItemClick(item: any): void {
    this.menuItemClick.emit(item);
    this.closeMenu();
  }
  
  closeMenu(): void {
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
      this.menuToggle.emit(false);
    }
  }
  
  // Close menu when clicking outside
  onDocumentClick(event: MouseEvent): void {
    if (this.isMenuOpen && !this.menuContainer.nativeElement.contains(event.target)) {
      this.closeMenu();
    }
  }
}