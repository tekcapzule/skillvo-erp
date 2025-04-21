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
    
    .references-container {
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
    
    p {
      color: var(--text-secondary, #666666);
    }
    
    :host-context([data-theme="dark"]) p {
      color: var(--text-secondary, #b8b8b8);
    }
    
    .references-search {
      margin: 24px 0;
    }
    
    .search-input {
      width: 100%;
      padding: 12px 16px;
      border: 1px solid var(--border-default, #e0e0e0);
      border-radius: 4px;
      margin-bottom: 16px;
      background-color: var(--bg-surface, #ffffff);
      color: var(--text-primary, #1a1a1a);
      transition: all 0.2s ease;
    }
    
    :host-context([data-theme="dark"]) .search-input {
      background-color: var(--bg-element, #2a2a2a);
      border-color: var(--border-default, #333333);
      color: var(--text-primary, #e0e0e0);
      
      &::placeholder {
        color: var(--text-secondary, #a0a0a0);
      }
    }
    
    .category-filters {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    
    .category-btn {
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
    
    :host-context([data-theme="dark"]) .category-btn {
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
    
    .references-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 24px;
      margin-top: 24px;
    }
    
    .reference-card {
      display: flex;
      background-color: var(--bg-surface, #ffffff);
      border-radius: 8px;
      overflow: hidden;
      box-shadow: var(--shadow-sm, 0 2px 4px rgba(0,0,0,0.1));
      transition: all 0.3s ease;
      border: 1px solid transparent;
    }
    
    :host-context([data-theme="dark"]) .reference-card {
      background-color: var(--bg-surface, #252526);
      box-shadow: 0 4px 8px rgba(0,0,0,0.4);
      border-color: var(--border-default, #333333);
    }
    
    .reference-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-default, 0 6px 12px rgba(0,0,0,0.15));
    }
    
    :host-context([data-theme="dark"]) .reference-card:hover {
      box-shadow: 0 8px 16px rgba(0,0,0,0.6);
      border-color: var(--primary-700, #0f4390);
    }
    
    .reference-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      background-color: var(--bg-element, #f5f5f5);
      border-right: 1px solid transparent;
      transition: all 0.3s ease;
      
      .document-icon {
        font-size: 32px;
        font-style: normal;
      }
    }
    
    :host-context([data-theme="dark"]) .reference-icon {
      background-color: var(--bg-element, #1e1e1e);
      border-right-color: var(--border-default, #333333);
    }
    
    .reference-content {
      flex: 1;
      padding: 16px;
    }
    
    h3 {
      margin-bottom: 8px;
      color: var(--text-primary, #1a1a1a);
    }
    
    :host-context([data-theme="dark"]) h3 {
      color: var(--text-primary, #ffffff);
    }
    
    .reference-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 16px;
    }
    
    .reference-type {
      padding: 4px 8px;
      background-color: var(--primary-100, #e3f2fd);
      border-radius: 4px;
      font-size: 12px;
      color: var(--primary-600, #1565c0);
    }
    
    :host-context([data-theme="dark"]) .reference-type {
      background-color: var(--primary-900, #05204a);
      color: var(--primary-300, #80c2ff);
    }
    
    .view-btn {
      padding: 6px 12px;
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
    
    :host-context([data-theme="dark"]) .view-btn {
      background-color: var(--primary-600, #155ab7);
      
      &:hover {
        background-color: var(--primary-700, #0f4390);
      }
    }
  `]
})
export class ReferencesHomeComponent {
  constructor() {
    console.log('References Home Component initialized');
  }
} 