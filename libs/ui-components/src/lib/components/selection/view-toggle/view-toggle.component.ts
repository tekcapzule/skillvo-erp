import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export type ViewType = 'card' | 'list' | 'kanban';

export interface ViewOption {
  id: ViewType;
  label: string;
  svgTemplate: string;
  tooltip?: string;
  sanitizedSvg?: SafeHtml;
}

@Component({
  selector: 'sv-view-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-toggle.component.html',
  styleUrls: ['./view-toggle.component.scss']
})
export class ViewToggleComponent {
  @Input() selectedView: ViewType = 'card';
  @Input() showKanban = true;
  @Input() customClass = '';
  @Input() disabled = false;
  
  @Output() viewChange = new EventEmitter<ViewType>();
  
  defaultOptions: ViewOption[] = [
    { 
      id: 'card', 
      label: 'Card View', 
      svgTemplate: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
                      <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
                      <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
                      <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" stroke-width="2"/>
                    </svg>`,
      tooltip: 'Display as cards' 
    },
    { 
      id: 'list', 
      label: 'List View', 
      svgTemplate: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 6H20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                      <path d="M4 12H20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                      <path d="M4 18H20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>`,
      tooltip: 'Display as list' 
    },
    { 
      id: 'kanban', 
      label: 'Kanban View', 
      svgTemplate: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="3" width="5" height="18" rx="1" stroke="currentColor" stroke-width="2"/>
                      <rect x="10" y="3" width="5" height="12" rx="1" stroke="currentColor" stroke-width="2"/>
                      <rect x="17" y="3" width="5" height="6" rx="1" stroke="currentColor" stroke-width="2"/>
                    </svg>`,
      tooltip: 'Display as kanban' 
    }
  ];
  
  @Input() set options(values: ViewOption[]) {
    values.forEach(option => {
      option.sanitizedSvg = this.sanitizer.bypassSecurityTrustHtml(option.svgTemplate);
    });
    this._options = values;
  }
  
  get options(): ViewOption[] {
    return this._options;
  }
  
  private _options: ViewOption[] = [];
  
  constructor(private sanitizer: DomSanitizer) {
    // Initialize default options with sanitized SVG
    this.defaultOptions.forEach(option => {
      option.sanitizedSvg = this.sanitizer.bypassSecurityTrustHtml(option.svgTemplate);
    });
    this._options = this.defaultOptions;
  }
  
  @HostBinding('class.disabled') get isDisabled() {
    return this.disabled;
  }
  
  get visibleOptions(): ViewOption[] {
    if (this.showKanban) {
      return this.options;
    }
    return this.options.filter(option => option.id !== 'kanban');
  }
  
  selectView(viewType: ViewType): void {
    if (this.disabled) return;
    
    if (this.selectedView !== viewType) {
      this.selectedView = viewType;
      this.viewChange.emit(viewType);
    }
  }
  
  isSelected(viewType: ViewType): boolean {
    return this.selectedView === viewType;
  }
} 