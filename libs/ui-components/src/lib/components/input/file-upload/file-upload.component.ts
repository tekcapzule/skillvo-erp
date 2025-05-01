import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseInputComponent } from './../base-input/base-input.component';

export interface FileUploadConfig {
  accept?: string;
  multiple?: boolean;
  maxFileSize?: number; // in bytes
  maxFiles?: number;
  autoUpload?: boolean;
  showProgressBar?: boolean;
  compact?: boolean;
}

export interface UploadedFile {
  file: File;
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error' | 'paused';
  error?: string;
  url?: string;
  preview?: string;
}

@Component({
  selector: 'sv-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  // Add imports for NgIf and NgFor directives
  imports: [CommonModule],
  standalone: true
})
export class FileUploadComponent extends BaseInputComponent implements OnInit, OnDestroy {
  @Input() config: FileUploadConfig = {
    accept: '*',
    multiple: false,
    maxFileSize: 10 * 1024 * 1024, // 10MB default
    maxFiles: 5,
    autoUpload: false,
    showProgressBar: true,
    compact: false
  };

  @Input() dragDropEnabled: boolean = true;
  
  @Output() fileSelected = new EventEmitter<File[]>();
  @Output() fileUploaded = new EventEmitter<UploadedFile>();
  @Output() fileRemoved = new EventEmitter<UploadedFile>();
  @Output() uploadProgress = new EventEmitter<UploadedFile>();
  @Output() uploadError = new EventEmitter<{ file: UploadedFile, error: any }>();
  
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('dropZone') dropZone!: ElementRef<HTMLDivElement>;
  
  files: UploadedFile[] = [];
  isDragging: boolean = false;
  
  private dragCounter: number = 0;
  private readonly imageTypes: string[] = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
  
  constructor() {
    super();
  }
  
  ngOnInit(): void {
    if (this.dragDropEnabled) {
      this.setupDragAndDropEvents();
    }
  }
  
  ngOnDestroy(): void {
    if (this.dragDropEnabled) {
      this.removeDragAndDropEvents();
    }
  }

  // Helper method to check for pending files - used in template
  hasPendingFiles(): boolean {
    return this.files.length > 0 && this.files.some(file => file.status === 'pending');
  }
  
  // File input change handler
  onFileInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFiles(Array.from(input.files));
    }
  }
  
  // Programmatically open file chooser
  openFileChooser(): void {
    this.fileInput.nativeElement.click();
  }
  
  // Process selected files
  handleFiles(fileList: File[]): void {
    // Check max files limit
    if (this.files.length + fileList.length > this.config.maxFiles!) {
      this.setError(`Maximum ${this.config.maxFiles} files allowed`);
      return;
    }
    
    const newFiles: File[] = [];
    
    fileList.forEach(file => {
      // Check file size
      if (file.size > this.config.maxFileSize!) {
        this.setError(`File ${file.name} exceeds maximum size of ${this.formatBytes(this.config.maxFileSize!)}`);
        return;
      }
      
      // Add to new files
      newFiles.push(file);
      
      // Create uploaded file object
      const uploadedFile: UploadedFile = {
        file,
        id: this.generateUniqueId(),
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: 'pending'
      };
      
      // Generate preview for images
      if (this.isImageFile(file.type)) {
        this.generateThumbnail(uploadedFile);
      }
      
      // Add to files array
      this.files.push(uploadedFile);
      
      // Auto upload if enabled
      if (this.config.autoUpload) {
        this.uploadFile(uploadedFile);
      }
    });
    
    // Emit files selected event
    if (newFiles.length > 0) {
      this.fileSelected.emit(newFiles);
      
      // Update form control value with files list
      this.value = this.files;
      this.onChange(this.files);
    }
  }
  
  // Remove file
  removeFile(file: UploadedFile): void {
    const index = this.files.findIndex(f => f.id === file.id);
    if (index !== -1) {
      this.files.splice(index, 1);
      this.fileRemoved.emit(file);
      
      // Update form control value
      this.value = this.files;
      this.onChange(this.files);
    }
  }
  
  // Clear all files
  clearFiles(): void {
    this.files.forEach(file => {
      this.fileRemoved.emit(file);
    });
    
    this.files = [];
    this.value = [];
    this.onChange([]);
    
    // Reset input
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
  
  // Upload single file - would connect to your service in real implementation
  uploadFile(file: UploadedFile): void {
    // Set status to uploading
    file.status = 'uploading';
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      file.progress = progress;
      
      this.uploadProgress.emit(file);
      
      if (progress >= 100) {
        clearInterval(interval);
        
        // Simulate random success/failure for demo
        if (Math.random() > 0.2) {
          file.status = 'success';
          file.url = URL.createObjectURL(file.file); // In real implementation, this would be the actual URL
          this.fileUploaded.emit(file);
        } else {
          file.status = 'error';
          file.error = 'Upload failed';
          this.uploadError.emit({ file, error: 'Upload failed' });
        }
      }
    }, 300);
  }
  
  // Upload all pending files
  uploadAll(): void {
    const pendingFiles = this.files.filter(file => file.status === 'pending');
    pendingFiles.forEach(file => this.uploadFile(file));
  }
  
  // Format file size to human-readable format
  formatBytes(bytes: number, decimals: number = 2): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  
  // Set error message
  private setError(message: string): void {
    this.errorMessage = message;
    this.isValid = false;
  }
  
  // Check if file is an image
  private isImageFile(fileType: string): boolean {
    return this.imageTypes.includes(fileType);
  }
  
  // Generate thumbnail for image files
  private generateThumbnail(file: UploadedFile): void {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      file.preview = e.target?.result as string;
    };
    reader.readAsDataURL(file.file);
  }
  
  // Generate unique ID for files
  private generateUniqueId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }
  
  // ------ Drag and Drop functionality ------
  
  // Setup drag and drop event listeners
  private setupDragAndDropEvents(): void {
    if (typeof window !== 'undefined') {
      document.addEventListener('dragenter', this.onDragEnter.bind(this));
      document.addEventListener('dragleave', this.onDragLeave.bind(this));
      document.addEventListener('dragover', this.onDragOver.bind(this));
      document.addEventListener('drop', this.onDrop.bind(this));
    }
  }
  
  // Remove drag and drop event listeners
  private removeDragAndDropEvents(): void {
    if (typeof window !== 'undefined') {
      document.removeEventListener('dragenter', this.onDragEnter.bind(this));
      document.removeEventListener('dragleave', this.onDragLeave.bind(this));
      document.removeEventListener('dragover', this.onDragOver.bind(this));
      document.removeEventListener('drop', this.onDrop.bind(this));
    }
  }
  
  // Drag enter handler
  private onDragEnter(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    
    this.dragCounter++;
    
    if (event.dataTransfer && this.isValidDropzone(event)) {
      event.dataTransfer.dropEffect = 'copy';
      this.isDragging = true;
    }
  }
  
  // Drag leave handler
  private onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    
    this.dragCounter--;
    
    if (this.dragCounter === 0) {
      this.isDragging = false;
    }
  }
  
  // Drag over handler
  private onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    
    if (event.dataTransfer && this.isValidDropzone(event)) {
      event.dataTransfer.dropEffect = 'copy';
    }
  }
  
  // Drop handler
  private onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    
    this.isDragging = false;
    this.dragCounter = 0;
    
    // Check if drop is inside the dropzone
    if (this.isValidDropzone(event) && event.dataTransfer) {
      const files = event.dataTransfer.files;
      if (files.length > 0) {
        this.handleFiles(Array.from(files));
      }
    }
  }
  
  // Check if drop target is within our dropzone
  private isValidDropzone(event: DragEvent): boolean {
    if (!this.dropZone || !this.dropZone.nativeElement) {
      return false;
    }
    
    const dropzoneRect = this.dropZone.nativeElement.getBoundingClientRect();
    
    return (
      event.clientX >= dropzoneRect.left &&
      event.clientX <= dropzoneRect.right &&
      event.clientY >= dropzoneRect.top &&
      event.clientY <= dropzoneRect.bottom
    );
  }
  
  // Get file icon based on file type
  getFileIcon(fileType: string): string {
    if (fileType.startsWith('image/')) {
      return 'image';
    } else if (fileType.startsWith('video/')) {
      return 'video';
    } else if (fileType.startsWith('audio/')) {
      return 'audio';
    } else if (fileType.includes('pdf')) {
      return 'pdf';
    } else if (fileType.includes('word') || fileType.includes('doc')) {
      return 'doc';
    } else if (fileType.includes('excel') || fileType.includes('sheet') || fileType.includes('csv')) {
      return 'sheet';
    } else if (fileType.includes('powerpoint') || fileType.includes('presentation')) {
      return 'presentation';
    } else if (fileType.includes('zip') || fileType.includes('rar') || fileType.includes('tar') || fileType.includes('gz')) {
      return 'archive';
    } else {
      return 'file';
    }
  }
}