import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReferencesHomeComponent } from './pages/references-home.component';

const routes: Routes = [
  {
    path: '',
    component: ReferencesHomeComponent,
    data: { breadcrumb: 'References' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferencesRoutingModule { }
