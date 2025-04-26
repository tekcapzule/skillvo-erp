import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import { LearningsComponent } from './pages/learnings.component';
import { TasksComponent } from './pages/tasks.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ActivityRoutingModule,
    LearningsComponent,
    TasksComponent
  ]
})
export class ActivityModule { } 