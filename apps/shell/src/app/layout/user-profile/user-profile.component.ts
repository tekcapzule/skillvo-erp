import { Component, OnInit, Output, EventEmitter, Input, HostListener, Renderer2, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { ThemeService, ThemeName } from '../../core/services/theme.service';
import { Router } from '@angular/router';

export interface Theme {
  id: ThemeName;
  name: string;
  description: string;
}

export interface Language {
  code: string;
  name: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
    MatDividerModule
  ]
})
export class UserProfileComponent implements OnInit {
  @Input() isOpen = false;
  @Output() closeProfile = new EventEmitter<void>();

  // User data
  fullName: string = 'John Doe';
  email: string = 'john.doe@example.com';
  initials: string = 'JD';
  
  // Theme options - only light and dark as specified
  themes: Theme[] = [
    { id: 'light', name: 'Light', description: 'Clean, bright interface for daytime use' },
    { id: 'dark', name: 'Dark', description: 'Reduced eye strain in low-light environments' }
  ];
  selectedTheme: ThemeName = 'light';
  
  // Language options
  languages: Language[] = [
    { code: 'en', name: 'English' }
  ];
  selectedLanguage: string = 'en';

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    // Only act if the profile panel is open
    if (!this.isOpen) return;
    
    // Get the element that was clicked
    const targetElement = event.target as HTMLElement;
    
    // Check if the click was inside the profile panel
    const profilePanel = document.querySelector('.profile-panel');
    const profileButton = document.querySelector('.user-profile');
    
    if (profilePanel && 
        profileButton && 
        !profilePanel.contains(targetElement) && 
        !profileButton.contains(targetElement) &&
        !targetElement.classList.contains('profile-overlay')) {
      this.closePanel();
    }
  }

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    // Subscribe to the current theme to update the selected value
    this.themeService.currentTheme$.subscribe(theme => {
      this.selectedTheme = theme;
      this.updateProfilePanelTheme(theme);
    });
  }

  /**
   * Ensures profile panel has the correct theme classes
   * This helps with theme inheritance in the overlay
   */
  private updateProfilePanelTheme(theme: ThemeName): void {
    const profilePanel = this.el.nativeElement.querySelector('.profile-panel');
    const profileOverlay = this.el.nativeElement.querySelector('.profile-overlay');
    
    if (profilePanel) {
      // Remove all theme classes
      this.renderer.removeClass(profilePanel, 'light-theme');
      this.renderer.removeClass(profilePanel, 'dark-theme');
      
      // Add current theme class
      this.renderer.addClass(profilePanel, `${theme}-theme`);
      
      // Set data-theme attribute
      this.renderer.setAttribute(profilePanel, 'data-theme', theme);
    }
    
    if (profileOverlay) {
      // Do the same for overlay
      this.renderer.removeClass(profileOverlay, 'light-theme');
      this.renderer.removeClass(profileOverlay, 'dark-theme');
      this.renderer.addClass(profileOverlay, `${theme}-theme`);
      this.renderer.setAttribute(profileOverlay, 'data-theme', theme);
    }
  }

  closePanel(): void {
    this.closeProfile.emit();
  }

  onThemeChange(themeId: ThemeName): void {
    // Update the selected theme
    this.selectedTheme = themeId;
    
    // Call the theme service to apply the theme
    this.themeService.setTheme(themeId);
    
    // Apply theme to profile panel immediately
    this.updateProfilePanelTheme(themeId);
    
    console.log(`Theme changed to ${themeId}`);
  }

  onLanguageChange(langCode: string): void {
    this.selectedLanguage = langCode;
    console.log(`Language changed to ${langCode}`);
  }

  logout(): void {
    console.log('Logging out...');
    this.router.navigate(['/login']);
  }
} 