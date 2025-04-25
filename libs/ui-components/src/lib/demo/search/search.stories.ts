import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { SearchComponent } from '../../components/search/search.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const meta: Meta<SearchComponent> = {
  title: 'Components/Search',
  component: SearchComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FormsModule],
    }),
  ],
  argTypes: {
    value: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    autoFocus: { control: 'boolean' },
    customClass: { control: 'text' },
    ariaLabel: { control: 'text' },
    valueChange: { action: 'valueChange' },
    search: { action: 'search' },
    clear: { action: 'clear' },
  },
  parameters: {
    docs: {
      description: {
        component: `
# Search Component

A search input component with clear functionality and search icon.

## Features
- Customizable placeholder text
- Clear button that appears when text is entered
- Search icon
- Disabled state
- Auto-focus capability
- Events for value changes and search actions
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<SearchComponent>;

export const Basic: Story = {
  render: (args) => ({
    props: args,
    template: `
      <sv-search
        [value]="value"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [autoFocus]="autoFocus"
        [customClass]="customClass"
        [ariaLabel]="ariaLabel"
        (valueChange)="valueChange($event)"
        (search)="search($event)"
        (clear)="clear()"
      ></sv-search>
    `,
  }),
  args: {
    value: '',
    placeholder: 'Search',
    disabled: false,
    autoFocus: false,
    customClass: '',
    ariaLabel: 'Search',
  },
};

export const WithValue: Story = {
  render: (args) => ({
    props: args,
    template: `
      <sv-search
        [value]="value"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [autoFocus]="autoFocus"
        [customClass]="customClass"
        [ariaLabel]="ariaLabel"
        (valueChange)="valueChange($event)"
        (search)="search($event)"
        (clear)="clear()"
      ></sv-search>
    `,
  }),
  args: {
    value: 'Initial search value',
    placeholder: 'Search',
    disabled: false,
    autoFocus: false,
    customClass: '',
    ariaLabel: 'Search',
  },
};

export const CustomPlaceholder: Story = {
  render: (args) => ({
    props: args,
    template: `
      <sv-search
        [value]="value"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [autoFocus]="autoFocus"
        [customClass]="customClass"
        [ariaLabel]="ariaLabel"
        (valueChange)="valueChange($event)"
        (search)="search($event)"
        (clear)="clear()"
      ></sv-search>
    `,
  }),
  args: {
    value: '',
    placeholder: 'Find components',
    disabled: false,
    autoFocus: false,
    customClass: '',
    ariaLabel: 'Search components',
  },
};

export const Disabled: Story = {
  render: (args) => ({
    props: args,
    template: `
      <sv-search
        [value]="value"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [autoFocus]="autoFocus"
        [customClass]="customClass"
        [ariaLabel]="ariaLabel"
        (valueChange)="valueChange($event)"
        (search)="search($event)"
        (clear)="clear()"
      ></sv-search>
    `,
  }),
  args: {
    value: '',
    placeholder: 'Search',
    disabled: true,
    autoFocus: false,
    customClass: '',
    ariaLabel: 'Search',
  },
};

export const WithAutoFocus: Story = {
  render: (args) => ({
    props: args,
    template: `
      <sv-search
        [value]="value"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [autoFocus]="autoFocus"
        [customClass]="customClass"
        [ariaLabel]="ariaLabel"
        (valueChange)="valueChange($event)"
        (search)="search($event)"
        (clear)="clear()"
      ></sv-search>
    `,
  }),
  args: {
    value: '',
    placeholder: 'Search',
    disabled: false,
    autoFocus: true,
    customClass: '',
    ariaLabel: 'Search',
  },
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <p style="font-weight: 500; margin-bottom: 8px;">Default Search</p>
          <sv-search placeholder="Search"></sv-search>
        </div>
        
        <div>
          <p style="font-weight: 500; margin-bottom: 8px;">With Value</p>
          <sv-search value="Search term" placeholder="Search"></sv-search>
        </div>
        
        <div>
          <p style="font-weight: 500; margin-bottom: 8px;">Custom Placeholder</p>
          <sv-search placeholder="Find components"></sv-search>
        </div>
        
        <div>
          <p style="font-weight: 500; margin-bottom: 8px;">Disabled Search</p>
          <sv-search placeholder="Search" [disabled]="true"></sv-search>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'A showcase of different search component variants.',
      },
    },
  },
}; 