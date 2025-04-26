import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsHomeComponent } from './pages/reports-home.component';

const routes: Routes = [
  {
    path: '',
    component: ReportsHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
