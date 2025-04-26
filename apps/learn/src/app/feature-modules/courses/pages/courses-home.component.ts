import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses-home.component.html',
  styleUrls: ['./courses-home.component.scss']
})
export class CoursesHomeComponent implements OnInit {
  constructor() {
    console.log('Courses Home Component initialized');
  }

  ngOnInit(): void {
    // Initialize courses component
  }
} 