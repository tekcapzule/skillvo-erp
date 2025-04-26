import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyActivitiesHomeComponent } from './pages/my-activities-home.component';

const routes: Routes = [
  {
    path: '',
    component: MyActivitiesHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyActivitiesRoutingModule { }
