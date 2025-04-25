import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { TabsComponent } from '../../components/tabs/tabs.component';
import { TabComponent } from '../../components/tabs/tab/tab.component';

const meta: Meta<TabsComponent> = {
  title: 'Components/Tabs',
  component: TabsComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, TabsComponent, TabComponent],
    }),
  ],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    color: { control: 'color' },
    backgroundColor: { control: 'color' },
    tabsAlignment: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'stretch'],
    },
    pillStyle: { control: 'boolean' },
    showUnderline: { control: 'boolean' },
    animated: { control: 'boolean' },
    activeTabIndex: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<TabsComponent>;

// Base Tabs Story
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 100%; max-width: 800px; margin: 0 auto;">
        <skillvo-tabs
          [color]="color"
          [backgroundColor]="backgroundColor"
          [tabsAlignment]="tabsAlignment"
          [pillStyle]="pillStyle"
          [showUnderline]="showUnderline"
          [animated]="animated"
          [activeTabIndex]="activeTabIndex"
        >
          <skillvo-tab title="Tab 1">
            <div style="padding: 20px;">
              <h3>Tab 1 Content</h3>
              <p>This is the content for Tab 1. You can put any content here.</p>
            </div>
          </skillvo-tab>
          <skillvo-tab title="Tab 2">
            <div style="padding: 20px;">
              <h3>Tab 2 Content</h3>
              <p>This is the content for Tab 2. It can be different from Tab 1.</p>
            </div>
          </skillvo-tab>
          <skillvo-tab title="Tab 3">
            <div style="padding: 20px;">
              <h3>Tab 3 Content</h3>
              <p>This is the content for Tab 3. Each tab can have its own layout.</p>
            </div>
          </skillvo-tab>
        </skillvo-tabs>
      </div>
    `,
  }),
  args: {
    color: '#007bff',
    backgroundColor: 'transparent',
    tabsAlignment: 'start',
    pillStyle: false,
    showUnderline: true,
    animated: true,
    activeTabIndex: 0,
  },
};

// Centered Tabs
export const CenteredTabs: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 100%; max-width: 800px; margin: 0 auto;">
        <skillvo-tabs
          [color]="color"
          [backgroundColor]="backgroundColor"
          [tabsAlignment]="'center'"
          [pillStyle]="pillStyle"
          [showUnderline]="showUnderline"
        >
          <skillvo-tab title="Home">
            <div style="padding: 20px;">
              <h3>Home Tab</h3>
              <p>This is the home tab content.</p>
            </div>
          </skillvo-tab>
          <skillvo-tab title="Profile">
            <div style="padding: 20px;">
              <h3>Profile Tab</h3>
              <p>This is the profile tab content.</p>
            </div>
          </skillvo-tab>
          <skillvo-tab title="Settings">
            <div style="padding: 20px;">
              <h3>Settings Tab</h3>
              <p>This is the settings tab content.</p>
            </div>
          </skillvo-tab>
        </skillvo-tabs>
      </div>
    `,
  }),
  args: {
    color: '#007bff',
    backgroundColor: 'transparent',
    pillStyle: false,
    showUnderline: true,
  },
};

// Pill Style Tabs
export const PillStyleTabs: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 100%; max-width: 800px; margin: 0 auto;">
        <skillvo-tabs
          [color]="color"
          [backgroundColor]="backgroundColor"
          [tabsAlignment]="'start'"
          [pillStyle]="true"
          [showUnderline]="false"
        >
          <skillvo-tab title="Overview">
            <div style="padding: 20px;">
              <h3>Overview Tab</h3>
              <p>This tab uses pill-style with no underline.</p>
            </div>
          </skillvo-tab>
          <skillvo-tab title="Features">
            <div style="padding: 20px;">
              <h3>Features Tab</h3>
              <p>This tab uses pill-style with no underline.</p>
            </div>
          </skillvo-tab>
          <skillvo-tab title="Pricing">
            <div style="padding: 20px;">
              <h3>Pricing Tab</h3>
              <p>This tab uses pill-style with no underline.</p>
            </div>
          </skillvo-tab>
        </skillvo-tabs>
      </div>
    `,
  }),
  args: {
    color: '#007bff',
    backgroundColor: '#f8f9fa',
  },
};

// Tabs with Icons and Badges
export const TabsWithIconsAndBadges: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="width: 100%; max-width: 800px; margin: 0 auto;">
        <skillvo-tabs
          [color]="color"
          [backgroundColor]="backgroundColor"
          [tabsAlignment]="'start'"
          [pillStyle]="pillStyle"
          [showUnderline]="showUnderline"
        >
          <skillvo-tab title="Messages" [badge]="5" badgeColor="primary">
            <div style="padding: 20px;">
              <h3>Messages Tab</h3>
              <p>This tab has a primary badge showing 5 new messages.</p>
            </div>
          </skillvo-tab>
          <skillvo-tab title="Notifications" [badge]="2" badgeColor="danger">
            <div style="padding: 20px;">
              <h3>Notifications Tab</h3>
              <p>This tab has a danger badge showing 2 new notifications.</p>
            </div>
          </skillvo-tab>
          <skillvo-tab title="Settings">
            <div style="padding: 20px;">
              <h3>Settings Tab</h3>
              <p>This tab has no badge.</p>
            </div>
          </skillvo-tab>
          <skillvo-tab title="Disabled" [disabled]="true">
            <div style="padding: 20px;">
              <h3>Disabled Tab</h3>
              <p>This tab is disabled and cannot be clicked.</p>
            </div>
          </skillvo-tab>
        </skillvo-tabs>
      </div>
    `,
  }),
  args: {
    color: '#007bff',
    backgroundColor: 'transparent',
    pillStyle: false,
    showUnderline: true,
  },
}; 