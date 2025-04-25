import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { KanbanBoardComponent, KanbanColumn } from '../../components/kanban-board/kanban-board.component';
import { Component, Input } from '@angular/core';

// Demo data for the Kanban board
const demoColumns: KanbanColumn[] = [
  {
    id: 'backlog',
    title: 'Backlog',
    cards: [
      {
        id: 'card-1',
        title: 'Implement login screen',
        description: 'Create a user-friendly login screen with validation',
        labels: ['UI', 'Frontend'],
        assignee: 'John',
        priority: 'medium'
      },
      {
        id: 'card-2',
        title: 'Database schema design',
        description: 'Design the database schema for the users and products',
        labels: ['Database', 'Backend'],
        assignee: 'Sarah',
        priority: 'high',
        attachment: 2
      },
      {
        id: 'card-3',
        title: 'Setup CI/CD pipeline',
        description: 'Configure Jenkins for continuous integration',
        labels: ['DevOps'],
        assignee: 'Mike',
        priority: 'low'
      }
    ]
  },
  {
    id: 'todo',
    title: 'To Do',
    limit: 4,
    cards: [
      {
        id: 'card-4',
        title: 'Write API documentation',
        description: 'Document all API endpoints using Swagger',
        labels: ['Documentation'],
        assignee: 'Lisa',
        priority: 'medium',
        comments: 3
      },
      {
        id: 'card-5',
        title: 'Implement user profile page',
        description: 'Create user profile page with edit functionality',
        labels: ['UI', 'Frontend'],
        assignee: 'John',
        priority: 'medium',
        comments: 1
      }
    ]
  },
  {
    id: 'inprogress',
    title: 'In Progress',
    limit: 3,
    cards: [
      {
        id: 'card-6',
        title: 'Refactor authentication service',
        description: 'Improve code quality and add better error handling',
        labels: ['Backend', 'Security'],
        assignee: 'Sarah',
        priority: 'high',
        dueDate: new Date(2023, 7, 30),
        comments: 5,
        attachment: 1
      }
    ]
  },
  {
    id: 'review',
    title: 'Review',
    limit: 2,
    cards: [
      {
        id: 'card-7',
        title: 'Fix navigation bar responsiveness',
        description: 'Make sure navigation bar works well on mobile devices',
        labels: ['UI', 'Bug'],
        assignee: 'Mike',
        priority: 'high',
        dueDate: new Date(2023, 7, 25)
      }
    ]
  },
  {
    id: 'done',
    title: 'Done',
    cards: [
      {
        id: 'card-8',
        title: 'Setup project structure',
        description: 'Initialize the repository and configure basic structure',
        labels: ['DevOps'],
        assignee: 'John',
        priority: 'high'
      },
      {
        id: 'card-9',
        title: 'Design mockups review',
        description: 'Review and approve design mockups with the team',
        labels: ['Design', 'Meeting'],
        assignee: 'Lisa',
        priority: 'medium'
      }
    ]
  }
];

@Component({
  selector: 'skillvo-demo-kanban',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule, KanbanBoardComponent],
  template: `
    <div class="kanban-demo-container">
      <div class="actions-bar">
        <button class="action-btn" (click)="toggleEditable()">
          {{ kanbanConfig.editable ? 'Disable Editing' : 'Enable Editing' }}
        </button>
        <button class="action-btn" (click)="toggleLoading()">
          {{ kanbanConfig.loading ? 'Show Board' : 'Show Loading' }}
        </button>
        <div class="events-log">
          <h4>Events Log</h4>
          <div class="log-content">
            <div *ngFor="let event of eventsLog" class="log-entry">
              <span class="log-type">{{ event.type }}:</span> {{ event.message }}
            </div>
            <div *ngIf="eventsLog.length === 0" class="empty-log">
              No events yet. Try interacting with the board!
            </div>
          </div>
          <button class="clear-log" (click)="clearLog()">Clear Log</button>
        </div>
      </div>
      
      <skillvo-kanban-board
        [columns]="kanbanConfig.columns"
        [editable]="kanbanConfig.editable"
        [loading]="kanbanConfig.loading"
        [showColumnTotal]="true"
        [boardTitle]="kanbanConfig.boardTitle"
        (cardClick)="onCardClick($event)"
        (cardMoved)="onCardMoved($event)"
        (cardAdded)="onCardAdded($event)"
        (cardRemoved)="onCardRemoved($event)"
        (columnAdded)="onColumnAdded($event)"
        (columnRemoved)="onColumnRemoved($event)"
        (columnRenamed)="onColumnRenamed($event)"
      >
      </skillvo-kanban-board>
    </div>
  `,
  styles: [`
    .kanban-demo-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      min-height: 600px;
    }
    
    .actions-bar {
      display: flex;
      margin-bottom: 1rem;
      gap: 1rem;
      align-items: flex-start;
    }
    
    .action-btn {
      padding: 0.5rem 1rem;
      background-color: #f1f3f5;
      border: 1px solid #dee2e6;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .action-btn:hover {
      background-color: #e9ecef;
    }
    
    .events-log {
      flex: 1;
      border: 1px solid #dee2e6;
      border-radius: 4px;
      padding: 0.75rem;
      background-color: #f8f9fa;
      min-width: 300px;
      max-width: 400px;
    }
    
    .events-log h4 {
      margin-top: 0;
      margin-bottom: 0.75rem;
      font-size: 1rem;
    }
    
    .log-content {
      height: 150px;
      overflow-y: auto;
      border: 1px solid #dee2e6;
      border-radius: 4px;
      padding: 0.5rem;
      background-color: white;
      margin-bottom: 0.75rem;
      font-family: monospace;
      font-size: 0.875rem;
    }
    
    .log-entry {
      padding: 0.25rem 0;
      border-bottom: 1px dashed #dee2e6;
    }
    
    .log-entry:last-child {
      border-bottom: none;
    }
    
    .log-type {
      font-weight: bold;
      color: #007bff;
    }
    
    .empty-log {
      color: #6c757d;
      font-style: italic;
      text-align: center;
      padding: 1rem 0;
    }
    
    .clear-log {
      padding: 0.25rem 0.5rem;
      background-color: #e9ecef;
      border: 1px solid #dee2e6;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.875rem;
    }
  `]
})
class DemoKanbanComponent {
  @Input() initialColumns: KanbanColumn[] = [...demoColumns];
  
  kanbanConfig = {
    columns: [...this.initialColumns],
    editable: true,
    loading: false,
    boardTitle: 'Project Tasks'
  };
  
  eventsLog: { type: string, message: string }[] = [];
  
  toggleEditable(): void {
    this.kanbanConfig.editable = !this.kanbanConfig.editable;
    this.logEvent('Config', `Editable mode ${this.kanbanConfig.editable ? 'enabled' : 'disabled'}`);
  }
  
  toggleLoading(): void {
    this.kanbanConfig.loading = !this.kanbanConfig.loading;
    this.logEvent('Config', `${this.kanbanConfig.loading ? 'Showing' : 'Hiding'} loading state`);
  }
  
  onCardClick(card: any): void {
    this.logEvent('CardClick', `Card clicked: ${card.title}`);
  }
  
  onCardMoved(event: any): void {
    this.logEvent('CardMoved', `Card "${event.card.title}" moved from ${event.fromColumnId} to ${event.toColumnId}`);
  }
  
  onCardAdded(event: any): void {
    this.logEvent('CardAdded', `Card "${event.card.title}" added to ${event.columnId}`);
  }
  
  onCardRemoved(event: any): void {
    this.logEvent('CardRemoved', `Card "${event.card.title}" removed from ${event.columnId}`);
  }
  
  onColumnAdded(column: any): void {
    this.logEvent('ColumnAdded', `Column "${column.title}" added`);
  }
  
  onColumnRemoved(columnId: string): void {
    this.logEvent('ColumnRemoved', `Column with ID "${columnId}" removed`);
  }
  
  onColumnRenamed(event: any): void {
    this.logEvent('ColumnRenamed', `Column renamed to "${event.title}"`);
  }
  
  logEvent(type: string, message: string): void {
    this.eventsLog.unshift({ type, message });
    // Keep the log size manageable
    if (this.eventsLog.length > 10) {
      this.eventsLog.pop();
    }
  }
  
  clearLog(): void {
    this.eventsLog = [];
  }
}

// Define meta
const meta: Meta<KanbanBoardComponent> = {
  title: 'Components/Kanban Board',
  component: KanbanBoardComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FormsModule, DragDropModule, KanbanBoardComponent, DemoKanbanComponent],
    }),
  ],
  argTypes: {
    columns: { control: 'object' },
    loading: { control: 'boolean' },
    editable: { control: 'boolean' },
    showColumnTotal: { control: 'boolean' },
    headerColor: { control: 'color' },
    boardTitle: { control: 'text' },
    cardClick: { action: 'cardClick' },
    cardMoved: { action: 'cardMoved' },
    cardAdded: { action: 'cardAdded' },
    cardRemoved: { action: 'cardRemoved' },
    columnAdded: { action: 'columnAdded' },
    columnRemoved: { action: 'columnRemoved' },
    columnRenamed: { action: 'columnRenamed' },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Kanban Board Component

A flexible Kanban board for managing tasks and workflows. Features include:

- Drag and drop cards between columns
- Add/edit/delete cards and columns
- WIP (Work in Progress) limits for columns
- Customizable card templates
- Responsive design
- Loading states
`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<KanbanBoardComponent>;

// Basic Kanban Board
export const Default: Story = {
  args: {
    columns: demoColumns,
    loading: false,
    editable: true,
    showColumnTotal: true,
    boardTitle: 'Project Tasks',
  },
};

// Interactive Demo with Events Logging
export const Interactive: Story = {
  render: () => ({
    template: `
      <skillvo-demo-kanban></skillvo-demo-kanban>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo showing real-time event logging and configuration controls for the Kanban board.',
      },
    },
  },
};

// Loading State
export const Loading: Story = {
  args: {
    columns: demoColumns,
    loading: true,
    boardTitle: 'Project Tasks',
  },
};

// Read-only Board
export const ReadOnly: Story = {
  args: {
    columns: demoColumns,
    editable: false,
    boardTitle: 'Project Status (Read-only)',
  },
};

// Custom Template Example
export const CustomTemplate: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 1200px; margin: 0 auto;">
        <skillvo-kanban-board
          [columns]="columns"
          [editable]="editable"
          [boardTitle]="boardTitle"
        >
          <ng-template #cardTemplate let-card>
            <div style="padding: 8px; border-left: 4px solid #007bff;">
              <div style="font-weight: bold; margin-bottom: 8px;">
                {{card.title}}
                <span style="float: right; background-color: #007bff; color: white; padding: 2px 6px; border-radius: 12px; font-size: 10px;">
                  {{card.priority}}
                </span>
              </div>
              <div style="font-size: 12px; color: #6c757d; margin-bottom: 8px;">{{card.description}}</div>
              <div style="display: flex; justify-content: space-between; font-size: 12px;">
                <div>Assigned: <strong>{{card.assignee}}</strong></div>
                <div *ngIf="card.dueDate">Due: {{card.dueDate | date}}</div>
              </div>
            </div>
          </ng-template>
        </skillvo-kanban-board>
      </div>
    `,
  }),
  args: {
    columns: demoColumns,
    editable: true,
    boardTitle: 'Custom Card Template',
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of using custom card templates to customize the appearance of Kanban cards.',
      },
    },
  },
}; 