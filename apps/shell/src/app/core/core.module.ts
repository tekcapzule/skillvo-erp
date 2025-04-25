import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from './services/menu.service';
import { ThemeService } from './services/theme.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ThemeService,
    MenuService
  ]
})
export class CoreModule { }
