import { Meta, StoryObj } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { CalendarComponent, CalendarView } from '../../components/calendar/calendar.component';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  description?: string;
  location?: string;
  color?: string;
}

const meta: Meta<CalendarComponent> = {
  title: 'Components/Calendar',
  component: CalendarComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    view: {
      description: 'Current view of the calendar',
      control: { type: 'select' },
      options: ['day', 'week', 'work-week', 'month', 'agenda'],
      table: {
        type: { summary: 'CalendarView' },
        defaultValue: { summary: 'week' },
      }
    },
    currentDate: {
      description: 'The currently displayed date',
      control: { type: 'date' },
      table: {
        type: { summary: 'Date' },
        defaultValue: { summary: 'new Date()' },
      }
    },
    firstDayOfWeek: {
      description: 'First day of week (0 = Sunday, 1 = Monday, etc.)',
      control: { type: 'select' },
      options: [0, 1, 2, 3, 4, 5, 6],
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      }
    },
    timeSlotDuration: {
      description: 'Duration of each time slot in minutes',
      control: { type: 'number' },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '30' },
      }
    },
    showCurrentTimeIndicator: {
      description: 'Show a marker for the current time',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      }
    },
    events: {
      description: 'Array of events to display in the calendar',
      control: 'object',
      table: {
        type: { summary: 'CalendarEvent[]' },
        defaultValue: { summary: '[]' },
      }
    },
    readonly: {
      description: 'Make the calendar read-only (no event creation/editing)',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      }
    },
    // Action outputs
    dateRangeChanged: { 
      action: 'dateRangeChanged',
      description: 'Emitted when the displayed date range changes',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<CalendarDateRange>' },
      }
    },
    viewChanged: { 
      action: 'viewChanged',
      description: 'Emitted when the view is changed',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<CalendarView>' },
      }
    },
    eventClicked: { 
      action: 'eventClicked',
      description: 'Emitted when an event is clicked',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<CalendarEvent>' },
      }
    },
    eventAdded: { 
      action: 'eventAdded',
      description: 'Emitted when a new event is created',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<CalendarEvent>' },
      }
    },
    eventUpdated: { 
      action: 'eventUpdated',
      description: 'Emitted when an event is updated',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<CalendarEvent>' },
      }
    },
    eventDeleted: { 
      action: 'eventDeleted',
      description: 'Emitted when an event is deleted',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<string>' },
      }
    },
    slotSelected: {
      action: 'slotSelected',
      description: 'Emitted when a time slot is selected',
      table: {
        category: 'Events',
        type: { summary: 'EventEmitter<{start: Date, end: Date}>' },
      }
    }
  },
  parameters: {
    controls: { expanded: true },
    docs: {
      description: {
        component: `
## Calendar Component

A feature-rich, responsive calendar component that provides multiple views and event management.

### Features

- **Multiple Views**: Day, Week, Work Week, Month, and Agenda views
- **Event Management**: Create, edit, delete events
- **Current Time Indicator**: Shows the current time in day and week views
- **All-day Events**: Support for events that span the entire day
- **Date Navigation**: Easily navigate between dates with intuitive controls
- **Responsive Design**: Works on all device sizes
- **Customizable**: Configurable time slots, first day of week, and more
- **Custom Templates**: Supports custom templates for events and headers

### Usage

\`\`\`html
<sv-calendar
  [events]="events"
  [view]="'week'"
  [currentDate]="new Date()"
  [firstDayOfWeek]="0"
  [timeSlotDuration]="30"
  [showCurrentTimeIndicator]="true"
  [readonly]="false"
  (dateRangeChanged)="onDateRangeChanged($event)"
  (viewChanged)="onViewChanged($event)"
  (eventClicked)="onEventClicked($event)"
  (eventAdded)="onEventAdded($event)"
  (eventUpdated)="onEventUpdated($event)"
  (eventDeleted)="onEventDeleted($event)"
  (slotSelected)="onSlotSelected($event)">
</sv-calendar>
\`\`\`
        `,
      }
    }
  }
};

export default meta;
type Story = StoryObj<CalendarComponent>;

function generateEvents(): CalendarEvent[] {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);
  
  return [
    {
      id: '1',
      title: 'Team Meeting',
      start: new Date(today.setHours(10, 0, 0, 0)),
      end: new Date(today.setHours(11, 30, 0, 0)),
      description: 'Weekly team sync meeting',
      location: 'Conference Room A',
      color: '#3788d8'
    },
    {
      id: '2',
      title: 'Lunch with Client',
      start: new Date(today.setHours(12, 0, 0, 0)),
      end: new Date(today.setHours(13, 0, 0, 0)),
      description: 'Discuss new project requirements',
      location: 'Café Bistro',
      color: '#FF9500'
    },
    {
      id: '3',
      title: 'Company Holiday',
      start: new Date(tomorrow.setHours(0, 0, 0, 0)),
      end: new Date(tomorrow.setHours(23, 59, 59, 999)),
      allDay: true,
      description: 'Office closed for holiday',
      color: '#8CD867'
    },
    {
      id: '4',
      title: 'Angular Workshop',
      start: new Date(tomorrow.setHours(14, 0, 0, 0)),
      end: new Date(tomorrow.setHours(16, 0, 0, 0)),
      description: 'Learning advanced Angular techniques',
      location: 'Training Room',
      color: '#9C27B0'
    },
    {
      id: '5',
      title: 'Doctor Appointment',
      start: new Date(nextWeek.setHours(9, 0, 0, 0)),
      end: new Date(nextWeek.setHours(10, 0, 0, 0)),
      description: 'Annual checkup',
      location: 'Medical Center',
      color: '#FF3B30'
    },
    {
      id: '6',
      title: 'Project Deadline',
      start: new Date(nextWeek.setHours(17, 0, 0, 0)),
      end: new Date(nextWeek.setHours(18, 0, 0, 0)),
      description: 'Final deliverable due',
      color: '#C7C7CC'
    }
  ];
}

export const WeekView: Story = {
  args: {
    view: 'week',
    currentDate: new Date(),
    firstDayOfWeek: 0,
    timeSlotDuration: 30,
    showCurrentTimeIndicator: true,
    events: generateEvents(),
    readonly: false,
    dateRangeChanged: action('dateRangeChanged'),
    viewChanged: action('viewChanged'),
    eventClicked: action('eventClicked'),
    eventAdded: action('eventAdded'),
    eventUpdated: action('eventUpdated'),
    eventDeleted: action('eventDeleted'),
    slotSelected: action('slotSelected')
  },
  parameters: {
    docs: {
      description: {
        story: 'The Week view shows a full week with all events. It displays time slots for each day and allows creating events by clicking on time slots.'
      }
    }
  }
};

export const DayView: Story = {
  args: {
    ...WeekView.args,
    view: 'day',
  },
  parameters: {
    docs: {
      description: {
        story: 'The Day view shows a single day with detailed time slots. It provides more space for events occurring on the same day.'
      }
    }
  }
};

export const MonthView: Story = {
  args: {
    ...WeekView.args,
    view: 'month',
  },
  parameters: {
    docs: {
      description: {
        story: 'The Month view provides an overview of events across an entire month. It shows a simplified view of events for each day.'
      }
    }
  }
};

export const WorkWeekView: Story = {
  args: {
    ...WeekView.args,
    view: 'work-week',
  },
  parameters: {
    docs: {
      description: {
        story: 'The Work Week view shows a 5-day work week (Monday to Friday), focusing on business days only.'
      }
    }
  }
};

export const AgendaView: Story = {
  args: {
    ...WeekView.args,
    view: 'agenda',
  },
  parameters: {
    docs: {
      description: {
        story: 'The Agenda view shows events in a list format, organized by date. It provides a more compact view of upcoming events.'
      }
    }
  }
};

export const ReadOnly: Story = {
  args: {
    ...WeekView.args,
    readonly: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'In read-only mode, users can view events but cannot create, edit, or delete them.'
      }
    }
  }
};

export const NoEvents: Story = {
  args: {
    ...WeekView.args,
    events: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar with no events shows empty state for each view.'
      }
    }
  }
};

export const CustomTimeRange: Story = {
  args: {
    ...WeekView.args,
    timeSlotDuration: 15,
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar with custom time slot duration (15 minutes) allows for more precise event scheduling.'
      }
    }
  }
}; 