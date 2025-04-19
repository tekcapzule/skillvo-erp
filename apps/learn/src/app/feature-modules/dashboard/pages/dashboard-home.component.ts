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
          <button mat-raised-button color="primary">View Courses</button>
        </div>
        <div class="dashboard-card">
          <h2>Upcoming Deadlines</h2>
          <p>You have no upcoming deadlines.</p>
          <button mat-raised-button color="primary">View Calendar</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
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
      background-color: #ffffff;
      border-radius: 8px;
      padding: 24px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      flex: 1;
      min-width: 300px;
    }
    
    h1 {
      margin-bottom: 16px;
      color: #333;
    }
    
    h2 {
      margin-bottom: 16px;
      color: #1976d2;
    }
  `]
})
export class DashboardHomeComponent {
  constructor() {
    console.log('Dashboard Home Component initialized');
  }
} 