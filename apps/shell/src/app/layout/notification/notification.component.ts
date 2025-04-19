import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

interface Notification {
  id: string;
  title: string;
  description: string;
  category: 'Course' | 'Certificate' | 'Reward' | 'Task';
  timestamp: string;
  read: boolean;
}

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ],
  template: `
    <div class="notification-overlay" *ngIf="isOpen" (click)="closeNotificationPanel()"></div>
    <div class="notification-panel" *ngIf="isOpen" [@slideInOut]>
      <div class="notification-header">
        <h2>Notification ({{ unreadCount }})</h2>
        <button mat-icon-button (click)="closeNotificationPanel()">
          <mat-icon>close</mat-icon>
        </button>
      </div>
      
      <div class="notification-search">
        <mat-form-field appearance="outline">
          <input matInput placeholder="Search notification">
          <mat-icon matPrefix>search</mat-icon>
          <button mat-icon-button matSuffix>
            <mat-icon>filter_list</mat-icon>
          </button>
        </mat-form-field>
      </div>
      
      <div class="notification-list">
        <div class="notification-item" *ngFor="let notification of notifications" [class.unread]="!notification.read">
          <div class="notification-content">
            <h3>{{ notification.title }}</h3>
            <p>{{ notification.description }}</p>
            <div class="notification-meta">
              <span class="category-tag" [ngClass]="notification.category.toLowerCase()">
                {{ notification.category }}
              </span>
              <span class="timestamp">{{ notification.timestamp }}</span>
            </div>
          </div>
        </div>
        
        <div class="empty-state" *ngIf="notifications.length === 0">
          <mat-icon>notifications_off</mat-icon>
          <p>No notifications yet</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .notification-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1000;
    }
    
    .notification-panel {
      position: fixed;
      top: 0;
      right: 0;
      height: 100vh;
      width: 380px;
      background-color: white;
      box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
      z-index: 1001;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    
    .notification-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 24px;
      border-bottom: 1px solid #e0e0e0;
      
      h2 {
        margin: 0;
        font-size: 20px;
        font-weight: 500;
      }
    }
    
    .notification-search {
      padding: 16px 24px;
      border-bottom: 1px solid #f0f0f0;
      
      mat-form-field {
        width: 100%;
      }
    }
    
    .notification-list {
      flex: 1;
      overflow-y: auto;
      padding: 0;
    }
    
    .notification-item {
      padding: 16px 24px;
      border-bottom: 1px solid #f0f0f0;
      cursor: pointer;
      transition: background-color 0.2s;
      
      &:hover {
        background-color: #f9f9f9;
      }
      
      &.unread {
        background-color: #f0f7ff;
        
        &:hover {
          background-color: #e3f2fd;
        }
      }
    }
    
    .notification-content {
      h3 {
        margin: 0 0 8px;
        font-size: 16px;
        font-weight: 500;
      }
      
      p {
        margin: 0 0 12px;
        color: #666;
        font-size: 14px;
        line-height: 1.4;
      }
    }
    
    .notification-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .category-tag {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 500;
      background-color: #e0e0e0;
      
      &.course {
        background-color: #e3f2fd;
        color: #1976d2;
      }
      
      &.certificate {
        background-color: #e8f5e9;
        color: #388e3c;
      }
      
      &.reward {
        background-color: #fff8e1;
        color: #ffa000;
      }
      
      &.task {
        background-color: #f3e5f5;
        color: #8e24aa;
      }
    }
    
    .timestamp {
      font-size: 12px;
      color: #9e9e9e;
    }
    
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 200px;
      color: #9e9e9e;
      
      mat-icon {
        font-size: 48px;
        height: 48px;
        width: 48px;
        margin-bottom: 16px;
      }
    }
    
    /* Responsive adjustments for mobile */
    @media screen and (max-width: 480px) {
      .notification-panel {
        width: 100%;
      }
    }
  `]
})
export class NotificationComponent {
  @Input() isOpen = false;
  @Output() closePanel = new EventEmitter<void>();
  
  unreadCount = 20;
  
  notifications: Notification[] = [
    {
      id: '1',
      title: 'Two New Courses Assigned',
      description: 'There are two new courses assigned to you, which mandatory and should be completed before the deadline given.',
      category: 'Course',
      timestamp: 'Just Now',
      read: false
    },
    {
      id: '2',
      title: 'Your course certificate is ready',
      description: 'There are two new courses assigned to you, which mandatory and should be completed before the deadline given.',
      category: 'Certificate',
      timestamp: '6 days ago',
      read: false
    },
    {
      id: '3',
      title: 'Time to redeem your reward',
      description: 'There are two new courses assigned to you, which mandatory and should be completed before the deadline given.',
      category: 'Reward',
      timestamp: '29/11/2024',
      read: false
    },
    {
      id: '4',
      title: 'Please complete the course assigned',
      description: 'There are two new courses assigned to you, which mandatory and should be completed before the deadline given.',
      category: 'Course',
      timestamp: '24/11/2024',
      read: true
    }
  ];
  
  constructor() {}
  
  closeNotificationPanel(): void {
    this.closePanel.emit();
  }
  
  markAsRead(notificationId: string): void {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification && !notification.read) {
      notification.read = true;
      this.recalculateUnreadCount();
    }
  }
  
  markAllAsRead(): void {
    this.notifications.forEach(notification => {
      notification.read = true;
    });
    this.recalculateUnreadCount();
  }
  
  private recalculateUnreadCount(): void {
    this.unreadCount = this.notifications.filter(n => !n.read).length;
  }
} 