import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesHomeComponent } from './pages/courses-home.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesHomeComponent,
    data: { breadcrumb: 'Courses' }
  },
  {
    path: 'details/:id',
    component: CoursesHomeComponent, // Replace with actual component when created
    data: { breadcrumb: 'Course Details' }
  },
  {
    path: 'learn/:id',
    component: CoursesHomeComponent, // Replace with actual component when created
    data: { breadcrumb: 'Learn' }
  },
  {
    path: 'assignments/:id',
    component: CoursesHomeComponent, // Replace with actual component when created
    data: { breadcrumb: 'Assignments' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
