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
          },
          { 
            path: 'button-group', 
            loadComponent: () => import('./pages/action/button-group-demo/button-group-demo.component').then(m => m.ButtonGroupDemoComponent) 
          },
          { 
            path: 'split-button', 
            loadComponent: () => import('./pages/action/split-button-demo/split-button-demo.component').then(m => m.SplitButtonDemoComponent) 
          },
          { 
            path: 'menu-button', 
            loadComponent: () => import('./pages/action/menu-button-demo/menu-button-demo.component').then(m => m.MenuButtonDemoComponent) 
          },
          { 
            path: 'floating-action-button', 
            loadComponent: () => import('./pages/action/floating-action-button-demo/floating-action-button-demo.component').then(m => m.FloatingActionButtonDemoComponent) 
          }
        ]
      },
      {
        path: 'input',
        children: [
          { path: '', redirectTo: 'controls', pathMatch: 'full' },
          { 
            path: 'controls', 
            loadComponent: () => import('./pages/input/controls-demo/controls-demo.component').then(m => m.ControlsDemoComponent) 
          },
          { 
            path: 'text-field', 
            loadComponent: () => import('./pages/input/text-field-demo/text-field-demo.component').then(m => m.TextFieldDemoComponent) 
          },
          { 
            path: 'password-field', 
            loadComponent: () => import('./pages/input/password-field-demo/password-field-demo.component').then(m => m.PasswordFieldDemoComponent) 
          },
          { 
            path: 'color-picker', 
            loadComponent: () => import('./pages/input/color-picker-demo/color-picker-demo.component').then(m => m.ColorPickerDemoComponent) 
          },
          { 
            path: 'date-time-picker', 
            loadComponent: () => import('./pages/input/date-time-picker-demo/date-time-picker-demo.component').then(m => m.DateTimePickerDemoComponent) 
          },
          { 
            path: 'file-upload', 
            loadComponent: () => import('./pages/input/file-upload-demo/file-upload-demo.component').then(m => m.FileUploadDemoComponent) 
          },
          { 
            path: 'number-input', 
            loadComponent: () => import('./pages/input/number-input-demo/number-input-demo.component').then(m => m.NumberInputDemoComponent) 
          },
          { 
            path: 'search-field', 
            loadComponent: () => import('./pages/input/search-field-demo/search-field-demo.component').then(m => m.SearchFieldDemoComponent) 
          }
        ]
      },
      {
        path: 'selection',
        children: [
          { path: '', redirectTo: 'checkbox', pathMatch: 'full' },
          { 
            path: 'checkbox', 
            loadComponent: () => import('./pages/selection/checkbox-demo/checkbox-demo.component').then(m => m.CheckboxDemoComponent) 
          }
        ]
      },
      // Other feature modules will be lazy loaded here
      { path: '**', redirectTo: 'home' }
    ]
  }
];
