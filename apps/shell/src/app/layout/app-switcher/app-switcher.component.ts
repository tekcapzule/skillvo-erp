import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MenuService, AppType, AppDetails } from '../../core/services/menu.service';

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
  
  apps: AppDetails[] = [];

  constructor(
    private router: Router,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.updateHostClasses();
    this.apps = this.menuService.getAllApps();
  }
  
  private updateHostClasses(): void {
    this.appSwitcherOpen = this._isOpen;
    this.appSwitcherVisible = this._isOpen;
  }

  toggleAppSwitcher(): void {
    this.isOpen = !this._isOpen;
  }

  navigateTo(app: AppDetails): void {
    // Update the current app in the menu service
    this.menuService.setCurrentApp(app.appType);
    
    // Navigate to the app's path
    this.router.navigate([app.path]);
    
    // Close the app switcher
    this.isOpen = false;
    this.closeMenu.emit();
  }

  getIconStyle(app: AppDetails): { [key: string]: string } {
    return {
      'background-color': 'var(--primary-500)',
      'color': '#ffffff'
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