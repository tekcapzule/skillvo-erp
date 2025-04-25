import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortButtonComponent, SortDirection } from '../../components/sort-button/sort-button.component';

@Component({
  selector: 'sv-sort-button-demo',
  standalone: true,
  imports: [CommonModule, SortButtonComponent],
  template: `
    <div class="demo-container">
      <h3>Sort Button Demo</h3>
      <div class="button-row">
        <sv-sort-button 
          [sortDirection]="currentSortDirection" 
          (sortChange)="onSortChange($event)">
        </sv-sort-button>
        <div class="status">
          Current direction: {{ currentSortDirection }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .demo-container {
      padding: 20px;
      border: 1px solid #eee;
      border-radius: 8px;
      max-width: 400px;
    }
    .button-row {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-top: 16px;
    }
    .status {
      font-family: monospace;
      background: #f5f5f5;
      padding: 8px 12px;
      border-radius: 4px;
    }
  `]
})
export class SortButtonDemoComponent {
  currentSortDirection: SortDirection = 'asc';

  onSortChange(direction: SortDirection): void {
    this.currentSortDirection = direction;
    console.log('Sort direction changed:', direction);
  }
} 