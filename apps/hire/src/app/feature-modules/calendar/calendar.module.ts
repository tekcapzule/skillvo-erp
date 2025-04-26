import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarHomeComponent } from './pages/calendar-home.component';

@NgModule({
  imports: [
    CommonModule,
    CalendarRoutingModule,
    CalendarHomeComponent
  ]
})
export class CalendarModule { }
