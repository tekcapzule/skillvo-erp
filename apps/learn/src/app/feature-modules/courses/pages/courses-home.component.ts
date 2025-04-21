import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="courses-container">
      <h1>My Courses</h1>
      <p>Browse and manage your enrolled courses.</p>
      
      <div class="courses-filter">
        <input type="text" placeholder="Search courses..." class="search-input">
        <div class="filter-buttons">
          <button class="filter-btn active">All</button>
          <button class="filter-btn">In Progress</button>
          <button class="filter-btn">Completed</button>
        </div>
      </div>
      
      <div class="courses-grid">
        <div class="course-card">
          <div class="course-image"></div>
          <div class="course-content">
            <h3>Introduction to SkillVo Platform</h3>
            <p>Learn the basics of using the SkillVo learning platform.</p>
            <div class="course-meta">
              <span>0% complete</span>
              <button class="continue-btn">Start Course</button>
            </div>
          </div>
        </div>
        
        <div class="course-card">
          <div class="course-image"></div>
          <div class="course-content">
            <h3>Advanced Learning Techniques</h3>
            <p>Master effective learning strategies and study techniques.</p>
            <div class="course-meta">
              <span>0% complete</span>
              <button class="continue-btn">Start Course</button>
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
    
    .courses-container {
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
    
    p {
      color: var(--text-secondary, #666666);
    }
    
    :host-context([data-theme="dark"]) p {
      color: var(--text-secondary, #a0a0a0);
    }
    
    .courses-filter {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      margin: 24px 0;
      gap: 16px;
    }
    
    .search-input {
      padding: 12px 16px;
      border: 1px solid var(--border-default, #e0e0e0);
      border-radius: 4px;
      width: 100%;
      max-width: 320px;
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
    
    .filter-buttons {
      display: flex;
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
    
    .courses-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 24px;
    }
    
    .course-card {
      border-radius: 8px;
      overflow: hidden;
      box-shadow: var(--shadow-sm, 0 2px 4px rgba(0,0,0,0.1));
      background-color: var(--bg-surface, #ffffff);
      transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;
      
      &:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-default, 0 6px 12px rgba(0,0,0,0.15));
      }
    }
    
    :host-context([data-theme="dark"]) .course-card {
      background-color: var(--bg-surface, #252526);
      box-shadow: 0 4px 8px rgba(0,0,0,0.4);
      border: 1px solid var(--border-default, #333333);
      
      &:hover {
        box-shadow: 0 8px 16px rgba(0,0,0,0.6);
        border-color: var(--primary-700, #0f4390);
      }
    }
    
    .course-image {
      height: 160px;
      background-color: var(--bg-element, #f5f5f5);
      transition: background-color 0.3s ease;
    }
    
    :host-context([data-theme="dark"]) .course-image {
      background-color: var(--bg-element, #1e1e1e);
      border-bottom: 1px solid var(--border-default, #333333);
    }
    
    .course-content {
      padding: 16px;
    }
    
    h3 {
      margin-bottom: 8px;
      color: var(--text-primary, #1a1a1a);
    }
    
    :host-context([data-theme="dark"]) h3 {
      color: var(--text-primary, #ffffff);
    }
    
    .course-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 16px;
      
      span {
        color: var(--text-secondary, #666666);
      }
    }
    
    :host-context([data-theme="dark"]) .course-meta span {
      color: var(--text-secondary, #b8b8b8);
    }
    
    .continue-btn {
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
    
    :host-context([data-theme="dark"]) .continue-btn {
      background-color: var(--primary-600, #155ab7);
      
      &:hover {
        background-color: var(--primary-700, #0f4390);
      }
    }
    
    @media (max-width: 768px) {
      .courses-filter {
        flex-direction: column;
        align-items: flex-start;
      }
      
      .search-input,
      .filter-buttons {
        width: 100%;
      }
      
      .filter-buttons {
        justify-content: space-between;
      }
    }
  `]
})
export class CoursesHomeComponent {
  constructor() {
    console.log('Courses Home Component initialized');
  }
} 