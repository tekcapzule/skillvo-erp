import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestsRoutingModule } from './tests-routing.module';
import { TestsHomeComponent } from './pages/tests-home.component';

@NgModule({
  imports: [
    CommonModule,
    TestsRoutingModule,
    TestsHomeComponent
  ]
})
export class TestsModule { }
