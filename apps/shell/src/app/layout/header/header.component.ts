import { Component, OnInit, OnDestroy, Output, EventEmitter, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ThemeService, ThemeName } from '../../core/services/theme.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggleSidenav = new EventEmitter<void>();
  
  isAppSwitcherOpen = false;
  isNotificationPanelOpen = false;
  isProfilePanelOpen = false;
  private destroy$ = new Subject<void>();
  private currentTheme: ThemeName = 'light';
  
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router: Router,
    public themeService: ThemeService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    // Register custom SVG icons
    this.registerIcons();
  }

  ngOnInit(): void {
    console.log('Header component initialized');
    
    // Initialize theme
    this.currentTheme = this.themeService.isDarkMode() ? 'dark' : 'light';
    
    // Subscribe to theme changes
    this.themeService.currentTheme$
      .pipe(takeUntil(this.destroy$))
      .subscribe(theme => {
        this.currentTheme = theme;
        this.updateHeaderTheme(theme);
      });
      
    // Initialize theme
    this.updateHeaderTheme(this.currentTheme);
  }
  
  ngOnDestroy(): void {
    // Clean up subscriptions
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Updates the header's theme classes and attributes
   */
  private updateHeaderTheme(theme: ThemeName): void {
    const headerToolbar = this.el.nativeElement.querySelector('.header-toolbar');
    
    if (headerToolbar) {
      // Remove existing theme classes
      this.renderer.removeClass(headerToolbar, 'light-theme');
      this.renderer.removeClass(headerToolbar, 'dark-theme');
      this.renderer.removeClass(headerToolbar, 'ocean-theme');
      this.renderer.removeClass(headerToolbar, 'classic-theme');
      
      // Add current theme class
      this.renderer.addClass(headerToolbar, `${theme}-theme`);
      
      // Set data-theme attribute
      this.renderer.setAttribute(headerToolbar, 'data-theme', theme);
    }
  }

  private registerIcons(): void {
    console.log('Registering header icons');
    
    // Register app switcher icons
    const appSwitcherIcons = ['learn', 'hire', 'onboard', 'admin'];
    appSwitcherIcons.forEach(iconName => {
      // Use full path including leading slash
      const iconUrl = `/assets/icons/app-switcher/${iconName}.svg`;
      console.log(`Registering app icon: ${iconName} with URL: ${iconUrl}`);
      
      this.matIconRegistry.addSvgIcon(
        `app-${iconName}`,
        this.domSanitizer.bypassSecurityTrustResourceUrl(iconUrl)
      );
    });
    
    // Register other header icons
    const iconNames = ['app-switcher', 'notification', 'learn-app'];
    iconNames.forEach(iconName => {
      const iconUrl = `/assets/icons/header/${iconName}.svg`;
      console.log(`Registering header icon: ${iconName} with URL: ${iconUrl}`);
      
      this.matIconRegistry.addSvgIcon(
        iconName,
        this.domSanitizer.bypassSecurityTrustResourceUrl(iconUrl)
      );
    });
  }
  
  toggleAppSwitcher(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }
    this.isAppSwitcherOpen = !this.isAppSwitcherOpen;
    
    // Close other panels if open
    if (this.isNotificationPanelOpen) {
      this.isNotificationPanelOpen = false;
    }
    if (this.isProfilePanelOpen) {
      this.isProfilePanelOpen = false;
    }
  }
  
  closeAppSwitcher(): void {
    this.isAppSwitcherOpen = false;
  }
  
  toggleNotificationPanel(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }
    this.isNotificationPanelOpen = !this.isNotificationPanelOpen;
    
    // Close other panels if open
    if (this.isAppSwitcherOpen) {
      this.isAppSwitcherOpen = false;
    }
    if (this.isProfilePanelOpen) {
      this.isProfilePanelOpen = false;
    }
  }
  
  toggleProfilePanel(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }
    this.isProfilePanelOpen = !this.isProfilePanelOpen;
    
    // Close other panels if open
    if (this.isAppSwitcherOpen) {
      this.isAppSwitcherOpen = false;
    }
    if (this.isNotificationPanelOpen) {
      this.isNotificationPanelOpen = false;
    }
  }
  
  closeNotificationPanel(): void {
    this.isNotificationPanelOpen = false;
  }
  
  closeProfilePanel(): void {
    this.isProfilePanelOpen = false;
  }
  
  toggleDarkMode(): void {
    this.themeService.toggleDarkMode();
  }
} 