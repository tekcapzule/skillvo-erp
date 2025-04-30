import { Component, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ActionOption {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  danger?: boolean;
}

@Component({
  selector: 'sv-action-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './action-button.component.html',
  styleUrl: './action-button.component.scss'
})
export class ActionButtonComponent {
  /** Button label */
  @Input() label = 'Actions';
  
  /** List of action options */
  @Input() options: ActionOption[] = [];
  
  /** Whether the button is disabled */
  @Input() disabled = false;
  
  /** Maximum height for the dropdown panel */
  @Input() maxHeight = '250px';
  
  /** Optional custom class for styling */
  @Input() customClass = '';
  
  /** Optional button variant */
  @Input() variant: 'primary' | 'secondary' | 'tertiary' | 'ghost' = 'ghost';
  
  /** Emits when an action is selected */
  @Output() actionSelected = new EventEmitter<ActionOption>();
  
  /** Flag to track if dropdown is open */
  isOpen = false;
  
  constructor(private elementRef: ElementRef) {}
  
  /** Toggle the dropdown state */
  toggleDropdown(): void {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
    }
  }
  
  /** Close dropdown when clicking outside */
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
  
  /** Select an action */
  selectAction(option: ActionOption, event: Event): void {
    event.stopPropagation();
    
    if (option.disabled) {
      return;
    }
    
    this.actionSelected.emit(option);
    this.isOpen = false;
  }
} 