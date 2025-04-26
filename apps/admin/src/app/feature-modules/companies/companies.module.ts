import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniesRoutingModule } from './companies-routing.module';
import { CompaniesHomeComponent } from './pages/companies-home.component';

@NgModule({
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    CompaniesHomeComponent
  ]
})
export class CompaniesModule { }
