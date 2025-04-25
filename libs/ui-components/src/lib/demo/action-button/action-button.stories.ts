import type { Meta, StoryObj } from '@storybook/angular';
import { ActionButtonComponent } from '../../components/action-button/action-button.component';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

const meta: Meta<ActionButtonComponent> = {
  component: ActionButtonComponent,
  title: 'Components/ActionButton',
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    options: { control: 'object' },
    disabled: { control: 'boolean' },
    variant: { 
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'ghost'],
      description: 'Button visual style variant'
    },
    actionSelected: { action: 'actionSelected' }
  },
  parameters: {
    docs: {
      description: {
        component: `
Action Button component with dropdown for selecting actions.
- Use for contextual actions in tables, cards, etc.
- Configure with different action options
- Supports different button variants
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<ActionButtonComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <sv-action-button
        [options]="[
          { id: 'approve', label: 'Approve' },
          { id: 'deny', label: 'Deny' },
          { id: 'edit', label: 'Edit' }
        ]"
      ></sv-action-button>
    `,
  }),
};

export const WithIcons: Story = {
  render: () => ({
    template: `
      <sv-action-button
        [options]="[
          { id: 'approve', label: 'Approve', icon: 'fas fa-check' },
          { id: 'deny', label: 'Deny', icon: 'fas fa-ban' },
          { id: 'edit', label: 'Edit', icon: 'fas fa-pencil-alt' }
        ]"
      ></sv-action-button>
    `,
  }),
};

export const WithDangerAction: Story = {
  render: () => ({
    template: `
      <sv-action-button
        [options]="[
          { id: 'approve', label: 'Approve' },
          { id: 'deny', label: 'Deny' },
          { id: 'delete', label: 'Delete', danger: true }
        ]"
      ></sv-action-button>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <sv-action-button
        [disabled]="true"
        [options]="[
          { id: 'approve', label: 'Approve' },
          { id: 'deny', label: 'Deny' },
          { id: 'edit', label: 'Edit' }
        ]"
      ></sv-action-button>
    `,
  }),
};

export const CustomLabel: Story = {
  render: () => ({
    template: `
      <sv-action-button
        label="More Options"
        [options]="[
          { id: 'approve', label: 'Approve' },
          { id: 'deny', label: 'Deny' },
          { id: 'edit', label: 'Edit' }
        ]"
      ></sv-action-button>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <sv-action-button
          label="Primary"
          variant="primary"
          [options]="[
            { id: 'approve', label: 'Approve' },
            { id: 'deny', label: 'Deny' },
            { id: 'edit', label: 'Edit' }
          ]"
        ></sv-action-button>
        
        <sv-action-button
          label="Secondary"
          variant="secondary"
          [options]="[
            { id: 'approve', label: 'Approve' },
            { id: 'deny', label: 'Deny' },
            { id: 'edit', label: 'Edit' }
          ]"
        ></sv-action-button>
        
        <sv-action-button
          label="Tertiary"
          variant="tertiary"
          [options]="[
            { id: 'approve', label: 'Approve' },
            { id: 'deny', label: 'Deny' },
            { id: 'edit', label: 'Edit' }
          ]"
        ></sv-action-button>
        
        <sv-action-button
          label="Ghost"
          variant="ghost"
          [options]="[
            { id: 'approve', label: 'Approve' },
            { id: 'deny', label: 'Deny' },
            { id: 'edit', label: 'Edit' }
          ]"
        ></sv-action-button>
      </div>
    `,
  }),
};

export const Example: Story = {
  render: () => ({
    template: `
      <div style="width: 500px; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h3 style="margin: 0; font-size: 18px;">User Request</h3>
          <sv-action-button
            [options]="[
              { id: 'approve', label: 'Approve', icon: 'fas fa-check' },
              { id: 'deny', label: 'Deny', icon: 'fas fa-ban' },
              { id: 'edit', label: 'Edit', icon: 'fas fa-pencil-alt' }
            ]"
          ></sv-action-button>
        </div>
        
        <div style="padding: 16px; background-color: #f8f9fa; border-radius: 4px;">
          <p style="margin: 0; font-size: 14px;">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Example usage of action button in a user request card.',
      },
    },
  },
}; 