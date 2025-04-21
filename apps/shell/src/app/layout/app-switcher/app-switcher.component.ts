import { Component, OnInit, ViewChild, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

interface AppItem {
  name: string;
  icon: string;
  route: string;
  description?: string;
}

@Component({
  selector: 'app-app-switcher',
  templateUrl: './app-switcher.component.html',
  styleUrls: ['./app-switcher.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule]
})
export class AppSwitcherComponent implements OnInit {
  @ViewChild('appSwitcherMenu') appSwitcherMenu!: ElementRef;
  
  @Input() isOpen = false;
  @Output() closeMenu = new EventEmitter<void>();
  
  apps: AppItem[] = [
    {
      name: 'Hire',
      icon: 'person_search',
      route: '/hire',
      description: 'Find and hire talent'
    },
    {
      name: 'Onboard',
      icon: 'how_to_reg',
      route: '/onboard',
      description: 'Onboard new employees'
    },
    {
      name: 'Learn',
      icon: 'school',
      route: '/learn',
      description: 'Training and courses'
    },
    {
      name: 'Admin',
      icon: 'admin_panel_settings',
      route: '/admin',
      description: 'Administration'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateTo(app: AppItem): void {
    this.router.navigate([app.route]);
    this.close();
  }

  close(): void {
    this.closeMenu.emit();
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event): void {
    // Don't process if menu is not open
    if (!this.isOpen) return;
    
    // Check if the click was outside of the menu
    if (this.appSwitcherMenu && 
        !this.appSwitcherMenu.nativeElement.contains(event.target)) {
      // Only close if the click wasn't on the app switcher button in header
      // The header button has class 'app-switcher-button'
      const target = event.target as HTMLElement;
      const isHeaderButton = target.closest('.app-switcher-button') !== null;
      
      if (!isHeaderButton) {
        this.close();
      }
    }
  }
} 