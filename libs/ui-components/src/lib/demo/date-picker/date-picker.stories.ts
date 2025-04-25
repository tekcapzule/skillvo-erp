import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from '../../components/date-picker/date-picker.component';
import { CalendarComponent } from '../../components/calendar/calendar.component';

export default {
  title: 'Components/Date Picker',
  component: DatePickerComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FormsModule, CalendarComponent],
    }),
  ],
  argTypes: {
    label: {
      control: 'text',
      description: 'The label for the date picker',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder for the date input',
    },
    dateFormat: {
      control: 'text',
      description: 'The format to display dates',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the date picker is disabled',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'The theme of the date picker',
    },
    valueChange: {
      action: 'valueChange',
      description: 'Event emitted when the date changes',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Date picker component with calendar popup for selecting a date.',
      },
    },
  },
} as Meta<DatePickerComponent>;

type Story = StoryObj<DatePickerComponent>;

export const Default: Story = {
  args: {
    label: 'Date',
    placeholder: 'dd/mm/yyyy',
    disabled: false,
    theme: 'light',
  },
  render: (args) => ({
    props: {
      ...args,
      valueChange: (value: any) => console.log('Date changed:', value),
    },
    template: `
      <div style="max-width: 300px; margin: 0 auto;">
        <sv-date-picker
          [label]="label"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [theme]="theme"
          (valueChange)="valueChange($event)"
        ></sv-date-picker>
      </div>
    `,
  }),
};

export const WithPresetDate: Story = {
  args: {
    label: 'Date with Preset Value',
    placeholder: 'dd/mm/yyyy',
    disabled: false,
    theme: 'light',
  },
  render: (args) => ({
    props: {
      ...args,
      value: new Date(2023, 5, 15), // June 15, 2023
      valueChange: (value: any) => console.log('Date changed:', value),
    },
    template: `
      <div style="max-width: 300px; margin: 0 auto;">
        <sv-date-picker
          [label]="label"
          [value]="value"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [theme]="theme"
          (valueChange)="valueChange($event)"
        ></sv-date-picker>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Date Picker',
    placeholder: 'dd/mm/yyyy',
    disabled: true,
    theme: 'light',
  },
  render: (args) => ({
    props: {
      ...args,
      valueChange: (value: any) => console.log('Date changed:', value),
    },
    template: `
      <div style="max-width: 300px; margin: 0 auto;">
        <sv-date-picker
          [label]="label"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [theme]="theme"
          (valueChange)="valueChange($event)"
        ></sv-date-picker>
      </div>
    `,
  }),
};

export const DarkTheme: Story = {
  args: {
    label: 'Dark Theme Date Picker',
    placeholder: 'dd/mm/yyyy',
    disabled: false,
    theme: 'dark',
  },
  render: (args) => ({
    props: {
      ...args,
      valueChange: (value: any) => console.log('Date changed:', value),
    },
    template: `
      <div style="max-width: 300px; margin: 0 auto; background: #333; padding: 2rem;">
        <sv-date-picker
          [label]="label"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [theme]="theme"
          (valueChange)="valueChange($event)"
        ></sv-date-picker>
      </div>
    `,
  }),
}; 