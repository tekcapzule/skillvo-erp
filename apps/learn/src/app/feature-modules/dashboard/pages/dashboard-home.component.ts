import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <h1>Welcome to Learn Platform</h1>
      <p>This is the Home page of the Learn application.</p>
      <div class="dashboard-content">
        <div class="dashboard-card">
          <h2>Your Progress</h2>
          <p>You have completed 0 courses.</p>
          <button class="primary-btn">View Courses</button>
        </div>
        <div class="dashboard-card">
          <h2>Upcoming Deadlines</h2>
          <p>You have no upcoming deadlines.</p>
          <button class="primary-btn">View Calendar</button>
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
    
    .dashboard-container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .dashboard-content {
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
      margin-top: 24px;
    }
    
    .dashboard-card {
      background-color: var(--bg-surface, #ffffff);
      border-radius: 8px;
      padding: 16px;
      box-shadow: var(--shadow-sm, 0 2px 4px rgba(0,0,0,0.1));
      min-height: 200px;
      height: 100%;
      display: flex;
      flex-direction: column;
      transition: background-color 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
      border: 1px solid transparent;
    }
    
    :host-context([data-theme="dark"]) .dashboard-card {
      background-color: var(--bg-element, #2a2a2a);
      box-shadow: 0 3px 6px rgba(0,0,0,0.3);
      border: 1px solid var(--border-default, #333333);
    }
    
    h1 {
      margin-bottom: 16px;
      color: var(--text-primary, #1a1a1a);
    }
    
    :host-context([data-theme="dark"]) h1 {
      color: var(--text-primary, #e0e0e0);
    }
    
    h2 {
      margin-bottom: 16px;
      color: var(--primary-500, #1971e5);
    }
    
    :host-context([data-theme="dark"]) h2 {
      color: var(--primary-400, #4da9ff);
    }
    
    p {
      color: var(--text-secondary, #666666);
    }
    
    :host-context([data-theme="dark"]) p {
      color: var(--text-secondary, #a0a0a0);
    }
    
    .primary-btn {
      padding: 8px 16px;
      background-color: var(--primary-500, #1971e5);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s ease;
      
      &:hover {
        background-color: var(--primary-600, #155ab7);
      }
      
      &:focus {
        outline: none;
        box-shadow: 0 0 0 2px var(--primary-300, #80c2ff);
      }
    }
    
    :host-context([data-theme="dark"]) .primary-btn {
      background-color: var(--primary-600, #155ab7);
      
      &:hover {
        background-color: var(--primary-700, #0f4390);
      }
    }
  `]
})
export class DashboardHomeComponent {
  constructor() {
    console.log('Dashboard Home Component initialized');
  }
} 