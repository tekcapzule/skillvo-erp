import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BatchesHomeComponent } from './pages/batches-home.component';

const routes: Routes = [
  {
    path: '',
    component: BatchesHomeComponent,
    data: { breadcrumb: 'Batches' }
  },
  {
    path: 'details/:id',
    component: BatchesHomeComponent, // Replace with actual component when created
    data: { breadcrumb: 'Batch Details' }
  },
  {
    path: 'join/:id',
    component: BatchesHomeComponent, // Replace with actual component when created
    data: { breadcrumb: 'Join Batch' }
  },
  {
    path: 'members/:id',
    component: BatchesHomeComponent, // Replace with actual component when created
    data: { breadcrumb: 'Batch Members' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BatchesRoutingModule { } 