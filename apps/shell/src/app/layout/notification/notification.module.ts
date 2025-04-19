import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';

@NgModule({
  imports: [
    CommonModule,
    NotificationComponent
  ],
  exports: [
    NotificationComponent
  ]
})
export class NotificationModule { } 