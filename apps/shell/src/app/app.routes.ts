import { Route } from '@angular/router';
import { AppType } from './core/services/menu.service';

// Helper function to create app routes configuration
const createAppRoutes = (appName: AppType): Route => {
  const appPath = appName;
  return {
    path: appPath,
    data: { breadcrumb: appPath.charAt(0).toUpperCase() + appPath.slice(1) },
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import(`../../../${appName}/src/app/feature-modules/dashboard/dashboard.module`).then(m => m.DashboardModule),
        data: { breadcrumb: 'Home' }
      },
      ...(appName !== 'admin' ? [
        {
          path: 'activity',
          loadChildren: () => {
            if (appName === 'learn') {
              return import(`../../../learn/src/app/feature-modules/activity/activity.module`).then(m => m.ActivityModule);
            } else {
              return import(`../../../${appName}/src/app/feature-modules/my-activities/my-activities.module`).then(m => m.MyActivitiesModule);
            }
          },
          data: { breadcrumb: 'My Activity' }
        }
      ] : []),
      // Common modules across all apps
      {
        path: 'calendar',
        loadChildren: () => import(`../../../${appName}/src/app/feature-modules/calendar/calendar.module`).then(m => m.CalendarModule),
        data: { breadcrumb: 'Calendar' }
      },
      {
        path: 'reports',
        loadChildren: () => import(`../../../${appName}/src/app/feature-modules/reports/reports.module`).then(m => m.ReportsModule),
        data: { breadcrumb: 'Reports' }
      },
      {
        path: 'help',
        loadChildren: () => import(`../../../${appName}/src/app/feature-modules/help/help.module`).then(m => m.HelpModule),
        data: { breadcrumb: 'Help' }
      },
      // App-specific routes
      ...(appName === 'learn' ? [
        {
          path: 'courses',
          loadChildren: () => import(`../../../learn/src/app/feature-modules/courses/courses.module`).then(m => m.CoursesModule),
          data: { breadcrumb: 'Courses' }
        },
        {
          path: 'references',
          loadChildren: () => import(`../../../learn/src/app/feature-modules/references/references.module`).then(m => m.ReferencesModule),
          data: { breadcrumb: 'References' }
        },
        {
          path: 'tests',
          loadChildren: () => import(`../../../learn/src/app/feature-modules/tests/tests.module`).then(m => m.TestsModule),
          data: { breadcrumb: 'Tests' }
        },
        {
          path: 'batches',
          loadChildren: () => import(`../../../learn/src/app/feature-modules/batches/batches.module`).then(m => m.BatchesModule),
          data: { breadcrumb: 'Batches' }
        }
      ] : []),
      ...(appName === 'hire' ? [
        {
          path: 'jobs',
          loadChildren: () => import(`../../../hire/src/app/feature-modules/jobs/jobs.module`).then(m => m.JobsModule),
          data: { breadcrumb: 'Jobs' }
        },
        {
          path: 'interviews',
          loadChildren: () => import(`../../../hire/src/app/feature-modules/interviews/interviews.module`).then(m => m.InterviewsModule),
          data: { breadcrumb: 'Interviews' }
        },
        {
          path: 'cvs',
          loadChildren: () => import(`../../../hire/src/app/feature-modules/screen-cvs/screen-cvs.module`).then(m => m.ScreenCvsModule),
          data: { breadcrumb: 'Screen CVs' }
        },
        {
          path: 'tests',
          loadChildren: () => import(`../../../hire/src/app/feature-modules/tests/tests.module`).then(m => m.TestsModule),
          data: { breadcrumb: 'Tests' }
        }
      ] : []),
      ...(appName === 'admin' ? [
        {
          path: 'companies',
          loadChildren: () => import(`../../../admin/src/app/feature-modules/companies/companies.module`).then(m => m.CompaniesModule),
          data: { breadcrumb: 'Companies' }
        },
        {
          path: 'users',
          loadChildren: () => import(`../../../admin/src/app/feature-modules/users/users.module`).then(m => m.UsersModule),
          data: { breadcrumb: 'Users' }
        },
        {
          path: 'content',
          loadChildren: () => import(`../../../admin/src/app/feature-modules/content/content.module`).then(m => m.ContentModule),
          data: { breadcrumb: 'Content' }
        },
        {
          path: 'groups',
          loadChildren: () => import(`../../../admin/src/app/feature-modules/groups/groups.module`).then(m => m.GroupsModule),
          data: { breadcrumb: 'Groups' }
        },
        {
          path: 'roles',
          loadChildren: () => import(`../../../admin/src/app/feature-modules/roles/roles.module`).then(m => m.RolesModule),
          data: { breadcrumb: 'Roles' }
        },
        {
          path: 'settings',
          loadChildren: () => import(`../../../admin/src/app/feature-modules/settings/settings.module`).then(m => m.SettingsModule),
          data: { breadcrumb: 'Settings' }
        },
        {
          path: 'audits',
          loadChildren: () => import(`../../../admin/src/app/feature-modules/audits/audits.module`).then(m => m.AuditsModule),
          data: { breadcrumb: 'Audits' }
        }
      ] : [])
    ]
  };
};

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'learn/home',
    pathMatch: 'full'
  },
  createAppRoutes('learn'),
  createAppRoutes('hire'),
  createAppRoutes('onboard'),
  createAppRoutes('admin'),
  {
    path: '**',
    redirectTo: 'learn/home'
  }
];
