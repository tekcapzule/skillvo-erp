import { Component, Input, Output, EventEmitter, HostBinding, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface FileUploadConfig {
  accept?: string;
  maxSizeInMB?: number;
  multiple?: boolean;
  labelText?: string;
  hintText?: string;
}

@Component({
  selector: 'sv-file-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  @Input() config: FileUploadConfig = {
    accept: '.png,.jpg,.jpeg',
    maxSizeInMB: 2,
    multiple: false,
    labelText: 'Click to upload or drag and drop',
    hintText: 'Image Format: PNG, jpg, jpeg (max 2mb)'
  };

  @Input() disabled = false;
  @Input() error = '';

  @Output() filesSelected = new EventEmitter<File[]>();
  @Output() fileRejected = new EventEmitter<{ file: File, reason: string }>();

  files: File[] = [];
  isDragging = false;

  @HostBinding('class.sv-file-upload--dragging') get dragging(): boolean {
    return this.isDragging;
  }

  @HostBinding('class.sv-file-upload--disabled') get isDisabled(): boolean {
    return this.disabled;
  }

  @HostBinding('class.sv-file-upload--has-error') get hasError(): boolean {
    return !!this.error;
  }

  constructor(private elementRef: ElementRef) {}

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent): void {
    if (this.disabled) return;
    
    this.preventDefault(event);
    this.isDragging = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent): void {
    if (this.disabled) return;
    
    this.preventDefault(event);
    this.isDragging = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void {
    if (this.disabled) return;
    
    this.preventDefault(event);
    this.isDragging = false;
    
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFiles(files);
    }
  }

  openFileDialog(): void {
    if (this.disabled) return;
    
    const fileInput = this.elementRef.nativeElement.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.click();
    }
  }

  onFileInputChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.handleFiles(fileInput.files);
      // Reset input value to allow selecting the same file again
      fileInput.value = '';
    }
  }

  private handleFiles(fileList: FileList): void {
    const newFiles: File[] = [];
    const invalidFiles: { file: File, reason: string }[] = [];

    Array.from(fileList).forEach(file => {
      // Check file type
      if (this.config.accept && !this.isFileTypeAccepted(file)) {
        invalidFiles.push({ file, reason: 'File type not accepted' });
        return;
      }

      // Check file size
      if (this.config.maxSizeInMB && file.size > this.config.maxSizeInMB * 1024 * 1024) {
        invalidFiles.push({ 
          file, 
          reason: `File size exceeds maximum limit of ${this.config.maxSizeInMB}MB` 
        });
        return;
      }

      newFiles.push(file);
    });

    if (newFiles.length > 0) {
      if (this.config.multiple) {
        this.files = [...this.files, ...newFiles];
      } else {
        this.files = [newFiles[0]];
      }
      this.filesSelected.emit(this.config.multiple ? this.files : [newFiles[0]]);
    }

    invalidFiles.forEach(invalid => {
      this.fileRejected.emit(invalid);
    });
  }

  private isFileTypeAccepted(file: File): boolean {
    if (!this.config.accept) return true;
    
    const acceptedTypes = this.config.accept.split(',').map(type => type.trim().toLowerCase());
    const fileType = file.type.toLowerCase();
    const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
    
    return acceptedTypes.some(type => {
      // Check for MIME type (e.g., image/png)
      if (type.includes('/')) {
        if (type === fileType) return true;
        // Handle wildcards like image/* 
        if (type.endsWith('/*') && fileType.startsWith(type.replace('/*', '/'))) {
          return true;
        }
      } 
      // Check for extension (e.g., .png)
      else if (type.startsWith('.')) {
        return type === fileExtension;
      }
      return false;
    });
  }

  private preventDefault(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
  }

  removeFile(index: number): void {
    if (this.disabled) return;
    
    this.files.splice(index, 1);
    this.filesSelected.emit(this.files);
  }
} 