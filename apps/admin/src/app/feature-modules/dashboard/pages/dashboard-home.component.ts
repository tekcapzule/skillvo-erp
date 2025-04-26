import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'skillvo-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class DashboardHomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log('Dashboard home component initialized');
  }
} 