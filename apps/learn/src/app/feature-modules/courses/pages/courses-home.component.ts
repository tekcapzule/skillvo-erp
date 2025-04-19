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
    .courses-container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    h1 {
      margin-bottom: 8px;
      color: #333;
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
      border: 1px solid #ddd;
      border-radius: 4px;
      width: 100%;
      max-width: 320px;
    }
    
    .filter-buttons {
      display: flex;
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
    
    .courses-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 24px;
    }
    
    .course-card {
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      background-color: white;
    }
    
    .course-image {
      height: 160px;
      background-color: #e0e0e0;
    }
    
    .course-content {
      padding: 16px;
    }
    
    h3 {
      margin-bottom: 8px;
      color: #333;
    }
    
    .course-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 16px;
    }
    
    .continue-btn {
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
  `]
})
export class CoursesHomeComponent {
  constructor() {
    console.log('Courses Home Component initialized');
  }
} 