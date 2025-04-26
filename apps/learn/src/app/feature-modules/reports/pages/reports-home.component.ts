import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports-home.component.html',
  styleUrls: ['./reports-home.component.scss']
})
export class ReportsHomeComponent implements OnInit {
  constructor() {
    console.log('Reports Home Component initialized');
  }

  ngOnInit(): void {
    // Initialize reports component
  }
} 