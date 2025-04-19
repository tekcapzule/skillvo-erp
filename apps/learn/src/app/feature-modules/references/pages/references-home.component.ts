import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-references-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="references-container">
      <h1>References Library</h1>
      <p>Access learning resources, documentation, and helpful materials.</p>
      
      <div class="references-search">
        <input type="text" placeholder="Search references..." class="search-input">
        <div class="category-filters">
          <button class="category-btn active">All</button>
          <button class="category-btn">Guides</button>
          <button class="category-btn">Tutorials</button>
          <button class="category-btn">Documentation</button>
        </div>
      </div>
      
      <div class="references-grid">
        <div class="reference-card">
          <div class="reference-icon">
            <i class="document-icon">📄</i>
          </div>
          <div class="reference-content">
            <h3>Platform User Guide</h3>
            <p>Complete guide to using the SkillVo learning platform efficiently.</p>
            <div class="reference-meta">
              <span class="reference-type">Guide</span>
              <button class="view-btn">View</button>
            </div>
          </div>
        </div>
        
        <div class="reference-card">
          <div class="reference-icon">
            <i class="document-icon">📄</i>
          </div>
          <div class="reference-content">
            <h3>Learning Path Framework</h3>
            <p>Understanding how to create and follow custom learning paths.</p>
            <div class="reference-meta">
              <span class="reference-type">Documentation</span>
              <button class="view-btn">View</button>
            </div>
          </div>
        </div>
        
        <div class="reference-card">
          <div class="reference-icon">
            <i class="document-icon">📄</i>
          </div>
          <div class="reference-content">
            <h3>Assessment Guidelines</h3>
            <p>Standards and methods for course assessments and evaluations.</p>
            <div class="reference-meta">
              <span class="reference-type">Guide</span>
              <button class="view-btn">View</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .references-container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    h1 {
      margin-bottom: 8px;
      color: #333;
    }
    
    .references-search {
      margin: 24px 0;
    }
    
    .search-input {
      width: 100%;
      padding: 12px 16px;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-bottom: 16px;
    }
    
    .category-filters {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    
    .category-btn {
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
    
    .references-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 24px;
      margin-top: 24px;
    }
    
    .reference-card {
      display: flex;
      background-color: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .reference-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      background-color: #f5f5f5;
      
      .document-icon {
        font-size: 32px;
        font-style: normal;
      }
    }
    
    .reference-content {
      flex: 1;
      padding: 16px;
    }
    
    h3 {
      margin-bottom: 8px;
      color: #333;
    }
    
    .reference-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 16px;
    }
    
    .reference-type {
      padding: 4px 8px;
      background-color: #e3f2fd;
      border-radius: 4px;
      font-size: 12px;
      color: #1976d2;
    }
    
    .view-btn {
      padding: 6px 12px;
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
export class ReferencesHomeComponent {
  constructor() {
    console.log('References Home Component initialized');
  }
} 