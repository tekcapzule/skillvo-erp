import { Route } from '@angular/router';
import { MainLayoutComponent } from './layout/main/main-layout.component';
import { HomeComponent } from './pages/home/home.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      {
        path: 'action',
        children: [
          { path: '', redirectTo: 'button', pathMatch: 'full' },
          { 
            path: 'button', 
            loadComponent: () => import('./pages/action/button-demo/button-demo.component').then(m => m.ButtonDemoComponent) 
          }
        ]
      },
      // Other feature modules will be lazy loaded here
      { path: '**', redirectTo: 'home' }
    ]
  }
];
