import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <header class="dashboard-header">
        <div>
          <h1>Welcome back, John!</h1>
          <p>Continue your learning journey and track your progress</p>
        </div>
        <div class="actions">
          <button class="outline-btn">View Schedule</button>
          <button class="primary-btn">Continue Learning</button>
        </div>
      </header>
      
      <!-- Learning Summary -->
      <section class="stats-section">
        <h2 class="section-title">Learning Summary</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon completed-icon">📊</div>
            <div class="stat-info">
              <span class="stat-value">42%</span>
              <span class="stat-label">Course Completion</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: 42%"></div>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon time-icon">⏱️</div>
            <div class="stat-info">
              <span class="stat-value">12h</span>
              <span class="stat-label">Learning Time</span>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon courses-icon">📚</div>
            <div class="stat-info">
              <span class="stat-value">3</span>
              <span class="stat-label">Courses in Progress</span>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon assessments-icon">📝</div>
            <div class="stat-info">
              <span class="stat-value">5</span>
              <span class="stat-label">Completed Assessments</span>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Main Content Grid -->
      <div class="dashboard-main">
        <div class="dashboard-main-left">
          <!-- My Courses Section -->
          <section class="courses-section dashboard-panel">
            <div class="panel-header">
              <h2>My Courses</h2>
              <a href="#" class="view-all">View All</a>
            </div>
            
            <div class="course-list">
              <div class="course-item">
                <div class="course-image"></div>
                <div class="course-info">
                  <h3>Introduction to SkillVo Platform</h3>
                  <div class="course-progress">
                    <div class="progress-bar">
                      <div class="progress-fill" style="width: 60%"></div>
                    </div>
                    <span>60% Complete</span>
                  </div>
                </div>
                <button class="continue-btn">Continue</button>
              </div>
              
              <div class="course-item">
                <div class="course-image"></div>
                <div class="course-info">
                  <h3>Advanced Learning Techniques</h3>
                  <div class="course-progress">
                    <div class="progress-bar">
                      <div class="progress-fill" style="width: 25%"></div>
                    </div>
                    <span>25% Complete</span>
                  </div>
                </div>
                <button class="continue-btn">Continue</button>
              </div>
            </div>
          </section>
          
          <!-- My Tasks Section -->
          <section class="tasks-section dashboard-panel">
            <div class="panel-header">
              <h2>My Tasks</h2>
              <a href="#" class="view-all">View All</a>
            </div>
            
            <div class="task-list">
              <div class="task-item">
                <div class="task-checkbox">
                  <input type="checkbox" id="task1">
                  <label for="task1"></label>
                </div>
                <div class="task-info">
                  <h3>Complete Module 3 Assessment</h3>
                  <p>Introduction to SkillVo Platform</p>
                </div>
                <div class="task-due">
                  <span class="due-date">Due Tomorrow</span>
                </div>
              </div>
              
              <div class="task-item">
                <div class="task-checkbox">
                  <input type="checkbox" id="task2">
                  <label for="task2"></label>
                </div>
                <div class="task-info">
                  <h3>Watch Video Tutorial on Learning Styles</h3>
                  <p>Advanced Learning Techniques</p>
                </div>
                <div class="task-due">
                  <span class="due-date">Due in 3 days</span>
                </div>
              </div>
              
              <div class="task-item priority-task">
                <div class="task-checkbox">
                  <input type="checkbox" id="task3">
                  <label for="task3"></label>
                </div>
                <div class="task-info">
                  <h3>Submit Final Project Draft</h3>
                  <p>Advanced Learning Techniques</p>
                </div>
                <div class="task-due">
                  <span class="due-date urgent">Due in 1 day</span>
                </div>
              </div>
            </div>
          </section>
        </div>
        
        <div class="dashboard-main-right">
          <!-- Upcoming Events -->
          <section class="events-section dashboard-panel">
            <div class="panel-header">
              <h2>Upcoming Events</h2>
              <a href="#" class="view-all">View Calendar</a>
            </div>
            
            <div class="event-list">
              <div class="event-item">
                <div class="event-date">
                  <span class="event-month">JUN</span>
                  <span class="event-day">15</span>
                </div>
                <div class="event-info">
                  <h3>Weekly Study Group</h3>
                  <p>10:00 AM - 11:30 AM</p>
                </div>
              </div>
              
              <div class="event-item">
                <div class="event-date">
                  <span class="event-month">JUN</span>
                  <span class="event-day">22</span>
                </div>
                <div class="event-info">
                  <h3>Workshop: Effective Note Taking</h3>
                  <p>2:00 PM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </section>
          
          <!-- Leaderboard Section -->
          <section class="leaderboard-section dashboard-panel">
            <div class="panel-header">
              <h2>Leaderboard</h2>
              <span class="ranking">Your Rank: #4</span>
            </div>
            
            <div class="leaderboard-list">
              <div class="leaderboard-item">
                <div class="rank">1</div>
                <div class="user-avatar"></div>
                <div class="user-info">
                  <h3>Sarah Johnson</h3>
                  <p>Advanced Learning Track</p>
                </div>
                <div class="points">2,540 pts</div>
              </div>
              
              <div class="leaderboard-item">
                <div class="rank">2</div>
                <div class="user-avatar"></div>
                <div class="user-info">
                  <h3>Michael Chen</h3>
                  <p>Design Thinking Track</p>
                </div>
                <div class="points">2,320 pts</div>
              </div>
              
              <div class="leaderboard-item">
                <div class="rank">3</div>
                <div class="user-avatar"></div>
                <div class="user-info">
                  <h3>Olivia Garcia</h3>
                  <p>Technical Foundations</p>
                </div>
                <div class="points">2,180 pts</div>
              </div>
              
              <div class="leaderboard-item current-user">
                <div class="rank">4</div>
                <div class="user-avatar"></div>
                <div class="user-info">
                  <h3>John Doe (You)</h3>
                  <p>Technical Foundations</p>
                </div>
                <div class="points">1,950 pts</div>
              </div>
            </div>
          </section>
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
    
    /* Dashboard Header */
    
    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
      flex-wrap: wrap;
      gap: 16px;
    }
    
    h1 {
      margin-bottom: 8px;
      color: var(--text-primary, #1a1a1a);
      font-size: 28px;
    }
    
    :host-context([data-theme="dark"]) h1 {
      color: var(--text-primary, #ffffff);
    }
    
    .actions {
      display: flex;
      gap: 12px;
    }
    
    /* Stats Section */
    
    .section-title {
      margin-bottom: 16px;
      font-size: 20px;
      color: var(--text-primary, #1a1a1a);
    }
    
    :host-context([data-theme="dark"]) .section-title {
      color: var(--text-primary, #ffffff);
    }
    
    .stats-section {
      margin-bottom: 32px;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: 24px;
    }
    
    .stat-card {
      background-color: var(--bg-surface, #ffffff);
      border-radius: 8px;
      padding: 20px;
      box-shadow: var(--shadow-sm, 0 2px 4px rgba(0,0,0,0.08));
      display: flex;
      flex-direction: column;
      gap: 12px;
      transition: all 0.3s ease;
      border: 1px solid var(--border-light, rgba(0,0,0,0.06));
    }
    
    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-default, 0 6px 12px rgba(0,0,0,0.12));
      border-color: var(--primary-200, #add8ff);
    }
    
    :host-context([data-theme="dark"]) .stat-card {
      background-color: var(--bg-surface, #252526);
      box-shadow: 0 4px 8px rgba(0,0,0,0.3);
      border-color: var(--border-default, #333333);
    }
    
    :host-context([data-theme="dark"]) .stat-card:hover {
      box-shadow: 0 8px 16px rgba(0,0,0,0.6);
      border-color: var(--primary-700, #0f4390);
    }
    
    .stat-icon {
      font-size: 24px;
      margin-bottom: 8px;
    }
    
    .stat-info {
      display: flex;
      flex-direction: column;
    }
    
    .stat-value {
      font-size: 24px;
      font-weight: bold;
      color: var(--primary-600, #155ab7);
    }
    
    :host-context([data-theme="dark"]) .stat-value {
      color: var(--primary-400, #4da9ff);
    }
    
    .stat-label {
      color: var(--text-secondary, #555555);
      font-size: 14px;
    }
    
    :host-context([data-theme="dark"]) .stat-label {
      color: var(--text-secondary, #a0a0a0);
    }
    
    .progress-bar {
      height: 6px;
      background-color: var(--bg-element, #f0f0f0);
      border-radius: 3px;
      overflow: hidden;
      margin-top: 8px;
    }
    
    :host-context([data-theme="dark"]) .progress-bar {
      background-color: var(--bg-element, #2a2a2a);
    }
    
    .progress-fill {
      height: 100%;
      background-color: var(--primary-500, #1971e5);
      border-radius: 3px;
    }
    
    :host-context([data-theme="dark"]) .progress-fill {
      background-color: var(--primary-400, #4da9ff);
    }
    
    /* Main Dashboard Layout */
    
    .dashboard-main {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 24px;
    }
    
    .dashboard-panel {
      background-color: var(--bg-surface, #ffffff);
      border-radius: 8px;
      padding: 24px;
      box-shadow: var(--shadow-sm, 0 2px 4px rgba(0,0,0,0.08));
      margin-bottom: 24px;
      transition: all 0.3s ease;
      border: 1px solid var(--border-light, rgba(0,0,0,0.06));
    }
    
    :host-context([data-theme="dark"]) .dashboard-panel {
      background-color: var(--bg-surface, #252526);
      box-shadow: 0 4px 8px rgba(0,0,0,0.3);
      border-color: var(--border-default, #333333);
    }
    
    .panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      
      h2 {
        margin: 0;
        font-size: 18px;
        color: var(--text-primary, #1a1a1a);
      }
    }
    
    :host-context([data-theme="dark"]) .panel-header h2 {
      color: var(--text-primary, #ffffff);
    }
    
    .view-all {
      color: var(--primary-600, #155ab7);
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      transition: color 0.2s ease;
      
      &:hover {
        color: var(--primary-700, #0f4390);
        text-decoration: underline;
      }
    }
    
    :host-context([data-theme="dark"]) .view-all {
      color: var(--primary-400, #4da9ff);
      
      &:hover {
        color: var(--primary-300, #80c2ff);
      }
    }
    
    /* Courses Section */
    
    .course-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .course-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
      background-color: var(--bg-element, #f5f5f5);
      border-radius: 8px;
      transition: background-color 0.3s ease;
    }
    
    :host-context([data-theme="dark"]) .course-item {
      background-color: var(--bg-element, #2a2a2a);
    }
    
    .course-image {
      width: 60px;
      height: 60px;
      background-color: var(--primary-100, #e3f2fd);
      border-radius: 4px;
      flex-shrink: 0;
    }
    
    :host-context([data-theme="dark"]) .course-image {
      background-color: var(--primary-900, #05204a);
    }
    
    .course-info {
      flex: 1;
      
      h3 {
        margin: 0 0 8px 0;
        font-size: 16px;
        color: var(--text-primary, #1a1a1a);
      }
    }
    
    :host-context([data-theme="dark"]) .course-info h3 {
      color: var(--text-primary, #ffffff);
    }
    
    .course-progress {
      display: flex;
      flex-direction: column;
      gap: 4px;
      
      span {
        font-size: 12px;
        color: var(--text-secondary, #666666);
      }
    }
    
    :host-context([data-theme="dark"]) .course-progress span {
      color: var(--text-secondary, #a0a0a0);
    }
    
    .continue-btn {
      padding: 6px 12px;
      background-color: var(--primary-500, #1971e5);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: background-color 0.2s ease;
      
      &:hover {
        background-color: var(--primary-600, #155ab7);
      }
    }
    
    :host-context([data-theme="dark"]) .continue-btn {
      background-color: var(--primary-600, #155ab7);
      
      &:hover {
        background-color: var(--primary-700, #0f4390);
      }
    }
    
    /* Tasks Section */
    
    .task-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .task-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background-color: var(--bg-element, #f5f5f5);
      border-radius: 8px;
      transition: all 0.3s ease;
      border: 1px solid transparent;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-sm, 0 2px 4px rgba(0,0,0,0.1));
      }
      
      &.priority-task {
        border-left: 3px solid var(--danger-color, #ea4343);
      }
    }
    
    :host-context([data-theme="dark"]) .task-item {
      background-color: var(--bg-element, #2a2a2a);
      
      &:hover {
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
      }
      
      &.priority-task {
        border-left: 3px solid var(--danger-color, #ea4343);
      }
    }
    
    .task-checkbox {
      input[type="checkbox"] {
        display: none;
        
        & + label {
          display: inline-block;
          width: 20px;
          height: 20px;
          background-color: white;
          border: 2px solid var(--primary-400, #4da9ff);
          border-radius: 4px;
          cursor: pointer;
          position: relative;
          transition: all 0.2s ease;
          
          &:after {
            content: '';
            position: absolute;
            display: none;
            left: 6px;
            top: 2px;
            width: 5px;
            height: 10px;
            border: solid white;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
          }
        }
        
        &:checked + label {
          background-color: var(--primary-500, #1971e5);
          
          &:after {
            display: block;
          }
        }
      }
    }
    
    :host-context([data-theme="dark"]) .task-checkbox input[type="checkbox"] + label {
      border-color: var(--primary-400, #4da9ff);
      background-color: var(--bg-element, #2a2a2a);
    }
    
    :host-context([data-theme="dark"]) .task-checkbox input[type="checkbox"]:checked + label {
      background-color: var(--primary-600, #155ab7);
    }
    
    .task-info {
      flex: 1;
      
      h3 {
        margin: 0 0 4px 0;
        font-size: 15px;
        color: var(--text-primary, #1a1a1a);
      }
      
      p {
        margin: 0;
        font-size: 13px;
        color: var(--text-secondary, #666666);
      }
    }
    
    :host-context([data-theme="dark"]) .task-info h3 {
      color: var(--text-primary, #ffffff);
    }
    
    :host-context([data-theme="dark"]) .task-info p {
      color: var(--text-secondary, #a0a0a0);
    }
    
    .task-due {
      flex-shrink: 0;
      
      .due-date {
        font-size: 12px;
        color: var(--text-tertiary, #757575);
        background-color: var(--bg-surface, #ffffff);
        padding: 4px 8px;
        border-radius: 12px;
        
        &.urgent {
          color: white;
          background-color: var(--danger-color, #ea4343);
        }
      }
    }
    
    :host-context([data-theme="dark"]) .task-due .due-date {
      color: var(--text-tertiary, #a0a0a0);
      background-color: var(--bg-surface, #252526);
      
      &.urgent {
        color: white;
        background-color: var(--danger-color, #ea4343);
      }
    }
    
    /* Events Section */
    
    .event-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .event-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 12px;
      background-color: var(--bg-element, #f5f5f5);
      border-radius: 8px;
      transition: background-color 0.3s ease;
    }
    
    :host-context([data-theme="dark"]) .event-item {
      background-color: var(--bg-element, #2a2a2a);
    }
    
    .event-date {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 50px;
      height: 50px;
      background-color: var(--primary-600, #155ab7);
      background-image: linear-gradient(to bottom right, var(--primary-500, #1971e5), var(--primary-700, #0f4390));
      color: white;
      border-radius: 8px;
      flex-shrink: 0;
      
      .event-month {
        font-size: 12px;
        text-transform: uppercase;
      }
      
      .event-day {
        font-size: 18px;
        font-weight: bold;
      }
    }
    
    :host-context([data-theme="dark"]) .event-date {
      background-color: var(--primary-600, #155ab7);
    }
    
    .event-info {
      flex: 1;
      
      h3 {
        margin: 0 0 4px 0;
        font-size: 15px;
        color: var(--text-primary, #1a1a1a);
      }
      
      p {
        margin: 0;
        font-size: 13px;
        color: var(--text-secondary, #666666);
      }
    }
    
    :host-context([data-theme="dark"]) .event-info h3 {
      color: var(--text-primary, #ffffff);
    }
    
    :host-context([data-theme="dark"]) .event-info p {
      color: var(--text-secondary, #a0a0a0);
    }
    
    /* Leaderboard Section */
    
    .ranking {
      font-size: 14px;
      color: var(--text-secondary, #666666);
      background-color: var(--bg-element, #f5f5f5);
      padding: 4px 10px;
      border-radius: 12px;
    }
    
    :host-context([data-theme="dark"]) .ranking {
      color: var(--text-secondary, #a0a0a0);
      background-color: var(--bg-element, #2a2a2a);
    }
    
    .leaderboard-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .leaderboard-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background-color: var(--bg-element, #f5f5f5);
      border-radius: 8px;
      transition: all 0.3s ease;
      
      &.current-user {
        background-color: var(--primary-50, #edf7ff);
        border: 1px solid var(--primary-200, #add8ff);
        box-shadow: 0 0 0 1px var(--primary-100, #e3f2fd);
      }
    }
    
    :host-context([data-theme="dark"]) .leaderboard-item {
      background-color: var(--bg-element, #2a2a2a);
      
      &.current-user {
        background-color: rgba(77, 169, 255, 0.15);
        border: 1px solid var(--primary-800, #0a326d);
      }
    }
    
    .rank {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      background-color: var(--bg-surface, #ffffff);
      color: var(--text-primary, #1a1a1a);
      border-radius: 50%;
      font-weight: bold;
      font-size: 14px;
      flex-shrink: 0;
    }
    
    :host-context([data-theme="dark"]) .rank {
      background-color: var(--bg-surface, #252526);
      color: var(--text-primary, #ffffff);
    }
    
    .user-avatar {
      width: 36px;
      height: 36px;
      background-color: var(--bg-surface, #ffffff);
      border-radius: 50%;
      border: 2px solid var(--primary-200, #add8ff);
      flex-shrink: 0;
    }
    
    :host-context([data-theme="dark"]) .user-avatar {
      background-color: var(--bg-surface, #252526);
      border-color: var(--primary-700, #0f4390);
    }
    
    .user-info {
      flex: 1;
      
      h3 {
        margin: 0 0 2px 0;
        font-size: 14px;
        color: var(--text-primary, #1a1a1a);
      }
      
      p {
        margin: 0;
        font-size: 12px;
        color: var(--text-secondary, #666666);
      }
    }
    
    :host-context([data-theme="dark"]) .user-info h3 {
      color: var(--text-primary, #ffffff);
    }
    
    :host-context([data-theme="dark"]) .user-info p {
      color: var(--text-secondary, #a0a0a0);
    }
    
    .points {
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-500, #1971e5);
    }
    
    :host-context([data-theme="dark"]) .points {
      color: var(--primary-400, #4da9ff);
    }
    
    /* Buttons */
    
    .primary-btn {
      padding: 8px 16px;
      background-color: var(--primary-600, #155ab7);
      background-image: linear-gradient(to bottom, var(--primary-500, #1971e5), var(--primary-600, #155ab7));
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s ease;
      
      &:hover {
        background-color: var(--primary-700, #0f4390);
        background-image: linear-gradient(to bottom, var(--primary-600, #155ab7), var(--primary-700, #0f4390));
        transform: translateY(-1px);
      }
      
      &:focus {
        outline: none;
        box-shadow: 0 0 0 2px var(--primary-200, #add8ff);
      }
    }
    
    :host-context([data-theme="dark"]) .primary-btn {
      background-color: var(--primary-600, #155ab7);
      
      &:hover {
        background-color: var(--primary-700, #0f4390);
      }
    }
    
    .outline-btn {
      padding: 8px 16px;
      background-color: transparent;
      color: var(--primary-600, #155ab7);
      border: 1px solid var(--primary-400, #4da9ff);
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s ease;
      
      &:hover {
        background-color: var(--primary-50, #edf7ff);
        border-color: var(--primary-500, #1971e5);
      }
      
      &:focus {
        outline: none;
        box-shadow: 0 0 0 2px var(--primary-200, #add8ff);
      }
    }
    
    :host-context([data-theme="dark"]) .outline-btn {
      color: var(--primary-400, #4da9ff);
      border-color: var(--primary-400, #4da9ff);
      
      &:hover {
        background-color: rgba(77, 169, 255, 0.1);
      }
    }
    
    /* Responsive Layout */
    
    @media (max-width: 992px) {
      .dashboard-main {
        grid-template-columns: 1fr;
      }
    }
    
    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      }
      
      .dashboard-header {
        flex-direction: column;
        align-items: flex-start;
      }
      
      .actions {
        width: 100%;
      }
      
      .course-item, 
      .task-item, 
      .event-item {
        flex-direction: column;
        align-items: flex-start;
      }
      
      .continue-btn {
        margin-top: 8px;
        align-self: flex-end;
      }
    }
  `]
})
export class DashboardHomeComponent {
  constructor() {
    console.log('Dashboard Home Component initialized');
  }
} 