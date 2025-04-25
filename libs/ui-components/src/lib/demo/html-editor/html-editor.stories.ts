import type { Meta, StoryObj } from '@storybook/angular';
import { HtmlEditorComponent } from '../../components/html-editor/html-editor.component';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { action } from '@storybook/addon-actions';

const meta: Meta<HtmlEditorComponent> = {
  component: HtmlEditorComponent,
  title: 'Components/HTML Editor',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FormsModule, ReactiveFormsModule],
    }),
  ],
  argTypes: {
    height: {
      control: 'text',
      description: 'Height of the editor',
    },
    minHeight: {
      control: 'text',
      description: 'Minimum height of the editor',
    },
    maxHeight: {
      control: 'text',
      description: 'Maximum height of the editor',
    },
    config: {
      control: 'object',
      description: 'Quill editor configuration',
    },
    contentChanged: {
      action: 'contentChanged',
      description: 'Event emitted when content is changed',
    },
  },
  args: {
    height: '300px',
    minHeight: '150px',
    maxHeight: '500px',
  },
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A rich text editor component based on Quill.js for creating HTML content.
- Supports various formatting options
- Can be used for course content creation
- Customizable toolbar
- Works with Angular forms
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<HtmlEditorComponent>;

export const Default: Story = {
  render: (args) => ({
    props: {
      ...args,
      contentChanged: action('Content changed'),
    },
    template: `
      <div>
        <h3>HTML Editor</h3>
        <sv-html-editor
          [height]="height"
          [minHeight]="minHeight"
          [maxHeight]="maxHeight"
          [config]="config"
          (contentChanged)="contentChanged($event)"
        ></sv-html-editor>
      </div>
    `,
  }),
};

export const WithInitialContent: Story = {
  render: (args) => ({
    props: {
      ...args,
      contentChanged: action('Content changed'),
      initialContent: '<h2>Welcome to SkillVo</h2><p>This is a <strong>rich text editor</strong> for course content creation.</p><ul><li>Create formatted content</li><li>Add images and media</li><li>Structure your lessons</li></ul>',
    },
    template: `
      <div>
        <h3>HTML Editor with Initial Content</h3>
        <sv-html-editor
          [height]="height"
          [minHeight]="minHeight"
          [maxHeight]="maxHeight"
          [config]="config"
          (contentChanged)="contentChanged($event)"
          ngModel="{{initialContent}}"
        ></sv-html-editor>
      </div>
    `,
  }),
};

export const MinimalToolbar: Story = {
  render: (args) => ({
    props: {
      ...args,
      contentChanged: action('Content changed'),
      minimalConfig: {
        theme: 'snow',
        placeholder: 'Write something...',
        modules: {
          toolbar: {
            container: [
              ['bold', 'italic', 'underline'],
              [{ 'header': 1 }, { 'header': 2 }],
              ['link']
            ]
          }
        }
      }
    },
    template: `
      <div>
        <h3>HTML Editor with Minimal Toolbar</h3>
        <sv-html-editor
          [height]="height"
          [minHeight]="minHeight"
          [maxHeight]="maxHeight"
          [config]="minimalConfig"
          (contentChanged)="contentChanged($event)"
        ></sv-html-editor>
      </div>
    `,
  }),
};

export const BubbleTheme: Story = {
  render: (args) => ({
    props: {
      ...args,
      contentChanged: action('Content changed'),
      bubbleConfig: {
        theme: 'bubble',
        placeholder: 'Write something...'
      }
    },
    template: `
      <div>
        <h3>HTML Editor with Bubble Theme</h3>
        <p class="hint">This theme shows a minimal bubble toolbar only when text is selected</p>
        <sv-html-editor
          [height]="height"
          [minHeight]="minHeight"
          [maxHeight]="maxHeight"
          [config]="bubbleConfig"
          (contentChanged)="contentChanged($event)"
        ></sv-html-editor>
      </div>
      <style>
        .hint {
          color: #666;
          font-style: italic;
          margin-bottom: 10px;
        }
      </style>
    `,
  }),
};

export const WithReadOnlyMode: Story = {
  render: (args) => ({
    props: {
      ...args,
      contentChanged: action('Content changed'),
      readOnlyConfig: {
        theme: 'snow',
        readOnly: true,
      },
      initialContent: '<h2>This is a read-only editor</h2><p>The content cannot be edited. This is useful for displaying formatted content.</p>'
    },
    template: `
      <div>
        <h3>Read-Only HTML Editor</h3>
        <sv-html-editor
          [height]="height"
          [minHeight]="minHeight"
          [maxHeight]="maxHeight"
          [config]="readOnlyConfig"
          (contentChanged)="contentChanged($event)"
          ngModel="{{initialContent}}"
        ></sv-html-editor>
      </div>
    `,
  }),
};

export const AllFeatures: Story = {
  render: (args) => ({
    props: {
      ...args,
      contentChanged: action('Content changed'),
      fullConfig: {
        theme: 'snow',
        placeholder: 'Create your content...',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean'],
            ['link', 'image', 'video'],
          ]
        }
      }
    },
    template: `
      <div>
        <h3>HTML Editor with All Features</h3>
        <sv-html-editor
          [height]="height"
          [minHeight]="minHeight"
          [maxHeight]="maxHeight"
          [config]="fullConfig"
          (contentChanged)="contentChanged($event)"
        ></sv-html-editor>
      </div>
    `,
  }),
}; 