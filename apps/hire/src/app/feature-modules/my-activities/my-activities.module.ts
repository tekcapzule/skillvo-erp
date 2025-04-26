import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyActivitiesRoutingModule } from './my-activities-routing.module';
import { MyActivitiesHomeComponent } from './pages/my-activities-home.component';

@NgModule({
  imports: [
    CommonModule,
    MyActivitiesRoutingModule,
    MyActivitiesHomeComponent
  ]
})
export class MyActivitiesModule { }
