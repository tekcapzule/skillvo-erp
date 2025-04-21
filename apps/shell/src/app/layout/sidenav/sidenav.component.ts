import { Component, OnInit, Output, EventEmitter, Input, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ThemeService, ThemeName } from '../../core/services/theme.service';
import { Subscription } from 'rxjs';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  children?: MenuItem[];
  expanded?: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  standalone: false
})
export class SidenavComponent implements OnInit, OnDestroy {
  @Output() toggleSidenav = new EventEmitter<void>();
  @Input() collapsed = false;
  
  private themeSubscription: Subscription | null = null;
  
  menuItems: MenuItem[] = [
    { label: 'Home', icon: 'home', route: '/learn/home' },
    { 
      label: 'My Activity', 
      icon: 'my-activities', 
      route: '/learn/activity',
      expanded: false,
      children: [
        { label: 'Learnings', icon: '', route: '/learn/activity/learnings' },
        { label: 'Tasks', icon: '', route: '/learn/activity/tasks' }
      ]
    },
    { label: 'Courses', icon: 'courses', route: '/learn/courses' },
    { label: 'References', icon: 'references', route: '/learn/references' },
    { label: 'Calendar', icon: 'calendar', route: '/learn/calendar' },
    { label: 'Reports', icon: 'reports', route: '/learn/reports' },
    { label: 'Help', icon: 'help', route: '/learn/help' },
  ];

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private themeService: ThemeService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    // Register custom SVG icons
    this.registerIcons();
  }

  ngOnInit(): void {
    // Subscribe to theme changes and update immediately
    this.themeSubscription = this.themeService.currentTheme$.subscribe(theme => {
      this.updateSidenavTheme(theme);
    });
    
    // Apply current theme on initialization
    if (this.themeService.isDarkMode()) {
      this.updateSidenavTheme('dark');
    } else {
      this.updateSidenavTheme('light');
    }
  }
  
  ngOnDestroy(): void {
    // Clean up subscription when component is destroyed
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  /**
   * Updates the sidenav element with the appropriate theme classes and attributes
   */
  private updateSidenavTheme(theme: ThemeName): void {
    const sidenavContainer = this.el.nativeElement.querySelector('.sidenav-container');
    
    if (sidenavContainer) {
      // Remove all theme classes
      this.renderer.removeClass(sidenavContainer, 'light-theme');
      this.renderer.removeClass(sidenavContainer, 'dark-theme');
      this.renderer.removeClass(sidenavContainer, 'ocean-theme');
      this.renderer.removeClass(sidenavContainer, 'classic-theme');
      
      // Add current theme class
      this.renderer.addClass(sidenavContainer, `${theme}-theme`);
      
      // Set data-theme attribute
      this.renderer.setAttribute(sidenavContainer, 'data-theme', theme);
    }
  }

  // Convert custom icon names to standard Material icons
  getStandardIcon(iconName: string): string {
    const iconMap: { [key: string]: string } = {
      'home': 'home',
      'my-activities': 'assessment',
      'courses': 'school',
      'references': 'library_books',
      'calendar': 'calendar_today',
      'reports': 'bar_chart',
      'help': 'help'
    };
    
    return iconMap[iconName] || 'circle';
  }

  private registerIcons(): void {
    const iconNames = [
      'home', 'my-activities', 'courses', 
      'references', 'calendar', 'reports', 'help'
    ];
    
    iconNames.forEach(iconName => {
      this.matIconRegistry.addSvgIcon(
        iconName,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/icons/menu/${iconName}.svg`)
      );
    });
  }

  toggleExpanded(item: MenuItem, event: Event): void {
    if (item.children) {
      event.preventDefault();
      event.stopPropagation();
      item.expanded = !item.expanded;
    }
  }
} 