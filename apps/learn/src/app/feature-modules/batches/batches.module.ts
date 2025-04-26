import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatchesRoutingModule } from './batches-routing.module';
import { BatchesHomeComponent } from './pages/batches-home.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BatchesRoutingModule,
    BatchesHomeComponent
  ]
})
export class BatchesModule { } 