import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from '../../components/checkbox/checkbox.component';

export default {
  title: 'Components/Checkbox',
  component: CheckboxComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the checkbox',
    },
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the checkbox is required',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Whether the checkbox is in indeterminate state',
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'The theme of the checkbox',
    },
    valueChange: {
      action: 'valueChange',
      description: 'Event emitted when the checkbox value changes',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Checkbox component for selecting multiple options or toggling a single option.',
      },
    },
  },
} as Meta<CheckboxComponent>;

type Story = StoryObj<CheckboxComponent>;

export const Default: Story = {
  args: {
    label: 'Agree to terms and conditions',
    checked: false,
    disabled: false,
    required: false,
    indeterminate: false,
    theme: 'light',
  },
  render: (args) => ({
    props: {
      ...args,
      valueChange: (value: boolean) => {
        console.log('Checkbox value changed:', value);
      },
    },
    template: `
      <div style="padding: 1rem;">
        <sv-checkbox
          [label]="label"
          [checked]="checked"
          [disabled]="disabled"
          [required]="required"
          [indeterminate]="indeterminate"
          [theme]="theme"
          (valueChange)="valueChange($event)"
        ></sv-checkbox>
      </div>
    `,
  }),
};

export const Checked: Story = {
  args: {
    label: 'Checked Checkbox',
    checked: true,
    disabled: false,
    theme: 'light',
  },
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
      <div style="padding: 1rem;">
        <sv-checkbox
          [label]="label"
          [checked]="checked"
          [disabled]="disabled"
          [theme]="theme"
        ></sv-checkbox>
      </div>
    `,
  }),
};

export const Indeterminate: Story = {
  args: {
    label: 'Indeterminate Checkbox',
    checked: false,
    indeterminate: true,
    disabled: false,
    theme: 'light',
  },
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
      <div style="padding: 1rem;">
        <sv-checkbox
          [label]="label"
          [checked]="checked"
          [indeterminate]="indeterminate"
          [disabled]="disabled"
          [theme]="theme"
        ></sv-checkbox>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Checkbox',
    checked: false,
    disabled: true,
    theme: 'light',
  },
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
      <div style="padding: 1rem;">
        <sv-checkbox
          [label]="label"
          [checked]="checked"
          [disabled]="disabled"
          [theme]="theme"
        ></sv-checkbox>
      </div>
    `,
  }),
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled Checked Checkbox',
    checked: true,
    disabled: true,
    theme: 'light',
  },
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
      <div style="padding: 1rem;">
        <sv-checkbox
          [label]="label"
          [checked]="checked"
          [disabled]="disabled"
          [theme]="theme"
        ></sv-checkbox>
      </div>
    `,
  }),
};

export const CheckboxGroup: Story = {
  render: () => ({
    props: {
      options: [
        { id: 'apple', label: 'Apple', checked: true },
        { id: 'banana', label: 'Banana', checked: false },
        { id: 'cherry', label: 'Cherry', checked: false },
        { id: 'durian', label: 'Durian', checked: false },
      ],
      onValueChange: (id: string, checked: boolean) => {
        console.log(`${id} changed to ${checked}`);
      },
    },
    template: `
      <div style="padding: 1rem;">
        <div style="font-weight: bold; margin-bottom: 0.5rem;">Select Fruits:</div>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          <sv-checkbox
            *ngFor="let option of options"
            [label]="option.label"
            [(checked)]="option.checked"
            (valueChange)="onValueChange(option.id, $event)"
          ></sv-checkbox>
        </div>
        <div style="margin-top: 1rem;">
          Selected: {{ options | json }}
        </div>
      </div>
    `,
  }),
};

export const DarkTheme: Story = {
  args: {
    label: 'Dark Theme Checkbox',
    checked: false,
    disabled: false,
    theme: 'dark',
  },
  render: (args) => ({
    props: {
      ...args,
    },
    template: `
      <div style="padding: 1rem; background-color: #333; color: white;">
        <sv-checkbox
          [label]="label"
          [checked]="checked"
          [disabled]="disabled"
          [theme]="theme"
        ></sv-checkbox>
      </div>
    `,
  }),
}; 