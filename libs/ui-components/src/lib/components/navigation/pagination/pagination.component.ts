import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sv-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class PaginationComponent implements OnInit {
  /** The current page index. */
  @Input() page = 0;

  /** The number of items to display on a page. */
  @Input() pageSize = 10;

  /** The total number of items being paginated. */
  @Input() length = 0;

  /** The set of provided page size options to display to the user. */
  @Input() pageSizeOptions: number[] = [5, 10, 25, 50, 100];

  /** Whether to hide the page size selection UI. */
  @Input() hidePageSize = false;

  /** Whether to show the first/last buttons UI. */
  @Input() showFirstLastButtons = true;

  /** Whether the pagination is disabled. */
  @Input() disabled = false;

  /** Number of page links to show. */
  @Input() maxVisiblePages = 5;

  /** Event emitted when the paginator changes the page size or page index. */
  @Output() pageChange = new EventEmitter<PageEvent>();

  /** Calculated page numbers to display. */
  pageNumbers: number[] = [];

  /** Current range of items being displayed. */
  range: { start: number; end: number } = { start: 0, end: 0 };

  ngOnInit(): void {
    this.updatePageNumbers();
    this.updateRange();
  }

  /** Whether we're on the first page. */
  get isFirstPage(): boolean {
    return this.page === 0;
  }

  /** Whether we're on the last page. */
  get isLastPage(): boolean {
    return this.page === this.getNumberOfPages() - 1 || this.getNumberOfPages() === 0;
  }

  /** Total number of pages. */
  getNumberOfPages(): number {
    return Math.ceil(this.length / this.pageSize) || 0;
  }

  /** Changes the page size. */
  changePageSize(size: number): void {
    const startIndex = this.page * this.pageSize;
    
    this.pageSize = size;
    this.page = Math.floor(startIndex / this.pageSize) || 0;
    
    this.updatePageNumbers();
    this.updateRange();
    this.emitPageEvent();
  }

  /** Changes to a specific page. */
  changePage(pageIndex: number): void {
    this.page = pageIndex;
    this.updatePageNumbers();
    this.updateRange();
    this.emitPageEvent();
  }

  /** Go to the first page. */
  firstPage(): void {
    if (!this.isFirstPage) {
      this.changePage(0);
    }
  }

  /** Go to the previous page. */
  previousPage(): void {
    if (!this.isFirstPage) {
      this.changePage(this.page - 1);
    }
  }

  /** Go to the next page. */
  nextPage(): void {
    if (!this.isLastPage) {
      this.changePage(this.page + 1);
    }
  }

  /** Go to the last page. */
  lastPage(): void {
    if (!this.isLastPage) {
      this.changePage(this.getNumberOfPages() - 1);
    }
  }

  /** Calculate which page numbers to display. */
  private updatePageNumbers(): void {
    const totalPages = this.getNumberOfPages();
    
    if (totalPages <= this.maxVisiblePages) {
      // If we have fewer pages than the max, show all of them
      this.pageNumbers = Array.from({ length: totalPages }, (_, i) => i);
      return;
    }

    // Always include current page
    const pageNumbers: number[] = [this.page];
    let countAdded = 1;
    
    // Add pages before current page
    for (let i = 1; i <= 2; i++) {
      const pageToAdd = this.page - i;
      if (pageToAdd >= 0 && countAdded < this.maxVisiblePages) {
        pageNumbers.unshift(pageToAdd);
        countAdded++;
      }
    }
    
    // Add pages after current page
    for (let i = 1; i <= 2; i++) {
      const pageToAdd = this.page + i;
      if (pageToAdd < totalPages && countAdded < this.maxVisiblePages) {
        pageNumbers.push(pageToAdd);
        countAdded++;
      }
    }
    
    // Add ellipsis and first/last page if needed
    if (this.page > 2) {
      if (this.page > 3) {
        pageNumbers.unshift(-1); // Ellipsis
      }
      if (!pageNumbers.includes(0)) {
        pageNumbers.unshift(0);
      }
    }
    
    if (this.page < totalPages - 3) {
      if (this.page < totalPages - 4) {
        pageNumbers.push(-1); // Ellipsis
      }
      if (!pageNumbers.includes(totalPages - 1)) {
        pageNumbers.push(totalPages - 1);
      }
    }
    
    this.pageNumbers = pageNumbers;
  }

  /** Update the displayed item range. */
  private updateRange(): void {
    const start = this.length === 0 ? 0 : this.page * this.pageSize + 1;
    const end = Math.min((this.page + 1) * this.pageSize, this.length);
    this.range = { start, end };
  }

  /** Emits page event with current state. */
  private emitPageEvent(): void {
    this.pageChange.emit({
      pageIndex: this.page,
      pageSize: this.pageSize,
      length: this.length
    });
  }
}

/** Event emitted when page changes. */
export interface PageEvent {
  /** The current page index. */
  pageIndex: number;
  /** The current page size. */
  pageSize: number;
  /** The current total number of items being paged. */
  length: number;
} 