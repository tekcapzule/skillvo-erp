import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-learnings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="learnings-container">
      <h1>My Learnings</h1>
      <p>Track your learning activities, progress, and completed courses.</p>
      
      <div class="filters">
        <div class="status-filter">
          <button class="filter-btn active">All</button>
          <button class="filter-btn">In Progress</button>
          <button class="filter-btn">Completed</button>
        </div>
      </div>
      
      <div class="learning-stats">
        <div class="stat-card">
          <div class="stat-value">0</div>
          <div class="stat-label">Courses In Progress</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">0</div>
          <div class="stat-label">Completed Courses</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">0h</div>
          <div class="stat-label">Total Learning Time</div>
        </div>
      </div>
      
      <h2>My Courses</h2>
      <div class="courses-list">
        <div class="empty-state">
          <p>You haven't started any courses yet.</p>
          <p>Browse our catalog to find courses that interest you!</p>
          <button class="primary-btn">Browse Courses</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .learnings-container {
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
    
    .learning-stats {
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
    
    .courses-list {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 24px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      min-height: 200px;
    }
    
    .empty-state {
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
      
      .primary-btn {
        margin-top: 16px;
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
    }
  `]
})
export class LearningsComponent {
  constructor() {
    console.log('Learnings Component initialized');
  }
} 