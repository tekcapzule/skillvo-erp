import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
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
  @ViewChild('appSwitcherButton') appSwitcherButton!: ElementRef;

  isMenuOpen = false;
  
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

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigateTo(app: AppItem): void {
    this.router.navigate([app.route]);
    this.isMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event): void {
    if (this.isMenuOpen && 
        this.appSwitcherMenu && 
        this.appSwitcherButton && 
        !this.appSwitcherMenu.nativeElement.contains(event.target) && 
        !this.appSwitcherButton.nativeElement.contains(event.target)) {
      this.isMenuOpen = false;
    }
  }
} 