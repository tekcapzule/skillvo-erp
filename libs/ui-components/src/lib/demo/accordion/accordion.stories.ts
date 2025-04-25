import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from '../../components/accordion/accordion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'Components/Accordion',
  component: AccordionComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, BrowserAnimationsModule],
    }),
  ],
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the accordion',
    },
    expanded: {
      control: 'boolean',
      description: 'Whether the accordion is expanded',
    },
    customClass: {
      control: 'text',
      description: 'Custom CSS class to add to the accordion',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the accordion is disabled',
    },
    toggled: {
      action: 'toggled',
      description: 'Event emitted when the accordion is toggled',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Accordion component for expandable content sections. Uses Angular animations for smooth transitions.',
      },
    },
  },
} as Meta<AccordionComponent>;

type Story = StoryObj<AccordionComponent>;

export const Default: Story = {
  args: {
    title: 'Accordion Title',
    expanded: false,
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <sv-accordion [title]="title" [expanded]="expanded" [disabled]="disabled" (toggled)="toggled($event)">
        <div>
          <p>This is the content of the accordion. It can contain any HTML content.</p>
          <p>The content is hidden when the accordion is collapsed and visible when expanded.</p>
        </div>
      </sv-accordion>
    `,
  }),
};

export const Expanded: Story = {
  args: {
    title: 'Expanded Accordion',
    expanded: true,
    disabled: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <sv-accordion [title]="title" [expanded]="expanded" [disabled]="disabled" (toggled)="toggled($event)">
        <div>
          <p>This accordion is expanded by default.</p>
          <p>You can control the initial state with the expanded input property.</p>
        </div>
      </sv-accordion>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    title: 'Disabled Accordion',
    expanded: false,
    disabled: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <sv-accordion [title]="title" [expanded]="expanded" [disabled]="disabled" (toggled)="toggled($event)">
        <div>
          <p>This accordion is disabled and cannot be toggled.</p>
        </div>
      </sv-accordion>
    `,
  }),
};

export const Multiple: Story = {
  render: () => ({
    props: {
      toggled: (event: boolean) => console.log('Accordion toggled:', event),
    },
    template: `
      <div>
        <sv-accordion title="First Accordion" [expanded]="true" (toggled)="toggled($event)">
          <div>
            <p>Content for the first accordion.</p>
          </div>
        </sv-accordion>
        
        <sv-accordion title="Second Accordion" (toggled)="toggled($event)">
          <div>
            <p>Content for the second accordion.</p>
            <p>This one is collapsed by default.</p>
          </div>
        </sv-accordion>
        
        <sv-accordion title="Third Accordion" (toggled)="toggled($event)">
          <div>
            <p>Content for the third accordion.</p>
            <p>You can have as many accordions as needed in a group.</p>
          </div>
        </sv-accordion>
      </div>
    `,
  }),
};

export const WithCustomContent: Story = {
  render: () => ({
    props: {
      toggled: (event: boolean) => console.log('Accordion toggled:', event),
    },
    template: `
      <sv-accordion title="Accordion with Rich Content" (toggled)="toggled($event)">
        <div>
          <h3 style="margin-top: 0;">Rich Content</h3>
          <p>You can include any HTML elements inside the accordion content.</p>
          
          <div style="display: flex; gap: 16px; margin-top: 16px;">
            <div style="background-color: #f0f0f0; padding: 16px; border-radius: 8px; flex: 1;">
              <h4 style="margin-top: 0;">Section 1</h4>
              <p>This is a styled section within the accordion content.</p>
            </div>
            
            <div style="background-color: #f0f0f0; padding: 16px; border-radius: 8px; flex: 1;">
              <h4 style="margin-top: 0;">Section 2</h4>
              <p>Another styled section with custom content.</p>
            </div>
          </div>
          
          <button style="margin-top: 16px; padding: 8px 16px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
            Action Button
          </button>
        </div>
      </sv-accordion>
    `,
  }),
};

export const NestedAccordions: Story = {
  render: () => ({
    props: {
      toggled: (event: boolean) => console.log('Accordion toggled:', event),
    },
    template: `
      <sv-accordion title="Parent Accordion" (toggled)="toggled($event)">
        <div>
          <p>This accordion contains nested accordions.</p>
          
          <sv-accordion title="Nested Accordion 1" (toggled)="toggled($event)">
            <div>
              <p>Content for the first nested accordion.</p>
            </div>
          </sv-accordion>
          
          <sv-accordion title="Nested Accordion 2" (toggled)="toggled($event)">
            <div>
              <p>Content for the second nested accordion.</p>
            </div>
          </sv-accordion>
        </div>
      </sv-accordion>
    `,
  }),
}; 