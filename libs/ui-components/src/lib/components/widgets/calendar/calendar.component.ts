import { Component, Input, Output, EventEmitter, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../action/button/button.component';

export type CalendarView = 'day' | 'week' | 'month' | 'work-week' | 'agenda';

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  color?: string;
  description?: string;
  location?: string;
  editable?: boolean;
  draggable?: boolean;
  status?: 'confirmed' | 'tentative' | 'cancelled';
  [key: string]: any; // For custom properties
}

export interface CalendarDateRange {
  start: Date;
  end: Date;
}

@Component({
  selector: 'sv-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {
  @Input() events: CalendarEvent[] = [];
  @Input() view: CalendarView = 'week';
  @Input() currentDate: Date = new Date();
  @Input() firstDayOfWeek: number = 0; // 0 = Sunday, 1 = Monday, etc.
  @Input() workWeekDays: number[] = [1, 2, 3, 4, 5]; // Monday to Friday
  @Input() minTime: string = '00:00';
  @Input() maxTime: string = '23:59';
  @Input() timeSlotDuration: number = 30; // minutes
  @Input() eventTemplate?: TemplateRef<any>;
  @Input() dayHeaderTemplate?: TemplateRef<any>;
  @Input() allDaySlotTemplate?: TemplateRef<any>;
  @Input() hideWeekends: boolean = false;
  @Input() showCurrentTimeIndicator: boolean = true;
  @Input() readonly: boolean = false;
  @Input() startHour: number = 9; // Default start hour for visible time window
  @Input() endHour: number = 17; // Default end hour for visible time window

  @Output() dateRangeChanged = new EventEmitter<CalendarDateRange>();
  @Output() viewChanged = new EventEmitter<CalendarView>();
  @Output() eventClicked = new EventEmitter<CalendarEvent>();
  @Output() eventAdded = new EventEmitter<CalendarEvent>();
  @Output() eventUpdated = new EventEmitter<CalendarEvent>();
  @Output() eventDeleted = new EventEmitter<string>();
  @Output() slotSelected = new EventEmitter<{start: Date, end: Date}>();

  displayedDates: Date[] = [];
  timeSlots: string[] = [];
  visibleEvents: CalendarEvent[] = [];
  dateFormat: Intl.DateTimeFormat;
  timeFormat: Intl.DateTimeFormat;
  dateRangeText: string = '';
  showEventModal: boolean = false;
  selectedEvent: CalendarEvent | null = null;
  newEventStart: Date | null = null;
  newEventEnd: Date | null = null;
  selectedColor: string = '#3788d8'; // Default color for new events

  constructor() {
    this.dateFormat = new Intl.DateTimeFormat('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
    
    this.timeFormat = new Intl.DateTimeFormat('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
  }

  ngOnInit(): void {
    this.generateTimeSlots();
    this.refreshView();
  }

  generateTimeSlots(): void {
    this.timeSlots = [];
    const [startHours, startMinutes] = this.minTime.split(':').map(Number);
    const [endHours, endMinutes] = this.maxTime.split(':').map(Number);

    const start = new Date();
    start.setHours(startHours, startMinutes, 0, 0);

    const end = new Date();
    end.setHours(endHours, endMinutes, 0, 0);

    let current = new Date(start);
    while (current <= end) {
      this.timeSlots.push(this.timeFormat.format(current));
      current.setMinutes(current.getMinutes() + this.timeSlotDuration);
    }
  }

  refreshView(): void {
    this.generateDateRange();
    this.filterEvents();
    this.updateDateRangeText();
  }

  generateDateRange(): void {
    this.displayedDates = [];
    const date = new Date(this.currentDate);
    
    switch (this.view) {
      case 'day':
        this.displayedDates = [new Date(date)];
        break;
      case 'week':
        this.displayedDates = this.getWeekDays(date);
        break;
      case 'work-week':
        this.displayedDates = this.getWeekDays(date).filter(
          (_, index) => this.workWeekDays.includes((index + this.firstDayOfWeek) % 7)
        );
        break;
      case 'month':
        this.displayedDates = this.getMonthDays(date);
        break;
      case 'agenda':
        // In agenda view, we'll show a fixed range (e.g., 2 weeks)
        const start = new Date(date);
        const end = new Date(date);
        end.setDate(end.getDate() + 14);
        
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          this.displayedDates.push(new Date(d));
        }
        break;
    }

    this.dateRangeChanged.emit({
      start: this.displayedDates[0],
      end: this.displayedDates[this.displayedDates.length - 1]
    });
  }

  getWeekDays(date: Date): Date[] {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : this.firstDayOfWeek); // Adjust when day is Sunday
    const sunday = new Date(date.setDate(diff));
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(sunday);
      day.setDate(day.getDate() + i);
      weekDays.push(day);
    }
    
    return weekDays;
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

  filterEvents(): void {
    if (!this.events || !this.displayedDates.length) {
      this.visibleEvents = [];
      return;
    }

    const firstDay = new Date(this.displayedDates[0]);
    firstDay.setHours(0, 0, 0, 0);
    
    const lastDay = new Date(this.displayedDates[this.displayedDates.length - 1]);
    lastDay.setHours(23, 59, 59, 999);

    this.visibleEvents = this.events.filter(event => {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);
      
      return eventEnd >= firstDay && eventStart <= lastDay;
    });
  }

  updateDateRangeText(): void {
    if (!this.displayedDates.length) {
      this.dateRangeText = '';
      return;
    }

    const firstDate = this.displayedDates[0];
    const lastDate = this.displayedDates[this.displayedDates.length - 1];
    
    const firstMonth = firstDate.toLocaleString('default', { month: 'short' });
    const lastMonth = lastDate.toLocaleString('default', { month: 'short' });
    
    if (firstDate.getMonth() === lastDate.getMonth() && firstDate.getFullYear() === lastDate.getFullYear()) {
      // Same month
      this.dateRangeText = `${firstMonth} ${firstDate.getDate()} - ${lastDate.getDate()}, ${lastDate.getFullYear()}`;
    } else if (firstDate.getFullYear() === lastDate.getFullYear()) {
      // Different month, same year
      this.dateRangeText = `${firstMonth} ${firstDate.getDate()} - ${lastMonth} ${lastDate.getDate()}, ${lastDate.getFullYear()}`;
    } else {
      // Different month and year
      this.dateRangeText = `${firstMonth} ${firstDate.getDate()}, ${firstDate.getFullYear()} - ${lastMonth} ${lastDate.getDate()}, ${lastDate.getFullYear()}`;
    }
  }

  changeView(view: CalendarView): void {
    this.view = view;
    this.viewChanged.emit(view);
    this.refreshView();
  }

  navigate(direction: 'prev' | 'next' | 'today'): void {
    const date = new Date(this.currentDate);
    
    if (direction === 'today') {
      this.currentDate = new Date();
    } else {
      switch (this.view) {
        case 'day':
          date.setDate(date.getDate() + (direction === 'next' ? 1 : -1));
          break;
        case 'week':
        case 'work-week':
          date.setDate(date.getDate() + (direction === 'next' ? 7 : -7));
          break;
        case 'month':
          date.setMonth(date.getMonth() + (direction === 'next' ? 1 : -1));
          break;
        case 'agenda':
          date.setDate(date.getDate() + (direction === 'next' ? 14 : -14));
          break;
      }
      this.currentDate = date;
    }
    
    this.refreshView();
  }

  onEventClick(event: CalendarEvent): void {
    if (this.readonly) {
      this.eventClicked.emit(event);
      return;
    }
    
    this.selectedEvent = { ...event };
    this.selectedColor = event.color || '#3788d8';
    this.showEventModal = true;
  }

  onTimeSlotClick(date: Date, timeSlot: string): void {
    if (this.readonly) return;
    
    const [time, period] = timeSlot.split(' ');
    const [hourStr, minuteStr] = time.split(':');
    let hours = parseInt(hourStr, 10);
    const minutes = minuteStr ? parseInt(minuteStr, 10) : 0;
    
    // Convert to 24-hour format if PM
    if (period === 'PM' && hours < 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }
    
    const start = new Date(date);
    start.setHours(hours, minutes, 0, 0);
    
    const end = new Date(start);
    end.setMinutes(end.getMinutes() + this.timeSlotDuration);
    
    this.newEventStart = start;
    this.newEventEnd = end;
    this.selectedEvent = null;
    this.selectedColor = '#3788d8'; // Reset color to default
    this.showEventModal = true;
    
    this.slotSelected.emit({ start, end });
  }

  closeEventModal(): void {
    this.showEventModal = false;
    this.selectedEvent = null;
    this.newEventStart = null;
    this.newEventEnd = null;
  }

  saveEvent(eventData: any): void {
    if (this.selectedEvent) {
      // Updating existing event
      const updatedEvent = { ...this.selectedEvent, ...eventData };
      this.eventUpdated.emit(updatedEvent);
    } else {
      // Creating new event
      const newEvent: CalendarEvent = {
        id: this.generateEventId(),
        title: eventData.title,
        start: eventData.start || this.newEventStart!,
        end: eventData.end || this.newEventEnd!,
        ...eventData
      };
      this.eventAdded.emit(newEvent);
    }
    
    this.closeEventModal();
  }

  deleteEvent(): void {
    if (this.selectedEvent) {
      this.eventDeleted.emit(this.selectedEvent.id);
    }
    this.closeEventModal();
  }

  getDateFromInputs(dateStr: string, timeStr: string): Date {
    if (!dateStr || !timeStr) {
      return new Date();
    }
    
    try {
      return new Date(`${dateStr}T${timeStr}`);
    } catch (error) {
      console.error('Invalid date or time format', error);
      return new Date();
    }
  }

  private generateEventId(): string {
    return Date.now().toString() + Math.random().toString(36).substring(2, 9);
  }

  getEventPosition(event: CalendarEvent, day: Date): { top: string, height: string, left: string, width: string } | null {
    if (this.view === 'month' || this.view === 'agenda') {
      return null; // Different positioning for month/agenda views
    }
    
    const eventStart = new Date(event.start);
    const eventEnd = new Date(event.end);
    
    // Check if event is on this day
    const startOfDay = new Date(day);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(day);
    endOfDay.setHours(23, 59, 59, 999);
    
    if (eventEnd < startOfDay || eventStart > endOfDay) {
      return null;
    }
    
    // Clamp event times to the day's boundaries
    const effectiveStart = eventStart < startOfDay ? startOfDay : eventStart;
    const effectiveEnd = eventEnd > endOfDay ? endOfDay : eventEnd;
    
    // Calculate % from top of day
    const dayDuration = 24 * 60; // minutes in a day
    const startMinutes = effectiveStart.getHours() * 60 + effectiveStart.getMinutes();
    const endMinutes = effectiveEnd.getHours() * 60 + effectiveEnd.getMinutes();
    const durationMinutes = endMinutes - startMinutes;
    
    const topPercentage = (startMinutes / dayDuration) * 100;
    const heightPercentage = (durationMinutes / dayDuration) * 100;
    
    // For week view, calculate horizontal position
    const columnCount = this.displayedDates.length;
    const columnWidth = 100 / columnCount;
    const columnIndex = this.displayedDates.findIndex(d => 
      d.getDate() === day.getDate() && 
      d.getMonth() === day.getMonth() && 
      d.getFullYear() === day.getFullYear()
    );
    
    return {
      top: `${topPercentage}%`,
      height: `${heightPercentage}%`,
      left: `${columnIndex * columnWidth}%`,
      width: `${columnWidth}%`
    };
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
    return date.getMonth() === this.currentDate.getMonth() && 
           date.getFullYear() === this.currentDate.getFullYear();
  }

  getEventsForDay(date: Date): CalendarEvent[] {
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);
    
    return this.visibleEvents.filter(event => {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);
      return eventEnd >= dayStart && eventStart <= dayEnd;
    });
  }

  getAllDayEvents(date: Date): CalendarEvent[] {
    return this.getEventsForDay(date).filter(event => event.allDay);
  }

  getTimeSlotLabel(slot: string): string {
    return slot;
  }

  getCurrentTimePosition(): string {
    const now = new Date();
    const minutes = now.getHours() * 60 + now.getMinutes();
    const dayMinutes = 24 * 60;
    return `${(minutes / dayMinutes) * 100}%`;
  }
} 