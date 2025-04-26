import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-learnings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './learnings.component.html',
  styleUrls: ['./learnings.component.scss']
})
export class LearningsComponent implements OnInit {
  constructor() {
    console.log('Learnings Component initialized');
  }

  ngOnInit(): void {
    // Initialize learnings component
  }
} 