import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityHomeComponent } from './pages/activity-home.component';
// Import the components for learnings and tasks
import { LearningsComponent } from './pages/learnings.component';
import { TasksComponent } from './pages/tasks.component';

const routes: Routes = [
  {
    path: '',
    component: ActivityHomeComponent,
    data: { breadcrumb: 'My Activity' }
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