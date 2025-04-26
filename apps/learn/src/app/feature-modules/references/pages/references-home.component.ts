import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-references-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './references-home.component.html',
  styleUrls: ['./references-home.component.scss']
})
export class ReferencesHomeComponent implements OnInit {
  constructor() {
    console.log('References Home Component initialized');
  }

  ngOnInit(): void {
    // Initialize references component
  }
} 