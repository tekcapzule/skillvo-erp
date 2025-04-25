import { Component, OnInit, Output, EventEmitter, Input, OnDestroy, ElementRef, Renderer2, HostListener } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ThemeService, ThemeName } from '../../core/services/theme.service';
import { MenuService, MenuItem, AppType } from '../../core/services/menu.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  standalone: false
})
export class SidenavComponent implements OnInit, OnDestroy {
  @Output() toggleSidenav = new EventEmitter<void>();
  @Input() collapsed = false;
  @Input() mobileOpen = false;
  
  private themeSubscription: Subscription | null = null;
  private menuSubscription: Subscription | null = null;
  private readonly MOBILE_BREAKPOINT = 768; // Match the breakpoint-md variable
  public isMobile = window.innerWidth < this.MOBILE_BREAKPOINT;
  public currentApp: AppType = 'learn';
  public menuItems: MenuItem[] = [];
  
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth < this.MOBILE_BREAKPOINT;
  }

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private themeService: ThemeService,
    private menuService: MenuService,
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
    
    // Subscribe to app changes and update menu
    this.menuSubscription = this.menuService.currentApp$.subscribe(app => {
      this.currentApp = app;
      this.updateMenu();
    });
    
    // Initialize menu with current app
    this.updateMenu();
  }
  
  /**
   * Update menu items based on current app
   */
  private updateMenu(): void {
    this.menuItems = this.menuService.getCurrentAppMenu();
  }
  
  ngOnDestroy(): void {
    // Clean up subscriptions when component is destroyed
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
    if (this.menuSubscription) {
      this.menuSubscription.unsubscribe();
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
      'help': 'help',
      'people': 'people',
      'work': 'work',
      'assessment': 'assessment',
      'settings': 'settings',
      'task': 'task_alt',
      'description': 'description',
      'content_copy': 'content_copy',
      'security': 'security',
      'business': 'business',
      'article': 'article',
      'quiz': 'quiz',
      'groups': 'groups',
      'assignment': 'assignment',
      'fact_check': 'fact_check'
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
  
  /**
   * Closes the mobile sidenav when a link is clicked
   */
  closeMobileNav(): void {
    if (this.isMobile) {
      this.mobileOpen = false;
      // Emit an event to notify the parent component to update its state
      this.toggleSidenav.emit();
    }
  }
} 