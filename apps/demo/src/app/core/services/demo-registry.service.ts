import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ComponentDemo } from '../interfaces/component-demo.interface';

@Injectable({
  providedIn: 'root'
})
export class DemoRegistryService {
  // Store all registered component demos
  private demos: ComponentDemo[] = [];
  
  // Current active demo
  private activeDemo = new BehaviorSubject<ComponentDemo | null>(null);
  
  // Expose observable for components to subscribe to
  public activeDemo$ = this.activeDemo.asObservable();
  
  constructor() {}
  
  /**
   * Register a component demo
   */
  registerDemo(demo: ComponentDemo): void {
    // Prevent duplicates
    if (this.demos.find(d => d.id === demo.id)) {
      console.warn(`Demo with ID ${demo.id} already registered. Skipping.`);
      return;
    }
    
    this.demos.push(demo);
  }
  
  /**
   * Get all registered demos
   */
  getAllDemos(): ComponentDemo[] {
    return [...this.demos];
  }
  
  /**
   * Get a specific demo by ID
   */
  getDemoById(id: string): ComponentDemo | undefined {
    return this.demos.find(demo => demo.id === id);
  }
  
  /**
   * Set the active demo
   */
  setActiveDemo(demoId: string): void {
    const demo = this.getDemoById(demoId);
    if (demo) {
      this.activeDemo.next(demo);
    } else {
      console.warn(`No demo found with ID: ${demoId}`);
    }
  }
  
  /**
   * Get the currently active demo
   */
  getActiveDemo(): ComponentDemo | null {
    return this.activeDemo.value;
  }
} 