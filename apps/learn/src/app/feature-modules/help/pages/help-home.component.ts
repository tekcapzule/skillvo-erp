import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-help-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="help-container">
      <h1>Help Center</h1>
      <p>Find answers to your questions about using the SkillVo learning platform.</p>
      
      <div class="help-search">
        <input type="text" placeholder="Search for help topics..." class="search-input">
        <button class="search-btn">Search</button>
      </div>
      
      <div class="help-categories">
        <div class="category-card">
          <div class="category-icon">📚</div>
          <h3>Getting Started</h3>
          <p>Learn the basics of using the SkillVo platform</p>
          <a href="#" class="category-link">View guides</a>
        </div>
        
        <div class="category-card">
          <div class="category-icon">💻</div>
          <h3>Technical Support</h3>
          <p>Troubleshoot common technical issues</p>
          <a href="#" class="category-link">View guides</a>
        </div>
        
        <div class="category-card">
          <div class="category-icon">📝</div>
          <h3>Assessments & Quizzes</h3>
          <p>Learn about taking tests and assessments</p>
          <a href="#" class="category-link">View guides</a>
        </div>
        
        <div class="category-card">
          <div class="category-icon">🏆</div>
          <h3>Certifications</h3>
          <p>Information about earning certificates</p>
          <a href="#" class="category-link">View guides</a>
        </div>
      </div>
      
      <div class="faq-section">
        <h2>Frequently Asked Questions</h2>
        
        <div class="faq-item">
          <div class="faq-question">
            <h3>How do I reset my password?</h3>
            <span class="toggle-icon">+</span>
          </div>
          <div class="faq-answer">
            <p>To reset your password, click on the "Forgot Password" link on the login page. You will receive an email with instructions to create a new password.</p>
          </div>
        </div>
        
        <div class="faq-item">
          <div class="faq-question">
            <h3>How do I track my course progress?</h3>
            <span class="toggle-icon">+</span>
          </div>
          <div class="faq-answer">
            <p>Your course progress is automatically tracked as you complete lessons and assessments. You can view your progress on the My Activity page or within each course.</p>
          </div>
        </div>
        
        <div class="faq-item">
          <div class="faq-question">
            <h3>Can I download course materials for offline use?</h3>
            <span class="toggle-icon">+</span>
          </div>
          <div class="faq-answer">
            <p>Yes, most course materials can be downloaded for offline use. Look for the download icon next to downloadable resources within your courses.</p>
          </div>
        </div>
      </div>
      
      <div class="contact-support">
        <h2>Still Need Help?</h2>
        <p>Our support team is here to assist you with any questions or issues.</p>
        <button class="contact-btn">Contact Support</button>
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
    
    .help-container {
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
    
    .help-search {
      display: flex;
      margin: 24px 0;
      gap: 8px;
    }
    
    .search-input {
      flex: 1;
      padding: 12px 16px;
      border: 1px solid var(--border-default, #e0e0e0);
      border-radius: 4px;
      font-size: 16px;
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
    
    .search-btn {
      padding: 0 24px;
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
    
    :host-context([data-theme="dark"]) .search-btn {
      background-color: var(--primary-600, #155ab7);
      
      &:hover {
        background-color: var(--primary-700, #0f4390);
      }
    }
    
    .help-categories {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
      margin-top: 32px;
    }
    
    .category-card {
      background-color: var(--bg-surface, #ffffff);
      border-radius: 8px;
      padding: 24px;
      box-shadow: var(--shadow-sm, 0 2px 4px rgba(0,0,0,0.1));
      text-align: center;
      transition: all 0.3s ease;
      border: 1px solid transparent;
      
      &:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-default, 0 6px 12px rgba(0,0,0,0.15));
      }
    }
    
    :host-context([data-theme="dark"]) .category-card {
      background-color: var(--bg-surface, #252526);
      box-shadow: 0 4px 8px rgba(0,0,0,0.3);
      border-color: var(--border-default, #333333);
      
      &:hover {
        box-shadow: 0 6px 12px rgba(0,0,0,0.5);
        border-color: var(--primary-700, #0f4390);
      }
    }
    
    .category-icon {
      font-size: 32px;
      margin-bottom: 16px;
    }
    
    .category-card h3 {
      margin-bottom: 8px;
      color: var(--text-primary, #1a1a1a);
    }
    
    :host-context([data-theme="dark"]) .category-card h3 {
      color: var(--text-primary, #ffffff);
    }
    
    .category-card p {
      color: var(--text-secondary, #616161);
      margin-bottom: 16px;
    }
    
    :host-context([data-theme="dark"]) .category-card p {
      color: var(--text-secondary, #b0b0b0);
    }
    
    .category-link {
      color: var(--primary-500, #1971e5);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s ease;
      
      &:hover {
        text-decoration: underline;
        color: var(--primary-600, #155ab7);
      }
    }
    
    :host-context([data-theme="dark"]) .category-link {
      color: var(--primary-400, #4da9ff);
      
      &:hover {
        color: var(--primary-300, #80c2ff);
      }
    }
    
    .faq-section {
      margin-top: 48px;
    }
    
    .faq-item {
      border-bottom: 1px solid var(--border-default, #e0e0e0);
      margin-bottom: 16px;
      transition: border-color 0.3s ease;
    }
    
    :host-context([data-theme="dark"]) .faq-item {
      border-color: var(--border-default, #333333);
    }
    
    .faq-question {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0;
      cursor: pointer;
      
      h3 {
        margin: 0;
        font-size: 18px;
        color: var(--text-primary, #1a1a1a);
      }
    }
    
    :host-context([data-theme="dark"]) .faq-question h3 {
      color: var(--text-primary, #ffffff);
    }
    
    .toggle-icon {
      font-size: 24px;
      color: var(--text-secondary, #616161);
    }
    
    :host-context([data-theme="dark"]) .toggle-icon {
      color: var(--text-secondary, #b0b0b0);
    }
    
    .faq-answer {
      padding: 0 0 16px;
      
      p {
        margin: 0;
        color: var(--text-secondary, #616161);
      }
    }
    
    :host-context([data-theme="dark"]) .faq-answer p {
      color: var(--text-secondary, #b0b0b0);
    }
    
    .contact-support {
      margin-top: 48px;
      text-align: center;
      padding: 32px;
      background-color: var(--bg-element, #f5f5f5);
      border-radius: 8px;
      transition: all 0.3s ease;
      border: 1px solid transparent;
    }
    
    :host-context([data-theme="dark"]) .contact-support {
      background-color: var(--bg-element, #2a2a2a);
      border-color: var(--border-default, #333333);
    }
    
    .contact-btn {
      margin-top: 16px;
      padding: 12px 24px;
      background-color: var(--primary-500, #1971e5);
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
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
    
    :host-context([data-theme="dark"]) .contact-btn {
      background-color: var(--primary-600, #155ab7);
      
      &:hover {
        background-color: var(--primary-700, #0f4390);
      }
    }
  `]
})
export class HelpHomeComponent {
  constructor() {
    console.log('Help Home Component initialized');
  }
} 