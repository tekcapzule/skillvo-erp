import type { Meta, StoryObj } from '@storybook/angular';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

const meta: Meta<PaginationComponent> = {
  component: PaginationComponent,
  title: 'Components/Pagination',
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Pagination component for navigating through pages of data.
- Displays current range of items
- Allows page size selection
- First/Last page navigation options
- Responsive for different screen sizes
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<PaginationComponent>;

// Basic Pagination
export const Basic: Story = {
  render: () => ({
    props: {
      page: 0,
      pageSize: 10,
      length: 100,
      onPageChange: (event: any) => console.log('Page changed:', event),
    },
    template: `
      <sv-pagination
        [page]="page"
        [pageSize]="pageSize"
        [length]="length"
        (pageChange)="onPageChange($event)"
      ></sv-pagination>
    `,
  }),
};

// Current Page Set
export const CurrentPageSet: Story = {
  render: () => ({
    props: {
      page: 3,
      pageSize: 10,
      length: 100,
      onPageChange: (event: any) => console.log('Page changed:', event),
    },
    template: `
      <sv-pagination
        [page]="page"
        [pageSize]="pageSize"
        [length]="length"
        (pageChange)="onPageChange($event)"
      ></sv-pagination>
    `,
  }),
};

// Custom Page Size Options
export const CustomPageSizeOptions: Story = {
  render: () => ({
    props: {
      page: 0,
      pageSize: 25,
      length: 100,
      pageSizeOptions: [5, 10, 25, 50],
      onPageChange: (event: any) => console.log('Page changed:', event),
    },
    template: `
      <sv-pagination
        [page]="page"
        [pageSize]="pageSize"
        [length]="length"
        [pageSizeOptions]="pageSizeOptions"
        (pageChange)="onPageChange($event)"
      ></sv-pagination>
    `,
  }),
};

// Hide Page Size Selector
export const HidePageSize: Story = {
  render: () => ({
    props: {
      page: 0,
      pageSize: 10,
      length: 100,
      hidePageSize: true,
      onPageChange: (event: any) => console.log('Page changed:', event),
    },
    template: `
      <sv-pagination
        [page]="page"
        [pageSize]="pageSize"
        [length]="length"
        [hidePageSize]="hidePageSize"
        (pageChange)="onPageChange($event)"
      ></sv-pagination>
    `,
  }),
};

// Without First/Last Buttons
export const WithoutFirstLastButtons: Story = {
  render: () => ({
    props: {
      page: 0,
      pageSize: 10,
      length: 100,
      showFirstLastButtons: false,
      onPageChange: (event: any) => console.log('Page changed:', event),
    },
    template: `
      <sv-pagination
        [page]="page"
        [pageSize]="pageSize"
        [length]="length"
        [showFirstLastButtons]="showFirstLastButtons"
        (pageChange)="onPageChange($event)"
      ></sv-pagination>
    `,
  }),
};

// Disabled Pagination
export const Disabled: Story = {
  render: () => ({
    props: {
      page: 2,
      pageSize: 10,
      length: 100,
      disabled: true,
      onPageChange: (event: any) => console.log('Page changed:', event),
    },
    template: `
      <sv-pagination
        [page]="page"
        [pageSize]="pageSize"
        [length]="length"
        [disabled]="disabled"
        (pageChange)="onPageChange($event)"
      ></sv-pagination>
    `,
  }),
};

// Many Pages
export const ManyPages: Story = {
  render: () => ({
    props: {
      page: 5,
      pageSize: 10,
      length: 1000,
      onPageChange: (event: any) => console.log('Page changed:', event),
    },
    template: `
      <sv-pagination
        [page]="page"
        [pageSize]="pageSize"
        [length]="length"
        (pageChange)="onPageChange($event)"
      ></sv-pagination>
    `,
  }),
};

// No Items
export const NoItems: Story = {
  render: () => ({
    props: {
      page: 0,
      pageSize: 10,
      length: 0,
      onPageChange: (event: any) => console.log('Page changed:', event),
    },
    template: `
      <sv-pagination
        [page]="page"
        [pageSize]="pageSize"
        [length]="length"
        (pageChange)="onPageChange($event)"
      ></sv-pagination>
    `,
  }),
};

// Table with Pagination
export const TableWithPagination: Story = {
  render: () => ({
    props: {
      page: 0,
      pageSize: 5,
      length: 100,
      onPageChange: (event: any) => console.log('Page changed:', event),
    },
    template: `
      <div style="padding: 20px; background-color: #f5f5f5;">
        <h2 style="margin-bottom: 16px; font-family: 'Work Sans', sans-serif;">Task List Example</h2>
        
        <!-- Placeholder for table -->
        <div style="padding: 16px; background-color: white; border-radius: 8px; margin-bottom: 16px;">
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <th style="text-align: left; padding: 12px 8px;">Task ID</th>
                <th style="text-align: left; padding: 12px 8px;">Task Name</th>
                <th style="text-align: left; padding: 12px 8px;">Status</th>
                <th style="text-align: left; padding: 12px 8px;">Due Date</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px 8px;">TSK-001</td>
                <td style="padding: 12px 8px;">Complete Angular Training</td>
                <td style="padding: 12px 8px;">In Progress</td>
                <td style="padding: 12px 8px;">2023-12-15</td>
              </tr>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px 8px;">TSK-002</td>
                <td style="padding: 12px 8px;">Review Figma Designs</td>
                <td style="padding: 12px 8px;">Not Started</td>
                <td style="padding: 12px 8px;">2023-12-18</td>
              </tr>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px 8px;">TSK-003</td>
                <td style="padding: 12px 8px;">Deploy New Feature</td>
                <td style="padding: 12px 8px;">Not Started</td>
                <td style="padding: 12px 8px;">2023-12-20</td>
              </tr>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px 8px;">TSK-004</td>
                <td style="padding: 12px 8px;">Bug Fix - Login Page</td>
                <td style="padding: 12px 8px;">Completed</td>
                <td style="padding: 12px 8px;">2023-12-10</td>
              </tr>
              <tr>
                <td style="padding: 12px 8px;">TSK-005</td>
                <td style="padding: 12px 8px;">Write Documentation</td>
                <td style="padding: 12px 8px;">In Progress</td>
                <td style="padding: 12px 8px;">2023-12-22</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Pagination component -->
        <sv-pagination
          [page]="page"
          [pageSize]="pageSize"
          [length]="length"
          (pageChange)="onPageChange($event)"
        ></sv-pagination>
      </div>
    `,
  }),
}; 