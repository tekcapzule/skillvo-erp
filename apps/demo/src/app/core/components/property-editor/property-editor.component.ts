import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { ComponentDemo, PropertyDefinition, PropertyType } from '../../interfaces/component-demo.interface';

@Component({
  selector: 'demo-property-editor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatDividerModule
  ],
  templateUrl: './property-editor.component.html',
  styleUrls: ['./property-editor.component.scss']
})
export class PropertyEditorComponent implements OnInit, OnChanges, OnDestroy {
  @Input() componentInstance: any;
  @Input() properties: PropertyDefinition[] = [];
  
  propertiesForm!: FormGroup;
  groupedProperties: { [category: string]: PropertyDefinition[] } = {};
  propertyType = PropertyType; // For template access
  
  private destroy$ = new Subject<void>();
  
  constructor(private fb: FormBuilder) {}
  
  ngOnInit(): void {
    this.initForm();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['properties'] && !changes['properties'].firstChange) {
      this.initForm();
    }
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  // Helper method for template
  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  
  private initForm(): void {
    // Group properties by category
    this.groupedProperties = this.groupPropertiesByCategory(this.properties);
    
    // Create form group
    const formConfig: { [key: string]: any } = {};
    
    this.properties.forEach(prop => {
      formConfig[prop.name] = [
        this.componentInstance ? this.componentInstance[prop.name] : prop.defaultValue
      ];
    });
    
    this.propertiesForm = this.fb.group(formConfig);
    
    // Subscribe to form changes
    this.propertiesForm.valueChanges
      .pipe(
        debounceTime(300),
        takeUntil(this.destroy$)
      )
      .subscribe(formValues => {
        if (this.componentInstance) {
          Object.keys(formValues).forEach(key => {
            this.componentInstance[key] = formValues[key];
          });
        }
      });
  }
  
  private groupPropertiesByCategory(properties: PropertyDefinition[]): { [category: string]: PropertyDefinition[] } {
    const grouped: { [category: string]: PropertyDefinition[] } = {};
    
    properties.forEach(prop => {
      const category = prop.category || 'General';
      
      if (!grouped[category]) {
        grouped[category] = [];
      }
      
      grouped[category].push(prop);
    });
    
    return grouped;
  }
} 