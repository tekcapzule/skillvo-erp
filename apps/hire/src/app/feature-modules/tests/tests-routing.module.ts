import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestsHomeComponent } from './pages/tests-home.component';

const routes: Routes = [
  {
    path: '',
    component: TestsHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestsRoutingModule { }
