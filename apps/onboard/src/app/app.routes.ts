import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadChildren: () => import('./feature-modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    data: { breadcrumb: 'Home' }
  },
  {
    path: 'activity',
    loadChildren: () => import('./feature-modules/my-activities/my-activities.module').then(m => m.MyActivitiesModule),
    data: { breadcrumb: 'My Activity' }
  },
  {
    path: 'calendar',
    loadChildren: () => import('./feature-modules/calendar/calendar.module').then(m => m.CalendarModule),
    data: { breadcrumb: 'Calendar' }
  },
  {
    path: 'reports',
    loadChildren: () => import('./feature-modules/reports/reports.module').then(m => m.ReportsModule),
    data: { breadcrumb: 'Reports' }
  },
  {
    path: 'help',
    loadChildren: () => import('./feature-modules/help/help.module').then(m => m.HelpModule),
    data: { breadcrumb: 'Help' }
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
