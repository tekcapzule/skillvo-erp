import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityHomeComponent } from './pages/activity-home.component';

const routes: Routes = [
  {
    path: '',
    component: ActivityHomeComponent,
    data: { breadcrumb: 'My Activity' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule { } 