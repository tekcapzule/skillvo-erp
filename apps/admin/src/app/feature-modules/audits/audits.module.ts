import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuditsRoutingModule } from './audits-routing.module';
import { AuditsHomeComponent } from './pages/audits-home.component';

@NgModule({
  imports: [
    CommonModule,
    AuditsRoutingModule,
    AuditsHomeComponent
  ]
})
export class AuditsModule { }
