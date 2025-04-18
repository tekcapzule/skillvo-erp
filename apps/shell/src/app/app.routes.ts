import { Route } from '@angular/router';
import { PlaceholderComponent } from './layout/placeholder/placeholder.component';

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
        path: 'home',
        component: PlaceholderComponent,
        data: { breadcrumb: 'Home' }
      },
      {
        path: 'courses',
        component: PlaceholderComponent,
        data: { breadcrumb: 'Courses' }
      },
      {
        path: 'activity',
        data: { breadcrumb: 'My Activity' },
        children: [
          {
            path: '',
            component: PlaceholderComponent
          },
          {
            path: 'learnings',
            component: PlaceholderComponent,
            data: { breadcrumb: 'Learnings' }
          },
          {
            path: 'tasks',
            component: PlaceholderComponent,
            data: { breadcrumb: 'Tasks' }
          }
        ]
      },
      {
        path: 'references',
        component: PlaceholderComponent,
        data: { breadcrumb: 'References' }
      },
      {
        path: 'calendar',
        component: PlaceholderComponent,
        data: { breadcrumb: 'Calendar' }
      },
      {
        path: 'reports',
        component: PlaceholderComponent,
        data: { breadcrumb: 'Reports' }
      },
      {
        path: 'help',
        component: PlaceholderComponent,
        data: { breadcrumb: 'Help' }
      }
    ]
  }
];
