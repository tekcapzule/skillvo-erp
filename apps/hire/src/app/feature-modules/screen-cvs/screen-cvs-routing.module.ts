import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScreenCvsHomeComponent } from './pages/screen-cvs-home.component';

const routes: Routes = [
  {
    path: '',
    component: ScreenCvsHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScreenCvsRoutingModule { }
