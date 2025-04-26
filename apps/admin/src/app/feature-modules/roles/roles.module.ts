import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesHomeComponent } from './pages/roles-home.component';

@NgModule({
  imports: [
    CommonModule,
    RolesRoutingModule,
    RolesHomeComponent
  ]
})
export class RolesModule { }
