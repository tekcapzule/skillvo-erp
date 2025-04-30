import { Component, Input, Output, EventEmitter, HostBinding, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'sv-accordion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
  animations: [
    trigger('contentExpansion', [
      state('collapsed', style({
        height: '0',
        opacity: 0,
        overflow: 'hidden'
      })),
      state('expanded', style({
        height: '*',
        opacity: 1
      })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out'))
    ]),
    trigger('iconRotation', [
      state('collapsed', style({ transform: 'rotate(0)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out'))
    ])
  ]
})
export class AccordionComponent implements OnInit {
  /**
   * The title displayed in the accordion header
   */
  @Input() title = '';
  
  /**
   * Whether the accordion is expanded
   */
  @Input() expanded = false;
  
  /**
   * Whether the accordion is disabled
   */
  @Input() disabled = false;
  
  /**
   * Theme of the accordion
   */
  @Input() theme: 'light' | 'dark' = 'light';
  
  /**
   * Optional custom CSS class to add to the component
   */
  @Input() customClass = '';
  
  /**
   * Event emitted when the accordion is toggled
   */
  @Output() expandedChange = new EventEmitter<boolean>();
  
  /**
   * Apply custom class to host element
   */
  get hostClass() {
    return this.customClass;
  }
  
  @HostBinding('class.sv-accordion')
  get hostClassCombined() {
    return this.hostClass;
  }
  
  @HostBinding('class.sv-accordion--expanded')
  get isExpanded(): boolean {
    return this.expanded;
  }
  
  @HostBinding('class.sv-accordion--disabled')
  get isDisabled(): boolean {
    return this.disabled;
  }
  
  @HostBinding('class.theme-dark')
  get isDarkTheme(): boolean {
    return this.theme === 'dark';
  }
  
  constructor() {}
  
  ngOnInit(): void {}
  
  /**
   * Toggle the expanded state of the accordion
   */
  toggle(): void {
    if (!this.disabled) {
      this.expanded = !this.expanded;
      this.expandedChange.emit(this.expanded);
    }
  }
  
  /**
   * Get the current animation state
   */
  get state(): string {
    return this.expanded ? 'expanded' : 'collapsed';
  }
} 