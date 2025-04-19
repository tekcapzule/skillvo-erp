import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpHomeComponent } from './pages/help-home.component';

const routes: Routes = [
  {
    path: '',
    component: HelpHomeComponent,
    data: { breadcrumb: 'Help' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpRoutingModule { }
