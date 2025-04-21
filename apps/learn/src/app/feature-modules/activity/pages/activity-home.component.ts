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
    
    .activity-container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    h1 {
      margin-bottom: 8px;
      color: var(--text-primary, #1a1a1a);
    }
    
    :host-context([data-theme="dark"]) h1 {
      color: var(--text-primary, #e0e0e0);
    }
    
    h2 {
      margin: 32px 0 16px;
      color: var(--text-primary, #1a1a1a);
    }
    
    :host-context([data-theme="dark"]) h2 {
      color: var(--text-primary, #e0e0e0);
    }
    
    p {
      color: var(--text-secondary, #666666);
    }
    
    :host-context([data-theme="dark"]) p {
      color: var(--text-secondary, #a0a0a0);
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
      border: 1px solid var(--border-default, #e0e0e0);
      background: var(--bg-element, #f5f5f5);
      border-radius: 4px;
      cursor: pointer;
      color: var(--text-primary, #1a1a1a);
      transition: all 0.2s ease;
      
      &.active {
        background-color: var(--primary-500, #1971e5);
        color: white;
        border-color: var(--primary-500, #1971e5);
      }
      
      &:hover:not(.active) {
        background-color: var(--bg-element-hover, rgba(0,0,0,0.05));
      }
    }
    
    :host-context([data-theme="dark"]) .filter-btn {
      background-color: var(--bg-element, #2a2a2a);
      border-color: var(--border-default, #333333);
      color: var(--text-primary, #e0e0e0);
      
      &.active {
        background-color: var(--primary-600, #155ab7);
        border-color: var(--primary-600, #155ab7);
      }
      
      &:hover:not(.active) {
        background-color: var(--bg-element-hover, rgba(255,255,255,0.1));
      }
    }
    
    .activity-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 24px;
      margin-top: 24px;
    }
    
    .stat-card {
      background-color: var(--bg-surface, #ffffff);
      border-radius: 8px;
      padding: 24px;
      box-shadow: var(--shadow-sm, 0 2px 4px rgba(0,0,0,0.1));
      text-align: center;
      transition: background-color 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
      border: 1px solid transparent;
    }
    
    :host-context([data-theme="dark"]) .stat-card {
      background-color: var(--bg-element, #2a2a2a);
      box-shadow: 0 3px 6px rgba(0,0,0,0.3);
      border: 1px solid var(--border-default, #333333);
    }
    
    .stat-value {
      font-size: 32px;
      font-weight: bold;
      color: var(--primary-500, #1971e5);
      margin-bottom: 8px;
    }
    
    :host-context([data-theme="dark"]) .stat-value {
      color: var(--primary-400, #4da9ff);
    }
    
    .stat-label {
      color: var(--text-secondary, #666666);
    }
    
    :host-context([data-theme="dark"]) .stat-label {
      color: var(--text-secondary, #a0a0a0);
    }
    
    .activity-timeline {
      background-color: var(--bg-surface, #ffffff);
      border-radius: 8px;
      padding: 24px;
      box-shadow: var(--shadow-sm, 0 2px 4px rgba(0,0,0,0.1));
      min-height: 200px;
      transition: background-color 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
      border: 1px solid transparent;
    }
    
    :host-context([data-theme="dark"]) .activity-timeline {
      background-color: var(--bg-element, #2a2a2a);
      box-shadow: 0 3px 6px rgba(0,0,0,0.3);
      border: 1px solid var(--border-default, #333333);
    }
    
    .timeline-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 200px;
      color: var(--text-secondary, #666666);
      text-align: center;
      
      p {
        margin: 4px 0;
      }
    }
    
    :host-context([data-theme="dark"]) .timeline-empty {
      color: var(--text-secondary, #a0a0a0);
    }
    
    @media (max-width: 768px) {
      .time-filter {
        flex-direction: column;
        width: 100%;
      }
      
      .filter-btn {
        width: 100%;
        text-align: center;
      }
      
      .activity-stats {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ActivityHomeComponent {
  constructor() {
    console.log('Activity Home Component initialized');
  }
} 