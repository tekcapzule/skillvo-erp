import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import { ActivityHomeComponent } from './pages/activity-home.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ActivityRoutingModule,
    ActivityHomeComponent
  ]
})
export class ActivityModule { } 