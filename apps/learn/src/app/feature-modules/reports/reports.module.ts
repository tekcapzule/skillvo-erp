import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsHomeComponent } from './pages/reports-home.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    ReportsHomeComponent
  ]
})
export class ReportsModule { }
