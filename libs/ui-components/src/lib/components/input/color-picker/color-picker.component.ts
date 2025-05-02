import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseInputComponent } from '../base-input/base-input.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'sv-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorPickerComponent),
      multi: true
    }
  ]
})
export class ColorPickerComponent extends BaseInputComponent {
  @Input() format: 'hex' | 'rgb' | 'hsl' = 'hex';
  @Input() showAlpha: boolean = true;
  @Input() showPalette: boolean = true;
  @Input() defaultColor: string = '#ffffff';
  @Input() palette: string[] = [
    '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4',
    '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107',
    '#ff9800', '#ff5722', '#795548', '#9e9e9e', '#607d8b', '#ffffff', '#000000'
  ];
  @Input() recentColors: string[] = [];
  
  // Override base component properties
  @Input() override id: string = '';
  @Input() override name: string = '';
  @Input() override label: string = '';
  @Input() override placeholder: string = '';
  @Input() override required: boolean = false;
  @Input() override disabled: boolean = false;
  @Input() override readonly: boolean = false;
  @Input() override helpText: string = '';
  @Input() override errorMessage: string = '';
  @Input() override successMessage: string = '';
  
  @Output() colorChange = new EventEmitter<string>();
  
  @ViewChild('colorPanel') colorPanel!: ElementRef;
  
  isOpen: boolean = false;
  selectedColor: string = '';
  tempColor: string = '';
  activeFormat: 'hex' | 'rgb' | 'hsl' = 'hex';
  
  // Color components for RGB/HSL modes
  hue: number = 0;
  saturation: number = 100;
  lightness: number = 50;
  red: number = 255;
  green: number = 255;
  blue: number = 255;
  alpha: number = 1;
  
  ngOnInit(): void {
    this.selectedColor = this.value || this.defaultColor;
    this.tempColor = this.selectedColor;
    this.activeFormat = this.format;
    this.parseColor(this.selectedColor);
  }
  
  togglePanel(): void {
    this.isOpen = !this.isOpen;
    
    if (this.isOpen) {
      this.tempColor = this.selectedColor;
      // Add click outside listener
      setTimeout(() => {
        document.addEventListener('click', this.onClickOutside);
      });
    } else {
      document.removeEventListener('click', this.onClickOutside);
    }
  }
  
  onClickOutside = (event: MouseEvent): void => {
    if (this.colorPanel && !this.colorPanel.nativeElement.contains(event.target)) {
      this.isOpen = false;
      document.removeEventListener('click', this.onClickOutside);
    }
  }
  
  selectColor(color: string): void {
    this.tempColor = color;
    this.parseColor(color);
  }
  
  updateHueFromColorArea(event: MouseEvent): void {
    const elem = event.currentTarget as HTMLElement;
    const rect = elem.getBoundingClientRect();
    
    // Calculate saturation and lightness from the position
    this.saturation = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
    this.lightness = Math.max(0, Math.min(100, 100 - ((event.clientY - rect.top) / rect.height) * 100));
    
    this.updateColorFromHSL();
  }
  
  updateFromHueSlider(event: MouseEvent): void {
    const elem = event.currentTarget as HTMLElement;
    const rect = elem.getBoundingClientRect();
    
    // Calculate hue from the position (0-360)
    this.hue = Math.max(0, Math.min(360, ((event.clientX - rect.left) / rect.width) * 360));
    
    this.updateColorFromHSL();
  }
  
  updateFromAlphaSlider(event: MouseEvent): void {
    const elem = event.currentTarget as HTMLElement;
    const rect = elem.getBoundingClientRect();
    
    // Calculate alpha from the position (0-1)
    this.alpha = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    
    this.updateColorFromHSL();
  }
  
  updateColorFromHSL(): void {
    // Convert HSL to RGB
    const rgb = this.hslToRgb(this.hue, this.saturation, this.lightness);
    this.red = rgb.r;
    this.green = rgb.g;
    this.blue = rgb.b;
    
    // Update the color string based on current format
    this.updateColorString();
  }
  
  updateColorFromRGB(): void {
    // Convert RGB to HSL
    const hsl = this.rgbToHsl(this.red, this.green, this.blue);
    this.hue = hsl.h;
    this.saturation = hsl.s;
    this.lightness = hsl.l;
    
    // Update the color string based on current format
    this.updateColorString();
  }
  
  updateColorString(): void {
    if (this.activeFormat === 'hex') {
      this.tempColor = this.rgbToHex(this.red, this.green, this.blue);
      
      // Add alpha if needed
      if (this.showAlpha && this.alpha < 1) {
        const alphaHex = Math.round(this.alpha * 255).toString(16).padStart(2, '0');
        this.tempColor += alphaHex;
      }
    } else if (this.activeFormat === 'rgb') {
      if (this.showAlpha && this.alpha < 1) {
        this.tempColor = `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha.toFixed(2)})`;
      } else {
        this.tempColor = `rgb(${this.red}, ${this.green}, ${this.blue})`;
      }
    } else if (this.activeFormat === 'hsl') {
      if (this.showAlpha && this.alpha < 1) {
        this.tempColor = `hsla(${Math.round(this.hue)}, ${Math.round(this.saturation)}%, ${Math.round(this.lightness)}%, ${this.alpha.toFixed(2)})`;
      } else {
        this.tempColor = `hsl(${Math.round(this.hue)}, ${Math.round(this.saturation)}%, ${Math.round(this.lightness)}%)`;
      }
    }
  }
  
  parseColor(color: string): void {
    if (!color) return;
    
    // Parse HEX
    if (color.startsWith('#')) {
      const hex = color.substring(1);
      
      // Handle different hex formats
      let r = 0, g = 0, b = 0, a = 1;
      
      if (hex.length === 3) {
        r = parseInt(hex[0] + hex[0], 16);
        g = parseInt(hex[1] + hex[1], 16);
        b = parseInt(hex[2] + hex[2], 16);
      } else if (hex.length === 6) {
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
      } else if (hex.length === 8) {
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);
        a = parseInt(hex.substring(6, 8), 16) / 255;
      }
      
      this.red = r;
      this.green = g;
      this.blue = b;
      this.alpha = a;
      
      // Convert to HSL
      const hsl = this.rgbToHsl(r, g, b);
      this.hue = hsl.h;
      this.saturation = hsl.s;
      this.lightness = hsl.l;
    }
    // Parse RGB/RGBA
    else if (color.startsWith('rgb')) {
      const regex = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)/;
      const match = color.match(regex);
      
      if (match) {
        this.red = parseInt(match[1]);
        this.green = parseInt(match[2]);
        this.blue = parseInt(match[3]);
        this.alpha = match[4] ? parseFloat(match[4]) : 1;
        
        // Convert to HSL
        const hsl = this.rgbToHsl(this.red, this.green, this.blue);
        this.hue = hsl.h;
        this.saturation = hsl.s;
        this.lightness = hsl.l;
      }
    }
    // Parse HSL/HSLA
    else if (color.startsWith('hsl')) {
      const regex = /hsla?\((\d+),\s*(\d+)%,\s*(\d+)%(?:,\s*(\d+(?:\.\d+)?))?\)/;
      const match = color.match(regex);
      
      if (match) {
        this.hue = parseInt(match[1]);
        this.saturation = parseInt(match[2]);
        this.lightness = parseInt(match[3]);
        this.alpha = match[4] ? parseFloat(match[4]) : 1;
        
        // Convert to RGB
        const rgb = this.hslToRgb(this.hue, this.saturation, this.lightness);
        this.red = rgb.r;
        this.green = rgb.g;
        this.blue = rgb.b;
      }
    }
  }
  
  changeFormat(format: 'hex' | 'rgb' | 'hsl'): void {
    this.activeFormat = format;
    this.updateColorString();
  }
  
  applyColor(): void {
    this.selectedColor = this.tempColor;
    this.value = this.selectedColor;
    this.onChange(this.value);
    this.colorChange.emit(this.value);
    
    // Add to recent colors if not already present
    if (this.recentColors.indexOf(this.selectedColor) === -1) {
      this.recentColors.unshift(this.selectedColor);
      
      // Keep only latest few colors
      if (this.recentColors.length > 8) {
        this.recentColors = this.recentColors.slice(0, 8);
      }
    }
    
    this.isOpen = false;
    document.removeEventListener('click', this.onClickOutside);
  }
  
  clearColor(): void {
    this.tempColor = '';
    this.parseColor(this.defaultColor);
  }
  
  // Utility functions for color conversions
  
  private rgbToHex(r: number, g: number, b: number): string {
    const toHex = (value: number) => {
      const hex = Math.round(value).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }
  
  private hslToRgb(h: number, s: number, l: number): { r: number, g: number, b: number } {
    // Convert HSL to RGB
    s /= 100;
    l /= 100;
    
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    
    let r, g, b;
    
    if (h >= 0 && h < 60) {
      [r, g, b] = [c, x, 0];
    } else if (h >= 60 && h < 120) {
      [r, g, b] = [x, c, 0];
    } else if (h >= 120 && h < 180) {
      [r, g, b] = [0, c, x];
    } else if (h >= 180 && h < 240) {
      [r, g, b] = [0, x, c];
    } else if (h >= 240 && h < 300) {
      [r, g, b] = [x, 0, c];
    } else {
      [r, g, b] = [c, 0, x];
    }
    
    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255)
    };
  }
  
  private rgbToHsl(r: number, g: number, b: number): { h: number, s: number, l: number } {
    // Convert RGB to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;
    
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      
      h *= 60;
    }
    
    return {
      h: Math.round(h),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  }
  
  override onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.tempColor = inputValue;
    this.parseColor(inputValue);
    super.onInputChange(event);
  }
  
  override writeValue(value: any): void {
    super.writeValue(value);
    this.selectedColor = value || this.defaultColor;
    this.parseColor(this.selectedColor);
  }
  
  override onBlur(): void {
    super.onBlur();
  }
}