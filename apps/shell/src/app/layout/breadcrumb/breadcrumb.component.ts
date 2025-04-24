import { Component, OnInit, Input, OnDestroy, ElementRef, Renderer2, ChangeDetectorRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ThemeService, ThemeName } from '../../core/services/theme.service';
import { Subscription, Subject } from 'rxjs';

interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  standalone: false
})
export class BreadcrumbComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @Input() sidenavCollapsed = false;
  breadcrumbs: Breadcrumb[] = [];
  isHomePage = true; // Default to true to initially hide breadcrumbs on home
  
  private destroy$ = new Subject<void>();
  private currentTheme: ThemeName = 'light';
  private readonly HOME_ROUTES = [
    '/',
    '/home',
    '/learn',
    '/learn/home',
    '/hire',
    '/hire/home',
    '/onboard',
    '/onboard/home',
    '/admin',
    '/admin/home'
  ];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private themeService: ThemeService,
    private el: ElementRef,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Initialize breadcrumbs
    this.breadcrumbs = this.buildBreadcrumbs(this.activatedRoute.root);
    this.cleanupBreadcrumbs();
    
    // Check if we're on the home page initially
    this.isHomePage = this.checkIfHomePage(this.router.url);
    
    // Initialize theme from service
    this.currentTheme = this.themeService.isDarkMode() ? 'dark' : 'light';
    
    // Subscribe to router events to update breadcrumbs and home page status
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      // Check if current URL path is home
      const currentUrl = this.router.url;
      this.isHomePage = this.checkIfHomePage(currentUrl);
      
      // Build breadcrumbs
      this.breadcrumbs = this.buildBreadcrumbs(this.activatedRoute.root);
      
      // Clean up breadcrumbs - remove redundant entries and app context
      this.cleanupBreadcrumbs();
      
      // Make sure to apply theme after navigation
      setTimeout(() => {
        this.updateBreadcrumbTheme(this.currentTheme);
        this.cdr.detectChanges();
      });
    });
    
    // Subscribe to theme changes
    this.themeService.currentTheme$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(theme => {
      this.currentTheme = theme;
      this.updateBreadcrumbTheme(theme);
    });
  }
  
  ngAfterViewInit(): void {
    // Apply theme after view is initialized with a delay
    // to ensure elements are in the DOM
    setTimeout(() => {
      this.updateBreadcrumbTheme(this.currentTheme);
    }, 10);
  }
  
  ngOnDestroy(): void {
    // Clean up subscriptions when component is destroyed
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    // When sidenav collapsed state changes, update the UI accordingly
    if (changes['sidenavCollapsed'] && !changes['sidenavCollapsed'].firstChange) {
      // Force a detection cycle to ensure the UI updates
      this.cdr.detectChanges();
    }
  }
  
  /**
   * Updates the breadcrumb's theme classes and attributes.
   * Includes handling for both main breadcrumb and theme placeholder elements.
   */
  private updateBreadcrumbTheme(theme: ThemeName): void {
    // Store current theme even if we can't apply it immediately
    this.currentTheme = theme;
    
    // Apply theme to all breadcrumb containers, including the theme placeholder
    const elements = this.el.nativeElement.querySelectorAll('.breadcrumb-container');
    
    if (elements && elements.length > 0) {
      elements.forEach((element: Element) => {
        if (element) {
          // Remove all theme classes
          element.classList.remove('light-theme', 'dark-theme', 'ocean-theme', 'classic-theme');
          
          // Add current theme class
          element.classList.add(`${theme}-theme`);
          
          // Set data-theme attribute
          element.setAttribute('data-theme', theme);
        }
      });
    }
  }

  private checkIfHomePage(url: string): boolean {
    // First check against our predefined list of home routes
    if (this.HOME_ROUTES.includes(url)) {
      return true;
    }
    
    // Check if URL ends with /home
    if (url.endsWith('/home')) {
      return true;
    }
    
    // Check if we only have one segment that isn't a specific page
    const segments = url.split('/').filter(segment => segment.length > 0);
    if (segments.length <= 1) {
      // If only one segment and not a specific feature page
      return !segments.some(segment => 
        ['courses', 'profile', 'calendar', 'references', 'reports'].includes(segment)
      );
    }
    
    return false;
  }

  private buildBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    // If no routeConfig is available we are on the root path
    const label = route.routeConfig?.data?.['breadcrumb'] || 'Home';
    const path = route.routeConfig?.path || '';
    
    // In the routeConfig the complete path is not available,
    // so we rebuild it each time
    const nextUrl = path ? `${url}/${path}` : url;
    const breadcrumb = {
      label: label,
      url: nextUrl
    };

    // Only adding route with non-empty label
    const newBreadcrumbs = breadcrumb.label ? [...breadcrumbs, breadcrumb] : [...breadcrumbs];

    if (route.firstChild) {
      // If we are not on our current path yet,
      // there will be more children to look after, to build our breadcrumb
      return this.buildBreadcrumbs(route.firstChild, nextUrl, newBreadcrumbs);
    }

    return newBreadcrumbs;
  }
  
  private cleanupBreadcrumbs(): void {
    if (!this.breadcrumbs || this.breadcrumbs.length === 0) return;
    
    // Make a copy of the original breadcrumbs
    const cleanedBreadcrumbs: Breadcrumb[] = [];
    
    // Always include Home as the first breadcrumb if available
    if (this.breadcrumbs.length > 0 && this.breadcrumbs[0].label === 'Home') {
      cleanedBreadcrumbs.push(this.breadcrumbs[0]);
    }
    
    // Skip the app context (like 'learn') and look for duplicates
    const seen = new Set<string>();
    
    // Track if we're in the My Activity section
    let hasMyActivities = false;
    
    // Add the last path segments without duplicates or app context
    for (let i = 1; i < this.breadcrumbs.length; i++) {
      const crumb = this.breadcrumbs[i];
      
      // Skip 'learn' context (or other app contexts)
      if (['learn', 'hire', 'onboard', 'admin', 'home'].includes(crumb.label.toLowerCase())) {
        continue;
      }
      
      // Special case for My Activity and its children
      if (crumb.label === 'My Activity') {
        hasMyActivities = true;
        cleanedBreadcrumbs.push(crumb);
        continue;
      }
      
      // Allow Learnings and Tasks as child routes of My Activity
      if (hasMyActivities && (crumb.label === 'Learnings' || crumb.label === 'Tasks')) {
        cleanedBreadcrumbs.push(crumb);
        continue;
      }
      
      // Skip if this label has been seen before (avoids duplicates like courses/courses)
      if (seen.has(crumb.label.toLowerCase())) {
        continue;
      }
      
      seen.add(crumb.label.toLowerCase());
      cleanedBreadcrumbs.push(crumb);
    }
    
    this.breadcrumbs = cleanedBreadcrumbs;
    
    // If all we have is "Home", consider this a home page and hide breadcrumbs
    if (this.breadcrumbs.length <= 1) {
      this.isHomePage = true;
    }
  }
} 