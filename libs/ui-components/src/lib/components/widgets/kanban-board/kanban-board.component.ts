import { 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  ContentChild, 
  TemplateRef, 
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';

export interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
  color?: string;
  limit?: number; // WIP limit
}

export interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  assignee?: string;
  dueDate?: Date;
  priority?: 'low' | 'medium' | 'high' | 'critical';
  labels?: string[];
  attachment?: number;
  comments?: number;
  color?: string;
  [key: string]: any; // Allow custom properties
}

export interface KanbanCardEvent {
  card: KanbanCard;
  fromColumnId: string;
  toColumnId: string;
}

@Component({
  selector: 'skillvo-kanban-board',
  standalone: true,
  imports: [CommonModule, DragDropModule, FormsModule],
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class KanbanBoardComponent {
  @Input() columns: KanbanColumn[] = [];
  @Input() loading = false;
  @Input() editable = true;
  @Input() connectedTo: string[] = [];
  @Input() headerColor = '#f1f3f5';
  @Input() boardTitle = 'Kanban Board';
  @Input() showColumnTotal = true;
  
  @Output() cardClick = new EventEmitter<KanbanCard>();
  @Output() cardMoved = new EventEmitter<KanbanCardEvent>();
  @Output() cardAdded = new EventEmitter<{ card: KanbanCard, columnId: string }>();
  @Output() cardRemoved = new EventEmitter<{ card: KanbanCard, columnId: string }>();
  @Output() columnAdded = new EventEmitter<KanbanColumn>();
  @Output() columnRemoved = new EventEmitter<string>();
  @Output() columnRenamed = new EventEmitter<{ id: string, title: string }>();
  
  @ContentChild('cardTemplate') cardTemplate!: TemplateRef<any>;
  @ContentChild('columnHeaderTemplate') columnHeaderTemplate!: TemplateRef<any>;
  
  newColumnTitle = '';
  editingColumnId: string | null = null;
  newCardTitles: { [columnId: string]: string } = {};
  showAddCard: { [columnId: string]: boolean } = {};
  
  // For date comparisons in the template
  today = new Date();
  
  trackByColumnId(index: number, column: KanbanColumn): string {
    return column.id;
  }
  
  trackByCardId(index: number, card: KanbanCard): string {
    return card.id;
  }
  
  getConnectedLists(): string[] {
    if (this.connectedTo.length > 0) {
      return this.connectedTo;
    }
    return this.columns.map(column => `column-${column.id}`);
  }
  
  onCardDrop(event: CdkDragDrop<KanbanCard[]>, toColumn: KanbanColumn): void {
    if (event.previousContainer === event.container) {
      // Move within the same column
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Move to a different column
      const card = event.previousContainer.data[event.previousIndex];
      
      // Check WIP limit
      if (toColumn.limit && toColumn.cards.length >= toColumn.limit) {
        // Optionally show a notification about the WIP limit
        return;
      }
      
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      
      // Emit the card moved event
      const fromColumnId = event.previousContainer.id.replace('column-', '');
      const toColumnId = event.container.id.replace('column-', '');
      
      this.cardMoved.emit({
        card,
        fromColumnId,
        toColumnId
      });
    }
  }
  
  onColumnTitleEdit(column: KanbanColumn): void {
    if (!this.editable) return;
    this.editingColumnId = column.id;
  }
  
  onColumnTitleSave(column: KanbanColumn, newTitle: string): void {
    if (newTitle.trim()) {
      this.columnRenamed.emit({ id: column.id, title: newTitle });
      column.title = newTitle;
    }
    this.editingColumnId = null;
  }
  
  onAddColumn(): void {
    if (!this.newColumnTitle.trim() || !this.editable) return;
    
    const newColumn: KanbanColumn = {
      id: `column-${Date.now()}`,
      title: this.newColumnTitle,
      cards: []
    };
    
    this.columnAdded.emit(newColumn);
    this.columns = [...this.columns, newColumn];
    this.newColumnTitle = '';
  }
  
  onRemoveColumn(column: KanbanColumn): void {
    if (!this.editable) return;
    this.columnRemoved.emit(column.id);
    this.columns = this.columns.filter(c => c.id !== column.id);
  }
  
  toggleAddCard(columnId: string): void {
    if (!this.editable) return;
    this.showAddCard[columnId] = !this.showAddCard[columnId];
    if (this.showAddCard[columnId]) {
      this.newCardTitles[columnId] = '';
    }
  }
  
  onAddCard(column: KanbanColumn): void {
    const title = this.newCardTitles[column.id];
    if (!title || !title.trim() || !this.editable) return;
    
    const newCard: KanbanCard = {
      id: `card-${Date.now()}`,
      title: title.trim()
    };
    
    column.cards.push(newCard);
    this.cardAdded.emit({ card: newCard, columnId: column.id });
    this.newCardTitles[column.id] = '';
    this.showAddCard[column.id] = false;
  }
  
  onRemoveCard(column: KanbanColumn, card: KanbanCard): void {
    if (!this.editable) return;
    column.cards = column.cards.filter(c => c.id !== card.id);
    this.cardRemoved.emit({ card, columnId: column.id });
  }
  
  onCardClicked(card: KanbanCard): void {
    this.cardClick.emit(card);
  }
  
  getColumnWipStatus(column: KanbanColumn): 'ok' | 'warning' | 'exceeded' {
    if (!column.limit) return 'ok';
    
    const count = column.cards.length;
    const limit = column.limit;
    
    if (count > limit) return 'exceeded';
    if (count >= limit * 0.8) return 'warning';
    return 'ok';
  }
  
  isOverdue(dueDate?: Date): boolean {
    if (!dueDate) return false;
    return new Date(dueDate) < this.today;
  }
} 