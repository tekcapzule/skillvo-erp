import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FileUploadComponent } from '@skillvo-web/ui-components';
import { RouterModule } from '@angular/router';
import { DemoShellComponent } from '../../../core/components/demo-shell/demo-shell.component';
import { ComponentDemo, EventDefinition, PropertyDefinition, PropertyType } from '../../../core/interfaces/component-demo.interface';
import { DemoRegistryService } from '../../../core/services/demo-registry.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-file-upload-demo',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    FileUploadComponent, 
    RouterModule,
    DemoShellComponent
  ],
  templateUrl: './file-upload-demo.component.html',
  styleUrls: ['./file-upload-demo.component.scss']
})
export class FileUploadDemoComponent implements AfterViewInit, OnDestroy {
  readonly DEMO_ID = 'file-upload-component';
  private destroy$ = new Subject<void>();

  constructor(
    private demoRegistry: DemoRegistryService,
    private elementRef: ElementRef
  ) {
    // Register the File Upload component demo
    this.registerFileUploadDemo();
  }

  ngAfterViewInit(): void {
    // Listen for when the component is rendered in the demo shell
    this.demoRegistry.activeDemo$
      .pipe(takeUntil(this.destroy$))
      .subscribe(demo => {
        if (demo && demo.id === this.DEMO_ID) {
          setTimeout(() => {
            this.applyFileUploadContent();
          }, 0);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private applyFileUploadContent(): void {
    // Find the file upload elements in the demo container
    const fileUploadElements = this.elementRef.nativeElement.querySelectorAll('sv-file-upload');

    // Apply file upload display text based on properties
    fileUploadElements.forEach((fileUpload: HTMLElement) => {
      // Get config properties
      const multipleAttr = fileUpload.getAttribute('ng-reflect-config');
      const multiple = multipleAttr && multipleAttr.includes('multiple":true');
      
      // Check if disabled
      const isDisabled = fileUpload.hasAttribute('disabled');
      
      let labelText = multiple ? 'Multiple Files Upload' : 'Single File Upload';
      
      if (isDisabled) {
        labelText = 'Disabled File Upload';
      }
      
      // Find the label element and set text
      const labelElement = fileUpload.querySelector('.sv-input-label');
      if (labelElement) {
        labelElement.textContent = labelText;
      }
    });
  }

  private registerFileUploadDemo(): void {
    const fileUploadDemo: ComponentDemo<FileUploadComponent> = {
      id: this.DEMO_ID,
      name: 'File Upload Component',
      description: 'A file upload component that allows users to upload files with drag and drop support, file validation, and progress tracking.',
      component: FileUploadComponent,
      properties: this.getFileUploadProperties(),
      events: this.getFileUploadEvents(),
      codeSnippets: this.getFileUploadCodeSnippets(),
      variants: this.getFileUploadVariants(),
      defaultVariantId: 'single-file',
      cssClasses: [
        'sv-file-upload-container',
        'sv-file-dropzone',
        'sv-file-upload-label',
        'sv-file-list',
        'sv-file-progress'
      ]
    };

    this.demoRegistry.registerDemo(fileUploadDemo);
  }

  private getFileUploadProperties(): PropertyDefinition[] {
    return [
      {
        name: 'config',
        type: PropertyType.OBJECT,
        defaultValue: `{
  accept: '*',
  multiple: false,
  maxFileSize: 10 * 1024 * 1024,
  maxFiles: 5,
  autoUpload: false,
  showProgressBar: true,
  compact: false
}`,
        category: 'Configuration',
        description: 'Configuration object for the file upload component'
      },
      {
        name: 'config.accept',
        type: PropertyType.STRING,
        defaultValue: '*',
        category: 'Configuration',
        description: 'File types to accept (e.g., ".jpg,.png,image/*")'
      },
      {
        name: 'config.multiple',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'Configuration',
        description: 'Whether to allow multiple file selection'
      },
      {
        name: 'config.maxFileSize',
        type: PropertyType.NUMBER,
        defaultValue: 10 * 1024 * 1024,
        category: 'Configuration',
        description: 'Maximum file size in bytes (default: 10MB)'
      },
      {
        name: 'config.maxFiles',
        type: PropertyType.NUMBER,
        defaultValue: 5,
        category: 'Configuration',
        description: 'Maximum number of files allowed'
      },
      {
        name: 'config.autoUpload',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'Configuration',
        description: 'Whether to automatically upload files after selection'
      },
      {
        name: 'config.showProgressBar',
        type: PropertyType.BOOLEAN,
        defaultValue: true,
        category: 'Configuration',
        description: 'Whether to show the progress bar during upload'
      },
      {
        name: 'config.compact',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'Configuration',
        description: 'Whether to show a compact version of the upload UI'
      },
      {
        name: 'dragDropEnabled',
        type: PropertyType.BOOLEAN,
        defaultValue: true,
        category: 'Behavior',
        description: 'Whether to enable drag and drop file upload'
      },
      {
        name: 'disabled',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'State',
        description: 'Whether the file upload is disabled'
      },
      {
        name: 'label',
        type: PropertyType.STRING,
        defaultValue: 'Upload Files',
        category: 'Content',
        description: 'Label for the file upload component'
      },
      {
        name: 'helpText',
        type: PropertyType.STRING,
        defaultValue: '',
        category: 'Content',
        description: 'Help text displayed below the file upload'
      }
    ];
  }

  private getFileUploadEvents(): EventDefinition[] {
    return [
      {
        name: 'fileSelected',
        description: 'Emitted when files are selected'
      },
      {
        name: 'fileUploaded',
        description: 'Emitted when a file is successfully uploaded'
      },
      {
        name: 'fileRemoved',
        description: 'Emitted when a file is removed from the queue'
      },
      {
        name: 'uploadProgress',
        description: 'Emitted when upload progress changes'
      },
      {
        name: 'uploadError',
        description: 'Emitted when an error occurs during upload'
      }
    ];
  }

  private getFileUploadCodeSnippets(): any[] {
    return [
      {
        language: 'html',
        title: 'Basic Usage',
        description: 'Simple file upload with default settings',
        code: '<sv-file-upload label="Upload Files"></sv-file-upload>'
      },
      {
        language: 'html',
        title: 'Multiple Files',
        description: 'File upload configured for multiple files',
        code: '<sv-file-upload [config]="{ multiple: true }" label="Upload Multiple Files"></sv-file-upload>'
      },
      {
        language: 'html',
        title: 'Image Upload',
        description: 'File upload restricted to image files',
        code: '<sv-file-upload [config]="{ accept: \'.jpg,.jpeg,.png,.gif,image/*\' }" label="Upload Images"></sv-file-upload>'
      },
      {
        language: 'html',
        title: 'Auto Upload',
        description: 'File upload with automatic upload on selection',
        code: '<sv-file-upload [config]="{ autoUpload: true }" label="Auto Upload Files"></sv-file-upload>'
      },
      {
        language: 'html',
        title: 'Full Configuration',
        description: 'File upload with all properties configured',
        code: `<sv-file-upload 
  [config]="{
    accept: '.pdf,.docx,.xlsx',
    multiple: true,
    maxFileSize: 5242880,
    maxFiles: 3,
    autoUpload: true,
    showProgressBar: true,
    compact: false
  }"
  [dragDropEnabled]="true"
  [disabled]="isDisabled"
  label="Document Upload"
  helpText="Upload up to 3 documents (max 5MB each)"
  (fileSelected)="onFileSelected($event)"
  (fileUploaded)="onFileUploaded($event)"
  (fileRemoved)="onFileRemoved($event)"
  (uploadProgress)="onUploadProgress($event)"
  (uploadError)="onUploadError($event)">
</sv-file-upload>`
      },
      {
        language: 'typescript',
        title: 'Component Implementation',
        description: 'Example of how to implement the file upload in a component',
        code: `import { Component } from '@angular/core';
import { FileUploadComponent, UploadedFile } from '@skillvo-web/ui-components';

@Component({
  selector: 'app-my-component',
  template: \`
    <sv-file-upload
      [config]="fileUploadConfig"
      (fileSelected)="onFileSelected($event)"
      (fileUploaded)="onFileUploaded($event)">
    </sv-file-upload>
  \`,
  standalone: true,
  imports: [FileUploadComponent]
})
export class MyComponent {
  fileUploadConfig = {
    accept: '.pdf,.docx',
    multiple: true,
    maxFileSize: 10485760, // 10MB
    maxFiles: 5,
    autoUpload: true
  };

  onFileSelected(files: File[]): void {
    console.log('Files selected:', files);
  }

  onFileUploaded(file: UploadedFile): void {
    console.log('File uploaded:', file);
    // Handle the uploaded file (e.g., save URL to database)
  }
}`
      }
    ];
  }

  private getFileUploadVariants(): any[] {
    return [
      {
        id: 'single-file',
        label: 'Single File',
        description: 'Default file upload component allowing single file selection',
        properties: {},
        template: `<sv-file-upload label="Single File Upload"></sv-file-upload>`
      },
      {
        id: 'multiple-files',
        label: 'Multiple Files',
        description: 'File upload component allowing multiple file selection',
        properties: {
          config: { multiple: true }
        },
        template: `<sv-file-upload 
  [config]="{ multiple: true }" 
  label="Multiple Files Upload"
></sv-file-upload>`
      },
      {
        id: 'image-upload',
        label: 'Image Upload',
        description: 'File upload component restricted to image files with previews',
        properties: {
          config: { 
            accept: '.jpg,.jpeg,.png,.gif,image/*',
            multiple: true
          }
        },
        template: `<sv-file-upload 
  [config]="{ 
    accept: '.jpg,.jpeg,.png,.gif,image/*',
    multiple: true 
  }" 
  label="Image Upload"
></sv-file-upload>`
      },
      {
        id: 'auto-upload',
        label: 'Auto Upload',
        description: 'File upload component with automatic upload on selection',
        properties: {
          config: { 
            autoUpload: true,
            showProgressBar: true
          }
        },
        template: `<sv-file-upload 
  [config]="{ 
    autoUpload: true,
    showProgressBar: true
  }" 
  label="Auto Upload"
></sv-file-upload>`
      },
      {
        id: 'compact',
        label: 'Compact UI',
        description: 'File upload component with compact UI',
        properties: {
          config: { compact: true }
        },
        template: `<sv-file-upload 
  [config]="{ compact: true }" 
  label="Compact UI"
></sv-file-upload>`
      },
      {
        id: 'disabled',
        label: 'Disabled',
        description: 'Disabled file upload component',
        properties: {
          disabled: true
        },
        template: `<sv-file-upload 
  [disabled]="true" 
  label="Disabled Upload"
></sv-file-upload>`
      }
    ];
  }
} 