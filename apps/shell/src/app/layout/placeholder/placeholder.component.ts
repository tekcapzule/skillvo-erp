import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-placeholder',
  template: `
    <div class="placeholder-container">
      <h1>{{ title }} Page</h1>
      <p>This page is under construction.</p>
    </div>
  `,
  styles: [`
    .placeholder-container {
      padding: 24px;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h1 {
      margin-top: 0;
      color: #1976d2;
    }
  `],
  standalone: false
})
export class PlaceholderComponent implements OnInit {
  title = 'Placeholder';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      if (data['breadcrumb']) {
        this.title = data['breadcrumb'];
      }
    });
  }
} 