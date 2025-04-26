import { Component, OnInit, Output, EventEmitter, Input, HostListener, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ThemeService, ThemeName } from '../../core/services/theme.service';
import { Subscription } from 'rxjs';

export interface NotificationCategory {
  id: string;
  name: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  category: string;
  timestamp: Date;
  read: boolean;
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ]
})
export class NotificationComponent implements OnInit, OnDestroy {
  @Input() isOpen = false;
  @Output() closeNotification = new EventEmitter<void>();

  notifications: Notification[] = [];
  filteredNotifications: Notification[] = [];
  categories: NotificationCategory[] = [];
  
  selectedCategory: string | null = null;
  searchQuery = '';
  loading = false;
  unreadCount = 0;
  
  private themeSubscription: Subscription | null = null;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    // Only act if the notification panel is open
    if (!this.isOpen) return;
    
    // Get the element that was clicked
    const targetElement = event.target as HTMLElement;
    
    // Check if the click was inside the notification panel
    const notificationPanel = document.querySelector('.notification-panel');
    const notificationButton = document.querySelector('.notification-button');
    
    if (notificationPanel && 
        notificationButton && 
        !notificationPanel.contains(targetElement) && 
        !notificationButton.contains(targetElement) &&
        !targetElement.classList.contains('notification-overlay')) {
      this.closePanel();
    }
  }

  constructor(
    private themeService: ThemeService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
    this.calculateUnreadCount();
    
    // Subscribe to theme changes
    this.themeSubscription = this.themeService.currentTheme$.subscribe(theme => {
      this.updateNotificationTheme(theme);
    });
    
    // Apply current theme on initialization
    if (this.themeService.isDarkMode()) {
      this.updateNotificationTheme('dark');
    } else {
      this.updateNotificationTheme('light');
    }

    // Prevent body scrolling when notification panel is open
    this.updateBodyScrolling();
  }
  
  ngOnDestroy(): void {
    // Clean up subscription when component is destroyed
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
    
    // Ensure body scrolling is enabled when component is destroyed
    document.body.style.overflow = '';
  }
  
  /**
   * Updates the notification panel with the appropriate theme classes and attributes
   */
  private updateNotificationTheme(theme: ThemeName): void {
    const notificationPanel = this.el.nativeElement.querySelector('.notification-panel');
    const notificationOverlay = this.el.nativeElement.querySelector('.notification-overlay');
    
    if (notificationPanel) {
      // Remove all theme classes
      this.renderer.removeClass(notificationPanel, 'light-theme');
      this.renderer.removeClass(notificationPanel, 'dark-theme');
      this.renderer.removeClass(notificationPanel, 'ocean-theme');
      this.renderer.removeClass(notificationPanel, 'classic-theme');
      
      // Add current theme class
      this.renderer.addClass(notificationPanel, `${theme}-theme`);
      
      // Set data-theme attribute
      this.renderer.setAttribute(notificationPanel, 'data-theme', theme);
    }
    
    if (notificationOverlay) {
      // Do the same for overlay
      this.renderer.removeClass(notificationOverlay, 'light-theme');
      this.renderer.removeClass(notificationOverlay, 'dark-theme');
      this.renderer.removeClass(notificationOverlay, 'ocean-theme');
      this.renderer.removeClass(notificationOverlay, 'classic-theme');
      this.renderer.addClass(notificationOverlay, `${theme}-theme`);
      this.renderer.setAttribute(notificationOverlay, 'data-theme', theme);
    }
  }

  /**
   * Prevents body scrolling when notification panel is open
   */
  private updateBodyScrolling(): void {
    if (this.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  loadNotifications(): void {
    this.loading = true;
    
    // Simulate API call with timeout
    setTimeout(() => {
      // In a real app, these would come from a service
      this.notifications = [
        {
          id: '1',
          title: 'Two New Courses Assigned',
          message: 'You have been assigned "Introduction to Angular" and "UI/UX Design Principles". These are mandatory courses that need to be completed by the specified deadline.',
          category: 'Course',
          timestamp: new Date(),
          read: false
        },
        {
          id: '2',
          title: 'Your course certificate is ready',
          message: 'Congratulations! Your certificate for "Advanced JavaScript" is now available. You can download it from your profile page.',
          category: 'Certificate',
          timestamp: new Date(Date.now() - 518400000), // 6 days ago
          read: true
        },
        {
          id: '3',
          title: 'Time to redeem your reward',
          message: 'You have earned 500 points for completing the "React Fundamentals" course. Redeem your points for special offers in the rewards center.',
          category: 'Certificate',
          timestamp: new Date('2024-11-29'),
          read: false
        },
        {
          id: '4',
          title: 'Please complete the course assigned',
          message: 'Reminder: The "Data Analytics Basics" course assigned to you is due in 5 days. Please complete it to maintain your learning progress.',
          category: 'Course',
          timestamp: new Date('2024-11-24'),
          read: false
        }
      ];
      
      this.filteredNotifications = [...this.notifications];
      this.calculateUnreadCount();
      this.loading = false;
    }, 500); // Reduced loading time for better UX
  }

  filterNotifications(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    if (!this.searchQuery && !this.selectedCategory) {
      this.filteredNotifications = [...this.notifications];
      return;
    }

    this.filteredNotifications = this.notifications.filter(notification => {
      const matchesCategory = !this.selectedCategory || 
        notification.category.toLowerCase() === this.selectedCategory.toLowerCase();
      
      const matchesSearch = !this.searchQuery || 
        notification.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
        notification.message.toLowerCase().includes(this.searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }

  filterByCategory(categoryId: string): void {
    if (this.selectedCategory === categoryId) {
      this.clearCategoryFilter();
      return;
    }
    
    this.selectedCategory = categoryId;
    this.applyFilters();
  }

  clearCategoryFilter(): void {
    this.selectedCategory = null;
    this.applyFilters();
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.applyFilters();
  }

  clearAllFilters(): void {
    this.selectedCategory = null;
    this.searchQuery = '';
    this.filteredNotifications = [...this.notifications];
  }

  markAsRead(notification: Notification): void {
    if (!notification.read) {
      notification.read = true;
      this.calculateUnreadCount();
    }
  }

  markAllAsRead(): void {
    let hasUnread = false;
    this.notifications.forEach(notification => {
      if (!notification.read) {
        notification.read = true;
        hasUnread = true;
      }
    });
    
    if (hasUnread) {
      this.calculateUnreadCount();
    }
  }

  calculateUnreadCount(): void {
    this.unreadCount = this.notifications.filter(n => !n.read).length;
  }

  toggleFilterMenu(): void {
    // This could be used to show/hide a more complex filter menu
    console.log('Toggle filter menu');
  }

  closePanel(): void {
    this.isOpen = false;
    this.updateBodyScrolling();
    this.closeNotification.emit();
  }

  getFormattedDate(timestamp: Date): string {
    // Simple date formatting based on how recent the notification is
    const now = new Date();
    const timeDiff = now.getTime() - new Date(timestamp).getTime();
    const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
    
    if (dayDiff === 0) {
      return 'Just Now';
    } else if (dayDiff === 1) {
      return 'Yesterday';
    } else if (dayDiff < 7) {
      return `${dayDiff} days ago`;
    } else {
      return new Date(timestamp).toLocaleDateString();
    }
  }
} 