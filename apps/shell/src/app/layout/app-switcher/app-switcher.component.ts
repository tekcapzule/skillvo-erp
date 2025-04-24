import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface AppItem {
  name: string;
  path: string;
  icon: string;
}

@Component({
  selector: 'app-switcher',
  templateUrl: './app-switcher.component.html',
  styleUrls: ['./app-switcher.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class AppSwitcherComponent implements OnInit {
  @ViewChild('appSwitcherMenu') appSwitcherMenu: ElementRef | undefined;
  
  @Input() isOpen = false;
  @Output() closeMenu = new EventEmitter<void>();
  
  apps: AppItem[] = [
    { 
      name: 'Hire', 
      path: '/hire', 
      icon: 'assets/icons/app-switcher/hire.svg'
    },
    { 
      name: 'Onboard', 
      path: '/onboard', 
      icon: 'assets/icons/app-switcher/onboard.svg'
    },
    { 
      name: 'Learn', 
      path: '/learn', 
      icon: 'assets/icons/app-switcher/learn.svg'
    },
    { 
      name: 'Admin', 
      path: '/admin', 
      icon: 'assets/icons/app-switcher/admin.svg'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  toggleAppSwitcher(): void {
    this.isOpen = !this.isOpen;
  }

  navigateTo(app: AppItem): void {
    this.router.navigate([app.path]);
    this.isOpen = false;
    this.closeMenu.emit();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.isOpen && this.appSwitcherMenu && !this.appSwitcherMenu.nativeElement.contains(event.target)) {
      this.isOpen = false;
      this.closeMenu.emit();
    }
  }
} 