import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tasks-container">
      <h1>My Tasks</h1>
      <p>View and manage your learning tasks and assignments.</p>
      
      <div class="filters">
        <div class="status-filter">
          <button class="filter-btn active">All</button>
          <button class="filter-btn">Pending</button>
          <button class="filter-btn">Completed</button>
        </div>
      </div>
      
      <div class="task-stats">
        <div class="stat-card">
          <div class="stat-value">0</div>
          <div class="stat-label">Total Tasks</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">0</div>
          <div class="stat-label">Tasks Due Soon</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">0%</div>
          <div class="stat-label">Completion Rate</div>
        </div>
      </div>
      
      <h2>Task List</h2>
      <div class="tasks-list">
        <div class="empty-state">
          <p>You don't have any tasks assigned yet.</p>
          <p>Tasks will appear here when you enroll in courses with assignments!</p>
          <button class="primary-btn">Browse Courses</button>
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
    
    .tasks-container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    h1 {
      margin-bottom: 8px;
      color: var(--text-primary, #1a1a1a);
    }
    
    :host-context([data-theme="dark"]) h1 {
      color: var(--text-primary, #ffffff);
    }
    
    h2 {
      margin: 32px 0 16px;
      color: var(--text-primary, #1a1a1a);
    }
    
    :host-context([data-theme="dark"]) h2 {
      color: var(--text-primary, #ffffff);
    }
    
    p {
      color: var(--text-secondary, #666666);
    }
    
    :host-context([data-theme="dark"]) p {
      color: var(--text-secondary, #b8b8b8);
    }
    
    .filters {
      margin: 24px 0;
    }
    
    .status-filter {
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
    
    .task-stats {
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
      transition: all 0.3s ease;
      border: 1px solid transparent;
    }
    
    :host-context([data-theme="dark"]) .stat-card {
      background-color: var(--bg-surface, #252526);
      box-shadow: 0 4px 8px rgba(0,0,0,0.3);
      border-color: var(--border-default, #333333);
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
      color: var(--text-secondary, #616161);
    }
    
    :host-context([data-theme="dark"]) .stat-label {
      color: var(--text-secondary, #b0b0b0);
    }
    
    .tasks-list {
      background-color: var(--bg-surface, #ffffff);
      border-radius: 8px;
      padding: 24px;
      box-shadow: var(--shadow-sm, 0 2px 4px rgba(0,0,0,0.1));
      min-height: 200px;
      transition: all 0.3s ease;
      border: 1px solid transparent;
    }
    
    :host-context([data-theme="dark"]) .tasks-list {
      background-color: var(--bg-surface, #252526);
      box-shadow: 0 4px 8px rgba(0,0,0,0.3);
      border-color: var(--border-default, #333333);
    }
    
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 200px;
      color: var(--text-tertiary, #757575);
      text-align: center;
      
      p {
        margin: 4px 0;
        color: var(--text-secondary, #666666);
      }
      
      .primary-btn {
        margin-top: 16px;
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
    }
    
    :host-context([data-theme="dark"]) .empty-state {
      color: var(--text-tertiary, #808080);
      
      p {
        color: var(--text-secondary, #b0b0b0);
      }
      
      .primary-btn {
        background-color: var(--primary-600, #155ab7);
        
        &:hover {
          background-color: var(--primary-700, #0f4390);
        }
      }
    }
  `]
})
export class TasksComponent {
  constructor() {
    console.log('Tasks Component initialized');
  }
} 