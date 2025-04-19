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
    .help-container {
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
    
    .help-search {
      display: flex;
      margin: 24px 0;
      gap: 8px;
    }
    
    .search-input {
      flex: 1;
      padding: 12px 16px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }
    
    .search-btn {
      padding: 0 24px;
      background-color: #1976d2;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      
      &:hover {
        background-color: #1565c0;
      }
    }
    
    .help-categories {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
      margin-top: 32px;
    }
    
    .category-card {
      background-color: white;
      border-radius: 8px;
      padding: 24px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      text-align: center;
    }
    
    .category-icon {
      font-size: 32px;
      margin-bottom: 16px;
    }
    
    .category-card h3 {
      margin-bottom: 8px;
      color: #333;
    }
    
    .category-card p {
      color: #616161;
      margin-bottom: 16px;
    }
    
    .category-link {
      color: #1976d2;
      text-decoration: none;
      font-weight: 500;
      
      &:hover {
        text-decoration: underline;
      }
    }
    
    .faq-section {
      margin-top: 48px;
    }
    
    .faq-item {
      border-bottom: 1px solid #e0e0e0;
      margin-bottom: 16px;
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
        color: #333;
      }
    }
    
    .toggle-icon {
      font-size: 24px;
      color: #616161;
    }
    
    .faq-answer {
      padding: 0 0 16px;
      
      p {
        margin: 0;
        color: #616161;
      }
    }
    
    .contact-support {
      margin-top: 48px;
      text-align: center;
      padding: 32px;
      background-color: #f5f5f5;
      border-radius: 8px;
    }
    
    .contact-btn {
      margin-top: 16px;
      padding: 12px 24px;
      background-color: #1976d2;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      
      &:hover {
        background-color: #1565c0;
      }
    }
  `]
})
export class HelpHomeComponent {
  constructor() {
    console.log('Help Home Component initialized');
  }
} 