import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="calendar-container">
      <h1>Learning Calendar</h1>
      <p>Manage your learning schedule and deadlines.</p>
      
      <div class="calendar-controls">
        <div class="month-navigation">
          <button class="nav-btn">&lt;</button>
          <h2>June 2023</h2>
          <button class="nav-btn">&gt;</button>
        </div>
        <div class="view-options">
          <button class="view-btn active">Month</button>
          <button class="view-btn">Week</button>
          <button class="view-btn">Day</button>
        </div>
      </div>
      
      <div class="calendar-grid">
        <div class="weekday-header">
          <div class="weekday">Sun</div>
          <div class="weekday">Mon</div>
          <div class="weekday">Tue</div>
          <div class="weekday">Wed</div>
          <div class="weekday">Thu</div>
          <div class="weekday">Fri</div>
          <div class="weekday">Sat</div>
        </div>
        
        <div class="calendar-days">
          <div *ngFor="let day of days" [class]="'day ' + (day.otherMonth ? 'other-month' : '') + (day.isToday ? ' current-day' : '')">
            {{ day.date }}
            <div *ngIf="day.hasEvents" class="event-indicator"></div>
          </div>
        </div>
      </div>
      
      <div class="upcoming-events">
        <h3>Upcoming Events</h3>
        <div class="event-empty" *ngIf="!hasEvents">
          <p>You don't have any upcoming events.</p>
          <button class="add-event-btn">Add Event</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      color: var(--text-primary, #1a1a1a);
      transition: all 0.3s ease;
      background-color: transparent;
    }

    /* Dark Theme for the entire component */
    :host-context([data-theme="dark"]) {
      color: var(--text-primary, #e0e0e0);
    }

    .calendar-container {
      max-width: 100%;
      background-color: var(--bg-surface, #ffffff);
      border-radius: 8px;
      padding: 20px;
      box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.1));
      transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
    }
    
    /* Dark Theme overrides */
    :host-context([data-theme="dark"]) .calendar-container {
      background-color: var(--bg-surface, #1e1e1e) !important;
      box-shadow: 0 1px 3px rgba(0,0,0,0.4);
      color: var(--text-primary, #e0e0e0);
    }
    
    h1 {
      margin: 0 0 8px 0;
      font-size: 24px;
      font-weight: 600;
      color: var(--text-primary, #1a1a1a);
    }
    
    :host-context([data-theme="dark"]) h1 {
      color: var(--text-primary, #e0e0e0);
    }
    
    p {
      margin: 0 0 24px 0;
      color: var(--text-secondary, #666666);
      font-size: 14px;
    }
    
    :host-context([data-theme="dark"]) p {
      color: var(--text-secondary, #a0a0a0);
    }
    
    .calendar-controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    
    .month-navigation {
      display: flex;
      align-items: center;
      gap: 15px;
      
      h2 {
        margin: 0;
        font-size: 18px;
        font-weight: 500;
        color: var(--text-primary, #1a1a1a);
      }
    }
    
    :host-context([data-theme="dark"]) .month-navigation h2 {
      color: var(--text-primary, #e0e0e0);
    }
    
    .nav-btn {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--border-default, #e0e0e0);
      background-color: var(--bg-element, #f5f5f5);
      color: var(--text-primary, #1a1a1a);
      cursor: pointer;
      font-weight: bold;
      border-radius: 4px;
      transition: all 0.2s ease;
      
      &:hover {
        background-color: var(--bg-element-hover, rgba(0,0,0,0.05));
      }
      
      &:focus {
        outline: none;
        box-shadow: 0 0 0 2px var(--primary-300, #80c2ff);
      }
    }
    
    :host-context([data-theme="dark"]) .nav-btn {
      background-color: var(--bg-element, #2a2a2a) !important;
      border-color: var(--border-default, #333333);
      color: var(--text-primary, #e0e0e0);
      
      &:hover {
        background-color: var(--bg-element-hover, rgba(255,255,255,0.1)) !important;
      }
    }
    
    .view-options {
      display: flex;
      gap: 8px;
    }
    
    .view-btn {
      padding: 6px 12px;
      background-color: var(--bg-element, #f5f5f5);
      border: 1px solid var(--border-default, #e0e0e0);
      border-radius: 4px;
      color: var(--text-primary, #1a1a1a);
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s ease;
      
      &.active {
        background-color: var(--primary-500, #1971e5);
        color: white;
        border-color: var(--primary-500, #1971e5);
      }
      
      &:hover:not(.active) {
        background-color: var(--bg-element-hover, rgba(0,0,0,0.05));
      }
      
      &:focus {
        outline: none;
        box-shadow: 0 0 0 2px var(--primary-300, #80c2ff);
      }
    }
    
    :host-context([data-theme="dark"]) .view-btn:not(.active) {
      background-color: var(--bg-element, #2a2a2a) !important;
      border-color: var(--border-default, #333333);
      color: var(--text-primary, #e0e0e0);
      
      &:hover {
        background-color: var(--bg-element-hover, rgba(255,255,255,0.1)) !important;
      }
    }
    
    :host-context([data-theme="dark"]) .view-btn.active {
      background-color: var(--primary-600, #155ab7) !important;
      border-color: var(--primary-600, #155ab7);
    }
    
    .calendar-grid {
      border: 1px solid var(--border-default, #e0e0e0);
      border-radius: 8px;
      overflow: hidden;
      transition: border-color 0.3s ease;
    }
    
    :host-context([data-theme="dark"]) .calendar-grid {
      border-color: var(--border-default, #333333);
      background-color: var(--bg-surface, #1e1e1e);
    }
    
    .weekday-header {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      background-color: var(--bg-element, #f5f5f5);
      border-bottom: 1px solid var(--border-default, #e0e0e0);
      transition: background-color 0.3s ease, border-color 0.3s ease;
    }
    
    :host-context([data-theme="dark"]) .weekday-header {
      background-color: var(--bg-element, #2a2a2a) !important;
      border-color: var(--border-default, #333333);
    }
    
    .weekday {
      padding: 10px;
      text-align: center;
      font-weight: 500;
      font-size: 14px;
      color: var(--text-secondary, #666666);
    }
    
    :host-context([data-theme="dark"]) .weekday {
      color: var(--text-secondary, #a0a0a0);
    }
    
    .calendar-days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      background-color: var(--bg-surface, #ffffff);
      transition: background-color 0.3s ease;
    }
    
    :host-context([data-theme="dark"]) .calendar-days {
      background-color: var(--bg-surface, #1e1e1e) !important;
    }
    
    .day {
      aspect-ratio: 1 / 1;
      border-right: 1px solid var(--border-default, #e0e0e0);
      border-bottom: 1px solid var(--border-default, #e0e0e0);
      padding: 8px;
      position: relative;
      color: var(--text-primary, #1a1a1a);
      min-height: 80px;
      transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
      background-color: var(--bg-surface, #ffffff);
      
      &:nth-child(7n) {
        border-right: none;
      }
      
      &:nth-last-child(-n+7) {
        border-bottom: none;
      }
      
      &.other-month {
        color: var(--text-disabled, #bdbdbd);
        background-color: var(--bg-element, #f8f8f8);
      }
      
      &.current-day {
        font-weight: bold;
        color: var(--primary-700, #0f4390);
        
        &::after {
          content: '';
          position: absolute;
          top: 6px;
          right: 6px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--primary-500, #1971e5);
        }
      }

      &:hover {
        background-color: var(--bg-element-hover, rgba(0,0,0,0.05));
        cursor: pointer;
      }
    }
    
    :host-context([data-theme="dark"]) .day {
      background-color: var(--bg-surface, #1e1e1e) !important;
      border-color: var(--border-default, #333333);
      color: var(--text-primary, #e0e0e0);
      
      &.other-month {
        background-color: var(--bg-element, #2a2a2a) !important;
        color: var(--text-disabled, #666666);
      }
      
      &.current-day {
        color: var(--primary-400, #4da9ff);
        background-color: rgba(77, 169, 255, 0.08) !important;
        
        &::after {
          background-color: var(--primary-400, #4da9ff);
          width: 8px;
          height: 8px;
        }
      }
      
      &:hover {
        background-color: rgba(255, 255, 255, 0.08) !important;
      }
    }

    .event-indicator {
      position: absolute;
      bottom: 6px;
      left: 50%;
      transform: translateX(-50%);
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: var(--primary-500, #1971e5);
    }
    
    :host-context([data-theme="dark"]) .event-indicator {
      background-color: var(--primary-400, #4da9ff);
      box-shadow: 0 0 4px rgba(77, 169, 255, 0.5);
    }
    
    .upcoming-events {
      margin-top: 24px;
      
      h3 {
        margin: 0 0 16px 0;
        font-size: 18px;
        font-weight: 500;
        color: var(--text-primary, #1a1a1a);
      }
    }
    
    :host-context([data-theme="dark"]) .upcoming-events h3 {
      color: var(--text-primary, #e0e0e0);
    }
    
    .event-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
      background-color: var(--bg-element, #f5f5f5);
      border-radius: 8px;
      text-align: center;
      transition: background-color 0.3s ease;
      
      p {
        margin-bottom: 16px;
        color: var(--text-secondary, #666666);
      }
    }
    
    :host-context([data-theme="dark"]) .event-empty {
      background-color: var(--bg-element, #2a2a2a) !important;
      
      p {
        color: var(--text-secondary, #a0a0a0);
      }
    }
    
    .add-event-btn {
      padding: 8px 16px;
      background-color: var(--primary-500, #1971e5);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.2s ease;
      
      &:hover {
        background-color: var(--primary-600, #155ab7);
      }
      
      &:focus {
        outline: none;
        box-shadow: 0 0 0 2px var(--primary-300, #80c2ff);
      }
    }
    
    @media (max-width: 768px) {
      .calendar-controls {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
      }
      
      .view-options {
        width: 100%;
      }
      
      .day {
        min-height: 60px;
        font-size: 14px;
      }
    }
  `]
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