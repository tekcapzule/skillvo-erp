import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

// Component Imports
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';

// Notification Component
import { NotificationModule } from './notification/notification.module';

@NgModule({
  declarations: [
    HeaderComponent,
    SidenavComponent,
    MainLayoutComponent,
    BreadcrumbComponent,
    PlaceholderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatTooltipModule,
    NotificationModule
  ],
  exports: [
    MainLayoutComponent,
    PlaceholderComponent
  ]
})
export class LayoutModule { }
