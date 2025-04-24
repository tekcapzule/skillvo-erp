import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

interface AppItem {
  name: string;
  path: string;
  letter?: string;
  color?: string;
  textColor?: string;
}

@Component({
  selector: 'app-switcher',
  templateUrl: './app-switcher.component.html',
  styleUrls: ['./app-switcher.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule]
})
export class AppSwitcherComponent implements OnInit {
  @ViewChild('appSwitcherMenu') appSwitcherMenu: ElementRef | undefined;
  
  @Input() 
  set isOpen(value: boolean) {
    this._isOpen = value;
    this.updateHostClasses();
  }
  
  get isOpen(): boolean {
    return this._isOpen;
  }
  
  @HostBinding('class.app-switcher-open') appSwitcherOpen = false;
  @HostBinding('class.app-switcher-visible') appSwitcherVisible = false;
  
  @Output() closeMenu = new EventEmitter<void>();
  
  private _isOpen = false;
  
  apps: AppItem[] = [
    { 
      name: 'Hire', 
      path: '/hire',
      letter: 'H',
      color: 'var(--primary-500)',
      textColor: '#ffffff'
    },
    { 
      name: 'Onboard', 
      path: '/onboard',
      letter: 'O',
      color: 'var(--primary-500)',
      textColor: '#ffffff'
    },
    { 
      name: 'Learn', 
      path: '/learn',
      letter: 'L',
      color: 'var(--primary-500)',
      textColor: '#ffffff'
    },
    { 
      name: 'Admin', 
      path: '/admin',
      letter: 'A',
      color: 'var(--primary-500)',
      textColor: '#ffffff'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateHostClasses();
  }
  
  private updateHostClasses(): void {
    this.appSwitcherOpen = this._isOpen;
    this.appSwitcherVisible = this._isOpen;
  }

  toggleAppSwitcher(): void {
    this.isOpen = !this._isOpen;
  }

  navigateTo(app: AppItem): void {
    this.router.navigate([app.path]);
    this.isOpen = false;
    this.closeMenu.emit();
  }

  getIconStyle(app: AppItem): { [key: string]: string } {
    return {
      'background-color': app.color || 'var(--primary-500)',
      'color': app.textColor || 'white'
    };
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.isOpen && this.appSwitcherMenu && !this.appSwitcherMenu.nativeElement.contains(event.target)) {
      this.isOpen = false;
      this.closeMenu.emit();
    }
  }
} 