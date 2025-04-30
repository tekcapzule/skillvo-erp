import { Component, Input, Output, EventEmitter, HostBinding, OnInit, ContentChildren, QueryList, AfterContentInit, Renderer2, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { IconButtonComponent } from '../icon-button/icon-button.component';

@Component({
  selector: 'sv-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ButtonGroupComponent implements OnInit, AfterContentInit {
  @Input() variant: 'primary' | 'secondary' | 'outline' | 'text' | 'segmented' = 'outline';
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() spacing: 'none' | 'spaced' = 'none';
  @Input() shape: 'default' | 'pill' = 'default';
  @Input() dividers = false;
  @Input() fullWidth = false;
  @Input() responsive = false;
  @Input() ariaLabel?: string;
  @Input() role: 'group' | 'toolbar' | 'radiogroup' = 'group';
  
  @ContentChildren(ButtonComponent, { read: ElementRef }) buttonElements!: QueryList<ElementRef>;
  @ContentChildren(IconButtonComponent) iconButtons!: QueryList<IconButtonComponent>;
  
  // Track the currently selected button in a radiogroup
  private selectedButtonIndex = -1;
  
  constructor(private renderer: Renderer2) {}
  
  @HostBinding('class')
  get hostClasses(): string {
    return [
      'sv-button-group',
      `sv-button-group-${this.variant}`,
      this.orientation === 'vertical' ? 'sv-button-group-vertical' : '',
      this.spacing === 'spaced' ? 'sv-button-group-spaced' : '',
      this.shape === 'pill' ? 'sv-button-group-pill' : '',
      this.dividers ? 'sv-button-group-dividers' : '',
      this.fullWidth ? 'sv-button-group-full-width' : '',
      this.responsive ? 'sv-button-group-responsive' : ''
    ].filter(Boolean).join(' ');
  }
  
  @HostBinding('attr.role')
  get roleAttribute(): string {
    return this.role;
  }
  
  @HostBinding('attr.aria-label')
  get ariaLabelAttribute(): string | null {
    return this.ariaLabel || null;
  }
  
  ngOnInit(): void {}
  
  ngAfterContentInit(): void {
    if (this.role === 'radiogroup') {
      this.setupRadioGroupBehavior();
    }
    
    // Handle IconButtonComponent toggle behavior
    this.iconButtons.forEach((iconButton, index) => {
      iconButton.click.subscribe(() => {
        if (this.role === 'radiogroup') {
          this.handleIconButtonSelection(index);
        }
      });
    });
  }
  
  private setupRadioGroupBehavior(): void {
    // Add click listeners to button elements to handle selection states
    this.buttonElements.forEach((buttonRef, index) => {
      this.renderer.listen(buttonRef.nativeElement, 'click', () => {
        this.handleButtonSelection(index);
      });
    });
    
    // Setup initial selection states using aria-pressed
    this.updateButtonSelectionState();
  }
  
  private handleButtonSelection(selectedIndex: number): void {
    if (this.role !== 'radiogroup') return;
    
    // Update selected index
    this.selectedButtonIndex = selectedIndex;
    
    // Update all buttons' selection state
    this.updateButtonSelectionState();
  }
  
  private handleIconButtonSelection(selectedIndex: number): void {
    // Handle selection for icon buttons that have a pressed property
    if (this.role !== 'radiogroup') return;
    
    this.iconButtons.forEach((button, index) => {
      button.pressed = index === selectedIndex;
    });
    
    // Deselect any selected regular buttons
    this.selectedButtonIndex = -1;
    this.updateButtonSelectionState();
  }
  
  private updateButtonSelectionState(): void {
    // Update aria-pressed attribute on button elements to reflect selection state
    this.buttonElements.forEach((buttonRef, index) => {
      const isSelected = index === this.selectedButtonIndex;
      this.renderer.setAttribute(
        buttonRef.nativeElement, 
        'aria-pressed', 
        isSelected ? 'true' : 'false'
      );
      
      // Optionally add/remove a selected class
      if (isSelected) {
        this.renderer.addClass(buttonRef.nativeElement, 'selected');
      } else {
        this.renderer.removeClass(buttonRef.nativeElement, 'selected');
      }
    });
  }
}
