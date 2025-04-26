import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentHomeComponent } from './pages/content-home.component';

const routes: Routes = [
  {
    path: '',
    component: ContentHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
