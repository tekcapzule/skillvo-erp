import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterviewsHomeComponent } from './pages/interviews-home.component';

const routes: Routes = [
  {
    path: '',
    component: InterviewsHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterviewsRoutingModule { }
