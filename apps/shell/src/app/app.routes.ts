import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'learn/home',
    pathMatch: 'full'
  },
  {
    path: 'learn',
    data: { breadcrumb: 'Learn' },
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('../../../learn/src/app/feature-modules/dashboard/dashboard.module').then(m => m.DashboardModule),
        data: { breadcrumb: 'Home' }
      },
      {
        path: 'activity',
        loadChildren: () => import('../../../learn/src/app/feature-modules/activity/activity.module').then(m => m.ActivityModule),
        data: { breadcrumb: 'My Activity' }
      },
      {
        path: 'courses',
        loadChildren: () => import('../../../learn/src/app/feature-modules/courses/courses.module').then(m => m.CoursesModule),
        data: { breadcrumb: 'Courses' }
      },
      {
        path: 'references',
        loadChildren: () => import('../../../learn/src/app/feature-modules/references/references.module').then(m => m.ReferencesModule),
        data: { breadcrumb: 'References' }
      },
      {
        path: 'calendar',
        loadChildren: () => import('../../../learn/src/app/feature-modules/calendar/calendar.module').then(m => m.CalendarModule),
        data: { breadcrumb: 'Calendar' }
      },
      {
        path: 'reports',
        loadChildren: () => import('../../../learn/src/app/feature-modules/reports/reports.module').then(m => m.ReportsModule),
        data: { breadcrumb: 'Reports' }
      },
      {
        path: 'help',
        loadChildren: () => import('../../../learn/src/app/feature-modules/help/help.module').then(m => m.HelpModule),
        data: { breadcrumb: 'Help' }
      }
    ]
  }
];
