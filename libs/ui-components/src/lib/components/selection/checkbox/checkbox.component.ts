import { Component, Input, forwardRef, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseSelectionComponent } from '../base-selection/base-selection.component';

@Component({
  selector: 'sv-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent extends BaseSelectionComponent implements AfterViewInit {
  @Input() indeterminate: boolean = false;
  @Input() ariaLabel?: string;
  @Input() ariaLabelledby?: string;
  @Input() inputValue?: string;
  
  @ViewChild('checkboxInput') checkboxInput!: ElementRef<HTMLInputElement>;

  ngAfterViewInit(): void {
    // Set initial indeterminate state
    this.setIndeterminate();
  }
  
  /**
   * Returns CSS classes for the checkbox
   */
  getCheckboxClasses(): string {
    return `sv-checkbox 
            ${this.indeterminate ? 'sv-checkbox-indeterminate' : ''}
            ${super.getSelectionClasses()}`;
  }
  
  /**
   * Sets the indeterminate state of the checkbox
   * Note: This is a visual state only, not part of the value accessor
   */
  setIndeterminate(): void {
    if (this.checkboxInput?.nativeElement) {
      this.checkboxInput.nativeElement.indeterminate = this.indeterminate;
    }
  }
} 