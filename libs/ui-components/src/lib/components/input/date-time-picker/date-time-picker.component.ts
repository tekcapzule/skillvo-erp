import { Component, Input, Output, EventEmitter, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { BaseInputComponent } from '../base-input/base-input.component';
import { CommonModule } from '@angular/common';

interface DateTimeModel {
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
  seconds?: number;
}

@Component({
  selector: 'sv-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class DateTimePickerComponent extends BaseInputComponent implements OnInit {
  @Input() mode: 'date' | 'time' | 'datetime' = 'date';
  @Input() format: string = ''; // default format based on mode will be used if empty
  @Input() min: Date | string = '';
  @Input() max: Date | string = '';
  @Input() showSeconds: boolean = false;
  @Input() use24HourFormat: boolean = true;
  @Input() firstDayOfWeek: 0 | 1 = 1; // 0 = Sunday, 1 = Monday
  @Input() disabledDates: Date[] = [];
  @Input() enabledDates: Date[] = [];
  @Input() disableWeekends: boolean = false;
  @Input() showTodayButton: boolean = true;
  @Input() showClearButton: boolean = true;
  @Input() isRange: boolean = false;
  @Input() rangeFrom: Date | null = null;
  @Input() rangeTo: Date | null = null;
  @Input() override placeholder: string = '';
  
  @Output() dateChange = new EventEmitter<Date | null>();
  @Output() rangeChange = new EventEmitter<{from: Date | null, to: Date | null}>();
  
  @ViewChild('pickerContainer') pickerContainer!: ElementRef;
  
  isOpen: boolean = false;
  currentDate: Date = new Date();
  selectedDate: Date | null = null;
  hoveredDate: Date | null = null;
  
  currentView: 'days' | 'months' | 'years' | 'time' = 'days';
  
  calendarDays: {date: Date, isCurrentMonth: boolean, isToday: boolean, isSelected: boolean, 
    isDisabled: boolean, isInRange?: boolean, isRangeStart?: boolean, isRangeEnd?: boolean}[] = [];
  
  yearsList: number[] = [];
  monthsList: {value: number, name: string}[] = [];
  
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  period: 'AM' | 'PM' = 'AM';
  
  private dateModel: DateTimeModel = {
    year: 0,
    month: 0,
    day: 1,
    hours: 0,
    minutes: 0,
    seconds: 0
  };
  
  weekDays: string[] = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  
  constructor(private elementRef: ElementRef) {
    super();
    this.initializeMonthsList();
    this.generateYearsList();
  }
  
  ngOnInit(): void {
    this.initializeComponent();
  }
  
  private initializeComponent(): void {
    // Set placeholder based on mode if not provided
    if (!this.placeholder) {
      switch (this.mode) {
        case 'date':
          this.placeholder = 'Select date';
          break;
        case 'time':
          this.placeholder = 'Select time';
          break;
        case 'datetime':
          this.placeholder = 'Select date and time';
          break;
      }
    }
    
    // Initialize with current value if exists
    if (this.value) {
      if (typeof this.value === 'string') {
        this.selectedDate = new Date(this.value);
      } else if (this.value instanceof Date) {
        this.selectedDate = new Date(this.value);
      }
      
      if (this.selectedDate && !isNaN(this.selectedDate.getTime())) {
        this.currentDate = new Date(this.selectedDate);
        this.updateDateModel(this.selectedDate);
      } else {
        this.selectedDate = null;
      }
    }
    
    // Generate initial calendar
    this.generateCalendar();
  }
  
  private initializeMonthsList(): void {
    this.monthsList = [
      { value: 0, name: 'January' },
      { value: 1, name: 'February' },
      { value: 2, name: 'March' },
      { value: 3, name: 'April' },
      { value: 4, name: 'May' },
      { value: 5, name: 'June' },
      { value: 6, name: 'July' },
      { value: 7, name: 'August' },
      { value: 8, name: 'September' },
      { value: 9, name: 'October' },
      { value: 10, name: 'November' },
      { value: 11, name: 'December' }
    ];
  }
  
  private generateYearsList(): void {
    const currentYear = new Date().getFullYear();
    this.yearsList = [];
    for (let year = currentYear - 100; year <= currentYear + 10; year++) {
      this.yearsList.push(year);
    }
  }
  
  private updateDateModel(date: Date): void {
    this.dateModel = {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds()
    };
    
    this.hours = this.use24HourFormat ? this.dateModel.hours : this.dateModel.hours % 12 || 12;
    this.minutes = this.dateModel.minutes;
    this.seconds = this.dateModel.seconds || 0;
    this.period = this.dateModel.hours >= 12 ? 'PM' : 'AM';
  }
  
  generateCalendar(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    // First day of current month
    const firstDay = new Date(year, month, 1);
    
    // Last day of current month
    const lastDay = new Date(year, month + 1, 0);
    
    // Adjust for first day of week (0 = Sunday, 1 = Monday)
    let firstDayOfGrid = new Date(firstDay);
    const dayOfWeek = firstDay.getDay();
    const startOffset = (dayOfWeek - this.firstDayOfWeek + 7) % 7;
    firstDayOfGrid.setDate(firstDayOfGrid.getDate() - startOffset);
    
    this.calendarDays = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Generate a 6-week calendar (42 days)
    for (let i = 0; i < 42; i++) {
      const currentDay = new Date(firstDayOfGrid);
      currentDay.setDate(firstDayOfGrid.getDate() + i);
      
      const isCurrentMonth = currentDay.getMonth() === month;
      const isToday = currentDay.getTime() === today.getTime();
      
      let isSelected = false;
      if (this.selectedDate) {
        const selectedDateCopy = new Date(this.selectedDate);
        selectedDateCopy.setHours(0, 0, 0, 0);
        isSelected = currentDay.getTime() === selectedDateCopy.getTime();
      }
      
      // Check if date is disabled
      const isDisabled = this.isDateDisabled(currentDay);
      
      // Range selection logic
      let isInRange = false;
      let isRangeStart = false;
      let isRangeEnd = false;
      
      if (this.isRange && this.rangeFrom && this.rangeTo) {
        const rangeFromDate = new Date(this.rangeFrom);
        rangeFromDate.setHours(0, 0, 0, 0);
        const rangeToDate = new Date(this.rangeTo);
        rangeToDate.setHours(0, 0, 0, 0);
        
        isRangeStart = currentDay.getTime() === rangeFromDate.getTime();
        isRangeEnd = currentDay.getTime() === rangeToDate.getTime();
        isInRange = currentDay.getTime() > rangeFromDate.getTime() && 
                    currentDay.getTime() < rangeToDate.getTime();
      }
      
      this.calendarDays.push({
        date: currentDay,
        isCurrentMonth,
        isToday,
        isSelected,
        isDisabled,
        isInRange,
        isRangeStart,
        isRangeEnd
      });
    }
    
    // Reorder weekdays if firstDayOfWeek is Monday
    if (this.firstDayOfWeek === 1) {
      this.weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    } else {
      this.weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    }
  }
  
  private isDateDisabled(date: Date): boolean {
    // Check min/max dates
    if (this.min) {
      const minDate = typeof this.min === 'string' ? new Date(this.min) : this.min;
      if (date < minDate) return true;
    }
    
    if (this.max) {
      const maxDate = typeof this.max === 'string' ? new Date(this.max) : this.max;
      if (date > maxDate) return true;
    }
    
    // Check weekend
    if (this.disableWeekends && (date.getDay() === 0 || date.getDay() === 6)) {
      return true;
    }
    
    // Check disabled dates
    if (this.disabledDates.length > 0) {
      return this.disabledDates.some(disabledDate => {
        const compareDate = new Date(disabledDate);
        compareDate.setHours(0, 0, 0, 0);
        return date.getTime() === compareDate.getTime();
      });
    }
    
    // Check enabled dates
    if (this.enabledDates.length > 0) {
      return !this.enabledDates.some(enabledDate => {
        const compareDate = new Date(enabledDate);
        compareDate.setHours(0, 0, 0, 0);
        return date.getTime() === compareDate.getTime();
      });
    }
    
    return false;
  }
  
  togglePicker(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      // Restore currentView based on mode
      this.currentView = this.mode === 'time' ? 'time' : 'days';
      
      // Reset current date if no date is selected
      if (!this.selectedDate) {
        this.currentDate = new Date();
        this.updateDateModel(this.currentDate);
      }
      
      this.generateCalendar();
    }
  }
  
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    if (this.isOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
  
  // Calendar navigation methods
  prevMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendar();
  }
  
  nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendar();
  }
  
  goToToday(): void {
    this.currentDate = new Date();
    this.generateCalendar();
  }
  
  // View changing methods
  showMonthView(): void {
    this.currentView = 'months';
  }
  
  showYearView(): void {
    this.currentView = 'years';
  }
  
  showDayView(): void {
    this.currentView = 'days';
  }
  
  showTimeView(): void {
    this.currentView = 'time';
  }
  
  // Selection methods
  selectDay(day: {date: Date, isDisabled: boolean}): void {
    if (day.isDisabled) {
      return;
    }
    
    if (this.isRange) {
      this.handleRangeSelection(day.date);
    } else {
      this.handleSingleDateSelection(day.date);
    }
  }
  
  private handleSingleDateSelection(date: Date): void {
    // Maintain time when selecting a new date
    let hours = 0, minutes = 0, seconds = 0;
    
    if (this.selectedDate) {
      hours = this.selectedDate.getHours();
      minutes = this.selectedDate.getMinutes();
      seconds = this.selectedDate.getSeconds();
    } else if (this.mode === 'time' || this.mode === 'datetime') {
      // Use the current time if no date is selected
      const now = new Date();
      hours = now.getHours();
      minutes = now.getMinutes();
      seconds = now.getSeconds();
    }
    
    this.selectedDate = new Date(date);
    this.selectedDate.setHours(hours, minutes, seconds);
    
    this.updateDateModel(this.selectedDate);
    this.generateCalendar();
    
    if (this.mode === 'date') {
      this.updateValue();
    } else if (this.mode === 'datetime') {
      this.showTimeView();
    }
  }
  
  private handleRangeSelection(date: Date): void {
    if (!this.rangeFrom || (this.rangeFrom && this.rangeTo)) {
      // Start a new range
      this.rangeFrom = new Date(date);
      this.rangeFrom.setHours(0, 0, 0, 0);
      this.rangeTo = null;
    } else {
      // Complete the range
      const selectedDate = new Date(date);
      selectedDate.setHours(23, 59, 59, 999);
      
      if (selectedDate < this.rangeFrom) {
        this.rangeTo = this.rangeFrom;
        this.rangeFrom = selectedDate;
      } else {
        this.rangeTo = selectedDate;
      }
      
      this.emitRangeChange();
    }
    
    this.generateCalendar();
  }
  
  hoverDay(day: {date: Date}): void {
    if (this.isRange && this.rangeFrom && !this.rangeTo) {
      this.hoveredDate = day.date;
      this.generateCalendar();
    }
  }
  
  selectMonth(monthIndex: number): void {
    this.currentDate.setMonth(monthIndex);
    this.currentView = 'days';
    this.generateCalendar();
  }
  
  selectYear(year: number): void {
    this.currentDate.setFullYear(year);
    this.currentView = 'months';
    this.generateCalendar();
  }
  
  // Time selection methods
  incrementHours(): void {
    if (this.use24HourFormat) {
      this.hours = (this.hours + 1) % 24;
    } else {
      this.hours = (this.hours % 12) + 1;
    }
    this.updateTimeValue();
  }
  
  decrementHours(): void {
    if (this.use24HourFormat) {
      this.hours = (this.hours + 23) % 24;
    } else {
      this.hours = ((this.hours + 10) % 12) + 1;
    }
    this.updateTimeValue();
  }
  
  incrementMinutes(): void {
    this.minutes = (this.minutes + 1) % 60;
    this.updateTimeValue();
  }
  
  decrementMinutes(): void {
    this.minutes = (this.minutes + 59) % 60;
    this.updateTimeValue();
  }
  
  incrementSeconds(): void {
    this.seconds = (this.seconds + 1) % 60;
    this.updateTimeValue();
  }
  
  decrementSeconds(): void {
    this.seconds = (this.seconds + 59) % 60;
    this.updateTimeValue();
  }
  
  togglePeriod(): void {
    this.period = this.period === 'AM' ? 'PM' : 'AM';
    this.updateTimeValue();
  }
  
  updateTimeValue(): void {
    if (!this.selectedDate) {
      this.selectedDate = new Date();
    }
    
    let hours = this.hours;
    if (!this.use24HourFormat) {
      if (this.period === 'PM' && hours < 12) {
        hours += 12;
      } else if (this.period === 'AM' && hours === 12) {
        hours = 0;
      }
    }
    
    this.selectedDate.setHours(hours, this.minutes, this.showSeconds ? this.seconds : 0);
    this.updateValue();
  }
  
  // Clear and apply actions
  clearSelection(): void {
    this.selectedDate = null;
    this.rangeFrom = null;
    this.rangeTo = null;
    this.hoveredDate = null;
    
    this.updateValue();
    this.emitRangeChange();
    
    this.isOpen = false;
  }
  
  applySelection(): void {
    if (this.mode !== 'date' || this.isRange) {
      this.updateValue();
    }
    
    this.isOpen = false;
  }
  
  private updateValue(): void {
    if (!this.isRange) {
      this.value = this.selectedDate;
      this.onChange(this.value);
      this.dateChange.emit(this.selectedDate);
    }
  }
  
  private emitRangeChange(): void {
    if (this.isRange) {
      this.value = {
        from: this.rangeFrom,
        to: this.rangeTo
      };
      this.onChange(this.value);
      this.rangeChange.emit({
        from: this.rangeFrom,
        to: this.rangeTo
      });
    }
  }
  
  // Format display value
  formatDisplayValue(): string {
    if (this.isRange) {
      return this.formatRangeDisplayValue();
    }
    
    if (!this.selectedDate) {
      return this.placeholder;
    }
    
    // Format based on mode
    switch (this.mode) {
      case 'date':
        return this.formatDate(this.selectedDate);
      case 'time':
        return this.formatTime(this.selectedDate);
      case 'datetime':
        return `${this.formatDate(this.selectedDate)} ${this.formatTime(this.selectedDate)}`;
      default:
        return this.placeholder;
    }
  }
  
  private formatRangeDisplayValue(): string {
    if (!this.rangeFrom) {
      return this.placeholder;
    }
    
    const fromStr = this.formatDate(this.rangeFrom);
    
    if (!this.rangeTo) {
      return `${fromStr} - ...`;
    }
    
    const toStr = this.formatDate(this.rangeTo);
    return `${fromStr} - ${toStr}`;
  }
  
  private formatDate(date: Date): string {
    if (!date) return '';
    
    // Use a simple format by default (can be extended with custom formatting library)
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  }
  
  private formatTime(date: Date): string {
    if (!date) return '';
    
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    
    if (this.use24HourFormat) {
      return `${hours.toString().padStart(2, '0')}:${minutes}${this.showSeconds ? `:${seconds}` : ''}`;
    } else {
      const period = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      return `${hours}:${minutes}${this.showSeconds ? `:${seconds}` : ''} ${period}`;
    }
  }
  
  // Keyboard handling
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (!this.isOpen) {
      if (event.key === 'Enter' || event.key === ' ') {
        this.togglePicker();
        event.preventDefault();
      }
      return;
    }
    
    switch (event.key) {
      case 'Escape':
        this.isOpen = false;
        event.preventDefault();
        break;
      case 'Enter':
        if (this.currentView === 'days' && this.selectedDate) {
          this.applySelection();
        }
        event.preventDefault();
        break;
      case 'ArrowLeft':
        if (this.currentView === 'days') {
          this.navigateCalendar(-1, 0);
        }
        event.preventDefault();
        break;
      case 'ArrowRight':
        if (this.currentView === 'days') {
          this.navigateCalendar(1, 0);
        }
        event.preventDefault();
        break;
      case 'ArrowUp':
        if (this.currentView === 'days') {
          this.navigateCalendar(0, -1);
        }
        event.preventDefault();
        break;
      case 'ArrowDown':
        if (this.currentView === 'days') {
          this.navigateCalendar(0, 1);
        }
        event.preventDefault();
        break;
    }
  }
  
  private navigateCalendar(horizontalChange: number, verticalChange: number): void {
    if (!this.selectedDate) {
      this.selectedDate = new Date(this.currentDate);
    }
    
    const newDate = new Date(this.selectedDate);
    newDate.setDate(newDate.getDate() + horizontalChange + (verticalChange * 7));
    
    if (!this.isDateDisabled(newDate)) {
      this.selectedDate = newDate;
      
      // Adjust current month view if selected date is not visible
      if (newDate.getMonth() !== this.currentDate.getMonth() || 
          newDate.getFullYear() !== this.currentDate.getFullYear()) {
        this.currentDate = new Date(newDate);
      }
      
      this.generateCalendar();
    }
  }
  
  // Override methods from BaseInputComponent for proper form integration
  override writeValue(value: any): void {
    if (value) {
      if (typeof value === 'string') {
        this.selectedDate = new Date(value);
      } else if (value instanceof Date) {
        this.selectedDate = new Date(value);
      } else if (this.isRange && value.from && value.to) {
        this.rangeFrom = new Date(value.from);
        this.rangeTo = new Date(value.to);
      }
      
      if (this.selectedDate && !isNaN(this.selectedDate.getTime())) {
        this.currentDate = new Date(this.selectedDate);
        this.updateDateModel(this.selectedDate);
      }
    } else {
      this.selectedDate = null;
      this.rangeFrom = null;
      this.rangeTo = null;
    }
    
    super.writeValue(value);
  }
  
  override onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    
    if (!inputValue) {
      this.clearSelection();
      return;
    }
    
    // Try to parse the input value
    const parsedDate = new Date(inputValue);
    
    if (!isNaN(parsedDate.getTime())) {
      this.selectedDate = parsedDate;
      this.currentDate = new Date(parsedDate);
      this.updateDateModel(parsedDate);
      this.updateValue();
    }
    
    super.onInputChange(event);
  }

  override onBlur(): void {
    // Call parent onBlur to mark the field as touched
    super.onBlur();
  }
}