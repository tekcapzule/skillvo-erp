import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { MultiSelectComponent, MultiSelectOption } from '../../components/multi-select/multi-select.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const meta: Meta<MultiSelectComponent> = {
  title: 'Components/MultiSelect',
  component: MultiSelectComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FormsModule],
    }),
  ],
  argTypes: {
    label: { control: 'text' },
    options: { control: 'object' },
    disabled: { control: 'boolean' },
    maxHeight: { control: 'text' },
    placeholder: { control: 'text' },
    customClass: { control: 'text' },
    selectionChange: { action: 'selectionChange' }
  },
  parameters: {
    docs: {
      description: {
        component: `
# Multi-Select Component

A dropdown component that allows selecting multiple options with checkboxes.

## Features
- Supports multiple selections with checkboxes
- Custom label and placeholder text
- Disabled state
- Customizable max height for dropdown panel
- Shows number of selected items when more than 2 are selected
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<MultiSelectComponent>;

// Sample options
const sampleOptions: MultiSelectOption[] = [
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
  { id: 'mixed', label: 'Mixed' }
];

export const Basic: Story = {
  render: (args) => ({
    props: args,
    template: `
      <sv-multi-select
        [label]="label"
        [options]="options"
        [disabled]="disabled"
        [maxHeight]="maxHeight"
        [placeholder]="placeholder"
        [customClass]="customClass"
        (selectionChange)="selectionChange($event)"
      ></sv-multi-select>
    `,
  }),
  args: {
    label: 'Select Level',
    options: sampleOptions,
    disabled: false,
    maxHeight: '250px',
    placeholder: 'Select Level',
    customClass: '',
  },
};

export const WithPreselected: Story = {
  render: (args) => ({
    props: args,
    template: `
      <sv-multi-select
        [label]="label"
        [options]="options"
        [disabled]="disabled"
        [maxHeight]="maxHeight"
        [placeholder]="placeholder"
        [customClass]="customClass"
        (selectionChange)="selectionChange($event)"
      ></sv-multi-select>
    `,
  }),
  args: {
    label: 'Select Level',
    options: [
      { id: 'beginner', label: 'Beginner', selected: true },
      { id: 'intermediate', label: 'Intermediate' },
      { id: 'advanced', label: 'Advanced', selected: true },
      { id: 'mixed', label: 'Mixed' }
    ],
    disabled: false,
    maxHeight: '250px',
    placeholder: 'Select Level',
    customClass: '',
  },
};

export const Disabled: Story = {
  render: (args) => ({
    props: args,
    template: `
      <sv-multi-select
        [label]="label"
        [options]="options"
        [disabled]="disabled"
        [maxHeight]="maxHeight"
        [placeholder]="placeholder"
        [customClass]="customClass"
        (selectionChange)="selectionChange($event)"
      ></sv-multi-select>
    `,
  }),
  args: {
    label: 'Select Level',
    options: sampleOptions,
    disabled: true,
    maxHeight: '250px',
    placeholder: 'Select Level',
    customClass: '',
  },
};

export const WithDisabledOptions: Story = {
  render: (args) => ({
    props: args,
    template: `
      <sv-multi-select
        [label]="label"
        [options]="options"
        [disabled]="disabled"
        [maxHeight]="maxHeight"
        [placeholder]="placeholder"
        [customClass]="customClass"
        (selectionChange)="selectionChange($event)"
      ></sv-multi-select>
    `,
  }),
  args: {
    label: 'Select Level',
    options: [
      { id: 'beginner', label: 'Beginner' },
      { id: 'intermediate', label: 'Intermediate', disabled: true },
      { id: 'advanced', label: 'Advanced' },
      { id: 'mixed', label: 'Mixed', disabled: true }
    ],
    disabled: false,
    maxHeight: '250px',
    placeholder: 'Select Level',
    customClass: '',
  },
};

export const CustomPlaceholder: Story = {
  render: (args) => ({
    props: args,
    template: `
      <sv-multi-select
        [label]="label"
        [options]="options"
        [disabled]="disabled"
        [maxHeight]="maxHeight"
        [placeholder]="placeholder"
        [customClass]="customClass"
        (selectionChange)="selectionChange($event)"
      ></sv-multi-select>
    `,
  }),
  args: {
    label: 'Select Level',
    options: sampleOptions,
    disabled: false,
    maxHeight: '250px',
    placeholder: 'Choose a skill level',
    customClass: '',
  },
};

export const AllVariants: Story = {
  render: () => ({
    props: {
      basicOptions: sampleOptions,
      preselectedOptions: [
        { id: 'beginner', label: 'Beginner', selected: true },
        { id: 'intermediate', label: 'Intermediate', selected: true },
        { id: 'advanced', label: 'Advanced' },
        { id: 'mixed', label: 'Mixed' }
      ],
      disabledOptions: [
        { id: 'beginner', label: 'Beginner' },
        { id: 'intermediate', label: 'Intermediate', disabled: true },
        { id: 'advanced', label: 'Advanced' },
        { id: 'mixed', label: 'Mixed', disabled: true }
      ],
      onSelectionChange: (event: any) => console.log('Selection changed:', event)
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <p style="font-weight: 500; margin-bottom: 8px;">Basic Multi-Select</p>
          <sv-multi-select
            label="Select Level"
            [options]="basicOptions"
            (selectionChange)="onSelectionChange($event)"
          ></sv-multi-select>
        </div>
        
        <div>
          <p style="font-weight: 500; margin-bottom: 8px;">With Preselected Options</p>
          <sv-multi-select
            label="Select Level"
            [options]="preselectedOptions"
            (selectionChange)="onSelectionChange($event)"
          ></sv-multi-select>
        </div>
        
        <div>
          <p style="font-weight: 500; margin-bottom: 8px;">Disabled Multi-Select</p>
          <sv-multi-select
            label="Select Level"
            [options]="basicOptions"
            [disabled]="true"
          ></sv-multi-select>
        </div>
        
        <div>
          <p style="font-weight: 500; margin-bottom: 8px;">With Disabled Options</p>
          <sv-multi-select
            label="Select Level"
            [options]="disabledOptions"
            (selectionChange)="onSelectionChange($event)"
          ></sv-multi-select>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'A showcase of different multi-select component variants.',
      },
    },
  },
}; 