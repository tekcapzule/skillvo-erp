import { Component, Input, Output, EventEmitter, OnInit, HostBinding, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarComponent } from '../../widgets/calendar/calendar.component';

@Component({
  selector: 'sv-date-picker',
  standalone: true,
  imports: [CommonModule, FormsModule, CalendarComponent],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss'
})
export class DatePickerComponent implements OnInit {
  /**
   * Label for the date picker
   */
  @Input() label = '';
  
  /**
   * Initial date value
   */
  @Input() value: Date | null = null;
  
  /**
   * Placeholder text for date input
   */
  @Input() placeholder = 'dd/mm/yyyy';
  
  /**
   * Date format to display
   */
  @Input() dateFormat = 'dd/MM/yyyy';
  
  /**
   * Whether the date picker is disabled
   */
  @Input() disabled = false;
  
  /**
   * Theme of the date picker
   */
  @Input() theme: 'light' | 'dark' = 'light';
  
  /**
   * Custom class to apply to the component
   */
  @Input() customClass = '';
  
  /**
   * Event emitted when the date changes
   */
  @Output() valueChange = new EventEmitter<Date | null>();
  
  /**
   * Whether the calendar is open
   */
  isCalendarOpen = false;
  
  /**
   * Date string for input
   */
  dateStr = '';
  
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
   * Listen for clicks on the document to close the calendar popup
   */
  @HostListener('document:click')
  onDocumentClick(): void {
    this.closeCalendar();
  }
  
  ngOnInit(): void {
    this.updateDisplayString();
  }
  
  /**
   * Toggle the calendar
   */
  toggleCalendar(event?: Event): void {
    if (this.disabled) return;
    
    if (event) {
      event.stopPropagation();
    }
    
    this.isCalendarOpen = !this.isCalendarOpen;
  }
  
  /**
   * Update display string based on date value
   */
  updateDisplayString(): void {
    this.dateStr = this.value ? this.formatDate(this.value) : '';
  }
  
  /**
   * Format a date according to the dateFormat input
   */
  formatDate(date: Date): string {
    if (!date) return '';
    
    // Simple implementation - in production use a date library like date-fns
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  }
  
  /**
   * Parse a date string to Date object
   */
  parseDate(dateStr: string): Date | null {
    if (!dateStr) return null;
    
    // Simple implementation - in production use a date library
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      
      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        return new Date(year, month, day);
      }
    }
    
    return null;
  }
  
  /**
   * Handle date selection from the calendar
   */
  onDateSelect(date: Date): void {
    this.value = date;
    this.dateStr = this.formatDate(date);
    this.isCalendarOpen = false;
    this.valueChange.emit(this.value);
  }
  
  /**
   * Handle date input change
   */
  onInputChange(): void {
    const date = this.parseDate(this.dateStr);
    this.value = date;
    this.valueChange.emit(this.value);
  }
  
  /**
   * Check if a date is valid
   */
  isValidDate(date: Date | null): boolean {
    return date !== null && !isNaN(date.getTime());
  }
  
  /**
   * Close popup when clicking outside
   */
  closeCalendar(): void {
    this.isCalendarOpen = false;
  }
  
  /**
   * Get the current date for the calendar
   * Avoids using 'new Date()' in the template
   */
  getCalendarDate(): Date {
    return this.value || this.today;
  }
  
  /**
   * Set the date to today
   */
  setToToday(event: Event): void {
    event.stopPropagation();
    const today = new Date();
    this.onDateSelect(today);
  }
} 