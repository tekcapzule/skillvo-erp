import { Component, Input, Output, EventEmitter, OnInit, HostBinding, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarComponent } from '../calendar/calendar.component';

export interface DateRange {
  from: Date | null;
  to: Date | null;
}

@Component({
  selector: 'sv-date-range',
  standalone: true,
  imports: [CommonModule, FormsModule, CalendarComponent],
  templateUrl: './date-range.component.html',
  styleUrl: './date-range.component.scss'
})
export class DateRangeComponent implements OnInit {
  /**
   * Label for the date range selector
   */
  @Input() label = 'Date Range';
  
  /**
   * Initial date range value
   */
  @Input() value: DateRange = { from: null, to: null };
  
  /**
   * Placeholder text for from date
   */
  @Input() fromPlaceholder = 'mm/dd/yyyy';
  
  /**
   * Placeholder text for to date
   */
  @Input() toPlaceholder = 'mm/dd/yyyy';
  
  /**
   * Date format to display
   */
  @Input() dateFormat = 'MM/dd/yyyy';
  
  /**
   * Whether the date range picker is disabled
   */
  @Input() disabled = false;
  
  /**
   * Theme of the date range picker
   */
  @Input() theme: 'light' | 'dark' = 'light';
  
  /**
   * Custom class to apply to the component
   */
  @Input() customClass = '';
  
  /**
   * Event emitted when the date range changes
   */
  @Output() valueChange = new EventEmitter<DateRange>();
  
  /**
   * Whether the from calendar is open
   */
  isFromCalendarOpen = false;
  
  /**
   * Whether the to calendar is open
   */
  isToCalendarOpen = false;
  
  /**
   * Date string for from input
   */
  fromDateStr = '';
  
  /**
   * Date string for to input
   */
  toDateStr = '';
  
  /**
   * Current date reference for calendar initialization
   */
  private today = new Date();
  
  constructor() {}
  
  @HostBinding('class.theme-dark')
  get isDarkTheme(): boolean {
    return this.theme === 'dark';
  }
  
  /**
   * Listen for clicks on the document to close the calendar popups
   */
  @HostListener('document:click')
  onDocumentClick(): void {
    this.closePopups();
  }
  
  ngOnInit(): void {
    this.updateDisplayStrings();
  }
  
  /**
   * Toggle the from date calendar
   */
  toggleFromCalendar(event?: Event): void {
    if (this.disabled) return;
    
    if (event) {
      event.stopPropagation();
    }
    
    this.isFromCalendarOpen = !this.isFromCalendarOpen;
    if (this.isFromCalendarOpen) {
      this.isToCalendarOpen = false;
    }
  }
  
  /**
   * Toggle the to date calendar
   */
  toggleToCalendar(event?: Event): void {
    if (this.disabled) return;
    
    if (event) {
      event.stopPropagation();
    }
    
    this.isToCalendarOpen = !this.isToCalendarOpen;
    if (this.isToCalendarOpen) {
      this.isFromCalendarOpen = false;
    }
  }
  
  /**
   * Update display strings based on date values
   */
  updateDisplayStrings(): void {
    this.fromDateStr = this.value.from ? this.formatDate(this.value.from) : '';
    this.toDateStr = this.value.to ? this.formatDate(this.value.to) : '';
  }
  
  /**
   * Format a date according to the dateFormat input
   */
  formatDate(date: Date): string {
    if (!date) return '';
    
    // Simple implementation - in production use a date library like date-fns
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${month}/${day}/${year}`;
  }
  
  /**
   * Parse a date string to Date object
   */
  parseDate(dateStr: string): Date | null {
    if (!dateStr) return null;
    
    // Simple implementation - in production use a date library
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const month = parseInt(parts[0], 10) - 1;
      const day = parseInt(parts[1], 10);
      const year = parseInt(parts[2], 10);
      
      if (!isNaN(month) && !isNaN(day) && !isNaN(year)) {
        return new Date(year, month, day);
      }
    }
    
    return null;
  }
  
  /**
   * Handle date selection from the from calendar
   */
  onFromDateSelect(date: Date): void {
    this.value = { ...this.value, from: date };
    this.fromDateStr = this.formatDate(date);
    this.isFromCalendarOpen = false;
    this.valueChange.emit(this.value);
  }
  
  /**
   * Handle date selection from the to calendar
   */
  onToDateSelect(date: Date): void {
    this.value = { ...this.value, to: date };
    this.toDateStr = this.formatDate(date);
    this.isToCalendarOpen = false;
    this.valueChange.emit(this.value);
  }
  
  /**
   * Handle from date input change
   */
  onFromInputChange(): void {
    const date = this.parseDate(this.fromDateStr);
    this.value = { ...this.value, from: date };
    this.valueChange.emit(this.value);
  }
  
  /**
   * Handle to date input change
   */
  onToInputChange(): void {
    const date = this.parseDate(this.toDateStr);
    this.value = { ...this.value, to: date };
    this.valueChange.emit(this.value);
  }
  
  /**
   * Check if a date is valid
   */
  isValidDate(date: Date | null): boolean {
    return date !== null && !isNaN(date.getTime());
  }
  
  /**
   * Close popups when clicking outside
   */
  closePopups(): void {
    this.isFromCalendarOpen = false;
    this.isToCalendarOpen = false;
  }
  
  /**
   * Get the current date for the 'from' calendar
   * Avoids using 'new Date()' in the template
   */
  getFromCalendarDate(): Date {
    return this.value.from || this.today;
  }
  
  /**
   * Get the current date for the 'to' calendar
   * Avoids using 'new Date()' in the template
   */
  getToCalendarDate(): Date {
    return this.value.to || this.value.from || this.today;
  }
  
  /**
   * Set the date to today for From field
   */
  setFromToToday(event: Event): void {
    event.stopPropagation();
    const today = new Date();
    this.onFromDateSelect(today);
  }
  
  /**
   * Set the date to today for To field
   */
  setToToToday(event: Event): void {
    event.stopPropagation();
    const today = new Date();
    this.onToDateSelect(today);
  }
} 