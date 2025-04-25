import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export type SortDirection = 'asc' | 'desc' | null;

@Component({
  selector: 'sv-sort-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sort-button.component.html',
  styleUrl: './sort-button.component.scss'
})
export class SortButtonComponent {
  @Input() sortDirection: SortDirection = null;
  @Input() disabled: boolean = false;
  
  @Output() sortChange = new EventEmitter<SortDirection>();
  
  get isSorted(): boolean {
    return this.sortDirection !== null;
  }
  
  get isSortedAsc(): boolean {
    return this.sortDirection === 'asc';
  }
  
  get isSortedDesc(): boolean {
    return this.sortDirection === 'desc';
  }
  
  onSortClick(event: MouseEvent): void {
    if (this.disabled) {
      return;
    }
    
    event.stopPropagation();
    
    // Cycle through sort directions: null -> asc -> desc -> null
    let newDirection: SortDirection;
    
    if (this.sortDirection === null) {
      newDirection = 'asc';
    } else if (this.sortDirection === 'asc') {
      newDirection = 'desc';
    } else {
      newDirection = null;
    }
    
    this.sortChange.emit(newDirection);
  }
} 