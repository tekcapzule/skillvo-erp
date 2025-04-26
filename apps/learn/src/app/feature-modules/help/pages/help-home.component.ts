import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-help-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './help-home.component.html',
  styleUrls: ['./help-home.component.scss']
})
export class HelpHomeComponent implements OnInit {
  constructor() {
    console.log('Help Home Component initialized');
  }

  ngOnInit(): void {
    // Initialize help component
  }
} 