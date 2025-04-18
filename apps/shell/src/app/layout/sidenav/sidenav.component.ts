import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

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
export class SidenavComponent implements OnInit {
  @Output() toggleSidenav = new EventEmitter<void>();
  @Input() collapsed = false;
  
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
    private domSanitizer: DomSanitizer
  ) {
    // Register custom SVG icons
    this.registerIcons();
  }

  ngOnInit(): void {
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