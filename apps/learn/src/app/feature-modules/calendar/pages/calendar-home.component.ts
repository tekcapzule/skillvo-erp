import { Component } from '@angular/core';
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
          <!-- First row (May 28 - June 3) -->
          <div class="day other-month">28</div>
          <div class="day other-month">29</div>
          <div class="day other-month">30</div>
          <div class="day other-month">31</div>
          <div class="day">1</div>
          <div class="day">2</div>
          <div class="day">3</div>
          
          <!-- Second row (June 4-10) -->
          <div class="day">4</div>
          <div class="day">5</div>
          <div class="day">6</div>
          <div class="day">7</div>
          <div class="day">8</div>
          <div class="day">9</div>
          <div class="day">10</div>
          
          <!-- Third row (June 11-17) -->
          <div class="day">11</div>
          <div class="day">12</div>
          <div class="day">13</div>
          <div class="day">14</div>
          <div class="day current-day">15</div>
          <div class="day">16</div>
          <div class="day">17</div>
          
          <!-- Fourth row (June 18-24) -->
          <div class="day">18</div>
          <div class="day">19</div>
          <div class="day">20</div>
          <div class="day">21</div>
          <div class="day">22</div>
          <div class="day">23</div>
          <div class="day">24</div>
          
          <!-- Fifth row (June 25 - July 1) -->
          <div class="day">25</div>
          <div class="day">26</div>
          <div class="day">27</div>
          <div class="day">28</div>
          <div class="day">29</div>
          <div class="day">30</div>
          <div class="day other-month">1</div>
        </div>
      </div>
      
      <div class="upcoming-events">
        <h3>Upcoming Events</h3>
        <div class="event-empty">
          <p>You don't have any upcoming events.</p>
          <button class="add-event-btn">Add Event</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .calendar-container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    h1 {
      margin-bottom: 8px;
      color: #333;
    }
    
    .calendar-controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 24px 0;
      flex-wrap: wrap;
      gap: 16px;
    }
    
    .month-navigation {
      display: flex;
      align-items: center;
      gap: 16px;
      
      h2 {
        margin: 0;
        font-size: 20px;
      }
    }
    
    .nav-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 1px solid #ddd;
      background: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      
      &:hover {
        background-color: #f0f0f0;
      }
    }
    
    .view-options {
      display: flex;
      gap: 8px;
    }
    
    .view-btn {
      padding: 8px 16px;
      border: 1px solid #ddd;
      background: none;
      border-radius: 4px;
      cursor: pointer;
      
      &.active {
        background-color: #1976d2;
        color: white;
        border-color: #1976d2;
      }
      
      &:hover:not(.active) {
        background-color: #f0f0f0;
      }
    }
    
    .calendar-grid {
      background-color: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .weekday-header {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      background-color: #f0f0f0;
      border-bottom: 1px solid #ddd;
    }
    
    .weekday {
      padding: 12px;
      text-align: center;
      font-weight: 500;
    }
    
    .calendar-days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
    }
    
    .day {
      height: 80px;
      border-right: 1px solid #f0f0f0;
      border-bottom: 1px solid #f0f0f0;
      padding: 8px;
      
      &.other-month {
        color: #ccc;
        background-color: #f9f9f9;
      }
      
      &.current-day {
        background-color: #e3f2fd;
        font-weight: bold;
        color: #1976d2;
      }
    }
    
    .upcoming-events {
      margin-top: 24px;
      background-color: white;
      border-radius: 8px;
      padding: 24px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      
      h3 {
        margin: 0 0 16px 0;
        color: #333;
      }
    }
    
    .event-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 24px;
      color: #757575;
      text-align: center;
      
      p {
        margin-bottom: 16px;
      }
    }
    
    .add-event-btn {
      padding: 8px 16px;
      background-color: #1976d2;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      
      &:hover {
        background-color: #1565c0;
      }
    }
  `]
})
export class CalendarHomeComponent {
  constructor() {
    console.log('Calendar Home Component initialized');
  }
} 