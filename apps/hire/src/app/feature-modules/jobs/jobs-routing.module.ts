import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsHomeComponent } from './pages/jobs-home.component';

const routes: Routes = [
  {
    path: '',
    component: JobsHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
