import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tests-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tests-home.component.html',
  styleUrls: ['./tests-home.component.scss']
})
export class TestsHomeComponent {
  constructor() {}
} 