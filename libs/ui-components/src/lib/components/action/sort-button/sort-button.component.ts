import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export type SortDirection = 'asc' | 'desc';

@Component({
  selector: 'sv-sort-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sort-button.component.html',
  styleUrl: './sort-button.component.scss'
})
export class SortButtonComponent {
  @Input() sortDirection: SortDirection = 'asc';
  @Input() disabled: boolean = false;
  
  @Output() sortChange = new EventEmitter<SortDirection>();
  
  // SVG templates for the different sort states
  ascIcon: SafeHtml;
  descIcon: SafeHtml;
  
  constructor(private sanitizer: DomSanitizer) {
    this.ascIcon = this.sanitizer.bypassSecurityTrustHtml(`
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 12.5V3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M3.5 8L8 3.5L12.5 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `);
    
    this.descIcon = this.sanitizer.bypassSecurityTrustHtml(`
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 3.5V12.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12.5 8L8 12.5L3.5 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `);
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
    
    // Toggle between asc and desc
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortChange.emit(this.sortDirection);
  }
} 