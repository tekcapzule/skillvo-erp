import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activity-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="activity-container">
      <h1>My Activity</h1>
      <p>Track your learning progress and recent activities.</p>
      
      <div class="activity-filters">
        <div class="time-filter">
          <button class="filter-btn active">Today</button>
          <button class="filter-btn">This Week</button>
          <button class="filter-btn">This Month</button>
          <button class="filter-btn">All Time</button>
        </div>
      </div>
      
      <div class="activity-stats">
        <div class="stat-card">
          <div class="stat-value">0h</div>
          <div class="stat-label">Time Spent Learning</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">0</div>
          <div class="stat-label">Courses Started</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">0</div>
          <div class="stat-label">Courses Completed</div>
        </div>
      </div>
      
      <h2>Recent Activities</h2>
      <div class="activity-timeline">
        <div class="timeline-empty">
          <p>You don't have any activities yet.</p>
          <p>Start taking courses to see your activity here!</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .activity-container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    h1 {
      margin-bottom: 8px;
      color: #333;
    }
    
    h2 {
      margin: 32px 0 16px;
      color: #333;
    }
    
    .activity-filters {
      margin: 24px 0;
    }
    
    .time-filter {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    
    .filter-btn {
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
    
    .activity-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 24px;
      margin-top: 24px;
    }
    
    .stat-card {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 24px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      text-align: center;
    }
    
    .stat-value {
      font-size: 32px;
      font-weight: bold;
      color: #1976d2;
      margin-bottom: 8px;
    }
    
    .stat-label {
      color: #616161;
    }
    
    .activity-timeline {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 24px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      min-height: 200px;
    }
    
    .timeline-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 200px;
      color: #757575;
      text-align: center;
      
      p {
        margin: 4px 0;
      }
    }
  `]
})
export class ActivityHomeComponent {
  constructor() {
    console.log('Activity Home Component initialized');
  }
} 