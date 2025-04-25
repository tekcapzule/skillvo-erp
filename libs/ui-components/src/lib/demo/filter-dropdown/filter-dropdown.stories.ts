import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BrowserModule } from '@angular/platform-browser';
import { action } from '@storybook/addon-actions';
import { FilterDropdownComponent, FilterGroup } from '../../components/filter-dropdown/filter-dropdown.component';

interface FilterDropdownArgs {
  label?: string;
  disabled?: boolean;
  isOpen?: boolean;
  showSelectedCount?: boolean;
  filterGroups?: FilterGroup[];
  customClass?: string;
}

// Sample filter options
const statusOptions: FilterGroup = {
  id: 'status',
  label: 'Status',
  options: [
    { id: 'active', label: 'Active', selected: false },
    { id: 'pending', label: 'Pending', selected: false },
    { id: 'completed', label: 'Completed', selected: false },
    { id: 'cancelled', label: 'Cancelled', selected: false }
  ]
};

const priorityOptions: FilterGroup = {
  id: 'priority',
  label: 'Priority',
  options: [
    { id: 'high', label: 'High', selected: false },
    { id: 'medium', label: 'Medium', selected: false },
    { id: 'low', label: 'Low', selected: false }
  ]
};

const categoryOptions: FilterGroup = {
  id: 'category',
  label: 'Category',
  options: [
    { id: 'development', label: 'Development', selected: false },
    { id: 'design', label: 'Design', selected: false },
    { id: 'marketing', label: 'Marketing', selected: false },
    { id: 'business', label: 'Business', selected: false },
    { id: 'sales', label: 'Sales', selected: false }
  ]
};

const meta: Meta<FilterDropdownComponent> = {
  title: 'Components/FilterDropdown',
  component: FilterDropdownComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [FilterDropdownComponent, BrowserModule],
    }),
  ],
  argTypes: {
    label: { 
      control: 'text',
      description: 'The filter button label'
    },
    disabled: { 
      control: 'boolean',
      description: 'Whether the component is disabled'
    },
    isOpen: { 
      control: 'boolean',
      description: 'Whether the dropdown is open'
    },
    showSelectedCount: { 
      control: 'boolean',
      description: 'Whether to show the count of selected filters'
    },
    filterGroups: { 
      control: 'object',
      description: 'Groups of filter options'
    },
    filterChange: { action: 'filterChange' },
    openChange: { action: 'openChange' },
    clearFilters: { action: 'clearFilters' }
  },
  parameters: {
    docs: {
      description: {
        component: 'A dropdown filter component with multi-select options and clear functionality.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<FilterDropdownComponent>;

// Base story with common properties
export const Basic: Story = {
  args: {
    label: 'Filter',
    disabled: false,
    isOpen: false,
    showSelectedCount: true,
    filterGroups: [statusOptions, priorityOptions],
    customClass: ''
  } as FilterDropdownArgs,
  render: (args) => ({
    props: {
      ...args,
      filterChange: action('filterChange'),
      openChange: action('openChange'),
      clearFilters: action('clearFilters')
    }
  })
};

// Variant with pre-selected options
export const WithPreselected: Story = {
  args: {
    ...Basic.args,
    filterGroups: [
      {
        ...statusOptions,
        options: statusOptions.options.map(opt => 
          opt.id === 'active' ? { ...opt, selected: true } : opt
        )
      },
      priorityOptions
    ]
  } as FilterDropdownArgs,
};

// Variant with multiple filter groups
export const MultipleGroups: Story = {
  args: {
    ...Basic.args,
    filterGroups: [statusOptions, priorityOptions, categoryOptions]
  } as FilterDropdownArgs,
};

// Variant with the dropdown open
export const OpenDropdown: Story = {
  args: {
    ...Basic.args,
    isOpen: true
  } as FilterDropdownArgs,
};

// Disabled variant
export const Disabled: Story = {
  args: {
    ...Basic.args,
    disabled: true
  } as FilterDropdownArgs,
};

// Custom label
export const CustomLabel: Story = {
  args: {
    ...Basic.args,
    label: 'Filter Jobs'
  } as FilterDropdownArgs,
}; 