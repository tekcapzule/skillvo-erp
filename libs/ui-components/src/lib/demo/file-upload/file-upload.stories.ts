import type { Meta, StoryObj } from '@storybook/angular';
import { FileUploadComponent } from '../../components/file-upload/file-upload.component';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';

const meta: Meta<FileUploadComponent> = {
  component: FileUploadComponent,
  title: 'Components/FileUpload',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FormsModule],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    config: { control: 'object' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    filesSelected: { action: 'filesSelected' },
    fileRejected: { action: 'fileRejected' }
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
File upload component for handling image and document uploads.
- Supports drag and drop functionality
- Validates file types and sizes
- Can handle single or multiple file uploads
- Shows error states
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<FileUploadComponent>;

export const Default: Story = {
  render: () => ({
    template: `
      <sv-file-upload
        [config]="{
          accept: '.png,.jpg,.jpeg',
          maxSizeInMB: 2,
          multiple: false,
          labelText: 'Click to upload or drag and drop',
          hintText: 'Image Format: PNG, jpg, jpeg (max 2mb)'
        }"
      ></sv-file-upload>
    `,
  }),
};

export const Multiple: Story = {
  render: () => ({
    template: `
      <sv-file-upload
        [config]="{
          accept: '.png,.jpg,.jpeg',
          maxSizeInMB: 2,
          multiple: true,
          labelText: 'Upload multiple images',
          hintText: 'You can select multiple image files'
        }"
      ></sv-file-upload>
    `,
  }),
};

export const WithError: Story = {
  render: () => ({
    template: `
      <sv-file-upload
        [config]="{
          accept: '.png,.jpg,.jpeg',
          maxSizeInMB: 2,
          multiple: false,
          labelText: 'Click to upload or drag and drop',
          hintText: 'Image Format: PNG, jpg, jpeg (max 2mb)'
        }"
        [error]="'Please upload a valid image file'"
      ></sv-file-upload>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    template: `
      <sv-file-upload
        [config]="{
          accept: '.png,.jpg,.jpeg',
          maxSizeInMB: 2,
          multiple: false,
          labelText: 'Click to upload or drag and drop',
          hintText: 'Image Format: PNG, jpg, jpeg (max 2mb)'
        }"
        [disabled]="true"
      ></sv-file-upload>
    `,
  }),
};

export const DocumentUploader: Story = {
  render: () => ({
    template: `
      <sv-file-upload
        [config]="{
          accept: '.pdf,.doc,.docx',
          maxSizeInMB: 5,
          multiple: false,
          labelText: 'Upload your document',
          hintText: 'Accepted formats: PDF, DOC, DOCX (max 5mb)'
        }"
      ></sv-file-upload>
    `,
  }),
};

@Component({
  selector: 'sv-demo-file-upload',
  template: `
    <div style="width: 500px;">
      <h3>File Upload Demo</h3>
      
      <sv-file-upload
        [config]="uploadConfig"
        [disabled]="isDisabled"
        [error]="errorMessage"
        (filesSelected)="onFilesSelected($event)"
        (fileRejected)="onFileRejected($event)"
      ></sv-file-upload>
      
      <div style="margin-top: 20px;">
        <div *ngIf="uploadedFiles.length > 0">
          <h4>Uploaded Files</h4>
          <ul style="padding-left: 20px;">
            <li *ngFor="let file of uploadedFiles">
              {{ file.name }} ({{ (file.size / 1024).toFixed(0) }} KB)
            </li>
          </ul>
        </div>
        
        <div style="margin-top: 16px; display: flex; gap: 12px;">
          <button 
            style="padding: 8px 12px; background-color: #f1f3f5; border: 1px solid #dce1e6; border-radius: 4px; cursor: pointer;"
            (click)="toggleDisabled()"
          >
            {{ isDisabled ? 'Enable' : 'Disable' }}
          </button>
          
          <button 
            style="padding: 8px 12px; background-color: #f1f3f5; border: 1px solid #dce1e6; border-radius: 4px; cursor: pointer;"
            (click)="toggleMultiple()"
          >
            {{ uploadConfig.multiple ? 'Single file' : 'Multiple files' }}
          </button>
          
          <button 
            style="padding: 8px 12px; background-color: #f1f3f5; border: 1px solid #dce1e6; border-radius: 4px; cursor: pointer;"
            (click)="clearError()"
            *ngIf="errorMessage"
          >
            Clear Error
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    h3, h4 {
      margin-top: 0;
      margin-bottom: 16px;
      color: var(--text-primary, #212529);
    }
    button:hover {
      background-color: #e9ecef;
    }
  `]
})
class DemoFileUploadComponent {
  uploadConfig = {
    accept: '.png,.jpg,.jpeg',
    maxSizeInMB: 2,
    multiple: false,
    labelText: 'Click to upload or drag and drop',
    hintText: 'Image Format: PNG, jpg, jpeg (max 2mb)'
  };
  
  isDisabled = false;
  errorMessage = '';
  uploadedFiles: File[] = [];
  
  onFilesSelected(files: File[]) {
    this.uploadedFiles = files;
    this.errorMessage = '';
    console.log('Files selected:', files);
  }
  
  onFileRejected(rejection: { file: File, reason: string }) {
    this.errorMessage = `File rejected: ${rejection.file.name} - ${rejection.reason}`;
    console.error('File rejected:', rejection);
  }
  
  toggleDisabled() {
    this.isDisabled = !this.isDisabled;
  }
  
  toggleMultiple() {
    this.uploadConfig = {
      ...this.uploadConfig,
      multiple: !this.uploadConfig.multiple,
      labelText: this.uploadConfig.multiple 
        ? 'Click to upload or drag and drop' 
        : 'Upload multiple images',
      hintText: this.uploadConfig.multiple
        ? 'Image Format: PNG, jpg, jpeg (max 2mb)'
        : 'You can select multiple image files'
    };
  }
  
  clearError() {
    this.errorMessage = '';
  }
}

export const Interactive: Story = {
  decorators: [
    moduleMetadata({
      imports: [FormsModule, CommonModule],
      declarations: [DemoFileUploadComponent]
    })
  ],
  render: () => ({
    template: '<sv-demo-file-upload></sv-demo-file-upload>'
  }),
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo showing file upload functionality with a list of uploaded files and controls.'
      }
    }
  }
}; 