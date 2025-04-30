import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'demo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatSlideToggleModule,
    FormsModule
  ]
})
export class HeaderComponent implements OnInit {
  isDarkTheme = false;

  ngOnInit() {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkTheme = savedTheme === 'dark';
      this.applyTheme(this.isDarkTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDarkTheme = prefersDark;
      this.applyTheme(this.isDarkTheme);
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.isDarkTheme = e.matches;
        this.applyTheme(this.isDarkTheme);
      }
    });
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.applyTheme(this.isDarkTheme);
    
    // Save preference
    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
  }
  
  private applyTheme(isDark: boolean) {
    // Add transition class for smooth theme change
    document.documentElement.classList.add('color-scheme-transition');
    
    // Apply theme
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
    
    // Remove transition class after animation completes
    setTimeout(() => {
      document.documentElement.classList.remove('color-scheme-transition');
    }, 300);
  }
} 