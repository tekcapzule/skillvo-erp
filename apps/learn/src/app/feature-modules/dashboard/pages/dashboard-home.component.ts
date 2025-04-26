import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {
  userName = 'John';
  inProgressCourses = 5;
  completedCourses = 12;
  averageScore = 85;

  constructor() { }

  ngOnInit(): void {
    // Load user data and statistics
  }
} 