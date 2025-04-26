import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterviewsRoutingModule } from './interviews-routing.module';
import { InterviewsHomeComponent } from './pages/interviews-home.component';

@NgModule({
  imports: [
    CommonModule,
    InterviewsRoutingModule,
    InterviewsHomeComponent
  ]
})
export class InterviewsModule { }
