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
    path: 'companies',
    loadChildren: () => import('./feature-modules/companies/companies.module').then(m => m.CompaniesModule),
    data: { breadcrumb: 'Companies' }
  },
  {
    path: 'users',
    loadChildren: () => import('./feature-modules/users/users.module').then(m => m.UsersModule),
    data: { breadcrumb: 'Users' }
  },
  {
    path: 'content',
    loadChildren: () => import('./feature-modules/content/content.module').then(m => m.ContentModule),
    data: { breadcrumb: 'Content' }
  },
  {
    path: 'groups',
    loadChildren: () => import('./feature-modules/groups/groups.module').then(m => m.GroupsModule),
    data: { breadcrumb: 'Groups' }
  },
  {
    path: 'roles',
    loadChildren: () => import('./feature-modules/roles/roles.module').then(m => m.RolesModule),
    data: { breadcrumb: 'Roles' }
  },
  {
    path: 'settings',
    loadChildren: () => import('./feature-modules/settings/settings.module').then(m => m.SettingsModule),
    data: { breadcrumb: 'Settings' }
  },
  {
    path: 'audits',
    loadChildren: () => import('./feature-modules/audits/audits.module').then(m => m.AuditsModule),
    data: { breadcrumb: 'Audits' }
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
