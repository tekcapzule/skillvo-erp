import { StoryObj, Meta } from '@storybook/angular';
import { TextBoxComponent } from '../../../lib/components/text-box/text-box.component';
import { moduleMetadata } from '@storybook/angular';

const meta: Meta<TextBoxComponent> = {
  title: 'Components/TextBox',
  component: TextBoxComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [TextBoxComponent],
    }),
  ],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    multiline: { control: 'boolean' },
    rows: { control: 'number' },
    maxLength: { control: 'number' },
    errorMessage: { control: 'text' },
    helperText: { control: 'text' },
    type: { 
      control: 'select', 
      options: ['text', 'password', 'email', 'number'] 
    },
    value: { control: 'text' },
    valueChange: { action: 'valueChange' }
  },
};

export default meta;
type Story = StoryObj<TextBoxComponent>;

// Define base args type to match component inputs
interface TextBoxArgs {
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  maxLength?: number;
  errorMessage?: string;
  helperText?: string;
  type?: string;
  value?: string;
  customClass?: string;
}

export const Basic: Story = {
  args: {
    placeholder: 'Type here...',
    disabled: false,
    required: false,
  } as TextBoxArgs,
};

export const Required: Story = {
  args: {
    ...Basic.args,
    required: true,
  } as TextBoxArgs,
};

export const WithError: Story = {
  args: {
    ...Basic.args,
    errorMessage: 'This field is required',
  } as TextBoxArgs,
};

export const WithHelperText: Story = {
  args: {
    ...Basic.args,
    helperText: 'Please enter a descriptive title',
  } as TextBoxArgs,
};

export const Disabled: Story = {
  args: {
    ...Basic.args,
    disabled: true,
  } as TextBoxArgs,
};

export const Password: Story = {
  args: {
    placeholder: 'Enter your password',
    type: 'password',
  } as TextBoxArgs,
};

export const Multiline: Story = {
  args: {
    placeholder: 'Type your description here...',
    multiline: true,
    rows: 4,
  } as TextBoxArgs,
};

export const WithMaxLength: Story = {
  args: {
    ...Basic.args,
    maxLength: 50,
    helperText: 'Maximum 50 characters',
  } as TextBoxArgs,
}; 