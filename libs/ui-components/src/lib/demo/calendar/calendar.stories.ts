import { Meta, StoryObj } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { CalendarComponent } from '../../components/calendar/calendar.component';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

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
    readonly: {
      description: 'Make the calendar read-only (no event creation/editing)',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      }
    },
    // Action outputs
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

A responsive calendar component that provides monthly view with date navigation.

### Features

- **Month View**: Displays a full month calendar
- **Date Navigation**: Easily navigate between months with intuitive controls
- **Date Selection**: Select dates to perform actions
- **Responsive Design**: Works on all device sizes
- **Customizable**: Configurable first day of week

### Usage

\`\`\`html
<sv-calendar
  [currentDate]="new Date()"
  [firstDayOfWeek]="0"
  [readonly]="false"
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

// Basic story configurations
export const Default: Story = {
  args: {
    currentDate: new Date(),
    firstDayOfWeek: 0,
    readonly: false,
    slotSelected: action('slotSelected')
  }
};

export const MondayAsFirstDay: Story = {
  args: {
    currentDate: new Date(),
    firstDayOfWeek: 1,
    readonly: false,
    slotSelected: action('slotSelected')
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar with Monday as the first day of the week (European format).'
      }
    }
  }
};

export const ReadOnly: Story = {
  args: {
    currentDate: new Date(),
    firstDayOfWeek: 0,
    readonly: true,
    slotSelected: action('slotSelected')
  },
  parameters: {
    docs: {
      description: {
        story: 'In read-only mode, users can view the calendar but cannot select dates.'
      }
    }
  }
}; 