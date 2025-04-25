import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ViewToggleComponent, ViewType } from '../../components/view-toggle/view-toggle.component';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

// Define args type to match component inputs
interface ViewToggleArgs {
  selectedView?: ViewType;
  showKanban?: boolean;
  customClass?: string;
  disabled?: boolean;
  options?: {
    id: ViewType;
    label: string;
    svgTemplate: string;
    tooltip?: string;
  }[];
}

const meta: Meta<ViewToggleComponent> = {
  title: 'Components/ViewToggle',
  component: ViewToggleComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [ViewToggleComponent, BrowserModule],
    }),
  ],
  argTypes: {
    selectedView: { 
      control: 'select', 
      options: ['card', 'list', 'kanban'],
      description: 'The currently selected view'
    },
    showKanban: { 
      control: 'boolean',
      description: 'Whether to show the kanban view option'
    },
    disabled: { 
      control: 'boolean',
      description: 'Whether the component is disabled'
    },
    viewChange: { action: 'viewChange' }
  },
  parameters: {
    docs: {
      description: {
        component: 'A toggle component for switching between different view modes. Uses inline SVG icons.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<ViewToggleComponent>;

export const Basic: Story = {
  args: {
    selectedView: 'card',
    showKanban: true,
    disabled: false,
  } as ViewToggleArgs,
};

export const WithoutKanban: Story = {
  args: {
    ...Basic.args,
    showKanban: false,
  } as ViewToggleArgs,
};

export const PreselectedList: Story = {
  args: {
    ...Basic.args,
    selectedView: 'list',
  } as ViewToggleArgs,
};

export const Disabled: Story = {
  args: {
    ...Basic.args,
    disabled: true,
  } as ViewToggleArgs,
};

export const CustomOptions: Story = {
  args: {
    ...Basic.args,
    options: [
      { 
        id: 'card', 
        label: 'Grid View', 
        svgTemplate: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
                        <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
                        <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
                        <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
                     </svg>`, 
        tooltip: 'Show in grid layout' 
      },
      { 
        id: 'list', 
        label: 'Table View', 
        svgTemplate: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 5h18M3 12h18M3 19h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                     </svg>`, 
        tooltip: 'Show in table layout' 
      },
      { 
        id: 'kanban', 
        label: 'Board View', 
        svgTemplate: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="3" width="5" height="18" rx="1" stroke="currentColor" stroke-width="2"/>
                        <rect x="10" y="3" width="5" height="12" rx="1" stroke="currentColor" stroke-width="2"/>
                        <rect x="17" y="3" width="5" height="6" rx="1" stroke="currentColor" stroke-width="2"/>
                     </svg>`, 
        tooltip: 'Show as kanban board' 
      },
    ],
  } as ViewToggleArgs,
}; 