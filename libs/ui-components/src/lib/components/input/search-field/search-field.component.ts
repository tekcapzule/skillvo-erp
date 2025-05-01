import { Component, Input, Output, EventEmitter, forwardRef, ElementRef, ViewChild, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseInputComponent } from './../base-input/base-input.component';

export interface SearchResult {
  id: string | number;
  title: string;
  description?: string;
  icon?: string;
  category?: string;
}

@Component({
  selector: 'sv-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchFieldComponent),
      multi: true
    }
  ]
})
export class SearchFieldComponent extends BaseInputComponent {
  @Input() variant: 'default' | 'compact' | 'expanded' | 'rounded' = 'default';
  @Input() showSubmitButton: boolean = false;
  @Input() submitButtonText: string = 'Search';
  @Input() results: SearchResult[] = [];
  @Input() isLoading: boolean = false;
  @Input() emptyResultsMessage: string = 'No results found';
  @Input() loadingMessage: string = 'Searching...';
  @Input() showClearButton: boolean = true;
  @Input() debounceTime: number = 300;
  @Input() minChars: number = 2;
  @Input() highlightMatches: boolean = true;
  @Input() groupedResults: { [key: string]: SearchResult[] } = {};
  
  @Output() search = new EventEmitter<string>();
  @Output() resultSelected = new EventEmitter<SearchResult>();
  @Output() clear = new EventEmitter<void>();
  @Output() submit = new EventEmitter<string>();
  
  @ViewChild('searchInput') searchInput!: ElementRef;
  
  showResults: boolean = false;
  selectedResultIndex: number = -1;
  private debounceTimer: any = null;
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Close results dropdown when clicking outside
    if (this.searchInput) {
      const clickedInside = this.searchInput.nativeElement.contains(event.target);
      if (!clickedInside) {
        this.showResults = false;
      }
    }
  }
  
  getSearchFieldClasses(): any {
    return {
      'sv-search-field': true,
      'sv-search-field-compact': this.variant === 'compact',
      'sv-search-field-expanded': this.variant === 'expanded',
      'sv-search-field-rounded': this.variant === 'rounded',
      'sv-search-field-with-button': this.showSubmitButton
    };
  }
  
  override onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
    
    // Reset the selected result index
    this.selectedResultIndex = -1;
    
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    
    // Debounce search to avoid excessive API calls
    this.debounceTimer = setTimeout(() => {
      if (value && value.length >= this.minChars) {
        this.search.emit(value);
        this.showResults = true;
      } else {
        this.showResults = false;
      }
    }, this.debounceTime);
  }
  
  clearSearch(): void {
    this.value = '';
    this.onChange('');
    this.showResults = false;
    this.clear.emit();
    // Focus the input after clearing
    if (this.searchInput) {
      this.searchInput.nativeElement.focus();
    }
  }
  
  selectResult(result: SearchResult): void {
    this.value = result.title;
    this.onChange(result.title);
    this.showResults = false;
    this.resultSelected.emit(result);
  }
  
  submitSearch(): void {
    this.submit.emit(this.value);
    this.showResults = false;
  }
  
  handleKeyDown(event: KeyboardEvent): void {
    // Handle keyboard navigation in results
    if (this.showResults && this.results.length > 0) {
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          this.selectedResultIndex = Math.min(this.selectedResultIndex + 1, this.results.length - 1);
          break;
          
        case 'ArrowUp':
          event.preventDefault();
          this.selectedResultIndex = Math.max(this.selectedResultIndex - 1, -1);
          break;
          
        case 'Enter':
          event.preventDefault();
          if (this.selectedResultIndex >= 0) {
            this.selectResult(this.results[this.selectedResultIndex]);
          } else {
            this.submitSearch();
          }
          break;
          
        case 'Escape':
          event.preventDefault();
          this.showResults = false;
          break;
      }
    }
  }
  
  highlightText(text: string): string {
    if (!this.highlightMatches || !this.value) return text;
    
    const regex = new RegExp(`(${this.escapeRegExp(this.value)})`, 'gi');
    return text.replace(regex, '<span class="sv-search-results-item-content-main-title-highlight">$1</span>');
  }
  
  private escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  hasGroups(): boolean {
    return Object.keys(this.groupedResults).length > 0;
  }
}