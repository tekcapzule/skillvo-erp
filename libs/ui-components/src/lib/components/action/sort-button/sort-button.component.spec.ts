import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SortButtonComponent, SortDirection } from './sort-button.component';
import { By } from '@angular/platform-browser';

describe('SortButtonComponent', () => {
  let component: SortButtonComponent;
  let fixture: ComponentFixture<SortButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SortButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display label when provided', () => {
    component.label = 'Test Label';
    fixture.detectChanges();
    
    const labelElement = fixture.debugElement.query(By.css('.label'));
    expect(labelElement).toBeTruthy();
    expect(labelElement.nativeElement.textContent).toContain('Test Label');
  });

  it('should not display label when not provided', () => {
    component.label = '';
    fixture.detectChanges();
    
    const labelElement = fixture.debugElement.query(By.css('.label'));
    expect(labelElement).toBeFalsy();
  });

  it('should have correct sort indicator classes with asc direction', () => {
    component.sortDirection = 'asc';
    fixture.detectChanges();
    
    const upArrow = fixture.debugElement.query(By.css('.up-arrow'));
    const downArrow = fixture.debugElement.query(By.css('.down-arrow'));
    
    expect(upArrow.classes['active']).toBeTruthy();
    expect(downArrow.classes['active']).toBeFalsy();
    expect(fixture.debugElement.query(By.css('.sort-button')).classes['sorted']).toBeTruthy();
  });

  it('should have correct sort indicator classes with desc direction', () => {
    component.sortDirection = 'desc';
    fixture.detectChanges();
    
    const upArrow = fixture.debugElement.query(By.css('.up-arrow'));
    const downArrow = fixture.debugElement.query(By.css('.down-arrow'));
    
    expect(upArrow.classes['active']).toBeFalsy();
    expect(downArrow.classes['active']).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.sort-button')).classes['sorted']).toBeTruthy();
  });

  it('should have no active arrows with null direction', () => {
    component.sortDirection = null;
    fixture.detectChanges();
    
    const upArrow = fixture.debugElement.query(By.css('.up-arrow'));
    const downArrow = fixture.debugElement.query(By.css('.down-arrow'));
    
    expect(upArrow.classes['active']).toBeFalsy();
    expect(downArrow.classes['active']).toBeFalsy();
    expect(fixture.debugElement.query(By.css('.sort-button')).classes['sorted']).toBeFalsy();
  });

  it('should be disabled when disabled property is true', () => {
    component.disabled = true;
    fixture.detectChanges();
    
    expect(fixture.debugElement.query(By.css('.sort-button')).classes['disabled']).toBeTruthy();
  });

  it('should emit sortChange event with correct value when clicked', () => {
    spyOn(component.sortChange, 'emit');
    component.sortDirection = null;
    fixture.detectChanges();
    
    const button = fixture.debugElement.query(By.css('.sort-button'));
    button.triggerEventHandler('click', new MouseEvent('click'));
    
    expect(component.sortChange.emit).toHaveBeenCalledWith('asc');
  });

  it('should cycle through sort directions when clicked multiple times', () => {
    spyOn(component.sortChange, 'emit');
    
    // Initial state: null
    component.sortDirection = null;
    fixture.detectChanges();
    
    // First click: null -> asc
    component.onSortClick(new MouseEvent('click'));
    expect(component.sortChange.emit).toHaveBeenCalledWith('asc');
    
    // Update component to simulate the value change
    component.sortDirection = 'asc';
    fixture.detectChanges();
    
    // Second click: asc -> desc
    component.onSortClick(new MouseEvent('click'));
    expect(component.sortChange.emit).toHaveBeenCalledWith('desc');
    
    // Update component to simulate the value change
    component.sortDirection = 'desc';
    fixture.detectChanges();
    
    // Third click: desc -> null
    component.onSortClick(new MouseEvent('click'));
    expect(component.sortChange.emit).toHaveBeenCalledWith(null);
  });

  it('should not emit sortChange when disabled', () => {
    spyOn(component.sortChange, 'emit');
    component.disabled = true;
    fixture.detectChanges();
    
    component.onSortClick(new MouseEvent('click'));
    expect(component.sortChange.emit).not.toHaveBeenCalled();
  });
}); 