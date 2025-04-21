import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ThemeName = 'light' | 'dark' | 'ocean' | 'classic';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme = new BehaviorSubject<ThemeName>('light');
  currentTheme$ = this.currentTheme.asObservable();

  constructor() {
    // Initialize with transition class
    document.documentElement.classList.add('theme-transition');

    // Check if user has a theme preference saved
    const savedTheme = localStorage.getItem('theme') as ThemeName;
    if (savedTheme && ['light', 'dark', 'ocean', 'classic'].includes(savedTheme)) {
      this.setTheme(savedTheme);
    } else {
      // Check for system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setTheme(prefersDark ? 'dark' : 'light');
    }

    // Remove transition class after initialization
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 300);
  }

  /**
   * Set the active theme
   * @param theme The theme to set
   */
  setTheme(theme: ThemeName): void {
    // Add transition class for smooth theme change
    document.documentElement.classList.add('theme-transition');
    
    // Update theme
    this.currentTheme.next(theme);
    localStorage.setItem('theme', theme);
    
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
    
    // Remove transition class after animations complete
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 300);
  }

  /**
   * Toggle between light and dark themes
   * Maintained for backward compatibility
   */
  toggleDarkMode(): void {
    const currentTheme = this.currentTheme.value;
    this.setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  }

  /**
   * Check if the current theme is the specified theme
   * @param theme The theme to check against
   * @returns True if it's the current theme
   */
  isTheme(theme: ThemeName): boolean {
    return this.currentTheme.value === theme;
  }

  /**
   * Check if the current theme is dark
   * Maintained for backward compatibility
   * @returns True if the current theme is dark
   */
  isDarkMode(): boolean {
    return this.currentTheme.value === 'dark';
  }
} 