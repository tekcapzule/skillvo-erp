import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ColorPickerComponent } from '@skillvo-web/ui-components';
import { RouterModule } from '@angular/router';
import { DemoShellComponent } from '../../../core/components/demo-shell/demo-shell.component';
import { ComponentDemo, EventDefinition, PropertyDefinition, PropertyType } from '../../../core/interfaces/component-demo.interface';
import { DemoRegistryService } from '../../../core/services/demo-registry.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-color-picker-demo',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    ColorPickerComponent, 
    RouterModule,
    DemoShellComponent
  ],
  templateUrl: './color-picker-demo.component.html',
  styleUrls: ['./color-picker-demo.component.scss']
})
export class ColorPickerDemoComponent implements AfterViewInit, OnDestroy {
  readonly DEMO_ID = 'color-picker-component';
  private destroy$ = new Subject<void>();

  constructor(
    private demoRegistry: DemoRegistryService,
    private elementRef: ElementRef
  ) {
    // Register the Color Picker component demo
    this.registerColorPickerDemo();
  }

  ngAfterViewInit(): void {
    // Listen for when the component is rendered in the demo shell
    this.demoRegistry.activeDemo$
      .pipe(takeUntil(this.destroy$))
      .subscribe(demo => {
        if (demo && demo.id === this.DEMO_ID) {
          setTimeout(() => {
            this.applyColorPickerContent();
          }, 0);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private applyColorPickerContent(): void {
    // Find the color picker elements in the demo container
    const colorPickerElements = this.elementRef.nativeElement.querySelectorAll('sv-color-picker');

    // Apply color picker display text based on properties
    colorPickerElements.forEach((colorPicker: HTMLElement) => {
      // Get format type
      const formatAttr = colorPicker.getAttribute('ng-reflect-format');
      const format = formatAttr ? formatAttr : 'hex';
      
      // Check if alpha is enabled
      const showAlphaAttr = colorPicker.getAttribute('ng-reflect-show-alpha');
      const showAlpha = showAlphaAttr === 'true';
      
      // Check if palette is enabled
      const showPaletteAttr = colorPicker.getAttribute('ng-reflect-show-palette');
      const showPalette = showPaletteAttr === 'true';
      
      // Check if disabled
      const isDisabled = colorPicker.hasAttribute('disabled');
      
      let labelText = `${format.toUpperCase()} Color Picker`;
      
      if (isDisabled) {
        labelText = 'Disabled Color Picker';
      } else if (!showPalette) {
        labelText = 'No Palette Picker';
      } else if (!showAlpha) {
        labelText = 'No Alpha Picker';
      }
      
      // Find the label element and set text
      const labelElement = colorPicker.querySelector('.sv-form-label');
      if (labelElement) {
        labelElement.textContent = labelText;
      }
    });
  }

  private registerColorPickerDemo(): void {
    const colorPickerDemo: ComponentDemo<ColorPickerComponent> = {
      id: this.DEMO_ID,
      name: 'Color Picker Component',
      description: 'A color picker component that allows users to select colors in various formats with different display options.',
      component: ColorPickerComponent,
      properties: this.getColorPickerProperties(),
      events: this.getColorPickerEvents(),
      codeSnippets: this.getColorPickerCodeSnippets(),
      variants: this.getColorPickerVariants(),
      defaultVariantId: 'hex-standard',
      cssClasses: [
        'sv-input-container',
        'sv-form-label',
        'sv-color-preview',
        'sv-color-palette',
        'sv-color-panel'
      ]
    };

    this.demoRegistry.registerDemo(colorPickerDemo);
  }

  private getColorPickerProperties(): PropertyDefinition[] {
    return [
      {
        name: 'format',
        type: PropertyType.SELECT,
        defaultValue: 'hex',
        category: 'Appearance',
        description: 'Color format to display and output',
        options: ['hex', 'rgb', 'hsl']
      },
      {
        name: 'showAlpha',
        type: PropertyType.BOOLEAN,
        defaultValue: true,
        category: 'Appearance',
        description: 'Whether to show alpha/transparency controls'
      },
      {
        name: 'showPalette',
        type: PropertyType.BOOLEAN,
        defaultValue: true,
        category: 'Appearance',
        description: 'Whether to show color palette'
      },
      {
        name: 'defaultColor',
        type: PropertyType.STRING,
        defaultValue: '#ffffff',
        category: 'Content',
        description: 'Default color when no value is provided'
      },
      {
        name: 'palette',
        type: PropertyType.ARRAY,
        defaultValue: ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3'],
        category: 'Content',
        description: 'Array of color values to display in the palette'
      },
      {
        name: 'recentColors',
        type: PropertyType.ARRAY,
        defaultValue: [],
        category: 'Content',
        description: 'Array of recently used colors'
      },
      {
        name: 'disabled',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'State',
        description: 'Whether the color picker is disabled'
      },
      {
        name: 'label',
        type: PropertyType.STRING,
        defaultValue: 'Color',
        category: 'Content',
        description: 'Label for the color picker'
      },
      {
        name: 'placeholder',
        type: PropertyType.STRING,
        defaultValue: 'Select color',
        category: 'Content',
        description: 'Placeholder text for the color input'
      },
      {
        name: 'helpText',
        type: PropertyType.STRING,
        defaultValue: '',
        category: 'Content',
        description: 'Help text displayed below the color picker'
      }
    ];
  }

  private getColorPickerEvents(): EventDefinition[] {
    return [
      {
        name: 'colorChange',
        description: 'Emitted when the color value changes'
      }
    ];
  }

  private getColorPickerCodeSnippets(): any[] {
    return [
      {
        language: 'html',
        title: 'Basic Usage',
        description: 'Simple color picker with default settings',
        code: '<sv-color-picker format="hex" label="Select Color"></sv-color-picker>'
      },
      {
        language: 'html',
        title: 'RGB Format',
        description: 'Color picker with RGB format',
        code: '<sv-color-picker format="rgb" label="RGB Color"></sv-color-picker>'
      },
      {
        language: 'html',
        title: 'No Alpha',
        description: 'Color picker without alpha/transparency controls',
        code: '<sv-color-picker [showAlpha]="false" label="Solid Colors Only"></sv-color-picker>'
      },
      {
        language: 'html',
        title: 'Custom Palette',
        description: 'Color picker with custom palette colors',
        code: `<sv-color-picker 
  [palette]="['#FF5722', '#4CAF50', '#2196F3', '#9C27B0', '#FFC107']"
  label="Brand Colors">
</sv-color-picker>`
      },
      {
        language: 'html',
        title: 'Full Configuration',
        description: 'Color picker with all properties configured',
        code: `<sv-color-picker 
  format="hsl"
  [showAlpha]="true"
  [showPalette]="true"
  defaultColor="#4CAF50"
  [palette]="customPalette"
  [recentColors]="recentColors"
  [disabled]="isDisabled"
  label="Custom Color Picker"
  placeholder="Choose a color"
  helpText="Select a color from the palette or define your own"
  (colorChange)="onColorChange($event)">
</sv-color-picker>`
      },
      {
        language: 'typescript',
        title: 'Component Implementation',
        description: 'Example of color picker integration in a component',
        code: `import { Component } from '@angular/core';
import { ColorPickerComponent } from '@skillvo-web/ui-components';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ColorPickerComponent],
  template: \`
    <sv-color-picker 
      format="hex" 
      [(ngModel)]="selectedColor"
      (colorChange)="onColorChange($event)">
    </sv-color-picker>
    <div *ngIf="selectedColor" [style.background-color]="selectedColor">
      Selected color preview
    </div>
  \`
})
export class ExampleComponent {
  selectedColor = '#2196F3';
  
  onColorChange(color: string) {
    console.log('Color changed:', color);
    // Do something with the selected color
  }
}`
      }
    ];
  }

  private getColorPickerVariants(): any[] {
    return [
      {
        id: 'hex-standard',
        name: 'Hex Format (Standard)',
        description: 'Color picker with HEX format',
        component: {
          inputs: {
            format: 'hex',
            showAlpha: true,
            showPalette: true,
            label: 'HEX Color Picker'
          }
        }
      },
      {
        id: 'rgb-standard',
        name: 'RGB Format',
        description: 'Color picker with RGB format',
        component: {
          inputs: {
            format: 'rgb',
            showAlpha: true,
            showPalette: true,
            label: 'RGB Color Picker'
          }
        }
      },
      {
        id: 'hsl-standard',
        name: 'HSL Format',
        description: 'Color picker with HSL format',
        component: {
          inputs: {
            format: 'hsl',
            showAlpha: true,
            showPalette: true,
            label: 'HSL Color Picker'
          }
        }
      },
      {
        id: 'no-alpha',
        name: 'No Alpha Channel',
        description: 'Color picker without alpha/transparency control',
        component: {
          inputs: {
            format: 'hex',
            showAlpha: false,
            showPalette: true,
            label: 'No Alpha Picker'
          }
        }
      },
      {
        id: 'no-palette',
        name: 'No Palette',
        description: 'Color picker without color palette',
        component: {
          inputs: {
            format: 'hex',
            showAlpha: true,
            showPalette: false,
            label: 'No Palette Picker'
          }
        }
      },
      {
        id: 'disabled',
        name: 'Disabled',
        description: 'Disabled color picker',
        component: {
          inputs: {
            format: 'hex',
            showAlpha: true,
            showPalette: true,
            disabled: true,
            label: 'Disabled Color Picker'
          }
        }
      }
    ];
  }
} 