import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RadioButtonComponent } from '../../components/radio-button/radio-button.component';

export default {
  title: 'Components/Radio Button',
  component: RadioButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the radio button',
    },
    value: {
      control: 'text',
      description: 'Value of the radio button',
    },
    name: {
      control: 'text',
      description: 'Name attribute for the radio button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio button is disabled',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'The theme of the radio button',
    },
    valueChange: {
      action: 'valueChange',
      description: 'Event emitted when the radio button value changes',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Radio button component for selecting a single option from a set of options.',
      },
    },
  },
} as Meta<RadioButtonComponent>;

type Story = StoryObj<RadioButtonComponent>;

export const Default: Story = {
  args: {
    label: 'Option 1',
    value: 'option1',
    name: 'options',
    disabled: false,
    theme: 'light',
  },
  render: (args) => ({
    props: {
      ...args,
      selectedValue: null,
      valueChange: (value: any) => {
        console.log('Radio value changed:', value);
      },
    },
    template: `
      <div style="padding: 1rem;">
        <sv-radio-button
          [label]="label"
          [value]="value"
          [name]="name"
          [disabled]="disabled"
          [theme]="theme"
          [(selectedValue)]="selectedValue"
          (valueChange)="valueChange($event)"
        ></sv-radio-button>
      </div>
    `,
  }),
};

export const RadioGroup: Story = {
  render: () => ({
    props: {
      selectedValue: 'option1',
      options: [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
      ],
      onValueChange: (value: any) => {
        console.log('Selected value:', value);
      },
    },
    template: `
      <div style="padding: 1rem;">
        <div style="margin-bottom: 1rem;">Selected: {{ selectedValue }}</div>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <sv-radio-button
            *ngFor="let option of options"
            [label]="option.label"
            [value]="option.value"
            name="group-demo"
            [(selectedValue)]="selectedValue"
            (valueChange)="onValueChange($event)"
          ></sv-radio-button>
        </div>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Radio',
    value: 'disabled',
    name: 'disabled-demo',
    disabled: true,
    theme: 'light',
  },
  render: (args) => ({
    props: {
      ...args,
      selectedValue: args.value,
    },
    template: `
      <div style="padding: 1rem;">
        <sv-radio-button
          [label]="label"
          [value]="value"
          [name]="name"
          [disabled]="disabled"
          [theme]="theme"
          [(selectedValue)]="selectedValue"
        ></sv-radio-button>
      </div>
    `,
  }),
};

export const DarkTheme: Story = {
  args: {
    label: 'Dark Theme Radio',
    value: 'dark-theme',
    name: 'theme-demo',
    disabled: false,
    theme: 'dark',
  },
  render: (args) => ({
    props: {
      ...args,
      selectedValue: null,
    },
    template: `
      <div style="padding: 1rem; background-color: #333; color: white;">
        <sv-radio-button
          [label]="label"
          [value]="value"
          [name]="name"
          [disabled]="disabled"
          [theme]="theme"
          [(selectedValue)]="selectedValue"
        ></sv-radio-button>
      </div>
    `,
  }),
}; 