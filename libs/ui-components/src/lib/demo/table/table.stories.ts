import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { TableComponent } from '../../../lib/components/table/table.component';

const meta: Meta<TableComponent<any>> = {
  title: 'Components/Table',
  component: TableComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [TableComponent],
    }),
  ],
  argTypes: {
    data: { control: 'object' },
    columns: { control: 'object' },
    loading: { control: 'boolean' },
    selectable: { control: 'boolean' },
    sortable: { control: 'boolean' },
    emptyStateMessage: { control: 'text' },
    selectedRows: { control: 'object' },
    rowIdentifierKey: { control: 'text' },
    rowClick: { action: 'rowClick' },
    sort: { action: 'sort' },
    selectionChange: { action: 'selectionChange' },
  },
};

export default meta;
type Story = StoryObj<TableComponent<any>>;

// Demo data
const mockData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive' },
  { id: 3, name: 'Michael Brown', email: 'michael@example.com', role: 'Editor', status: 'Active' },
  { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Viewer', status: 'Active' },
  { id: 5, name: 'Robert Johnson', email: 'robert@example.com', role: 'Admin', status: 'Inactive' },
];

// Default columns
const defaultColumns = [
  { key: 'id', header: 'ID', sortable: true, width: '80px' },
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'role', header: 'Role', sortable: true },
  { key: 'status', header: 'Status', sortable: true },
];

// Basic table
export const Basic: Story = {
  args: {
    data: mockData,
    columns: defaultColumns,
  },
  render: (args) => ({
    props: args,
    template: `
      <sv-table
        [data]="data"
        [columns]="columns"
        [selectable]="selectable"
        [loading]="loading"
        [sortable]="sortable"
        [emptyStateMessage]="emptyStateMessage"
        [selectedRows]="selectedRows"
        [rowIdentifierKey]="rowIdentifierKey"
        (rowClick)="rowClick($event)"
        (sort)="sort($event)"
        (selectionChange)="selectionChange($event)">
      </sv-table>
    `,
  }),
};

// Selectable table
export const Selectable: Story = {
  args: {
    ...Basic.args,
    selectable: true,
  },
  render: Basic.render,
};

// Loading state
export const Loading: Story = {
  args: {
    ...Basic.args,
    loading: true,
  },
  render: Basic.render,
};

// Empty state
export const Empty: Story = {
  args: {
    ...Basic.args,
    data: [],
    emptyStateMessage: 'No data available at the moment',
  },
  render: Basic.render,
};

// Pre-selected rows
export const PreSelected: Story = {
  args: {
    ...Selectable.args,
    selectedRows: [mockData[0], mockData[2]],
  },
  render: Basic.render,
};

// Non-sortable table
export const NonSortable: Story = {
  args: {
    ...Basic.args,
    sortable: false,
  },
  render: Basic.render,
};

// All features combined
export const AllFeatures: Story = {
  args: {
    data: mockData,
    columns: defaultColumns,
    selectable: true,
    sortable: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <sv-table
        [data]="data"
        [columns]="columns"
        [selectable]="selectable"
        [loading]="loading"
        [sortable]="sortable"
        [emptyStateMessage]="emptyStateMessage"
        [selectedRows]="selectedRows"
        [rowIdentifierKey]="rowIdentifierKey"
        (rowClick)="rowClick($event)"
        (sort)="sort($event)"
        (selectionChange)="selectionChange($event)">
      </sv-table>
    `,
  }),
}; 