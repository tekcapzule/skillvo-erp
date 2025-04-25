import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DropdownComponent, DropdownOption } from '../../components/dropdown/dropdown.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const meta: Meta<DropdownComponent> = {
  title: 'Components/Dropdown',
  component: DropdownComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FormsModule],
    }),
  ],
  argTypes: {
    options: { control: 'object' },
    selectedId: { control: 'text' },
    disabled: { control: 'boolean' },
    maxHeight: { control: 'text' },
    placeholder: { control: 'text' },
    label: { control: 'text' },
    customClass: { control: 'text' },
    selectionChange: { action: 'selectionChange' }
  },
  parameters: {
    docs: {
      description: {
        component: `
# Dropdown Component

A single-select dropdown component for selecting from a list of options.

## Features
- Single item selection
- Custom label and placeholder text
- Disabled state
- Customizable max height for dropdown panel
- Option highlighting on hover and selection
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<DropdownComponent>;

// Sample options
const sampleOptions: DropdownOption[] = [
  { id: 'beginner', label: 'Beginner' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
  { id: 'mixed', label: 'Mixed' }
];

export const Basic: Story = {
  render: (args) => ({
    props: args,
    template: `
      <sv-dropdown
        [options]="options"
        [selectedId]="selectedId"
        [disabled]="disabled"
        [maxHeight]="maxHeight"
        [placeholder]="placeholder"
        [label]="label"
        [customClass]="customClass"
        (selectionChange)="selectionChange($event)"
      ></sv-dropdown>
    `,
  }),
  args: {
    options: sampleOptions,
    selectedId: undefined,
    disabled: false,
    maxHeight: '250px',
    placeholder: 'Select Level',
    label: 'Select Level',
    customClass: '',
  },
};

export const WithPreselected: Story = {
  render: (args) => ({
    props: args,
    template: `
      <sv-dropdown
        [options]="options"
        [selectedId]="selectedId"
        [disabled]="disabled"
        [maxHeight]="maxHeight"
        [placeholder]="placeholder"
        [label]="label"
        [customClass]="customClass"
        (selectionChange)="selectionChange($event)"
      ></sv-dropdown>
    `,
  }),
  args: {
    options: sampleOptions,
    selectedId: 'intermediate',
    disabled: false,
    maxHeight: '250px',
    placeholder: 'Select Level',
    label: 'Select Level',
    customClass: '',
  },
};

export const Disabled: Story = {
  render: (args) => ({
    props: args,
    template: `
      <sv-dropdown
        [options]="options"
        [selectedId]="selectedId"
        [disabled]="disabled"
        [maxHeight]="maxHeight"
        [placeholder]="placeholder"
        [label]="label"
        [customClass]="customClass"
        (selectionChange)="selectionChange($event)"
      ></sv-dropdown>
    `,
  }),
  args: {
    options: sampleOptions,
    selectedId: undefined,
    disabled: true,
    maxHeight: '250px',
    placeholder: 'Select Level',
    label: 'Select Level',
    customClass: '',
  },
};

export const WithDisabledOptions: Story = {
  render: (args) => ({
    props: args,
    template: `
      <sv-dropdown
        [options]="options"
        [selectedId]="selectedId"
        [disabled]="disabled"
        [maxHeight]="maxHeight"
        [placeholder]="placeholder"
        [label]="label"
        [customClass]="customClass"
        (selectionChange)="selectionChange($event)"
      ></sv-dropdown>
    `,
  }),
  args: {
    options: [
      { id: 'beginner', label: 'Beginner' },
      { id: 'intermediate', label: 'Intermediate', disabled: true },
      { id: 'advanced', label: 'Advanced' },
      { id: 'mixed', label: 'Mixed', disabled: true }
    ],
    selectedId: undefined,
    disabled: false,
    maxHeight: '250px',
    placeholder: 'Select Level',
    label: 'Select Level',
    customClass: '',
  },
};

export const CustomPlaceholder: Story = {
  render: (args) => ({
    props: args,
    template: `
      <sv-dropdown
        [options]="options"
        [selectedId]="selectedId"
        [disabled]="disabled"
        [maxHeight]="maxHeight"
        [placeholder]="placeholder"
        [label]="label"
        [customClass]="customClass"
        (selectionChange)="selectionChange($event)"
      ></sv-dropdown>
    `,
  }),
  args: {
    options: sampleOptions,
    selectedId: undefined,
    disabled: false,
    maxHeight: '250px',
    placeholder: 'Choose a skill level',
    label: 'Select Level',
    customClass: '',
  },
};

export const AllVariants: Story = {
  render: () => ({
    props: {
      basicOptions: sampleOptions,
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
          <p style="font-weight: 500; margin-bottom: 8px;">Basic Dropdown</p>
          <sv-dropdown
            label="Select Level"
            [options]="basicOptions"
            (selectionChange)="onSelectionChange($event)"
          ></sv-dropdown>
        </div>
        
        <div>
          <p style="font-weight: 500; margin-bottom: 8px;">With Preselected Option</p>
          <sv-dropdown
            label="Select Level"
            [options]="basicOptions"
            selectedId="intermediate"
            (selectionChange)="onSelectionChange($event)"
          ></sv-dropdown>
        </div>
        
        <div>
          <p style="font-weight: 500; margin-bottom: 8px;">Disabled Dropdown</p>
          <sv-dropdown
            label="Select Level"
            [options]="basicOptions"
            [disabled]="true"
          ></sv-dropdown>
        </div>
        
        <div>
          <p style="font-weight: 500; margin-bottom: 8px;">With Disabled Options</p>
          <sv-dropdown
            label="Select Level"
            [options]="disabledOptions"
            (selectionChange)="onSelectionChange($event)"
          ></sv-dropdown>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'A showcase of different dropdown component variants.',
      },
    },
  },
}; 