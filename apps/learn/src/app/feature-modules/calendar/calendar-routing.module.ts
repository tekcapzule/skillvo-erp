import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarHomeComponent } from './pages/calendar-home.component';

const routes: Routes = [
  {
    path: '',
    component: CalendarHomeComponent,
    data: { breadcrumb: 'Calendar' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
