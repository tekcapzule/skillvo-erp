import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import Quill from 'quill';
import Delta from 'quill-delta';

export interface QuillEditorConfig {
  theme?: 'snow' | 'bubble';
  modules?: any;
  placeholder?: string;
  readOnly?: boolean;
  formats?: string[];
  bounds?: HTMLElement | string;
  scrollingContainer?: HTMLElement | string;
  debug?: 'error' | 'warn' | 'log' | false;
}

@Component({
  selector: 'sv-html-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './html-editor.component.html',
  styleUrl: './html-editor.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HtmlEditorComponent),
      multi: true
    }
  ]
})
export class HtmlEditorComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @ViewChild('editorContainer', { static: true }) editorContainer!: ElementRef;
  
  @Input() config: QuillEditorConfig = {
    theme: 'snow',
    placeholder: 'Enter content here...',
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        ['link', 'image', 'video'],
        ['clean']
      ]
    }
  };
  
  @Input() height = '300px';
  @Input() minHeight = '150px';
  @Input() maxHeight = '500px';

  @Output() contentChanged = new EventEmitter<string>();

  private quill!: Quill;
  private value: string = '';
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  ngOnInit(): void {
    this.initializeQuill();
  }

  ngOnDestroy(): void {
    // Cleanup if needed
    this.quill = null as unknown as Quill;
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.value = value || '';
    if (this.quill) {
      // Set content without triggering change event
      this.quill.clipboard.dangerouslyPasteHTML(this.value);
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (this.quill) {
      this.quill.enable(!isDisabled);
    }
  }

  private initializeQuill(): void {
    if (typeof document !== 'undefined') {
      this.quill = new Quill(this.editorContainer.nativeElement, this.config);
      
      // Set initial content if available
      if (this.value) {
        this.quill.clipboard.dangerouslyPasteHTML(this.value);
      }
      
      // Register change event handler
      this.quill.on('text-change', () => {
        const html = this.editorContainer.nativeElement.querySelector('.ql-editor')?.innerHTML || '';
        this.value = html;
        this.onChange(html);
        this.contentChanged.emit(html);
      });
      
      // Register blur event for touched state
      this.quill.root.addEventListener('blur', () => {
        this.onTouched();
      });
    }
  }
} 