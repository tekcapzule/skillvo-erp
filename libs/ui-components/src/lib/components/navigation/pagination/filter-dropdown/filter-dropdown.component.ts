import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface FilterOption {
  id: string;
  label: string;
  selected?: boolean;
}

export interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
}

@Component({
  selector: 'sv-filter-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-dropdown.component.html',
  styleUrls: ['./filter-dropdown.component.scss']
})
export class FilterDropdownComponent implements OnInit, OnChanges {
  @Input() label: string = 'Filter';
  @Input() customClass: string = '';
  @Input() filterGroups: FilterGroup[] = [];
  @Input() isOpen: boolean = false;
  @Input() disabled: boolean = false;
  @Input() showSelectedCount: boolean = true;
  
  @Output() filterChange = new EventEmitter<FilterOption[]>();
  @Output() openChange = new EventEmitter<boolean>();
  @Output() clearFilters = new EventEmitter<void>();
  
  filterIcon: SafeHtml;
  clearIcon: SafeHtml;
  arrowIcon: SafeHtml;
  
  selectedFiltersCount: number = 0;
  
  constructor(private sanitizer: DomSanitizer) {
    // Initialize SVG icons
    this.filterIcon = this.sanitizer.bypassSecurityTrustHtml(`
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.5 2H1.5C1.224 2 1 2.224 1 2.5V3.5C1 3.776 1.224 4 1.5 4H14.5C14.776 4 15 3.776 15 3.5V2.5C15 2.224 14.776 2 14.5 2Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12.5 7H3.5C3.224 7 3 7.224 3 7.5V8.5C3 8.776 3.224 9 3.5 9H12.5C12.776 9 13 8.776 13 8.5V7.5C13 7.224 12.776 7 12.5 7Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10.5 12H5.5C5.224 12 5 12.224 5 12.5V13.5C5 13.776 5.224 14 5.5 14H10.5C10.776 14 11 13.776 11 13.5V12.5C11 12.224 10.776 12 10.5 12Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `);
    
    this.clearIcon = this.sanitizer.bypassSecurityTrustHtml(`
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2 2L12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `);
    
    this.arrowIcon = this.sanitizer.bypassSecurityTrustHtml(`
      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `);
  }
  
  ngOnInit(): void {
    this.updateSelectedCount();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filterGroups']) {
      this.updateSelectedCount();
    }
  }
  
  toggleFilterOpen(): void {
    if (this.disabled) return;
    
    this.isOpen = !this.isOpen;
    this.openChange.emit(this.isOpen);
  }
  
  toggleOption(group: FilterGroup, option: FilterOption): void {
    option.selected = !option.selected;
    this.updateSelectedCount();
    this.emitFilterChange();
  }
  
  clearAllFilters(): void {
    this.filterGroups.forEach(group => {
      group.options.forEach(option => {
        option.selected = false;
      });
    });
    
    this.updateSelectedCount();
    this.emitFilterChange();
    this.clearFilters.emit();
  }
  
  updateSelectedCount(): void {
    this.selectedFiltersCount = this.getAllSelectedOptions().length;
  }
  
  getAllSelectedOptions(): FilterOption[] {
    return this.filterGroups
      .flatMap(group => group.options)
      .filter(option => option.selected);
  }
  
  emitFilterChange(): void {
    this.filterChange.emit(this.getAllSelectedOptions());
  }
  
  getSelectedLabelsByGroup(groupId: string): string[] {
    const group = this.filterGroups.find(g => g.id === groupId);
    if (!group) return [];
    
    return group.options
      .filter(option => option.selected)
      .map(option => option.label);
  }
  
  getGroupSelectionText(group: FilterGroup): string {
    const selectedLabels = this.getSelectedLabelsByGroup(group.id);
    if (selectedLabels.length === 0) return '';
    
    if (selectedLabels.length <= 2) {
      return selectedLabels.join(', ');
    }
    
    return `${selectedLabels.length} selected`;
  }
  
  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }
} 