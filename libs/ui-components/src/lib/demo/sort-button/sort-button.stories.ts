import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { SortButtonComponent, SortDirection } from '../../components/sort-button/sort-button.component';
import { SortButtonDemoComponent } from './sort-button-demo.component';
import { CommonModule } from '@angular/common';

const meta: Meta<SortButtonComponent> = {
  title: 'Components/SortButton',
  component: SortButtonComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, SortButtonComponent, SortButtonDemoComponent],
    }),
  ],
  argTypes: {
    sortDirection: { 
      control: 'select',
      options: ['asc', 'desc'],
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
- Icon-only button that toggles between ascending and descending sort states
- Simple click interaction to change sort direction
- Uses SVG icons with directional arrows
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<SortButtonComponent>;

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
    sortDirection: 'asc',
    disabled: true
  },
};

// Demo with functional toggling
export const InteractiveDemo: StoryObj = {
  render: () => ({
    props: {},
    template: `<sv-sort-button-demo></sv-sort-button-demo>`
  })
}; 