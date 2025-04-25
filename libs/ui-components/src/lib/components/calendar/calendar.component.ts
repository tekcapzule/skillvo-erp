import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CalendarDateRange {
  start: Date;
  end: Date;
}

@Component({
  selector: 'sv-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit, OnChanges {
  @Input() currentDate: Date = new Date();
  @Input() firstDayOfWeek: number = 0; // 0 = Sunday, 1 = Monday, etc.
  @Input() readonly: boolean = false;

  @Output() slotSelected = new EventEmitter<{start: Date, end: Date}>();
  
  displayedDates: Date[] = [];
  weekDays: string[] = [];
  currentMonthYear: string = '';

  constructor() {
    this.generateWeekDays();
  }

  ngOnInit(): void {
    this.refreshView();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentDate']) {
      this.refreshView();
    }
  }

  refreshView(): void {
    this.generateDateRange();
    this.updateMonthYearText();
  }

  generateWeekDays(): void {
    // Short weekday names
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.weekDays = Array(7).fill(0).map((_, i) => 
      weekdays[(i + this.firstDayOfWeek) % 7]
    );
  }

  generateDateRange(): void {
    this.displayedDates = this.getMonthDays(new Date(this.currentDate));
  }

  getMonthDays(date: Date): Date[] {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Get the first day of the week that contains the first day of the month
    const firstDayOfCalendar = new Date(firstDay);
    const dayOffset = (firstDay.getDay() - this.firstDayOfWeek + 7) % 7;
    firstDayOfCalendar.setDate(firstDayOfCalendar.getDate() - dayOffset);
    
    // Get the last day of the week that contains the last day of the month
    const lastDayOfCalendar = new Date(lastDay);
    const daysToAdd = 6 - ((lastDay.getDay() - this.firstDayOfWeek + 7) % 7);
    lastDayOfCalendar.setDate(lastDayOfCalendar.getDate() + daysToAdd);
    
    // Generate all days in the calendar
    const days: Date[] = [];
    for (let d = new Date(firstDayOfCalendar); d <= lastDayOfCalendar; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
    }
    
    return days;
  }

  updateMonthYearText(): void {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const month = monthNames[this.currentDate.getMonth()];
    const year = this.currentDate.getFullYear();
    
    this.currentMonthYear = `${month} ${year}`;
  }

  navigate(direction: 'prev' | 'next' | 'today'): void {
    const date = new Date(this.currentDate);
    
    if (direction === 'today') {
      this.currentDate = new Date();
    } else if (direction === 'prev') {
      date.setMonth(date.getMonth() - 1);
      this.currentDate = date;
    } else if (direction === 'next') {
      date.setMonth(date.getMonth() + 1);
      this.currentDate = date;
    }
    
    this.refreshView();
  }

  selectDate(date: Date): void {
    if (this.readonly) return;
    
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    
    this.slotSelected.emit({ start, end });
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  }

  isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday or Saturday
  }

  isInCurrentMonth(date: Date): boolean {
    return date.getMonth() === this.currentDate.getMonth();
  }
} 