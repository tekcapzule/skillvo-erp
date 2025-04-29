import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from '../../components/button/button.component';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

const meta: Meta<ButtonComponent> = {
  component: ButtonComponent,
  title: 'Components/Button',
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'outline', 'link', 'destructive'],
      description: 'Button visual style variant',
      defaultValue: 'primary',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Button size',
      defaultValue: 'md',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      defaultValue: false,
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button should take up the full width of its container',
      defaultValue: false,
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in loading state',
      defaultValue: false,
    },
    icon: {
      control: 'text',
      description: 'Icon class to display in the button',
    },
    iconPosition: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'Position of the icon',
      defaultValue: 'left',
    },
    withRipple: {
      control: 'boolean',
      description: 'Whether to show ripple effect on click',
      defaultValue: false,
    },
    responsive: {
      control: 'boolean',
      description: 'Button becomes full width on mobile devices',
      defaultValue: false,
    },
    clicked: {
      action: 'clicked',
      description: 'Event emitted when the button is clicked',
    },
  },
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Button component for user interactions.
- Use primary buttons for main actions
- Use secondary/tertiary buttons for less prominent actions
- Use outline buttons for bordered appearance
- Use link buttons for text-like actions
- Use destructive buttons for destructive actions
- Use loading state for asynchronous operations
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

// Variants
export const Primary: Story = {
  render: () => ({
    template: `<sv-button variant="primary">Primary Button</sv-button>`,
  }),
};

export const Secondary: Story = {
  render: () => ({
    template: `<sv-button variant="secondary">Secondary Button</sv-button>`,
  }),
};

export const Tertiary: Story = {
  render: () => ({
    template: `<sv-button variant="tertiary">Tertiary Button</sv-button>`,
  }),
};

export const Outline: Story = {
  render: () => ({
    template: `<sv-button variant="outline">Outline Button</sv-button>`,
  }),
};

export const Link: Story = {
  render: () => ({
    template: `<sv-button variant="link">Link Button</sv-button>`,
  }),
};

export const Destructive: Story = {
  render: () => ({
    template: `<sv-button variant="destructive">Destructive Button</sv-button>`,
  }),
};

// Sizes
export const Small: Story = {
  render: () => ({
    template: `<sv-button size="sm">Small Button</sv-button>`,
  }),
};

export const Medium: Story = {
  render: () => ({
    template: `<sv-button size="md">Medium Button</sv-button>`,
  }),
};

export const Large: Story = {
  render: () => ({
    template: `<sv-button size="lg">Large Button</sv-button>`,
  }),
};

export const ExtraLarge: Story = {
  render: () => ({
    template: `<sv-button size="xl">Extra Large Button</sv-button>`,
  }),
};

// States
export const Disabled: Story = {
  render: () => ({
    template: `<sv-button [disabled]="true">Disabled Button</sv-button>`,
  }),
};

export const Loading: Story = {
  render: () => ({
    template: `<sv-button [loading]="true">Loading Button</sv-button>`,
  }),
};

export const LoadingWithIcon: Story = {
  render: () => ({
    template: `<sv-button [loading]="true" icon="fas fa-save" iconPosition="left">Saving...</sv-button>`,
  }),
};

export const FullWidth: Story = {
  render: () => ({
    template: `<sv-button [fullWidth]="true">Full Width Button</sv-button>`,
  }),
};

export const Responsive: Story = {
  render: () => ({
    template: `<sv-button [responsive]="true">Responsive Button</sv-button>`,
  }),
  parameters: {
    docs: {
      description: {
        story: 'This button becomes full width on mobile devices.',
      },
    },
  },
};

// With Icons
export const WithLeftIcon: Story = {
  render: () => ({
    template: `<sv-button icon="fas fa-plus" iconPosition="left">Add New</sv-button>`,
  }),
};

export const WithRightIcon: Story = {
  render: () => ({
    template: `<sv-button icon="fas fa-arrow-right" iconPosition="right">Continue</sv-button>`,
  }),
};

export const WithRippleEffect: Story = {
  render: () => ({
    template: `<sv-button [withRipple]="true">With Ripple Effect</sv-button>`,
  }),
};

// Demo of all variants and features
export const AllVariants: Story = {
  render: () => ({
    template: `
      <div>
        <h3>Button Variants</h3>
        <div style="display: flex; gap: 12px; margin-bottom: 24px; align-items: center; flex-wrap: wrap;">
          <sv-button variant="primary">Primary</sv-button>
          <sv-button variant="secondary">Secondary</sv-button>
          <sv-button variant="tertiary">Tertiary</sv-button>
          <sv-button variant="outline">Outline</sv-button>
          <sv-button variant="link">Link</sv-button>
          <sv-button variant="destructive">Destructive</sv-button>
        </div>
        
        <h3>Button Sizes</h3>
        <div style="display: flex; gap: 12px; margin-bottom: 24px; align-items: center;">
          <sv-button size="sm">Small</sv-button>
          <sv-button size="md">Medium</sv-button>
          <sv-button size="lg">Large</sv-button>
          <sv-button size="xl">Extra Large</sv-button>
        </div>
        
        <h3>Button States</h3>
        <div style="display: flex; gap: 12px; margin-bottom: 24px; align-items: center; flex-wrap: wrap;">
          <sv-button [disabled]="true">Disabled</sv-button>
          <sv-button [loading]="true">Loading</sv-button>
          <sv-button [loading]="true" variant="primary" icon="fas fa-save">Saving</sv-button>
          <sv-button [withRipple]="true">With Ripple</sv-button>
        </div>
        
        <h3>Full Width & Responsive Buttons</h3>
        <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px;">
          <sv-button [fullWidth]="true">Full Width Button</sv-button>
          <sv-button variant="secondary" [responsive]="true">Responsive Button (Resizes on Mobile)</sv-button>
        </div>
        
        <h3>Buttons with Icons</h3>
        <div style="display: flex; gap: 12px; margin-bottom: 24px; align-items: center; flex-wrap: wrap;">
          <sv-button icon="fas fa-plus" iconPosition="left">Add New</sv-button>
          <sv-button variant="secondary" icon="fas fa-arrow-right" iconPosition="right">Continue</sv-button>
          <sv-button variant="outline" icon="fas fa-cog" iconPosition="left">Settings</sv-button>
          <sv-button variant="link" icon="fas fa-external-link" iconPosition="right">Open Link</sv-button>
        </div>
        
        <h3>Loading Buttons</h3>
        <div style="display: flex; gap: 12px; margin-bottom: 24px; align-items: center; flex-wrap: wrap;">
          <sv-button variant="primary" [loading]="true">Loading Primary</sv-button>
          <sv-button variant="secondary" [loading]="true">Loading Secondary</sv-button>
          <sv-button variant="tertiary" [loading]="true">Loading Tertiary</sv-button>
          <sv-button variant="destructive" [loading]="true">Loading Destructive</sv-button>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'A showcase of all button variants, sizes, states and features.',
      },
    },
  },
};