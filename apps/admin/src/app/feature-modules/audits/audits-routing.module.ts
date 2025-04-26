import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditsHomeComponent } from './pages/audits-home.component';

const routes: Routes = [
  {
    path: '',
    component: AuditsHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditsRoutingModule { }
