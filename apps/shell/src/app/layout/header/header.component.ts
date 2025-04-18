import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false
})
export class HeaderComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();
  
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    // Register custom SVG icons
    this.registerIcons();
  }

  ngOnInit(): void {
    console.log('Header component initialized');
  }

  private registerIcons(): void {
    console.log('Registering header icons');
    const iconNames = ['app-switcher', 'notification', 'learn-app'];
    
    iconNames.forEach(iconName => {
      const iconUrl = `assets/icons/header/${iconName}.svg`;
      console.log(`Registering icon: ${iconName} from ${iconUrl}`);
      
      this.matIconRegistry.addSvgIcon(
        iconName,
        this.domSanitizer.bypassSecurityTrustResourceUrl(iconUrl)
      );
    });
  }
  
  toggleDarkMode(): void {
    // This will be implemented later with theme service
    console.log('Toggle dark mode');
  }
} 