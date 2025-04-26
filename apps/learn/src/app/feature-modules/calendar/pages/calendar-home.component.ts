import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar-home.component.html',
  styleUrls: ['./calendar-home.component.scss']
})
export class CalendarHomeComponent implements OnInit {
  days: Array<{date: number, otherMonth: boolean, isToday: boolean, hasEvents: boolean}> = [];
  hasEvents = false;

  constructor() {}

  ngOnInit(): void {
    this.generateCalendarDays();
  }

  generateCalendarDays() {
    // Previous month days (May)
    for (let i = 28; i <= 31; i++) {
      this.days.push({
        date: i,
        otherMonth: true,
        isToday: false,
        hasEvents: false
      });
    }
    
    // Current month days (June)
    for (let i = 1; i <= 30; i++) {
      this.days.push({
        date: i,
        otherMonth: false,
        isToday: i === 15,
        hasEvents: i === 15 // Add event indicator to current day
      });
    }
    
    // Next month days (July)
    this.days.push({
      date: 1,
      otherMonth: true,
      isToday: false,
      hasEvents: false
    });
  }
} 