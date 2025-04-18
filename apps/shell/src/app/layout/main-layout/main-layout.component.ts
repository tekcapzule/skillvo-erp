import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  standalone: false
})
export class MainLayoutComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatSidenav;
  isHandset$: Observable<boolean>;
  sidenavCollapsed = false;
    
  constructor(private breakpointObserver: BreakpointObserver) {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
      .pipe(
        map(result => result.matches),
        shareReplay()
      );
  }

  ngOnInit(): void {
    console.log('Main layout component initialized');
  }

  toggleSidenav(drawerRef?: MatSidenav): void {
    // Use passed drawer reference or the ViewChild reference
    const sidenavRef = drawerRef || this.drawer;
    
    // If on mobile, toggle opened/closed
    if (this.breakpointObserver.isMatched(Breakpoints.Handset)) {
      sidenavRef.toggle();
    } else {
      // On desktop, toggle between collapsed and expanded
      this.sidenavCollapsed = !this.sidenavCollapsed;
    }
  }
} 