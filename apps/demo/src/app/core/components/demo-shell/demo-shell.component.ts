// @ts-ignore
import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, ViewChild, ViewChildren, ViewContainerRef, QueryList, AfterViewInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { Subject, takeUntil } from 'rxjs';
import { ComponentDemo, ComponentVariant } from '../../interfaces/component-demo.interface';
import { DemoRegistryService } from '../../services/demo-registry.service';
import { EventTrackingService } from '../../services/event-tracking.service';
import { PropertyEditorComponent } from '../property-editor/property-editor.component';
import { EventMonitorComponent } from '../event-monitor/event-monitor.component';

@Component({
  selector: 'demo-shell',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    PropertyEditorComponent,
    EventMonitorComponent
  ],
  templateUrl: './demo-shell.component.html',
  styleUrls: ['./demo-shell.component.scss']
})
export class DemoShellComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() demoId!: string;
  
  @ViewChild('componentContainer', { read: ViewContainerRef, static: true })
  componentContainer!: ViewContainerRef;
  
  @ViewChildren('variantContainer', { read: ViewContainerRef })
  variantContainers!: QueryList<ViewContainerRef>;
  
  activeDemo: ComponentDemo | null = null;
  activeTabIndex = 0;
  componentInstance: any = null;
  
  private destroy$ = new Subject<void>();
  
  constructor(
    private demoRegistry: DemoRegistryService,
    private eventTracking: EventTrackingService
  ) {}
  
  ngOnInit(): void {
    if (this.demoId) {
      this.demoRegistry.setActiveDemo(this.demoId);
    }
    
    this.demoRegistry.activeDemo$
      .pipe(takeUntil(this.destroy$))
      .subscribe(demo => {
        this.activeDemo = demo;
        this.renderComponent();
      });
  }
  
  ngAfterViewInit(): void {
    // When the view is initialized, render all variants
    this.renderVariantComponents();
    
    // When the tab changes to overview, ensure variants are rendered
    this.variantContainers.changes
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.activeTabIndex === 0 && this.activeDemo) {
          setTimeout(() => this.renderVariantComponents(), 0);
        }
      });
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  onTabChange(index: number): void {
    this.activeTabIndex = index;
    
    // When switching to overview tab, render variants
    if (index === 0 && this.activeDemo) {
      setTimeout(() => this.renderVariantComponents(), 0);
    }
  }
  
  /**
   * Convert component properties to a formatted string for display
   */
  getVariantPropertiesString(properties: Record<string, any>): string {
    if (!properties) return '';
    
    return Object.entries(properties)
      .map(([key, value]) => {
        // Format different types of values appropriately
        const formattedValue = typeof value === 'string' 
          ? `"${value}"` 
          : value;
          
        // Handle boolean properties with Angular binding syntax
        if (typeof value === 'boolean') {
          return `[${key}]="${formattedValue}"`;
        }
        
        return `${key}="${formattedValue}"`;
      })
      .join('\n');
  }
  
  /**
   * Render all component variants in the overview tab
   */
  private renderVariantComponents(): void {
    if (!this.activeDemo || !this.variantContainers) return;
    
    // Store reference to avoid null error
    const demo = this.activeDemo;
    
    setTimeout(() => {
      const containers = this.variantContainers.toArray();
      if (containers.length === 0) return;
      
      // Clear all existing components
      containers.forEach(container => container.clear());
      
      // Create a single demo component per variant
      demo.variants.forEach((variant, index) => {
        if (index < containers.length) {
          this.createVariantComponent(variant, containers[index]);
        }
      });
    }, 0);
  }
  
  /**
   * Create a component instance for a variant
   */
  private createVariantComponent(variant: ComponentVariant, container: ViewContainerRef): void {
    if (!this.activeDemo) return;
    
    try {
      // Create the component - use type assertion to bypass strict type checking
      // @ts-ignore - This is fine, TypeScript is being too strict
      const componentRef = container.createComponent(this.activeDemo.component);
      
      // Apply the variant properties
      if (variant.properties) {
        // @ts-ignore - Properties are dynamically set on the component instance
        Object.entries(variant.properties).forEach(([key, value]) => {
          componentRef.instance[key] = value;
        });
      }
      
      // Special handling for button component to add content
      // @ts-ignore - We know the id exists here
      if (this.activeDemo.id.includes('button')) {
        setTimeout(() => {
          const element = componentRef.location.nativeElement;
          if (element) {
            const contentEl = element.querySelector('.sv-button-content');
            if (contentEl && !contentEl.textContent?.trim()) {
              contentEl.textContent = variant.name || variant.id || 'Button';
            }
          }
        }, 0);
      }
    } catch (error) {
      console.error('Error creating variant component:', error);
    }
  }
  
  private renderComponent(): void {
    if (!this.activeDemo || !this.componentContainer) {
      return;
    }
    
    // Clear existing component
    this.componentContainer.clear();
    
    // Create new component
    const componentRef = this.componentContainer.createComponent(this.activeDemo.component);
    this.componentInstance = componentRef.instance;
    
    // Set initial properties from default variant
    const defaultVariantId = this.activeDemo.defaultVariantId;
    const variants = this.activeDemo.variants;
    
    if (defaultVariantId && variants) {
      const defaultVariant = variants.find(v => v.id === defaultVariantId);
      if (defaultVariant) {
        Object.entries(defaultVariant.properties).forEach(([key, value]) => {
          this.componentInstance[key] = value;
        });
      }
    }
    
    // Set up event listeners
    this.setupEventListeners(this.componentInstance, this.activeDemo);
    
    // If we're on the overview tab, render all variants
    if (this.activeTabIndex === 0) {
      setTimeout(() => this.renderVariantComponents(), 0);
    }
  }
  
  private setupEventListeners(componentInstance: any, demo: ComponentDemo): void {
    if (!componentInstance) {
      return;
    }
    
    // Listen to all events defined in the demo
    demo.events.forEach(event => {
      if (componentInstance[event.name]) {
        componentInstance[event.name].pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
          this.eventTracking.trackEvent(event.name, data);
        });
      }
    });
  }
} 