import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentDemoFrameworkComponent } from './component-demo-framework.component';

describe('ComponentDemoFrameworkComponent', () => {
  let component: ComponentDemoFrameworkComponent;
  let fixture: ComponentFixture<ComponentDemoFrameworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentDemoFrameworkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentDemoFrameworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
