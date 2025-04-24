import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';
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
      options: ['primary', 'secondary', 'tertiary', 'ghost', 'danger'],
      description: 'Button visual style variant',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button should take up the full width of its container',
    },
    iconLeft: {
      control: 'text',
      description: 'Icon class for the left side of the button',
    },
    iconRight: {
      control: 'text',
      description: 'Icon class for the right side of the button',
    },
    buttonClick: {
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
- Use ghost buttons for subtle UI elements
- Use danger buttons for destructive actions
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

export const Ghost: Story = {
  render: () => ({
    template: `<sv-button variant="ghost">Ghost Button</sv-button>`,
  }),
};

export const Danger: Story = {
  render: () => ({
    template: `<sv-button variant="danger">Danger Button</sv-button>`,
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

// States
export const Disabled: Story = {
  render: () => ({
    template: `<sv-button [disabled]="true">Disabled Button</sv-button>`,
  }),
};

export const FullWidth: Story = {
  render: () => ({
    template: `<sv-button [fullWidth]="true">Full Width Button</sv-button>`,
  }),
};

// With Icons
export const WithLeftIcon: Story = {
  render: () => ({
    template: `<sv-button iconLeft="fas fa-plus">Add New</sv-button>`,
  }),
};

export const WithRightIcon: Story = {
  render: () => ({
    template: `<sv-button iconRight="fas fa-arrow-right">Continue</sv-button>`,
  }),
};

export const WithBothIcons: Story = {
  render: () => ({
    template: `<sv-button iconLeft="fas fa-cog" iconRight="fas fa-chevron-down">Settings</sv-button>`,
  }),
};

// Demo of all variants
export const AllVariants: Story = {
  render: () => ({
    template: `
      <h3>Button Variants</h3>
      <div style="display: flex; gap: 12px; margin-bottom: 24px; align-items: center;">
        <sv-button variant="primary">Primary</sv-button>
        <sv-button variant="secondary">Secondary</sv-button>
        <sv-button variant="tertiary">Tertiary</sv-button>
        <sv-button variant="ghost">Ghost</sv-button>
        <sv-button variant="danger">Danger</sv-button>
      </div>
      
      <h3>Button Sizes</h3>
      <div style="display: flex; gap: 12px; margin-bottom: 24px; align-items: center;">
        <sv-button size="sm">Small</sv-button>
        <sv-button size="md">Medium</sv-button>
        <sv-button size="lg">Large</sv-button>
      </div>
      
      <h3>Disabled Buttons</h3>
      <div style="display: flex; gap: 12px; margin-bottom: 24px; align-items: center;">
        <sv-button [disabled]="true">Disabled</sv-button>
        <sv-button variant="secondary" [disabled]="true">Disabled</sv-button>
        <sv-button variant="tertiary" [disabled]="true">Disabled</sv-button>
      </div>
      
      <h3>Full Width Buttons</h3>
      <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px;">
        <sv-button [fullWidth]="true">Full Width Button</sv-button>
        <sv-button variant="secondary" [fullWidth]="true">Full Width Secondary</sv-button>
      </div>
      
      <h3>Buttons with Icons</h3>
      <div style="display: flex; gap: 12px; margin-bottom: 24px; align-items: center;">
        <sv-button iconLeft="fas fa-plus">Add New</sv-button>
        <sv-button variant="secondary" iconRight="fas fa-arrow-right">Continue</sv-button>
        <sv-button variant="ghost" iconLeft="fas fa-cog">Settings</sv-button>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'A showcase of all button variants and options.',
      },
    },
  },
};
