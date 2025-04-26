import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Import the components for learnings and tasks
import { LearningsComponent } from './pages/learnings.component';
import { TasksComponent } from './pages/tasks.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'learnings',
    pathMatch: 'full'
  },
  {
    path: 'learnings',
    component: LearningsComponent,
    data: { breadcrumb: 'Learnings' }
  },
  {
    path: 'tasks',
    component: TasksComponent,
    data: { breadcrumb: 'Tasks' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule { } 