import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import { ActivityHomeComponent } from './pages/activity-home.component';
import { LearningsComponent } from './pages/learnings.component';
import { TasksComponent } from './pages/tasks.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ActivityRoutingModule,
    ActivityHomeComponent,
    LearningsComponent,
    TasksComponent
  ]
})
export class ActivityModule { } 