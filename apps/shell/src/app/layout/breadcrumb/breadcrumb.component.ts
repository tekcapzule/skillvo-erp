import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs/operators';

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
export class BreadcrumbComponent implements OnInit {
  @Input() sidenavCollapsed = false;
  breadcrumbs: Breadcrumb[] = [];
  isHomePage = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged()
    ).subscribe((event: any) => {
      // Check if current URL path is home
      const currentUrl = this.router.url;
      this.isHomePage = this.checkIfHomePage(currentUrl);
      
      // Build breadcrumbs
      this.breadcrumbs = this.buildBreadcrumbs(this.activatedRoute.root);
      
      // Clean up breadcrumbs - remove redundant entries and app context
      this.cleanupBreadcrumbs();
    });

    // Initialize breadcrumbs
    this.breadcrumbs = this.buildBreadcrumbs(this.activatedRoute.root);
    this.cleanupBreadcrumbs();
    
    // Check if we're on the home page initially
    this.isHomePage = this.checkIfHomePage(this.router.url);
  }

  private checkIfHomePage(url: string): boolean {
    // Check for home pages with various patterns
    return url === '/' || 
           url === '/home' || 
           url === '/learn' || 
           url === '/learn/home' ||
           url.endsWith('/home') ||
           // Check if we only have one segment that isn't a specific page
           (url.split('/').filter(segment => segment).length <= 1 && 
            !url.includes('courses') && 
            !url.includes('profile'));
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
    
    // If all we have is "Home", consider this a home page and mark it accordingly
    if (this.breadcrumbs.length <= 1) {
      this.isHomePage = true;
    }
  }
} 