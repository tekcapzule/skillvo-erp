import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'sv-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  /** The search input value */
  @Input() value = '';
  
  /** Placeholder text for the search input */
  @Input() placeholder = 'Search';
  
  /** Whether the search input is disabled */
  @Input() disabled = false;
  
  /** Whether to automatically focus the input on component init */
  @Input() autoFocus = false;
  
  /** Custom classes to apply to the component */
  @Input() customClass = '';
  
  /** The aria-label for the search input */
  @Input() ariaLabel = 'Search';
  
  /** Event emitted when the search input value changes */
  @Output() valueChange = new EventEmitter<string>();
  
  /** Event emitted when the user submits the search (presses Enter) */
  @Output() search = new EventEmitter<string>();
  
  /** Event emitted when the clear button is clicked */
  @Output() clear = new EventEmitter<void>();
  
  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;
  
  /** Add a class if the component is disabled */
  @HostBinding('class.disabled')
  get isDisabled(): boolean {
    return this.disabled;
  }
  
  /** Add a class if the component has a value */
  @HostBinding('class.has-value')
  get hasValue(): boolean {
    return !!this.value;
  }
  
  ngAfterViewInit(): void {
    if (this.autoFocus && this.searchInput) {
      this.searchInput.nativeElement.focus();
    }
  }
  
  /** Update the search value and emit the change event */
  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.value = inputElement.value;
    this.valueChange.emit(this.value);
  }
  
  /** Handle key events to emit search on Enter */
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }
  
  /** Perform the search operation */
  onSearch(): void {
    this.search.emit(this.value);
  }
  
  /** Clear the search input */
  onClear(): void {
    this.value = '';
    this.valueChange.emit(this.value);
    this.clear.emit();
    
    if (this.searchInput) {
      this.searchInput.nativeElement.focus();
    }
  }
} 