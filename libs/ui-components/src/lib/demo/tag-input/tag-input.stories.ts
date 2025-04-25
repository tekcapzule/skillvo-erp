import { componentWrapperDecorator, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { TagInputComponent } from '../../components/tag-input';

const meta: Meta<TagInputComponent> = {
  title: 'Components/Tag Input',
  component: TagInputComponent,
  decorators: [
    moduleMetadata({
      imports: [TagInputComponent],
    }),
  ],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    theme: {
      options: ['light', 'dark'],
      control: { type: 'radio' },
    },
    tagsChange: { action: 'tagsChange' },
  },
};

export default meta;
type Story = StoryObj<TagInputComponent>;

export const Default: Story = {
  args: {
    label: 'Tags',
    tags: ['Angular', 'TypeScript', 'JavaScript'],
    placeholder: 'Add a tag...',
    disabled: false,
    maxTags: Infinity,
    theme: 'light',
  },
};

export const Empty: Story = {
  args: {
    ...Default.args,
    tags: [],
  },
};

export const WithMaxTags: Story = {
  args: {
    ...Default.args,
    maxTags: 5,
    tags: ['Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const CustomPlaceholder: Story = {
  args: {
    ...Default.args,
    placeholder: 'Press Enter or comma to add a tag',
    tags: [],
  },
};

export const DarkTheme: Story = {
  args: {
    ...Default.args,
    theme: 'dark',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
}; 