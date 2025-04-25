import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { TableComponent } from '../../components/table/table.component';
import { CommonModule } from '@angular/common';

const meta: Meta<TableComponent<any>> = {
  title: 'Components/Table',
  component: TableComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
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
    rowClick: { action: 'rowClicked' },
    sort: { action: 'sorted' },
    selectionChange: { action: 'selectionChanged' },
  },
};

export default meta;

type Story = StoryObj<TableComponent<any>>;

const mockData = [
  { id: 1, name: 'John Doe', age: 30, location: 'New York', status: 'Active' },
  { id: 2, name: 'Jane Smith', age: 25, location: 'Los Angeles', status: 'Inactive' },
  { id: 3, name: 'Bob Johnson', age: 40, location: 'Chicago', status: 'Active' },
  { id: 4, name: 'Alice Brown', age: 35, location: 'Houston', status: 'Pending' },
  { id: 5, name: 'Charlie Wilson', age: 28, location: 'Phoenix', status: 'Active' },
];

const mockColumns = [
  { key: 'id', header: 'ID', sortable: true, width: '10%' },
  { key: 'name', header: 'Name', sortable: true, width: '25%' },
  { key: 'age', header: 'Age', sortable: true, width: '15%' },
  { key: 'location', header: 'Location', sortable: true, width: '25%' },
  { key: 'status', header: 'Status', sortable: true, width: '25%' },
];

export const Basic: Story = {
  render: (args) => ({
    props: args,
    template: `
      <sv-table
        [data]="data"
        [columns]="columns"
        [loading]="loading"
        [selectable]="selectable"
        [sortable]="sortable"
        [emptyStateMessage]="emptyStateMessage"
        [selectedRows]="selectedRows"
        [rowIdentifierKey]="rowIdentifierKey"
        (rowClick)="rowClick($event)"
        (sort)="sort($event)"
        (selectionChange)="selectionChange($event)"
      ></sv-table>
    `,
  }),
  args: {
    data: mockData,
    columns: mockColumns,
    loading: false,
    selectable: false,
    sortable: true,
    emptyStateMessage: 'No data available',
    selectedRows: [],
    rowIdentifierKey: 'id',
  },
};

export const Selectable: Story = {
  render: (args) => ({
    props: args,
    template: `
      <sv-table
        [data]="data"
        [columns]="columns"
        [loading]="loading"
        [selectable]="selectable"
        [sortable]="sortable"
        [emptyStateMessage]="emptyStateMessage"
        [selectedRows]="selectedRows"
        [rowIdentifierKey]="rowIdentifierKey"
        (rowClick)="rowClick($event)"
        (sort)="sort($event)"
        (selectionChange)="selectionChange($event)"
      ></sv-table>
    `,
  }),
  args: {
    data: mockData,
    columns: mockColumns,
    loading: false,
    selectable: true,
    sortable: true,
    emptyStateMessage: 'No data available',
    selectedRows: [],
    rowIdentifierKey: 'id',
  },
};

export const Loading: Story = {
  render: (args) => ({
    props: args,
    template: `
      <sv-table
        [data]="data"
        [columns]="columns"
        [loading]="loading"
        [selectable]="selectable"
        [sortable]="sortable"
        [emptyStateMessage]="emptyStateMessage"
        [selectedRows]="selectedRows"
        [rowIdentifierKey]="rowIdentifierKey"
        (rowClick)="rowClick($event)"
        (sort)="sort($event)"
        (selectionChange)="selectionChange($event)"
      ></sv-table>
    `,
  }),
  args: {
    data: mockData,
    columns: mockColumns,
    loading: true,
    selectable: false,
    sortable: true,
    emptyStateMessage: 'No data available',
    selectedRows: [],
    rowIdentifierKey: 'id',
  },
};

export const Empty: Story = {
  render: (args) => ({
    props: args,
    template: `
      <sv-table
        [data]="data"
        [columns]="columns"
        [loading]="loading"
        [selectable]="selectable"
        [sortable]="sortable"
        [emptyStateMessage]="emptyStateMessage"
        [selectedRows]="selectedRows"
        [rowIdentifierKey]="rowIdentifierKey"
        (rowClick)="rowClick($event)"
        (sort)="sort($event)"
        (selectionChange)="selectionChange($event)"
      ></sv-table>
    `,
  }),
  args: {
    data: [],
    columns: mockColumns,
    loading: false,
    selectable: false,
    sortable: true,
    emptyStateMessage: 'No data available',
    selectedRows: [],
    rowIdentifierKey: 'id',
  },
};

export const PreSelected: Story = {
  render: (args) => ({
    props: args,
    template: `
      <sv-table
        [data]="data"
        [columns]="columns"
        [loading]="loading"
        [selectable]="selectable"
        [sortable]="sortable"
        [emptyStateMessage]="emptyStateMessage"
        [selectedRows]="selectedRows"
        [rowIdentifierKey]="rowIdentifierKey"
        (rowClick)="rowClick($event)"
        (sort)="sort($event)"
        (selectionChange)="selectionChange($event)"
      ></sv-table>
    `,
  }),
  args: {
    data: mockData,
    columns: mockColumns,
    loading: false,
    selectable: true,
    sortable: true,
    emptyStateMessage: 'No data available',
    selectedRows: [mockData[0], mockData[2]],
    rowIdentifierKey: 'id',
  },
};

export const NonSortable: Story = {
  render: (args) => ({
    props: args,
    template: `
      <sv-table
        [data]="data"
        [columns]="columns"
        [loading]="loading"
        [selectable]="selectable"
        [sortable]="sortable"
        [emptyStateMessage]="emptyStateMessage"
        [selectedRows]="selectedRows"
        [rowIdentifierKey]="rowIdentifierKey"
        (rowClick)="rowClick($event)"
        (sort)="sort($event)"
        (selectionChange)="selectionChange($event)"
      ></sv-table>
    `,
  }),
  args: {
    data: mockData,
    columns: mockColumns,
    loading: false,
    selectable: false,
    sortable: false,
    emptyStateMessage: 'No data available',
    selectedRows: [],
    rowIdentifierKey: 'id',
  },
};

export const AllFeatures: Story = {
  render: (args) => ({
    props: args,
    template: `
      <sv-table
        [data]="data"
        [columns]="columns"
        [loading]="loading"
        [selectable]="selectable"
        [sortable]="sortable"
        [emptyStateMessage]="emptyStateMessage"
        [selectedRows]="selectedRows"
        [rowIdentifierKey]="rowIdentifierKey"
        (rowClick)="rowClick($event)"
        (sort)="sort($event)"
        (selectionChange)="selectionChange($event)"
      ></sv-table>
    `,
  }),
  args: {
    data: mockData,
    columns: mockColumns,
    loading: false,
    selectable: true,
    sortable: true,
    emptyStateMessage: 'No data available',
    selectedRows: [mockData[1]],
    rowIdentifierKey: 'id',
  },
}; 