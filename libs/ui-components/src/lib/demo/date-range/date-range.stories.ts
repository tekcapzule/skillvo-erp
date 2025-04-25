import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DateRangeComponent } from '../../components/date-range/date-range.component';
import { CalendarComponent } from '../../components/calendar/calendar.component';

export default {
  title: 'Components/Date Range',
  component: DateRangeComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FormsModule, CalendarComponent],
    }),
  ],
  argTypes: {
    label: {
      control: 'text',
      description: 'The label for the date range selector',
    },
    fromPlaceholder: {
      control: 'text',
      description: 'Placeholder for the from date input',
    },
    toPlaceholder: {
      control: 'text',
      description: 'Placeholder for the to date input',
    },
    dateFormat: {
      control: 'text',
      description: 'The format to display dates',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the date range is disabled',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'The theme of the date range picker',
    },
    valueChange: {
      action: 'valueChange',
      description: 'Event emitted when the date range changes',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Date range selector component with calendar popups for selecting from and to dates.',
      },
    },
  },
} as Meta<DateRangeComponent>;

type Story = StoryObj<DateRangeComponent>;

export const Default: Story = {
  args: {
    label: 'Date Range',
    fromPlaceholder: 'mm/dd/yyyy',
    toPlaceholder: 'mm/dd/yyyy',
    disabled: false,
    theme: 'light',
  },
  render: (args) => ({
    props: {
      ...args,
      valueChange: (value: any) => console.log('Date range changed:', value),
    },
    template: `
      <div style="max-width: 600px; margin: 0 auto;">
        <sv-date-range
          [label]="label"
          [fromPlaceholder]="fromPlaceholder"
          [toPlaceholder]="toPlaceholder"
          [disabled]="disabled"
          [theme]="theme"
          (valueChange)="valueChange($event)"
        ></sv-date-range>
      </div>
    `,
  }),
};

export const WithPresetDates: Story = {
  args: {
    label: 'Date Range with Preset Dates',
    fromPlaceholder: 'mm/dd/yyyy',
    toPlaceholder: 'mm/dd/yyyy',
    disabled: false,
    theme: 'light',
  },
  render: (args) => ({
    props: {
      ...args,
      value: {
        from: new Date(2023, 5, 15), // June 15, 2023
        to: new Date(2023, 6, 20),   // July 20, 2023
      },
      valueChange: (value: any) => console.log('Date range changed:', value),
    },
    template: `
      <div style="max-width: 600px; margin: 0 auto;">
        <sv-date-range
          [label]="label"
          [value]="value"
          [fromPlaceholder]="fromPlaceholder"
          [toPlaceholder]="toPlaceholder"
          [disabled]="disabled"
          [theme]="theme"
          (valueChange)="valueChange($event)"
        ></sv-date-range>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Date Range',
    fromPlaceholder: 'mm/dd/yyyy',
    toPlaceholder: 'mm/dd/yyyy',
    disabled: true,
    theme: 'light',
  },
  render: (args) => ({
    props: {
      ...args,
      valueChange: (value: any) => console.log('Date range changed:', value),
    },
    template: `
      <div style="max-width: 600px; margin: 0 auto;">
        <sv-date-range
          [label]="label"
          [fromPlaceholder]="fromPlaceholder"
          [toPlaceholder]="toPlaceholder"
          [disabled]="disabled"
          [theme]="theme"
          (valueChange)="valueChange($event)"
        ></sv-date-range>
      </div>
    `,
  }),
};

export const DarkTheme: Story = {
  args: {
    label: 'Dark Theme Date Range',
    fromPlaceholder: 'mm/dd/yyyy',
    toPlaceholder: 'mm/dd/yyyy',
    disabled: false,
    theme: 'dark',
  },
  render: (args) => ({
    props: {
      ...args,
      valueChange: (value: any) => console.log('Date range changed:', value),
    },
    template: `
      <div style="max-width: 600px; margin: 0 auto; background: #333; padding: 2rem;">
        <sv-date-range
          [label]="label"
          [fromPlaceholder]="fromPlaceholder"
          [toPlaceholder]="toPlaceholder"
          [disabled]="disabled"
          [theme]="theme"
          (valueChange)="valueChange($event)"
        ></sv-date-range>
      </div>
    `,
  }),
}; 