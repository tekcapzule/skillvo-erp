import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type AppType = 'learn' | 'hire' | 'onboard' | 'admin';

export interface MenuItem {
  label: string;
  icon: string;
  route: string;
  children?: MenuItem[];
  expanded?: boolean;
  exact?: boolean;
}

export interface AppDetails {
  name: string;
  icon: string;
  appType: AppType;
  path: string;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private currentAppSubject = new BehaviorSubject<AppType>('learn');
  public currentApp$ = this.currentAppSubject.asObservable();

  // App details mapping
  private appDetails: Record<AppType, AppDetails> = {
    learn: {
      name: 'Learn',
      icon: 'school',
      appType: 'learn',
      path: '/learn'
    },
    hire: {
      name: 'Hire',
      icon: 'work',
      appType: 'hire',
      path: '/hire'
    },
    onboard: {
      name: 'Onboard',
      icon: 'person_add',
      appType: 'onboard',
      path: '/onboard'
    },
    admin: {
      name: 'Admin',
      icon: 'admin_panel_settings',
      appType: 'admin',
      path: '/admin'
    }
  };

  constructor() {
    // Load last selected app from storage
    const lastApp = localStorage.getItem('currentApp') as AppType;
    if (lastApp && ['learn', 'hire', 'onboard', 'admin'].includes(lastApp)) {
      this.setCurrentApp(lastApp);
    }
  }

  /**
   * Set the current app and persist selection
   */
  setCurrentApp(app: AppType): void {
    this.currentAppSubject.next(app);
    localStorage.setItem('currentApp', app);
  }

  /**
   * Get current app value directly
   */
  getCurrentApp(): AppType {
    return this.currentAppSubject.value;
  }

  /**
   * Get current app details
   */
  getCurrentAppDetails(): AppDetails {
    return this.getAppDetails(this.currentAppSubject.value);
  }

  /**
   * Get details for a specific app
   */
  getAppDetails(app: AppType): AppDetails {
    return this.appDetails[app];
  }

  /**
   * Get all available apps details
   */
  getAllApps(): AppDetails[] {
    return Object.values(this.appDetails);
  }

  /**
   * Get menu for the current app
   */
  getCurrentAppMenu(): MenuItem[] {
    return this.getMenuForApp(this.currentAppSubject.value);
  }

  /**
   * Get menu for a specific app
   */
  getMenuForApp(app: AppType): MenuItem[] {
    switch (app) {
      case 'learn':
        return this.getLearnMenu();
      case 'hire':
        return this.getHireMenu();
      case 'onboard':
        return this.getOnboardMenu();
      case 'admin':
        return this.getAdminMenu();
      default:
        return this.getLearnMenu();
    }
  }

  /**
   * Get menu for the Learn app
   */
  private getLearnMenu(): MenuItem[] {
    return [
      { label: 'Home', icon: 'home', route: '/learn/home', exact: true },
      { 
        label: 'My Activity', 
        icon: 'my-activities', 
        route: '/learn/activity',
        expanded: false,
        children: [
          { label: 'Learnings', icon: '', route: '/learn/activity/learnings', exact: true },
          { label: 'Tasks', icon: '', route: '/learn/activity/tasks', exact: true }
        ]
      },
      { label: 'Courses', icon: 'courses', route: '/learn/courses', exact: false },
      { label: 'References', icon: 'references', route: '/learn/references', exact: false },
      { label: 'Tests', icon: 'quiz', route: '/learn/tests', exact: false },
      { label: 'Batches', icon: 'groups', route: '/learn/batches', exact: false },
      { label: 'Calendar', icon: 'calendar', route: '/learn/calendar', exact: false },
      { label: 'Reports', icon: 'reports', route: '/learn/reports', exact: false },
      { label: 'Help', icon: 'help', route: '/learn/help', exact: false },
    ];
  }

  /**
   * Get menu for the Hire app
   */
  private getHireMenu(): MenuItem[] {
    return [
      { label: 'Home', icon: 'home', route: '/hire/home', exact: true },
      { 
        label: 'My Activity', 
        icon: 'my-activities', 
        route: '/hire/activity',
        expanded: false,
        children: [
          { label: 'Jobs', icon: '', route: '/hire/activity/jobs', exact: true },
          { label: 'Tasks', icon: '', route: '/hire/activity/tasks', exact: true }
        ]
      },
      { label: 'Jobs', icon: 'work', route: '/hire/jobs', exact: false },
      { label: 'Interviews', icon: 'people', route: '/hire/interviews', exact: false },
      { label: 'Screen CVs', icon: 'assignment', route: '/hire/cvs', exact: false },
      { label: 'Tests', icon: 'quiz', route: '/hire/tests', exact: false },
      { label: 'Calendar', icon: 'calendar', route: '/hire/calendar', exact: false },
      { label: 'Reports', icon: 'reports', route: '/hire/reports', exact: false },
      { label: 'Help', icon: 'help', route: '/hire/help', exact: false },
    ];
  }

  /**
   * Get menu for the Onboard app
   */
  private getOnboardMenu(): MenuItem[] {
    return [
      { label: 'Home', icon: 'home', route: '/onboard/home', exact: true },
      { 
        label: 'My Activity', 
        icon: 'my-activities', 
        route: '/onboard/activity',
        expanded: false,
        children: [
          { label: 'Learnings', icon: '', route: '/onboard/activity/learnings', exact: true },
          { label: 'Tasks', icon: '', route: '/onboard/activity/tasks', exact: true }
        ]
      },
      { label: 'Calendar', icon: 'calendar', route: '/onboard/calendar', exact: false },
      { label: 'Reports', icon: 'reports', route: '/onboard/reports', exact: false },
      { label: 'Help', icon: 'help', route: '/onboard/help', exact: false },
    ];
  }

  /**
   * Get menu for the Admin app
   */
  private getAdminMenu(): MenuItem[] {
    return [
      { label: 'Home', icon: 'home', route: '/admin/home', exact: true },
      { label: 'Companies', icon: 'business', route: '/admin/companies', exact: false },
      { label: 'Users', icon: 'people', route: '/admin/users', exact: false },
      { 
        label: 'Content', 
        icon: 'article', 
        route: '/admin/content',
        expanded: false,
        children: [
          { label: 'Courses', icon: '', route: '/admin/content/courses', exact: true },
          { label: 'References', icon: '', route: '/admin/content/references', exact: true }
        ]
      },
      { label: 'Groups', icon: 'groups', route: '/admin/groups', exact: false },
      { label: 'Roles', icon: 'security', route: '/admin/roles', exact: false },
      { label: 'Audits', icon: 'fact_check', route: '/admin/audits', exact: false },
      { label: 'Settings', icon: 'settings', route: '/admin/settings', exact: false },
      { label: 'Reports', icon: 'reports', route: '/admin/reports', exact: false },
      { label: 'Help', icon: 'help', route: '/admin/help', exact: false },
    ];
  }
} 