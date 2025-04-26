import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobsHomeComponent } from './pages/jobs-home.component';

@NgModule({
  imports: [
    CommonModule,
    JobsRoutingModule,
    JobsHomeComponent
  ]
})
export class JobsModule { }
