import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TableColumn {
  key: string;
  header: string;
  sortable?: boolean;
  width?: string;
  cellTemplate?: TemplateRef<any>;
}

export interface SortEvent {
  column: string;
  direction: 'asc' | 'desc';
}

@Component({
  selector: 'sv-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent<T> {
  @Input() data: T[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() loading = false;
  @Input() selectable = false;
  @Input() sortable = true;
  @Input() emptyStateMessage = 'No data available';
  @Input() selectedRows: T[] = [];
  @Input() rowIdentifierKey = 'id';
  @Input() tableId = `table-${Math.random().toString(36).substring(2, 9)}`;
  
  @Output() rowClick = new EventEmitter<T>();
  @Output() sort = new EventEmitter<SortEvent>();
  @Output() selectionChange = new EventEmitter<T[]>();
  
  currentSortColumn: string | null = null;
  currentSortDirection: 'asc' | 'desc' = 'asc';
  
  @ContentChild('rowActions') rowActionsTemplate?: TemplateRef<any>;
  @ContentChild('emptyState') emptyStateTemplate?: TemplateRef<any>;
  @ContentChild('loadingState') loadingStateTemplate?: TemplateRef<any>;
  
  isAllSelected(): boolean {
    return this.data.length > 0 && this.selectedRows.length === this.data.length;
  }
  
  isRowSelected(row: T): boolean {
    return this.selectedRows.some(
      (selectedRow) => this.getRowIdentifier(selectedRow) === this.getRowIdentifier(row)
    );
  }
  
  getRowIdentifier(row: T): any {
    return (row as any)[this.rowIdentifierKey];
  }
  
  toggleSelectAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.selectedRows = checked ? [...this.data] : [];
    this.selectionChange.emit(this.selectedRows);
  }
  
  toggleRowSelection(row: T, event: Event): void {
    event.stopPropagation();
    
    if (this.isRowSelected(row)) {
      this.selectedRows = this.selectedRows.filter(
        (selectedRow) => this.getRowIdentifier(selectedRow) !== this.getRowIdentifier(row)
      );
    } else {
      this.selectedRows = [...this.selectedRows, row];
    }
    
    this.selectionChange.emit(this.selectedRows);
  }
  
  onRowClick(row: T): void {
    this.rowClick.emit(row);
  }
  
  onSortClick(column: TableColumn): void {
    if (!column.sortable || !this.sortable) return;
    
    if (this.currentSortColumn === column.key) {
      this.currentSortDirection = this.currentSortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSortColumn = column.key;
      this.currentSortDirection = 'asc';
    }
    
    this.sort.emit({
      column: column.key,
      direction: this.currentSortDirection
    });
  }
  
  trackByFn(_: number, item: T): any {
    return this.getRowIdentifier(item);
  }
} 