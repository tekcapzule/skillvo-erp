import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="reports-container">
      <h1>Learning Reports</h1>
      <p>View insights and analytics about your learning progress.</p>
      
      <div class="report-controls">
        <div class="time-period">
          <label>Time Period:</label>
          <select class="period-select">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
            <option>All time</option>
          </select>
        </div>
        
        <div class="report-actions">
          <button class="action-btn">Export</button>
          <button class="action-btn">Print</button>
        </div>
      </div>
      
      <div class="report-metrics">
        <div class="metric-card">
          <h3>Learning Hours</h3>
          <div class="metric-value">0</div>
          <div class="metric-chart">
            <div class="empty-chart"></div>
          </div>
        </div>
        
        <div class="metric-card">
          <h3>Courses Completed</h3>
          <div class="metric-value">0</div>
          <div class="metric-chart">
            <div class="empty-chart"></div>
          </div>
        </div>
        
        <div class="metric-card">
          <h3>Assessments Taken</h3>
          <div class="metric-value">0</div>
          <div class="metric-chart">
            <div class="empty-chart"></div>
          </div>
        </div>
        
        <div class="metric-card">
          <h3>Average Score</h3>
          <div class="metric-value">N/A</div>
          <div class="metric-chart">
            <div class="empty-chart"></div>
          </div>
        </div>
      </div>
      
      <div class="detailed-reports">
        <h2>Detailed Reports</h2>
        <div class="reports-list">
          <div class="report-empty">
            <p>No reports available yet. Start completing courses to generate reports.</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .reports-container {
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
    
    .report-controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 24px 0;
      flex-wrap: wrap;
      gap: 16px;
    }
    
    .time-period {
      display: flex;
      align-items: center;
      gap: 12px;
      
      label {
        font-weight: 500;
      }
    }
    
    .period-select {
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: white;
    }
    
    .report-actions {
      display: flex;
      gap: 8px;
    }
    
    .action-btn {
      padding: 8px 16px;
      border: 1px solid #ddd;
      background: none;
      border-radius: 4px;
      cursor: pointer;
      
      &:hover {
        background-color: #f0f0f0;
      }
    }
    
    .report-metrics {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
    }
    
    .metric-card {
      background-color: white;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      
      h3 {
        margin-bottom: 8px;
        color: #616161;
        font-weight: 500;
        font-size: 16px;
      }
    }
    
    .metric-value {
      font-size: 32px;
      font-weight: bold;
      color: #1976d2;
      margin-bottom: 16px;
    }
    
    .metric-chart {
      height: 80px;
    }
    
    .empty-chart {
      height: 100%;
      background-color: #f5f5f5;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #9e9e9e;
      
      &:after {
        content: "No data";
        font-size: 14px;
      }
    }
    
    .detailed-reports {
      margin-top: 32px;
    }
    
    .reports-list {
      background-color: white;
      border-radius: 8px;
      padding: 24px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .report-empty {
      padding: 24px;
      text-align: center;
      color: #757575;
    }
  `]
})
export class ReportsHomeComponent {
  constructor() {
    console.log('Reports Home Component initialized');
  }
} 