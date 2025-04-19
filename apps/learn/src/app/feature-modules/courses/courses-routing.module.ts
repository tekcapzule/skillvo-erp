import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesHomeComponent } from './pages/courses-home.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesHomeComponent,
    data: { breadcrumb: 'Courses' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
