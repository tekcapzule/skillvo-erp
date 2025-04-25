import { Component, Input, Output, EventEmitter, HostListener, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface DropdownOption {
  id: string | number;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'sv-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  /** List of options */
  @Input() options: DropdownOption[] = [];
  
  /** Currently selected option id */
  @Input() selectedId?: string | number;
  
  /** Whether the dropdown is disabled */
  @Input() disabled = false;
  
  /** Maximum height for the dropdown panel */
  @Input() maxHeight = '250px';
  
  /** Placeholder text when no option is selected */
  @Input() placeholder = 'Select';
  
  /** Label displayed above options in the dropdown */
  @Input() label = '';
  
  /** Optional custom class for styling */
  @Input() customClass = '';
  
  /** Emits when selection changes */
  @Output() selectionChange = new EventEmitter<DropdownOption>();
  
  /** Flag to track if dropdown is open */
  isOpen = false;
  
  /** Selected option */
  selectedOption?: DropdownOption;
  
  constructor(private elementRef: ElementRef) {}
  
  ngOnInit(): void {
    this.updateSelectedOption();
  }
  
  /** Update selected option based on selectedId */
  updateSelectedOption(): void {
    if (this.selectedId !== undefined) {
      this.selectedOption = this.options.find(option => option.id === this.selectedId);
    } else {
      this.selectedOption = undefined;
    }
  }
  
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
  
  /** Select an option */
  selectOption(option: DropdownOption, event: Event): void {
    event.stopPropagation();
    
    if (option.disabled) {
      return;
    }
    
    this.selectedOption = option;
    this.selectedId = option.id;
    this.selectionChange.emit(option);
    this.isOpen = false;
  }
  
  /** Get the display text for the dropdown */
  getDisplayText(): string {
    return this.selectedOption ? this.selectedOption.label : this.placeholder;
  }
} 