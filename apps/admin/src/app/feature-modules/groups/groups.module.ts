import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsHomeComponent } from './pages/groups-home.component';

@NgModule({
  imports: [
    CommonModule,
    GroupsRoutingModule,
    GroupsHomeComponent
  ]
})
export class GroupsModule { }
