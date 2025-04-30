import { Component, Input, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'skillvo-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss'
})
export class TabComponent {
  @Input() title: string = '';
  @Input() icon: string = '';
  @Input() disabled: boolean = false;
  @Input() customClass: string = '';
  @Input() badge: string | number | null = null;
  @Input() badgeColor: string = 'primary';
  @Input() index: number = 0;
  
  @ViewChild('tabContent') tabContent!: ElementRef;
  
  active: boolean = false;
  
  getPanelId(): string {
    return `tabpanel-${this.index}`;
  }
} 