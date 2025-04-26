import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { ContentHomeComponent } from './pages/content-home.component';

@NgModule({
  imports: [
    CommonModule,
    ContentRoutingModule,
    ContentHomeComponent
  ]
})
export class ContentModule { }
