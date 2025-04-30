import { Component, Input, Output, EventEmitter, HostListener, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface MultiSelectOption {
  id: string | number;
  label: string;
  selected?: boolean;
  disabled?: boolean;
}

@Component({
  selector: 'sv-multi-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit {
  /** Label for the dropdown */
  @Input() label = 'Select options';
  
  /** List of options */
  @Input() options: MultiSelectOption[] = [];
  
  /** Whether the dropdown is disabled */
  @Input() disabled = false;
  
  /** Maximum height for the dropdown panel */
  @Input() maxHeight = '250px';
  
  /** Placeholder text when no options are selected */
  @Input() placeholder = 'Select';
  
  /** Optional custom class for styling */
  @Input() customClass = '';
  
  /** Emits when selection changes */
  @Output() selectionChange = new EventEmitter<MultiSelectOption[]>();
  
  /** Flag to track if dropdown is open */
  isOpen = false;
  
  constructor(private elementRef: ElementRef) {}
  
  ngOnInit(): void {
    // Ensure all options have a selected property
    this.options = this.options.map(option => ({
      ...option,
      selected: option.selected || false
    }));
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
  
  /** Toggle option selection */
  toggleOption(option: MultiSelectOption, event: Event): void {
    event.stopPropagation();
    
    if (option.disabled) {
      return;
    }
    
    option.selected = !option.selected;
    this.selectionChange.emit(this.getSelectedOptions());
  }
  
  /** Get array of currently selected options */
  getSelectedOptions(): MultiSelectOption[] {
    return this.options.filter(option => option.selected);
  }
  
  /** Get display text based on selections */
  getDisplayText(): string {
    const selected = this.getSelectedOptions();
    
    if (selected.length === 0) {
      return this.placeholder;
    }
    
    if (selected.length <= 2) {
      return selected.map(option => option.label).join(', ');
    }
    
    return `${selected.length} items selected`;
  }
} 