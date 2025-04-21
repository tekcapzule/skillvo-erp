import { Component, OnInit, Output, EventEmitter, Input, HostListener } from '@angular/core';
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
  
  // Theme options
  themes: Theme[] = [
    { id: 'light', name: 'Light' },
    { id: 'dark', name: 'Dark' },
    { id: 'ocean', name: 'Ocean' },
    { id: 'classic', name: 'Classic' }
  ];
  selectedTheme: ThemeName = 'light';
  
  // Language options
  languages: Language[] = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'hi', name: 'Hindi' },
    { code: 'ar', name: 'Arabic' }
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
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to the current theme to update the selected value
    this.themeService.currentTheme$.subscribe(theme => {
      this.selectedTheme = theme;
    });
  }

  closePanel(): void {
    this.closeProfile.emit();
  }

  onThemeChange(themeId: ThemeName): void {
    this.selectedTheme = themeId;
    this.themeService.setTheme(themeId);
  }

  onLanguageChange(langCode: string): void {
    this.selectedLanguage = langCode;
    // Here we would implement language change logic
    console.log(`Language changed to ${langCode}`);
  }

  logout(): void {
    // Implement logout logic here
    console.log('Logging out...');
    // Typically we would clear authentication tokens and navigate to login
    this.router.navigate(['/login']);
  }
} 