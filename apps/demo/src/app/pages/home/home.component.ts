import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'demo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    RouterModule
  ]
})
export class HomeComponent {
  componentCategories = [
    {
      title: 'Input',
      description: 'Components for collecting user input',
      icon: 'text_fields',
      route: '/input/text-field'
    },
    {
      title: 'Selection',
      description: 'Components for making selections',
      icon: 'check_box',
      route: '/selection/checkbox'
    },
    {
      title: 'Action',
      description: 'Components for performing actions',
      icon: 'touch_app',
      route: '/action/button'
    },
    {
      title: 'Navigation',
      description: 'Components for navigating the application',
      icon: 'navigation',
      route: '/navigation/nav-bar'
    },
    {
      title: 'Information',
      description: 'Components for displaying information',
      icon: 'info',
      route: '/information/label'
    },
    {
      title: 'Containers',
      description: 'Container components for organizing content',
      icon: 'dashboard',
      route: '/containers/card'
    },
    {
      title: 'Feedback',
      description: 'Components for providing user feedback',
      icon: 'notifications',
      route: '/feedback/alert'
    },
    {
      title: 'Data',
      description: 'Components for displaying data',
      icon: 'table_chart',
      route: '/data/table'
    }
  ];
} 