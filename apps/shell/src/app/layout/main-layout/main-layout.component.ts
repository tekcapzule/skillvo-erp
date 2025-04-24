import { Component, OnInit, HostListener } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  standalone: false
})
export class MainLayoutComponent implements OnInit {
  isHandset$: Observable<boolean>;
  sidenavCollapsed = false;
  mobileNavOpen = false;
  isMobile = false;
    
  constructor(private breakpointObserver: BreakpointObserver) {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        tap(isHandset => {
          this.isMobile = isHandset;
          // Reset mobile nav open state when switching between desktop and mobile
          if (!isHandset) {
            this.mobileNavOpen = false;
          }
        }),
        shareReplay()
      );
  }

  ngOnInit(): void {
    console.log('Main layout component initialized');
    // Check initial screen size
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  checkScreenSize(): void {
    this.isMobile = window.innerWidth < 768;
  }

  /**
   * Toggle sidenav collapsed state on desktop
   */
  toggleSidenav(): void {
    this.sidenavCollapsed = !this.sidenavCollapsed;
  }
  
  /**
   * Toggle mobile navigation visibility
   */
  toggleMobileNav(): void {
    if (this.isMobile) {
      this.mobileNavOpen = !this.mobileNavOpen;
    } else {
      // On desktop, toggle between collapsed and expanded
      this.sidenavCollapsed = !this.sidenavCollapsed;
    }
  }
  
  /**
   * Close mobile navigation
   */
  closeMobileNav(): void {
    this.mobileNavOpen = false;
  }
} 