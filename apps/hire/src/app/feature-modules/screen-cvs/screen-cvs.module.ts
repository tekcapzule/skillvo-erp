import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScreenCvsRoutingModule } from './screen-cvs-routing.module';
import { ScreenCvsHomeComponent } from './pages/screen-cvs-home.component';

@NgModule({
  imports: [
    CommonModule,
    ScreenCvsRoutingModule,
    ScreenCvsHomeComponent
  ]
})
export class ScreenCvsModule { }
