import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ButtonComponent } from './button.component';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <sv-button
      [variant]="variant"
      [size]="size"
      [disabled]="disabled"
      [loading]="loading"
      [ripple]="ripple"
      [pulse]="pulse"
      [pressed]="pressed"
      [fullWidth]="fullWidth"
      [iconOnly]="iconOnly"
      [ariaLabel]="ariaLabel"
      [type]="type"
      (buttonClick)="onClick($event)"
    >
      {{ content }}
    </sv-button>
  `,
  standalone: true,
  imports: [ButtonComponent]
})
class TestHostComponent {
  variant: 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'outline' | 'link' = 'primary';
  size: 'default' | 'sm' | 'lg' = 'default';
  disabled = false;
  loading = false;
  ripple = false;
  pulse = false;
  pressed: boolean | null = null;
  fullWidth = false;
  iconOnly = false;
  ariaLabel?: string;
  type: 'button' | 'submit' | 'reset' = 'button';
  content = 'Button Text';
  
  clickEvent: MouseEvent | null = null;
  
  onClick(event: MouseEvent): void {
    this.clickEvent = event;
  }
}

describe('ButtonComponent', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let buttonDebugElement: any;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent, TestHostComponent]
    }).compileComponents();
    
    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
    buttonDebugElement = fixture.debugElement.query(By.directive(ButtonComponent));
  });

  it('should create button component', () => {
    expect(buttonDebugElement.componentInstance).toBeTruthy();
  });

  it('should apply variant class', () => {
    const variants: Array<'primary' | 'secondary' | 'tertiary' | 'destructive' | 'outline' | 'link'> = 
      ['primary', 'secondary', 'tertiary', 'destructive', 'outline', 'link'];
    
    for (const variant of variants) {
      hostComponent.variant = variant;
      fixture.detectChanges();
      
      const buttonEl = buttonDebugElement.nativeElement;
      expect(buttonEl.classList.contains(`sv-button-${variant}`)).toBeTruthy();
    }
  });

  it('should apply size class', () => {
    const sizes: Array<'default' | 'sm' | 'lg'> = ['default', 'sm', 'lg'];
    
    for (const size of sizes) {
      hostComponent.size = size;
      fixture.detectChanges();
      
      const buttonEl = buttonDebugElement.nativeElement;
      if (size === 'default') {
        expect(buttonEl.classList.contains('sv-size-default')).toBeFalsy();
      } else {
        expect(buttonEl.classList.contains(`sv-size-${size}`)).toBeTruthy();
      }
    }
  });

  it('should set disabled attribute when disabled', () => {
    hostComponent.disabled = true;
    fixture.detectChanges();
    
    const buttonEl = buttonDebugElement.nativeElement;
    expect(buttonEl.hasAttribute('disabled')).toBeTruthy();
    expect(buttonEl.classList.contains('is-disabled')).toBeTruthy();
  });

  it('should set loading class when loading', () => {
    hostComponent.loading = true;
    fixture.detectChanges();
    
    const buttonEl = buttonDebugElement.nativeElement;
    expect(buttonEl.classList.contains('is-loading')).toBeTruthy();
    expect(buttonEl.getAttribute('aria-busy')).toBe('true');
  });

  it('should apply ripple class when ripple is true', () => {
    hostComponent.ripple = true;
    fixture.detectChanges();
    
    const buttonEl = buttonDebugElement.nativeElement;
    expect(buttonEl.classList.contains('sv-button-with-ripple')).toBeTruthy();
  });

  it('should apply pulse class when pulse is true', () => {
    hostComponent.pulse = true;
    fixture.detectChanges();
    
    const buttonEl = buttonDebugElement.nativeElement;
    expect(buttonEl.classList.contains('sv-button-pulse')).toBeTruthy();
  });

  it('should set aria-pressed when pressed state is provided', () => {
    hostComponent.pressed = true;
    fixture.detectChanges();
    
    const buttonEl = buttonDebugElement.nativeElement;
    expect(buttonEl.getAttribute('aria-pressed')).toBe('true');
  });

  it('should apply full width class when fullWidth is true', () => {
    hostComponent.fullWidth = true;
    fixture.detectChanges();
    
    const buttonEl = buttonDebugElement.nativeElement;
    expect(buttonEl.classList.contains('sv-button-full-width')).toBeTruthy();
  });

  it('should apply icon-only class and set aria-label for icon-only buttons', () => {
    hostComponent.iconOnly = true;
    hostComponent.ariaLabel = 'Icon Button';
    fixture.detectChanges();
    
    const buttonComponent = buttonDebugElement.componentInstance;
    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement;
    
    expect(buttonComponent.hostClasses.includes('sv-action-icon-only')).toBeTruthy();
    expect(buttonElement.getAttribute('aria-label')).toBe('Icon Button');
  });

  it('should set button type attribute', () => {
    const types: Array<'button' | 'submit' | 'reset'> = ['button', 'submit', 'reset'];
    
    for (const type of types) {
      hostComponent.type = type;
      fixture.detectChanges();
      
      const buttonEl = buttonDebugElement.nativeElement;
      expect(buttonEl.getAttribute('type')).toBe(type);
    }
  });

  it('should emit buttonClick event when clicked', () => {
    const buttonElement = fixture.debugElement.query(By.css('button'));
    buttonElement.nativeElement.click();
    fixture.detectChanges();
    
    expect(hostComponent.clickEvent).toBeTruthy();
  });

  it('should not emit click event when disabled', () => {
    hostComponent.disabled = true;
    fixture.detectChanges();
    
    const buttonElement = fixture.debugElement.query(By.css('button'));
    buttonElement.nativeElement.click();
    fixture.detectChanges();
    
    expect(hostComponent.clickEvent).toBeNull();
  });

  it('should not emit click event when loading', () => {
    hostComponent.loading = true;
    fixture.detectChanges();
    
    const buttonElement = fixture.debugElement.query(By.css('button'));
    buttonElement.nativeElement.click();
    fixture.detectChanges();
    
    expect(hostComponent.clickEvent).toBeNull();
  });

  it('should render content correctly', () => {
    hostComponent.content = 'Test Button';
    fixture.detectChanges();
    
    const buttonElement = fixture.debugElement.query(By.css('button'));
    expect(buttonElement.nativeElement.textContent.trim()).toBe('Test Button');
  });
}); 