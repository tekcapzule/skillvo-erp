import { Component, Input, Output, EventEmitter, OnInit, HostBinding, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'sv-tag-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tag-input.component.html',
  styleUrl: './tag-input.component.scss'
})
export class TagInputComponent implements OnInit {
  /**
   * Reference to JavaScript's Infinity for use in template
   */
  readonly Infinity = Infinity;
  
  /**
   * Label for the tag input
   */
  @Input() label = 'Tags';
  
  /**
   * Array of tags
   */
  @Input() tags: string[] = [];
  
  /**
   * Placeholder text for the input
   */
  @Input() placeholder = 'Add a tag...';
  
  /**
   * Whether the tag input is disabled
   */
  @Input() disabled = false;
  
  /**
   * Maximum number of tags allowed
   */
  @Input() maxTags = Infinity;
  
  /**
   * Theme of the tag input
   */
  @Input() theme: 'light' | 'dark' = 'light';
  
  /**
   * Custom class to apply to the component
   */
  @Input() customClass = '';
  
  /**
   * Event emitted when tags change
   */
  @Output() tagsChange = new EventEmitter<string[]>();
  
  /**
   * Current input value
   */
  inputValue = '';
  
  /**
   * Whether the input is focused
   */
  isInputFocused = false;
  
  /**
   * Reference to the input element
   */
  @ViewChild('tagInput') tagInputElement!: ElementRef<HTMLInputElement>;
  
  constructor() {}
  
  @HostBinding('class.theme-dark')
  get isDarkTheme(): boolean {
    return this.theme === 'dark';
  }
  
  ngOnInit(): void {}
  
  /**
   * Handle key down events in the input
   */
  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled) return;
    
    // Add tag on Enter or comma
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      this.addTag();
    }
    
    // Remove last tag on Backspace if input is empty
    if (event.key === 'Backspace' && !this.inputValue && this.tags.length > 0) {
      this.removeTag(this.tags.length - 1);
    }
  }
  
  /**
   * Add the current input value as a tag
   */
  addTag(): void {
    const tag = this.inputValue.trim();
    
    if (!tag || this.tags.length >= this.maxTags) return;
    
    // Don't add duplicates
    if (!this.tags.includes(tag)) {
      const newTags = [...this.tags, tag];
      this.tags = newTags;
      this.tagsChange.emit(newTags);
    }
    
    this.inputValue = '';
  }
  
  /**
   * Remove a tag at the specified index
   */
  removeTag(index: number): void {
    if (this.disabled) return;
    
    const newTags = [...this.tags];
    newTags.splice(index, 1);
    this.tags = newTags;
    this.tagsChange.emit(newTags);
  }
  
  /**
   * Focus the input when clicking on the container
   */
  onContainerClick(): void {
    if (this.disabled) return;
    
    this.tagInputElement.nativeElement.focus();
  }
  
  /**
   * Handle input focus
   */
  onInputFocus(): void {
    this.isInputFocused = true;
  }
  
  /**
   * Handle input blur
   */
  onInputBlur(): void {
    this.isInputFocused = false;
    
    // Add the current input value as a tag if not empty
    if (this.inputValue.trim()) {
      this.addTag();
    }
  }
} 