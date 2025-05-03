import { AfterViewInit, Component, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { DateTimePickerComponent } from '@skillvo-web/ui-components';
import { RouterModule } from '@angular/router';
import { DemoShellComponent } from '../../../core/components/demo-shell/demo-shell.component';
import { ComponentDemo, EventDefinition, PropertyDefinition, PropertyType } from '../../../core/interfaces/component-demo.interface';
import { DemoRegistryService } from '../../../core/services/demo-registry.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-date-time-picker-demo',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    DateTimePickerComponent, 
    RouterModule,
    DemoShellComponent
  ],
  templateUrl: './date-time-picker-demo.component.html',
  styleUrls: ['./date-time-picker-demo.component.scss']
})
export class DateTimePickerDemoComponent implements AfterViewInit, OnDestroy {
  readonly DEMO_ID = 'date-time-picker-component';
  private destroy$ = new Subject<void>();

  constructor(
    private demoRegistry: DemoRegistryService,
    private elementRef: ElementRef
  ) {
    // Register the Date Time Picker component demo
    this.registerDateTimePickerDemo();
  }

  ngAfterViewInit(): void {
    // Listen for when the component is rendered in the demo shell
    this.demoRegistry.activeDemo$
      .pipe(takeUntil(this.destroy$))
      .subscribe(demo => {
        if (demo && demo.id === this.DEMO_ID) {
          setTimeout(() => {
            this.applyDateTimePickerContent();
          }, 0);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private applyDateTimePickerContent(): void {
    // Find the date time picker elements in the demo container
    const dateTimePickerElements = this.elementRef.nativeElement.querySelectorAll('sv-date-time-picker');

    // Apply date time picker display text based on properties
    dateTimePickerElements.forEach((picker: HTMLElement) => {
      // Get mode type
      const modeAttr = picker.getAttribute('ng-reflect-mode');
      const mode = modeAttr || 'date';
      
      // Check if range selection is enabled
      const isRangeAttr = picker.getAttribute('ng-reflect-is-range');
      const isRange = isRangeAttr === 'true';
      
      // Check if 24-hour format is enabled
      const use24HourFormatAttr = picker.getAttribute('ng-reflect-use24-hour-format');
      const use24HourFormat = use24HourFormatAttr === 'true';
      
      // Check if disabled
      const isDisabled = picker.hasAttribute('disabled');
      
      let labelText = `${mode.charAt(0).toUpperCase() + mode.slice(1)} Picker`;
      
      if (isDisabled) {
        labelText = 'Disabled Date/Time Picker';
      } else if (isRange) {
        labelText = 'Date Range Picker';
      } else if (mode === 'datetime') {
        labelText = use24HourFormat ? '24h Date/Time Picker' : '12h Date/Time Picker';
      }
      
      // Find the label element and set text
      const labelElement = picker.querySelector('.sv-form-label');
      if (labelElement) {
        labelElement.textContent = labelText;
      }
    });
  }

  private registerDateTimePickerDemo(): void {
    const dateTimePickerDemo: ComponentDemo<DateTimePickerComponent> = {
      id: this.DEMO_ID,
      name: 'Date Time Picker Component',
      description: 'A versatile component for selecting dates, times, or both with various configuration options.',
      component: DateTimePickerComponent,
      properties: this.getDateTimePickerProperties(),
      events: this.getDateTimePickerEvents(),
      codeSnippets: this.getDateTimePickerCodeSnippets(),
      variants: this.getDateTimePickerVariants(),
      defaultVariantId: 'date-picker',
      cssClasses: [
        'sv-input-container',
        'sv-form-label',
        'sv-date-picker',
        'sv-time-picker',
        'sv-date-time-calendar',
        'sv-date-time-controls'
      ]
    };

    this.demoRegistry.registerDemo(dateTimePickerDemo);
  }

  private getDateTimePickerProperties(): PropertyDefinition[] {
    return [
      {
        name: 'mode',
        type: PropertyType.SELECT,
        defaultValue: 'date',
        category: 'Appearance',
        description: 'Mode of the picker: date, time, or datetime',
        options: ['date', 'time', 'datetime']
      },
      {
        name: 'format',
        type: PropertyType.STRING,
        defaultValue: '',
        category: 'Appearance',
        description: 'Custom format for the date/time display (empty for default format)'
      },
      {
        name: 'min',
        type: PropertyType.STRING,
        defaultValue: '',
        category: 'Validation',
        description: 'Minimum selectable date/time (ISO string or Date object)'
      },
      {
        name: 'max',
        type: PropertyType.STRING,
        defaultValue: '',
        category: 'Validation',
        description: 'Maximum selectable date/time (ISO string or Date object)'
      },
      {
        name: 'showSeconds',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'Appearance',
        description: 'Whether to show seconds in time picker mode'
      },
      {
        name: 'use24HourFormat',
        type: PropertyType.BOOLEAN,
        defaultValue: true,
        category: 'Appearance',
        description: 'Whether to use 24-hour time format or 12-hour (AM/PM)'
      },
      {
        name: 'firstDayOfWeek',
        type: PropertyType.SELECT,
        defaultValue: 1,
        category: 'Appearance',
        description: 'First day of the week in calendar (0 = Sunday, 1 = Monday)',
        options: [0, 1]
      },
      {
        name: 'disabledDates',
        type: PropertyType.ARRAY,
        defaultValue: [],
        category: 'Validation',
        description: 'Array of dates to disable in the calendar'
      },
      {
        name: 'disableWeekends',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'Validation',
        description: 'Whether to disable weekend days (Saturday and Sunday)'
      },
      {
        name: 'showTodayButton',
        type: PropertyType.BOOLEAN,
        defaultValue: true,
        category: 'Appearance',
        description: 'Whether to show "Today" button in date picker'
      },
      {
        name: 'showClearButton',
        type: PropertyType.BOOLEAN,
        defaultValue: true,
        category: 'Appearance',
        description: 'Whether to show "Clear" button to reset selection'
      },
      {
        name: 'isRange',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'Behavior',
        description: 'Whether to enable date range selection'
      },
      {
        name: 'disabled',
        type: PropertyType.BOOLEAN,
        defaultValue: false,
        category: 'State',
        description: 'Whether the picker is disabled'
      },
      {
        name: 'label',
        type: PropertyType.STRING,
        defaultValue: '',
        category: 'Content',
        description: 'Label for the date/time picker'
      },
      {
        name: 'placeholder',
        type: PropertyType.STRING,
        defaultValue: '',
        category: 'Content',
        description: 'Placeholder text when no value is selected'
      }
    ];
  }

  private getDateTimePickerEvents(): EventDefinition[] {
    return [
      {
        name: 'dateChange',
        description: 'Emitted when the selected date/time changes'
      },
      {
        name: 'rangeChange',
        description: 'Emitted when the date range changes (only when isRange=true)'
      }
    ];
  }

  private getDateTimePickerCodeSnippets(): any[] {
    return [
      {
        language: 'html',
        title: 'Basic Date Picker',
        description: 'Simple date picker with default settings',
        code: '<sv-date-time-picker mode="date" label="Select Date"></sv-date-time-picker>'
      },
      {
        language: 'html',
        title: 'Time Picker',
        description: 'Time picker with 24-hour format',
        code: '<sv-date-time-picker mode="time" [use24HourFormat]="true" label="Select Time"></sv-date-time-picker>'
      },
      {
        language: 'html',
        title: 'Date Time Picker',
        description: 'Combined date and time picker',
        code: '<sv-date-time-picker mode="datetime" label="Select Date & Time"></sv-date-time-picker>'
      },
      {
        language: 'html',
        title: 'Date Range Picker',
        description: 'Date picker with range selection',
        code: '<sv-date-time-picker [isRange]="true" label="Select Date Range"></sv-date-time-picker>'
      },
      {
        language: 'html',
        title: 'Time Picker with Seconds',
        description: 'Time picker with seconds display',
        code: '<sv-date-time-picker mode="time" [showSeconds]="true" label="Select Time"></sv-date-time-picker>'
      },
      {
        language: 'html',
        title: 'Full Configuration',
        description: 'Date time picker with comprehensive configuration',
        code: `<sv-date-time-picker 
  mode="datetime"
  [use24HourFormat]="false"
  [showSeconds]="true"
  [firstDayOfWeek]="0"
  [min]="'2023-01-01'"
  [max]="'2023-12-31'"
  [disableWeekends]="true"
  [showTodayButton]="true"
  [showClearButton]="true"
  label="Select Appointment Date & Time"
  placeholder="MM/DD/YYYY, HH:MM"
  (dateChange)="onDateChange($event)">
</sv-date-time-picker>`
      },
      {
        language: 'typescript',
        title: 'Component Implementation',
        description: 'Example component using the date time picker',
        code: `import { Component } from '@angular/core';
import { DateTimePickerComponent } from '@skillvo-web/ui-components';

@Component({
  selector: 'app-appointment-scheduler',
  standalone: true,
  imports: [DateTimePickerComponent],
  template: \`
    <div class="scheduler-container">
      <h2>Schedule Appointment</h2>
      <sv-date-time-picker 
        mode="datetime"
        [min]="minDate"
        [disableWeekends]="true"
        (dateChange)="onDateSelected($event)">
      </sv-date-time-picker>
      <div *ngIf="selectedDate" class="selected-slot">
        Selected: {{ selectedDate | date:'medium' }}
      </div>
    </div>
  \`
})
export class AppointmentSchedulerComponent {
  minDate = new Date(); // Today
  selectedDate: Date | null = null;
  
  onDateSelected(date: Date): void {
    this.selectedDate = date;
    console.log('Appointment scheduled for:', date);
  }
}`
      }
    ];
  }

  private getDateTimePickerVariants(): any[] {
    return [
      {
        id: 'date-picker',
        name: 'Date Picker',
        description: 'Standard date picker for selecting single dates',
        properties: {
          mode: 'date',
          label: 'Date Picker',
          firstDayOfWeek: 1,
          showTodayButton: true
        }
      },
      {
        id: 'time-picker-24h',
        name: 'Time Picker (24h)',
        description: 'Time picker using 24-hour format',
        properties: {
          mode: 'time',
          label: 'Time Picker (24h)',
          use24HourFormat: true,
          showSeconds: false
        }
      },
      {
        id: 'time-picker-12h',
        name: 'Time Picker (12h)',
        description: 'Time picker using 12-hour format with AM/PM',
        properties: {
          mode: 'time',
          label: 'Time Picker (12h)',
          use24HourFormat: false,
          showSeconds: false
        }
      },
      {
        id: 'datetime-picker',
        name: 'Date Time Picker',
        description: 'Combined date and time picker',
        properties: {
          mode: 'datetime',
          label: 'Date & Time Picker',
          use24HourFormat: true,
          showSeconds: false
        }
      },
      {
        id: 'date-range-picker',
        name: 'Date Range Picker',
        description: 'Date picker with range selection capability',
        properties: {
          mode: 'date',
          label: 'Date Range Picker',
          isRange: true,
          firstDayOfWeek: 1
        }
      },
      {
        id: 'disabled-picker',
        name: 'Disabled Picker',
        description: 'Disabled date time picker',
        properties: {
          mode: 'date',
          label: 'Disabled Picker',
          disabled: true
        }
      }
    ];
  }
} 