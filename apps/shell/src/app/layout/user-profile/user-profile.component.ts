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
    // Theme service integration will be added later as requested
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