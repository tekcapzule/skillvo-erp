import { Component, Input, Output, EventEmitter, ContentChildren, QueryList, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from './tab/tab.component';

@Component({
  selector: 'skillvo-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;
  
  @Input() activeTabIndex: number = 0;
  @Input() color: string = 'primary';
  @Input() backgroundColor: string = 'transparent';
  @Input() tabsAlignment: 'start' | 'center' | 'end' | 'stretch' = 'start';
  @Input() pillStyle: boolean = false;
  @Input() showUnderline: boolean = true;
  @Input() animated: boolean = true;
  
  @Output() tabChange = new EventEmitter<number>();
  
  activeTab: TabComponent | null = null;
  
  constructor(private cdr: ChangeDetectorRef) {}
  
  ngAfterContentInit(): void {
    // Set active tab based on activeTabIndex or default to first tab
    setTimeout(() => {
      if (this.tabs && this.tabs.length > 0) {
        const tabArray = this.tabs.toArray();
        
        // Set index for each tab
        tabArray.forEach((tab, index) => {
          tab.index = index;
        });
        
        const activeTabExists = this.activeTabIndex >= 0 && this.activeTabIndex < tabArray.length;
        
        this.selectTab(activeTabExists ? tabArray[this.activeTabIndex] : tabArray[0]);
        this.cdr.detectChanges();
      }
    });
    
    // Subscribe to tab changes
    this.tabs.changes.subscribe(() => {
      if (this.tabs.length > 0) {
        const tabArray = this.tabs.toArray();
        
        // Update indexes when tabs change
        tabArray.forEach((tab, index) => {
          tab.index = index;
        });
        
        const activeTabStillExists = this.activeTab && tabArray.includes(this.activeTab);
        
        if (!activeTabStillExists) {
          this.selectTab(tabArray[0]);
        }
        
        this.cdr.detectChanges();
      }
    });
  }
  
  selectTab(tab: TabComponent): void {
    if (this.activeTab === tab) return;
    
    // Deactivate all tabs
    this.tabs.forEach(tab => tab.active = false);
    
    // Activate the selected tab
    tab.active = true;
    this.activeTab = tab;
    
    // Find index of selected tab
    const tabArray = this.tabs.toArray();
    const index = tabArray.indexOf(tab);
    this.activeTabIndex = index;
    
    // Emit tab change event
    this.tabChange.emit(index);
  }
  
  isDisabled(tab: TabComponent): boolean {
    return tab.disabled;
  }
  
  getTabsContainerClass(): string {
    return `tabs-container align-${this.tabsAlignment} ${this.pillStyle ? 'pill-style' : ''} ${this.showUnderline ? 'with-underline' : ''}`;
  }
} 