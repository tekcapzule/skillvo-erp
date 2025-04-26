import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardHomeComponent } from './pages/dashboard-home.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DashboardHomeComponent
  ]
})
export class DashboardModule { }
