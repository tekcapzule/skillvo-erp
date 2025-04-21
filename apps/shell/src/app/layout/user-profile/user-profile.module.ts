import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';

@NgModule({
  imports: [
    CommonModule,
    UserProfileComponent
  ],
  exports: [
    UserProfileComponent
  ]
})
export class UserProfileModule { } 