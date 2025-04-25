import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { SortButtonComponent, SortDirection } from '../../components/sort-button/sort-button.component';
import { CommonModule } from '@angular/common';

const meta: Meta<SortButtonComponent> = {
  title: 'Components/SortButton',
  component: SortButtonComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, SortButtonComponent],
    }),
  ],
  argTypes: {
    sortDirection: { 
      control: 'select',
      options: [null, 'asc', 'desc'],
      description: 'Current sort direction'
    },
    disabled: { control: 'boolean' },
    sortChange: { action: 'sortChange' }
  },
  parameters: {
    docs: {
      description: {
        component: `
Sort Button component for table column headers and sortable lists.
- Icon-only button with Font Awesome icons
- Click to cycle through sort directions: null -> asc -> desc -> null
- Visual indicators show current sort state
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<SortButtonComponent>;

export const Basic: Story = {
  args: {
    sortDirection: null,
    disabled: false
  },
};

export const Ascending: Story = {
  args: {
    sortDirection: 'asc',
    disabled: false
  },
};

export const Descending: Story = {
  args: {
    sortDirection: 'desc',
    disabled: false
  },
};

export const Disabled: Story = {
  args: {
    sortDirection: null,
    disabled: true
  },
}; 