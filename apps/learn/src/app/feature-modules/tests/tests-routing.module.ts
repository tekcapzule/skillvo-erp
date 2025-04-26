import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestsHomeComponent } from './pages/tests-home.component';

const routes: Routes = [
  {
    path: '',
    component: TestsHomeComponent,
    data: { breadcrumb: 'Tests' }
  },
  {
    path: 'details/:id',
    component: TestsHomeComponent, // Replace with actual component when created
    data: { breadcrumb: 'Test Details' }
  },
  {
    path: 'take/:id',
    component: TestsHomeComponent, // Replace with actual component when created
    data: { breadcrumb: 'Take Test' }
  },
  {
    path: 'results/:id',
    component: TestsHomeComponent, // Replace with actual component when created
    data: { breadcrumb: 'Test Results' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestsRoutingModule { } 