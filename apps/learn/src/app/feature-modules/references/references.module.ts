import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferencesRoutingModule } from './references-routing.module';
import { ReferencesHomeComponent } from './pages/references-home.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReferencesRoutingModule,
    ReferencesHomeComponent
  ]
})
export class ReferencesModule { }
