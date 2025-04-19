import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();
  
  isAppSwitcherOpen = false;
  
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router: Router
  ) {
    // Register custom SVG icons
    this.registerIcons();
  }

  ngOnInit(): void {
    console.log('Header component initialized');
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
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    // Get the element that was clicked
    const targetElement = event.target as HTMLElement;
    
    // Check if the click was inside the app switcher or the app switcher button
    const appSwitcherMenu = document.querySelector('.app-switcher-menu');
    const appSwitcherButton = document.querySelector('.app-switcher-button');
    
    if (this.isAppSwitcherOpen && 
        appSwitcherMenu && 
        appSwitcherButton && 
        !appSwitcherMenu.contains(targetElement) && 
        !appSwitcherButton.contains(targetElement)) {
      // Close the app switcher if the click was outside
      this.isAppSwitcherOpen = false;
    }
  }
  
  toggleAppSwitcher(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }
    this.isAppSwitcherOpen = !this.isAppSwitcherOpen;
  }
  
  toggleDarkMode(): void {
    // This will be implemented later with theme service
    console.log('Toggle dark mode');
  }
  
  navigateToApp(appName: string): void {
    console.log(`Navigating to ${appName} app`);
    
    // Implement the app navigation based on the app name
    switch (appName) {
      case 'learn':
        this.router.navigate(['/learn']);
        break;
      case 'hire':
        this.router.navigate(['/hire']);
        break;
      case 'onboard':
        this.router.navigate(['/onboard']);
        break;
      case 'admin':
        this.router.navigate(['/admin']);
        break;
      default:
        break;
    }
    
    // Close the app switcher after navigation
    this.isAppSwitcherOpen = false;
  }
} 