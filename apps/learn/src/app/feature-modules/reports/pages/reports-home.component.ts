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
    
    .reports-container {
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
        color: var(--text-primary, #1a1a1a);
      }
    }
    
    :host-context([data-theme="dark"]) .time-period label {
      color: var(--text-primary, #e0e0e0);
    }
    
    .period-select {
      padding: 8px 12px;
      border: 1px solid var(--border-default, #e0e0e0);
      border-radius: 4px;
      background-color: var(--bg-surface, #ffffff);
      color: var(--text-primary, #1a1a1a);
      transition: all 0.2s ease;
    }
    
    :host-context([data-theme="dark"]) .period-select {
      background-color: var(--bg-element, #2a2a2a);
      border-color: var(--border-default, #333333);
      color: var(--text-primary, #e0e0e0);
    }
    
    .report-actions {
      display: flex;
      gap: 8px;
    }
    
    .action-btn {
      padding: 8px 16px;
      border: 1px solid var(--border-default, #e0e0e0);
      background: var(--bg-element, #f5f5f5);
      border-radius: 4px;
      cursor: pointer;
      color: var(--text-primary, #1a1a1a);
      transition: all 0.2s ease;
      
      &:hover {
        background-color: var(--bg-element-hover, rgba(0,0,0,0.05));
      }
    }
    
    :host-context([data-theme="dark"]) .action-btn {
      background-color: var(--bg-element, #2a2a2a);
      border-color: var(--border-default, #333333);
      color: var(--text-primary, #e0e0e0);
      
      &:hover {
        background-color: var(--bg-element-hover, rgba(255,255,255,0.1));
      }
    }
    
    .report-metrics {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
    }
    
    .metric-card {
      background-color: var(--bg-surface, #ffffff);
      border-radius: 8px;
      padding: 16px;
      box-shadow: var(--shadow-sm, 0 2px 4px rgba(0,0,0,0.1));
      transition: all 0.3s ease;
      border: 1px solid transparent;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-default, 0 4px 8px rgba(0,0,0,0.1));
      }
      
      h3 {
        margin-bottom: 8px;
        color: var(--text-secondary, #616161);
        font-weight: 500;
        font-size: 16px;
      }
    }
    
    :host-context([data-theme="dark"]) .metric-card {
      background-color: var(--bg-surface, #252526);
      box-shadow: 0 4px 8px rgba(0,0,0,0.3);
      border-color: var(--border-default, #333333);
      
      &:hover {
        box-shadow: 0 6px 12px rgba(0,0,0,0.4);
      }
      
      h3 {
        color: var(--text-secondary, #b0b0b0);
      }
    }
    
    .metric-value {
      font-size: 32px;
      font-weight: bold;
      color: var(--primary-500, #1971e5);
      margin-bottom: 16px;
    }
    
    :host-context([data-theme="dark"]) .metric-value {
      color: var(--primary-400, #4da9ff);
    }
    
    .metric-chart {
      height: 80px;
    }
    
    .empty-chart {
      height: 100%;
      background-color: var(--bg-element, #f5f5f5);
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-tertiary, #9e9e9e);
      transition: all 0.3s ease;
      
      &:after {
        content: "No data";
        font-size: 14px;
      }
    }
    
    :host-context([data-theme="dark"]) .empty-chart {
      background-color: var(--bg-element, #1e1e1e);
      color: var(--text-tertiary, #707070);
    }
    
    .detailed-reports {
      margin-top: 32px;
    }
    
    .reports-list {
      background-color: var(--bg-surface, #ffffff);
      border-radius: 8px;
      padding: 24px;
      box-shadow: var(--shadow-sm, 0 2px 4px rgba(0,0,0,0.1));
      transition: all 0.3s ease;
      border: 1px solid transparent;
    }
    
    :host-context([data-theme="dark"]) .reports-list {
      background-color: var(--bg-surface, #252526);
      box-shadow: 0 4px 8px rgba(0,0,0,0.3);
      border-color: var(--border-default, #333333);
    }
    
    .report-empty {
      padding: 24px;
      text-align: center;
      color: var(--text-tertiary, #757575);
    }
    
    :host-context([data-theme="dark"]) .report-empty {
      color: var(--text-tertiary, #808080);
    }
  `]
})
export class ReportsHomeComponent {
  constructor() {
    console.log('Reports Home Component initialized');
  }
} 