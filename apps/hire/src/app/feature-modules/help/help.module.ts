import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpRoutingModule } from './help-routing.module';
import { HelpHomeComponent } from './pages/help-home.component';

@NgModule({
  imports: [
    CommonModule,
    HelpRoutingModule,
    HelpHomeComponent
  ]
})
export class HelpModule { }
