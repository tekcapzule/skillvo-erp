import { Component, OnInit, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ThemeService, ThemeName } from '../../core/services/theme.service';
import { Subscription } from 'rxjs';

export interface Announcement {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  dismissible: boolean;
  link?: { text: string; url: string };
}

@Component({
  selector: 'app-announcements-bar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './announcements-bar.component.html',
  styleUrls: ['./announcements-bar.component.scss']
})
export class AnnouncementsBarComponent implements OnInit, OnDestroy {
  announcements: Announcement[] = [];
  hasAnnouncements = false;
  allDismissed = false;
  currentTheme: ThemeName = 'light';
  
  // Use the first announcement as the current one
  get currentAnnouncement(): Announcement {
    return this.announcements[0] || {
      id: '',
      message: '',
      type: 'info',
      dismissible: false
    };
  }
  
  private dismissedAnnouncements: Set<string> = new Set();
  private themeSubscription: Subscription | null = null;
  
  constructor(
    private themeService: ThemeService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}
  
  ngOnInit(): void {
    // Load announcements - in a real app, this would come from a service
    this.loadAnnouncements();
    
    // Check if all announcements have been dismissed previously
    this.checkDismissedState();
    
    // Subscribe to theme changes
    this.themeSubscription = this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme;
    });
    
    // Apply current theme on initialization
    this.currentTheme = this.themeService.isDarkMode() ? 'dark' : 'light';
  }
  
  ngOnDestroy(): void {
    // Clean up subscription when component is destroyed
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }
  
  /**
   * Load announcements - this would typically be from a service in a real app
   */
  private loadAnnouncements(): void {
    // Only show one announcement for now
    this.announcements = [
      {
        id: 'announcement-1',
        message: 'System maintenance scheduled for June 15th at 2:00 AM EST.',
        type: 'info',
        dismissible: true,
        link: { text: 'Learn more', url: '/help/maintenance' }
      }
    ];
    
    this.hasAnnouncements = this.announcements.length > 0;
  }
  
  /**
   * Check if all announcements have been dismissed by the user
   */
  private checkDismissedState(): void {
    // Load dismissed announcements from localStorage
    const savedDismissed = localStorage.getItem('dismissedAnnouncements');
    if (savedDismissed) {
      try {
        const dismissedArray = JSON.parse(savedDismissed);
        this.dismissedAnnouncements = new Set(dismissedArray);
      } catch (e) {
        console.error('Error parsing dismissed announcements', e);
        this.dismissedAnnouncements = new Set();
      }
    }
    
    // Filter out dismissed announcements
    this.announcements = this.announcements.filter(a => !this.dismissedAnnouncements.has(a.id));
    
    // Update state
    this.hasAnnouncements = this.announcements.length > 0;
    this.allDismissed = this.hasAnnouncements === false;
  }
  
  /**
   * Dismiss an announcement by ID
   */
  dismissAnnouncement(id: string): void {
    // Add to dismissed set
    this.dismissedAnnouncements.add(id);
    
    // Save to localStorage
    localStorage.setItem(
      'dismissedAnnouncements', 
      JSON.stringify([...this.dismissedAnnouncements])
    );
    
    // Remove from current announcements
    this.announcements = this.announcements.filter(a => a.id !== id);
    
    // Update state
    this.hasAnnouncements = this.announcements.length > 0;
    this.allDismissed = this.hasAnnouncements === false;
  }
} 