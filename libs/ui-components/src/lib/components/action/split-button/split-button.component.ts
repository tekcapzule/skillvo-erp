import { Component, Input, Output, EventEmitter, HostBinding, OnInit, ContentChild, TemplateRef, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'sv-split-button',
  templateUrl: './split-button.component.html',
  styleUrls: ['./split-button.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class SplitButtonComponent implements OnInit {
  @Input() variant: 'primary' | 'secondary' | 'outline' | 'tertiary' | 'destructive' = 'primary';
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() ariaLabel?: string;
  @Input() toggleAriaLabel = 'Toggle dropdown';
  @Input() customToggleIcon = false;
  
  @Output() actionClick = new EventEmitter<MouseEvent>();
  @Output() toggleClick = new EventEmitter<MouseEvent>();
  
  @ViewChild('dropdown') dropdown!: ElementRef;

  @ContentChild('actionContent') actionContentTemplate!: TemplateRef<any>;
  @ContentChild('toggleContent') toggleContentTemplate!: TemplateRef<any>;
  @ContentChild('dropdownContent') dropdownContentTemplate!: TemplateRef<any>;
  
  isDropdownOpen = false;
  
  @HostBinding('class')
  get hostClasses(): string {
    return [
      'sv-split-button',
      `sv-split-button-${this.variant}`,
      `sv-ui-size-${this.size}`,
      this.disabled ? 'disabled' : '',
      this.loading ? 'loading' : '',
      this.customToggleIcon ? 'sv-split-button-custom-toggle' : '',
    ].filter(Boolean).join(' ');
  }
  
  ngOnInit(): void {}
  
  onActionClick(event: MouseEvent): void {
    if (this.disabled || this.loading) return;
    this.actionClick.emit(event);
  }
  
  onToggleClick(event: MouseEvent): void {
    if (this.disabled || this.loading) return;
    this.isDropdownOpen = !this.isDropdownOpen;
    this.toggleClick.emit(event);
  }
  
  onDropdownItemClick(): void {
    this.closeDropdown();
  }
  
  closeDropdown(): void {
    this.isDropdownOpen = false;
  }
  
  // Close dropdown when clicking outside
  onDocumentClick(event: MouseEvent): void {
    if (this.isDropdownOpen && !this.dropdown.nativeElement.contains(event.target)) {
      this.closeDropdown();
    }
  }
}