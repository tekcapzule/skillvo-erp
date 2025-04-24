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
      padding: var(--placeholder-padding);
      background-color: var(--placeholder-bg);
      border-radius: var(--placeholder-border-radius);
      box-shadow: var(--placeholder-shadow);
    }
    h1 {
      margin-top: 0;
      color: var(--placeholder-title-color);
    }
    p {
      color: var(--placeholder-text-color);
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